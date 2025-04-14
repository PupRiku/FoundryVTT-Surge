console.log('SURGE! | Initializing surge.js'); // Log to confirm the file is loading

/**
 * Actor Sheet class for SURGE! character actors.
 * @extends {ActorSheet}
 */
export class SurgeCharacterSheet extends ActorSheet {
  /**
   * Define default options for the character sheet.
   * @returns {object}
   * @override
   */
  static get defaultOptions() {
    console.log('SURGE! | Getting REVISED default options (with tabs)...'); // Log message updated
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['surge', 'sheet', 'actor', 'character'],
      template: 'systems/surge/templates/sheets/actor-sheet.hbs',
      resizable: true,
      // ADD TABS CONFIGURATION BACK:
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'main',
        },
      ],
      // Still leave out width/height for now
    });
  }

  // Lookup table for level to roll formula components
  // Private class field syntax (#) might be usable depending on JS environment support,
  // but using _convention is safer for broader compatibility.
  _rollTable = {
    1: { dice: 1, mod: 0 },
    2: { dice: 1, mod: 1 },
    3: { dice: 1, mod: 2 },
    4: { dice: 1, mod: 3 },
    5: { dice: 1, mod: 4 },
    6: { dice: 1, mod: 5 },
    7: { dice: 2, mod: 4 },
    8: { dice: 2, mod: 5 },
    9: { dice: 3, mod: 4 },
    10: { dice: 3, mod: 5 },
    11: { dice: 4, mod: 4 },
    12: { dice: 4, mod: 5 },
    13: { dice: 5, mod: 4 },
    14: { dice: 5, mod: 5 },
    15: { dice: 6, mod: 4 },
    16: { dice: 6, mod: 5 },
    17: { dice: 7, mod: 4 },
    18: { dice: 7, mod: 5 },
    19: { dice: 8, mod: 4 },
    20: { dice: 8, mod: 5 },
  };

  /**
   * Performs a SURGE! system roll based on a stat level and optional modifiers array.
   * Includes the 'x6' exploding dice rule.
   * @param {number} level                The attribute or skill level (1-20).
   * @param {string} label                The label for the roll (e.g., "Strength Check").
   * @param {Array<{value: number, label: string}>} [modifiers=[]] Optional array of modifier objects.
   * @returns {Promise<void>}             Sends the result to chat.
   * @private
   */
  async _performRoll(level, label, modifiers = []) {
    // <<< ACCEPTS MODIFIERS ARRAY
    level = Math.max(1, Math.min(20, level || 1)); // Ensure level is 1-20
    const rollData = this._rollTable[level];
    if (!rollData) {
      console.error(`SURGE | Invalid level for roll table lookup: ${level}`);
      ui.notifications.error(`Invalid level (${level}) for ${label}.`);
      return;
    }

    // Base formula with SURGING dice (x6)
    let formula = `${rollData.dice}d6x6`;
    if (rollData.mod !== 0) {
      formula += ` + ${rollData.mod}`;
    }

    // Prepare data object for the Roll class, including actor data
    let rollDataObject = { ...this.actor.getRollData() };
    let modifierDesc = []; // For logging/tooltip later if needed

    // --- Loop through the modifiers array --- THIS IS THE KEY PART ---
    for (const mod of modifiers) {
      // Ensure mod value is a valid number and non-zero
      if (typeof mod.value !== 'number' || mod.value === 0) continue;

      const modValue = mod.value;
      const modLabel = mod.label || 'Modifier'; // Default label if missing
      const modSign = modValue > 0 ? '+' : ''; // Keep sign for negative mods
      // Create a simple, unique key like 'strlevel' or 'mod_<random>' for the data object
      const modKey =
        modLabel.toLowerCase().replace(/[^a-z0-9]/g, '') ||
        `mod${foundry.utils.randomID(4)}`;
      // Ensure key is unique if label is generic or contains invalid chars after cleanup
      let finalKey = modKey;
      if (!finalKey) finalKey = `mod${foundry.utils.randomID(4)}`; // Ensure key is never empty
      let i = 0;
      while (finalKey in rollDataObject) {
        // Prevent key collisions in data object
        finalKey = `${modKey}_${++i}`;
      }

      // Use BACKTICKS and correct interpolation to add to formula
      formula += ` ${modSign} @${finalKey}`; // Use @key in formula string
      rollDataObject[finalKey] = modValue; // Add modifier value to data under the specific key
      modifierDesc.push(`${modLabel}: ${modSign}${modValue}`); // Keep track for logging/display
    }
    // --- End of loop ---

    console.log(
      `SURGE | Rolling - Level: <span class="math-inline">\{level\}, Modifiers\: \[</span>{modifierDesc.join(', ')}], Formula: ${formula}, Data:`,
      rollDataObject,
      `Label: ${label}`
    );

    // Create and evaluate the roll
    const roll = new Roll(formula, rollDataObject);
    try {
      await roll.evaluate(); // Evaluate asynchronously

      // Send the result to the chat
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
      });
    } catch (err) {
      console.error(
        `SURGE | Roll evaluation failed for formula "${formula}":`,
        err
      );
      ui.notifications.error(`Failed to evaluate roll for ${label}.`);
    }
  }

  /**
   * Prepare the data context for Handlebars template rendering.
   * This method is called each time the sheet needs to be drawn.
   * @returns {object} The data object for the template.
   * @override
   */
  async getData(options) {
    const context = await super.getData(options);
    context.systemData = context.actor.system;

    // --- Calculate Max Actions ---
    const dexLevel = context.systemData.attributes?.dex?.value ?? 1;
    context.calculatedActions = {
      max: Math.floor(dexLevel / 2) + 2,
      label: 'Actions per Turn',
    };

    // --- Calculate Max HP ---
    const baseHp = context.systemData.passives?.hp?.base ?? 0;
    const encounter = context.systemData.passives?.encounter?.value ?? 0;
    const startingMaxHp =
      context.systemData.passives?.hp?.startingMax ?? baseHp;
    context.systemData.passives.hp.max = startingMaxHp + encounter;
    context.systemData.passives.hp.value = Math.min(
      context.systemData.passives.hp.value,
      context.systemData.passives.hp.max
    );

    // --- Calculate Total Menace ---
    const baseMenace = Number(context.systemData.passives?.menace?.base ?? 0);
    let equipmentMenace = 0;

    // Loop through all owned items to find equipped contributors
    for (const item of this.actor.items) {
      // Check if item is equipped AND has a numeric menaceContribution
      if (
        item.system?.equipped === true &&
        typeof item.system?.menaceContribution === 'number'
      ) {
        equipmentMenace += item.system.menaceContribution;
      }
    }

    // Calculate total and add it to the context for the template
    const totalMenace = baseMenace + equipmentMenace;
    context.systemData.passives.menace.total = totalMenace;

    // Create a helpful tooltip string (optional but nice)
    context.systemData.passives.menace.tooltip = `Base: ${baseMenace} + Equip: ${equipmentMenace} = Total: ${totalMenace}`;
    // --- End of Menace Calculation ---

    console.log('SURGE! | Character Sheet Data Context:', context);
    return context;
  }

  /**
   * Activate event listeners for interactive elements on the sheet HTML.
   * This method is called once the sheet's HTML has been rendered.
   * @param {jQuery} html The jQuery object representing the sheet's HTML content.
   * @override
   */
  activateListeners(html) {
    // Call the parent class's activateListeners method
    super.activateListeners(html);
    console.log('SURGE! | Activating Listeners');

    // --- Roll Listeners ---
    html
      .find('.attribute-block-label.rollable')
      .click(this._onAttributeRoll.bind(this));
    html.find('.skill-label.rollable').click(this._onSkillRoll.bind(this));

    // --- Item Control Listeners ---
    html.find('.item-edit').click(this._onItemEdit.bind(this));
    html.find('.item-delete').click(this._onItemDelete.bind(this));
    html
      .find('.item-toggle-equip')
      .click(this._onItemToggleEquipped.bind(this));

    // --- ADD Item Roll Listeners ---
    html.find('.item-roll-attack').click(this._onItemAttackRoll.bind(this));
    html.find('.item-roll-damage').click(this._onItemDamageRoll.bind(this));

    // Add more listeners later (e.g., roll damage from item)
  }

  /**
   * Handle clicking on an attribute label/block to roll it.
   * Checks for Ctrl key for Ranged Defense on Dexterity.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onAttributeRoll(event) {
    event.preventDefault();
    const element = event.currentTarget; // Should be the label: .attribute-block-label
    const attributeKey = element.dataset.attribute;
    const attribute = this.actor.system.attributes[attributeKey];

    if (attribute) {
      const level = attribute.value;
      const isCtrl = event.ctrlKey || event.metaKey;

      if (attributeKey === 'dex' && isCtrl) {
        // Ranged Defense
        // console.log("SURGE | DEBUG | Calling _rollRangedDefense (mods built inside)");
        await this._rollRangedDefense();
      } else {
        // Basic Attribute Check
        // console.log("SURGE | DEBUG | Modifiers Array PASSED to _performRoll:", []);
        await this._performRoll(level, `${attribute.label} Check`, []); // <<< PASS EMPTY ARRAY HERE
      }
    } else {
      console.error(
        `SURGE | Could not find attribute data for key: ${attributeKey}`
      );
      ui.notifications.warn(
        `Attribute data not found for key: ${attributeKey}`
      );
    }
  }

  /**
   * Handle clicking on a skill label to roll it.
   * Checks for Shift/Ctrl keys for modified rolls (e.g., Melee Attack/Defense).
   * @param {Event} event The triggering click event
   * @private
   */
  async _onSkillRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const skillKey = element.dataset.skill;
    const skill = this.actor.system.skills[skillKey];
    const actorAttributes = this.actor.system.attributes;

    if (skill) {
      const level = skill.value;
      const isShift = event.shiftKey;
      const isCtrl = event.ctrlKey || event.metaKey;

      if (skillKey === 'martial') {
        if (isShift) {
          // Melee Weapon Attack
          const strLevel = actorAttributes.str?.value ?? 0;
          const mods = [{ value: strLevel, label: 'STR Level' }];
          // console.log("SURGE | DEBUG | Modifiers Array PASSED to _performRoll:", mods); // Optional log
          await this._performRoll(
            level,
            `Melee Weapon Attack (${skill.label})`,
            mods
          ); // Pass mods array
        } else if (isCtrl) {
          // Melee Defense
          // console.log("SURGE | DEBUG | Calling _rollMeleeDefense (mods built inside)"); // Optional log
          await this._rollMeleeDefense();
        } else {
          // Basic Check
          // console.log("SURGE | DEBUG | Modifiers Array PASSED to _performRoll:", []); // Optional log
          await this._performRoll(level, `${skill.label} Check`, []); // <<< PASS EMPTY ARRAY HERE
        }
      } else if (skillKey === 'mystic') {
        if (isCtrl) {
          // Magic Defense
          // console.log("SURGE | DEBUG | Calling _rollMagicDefense (mods built inside)");
          await this._rollMagicDefense();
        }
        // TODO: Handle Shift+Click for Mystic Attack?
        else {
          // Basic Check
          // console.log("SURGE | DEBUG | Modifiers Array PASSED to _performRoll:", []);
          await this._performRoll(level, `${skill.label} Check`, []); // <<< PASS EMPTY ARRAY HERE
        }
      } else {
        // Other skill basic checks
        // console.log("SURGE | DEBUG | Modifiers Array PASSED to _performRoll:", []);
        await this._performRoll(level, `${skill.label} Check`, []); // <<< PASS EMPTY ARRAY HERE
      }
    } else {
      console.error(`SURGE | Could not find skill data for key: ${skillKey}`);
      ui.notifications.warn(`Skill data not found for key: ${skillKey}`);
    }
  }

  /**
   * Handle clicking the edit icon on an item row.
   * Opens the item's configuration sheet.
   * @param {Event} event The triggering click event.
   * @private
   */
  _onItemEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    // Find the parent list item (li) which has the data-item-id
    const li = element.closest('.item');
    const itemId = li?.dataset?.itemId; // Safely get the item ID

    if (itemId) {
      // Get the Item document from the Actor's owned items
      const item = this.actor.items.get(itemId);
      if (item) {
        // Render the item's sheet (opens the edit dialog)
        item.sheet.render(true);
      } else {
        console.warn(
          `SURGE | Edit clicked for non-existent item ID: ${itemId}`
        );
        ui.notifications.warn('Could not find the item to edit.');
      }
    } else {
      console.error(
        'SURGE | Could not find item ID for edit button in parent LI element.'
      );
    }
  }

  /**
   * Handle clicking the delete icon on an item row.
   * Prompts for confirmation before deleting the item from the actor.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onItemDelete(event) {
    // Needs to be async because Dialog.confirm returns a Promise
    event.preventDefault();
    const element = event.currentTarget;
    const li = element.closest('.item');
    const itemId = li?.dataset?.itemId;

    if (!itemId) {
      console.error(
        'SURGE | Could not find item ID for delete button in parent LI element.'
      );
      return;
    }

    const item = this.actor.items.get(itemId);
    if (!item) {
      console.warn(
        `SURGE | Delete clicked for non-existent item ID: ${itemId}`
      );
      ui.notifications.warn('Could not find the item to delete.');
      return;
    }

    // Use Foundry's built-in confirmation dialog
    Dialog.confirm({
      title: `Delete ${item.name}`,
      content: `<p>Are you sure you want to delete the item "<strong>${item.name}</strong>"?</p><p>This action cannot be undone.</p>`,
      // 'yes' callback is executed if the user confirms
      yes: async () => {
        console.log(`SURGE | Deleting item: ${item.name} (${itemId})`);
        try {
          // Delete the item from the actor's embedded documents
          await this.actor.deleteEmbeddedDocuments('Item', [itemId]);
          // Note: The sheet usually re-renders automatically after deletion,
          // but you could force it with this.render(false); if needed.
        } catch (err) {
          console.error('SURGE | Failed to delete item:', err);
          ui.notifications.error(`Failed to delete ${item.name}.`);
        }
      },
      // 'no' callback is executed if the user cancels
      no: () => {
        console.log(`SURGE | Deletion cancelled for item: ${item.name}`);
      },
      defaultYes: false, // Make the "No" button the default action
    });
  }

  /**
   * Handle toggling the equipped state of an item.
   * @param {Event} event   The triggering click event.
   * @private
   */
  async _onItemToggleEquipped(event) {
    event.preventDefault();
    const element = event.currentTarget; // The clicked <a> tag
    const li = element.closest('.item');
    const itemId = li?.dataset?.itemId;

    if (!itemId) {
      console.error('SURGE | Could not find item ID for equip toggle.');
      return;
    }
    const item = this.actor.items.get(itemId);
    if (!item) {
      console.warn(
        `SURGE | Equip toggle clicked for non-existent item ID: ${itemId}`
      );
      return;
    }

    // Check if the 'equipped' property exists in the item's system data
    if (typeof item.system.equipped === 'undefined') {
      console.warn(
        `SURGE | Item ${item.name} does not have an 'equipped' property.`
      );
      ui.notifications.warn(
        `Item "${item.name}" cannot be equipped/unequipped.`
      );
      return;
    }

    // Toggle the equipped state by updating the item document
    const currentEquippedState = item.system.equipped;
    console.log(
      `SURGE | Toggling equipped state for ${
        item.name
      } from ${currentEquippedState} to ${!currentEquippedState}`
    );
    try {
      await item.update({ 'system.equipped': !currentEquippedState });
      // Sheet should re-render automatically via Foundry's hooks on item update
    } catch (err) {
      console.error('SURGE | Failed to update item equipped state:', err);
      ui.notifications.error(
        `Failed to update equipped state for ${item.name}.`
      );
    }
  }

  /**
   * Handle clicking the attack button on a weapon item.
   * Performs the attack roll using the weapon's skill and relevant modifiers.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onItemAttackRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const li = element.closest('.item');
    const itemId = li?.dataset?.itemId;
    const item = this.actor.items.get(itemId); // This is the weapon item

    // Ensure it's a weapon
    if (!item || item.type !== 'weapon') return;

    // Determine skill and level
    const skillKey = item.system.skillUsed || 'martial'; // Default to martial if not specified? Or fetch from type?
    const skill = this.actor.system.skills[skillKey];
    const skillLevel = skill?.value ?? 1; // Default to level 1 if skill somehow missing

    // Determine label and modifiers
    let label = `${item.name} Attack (${skill?.label || skillKey})`;
    let flatModifier = 0;
    let modifierLabel = '';

    // Add STR Level bonus ONLY for Melee Weapon attacks using Martial skill
    if (item.system.weaponType === 'melee' && skillKey === 'martial') {
      flatModifier = this.actor.system.attributes.str?.value ?? 0;
      modifierLabel = 'STR Level';
    }
    // Add other potential modifiers later (e.g. from status effects, temporary bonuses)

    // Perform the roll using the existing helper function
    await this._performRoll(skillLevel, label, flatModifier, modifierLabel);
  }

  /**
   * Handle clicking the damage button on a weapon item.
   * Performs the damage roll using the weapon's damage formula.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onItemDamageRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const li = element.closest('.item');
    const itemId = li?.dataset?.itemId;
    const item = this.actor.items.get(itemId); // This is the weapon item

    // Ensure it's a weapon and has damage defined
    if (!item || item.type !== 'weapon') return;
    if (!item.system?.damage?.formula) {
      ui.notifications.warn(
        `Weapon "${item.name}" has no damage formula defined.`
      );
      return;
    }

    const damageFormula = item.system.damage.formula;
    const damageType = item.system.damage.type || 'Physical'; // Default type if missing
    let label = `${item.name} Damage`;
    if (damageType) {
      label += ` (${damageType})`;
    }

    // Call the new damage roll helper
    await this._performDamageRoll(damageFormula, label, damageType);
  }

  /**
   * Performs a SURGE! system damage roll, adding the 'x6' surge rule.
   * @param {string} formula      The base damage formula (e.g., "1d6", "2d6+2").
   * @param {string} label        The label for the chat message.
   * @param {string} [damageType=""] Optional damage type for context.
   * @returns {Promise<void>}     Sends the result to chat.
   * @private
   */
  async _performDamageRoll(formula, label, damageType = '') {
    // Ensure 'x6' is added to d6s for SURGE, but not if already present (e.g., d6x)
    // This regex looks for 'd6' NOT immediately followed by 'x' or another digit.
    const surgeFormula = formula.replace(/d6(?![x0-9])/gi, 'd6x6');

    console.log(
      `SURGE | Rolling Damage - Base: ${formula}, Surge: ${surgeFormula}, Label: ${label}`
    );

    // Prepare roll data (mostly for context, damage usually doesn't use @attributes)
    const rollData = this.actor.getRollData() ?? {};

    const roll = new Roll(surgeFormula, rollData);
    try {
      await roll.evaluate(); // Use default async evaluate

      // TODO: Apply damage to targets later using hooks or chat message parsing

      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        // Could add flags for automation: flags: { surge: { damage: roll.total, type: damageType, itemId: item.id } }
      });
    } catch (err) {
      console.error(
        `SURGE | Damage roll evaluation failed for formula "${surgeFormula}":`,
        err
      );
      ui.notifications.error(`Failed to evaluate damage roll for ${label}.`);
    }
  }

  /**
   * Helper to find the first equipped item of a specific type.
   * @param {string} type The item type (e.g., "shield", "armor").
   * @returns {Item|null} The found item document or null.
   * @private
   */
  _findEquippedItem(type) {
    return this.actor.items.find(
      (item) => item.type === type && item.system?.equipped === true
    );
  }

  /**
   * Performs the roll for Melee Defense.
   * (Martial Combat Roll + STR Level + Shield Bonus)
   * @private
   */
  async _rollMeleeDefense() {
    const skill = this.actor.system.skills.martial;
    const attribute = this.actor.system.attributes.str;
    const skillLevel = skill?.value ?? 1;
    const strLevel = attribute?.value ?? 0;

    // Find equipped items
    const equippedShield = this._findEquippedItem('shield');
    const equippedArmor = this._findEquippedItem('armor'); // Check armor for penalties too

    // Compile modifiers
    const modifiers = [];
    if (strLevel !== 0) modifiers.push({ value: strLevel, label: 'STR Level' });

    // Add shield bonus vs melee
    const shieldBonus = equippedShield?.system?.defenseBonus ?? 0;
    if (shieldBonus !== 0)
      modifiers.push({
        value: shieldBonus,
        label: equippedShield?.name || 'Shield Bonus',
      });

    // Check armor/shield penalties affecting the roll (Martial skill or STR attribute)
    const martialPenalty =
      (equippedArmor?.system?.skillPenalties?.find((p) => p.skill === 'martial')
        ?.penalty ?? 0) +
      (equippedShield?.system?.skillPenalties?.find(
        (p) => p.skill === 'martial'
      )?.penalty ?? 0); // Shields unlikely to have skill penalties?
    const strPenalty =
      (equippedArmor?.system?.attributePenalties?.find(
        (p) => p.attribute === 'str'
      )?.penalty ?? 0) +
      (equippedShield?.system?.attributePenalties?.find(
        (p) => p.attribute === 'str'
      )?.penalty ?? 0); // Shields might have STR penalties? Check rules.

    if (martialPenalty !== 0)
      modifiers.push({
        value: -martialPenalty,
        label: 'Item Penalty (Martial)',
      }); // Penalties are positive in data, apply as negative mod
    if (strPenalty !== 0)
      modifiers.push({ value: -strPenalty, label: 'Item Penalty (STR)' });

    const label = `Melee Defense (${skill?.label || 'Martial'})`;
    console.log(`SURGE | DEBUG | Modifiers Array from ${label}:`, modifiers);
    await this._performRoll(skillLevel, label, modifiers);
  }

  /**
   * Performs the roll for Ranged Defense.
   * (Dexterity Roll + Armor Bonus)
   * @private
   */
  async _rollRangedDefense() {
    const attribute = this.actor.system.attributes.dex;
    const dexLevel = attribute?.value ?? 1;

    // Find equipped items
    const equippedArmor = this._findEquippedItem('armor');
    const equippedShield = this._findEquippedItem('shield');

    // Compile modifiers (Penalties applied to DEX roll)
    const modifiers = [];
    const armorDexPenalty =
      equippedArmor?.system?.attributePenalties?.find(
        (p) => p.attribute === 'dex'
      )?.penalty ?? 0;
    const shieldDexPenalty =
      equippedShield?.system?.attributePenalties?.find(
        (p) => p.attribute === 'dex'
      )?.penalty ?? 0;

    if (armorDexPenalty !== 0)
      modifiers.push({
        value: -armorDexPenalty,
        label: `${equippedArmor.name} Penalty (DEX)`,
      });
    if (shieldDexPenalty !== 0)
      modifiers.push({
        value: -shieldDexPenalty,
        label: `${equippedShield.name} Penalty (DEX)`,
      });
    // Note: Assumes penalties stored as positive numbers. Apply as negative modifier.

    // NOTE: Logic for blocking with shield using Melee Defense instead is NOT implemented here yet.
    const label = `Ranged Defense (${attribute?.label || 'Dexterity'})`;
    console.log(`SURGE | DEBUG | Modifiers Array from ${label}:`, modifiers);
    await this._performRoll(dexLevel, label, modifiers);
  }

  /**
   * Performs the roll for Magic Defense.
   * (Mystic Roll + INT Level) - Can be overridden by specific spells later.
   * @private
   */
  async _rollMagicDefense() {
    const skill = this.actor.system.skills.mystic;
    const attribute = this.actor.system.attributes.int;
    const skillLevel = skill?.value ?? 1;
    const intLevel = attribute?.value ?? 0;

    const modifiers = [];
    if (intLevel !== 0) modifiers.push({ value: intLevel, label: 'INT Level' });
    // TODO: Add logic later for bonuses from other effects/items if applicable

    const label = `Magic Defense (${skill?.label || 'Mystic'})`;
    console.log(`SURGE | DEBUG | Modifiers Array from ${label}:`, modifiers);
    await this._performRoll(skillLevel, label, modifiers);
  }

  // Define other event handler methods like _onItemAttack, etc.
  // Remember to use async for functions that perform rolls or update the actor.
} // End of SurgeCharacterSheet class

// --- System Initialization ---

// Register the character sheet with Foundry
Actors.registerSheet(
  'surge', // The system ID defined in your system.json
  SurgeCharacterSheet, // The sheet class you just defined
  {
    types: ['character'], // Apply this sheet ONLY to actors of type "character"
    makeDefault: true, // Make this the default sheet for characters
    label: 'SURGE! - Character Sheet', // Name displayed in the sheet selection dropdown
  }
);

// You can add Hooks here for system setup, migrations, etc.
Hooks.once('init', () => {
  console.log('SURGE! | System Initializing...');

  // Add system-specific configuration settings, constants, etc. here if needed
  // CONFIG.SURGE = { /* custom config data */ };

  // Preload Handlebars templates (optional but good practice)
  // preloadHandlebarsTemplates();
});

// Example function for preloading templates (call in init hook)
// async function preloadHandlebarsTemplates() {
//     const templatePaths = [
//         "systems/surge/templates/sheets/actor-sheet.hbs",
//         "systems/surge/templates/sheets/partials/attributes.hbs" // Example partial
// Add paths to all your .hbs files here
//     ];
//     return loadTemplates(templatePaths);
// }

console.log('SURGE! | surge.js Parsed');

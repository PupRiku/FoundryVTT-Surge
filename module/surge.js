import { SurgeItemSheet } from './item-sheet.js';

const SURGE_STATUS_EFFECTS = [
  {
    _id: 'CiFbrJB644My1E7a',
    id: 'blinded',
    label: 'Blinded',
    icon: 'systems/surge/assets/icons/conditions/blinded.svg',
  },
  {
    _id: 'X0B94OsMIFFHYykC',
    id: 'confused',
    label: 'Confused',
    icon: 'systems/surge/assets/icons/conditions/confused.svg',
    overrides: ['frightened'],
  },
  {
    _id: '1nDy2YviZYsHA6WQ',
    id: 'crushed',
    label: 'Crushed',
    icon: 'systems/surge/assets/icons/conditions/crushed.svg',
  },
  {
    _id: 'zhlwmiICCILgoceK',
    id: 'deafened',
    label: 'Deafened',
    icon: 'systems/surge/assets/icons/conditions/deafened.svg',
  },
  {
    _id: 'upqoDHxug18MJTJl',
    id: 'flame-resistant',
    label: 'Flame Resistant',
    icon: 'systems/surge/assets/icons/conditions/flame-resistant.svg',
  },
  {
    _id: 'c0Hp54Munn0qjmOw',
    id: 'flammable',
    label: 'Flammable',
    icon: 'systems/surge/assets/icons/conditions/flammable.svg',
  },
  {
    _id: 'ra1oykUkbjco9M4K',
    id: 'frightened',
    label: 'Frightened',
    icon: 'systems/surge/assets/icons/conditions/frightened.svg',
  },
  {
    _id: 'NoL0eThjNde5wvP1',
    id: 'frozen',
    label: 'Frozen',
    icon: 'systems/surge/assets/icons/conditions/frozen.svg',
  },
  {
    _id: '4g684UdZKfGoFVsF',
    id: 'insulated',
    label: 'Insulated',
    icon: 'systems/surge/assets/icons/conditions/insulated.svg',
  },
  {
    _id: 'Da6o6o1vHy0revBT',
    id: 'invisible',
    label: 'Invisible',
    icon: 'systems/surge/assets/icons/conditions/invisible.svg',
  },
  {
    _id: 'CtILfChEik9iDE5E',
    id: 'mute',
    label: 'Mute',
    icon: 'systems/surge/assets/icons/conditions/mute.svg',
  },
  {
    _id: '0nHv67C41zCeqPAB',
    id: 'paralyzed',
    label: 'Paralyzed',
    icon: 'systems/surge/assets/icons/conditions/paralyzed.svg',
  },
  {
    _id: 'QfxIEGwt814oIiJe',
    id: 'pinned',
    label: 'Pinned',
    icon: 'systems/surge/assets/icons/conditions/pinned.svg',
  },
  {
    _id: 'Dg7i2lzQCcCsX3LR',
    id: 'poisoned',
    label: 'Poisoned',
    icon: 'systems/surge/assets/icons/conditions/poisoned.svg',
  },
  {
    _id: '0TUl3HTQw2sBdz5h',
    id: 'prone',
    label: 'Prone',
    icon: 'systems/surge/assets/icons/conditions/prone.svg',
  },
  {
    _id: 'ALLZtyqc01Ir0bxZ',
    id: 'restrained',
    label: 'Restrained',
    icon: 'systems/surge/assets/icons/conditions/restrained.svg',
  },
  {
    _id: 'ME4wf44uWUZihe1M',
    id: 'stunned',
    label: 'Stunned',
    icon: 'systems/surge/assets/icons/conditions/stunned.svg',
  },
  {
    _id: 'oxnyO8qon9F672wl',
    id: 'unconscious',
    label: 'Unconscious',
    icon: 'systems/surge/assets/icons/conditions/unconscious.svg',
  },
  {
    _id: 'X1DSVUGsSBhkBSGa',
    id: 'wet',
    label: 'Wet',
    icon: 'systems/surge/assets/icons/conditions/wet.svg',
  },
  // IMPORTANT: Make sure the _id values here are the same unique IDs you generated before!
];

// --- Active Effect Data for Blinded ---
const blindedEffectData = {
  name: 'Blinded', // Use 'name' for V12+
  img: 'systems/surge/assets/icons/conditions/blinded.svg', // Use 'img' for V12+
  // Duration: Set to permanent/infinite by default for simplicity.
  // Handling the '2d6 hours' requires JS when the effect is applied.
  duration: { seconds: null, rounds: null, turns: null },
  // The 'changes' array primarily sets a flag for our JS code to check.
  changes: [
    {
      key: 'flags.surge.blinded', // Custom flag path
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE, // Set the flag value
      value: 'true', // Use string "true"
      priority: 10, // Default priority is usually fine
    },
  ],
  // Add a flag to easily link this AE back to the statusId if needed
  flags: {
    core: {
      statusId: 'blinded',
    },
    // We could potentially store the duration roll result here later
  },
};

// --- Active Effect Data for Confused ---
const confusedEffectData = {
  name: 'Confused', // V12+ name
  img: 'systems/surge/assets/icons/conditions/confused.svg', // V12+ img
  duration: { seconds: 86400, rounds: null, turns: null }, // 1 Day
  changes: [
    // ONLY set the flag now
    {
      key: 'flags.surge.confused', // Custom flag to signal condition active
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  // No flags.core.statusId needed
};

// --- Active Effect Data for Temporary Helplessness (from Confused 5-6) ---
const helplessEffectData = {
  name: 'Helpless (Confused)', // Distinguish from other potential helpless states
  img: 'icons/svg/ruins.svg', // Placeholder icon - choose one you like
  duration: { rounds: 1, turns: null, seconds: null }, // Lasts until the start of the next turn
  changes: [
    {
      key: 'flags.surge.helpless', // Custom flag
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
    // TODO: Add changes here later to reduce defense values if desired
  ],
  flags: { surge: { temporaryConfusedEffect: true } }, // Flag to mark it as temporary
};

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
   * Handles the 'Blinded' condition.
   * @param {number} level                The attribute or skill level (1-20).
   * @param {string} label                The label for the roll (e.g., "Strength Check").
   * @param {Array<{value: number, label: string}>} [modifiers=[]] Optional array of modifier objects.
   * @returns {Promise<void>}             Sends the result to chat.
   * @private
   */
  async _performRoll(level, label, modifiers = [], attributeKey = null) {
    level = Math.max(1, Math.min(20, level || 1)); // Ensure level is 1-20
    const rollData = this._rollTable[level];
    if (!rollData) {
      console.error(`SURGE | Invalid level for roll table lookup: ${level}`);
      ui.notifications.error(`Invalid level (${level}) for ${label}.`);
      return;
    }

    // --- Check for Conditions ---
    const isBlinded = this.actor.flags?.surge?.blinded === true;
    const isConfused = this.actor.flags?.surge?.confused === true;

    // --- Apply Confused Penalty (if applicable) ---
    // Make sure 'modifiers' is definitely an array before modifying
    if (!Array.isArray(modifiers)) {
      modifiers = [];
    }

    if (isConfused && (attributeKey === 'int' || attributeKey === 'cha')) {
      console.log(
        `SURGE | ${
          this.actor.name
        } is Confused. Adding -2 penalty to ${attributeKey.toUpperCase()} roll.`
      );
      // Add the penalty directly to the modifiers array for this roll
      modifiers.push({ value: -2, label: 'Confused Penalty' });
    }
    // --- End Confused Penalty ---

    let diceToRoll = rollData.dice;
    let autoFail = false;

    // --- Apply Blinded Penalty ---
    if (isBlinded) {
      console.log(`SURGE | ${this.actor.name} is Blinded. Reducing dice.`);
      diceToRoll = diceToRoll - 1; // Remove one die

      // Check for auto-fail condition
      if (diceToRoll <= 0) {
        console.log(`SURGE | Blinded auto-fail condition met.`);
        autoFail = true;
        diceToRoll = 0; // Ensure dice count is 0 for formula if we proceeded (we won't)
      }
    }
    // --- END: Blinded Check ---

    // --- Handle Auto-Fail ---
    if (autoFail) {
      const messageContent = `${this.actor.name} is Blinded and has no dice left to roll, automatically failing the ${label}.`;
      ChatMessage.create({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: messageContent,
        // You might want to add whisper targets or customize further
      });
      ui.notifications.warn(
        `${this.actor.name} automatically failed ${label} due to Blindness.`
      );
      return; // Stop the roll process
    }
    // --- END: Auto-Fail Handling ---

    // Base formula with SURGING dice (x6)
    let formula = `${diceToRoll}d6x6`;
    if (rollData.mod !== 0) {
      formula += ` + ${rollData.mod}`;
    }

    // Prepare data object for the Roll class, including actor data
    let rollDataObject = { ...this.actor.getRollData() };
    let modifierDesc = [];

    // --- Loop through the modifiers array --- THIS IS THE KEY PART ---
    for (const mod of modifiers) {
      if (typeof mod.value !== 'number' || mod.value === 0) continue;
      const modValue = mod.value;
      const modLabel = mod.label || 'Modifier';
      const modSign = modValue > 0 ? '+' : '';
      const modKey =
        modLabel.toLowerCase().replace(/[^a-z0-9]/g, '') ||
        `mod${foundry.utils.randomID(4)}`;
      let finalKey = modKey;
      if (!finalKey) finalKey = `mod${foundry.utils.randomID(4)}`;
      let i = 0;
      while (finalKey in rollDataObject) {
        finalKey = `${modKey}_${++i}`;
      }
      console.log(
        `SURGE DEBUG | _performRoll Loop: Processing mod=${JSON.stringify(
          mod
        )}, finalKey=${finalKey}, currentFormula=${formula}`
      );
      formula += ` ${modSign} @${finalKey}`;
      rollDataObject[finalKey] = modValue;
      modifierDesc.push(`${modLabel}: ${modSign}${modValue}`);
    }
    // --- End of loop ---

    console.log(
      `SURGE | Rolling - Level: ${level}, Modifiers: [${modifierDesc.join(
        ', '
      )}], Formula: ${formula}, Data:`,
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
    const inventoryTab = html.find('.tab.items');

    inventoryTab.find('.item-edit').click(this._onItemEdit.bind(this));
    inventoryTab.find('.item-delete').click(this._onItemDelete.bind(this));
    inventoryTab
      .find('.item-toggle-equip')
      .click(this._onItemToggleEquipped.bind(this));

    // --- Item Roll Listeners ---
    inventoryTab
      .find('.item-roll-attack')
      .click(this._onItemAttackRoll.bind(this));
    inventoryTab
      .find('.item-roll-damage')
      .click(this._onItemDamageRoll.bind(this));

    // --- Custom Effect Control Listeners ---
    // Find controls ONLY inside the Effects tab
    const effectsTab = html.find('.tab.effects');

    // Ensure we target the correct links and bind the NEW custom methods
    effectsTab
      .find('.effect-control[data-action="toggle"]')
      .click(this._onEffectToggle.bind(this));
    effectsTab
      .find('.effect-control[data-action="edit"]')
      .click(this._onEffectEdit.bind(this));
    effectsTab
      .find('.effect-control[data-action="delete"]')
      .click(this._onEffectDelete.bind(this));

    console.log('SURGE! | Attached CUSTOM effect control listeners.');
  }

  /**
   * Handle clicking on an attribute label/block to roll it.
   * Checks for Ctrl key for Ranged Defense on Dexterity.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onAttributeRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const attributeKey = element.dataset.attribute;
    const attribute = this.actor.system.attributes[attributeKey];

    if (attribute) {
      const level = attribute.value;
      const isCtrl = event.ctrlKey || event.metaKey;

      if (attributeKey === 'dex' && isCtrl) {
        // Ranged Defense (handles penalties internally)
        await this._rollRangedDefense();
      } else {
        // Basic Attribute Check
        let modifiers = this._getEquippedPenalties(attributeKey, null); // <<< Get penalties for this attribute
        await this._performRoll(
          level,
          `${attribute.label} Check`,
          modifiers,
          attributeKey
        ); // <<< Pass penalties
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

      // Determine primary attribute possibly affected by penalties related to this skill
      // Example: Guile uses DEX penalties, Martial doesn't seem linked explicitly?
      let primaryAttributeKey = null;
      if (skillKey === 'guile' || skillKey === 'marksmanship')
        primaryAttributeKey = 'dex'; // Apply DEX penalties to Guile? Check rules. Assume YES for now.
      // if (skillKey === 'marksmanship') primaryAttributeKey = 'dex'; // Apply DEX penalties to Marksmanship? Assume YES.

      // Get base penalties related to this skill AND its potential base attribute
      let basePenalties = this._getEquippedPenalties(
        primaryAttributeKey,
        skillKey
      );

      if (skillKey === 'martial') {
        if (isShift) {
          // Melee Weapon Attack
          const strLevel = actorAttributes.str?.value ?? 0;
          // Combine penalties with attack bonus
          let modifiers = [
            ...basePenalties, // Add general penalties first (e.g. if shield penalizes martial?)
            { value: strLevel, label: 'STR Level' },
          ];
          console.log(
            `SURGE DEBUG | _onSkillRoll for ${skillKey} - Base Penalties Found:`,
            JSON.parse(JSON.stringify(basePenalties))
          ); // Add this log
          await this._performRoll(
            level,
            `Melee Weapon Attack (${skill.label})`,
            modifiers
          );
        } else if (isCtrl) {
          // Melee Defense (handles penalties internally)
          await this._rollMeleeDefense();
        } else {
          // Basic Check
          console.log(
            `SURGE DEBUG | _onSkillRoll for ${skillKey} - Base Penalties Found:`,
            JSON.parse(JSON.stringify(basePenalties))
          ); // Add this log
          await this._performRoll(level, `${skill.label} Check`, basePenalties); // Pass relevant penalties
        }
      } else if (skillKey === 'mystic') {
        if (isCtrl) {
          // Magic Defense (handles penalties internally)
          await this._rollMagicDefense();
        } else {
          // Basic Check
          // Does INT penalty affect Mystic? Assume no for now unless rules state otherwise.
          let mysticPenalties = this._getEquippedPenalties(null, skillKey); // Only check skill penalty
          console.log(
            `SURGE DEBUG | _onSkillRoll for ${skillKey} - Base Penalties Found:`,
            JSON.parse(JSON.stringify(basePenalties))
          ); // Add this log
          await this._performRoll(
            level,
            `${skill.label} Check`,
            mysticPenalties
          );
        }
      } else {
        // Other skill basic checks
        console.log(
          `SURGE DEBUG | _onSkillRoll for ${skillKey} - Base Penalties Found:`,
          JSON.parse(JSON.stringify(basePenalties))
        ); // Add this log
        await this._performRoll(level, `${skill.label} Check`, basePenalties); // Pass relevant penalties
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
    const item = this.actor.items.get(itemId); // Weapon item

    if (!item || item.type !== 'weapon') return;

    const skillKey = item.system.skillUsed || 'martial';
    const skill = this.actor.system.skills[skillKey];
    const skillLevelOrDefault = skill?.value ?? 1;

    let label = `${item.name} Attack (${skill?.label || skillKey})`;

    // --- Get relevant penalties ---
    // Check for penalties on the skill itself and the assumed base attribute
    let primaryAttributeKey = null;
    if (skillKey === 'marksmanship') primaryAttributeKey = 'dex'; // Marksmanship affected by DEX penalty? Assume YES.
    // Martial attacks likely not affected by general DEX/Guile penalties? Assume NO for attack roll.

    let basePenalties = this._getEquippedPenalties(
      primaryAttributeKey,
      skillKey
    );
    // --- End Penalties ---

    // Add STR Level bonus ONLY for Melee Weapon attacks using Martial skill
    let attackBonus = [];
    if (item.system.weaponType === 'melee' && skillKey === 'martial') {
      const strLevel = this.actor.system.attributes.str?.value ?? 0;
      attackBonus.push({ value: strLevel, label: 'STR Level' });
    }

    // Combine all modifiers
    let finalModifiers = [...basePenalties, ...attackBonus];

    await this._performRoll(skillLevelOrDefault, label, finalModifiers);
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
   * Finds equipped armor/shield and calculates relevant penalties for a roll.
   * Penalties in template.json are positive numbers, returned here as negative values.
   * @param {string|null} attributeKey The key of the attribute being rolled (e.g., "dex"), or null.
   * @param {string|null} skillKey     The key of the skill being rolled (e.g., "guile"), or null.
   * @returns {Array<{value: number, label: string}>} An array of modifier objects for penalties.
   * @private
   */
  _getEquippedPenalties(attributeKey = null, skillKey = null) {
    const equippedArmor = this._findEquippedItem('armor');
    const equippedShield = this._findEquippedItem('shield');
    const penalties = [];
    let totalAttrPenalty = 0;
    let totalSkillPenalty = 0;
    let armorName = equippedArmor?.name || 'Armor';
    let shieldName = equippedShield?.name || 'Shield';

    // Check Armor penalties
    if (equippedArmor) {
      if (attributeKey) {
        totalAttrPenalty +=
          equippedArmor.system?.attributePenalties?.find(
            (p) => p.attribute === attributeKey
          )?.penalty ?? 0;
      }
      if (skillKey) {
        totalSkillPenalty +=
          equippedArmor.system?.skillPenalties?.find(
            (p) => p.skill === skillKey
          )?.penalty ?? 0;
      }
    }
    // Check Shield penalties
    if (equippedShield) {
      if (attributeKey) {
        totalAttrPenalty +=
          equippedShield.system?.attributePenalties?.find(
            (p) => p.attribute === attributeKey
          )?.penalty ?? 0;
      }
      if (skillKey) {
        totalSkillPenalty +=
          equippedShield.system?.skillPenalties?.find(
            (p) => p.skill === skillKey
          )?.penalty ?? 0;
      }
    }

    // Add to modifiers array if penalties exist (stored as positive, applied as negative)
    if (totalAttrPenalty > 0) {
      // Find which item(s) caused the penalty for a better label
      let sources = [];
      if (
        (equippedArmor?.system?.attributePenalties?.find(
          (p) => p.attribute === attributeKey
        )?.penalty ?? 0) > 0
      )
        sources.push(armorName);
      if (
        (equippedShield?.system?.attributePenalties?.find(
          (p) => p.attribute === attributeKey
        )?.penalty ?? 0) > 0
      )
        sources.push(shieldName);
      let label =
        sources.length > 0
          ? `${sources.join('/')} Penalty (${attributeKey.toUpperCase()})`
          : `Item Penalty (${attributeKey.toUpperCase()})`;
      penalties.push({ value: -totalAttrPenalty, label: label });
    }
    if (totalSkillPenalty > 0) {
      let sources = [];
      if (
        (equippedArmor?.system?.skillPenalties?.find(
          (p) => p.skill === skillKey
        )?.penalty ?? 0) > 0
      )
        sources.push(armorName);
      if (
        (equippedShield?.system?.skillPenalties?.find(
          (p) => p.skill === skillKey
        )?.penalty ?? 0) > 0
      )
        sources.push(shieldName);
      let label =
        sources.length > 0
          ? `${sources.join('/')} Penalty (${skillKey})`
          : `Item Penalty (${skillKey})`;
      penalties.push({ value: -totalSkillPenalty, label: label });
    }

    console.log(
      `SURGE DEBUG | _getEquippedPenalties Input: attr='<span class="math-inline">\{attributeKey\}', skill\='</span>{skillKey}'`
    );
    console.log(
      `SURGE DEBUG | _getEquippedPenalties Calculated: attrPenalty=<span class="math-inline">\{totalAttrPenalty\}, skillPenalty\=</span>{totalSkillPenalty}`
    );
    console.log(
      `SURGE DEBUG | _getEquippedPenalties Returning:`,
      JSON.parse(JSON.stringify(penalties))
    ); // Deep copy for clean log

    return penalties;
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
    const equippedShield = this._findEquippedItem('shield');
    const shieldBonus = equippedShield?.system?.defenseBonus ?? 0;

    // Get specific penalties for Martial skill and STR attribute
    const penalties = this._getEquippedPenalties('str', 'martial');

    const modifiers = [
      // Start with penalties
      ...penalties,
      // Add base attribute bonus
      { value: strLevel, label: 'STR Level' },
      // Add shield bonus
      { value: shieldBonus, label: equippedShield?.name || 'Shield Bonus' },
    ];
    // Filter out zero-value modifiers for cleaner logs/tooltips
    const finalModifiers = modifiers.filter((m) => m.value !== 0);

    const label = `Melee Defense (${skill?.label || 'Martial'})`;
    await this._performRoll(skillLevel, label, finalModifiers);
  }

  /**
   * Performs the roll for Ranged Defense.
   * (Dexterity Roll + Armor Bonus)
   * @private
   */
  async _rollRangedDefense() {
    const attribute = this.actor.system.attributes.dex;
    const dexLevel = attribute?.value ?? 1;

    // Get specific penalties for DEX attribute roll
    const penalties = this._getEquippedPenalties('dex', null);

    // Filter out zero-value modifiers
    const finalModifiers = penalties.filter((m) => m.value !== 0);

    // NOTE: Logic for blocking with shield using Melee Defense instead is NOT implemented here yet.
    const label = `Ranged Defense (${attribute?.label || 'Dexterity'})`;
    await this._performRoll(dexLevel, label, finalModifiers);
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

    // Get specific penalties for Mystic skill and INT attribute
    const penalties = this._getEquippedPenalties('int', 'mystic');

    const modifiers = [
      ...penalties, // Apply penalties first
      { value: intLevel, label: 'INT Level' }, // Add base attribute bonus
    ];
    // Filter out zero-value modifiers
    const finalModifiers = modifiers.filter((m) => m.value !== 0);

    // NOTE: Logic for spell-specific defense rolls not yet implemented.
    const label = `Magic Defense (${skill?.label || 'Mystic'})`;
    await this._performRoll(skillLevel, label, finalModifiers);
  }

  /**
   * Handle toggling the enabled/disabled state of an Active Effect.
   * @param {Event} event   The originating click event.
   * @private
   */
  async _onEffectToggle(event) {
    event.preventDefault();
    const effectId = event.currentTarget.closest('.effect')?.dataset?.effectId;
    const effect = this.actor.effects.get(effectId);
    if (effect) {
      try {
        await effect.update({ disabled: !effect.disabled });
        console.log(`SURGE | Toggled effect ${effect.name} (${effectId})`);
        // The sheet should re-render automatically on update
      } catch (err) {
        console.error(`SURGE | Failed to toggle effect ${effectId}:`, err);
        ui.notifications.error('Failed to toggle effect.');
      }
    } else {
      console.warn(
        `SURGE | Toggle clicked for non-existent effect ID: ${effectId}`
      );
    }
  }

  /**
   * Handle opening the configuration sheet for an Active Effect.
   * @param {Event} event   The originating click event.
   * @private
   */
  _onEffectEdit(event) {
    // No async needed typically for just rendering sheet
    event.preventDefault();
    const effectId = event.currentTarget.closest('.effect')?.dataset?.effectId;
    const effect = this.actor.effects.get(effectId);
    if (effect) {
      effect.sheet.render(true);
      console.log(
        `SURGE | Opening sheet for effect ${effect.name} (${effectId})`
      );
    } else {
      console.warn(
        `SURGE | Edit clicked for non-existent effect ID: ${effectId}`
      );
    }
  }

  /**
   * Handle deleting an Active Effect from the Actor.
   * @param {Event} event   The originating click event.
   * @private
   */
  async _onEffectDelete(event) {
    event.preventDefault();
    const effectId = event.currentTarget.closest('.effect')?.dataset?.effectId;
    const effect = this.actor.effects.get(effectId);
    if (effect) {
      // Optional: Add a confirmation dialog here if desired
      // Dialog.confirm({ ... title: `Delete ${effect.name}?`, yes: async () => { ... }})
      try {
        await effect.delete(); // effect.delete() is simpler than actor.deleteEmbeddedDocuments
        console.log(`SURGE | Deleted effect ${effect.name} (${effectId})`);
        // The sheet should re-render automatically on deletion
      } catch (err) {
        console.error(`SURGE | Failed to delete effect ${effectId}:`, err);
        ui.notifications.error('Failed to delete effect.');
      }
    } else {
      console.warn(
        `SURGE | Delete clicked for non-existent effect ID: ${effectId}`
      );
    }
  }

  // Define other event handler methods like _onItemAttack, etc.
  // Remember to use async for functions that perform rolls or update the actor.
} // End of SurgeCharacterSheet class

/**
 * Handles the start of a combatant's turn to check for Confused behavior.
 * @param {Combat} combat The Combat document being updated.
 * @param {object} changed Object describing the changes made.
 * @param {object} options Additional options which trigger this update.
 * @param {string} userId The ID of the User triggering the update.
 */
async function handleCombatTurnStart(combat, changed, options, userId) {
  // Only execute logic for the primary GM to avoid duplication
  if (!game.user.isGM) {
    return;
  }

  // Check if the turn or round number actually changed
  if (changed.round === undefined && changed.turn === undefined) {
    if (
      !combat.combatant ||
      combat.combatant?.id === combat.previous?.combatant?.id
    ) {
      return;
    }
  }

  // Get the current combatant and their actor/token
  const combatant = combat.combatant;
  if (!combatant) return;
  const actor = combatant.actor;
  const sourceToken = combatant.token?.object; // Get the Token _Object_ on the canvas
  if (!actor || !sourceToken) return;

  // Check if the actor is Confused
  const isConfused = actor.flags?.surge?.confused === true;
  // Alternate check: const isConfused = actor.effects.some(e => e.flags?.core?.statusId === 'confused' && !e.disabled);
  if (!isConfused) {
    return;
  }

  console.log(
    `SURGE | Detected start of turn for Confused actor: ${actor.name}`
  );

  // --- Roll 1d6 ---
  const roll = await new Roll('1d6').evaluate();
  const rollResult = roll.total;
  // Send the confusion roll result to chat immediately
  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: ` rolls 1d6 for Confusion effect:`,
  });

  // --- Determine Action ---
  let messageContent = `${actor.name} is Confused (Rolled ${rollResult}) and `;
  let closestTarget = null;
  let closestTargetName = 'something nearby'; // Default text

  // --- Find Closest Creature (Basic Implementation) ---
  if (rollResult <= 4) {
    // Only need target for 1-4
    let minDist = Infinity;
    const sourceCenter = sourceToken?.center;

    // Ensure we have source center before proceeding
    if (
      sourceCenter &&
      typeof sourceCenter.x === 'number' &&
      typeof sourceCenter.y === 'number'
    ) {
      // Iterate through combatants in the current combat encounter
      for (const potentialCombatant of combat.combatants) {
        // --- Filter potential targets ---
        if (potentialCombatant.id === combatant.id) continue; // Skip self
        if (!potentialCombatant.actor || !potentialCombatant.tokenId) continue; // Skip if no actor or token ID
        if (potentialCombatant.isDefeated) continue; // Skip defeated combatants

        // Get the Token OBJECT from the canvas using the combatant's tokenId
        const targetTokenObject = canvas.tokens.get(potentialCombatant.tokenId);

        // Check if the token object exists on the CURRENT canvas and isn't hidden
        if (!targetTokenObject || targetTokenObject.document?.hidden) continue;

        // Check HP (using the actor from the canvas token object for consistency)
        if ((targetTokenObject.actor?.system?.passives?.hp?.value ?? 0) <= 0)
          continue;

        // Check if target has valid center coordinates
        const targetCenter = targetTokenObject.center;
        console.log(
          `SURGE DEBUG | Checking Target: ${potentialCombatant.name}`
        );
        console.log(`SURGE DEBUG | Target Center:`, targetCenter);

        if (
          targetCenter &&
          typeof targetCenter.x === 'number' &&
          typeof targetCenter.y === 'number'
        ) {
          try {
            const pathMeasurement = canvas.grid.measurePath([
              sourceCenter,
              targetCenter,
            ]);
            const d = pathMeasurement.distance;
            console.log(
              `SURGE DEBUG | Calculated Distance to ${potentialCombatant.name}: ${d}`
            );

            if (d < minDist) {
              minDist = d;
              // Store the actual Token OBJECT as the closest target
              closestTarget = targetTokenObject;
            }
          } catch (measureError) {
            console.error(
              `SURGE | Error measuring path to target ${potentialCombatant.name}:`,
              measureError
            );
          }
        } else {
          console.warn(
            `SURGE | Skipping distance measurement for target ${potentialCombatant.name} due to invalid center point.`
          );
        }
      }
    } else {
      console.warn(
        `SURGE | Skipping target search due to invalid source center point.`
      );
    }

    if (closestTarget) {
      closestTargetName = closestTarget.name;
    }
  }

  // --- Determine Message and Apply Helpless if needed ---
  switch (rollResult) {
    case 1:
    case 2:
      messageContent += `attacks the closest creature: ${closestTargetName}! (GM should adjudicate)`;
      break;
    case 3:
    case 4:
      messageContent += `falls in love with the closest creature: ${closestTargetName}, defending it! (GM should adjudicate)`;
      break;
    case 5:
    case 6:
      messageContent += `is incapable of acting or defending this turn!`;
      // --- Apply or Reset Helpless Effect ---
      try {
        // Find the existing temporary Helpless effect from this source
        const existingHelpless = actor.effects.find(
          (e) => e.flags?.surge?.temporaryConfusedEffect === true
        );

        if (existingHelpless) {
          // If found, reset its duration back to 1 round
          await existingHelpless.update({ duration: { rounds: 1 } });
          console.log(
            `SURGE | Reset duration of existing Helpless effect for ${actor.name}`
          );
        } else {
          // If not found, create a new one
          // Ensure helplessEffectData is accessible (defined elsewhere in the file)
          await ActiveEffect.create(helplessEffectData, { parent: actor });
          console.log(
            `SURGE | Applied NEW Helpless (Confused) effect to ${actor.name}`
          );
        }
      } catch (err) {
        console.error(
          `SURGE | Failed to apply/reset Helpless effect for ${actor.name}:`,
          err
        );
      }
      // --- End Apply or Reset ---
      break;
  }

  // --- Send Final Outcome Message ---
  ChatMessage.create({
    user: game.user.id, // Or null to appear as "System"
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    content: messageContent,
    // type: CONST.CHAT_MESSAGE_TYPES.OTHER // Or EMOTE etc.
  });
}

// Register the combat turn handler hook once the game is ready
Hooks.once('ready', () => {
  Hooks.on('updateCombat', handleCombatTurnStart);
  console.log(
    'SURGE! | Registered combat turn handler for Confused condition.'
  );
});

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

  // --- Replace Default Status Effects with Custom Ones ---
  console.log('SURGE! | Replacing default status effects with custom list...');

  // Map the SURGE_STATUS_EFFECTS array to the required format {id, name, img}
  const customEffects = SURGE_STATUS_EFFECTS.map((effect) => {
    let effectData = {
      id: effect.id,
      name: effect.label, // Use V12+ name
      img: effect.icon, // Use V12+ img
    };
    // Add overrides specifically for 'confused'
    if (effect.id === 'confused') {
      effectData.overrides = ['frightened']; // Assuming 'frightened' is the ID of the Frightened status
    }
    return effectData;
  });

  // Directly assign the mapped array to CONFIG.statusEffects, overwriting the defaults
  CONFIG.statusEffects = customEffects;

  console.log(
    `SURGE! | Registered ${CONFIG.statusEffects.length} custom status effects.`
  );
  // --- End Status Effect Registration ---

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

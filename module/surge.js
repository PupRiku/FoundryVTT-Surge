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
   * Performs a SURGE! system roll based on a stat level and optional modifiers.
   * Includes the 'x6' exploding dice rule.
   * @param {number} level              The attribute or skill level (1-20).
   * @param {string} label              The label for the roll (e.g., "Strength Check", "Guile Check").
   * @param {number} [flatModifier=0]   Optional flat bonus/penalty added AFTER dice (e.g., STR level).
   * @param {string} [modifierLabel=""] Optional label for the flat modifier (e.g., "STR Level").
   * @returns {Promise<void>}           Sends the result to chat.
   * @private
   */
  async _performRoll(level, label, flatModifier = 0, modifierLabel = '') {
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
    let rollDataObject = { ...this.actor.getRollData() }; // Include actor data like @attributes.str.value etc.

    // Add flat modifier to formula and data object if present
    if (flatModifier !== 0) {
      const modSign = flatModifier > 0 ? '+' : ''; // Keep sign for negatives
      // Create a simple key like 'strLevel' or 'mod' from the label for the data object
      const modKey =
        modifierLabel.toLowerCase().replace(/[^a-z0-9]/g, '') || 'modifier';
      formula += ` ${modSign} @${modKey}`;
      rollDataObject[modKey] = flatModifier; // Add modifier value to data
    }

    console.log(
      `SURGE | Rolling - Level: ${level}, Formula: ${formula}, Data:`,
      rollDataObject,
      `Label: ${label}`
    );

    // Create and evaluate the roll using Foundry's Roll class
    const roll = new Roll(formula, rollDataObject);
    try {
      // Evaluate the roll asynchronously
      await roll.evaluate();

      // Send the result to the chat, using the provided label
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label, // e.g., "Strength Check"
        // Add flags if needed later: flags: { surge: { level: level } }
      });
    } catch (err) {
      console.error('SURGE | Roll evaluation failed:', err);
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
    // Get the base data context object from the parent class (ActorSheet)
    const context = await super.getData(options);

    // Make the actor's system data easily accessible in the template
    // 'system' will contain everything defined in your template.json for the character
    context.systemData = context.actor.system;

    // --- Add calculated data here ---

    // Calculate Max Actions based on Dexterity Level (rounding down)
    const dexLevel = context.systemData.attributes?.dex?.value ?? 1; // Safely get DEX level, default to 1 if not found
    // We'll store the calculated actions info directly in the context for the template
    context.calculatedActions = {
      max: Math.floor(dexLevel / 2) + 2,
      label: 'Actions per Turn',
      // We might add 'value' later for tracking current actions within a turn
    };

    // Calculate Max HP (incorporating Base HP and En-Counter)
    // Note: Initial HP calculation based on STR roll at creation is not handled here yet.
    // This calculates the *current* maximum based on ongoing progression.
    const baseHp = context.systemData.passives?.hp?.base ?? 0;
    const encounter = context.systemData.passives?.encounter?.value ?? 0;

    // TODO: Need to factor in the initial bonus HP from the Level 1 STR roll.
    // For now, let's assume a 'startingMaxHp' field exists or calculate a simple max.
    // We'll just calculate the dynamic part for now. A 'getter' might be better later.
    const startingMaxHp =
      context.systemData.passives?.hp?.startingMax ?? baseHp; // Assume startingMax exists or fallback to base
    context.systemData.passives.hp.max = startingMaxHp + encounter;
    // Ensure current HP doesn't exceed the calculated max
    context.systemData.passives.hp.value = Math.min(
      context.systemData.passives.hp.value,
      context.systemData.passives.hp.max
    );

    // Calculate Total Menace (Placeholder - needs logic for equipped items)
    const baseMenace = context.systemData.passives?.menace?.base ?? 0;
    // TODO: Get menace contribution from equipped armor and weapons
    const equipmentMenace = 0; // Placeholder value
    // Add a 'total' value for easy display on the sheet
    context.systemData.passives.menace.total = baseMenace + equipmentMenace;

    // Log the prepared data for debugging purposes
    console.log('SURGE! | Character Sheet Data Context:', context);

    // Return the context object which Handlebars will use to render the sheet
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

    // Listener for Attribute Blocks (make sure block has .rollable)
    html
      .find('.attribute-block-label.rollable')
      .click(this._onAttributeRoll.bind(this));

    // Listener for Skill Labels
    html.find('.skill-label.rollable').click(this._onSkillRoll.bind(this));

    // Add more listeners later (e.g., for items, weapons)
  }

  /**
   * Example placeholder handler for rolling an attribute check.
   * @param {Event} event The triggering event.
   * @private
   */
  async _onAttributeRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const attributeKey = element.dataset.attribute; // Expect 'data-attribute="str"' on the HTML element
    const attribute = this.actor.system.attributes[attributeKey];

    if (attribute) {
      const label = `${attribute.label} Check`; // e.g., "Strength Check"
      const level = attribute.value;
      // Perform the basic roll using the attribute level
      // We are NOT adding STR level or other bonuses here yet
      await this._performRoll(level, label);
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
    const skillKey = element.dataset.skill; // data-skill="clerical" etc.
    const skill = this.actor.system.skills[skillKey];
    const actorAttributes = this.actor.system.attributes; // Get attributes object

    if (skill) {
      const level = skill.value;
      let label = `${skill.label} Check`; // Default: "Martial Combat Check"
      let flatModifier = 0;
      let modifierLabel = '';

      // --- Check for Modifier Keys and specific skills ---
      const isShift = event.shiftKey;
      const isCtrl = event.ctrlKey || event.metaKey; // Use Ctrl (or Cmd on Mac)

      // --- Variations for Martial Combat ---
      if (skillKey === 'martial') {
        const strLevel = actorAttributes.str?.value ?? 0; // Get STR Level safely

        if (isShift) {
          // Shift + Click = Melee Weapon Attack Roll
          label = `Melee Weapon Attack (${skill.label})`;
          flatModifier = strLevel; // Add STR Level value
          modifierLabel = 'STR Level'; // Label for the modifier in roll formula/tooltip
          // Note: We assume any Shift+Click is a WEAPON attack for now.
          //       Unarmed attack (no STR bonus) would just be a normal click.
        } else if (isCtrl) {
          // Ctrl + Click = Melee Defense Roll
          label = `Melee Defense (${skill.label})`;
          flatModifier = strLevel; // Add STR Level value
          modifierLabel = 'STR Level'; // Label for the modifier
          // TODO: Add logic here later to find equipped shield bonus and add it too
          // TODO: flatModifier += shieldBonus;
        }
        // Else (no modifier key): Basic Martial Combat check (uses default label/mods)
      } // --- Variations for Mystic ---
      else if (skillKey === 'mystic') {
        const intLevel = actorAttributes.int?.value ?? 0; // Get INT Level safely

        if (isCtrl) {
          // Ctrl + Click = Magic Defense Roll (example)
          label = `Magic Defense (${skill.label})`;
          flatModifier = intLevel; // Add INT Level value
          modifierLabel = 'INT Level'; // Label for the modifie
        }
        // Else (no modifier key / Shift): Basic Mystic check (or maybe Shift for attack?)
        // TODO: Add logic for Mystic Attack rolls if needed
      }
      // --- Variations for Dexterity (using _onAttributeRoll might be better) ---
      // Note: Ranged Defense uses Dexterity Attribute, not a skill.
      // We would modify _onAttributeRoll similarly if triggering from attribute label.
      // else if (attributeKey === "dex" && isCtrl) { ... } in _onAttributeRoll

      // Perform the roll using the (potentially modified) parameters
      await this._performRoll(level, label, flatModifier, modifierLabel);
    } else {
      console.error(`SURGE | Could not find skill data for key: ${skillKey}`);
      ui.notifications.warn(`Skill data not found for key: ${skillKey}`);
    }
  }

  // Define other event handler methods like _onItemAttack, _onItemEdit, etc.
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

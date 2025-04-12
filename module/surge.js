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

    // --- Add your event listeners here ---

    // Example: Listener for clicking an attribute name to roll it (adapt selector later)
    // html.find('.attribute-rollable').click(this._onAttributeRoll.bind(this));

    // Example: Listener for clicking a skill name to roll it (adapt selector later)
    // html.find('.skill-rollable').click(this._onSkillRoll.bind(this));

    // Example: Listener for clicking an attack button on a weapon (adapt selector later)
    // html.find('.item-attack').click(this._onItemAttack.bind(this));

    // Add more listeners for spells, interactions, editing items, etc.
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
      console.log(`SURGE! | Rolling ${attribute.label}...`);
      // TODO: Implement the actual roll logic using the attribute level (attribute.value)
      // const rollFormula = ... getRollFormula(attribute.value) ...;
      // const roll = await new Roll(rollFormula).roll({async: true});
      // await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: `${attribute.label} Check` });
      ui.notifications.info(
        `Attribute roll for ${attribute.label} clicked! (Logic not implemented)`
      );
    }
  }

  // Define other event handler methods like _onSkillRoll, _onItemAttack, _onItemEdit, etc.
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

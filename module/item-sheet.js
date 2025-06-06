console.log('SURGE! | Initializing item-sheet.js');

/**
 * Base item sheet for the SURGE! system.
 * @extends {ItemSheet} // Extend the base ItemSheet
 */
export class SurgeItemSheet extends ItemSheet {
  /**
   * Define default options common to all SURGE item sheets.
   * @returns {object}
   * @override
   */
  static get defaultOptions() {
    // Merge ItemSheet defaults with our settings
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['surge', 'sheet', 'item'], // Add our system's classes
      width: 560, // A common width for item sheets
      height: 500, // A common height
      // We might add tabs later for complex items like spells or crafting
      // tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
      resizable: true, // Allow resizing
    });
  }

  /**
   * Get the path to the HTML template file used to render this sheet.
   * @type {String}
   * @override
   */
  get template() {
    // For now, use one general template for all items.
    // We could switch based on this.item.type later if needed.
    const path = 'systems/surge/templates/sheets/';
    return `${path}item-sheet.hbs`;
    // Example for type-specific: return `<span class="math-inline">\{path\}item\-</span>{this.item.type}-sheet.hbs`;
  }

  /**
   * Prepare data for the Handlebars template.
   * This provides the data context when rendering the sheet.
   * @param {object} options Options passed to the getData method.
   * @returns {object} The data object for template rendering.
   * @override
   */
  async getData(options) {
    console.log(
      `SURGE DEBUG | ItemSheet getData START for ${this.item?.name} (Type: ${this.item?.type})`
    ); // Log Start

    try {
      const context = await super.getData(options);
      console.log(`SURGE DEBUG | ItemSheet super.getData completed.`);

      // Add system data only if item and system exist
      context.systemData = context.item.system;
      console.log(`SURGE DEBUG | ItemSheet systemData assigned.`);

      // Define choices for dropdowns
      context.weaponTypes = {
        '': ' - Select - ', // Add a blank default
        melee: 'Melee',
        ranged: 'Ranged',
      };
      context.weaponSkills = {
        '': ' - Select - ', // Add a blank default
        martial: 'Martial Combat',
        marksmanship: 'Marksmanship',
        mystic: 'Mystic', // Added Mystic as an option based on earlier rules
        // Add any other relevant skills here
      };
      context.armorTypes = {
        '': '- Select -', // Blank default
        light: 'Light',
        medium: 'Medium',
        heavy: 'Heavy',
        // Add "vest" or other specific types if defined in template.json
      };

      // Access config data safely
      console.log(
        `SURGE DEBUG | Accessing CONFIG.SURGE.spellSchools:`,
        CONFIG.SURGE?.spellSchools
      );
      context.spellSchools = CONFIG.SURGE?.spellSchools || {};

      console.log(
        `SURGE DEBUG | Accessing CONFIG.SURGE for defenderAttributes...`
      ); // Assuming CONFIG.SURGE exists from init hook
      context.defenderAttributes = {
        mystic: 'Mystic + INT (Default)',
        str: 'Strength',
        dex: 'Dexterity',
        int: 'Intelligence',
        cha: 'Charisma',
      };
      console.log(`SURGE DEBUG | ItemSheet dropdown choices prepared.`);

      // Log just before returning
      console.log(
        `SURGE DEBUG | ItemSheet getData END for ${this.item?.name}. Returning context.`
      );
      return context;
    } catch (err) {
      console.error(
        `SURGE ERROR | Error occurred within ItemSheet getData for ${this.item?.name}:`,
        err
      );
      // Return a minimal context to potentially prevent further errors down the line
      // Although the sheet might still fail to render fully
      return { item: this.item, systemData: this.item?.system ?? {} };
    }
  }

  /**
   * Activate event listeners for interactive elements (inputs, buttons) on the sheet.
   * @param {jQuery} html The jQuery object representing the sheet's HTML.
   * @override
   */
  activateListeners(html) {
    super.activateListeners(html); // Activate default listeners

    console.log('SURGE! | Activating Item Sheet Listeners');

    // Add listeners here later, e.g.:
    // html.find('.my-button').click(this._onMyButtonClick.bind(this));
  }

  // Define custom handler functions (_onMyButtonClick, etc.) here later
} // End of SurgeItemSheet class

// --- Register the Item Sheet ---
// This tells Foundry to use our SurgeItemSheet class for specific item types.
Items.registerSheet(
  'surge', // Your system's ID
  SurgeItemSheet, // The class definition
  {
    // List the item types defined in template.json this sheet should handle
    // We'll exclude species/trait for now as they might get unique sheets later
    types: [
      'item',
      'weapon',
      'armor',
      'shield',
      'ammunition',
      'material',
      'gear',
      'medicine',
      'tool',
      'treasure',
      'plate',
      'spell',
    ],
    makeDefault: true, // Make this the default sheet for these types
    label: 'SURGE! - Item Sheet', // Label shown in sheet configuration dialog
  }
);

console.log('SURGE! | item-sheet.js Parsed');

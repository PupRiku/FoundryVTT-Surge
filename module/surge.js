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
  {
    _id: 'oXT6pANir6091Gav',
    id: 'surge-burning',
    label: 'Burning',
    icon: 'systems/surge/assets/icons/conditions/burning.svg',
  },
  {
    _id: 'Ddwm4omh9NRf63gh',
    id: 'chilled',
    label: 'Chilled',
    icon: 'systems/surge/assets/icons/conditions/chilled.svg',
  },
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

// --- Active Effect Data for Crushed ---
const crushedEffectData = {
  name: 'Crushed',
  img: 'systems/surge/assets/icons/conditions/crushed.svg',
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until removed externally
  changes: [
    // Override movement value
    {
      key: 'system.passives.movement.value',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0', // Set movement to 0
      priority: 50, // High priority to ensure it overrides other movement effects
    },
    // Flag to indicate the crushed state for JS checks
    {
      key: 'flags.surge.crushed',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
    // Note: Preventing speech is usually roleplaying; add flag if needed for specific checks later
    // { key: "flags.surge.cannotSpeak", mode: OVERRIDE, value: "true", priority: 10 }
  ],
  // No flags.core.statusId needed
};

// --- Active Effect Data for Deafened ---
const deafenedEffectData = {
  name: 'Deafened', // V12+ name
  img: 'systems/surge/assets/icons/conditions/deafened.svg', // V12+ img
  duration: { seconds: null, rounds: null, turns: null }, // Default: Infinite/Permanent (2d6 hrs needs JS on apply)
  changes: [
    // Set a flag to indicate the condition is active
    {
      key: 'flags.surge.deafened',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
    // We will add JS checks later for the conditional -3 penalty
  ],
  // No flags.core.statusId needed
};

// --- Active Effect Data for Burning ---
const burningEffectData = {
  name: 'Burning', // V12+ name
  img: 'systems/surge/assets/icons/conditions/burning.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Persists until removed
  disabled: false, // Explicitly enabled
  changes: [
    // Flag to indicate the burning state is active
    {
      key: 'flags.surge.burning',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  // Initialize the turn counter in the effect's flags upon creation
  flags: {
    surge: {
      burningTurns: 1, // Start at 1 for the first turn's 1d6 damage
    },
  },
};

// --- Active Effect Data for Flammable ---
const flammableEffectData = {
  name: 'Flammable', // V12+ name
  img: 'systems/surge/assets/icons/conditions/flammable.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Persists until removed or Wet applied
  disabled: false, // Explicitly enabled
  changes: [
    // Flag to indicate the condition is active for GM reference and JS checks
    {
      key: 'flags.surge.flammable',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  // No other flags needed here initially
};

// --- Active Effect Data for Flame Resistant ---
const flameResistantEffectData = {
  name: 'Flame Resistant', // V12+ name
  img: 'systems/surge/assets/icons/conditions/flame-resistant.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Assume permanent unless source specifies duration
  disabled: false, // Explicitly enabled
  changes: [
    // Flag to indicate the condition is active for GM reference and potential future checks
    {
      key: 'flags.surge.flameResistant',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  // Note: No 'flags' property needed here unless initializing other data
};

// --- Active Effect Data for Frightened ---
const frightenedEffectData = {
  name: 'Frightened', // V12+ name
  img: 'systems/surge/assets/icons/conditions/frightened.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Persists until removed
  disabled: false, // Explicitly enabled
  changes: [
    // Flag to indicate the condition is active for GM reference and potential future checks
    {
      key: 'flags.surge.frightened',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  // Add description for GM reference on the effect sheet
  description:
    '<p>Unable to take actions against the source of fear. Can take other actions.</p><p>May attempt contested CHA vs. Source to remove. Removed if Confused.</p>',
  flags: {
    surge: {
      // We will try to add frightenedSourceUuid via the macro
    },
  },
};

// --- Active Effect Data for Chilled ---
const chilledEffectData = {
  name: 'Chilled', // V12+ name
  img: 'systems/surge/assets/icons/conditions/chilled.svg', // Match icon path
  // Set duration for 3 rounds (won't auto-expire due to likely core bug)
  duration: { rounds: 3, turns: null, seconds: null },
  disabled: false,
  changes: [
    // Flag to indicate the condition is active
    {
      key: 'flags.surge.chilled',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description:
    '<p>Takes 1 damage per foot moved.</p><p>Expires after 3 rounds (Manual removal likely needed due to core bug). Removed if near heat source (GM discretion).</p>',
  flags: { surge: {} }, // Initialize surge flags
};

// --- Active Effect Data for Frozen ---
const frozenEffectData = {
  name: 'Frozen', // V12+ name
  img: 'systems/surge/assets/icons/conditions/frozen.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until removed
  disabled: false, // Explicitly enabled
  changes: [
    // Override movement value
    {
      key: 'system.passives.movement.value', // CONFIRMED PATH
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0',
      priority: 50, // High priority for movement
    },
    // Flag to indicate the frozen state
    {
      key: 'flags.surge.frozen',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: `<p><strong>Incapacitated:</strong> Unable to take actions or speak (GM Adjudicated).</p>
                <p><strong>Movement:</strong> 0</p>
                <p><strong>Damage:</strong> Takes 1d6 damage at start of turn (unless thawing). Takes 1 damage per foot moved involuntarily (GM Adjudicated).</p>
                <p><strong>Shatter:</strong> Taking lethal damage shatters the creature (GM Adjudicated).</p>
                <p><strong>Thawing:</strong> Heat source within 5ft removes Frozen at start of *next* turn (GM Adjudicated - disable effect before turn starts to prevent damage). Gains Chilled after thawing.</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Insulated ---
const insulatedEffectData = {
  name: 'Insulated', // V12+ name
  img: 'systems/surge/assets/icons/conditions/insulated.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Assume permanent
  disabled: false,
  changes: [
    // Flag to indicate the condition is active
    {
      key: 'flags.surge.insulated',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: `<p>Immune to Chilled status effect.</p>
                <p>Removes Frozen condition at start of turn.</p>
                <p>Immune to natural cold damage and School of Ice spells (GM Adjudicated).</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Invisible ---
const invisibleEffectData = {
  name: 'Invisible', // V12+ name
  img: 'systems/surge/assets/icons/conditions/invisible.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Assume indefinite until removed
  disabled: false,
  changes: [
    // Flag to indicate the condition is active
    {
      key: 'flags.surge.invisible',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description:
    '<p>Cannot be perceived without successful contested INT vs. Guile roll (GM Adjudicated).</p><p>Gains +6 to Guile rolls related to stealth.</p><p>GM should manually toggle token visibility.</p>',
  flags: { surge: {} },
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
   * Includes bonus for Invisible (Guile) and passes modifiers.
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

      // Determine primary attribute possibly affected by equipment penalties
      let primaryAttributeKey = null;
      if (skillKey === 'guile' || skillKey === 'marksmanship')
        primaryAttributeKey = 'dex';

      // --- Get base modifiers (equipment penalties) ---
      // Ensure we use the same variable name consistently! Let's use 'baseModifiers'.
      let baseModifiers = this._getEquippedPenalties(
        primaryAttributeKey,
        skillKey
      );
      // Ensure it's always an array, even if _getEquippedPenalties returns null/undefined
      if (!Array.isArray(baseModifiers)) {
        baseModifiers = [];
      }

      // --- Check for Invisible Bonus ---
      const isInvisible = this.actor.flags?.surge?.invisible === true;
      if (isInvisible && skillKey === 'guile') {
        console.log(`SURGE | Actor is Invisible. Adding +6 Guile bonus.`);
        baseModifiers.push({ value: 6, label: 'Invisible (Stealth)' });
      }
      // --- End Invisible Check ---

      console.log(
        `SURGE DEBUG | _onSkillRoll for ${skillKey} - Base Modifiers Found (incl. Invisible):`,
        JSON.parse(JSON.stringify(baseModifiers))
      );

      // --- Handle skill-specific logic ---
      if (skillKey === 'martial') {
        if (isShift) {
          // Melee Weapon Attack
          let attackBonus = [
            { value: actorAttributes.str?.value ?? 0, label: 'STR Level' },
          ];
          // Combine baseModifiers (penalties/invis) with attack bonus
          let finalModifiers = [...baseModifiers, ...attackBonus].filter(
            (m) => m.value !== 0
          );
          await this._performRoll(
            level,
            `Melee Weapon Attack (${skill.label})`,
            finalModifiers,
            'str'
          ); // Pass attr key
        } else if (isCtrl) {
          // Melee Defense
          // Assuming _rollMeleeDefense handles its own base modifiers internally if needed
          await this._rollMeleeDefense();
        } else {
          // Basic Martial Check
          // Use baseModifiers directly (already filtered if needed by _getEquippedPenalties or _performRoll)
          await this._performRoll(
            level,
            `${skill.label} Check`,
            baseModifiers,
            'str'
          ); // Pass attr key
        }
      } else if (skillKey === 'mystic') {
        if (isCtrl) {
          // Magic Defense
          // Assuming _rollMagicDefense handles its own base modifiers internally if needed
          await this._rollMagicDefense();
        } else {
          // Basic Mystic Check
          // Get only mystic-specific penalties, don't include invis bonus here unless intended
          let mysticPenalties = this._getEquippedPenalties(null, skillKey);
          if (!Array.isArray(mysticPenalties)) {
            mysticPenalties = [];
          }
          await this._performRoll(
            level,
            `${skill.label} Check`,
            mysticPenalties,
            'int'
          ); // Pass attr key
        }
      } else {
        // --- Other skill basic checks (Handles Guile, Marksmanship, etc.) ---
        // This block uses baseModifiers, which now includes the Invisible bonus for Guile
        // Also determine attributeKey for _performRoll if possible/needed
        let associatedAttrKey = null;
        if (skillKey === 'guile' || skillKey === 'marksmanship')
          associatedAttrKey = 'dex';
        // Add other skill->attribute mappings if relevant for _performRoll context

        // Use baseModifiers directly
        await this._performRoll(
          level,
          `${skill.label} Check`,
          baseModifiers,
          associatedAttrKey
        ); // <<< Ensure 'baseModifiers' is used here
      }
    } else {
      console.error(`SURGE | Could not find skill data for key: ${skillKey}`);
      ui.notifications.warn(`Skill data not found for key: ${skillKey}`);
    }
  } // End _onSkillRoll

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
    // --- Check if Crushed ---
    if (this.actor.flags?.surge?.crushed === true) {
      ui.notifications.warn(`${this.actor.name} cannot attack while Crushed.`);
      return; // Stop the function
    }
    // --- End Check ---

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
   * (Mystic Roll + INT Level) - Affected by Deafened penalty.
   * @private
   */
  async _rollMagicDefense() {
    console.log(
      `SURGE | --- Executing _rollMagicDefense for ${this.actor.name} ---`
    ); // Log function start

    const skill = this.actor.system.skills.mystic;
    const attribute = this.actor.system.attributes.int;
    const skillLevel = skill?.value ?? 1;
    const intLevel = attribute?.value ?? 0;

    // Get specific penalties for Mystic skill and INT attribute from equipment
    const penalties = this._getEquippedPenalties('int', 'mystic');
    console.log(
      `SURGE | Equipment Penalties found:`,
      JSON.parse(JSON.stringify(penalties))
    ); // Log equipment penalties

    // --- Check for Deafened ---
    const rawDeafenedFlag = this.actor.flags?.surge?.deafened; // Get raw flag value
    console.log(
      `SURGE | Raw Deafened Flag (actor.flags.surge.deafened):`,
      rawDeafenedFlag
    ); // Log raw flag value

    const isDeafened = rawDeafenedFlag === true; // Strict check for boolean true
    console.log(`SURGE | isDeafened check result: ${isDeafened}`); // Log boolean result

    const deafenedPenalty = [];
    if (isDeafened) {
      console.log(`SURGE | Condition Met: Adding -3 Deafened Penalty.`); // Confirm block entered
      deafenedPenalty.push({ value: -3, label: 'Deafened Penalty (Defense)' });
    } else {
      console.log(`SURGE | Condition NOT Met: Not adding Deafened Penalty.`);
    }
    console.log(
      `SURGE | deafenedPenalty array:`,
      JSON.parse(JSON.stringify(deafenedPenalty))
    ); // Log the penalty array

    // Combine modifiers
    const modifiers = [
      ...penalties,
      ...deafenedPenalty, // Add Deafened penalty here
      { value: intLevel, label: 'INT Level' },
    ];

    // Filter out zero-value modifiers
    const finalModifiers = modifiers.filter((m) => m.value !== 0);
    console.log(
      `SURGE | Final Modifiers before roll:`,
      JSON.parse(JSON.stringify(finalModifiers))
    ); // Log final mods

    const label = `Magic Defense (${skill?.label || 'Mystic'})`;

    // Call _performRoll
    console.log(
      `SURGE | Calling _performRoll with level: ${skillLevel}, label: ${label}, attributeKey: 'int'`
    );
    await this._performRoll(skillLevel, label, finalModifiers, 'int');
    console.log(`SURGE | --- _rollMagicDefense Finished ---`);
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
      const currentDisabledState = effect.disabled; // Get current state
      console.log(`SURGE | --- _onEffectToggle START ---`);
      console.log(`SURGE | Toggling effect: ${effect.name} ${effectId}`);
      console.log(
        `SURGE | Current 'disabled' state BEFORE update: ${currentDisabledState}`
      );

      try {
        // Calculate the new state
        const newDisabledState = !currentDisabledState;
        console.log(
          `SURGE | Attempting to update 'disabled' to: ${newDisabledState}`
        );

        // Perform the update
        await effect.update({ disabled: newDisabledState });

        // Get the effect again AFTER the update to check its state
        // Note: The 'effect' variable might hold old data after update, re-fetching is safer.
        const effectAfterUpdate = this.actor.effects.get(effectId);

        console.log(`SURGE | Update successful (according to code flow).`);
        console.log(
          `SURGE | Effect data AFTER update (if found):`,
          effectAfterUpdate
        ); // Log the whole object AFTER update
        if (effectAfterUpdate) {
          console.log(
            `SURGE | 'disabled' state AFTER update: ${effectAfterUpdate.disabled}`
          );
        } else {
          console.error(
            `SURGE | Effect ${effectId} seems to be missing immediately after update!`
          ); // Log if it's gone
        }
      } catch (err) {
        console.error(`SURGE | Failed to toggle effect ${effectId}:`, err);
        ui.notifications.error('Failed to toggle effect.');
      }
    } else {
      console.warn(
        `SURGE | Toggle clicked for non-existent effect ID: ${effectId}`
      );
    }
    console.log(`SURGE | --- _onEffectToggle END ---`);
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

  console.log(`SURGE | Turn Start for: ${actor.name}`);

  // --- Handle Insulation removing Frozen ---
  const isInsulated = actor.flags?.surge?.insulated === true;
  if (isInsulated) {
    console.log(
      `SURGE | ${actor.name} is Insulated. Checking for Frozen effect...`
    );
    // Find the Frozen effect (use flag or name)
    const frozenEffect = actor.effects.find(
      (e) =>
        e.changes.some((c) => c.key === 'flags.surge.frozen') && !e.disabled
    );
    // Alt find: const frozenEffect = actor.effects.find(e => e.name === "Frozen" && !e.disabled);

    if (frozenEffect) {
      console.log(
        `SURGE | Found Frozen effect on Insulated actor. Removing Frozen.`
      );
      try {
        await frozenEffect.delete();
        ui.notifications.info(
          `${actor.name} is no longer Frozen due to Insulation.`
        );
      } catch (err) {
        console.error(
          `SURGE | Failed to remove Frozen effect for Insulated actor ${actor.name}:`,
          err
        );
      }
    } else {
      console.log(`SURGE | No active Frozen effect found to remove.`);
    }
  }
  // --- END Insulation/Frozen Check ---

  // --- Handle Confused Condition ---
  const isConfused = actor.flags?.surge?.confused === true;
  if (isConfused) {
    console.log(
      `SURGE | Detected start of turn for Confused actor: ${actor.name}`
    );
    const roll = await new Roll('1d6').evaluate();
    const rollResult = roll.total;
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: ` rolls 1d6 for Confusion effect:`,
    });
    let messageContent = `${actor.name} is Confused (Rolled ${rollResult}) and `;
    let closestTarget = null;
    let closestTargetName = 'something nearby';
    if (rollResult <= 4) {
      let minDist = Infinity;
      const sourceCenter = sourceToken?.center;
      if (
        sourceCenter &&
        typeof sourceCenter.x === 'number' &&
        typeof sourceCenter.y === 'number'
      ) {
        for (const potentialCombatant of combat.combatants) {
          if (potentialCombatant.id === combatant.id) continue; // Skip self
          if (!potentialCombatant.actor || !potentialCombatant.tokenId)
            continue; // Skip if no actor or token ID
          if (potentialCombatant.isDefeated) continue; // Skip defeated combatants
          const targetTokenObject = canvas.tokens.get(
            potentialCombatant.tokenId
          );
          if (!targetTokenObject || targetTokenObject.document?.hidden)
            continue;
          if ((targetTokenObject.actor?.system?.passives?.hp?.value ?? 0) <= 0)
            continue;
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

  // --- Handle Crushed Condition Damage ---
  const isCrushed = actor.flags?.surge?.crushed === true; // This check (using actor flags) is still okay because 'flags.surge.crushed' is set via 'changes'

  if (isCrushed) {
    // Find the specific "Crushed" Active Effect on the actor
    // We can find it by the flag it sets OR by its name/icon if more reliable
    // Let's try finding by the flag set in its 'changes' array first:
    const crushedEffect = actor.effects.find(
      (e) =>
        e.changes.some((c) => c.key === 'flags.surge.crushed') && !e.disabled
    );
    // Alternative find by name: const crushedEffect = actor.effects.find(e => e.name === "Crushed" && !e.disabled);

    if (!crushedEffect) {
      console.warn(
        `SURGE | Actor ${actor.name} is flagged as Crushed, but the Active Effect was not found.`
      );
      return; // Exit if we can't find the effect for some reason
    }

    console.log(`SURGE | Found Crushed effect:`, crushedEffect); // Log the found effect

    // Retrieve the severity flag *from the effect's flags*
    const severityFlagValue = crushedEffect.flags?.surge?.crushSeverity;
    console.log(
      `SURGE | Raw crushSeverity flag value from effect:`,
      severityFlagValue
    ); // Log raw flag value

    const damagePerRound = Number(severityFlagValue ?? 0); // Convert to number, default 0
    console.log(`SURGE | Calculated damagePerRound: ${damagePerRound}`); // Log calculated damage

    if (damagePerRound > 0) {
      console.log(
        `SURGE | Applying ${damagePerRound} damage to ${actor.name} from Crushed.`
      );
      try {
        const currentHp = actor.system.passives.hp.value;
        // Ensure HP path is correct
        if (typeof currentHp !== 'number') {
          console.error(
            `SURGE | Could not get valid current HP for ${actor.name}`
          );
          return;
        }
        const newHp = Math.max(0, currentHp - damagePerRound); // Prevent negative HP
        console.log(
          `SURGE | Current HP: ${currentHp}, Damage: ${damagePerRound}, New HP: ${newHp}`
        ); // Log HP change

        await actor.update({ 'system.passives.hp.value': newHp });
        console.log(`SURGE | Actor HP updated.`); // Log successful update

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ alias: 'Crushing Force' }),
          content: `${actor.name} takes ${damagePerRound} damage from being Crushed.`,
        });
      } catch (err) {
        console.error(
          `SURGE | Failed to apply Crushed damage to ${actor.name}:`,
          err
        );
        ui.notifications.error(
          `Failed to apply Crushed damage to ${actor.name}.`
        );
      }
    } else {
      console.log(
        `SURGE | ${actor.name} is Crushed, but severity damage is 0 or flag missing/invalid on the effect.`
      );
    }
  } // --- End Crushed Handling ---

  // --- Handle Burning Condition Damage & Escalation ---
  // Check using the flag set by the 'changes' array
  const isBurning = actor.flags?.surge?.burning === true;

  if (isBurning) {
    // Find the Burning Active Effect to read/update its flags
    const burningEffect = actor.effects.find(
      (e) =>
        e.changes.some((c) => c.key === 'flags.surge.burning') && !e.disabled
    );
    // Alt find: const burningEffect = actor.effects.find(e => e.flags?.surge?.burningTurns >= 1 && !e.disabled);

    if (burningEffect) {
      console.log(`SURGE | Found Burning effect:`, burningEffect);

      // Get the current turn count from the effect's flags
      let turnCount = Number(burningEffect.flags?.surge?.burningTurns ?? 1); // Default to 1 if flag missing/invalid
      if (turnCount <= 0) turnCount = 1; // Ensure at least 1d6

      console.log(
        `SURGE | Burning turn count: ${turnCount}. Rolling ${turnCount}d6 damage.`
      );

      try {
        // Roll damage
        const damageRoll = await new Roll(`${turnCount}d6`).evaluate();
        damageRoll.toMessage({
          speaker: ChatMessage.getSpeaker({ alias: 'Burning' }),
          flavor: `Damage taken by ${actor.name}`,
        });

        let damageTaken = damageRoll.total;
        console.log(`SURGE | Base burning damage roll: ${damageTaken}`);

        // --- Check for Flammable ---
        const isFlammable = actor.flags?.surge?.flammable === true;
        if (isFlammable) {
          console.log(`SURGE | Actor is Flammable! Doubling Burning damage.`);
          damageTaken *= 2; // Double the damage
        }
        // --- End Flammable Check ---

        console.log(`SURGE | Applying ${damageTaken} final burning damage.`);

        // Apply damage (ensure HP path is correct)
        const currentHp = actor.system.passives.hp.value;
        if (typeof currentHp === 'number') {
          const newHp = Math.max(0, currentHp - damageTaken);
          await actor.update({ 'system.passives.hp.value': newHp });
          console.log(`SURGE | ${actor.name} HP updated to ${newHp}.`);

          // --- Build Enhanced Chat Message Content ---
          let damageMessageContent = '';
          const diceRolled = `${turnCount}d6`; // The dice that were rolled

          if (isFlammable) {
            // If Flammable, show the calculation
            damageMessageContent = `${actor.name} takes ${damageRoll.total} x 2 = <strong>${damageTaken}</strong> damage from Burning (Flammable!). [Rolled ${diceRolled}]`;
          } else {
            // Otherwise, just show the normal damage
            damageMessageContent = `${actor.name} takes <strong>${damageTaken}</strong> damage from Burning. [Rolled ${diceRolled}]`;
          }
          // --- End Build Message ---

          // Notify in chat using the constructed message
          ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ alias: 'Burning Effect' }), // Changed alias for clarity
            content: damageMessageContent, // Use the message built above
          });
        } else {
          console.error(
            `SURGE | Could not get valid current HP for ${actor.name}`
          );
        }

        // Increment the turn count for the *next* turn by updating the effect's flag
        const nextTurnCount = turnCount + 1;
        await burningEffect.update({
          'flags.surge.burningTurns': nextTurnCount,
        });
        console.log(
          `SURGE | Incremented burningTurns flag to ${nextTurnCount} on effect ${burningEffect.id}`
        );
      } catch (err) {
        console.error(
          `SURGE | Failed during Burning damage/update for ${actor.name}:`,
          err
        );
        ui.notifications.error(
          `Error applying burning effect for ${actor.name}.`
        );
      }
    } else {
      console.warn(
        `SURGE | Actor ${actor.name} is flagged as Burning, but the Active Effect was not found.`
      );
      // Maybe remove the flag if the effect is missing?
      // await actor.unsetFlag("surge", "burning");
    }
  } // --- End Burning Handling --

  // --- Handle Frozen Condition Damage ---
  // Check using the flag set by 'changes' array
  const isFrozen = actor.flags?.surge?.frozen === true;
  console.log(`SURGE | Checking Frozen status for ${actor.name}: ${isFrozen}`);

  if (isFrozen) {
    // Find the specific *enabled* Frozen effect
    const frozenEffect = actor.effects.find(
      (e) =>
        e.changes.some((c) => c.key === 'flags.surge.frozen') && !e.disabled
    );
    // Alt find: const frozenEffect = actor.effects.find(e => e.flags?.surge?.frozen === true && !e.disabled);

    if (frozenEffect) {
      console.log(`SURGE | Found ENABLED Frozen effect. Applying 1d6 damage.`);
      try {
        const damageRoll = await new Roll('1d6').evaluate();
        damageRoll.toMessage({
          speaker: ChatMessage.getSpeaker({ alias: 'Frozen State' }),
          flavor: `Damage taken by ${actor.name}`,
        });

        const damageTaken = damageRoll.total;
        console.log(`SURGE | Applying ${damageTaken} frozen damage.`);

        // Apply damage
        const currentHp = actor.system.passives.hp.value;
        if (typeof currentHp === 'number') {
          const newHp = Math.max(0, currentHp - damageTaken);
          await actor.update({ 'system.passives.hp.value': newHp });
          console.log(`SURGE | ${actor.name} HP updated to ${newHp}.`);
        } else {
          /* Error log */
        }
      } catch (err) {
        console.error(
          `SURGE | Failed during Frozen damage for ${actor.name}:`,
          err
        );
        ui.notifications.error(
          `Error applying frozen effect damage for ${actor.name}.`
        );
      }
    } else {
      console.log(
        `SURGE | Actor ${actor.name} is Frozen, but the effect is disabled (likely thawing). Skipping damage.`
      );
    }
  } // --- End Frozen Handling ---
}

/**
 * Capture token position just before it updates, if it's about to move.
 * Stores the position temporarily on the canvas Token object.
 * @param {TokenDocument} tokenDocument The TokenDocument being updated.
 * @param {object} change Object containing the proposed changes.
 * @param {object} options Additional options which trigger this update.
 * @param {string} userId The ID of the User triggering the update.
 */
function handlePreUpdateToken(tokenDocument, change, options, userId) {
  // Check if x or y coordinates are part of the proposed change
  if (change?.x !== undefined || change?.y !== undefined) {
    // Get the associated Token object on the canvas
    const tokenObject = canvas.tokens.get(tokenDocument.id);
    // Only proceed if the canvas object exists and doesn't already have the temp flag
    // (This prevents redundant saves if multiple preUpdate hooks fire)
    if (tokenObject && !tokenObject._chilledLastPos) {
      // Store the CURRENT coordinates before they change
      const currentPos = { x: tokenDocument.x, y: tokenDocument.y };
      tokenObject._chilledLastPos = currentPos;
      console.log(
        `SURGE DEBUG (handlePreUpdateToken) | Storing pre-move position for ${tokenDocument.name}:`,
        currentPos
      );
    }
  }
}

/**
 * Handle Token movement AFTER update to apply Chilled damage.
 * Reads starting position from a temporary flag set by handlePreUpdateToken.
 * Reads new position preferentially from the 'change' object.
 * @param {TokenDocument} tokenDocument The TokenDocument that was updated.
 * @param {object} change Object containing the changes made.
 * @param {object} options Additional options which trigger this update.
 * @param {string} userId The ID of the User triggering the update.
 */
async function handleTokenUpdate(tokenDocument, change, options, userId) {
  // We still only care if x or y *actually* changed in this update batch
  if (change?.x === undefined && change?.y === undefined) return;

  const tokenObject = canvas.tokens.get(tokenDocument.id); // Get Canvas Token Object
  const actor = tokenDocument.actor;

  // Check if actor exists, is Chilled, and has the temp position flag from preUpdate
  if (
    !actor ||
    !tokenObject ||
    actor.flags?.surge?.chilled !== true ||
    !tokenObject._chilledLastPos
  ) {
    if (tokenObject?._chilledLastPos) delete tokenObject._chilledLastPos; // Clean up flag if we exit early
    return;
  }

  console.log(
    `SURGE DEBUG (handleTokenUpdate) | Actor: ${actor.name}, Is Chilled: true. Processing move.`
  );

  // Get the starting position stored by the preUpdate hook
  const startPos = tokenObject._chilledLastPos;
  console.log(
    `SURGE DEBUG (handleTokenUpdate) | Start Coords from temp flag:`,
    startPos
  );

  // --- FIX: Get new position preferentially from the 'change' object ---
  // Fall back to tokenDocument only if 'change' doesn't have the coord (shouldn't happen if position changed)
  const newX = change?.x ?? tokenDocument.x;
  const newY = change?.y ?? tokenDocument.y;
  console.log(
    `SURGE DEBUG (handleTokenUpdate) | New Coords (from change/doc): x=${newX}, y=${newY}`
  ); // Log coords used

  // IMPORTANT: Clean up the temporary flag *immediately* after reading startPos
  delete tokenObject._chilledLastPos;
  console.log(`SURGE DEBUG (handleTokenUpdate) | Removed temp position flag.`);

  // Check if positions are valid numbers before proceeding
  if (
    typeof startPos?.x !== 'number' ||
    typeof startPos?.y !== 'number' ||
    typeof newX !== 'number' ||
    typeof newY !== 'number'
  ) {
    console.warn(
      `SURGE | Chilled: Invalid coordinates for distance calculation. Start:`,
      startPos,
      `End:`,
      { x: newX, y: newY }
    );
    return;
  }

  // --- Calculate Distance Moved ---
  // Ensure start and end points are different before calculating
  if (startPos.x === newX && startPos.y === newY) {
    console.log(
      `SURGE DEBUG (handleTokenUpdate) | Start and end positions are the same. No distance moved.`
    );
    return;
  }

  try {
    console.log(`SURGE DEBUG (handleTokenUpdate) | Calculating path...`);
    const path = canvas.grid.measurePath([
      { x: startPos.x, y: startPos.y },
      { x: newX, y: newY },
    ]);
    const distanceMoved = path.distance;
    console.log(
      `SURGE DEBUG (handleTokenUpdate) | Distance Moved: ${distanceMoved}`
    );

    const damage = Math.max(0, Math.round(distanceMoved)); // 1 damage per foot
    console.log(
      `SURGE DEBUG (handleTokenUpdate) | Calculated Damage: ${damage}`
    );

    if (damage > 0) {
      console.log(
        `SURGE | ${actor.name} moved ${distanceMoved.toFixed(
          1
        )}ft while Chilled. Applying ${damage} damage.`
      );
      const currentHp = actor.system.passives.hp.value;
      console.log(`SURGE DEBUG (handleTokenUpdate) | Current HP: ${currentHp}`);

      if (typeof currentHp === 'number') {
        const newHp = Math.max(0, currentHp - damage);
        console.log(
          `SURGE DEBUG (handleTokenUpdate) | New HP will be: ${newHp}`
        );
        await actor.update({ 'system.passives.hp.value': newHp });
        console.log(
          `SURGE DEBUG (handleTokenUpdate) | Actor HP update called.`
        );

        // Optional Scrolling Text
        if (tokenObject) {
          canvas.interface.createScrollingText(
            tokenObject.center,
            `-${damage} Chilled!`,
            {
              anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
              fontSize: 32,
              fill: '#ADD8E6',
              stroke: 0x000000,
              strokeThickness: 2,
              jitter: 0.25,
            }
          );
        }
      } else {
        console.error(`SURGE | Chilled: Could not get valid current HP...`);
      }
    } else {
      console.log(
        `SURGE DEBUG (handleTokenUpdate) | Damage is 0, no update needed.`
      );
    }
  } catch (err) {
    console.error(
      `SURGE | Chilled: Error calculating distance or applying damage for ${actor.name}:`,
      err
    );
  }
}

Hooks.once('ready', () => {
  // Register the combat turn handler hook once the game is ready
  Hooks.on('updateCombat', handleCombatTurnStart);
  console.log(
    'SURGE! | Registered combat turn handler for Confused condition.'
  );

  Hooks.on('preUpdateToken', handlePreUpdateToken); // Add listener for preUpdate
  console.log('SURGE! | Registered token pre-update handler for Chilled.');

  // Register token update handler (for Chilled damage on move)
  Hooks.on('updateToken', handleTokenUpdate);
  console.log('SURGE! | Registered token update handler for Chilled.');
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
    // Add overrides specifically for 'flame-resistant'
    if (effect.id === 'flame-resistant') {
      effectData.overrides = ['surge-burning']; // Prevent 'surge-burning' status/effect
    }
    // Add overrides specifically for 'insulated'
    if (effect.id === 'insulated') {
      effectData.overrides = ['chilled']; // Prevent 'chilled' status/effect
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

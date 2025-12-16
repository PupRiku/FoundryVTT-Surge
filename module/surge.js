import { SurgeItemSheet } from './item-sheet.js';

Hooks.once('init', () => {
  console.log('SURGE! | System Initializing...');

  console.log('SURGE! | Initializing CONFIG.SURGE...');
  CONFIG.SURGE = {
    effectData: {},
  };
  console.log('SURGE! | CONFIG.SURGE initialized.');

  CONFIG.SURGE.spellSchools = {
    '': '-- None --',
    antithesis: 'Antithesis',
    astral: 'Astral Magic',
    disease: 'Disease',
    earth: 'Earth',
    fire: 'Fire',
    ice: 'Ice',
    light: 'Light',
    mending: 'Mending',
    shadow: 'Shadow',
    third_eye: 'The Third Eye',
    warding: 'Warding',
    water: 'Water',
    wind: 'Wind',
  };
  console.log('SURGE! | Spell Schools defined in CONFIG.SURGE.spellSchools');

  CONFIG.SURGE.skills = {
    '': '-- None --',
    clerical: 'Clerical',
    culture: 'Culture',
    guile: 'Guile',
    leathercraft: 'Leathercraft',
    marksmanship: 'Marksmanship',
    martial: 'Martial Combat',
    mechanical: 'Mechanical',
    medicine: 'Medicine',
    memory: 'Memory',
    metallurgy: 'Metallurgy',
    mystic: 'Mystic',
    survival: 'Survival',
    woodcraft: 'Woodcraft',
  };
  console.log('SURGE! | Skills defined in CONFIG.SURGE.skills');

  CONFIG.SURGE.attributes = {
    '': '-- None --',
    str: 'Strength',
    dex: 'Dexterity',
    int: 'Intelligence',
    cha: 'Charisma',
    luk: 'Luck',
  };
  console.log('SURGE! | Attributes defined in CONFIG.SURGE.attributes');

  console.log('SURGE! | Registering effect data constants...');
  // Ensure the variables like bleedingEffectData are defined/accessible here
  CONFIG.SURGE.effectData['bleeding'] = bleedingEffectData;
  CONFIG.SURGE.effectData['broken'] = brokenEffectData;
  CONFIG.SURGE.effectData['burning'] = burningEffectData;
  CONFIG.SURGE.effectData['chilled'] = chilledEffectData;
  CONFIG.SURGE.effectData['confused'] = confusedEffectData;
  CONFIG.SURGE.effectData['crushed'] = crushedEffectData;
  CONFIG.SURGE.effectData['deafened'] = deafenedEffectData;
  CONFIG.SURGE.effectData['flame-resistant'] = flameResistantEffectData;
  CONFIG.SURGE.effectData['flammable'] = flammableEffectData;
  CONFIG.SURGE.effectData['frightened'] = frightenedEffectData;
  CONFIG.SURGE.effectData['frozen'] = frozenEffectData;
  CONFIG.SURGE.effectData['incapacitated'] = incapacitatedEffectData;
  CONFIG.SURGE.effectData['insulated'] = insulatedEffectData;
  CONFIG.SURGE.effectData['invisible'] = invisibleEffectData;
  CONFIG.SURGE.effectData['mute'] = muteEffectData;
  CONFIG.SURGE.effectData['paralyzed'] = paralyzedEffectData;
  CONFIG.SURGE.effectData['pinned'] = pinnedEffectData;
  CONFIG.SURGE.effectData['poisoned-sickness'] = poisonedSicknessEffectData;
  CONFIG.SURGE.effectData['poisoned-debilitating'] =
    poisonedDebilitatingEffectData;
  CONFIG.SURGE.effectData['poisoned-damage'] = poisonedDamageEffectData;
  CONFIG.SURGE.effectData['poisoned-deadly'] = poisonedDeadlyEffectData;
  CONFIG.SURGE.effectData['prone'] = proneEffectData;
  CONFIG.SURGE.effectData['restrained'] = restrainedEffectData;
  CONFIG.SURGE.effectData['stunned'] = stunnedEffectData;
  CONFIG.SURGE.effectData['unconscious'] = unconsciousEffectData;
  CONFIG.SURGE.effectData['wet'] = wetEffectData;
  CONFIG.SURGE.effectData['death-saves-conscious'] =
    deathSavesConsciousEffectData;
  CONFIG.SURGE.effectData['death-saves-unconscious'] =
    deathSavesUnconsciousEffectData;

  CONFIG.SURGE.DRValueMap = {
    // Map DR Level (0-4) to Target Number
    0: 5, // Easy
    1: 10, // Moderate
    2: 15, // Difficult
    3: 35, // Extremely Difficult
    4: 50, // Legendary (Max DR for saves, or map higher if needed)
  };
  CONFIG.SURGE.DRLabelMap = {
    // Map DR Level to Label
    0: 'Easy (Target 5)',
    1: 'Moderate (Target 10)',
    2: 'Difficult (Target 15)',
    3: 'Extremely Difficult (Target 35)',
    4: 'Legendary (Target 50)',
  };

  console.log('SURGE! | Effect data constants registered.');

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
    if (effect.id === 'wet') {
      effectData.overrides = ['surge-burning']; // Prevent 'surge-burning' status/effect
    }
    return effectData;
  });

  // Directly assign the mapped array to CONFIG.statusEffects, overwriting the defaults
  CONFIG.statusEffects = customEffects;

  console.log(
    `SURGE! | Registered ${CONFIG.statusEffects.length} custom status effects.`
  );
  // --- End Status Effect Registration ---

  // Preload Handlebars templates (optional but good practice)
  // preloadHandlebarsTemplates();
});

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
    _id: 'OhzJEVuVkt2ZSld',
    id: 'poisoned-sickness',
    label: 'Poisoned (Sickness)',
    icon: 'systems/surge/assets/icons/conditions/poisoned-sickness.svg',
  },
  {
    _id: 'x5nQtQ64TcnPCxvX',
    id: 'poisoned-debilitating',
    label: 'Poisoned (Debilitating)',
    icon: 'systems/surge/assets/icons/conditions/poisoned-debilitating.svg',
  },
  {
    _id: '95pS5sguTAGZ65F6',
    id: 'poisoned-damage',
    label: 'Poisoned (Damage)',
    icon: 'systems/surge/assets/icons/conditions/poisoned-damage.svg',
  },
  {
    _id: 'tN2P6lfSZRu0GUJA',
    id: 'poisoned-deadly',
    label: 'Poisoned (Deadly)',
    icon: 'systems/surge/assets/icons/conditions/poisoned-deadly.svg',
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
  {
    _id: 'vgQL0Z2BVVL1g7UF',
    id: 'incapacitated',
    label: 'Incapacitated',
    icon: 'systems/surge/assets/icons/conditions/incapacitated.svg',
  },
  {
    _id: 'UTPO45Ta8hZkpCKk',
    id: 'bleeding',
    label: 'Bleeding',
    icon: 'icons/svg/blood.svg',
  },
  {
    _id: 'suxR99rD2h01eozN', // Generate unique ID
    id: 'broken', // System-unique ID
    label: 'Broken',
    icon: 'systems/surge/assets/icons/conditions/broken.svg', // MAKE SURE YOU HAVE AN ICON
  },
  {
    _id: 'WletQUbE7uRu4X43', // Generate a new unique ID for this entry
    id: 'dead', // The CORE Foundry ID for the 'defeated' status
    label: 'EFFECT.StatusDead', // Uses Foundry's built-in localization for "Dead"
    icon: 'icons/svg/skull.svg', // The standard Foundry skull icon
    // No 'changes' or 'flags' needed here as it's mostly a visual marker
    // managed by core Foundry when toggled via actor.toggleStatusEffect
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

// --- Active Effect Data for Mute ---
const muteEffectData = {
  name: 'Mute', // V12+ name
  img: 'systems/surge/assets/icons/conditions/mute.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Default: Indefinite (Random 1d12h duration requires JS on apply)
  disabled: false,
  changes: [
    // Flag to indicate the condition is active
    {
      key: 'flags.surge.mute',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description:
    '<p>Unable to communicate by speaking (GM Adjudicated).</p><p>Unable to cast spells.</p><p>Duration: 1d12 hours (unless permanent or cured).</p>',
  flags: { surge: {} },
};

// --- Active Effect Data for Paralyzed ---
const paralyzedEffectData = {
  name: 'Paralyzed', // V12+ name
  img: 'systems/surge/assets/icons/conditions/paralyzed.svg', // Match icon path
  duration: { seconds: 86400, rounds: null, turns: null }, // 24 hours
  disabled: false,
  changes: [
    // Override movement value
    {
      key: 'system.passives.movement.value', // CONFIRMED PATH
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0',
      priority: 50, // High priority for movement
    },
    // Flag to indicate the paralyzed state (for action restriction - GM adjudicated)
    {
      key: 'flags.surge.paralyzed',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
    // Flag to indicate inability to defend (for future mechanics / GM ruling)
    {
      key: 'flags.surge.paralyzedHelpless',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: `<p><strong>Motionless:</strong> Movement set to 0.</p>
                <p><strong>Incapacitated:</strong> Unable to take actions (except speak/cast) (GM Adjudicated).</p>
                <p><strong>Defenseless:</strong> Unable to defend against attacks (Helpless flag set; mechanical effect GM Adjudicated or via future attack implementation).</p>
                <p><strong>Duration:</strong> 24 hours (unless cured).</p>`,
  flags: { surge: {} }, // Initialize surge flags
};

// --- Active Effect Data for Restrained ---
const restrainedEffectData = {
  name: 'Restrained', // V12+ name
  img: 'systems/surge/assets/icons/conditions/restrained.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until removed
  disabled: false,
  changes: [
    // Override movement value
    {
      key: 'system.passives.movement.value', // CONFIRMED PATH
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0',
      priority: 50, // High priority for movement
    },
    // Flag to indicate the restrained state for JS checks
    {
      key: 'flags.surge.restrained',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description:
    "<p><strong>Movement:</strong> 0</p><p><strong>Dexterity Checks:</strong> Automatically fail.</p><p>Can take other actions. Can attempt 'Break Free' action (specifics TBD) to remove.</p>",
  flags: { surge: {} },
};

// --- Active Effect Data for Prone ---
const proneEffectData = {
  name: 'Prone', // V12+ name
  img: 'systems/surge/assets/icons/conditions/prone.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until stood up
  disabled: false,
  changes: [
    // Flag to indicate the prone state for JS checks
    {
      key: 'flags.surge.prone',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
    // Flag to indicate inability to dodge/block (for GM ruling / future mechanics)
    {
      key: 'flags.surge.proneUnableToDefend',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
    {
      key: 'system.passives.movement.value', // Is this path still correct?
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE, // Mode 5
      value: '0', // Value is string "0"
      priority: 50,
    },
  ],
  description: `<p><strong>Dexterity Checks:</strong> Automatically fail.</p>
                <p><strong>Defense:</strong> Incapable of dodging/blocking (GM Adjudicated based on flag).</p>
                <p><strong>Removal:</strong> Requires 1 Action to stand up.</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Pinned ---
const pinnedEffectData = {
  name: 'Pinned', // V12+ name
  img: 'systems/surge/assets/icons/conditions/pinned.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until Break Free
  disabled: false,
  changes: [
    // Override movement value
    {
      key: 'system.passives.movement.value', // CONFIRMED PATH
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0',
      priority: 50,
    },
    // Flag to indicate the pinned state for JS checks
    {
      key: 'flags.surge.pinned',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: `<p><strong>Prerequisite:</strong> Must be Restrained or Prone.</p>
                <p><strong>Movement:</strong> 0</p>
                <p><strong>Actions:</strong> Cannot make physical attacks. Can speak & cast spells.</p>
                <p><strong>Dexterity Checks:</strong> Automatically fail.</p>
                <p>Can attempt 'Break Free' action (specifics TBD) to remove.</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Incapacitated ---
const incapacitatedEffectData = {
  name: 'Incapacitated', // V12+ name
  img: 'systems/surge/assets/icons/conditions/incapacitated.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until removed
  disabled: false,
  changes: [
    // Override movement value
    {
      key: 'system.passives.movement.value', // CONFIRMED PATH
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0',
      priority: 50,
    },
    // Flag to indicate the incapacitated state
    {
      key: 'flags.surge.incapacitated',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 60, // High priority to potentially override other actions?
    },
    // Note: Auto-fail checks handled by JS hook below
  ],
  description: `<p>Falls Prone (Prone condition also applied).</p>
                <p><strong>Movement:</strong> 0</p>
                <p><strong>Actions:</strong> Unable to take any Actions (GM Adjudicated).</p>
                <p><strong>Checks:</strong> Automatically fails Attribute and Skill checks.</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Poisoned (Sickness) ---
const poisonedSicknessEffectData = {
  name: 'Poisoned (Sickness)', // V12+ name
  img: 'systems/surge/assets/icons/conditions/poisoned-sickness.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Duration determined on application
  disabled: false,
  changes: [
    // Flag to identify this type of poison
    {
      key: 'flags.surge.poisonType',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'sickness',
      priority: 5,
    },
    // Could add a specific flag like flags.surge.isPoisonedSickness if preferred
  ],
  description: `<p>Applies Confused, Incapacitated, or Paralyzed randomly (see effect flags for result).</p><p>Duration: 1d6 hours (see effect duration).</p><p>Remedy: Antidote, cures, or time.</p>`,
  // Flags for applied secondary effect and duration will be added dynamically by the macro
  flags: { surge: {} },
};

// --- Active Effect Data for Poisoned (Debilitating) ---
const poisonedDebilitatingEffectData = {
  name: 'Poisoned (Debilitating)', // V12+ name
  img: 'systems/surge/assets/icons/conditions/poisoned-debilitating.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Duration determined on application
  disabled: false,
  changes: [
    // Flag to identify this type of poison
    {
      key: 'flags.surge.poisonType',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'debilitating',
      priority: 5,
    },
  ],
  description: `<p>Applies Blinded or Deafened randomly (see effect flags for result).</p><p>Duration: 1d6 hours (see effect duration).</p><p>Remedy: Antidote, cures, or time.</p>`,
  // Flags for applied secondary effect and duration will be added dynamically by the macro
  flags: { surge: {} },
};

// --- Active Effect Data for Poisoned (Damage) ---
const poisonedDamageEffectData = {
  name: 'Poisoned (Damage)', // V12+ name
  img: 'systems/surge/assets/icons/conditions/poisoned-damage.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until cured
  disabled: false,
  changes: [
    // Flag to identify this type of poison
    {
      key: 'flags.surge.poisonType',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'damage',
      priority: 5,
    },
  ],
  description: `<p>Takes 1d6 damage at start of turn in combat.</p>
                <p>Takes 2d6 damage per hour out of combat (GM Tracks).</p>
                <p>Remedy: Antidote of Writhing, cures.</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Poisoned (Deadly) ---
const poisonedDeadlyEffectData = {
  name: 'Poisoned (Deadly)', // V12+ name
  img: 'systems/surge/assets/icons/conditions/poisoned-deadly.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Timer handled by flags/hook
  disabled: false,
  changes: [
    // Flag to identify this type of poison
    {
      key: 'flags.surge.poisonType',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'deadly',
      priority: 5,
    },
    // We could add a specific isDeadlyPoisoned flag too if needed
  ],
  description: `<p>Creature enters Death Rolls at the start of the 6th turn after application if not cured.</p><p>Remedy: Antidote of Deadly Poison, cures.</p>`,
  // Initialize turn counter flag - hook will increment this
  flags: {
    surge: {
      poisonDeadlyTurns: 0, // Start counter at 0 (turn 1 will be the first increment)
      // startRound: null, // Macro will set these if in combat
      // startTurn: null
    },
  },
};

// --- Active Effect Data for Stunned ---
const stunnedEffectData = {
  name: 'Stunned',
  img: 'systems/surge/assets/icons/conditions/stunned.svg',
  duration: { seconds: null, rounds: null, turns: null },
  disabled: false,
  changes: [
    {
      key: 'flags.surge.stunned',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: '<p>...</p>', // Keep existing description
  // Initialize flags object structure
  flags: {
    surge: {
      stunnedLastHp: null, // Will be set by macro on application
    },
  },
};

// --- Active Effect Data for Unconscious ---
const unconsciousEffectData = {
  name: 'Unconscious', // V12+ name
  img: 'icons/svg/unconscious.svg', // Core icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until remedied
  disabled: false,
  changes: [
    // Flag to indicate the unconscious state
    // Note: Prone applied separately; Move=0 implied by Prone/Inaction
    {
      key: 'flags.surge.unconscious',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 70, // High priority
    },
  ],
  description: `<p>Falls Prone (Prone condition also applied).</p>
                <p>Unaware of surroundings.</p>
                <p><strong>Actions:</strong> Incapable of taking Actions or Speaking (GM Adjudicated).</p>
                <p><strong>Checks:</strong> Automatically fails Attribute and Skill checks.</p>
                <p><strong>Remedies:</strong> Medicine check action (by others); Standard cures (only if HP>0); Specific Healing (if HP <= 0).</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Wet ---
const wetEffectData = {
  name: 'Wet', // V12+ name
  img: 'systems/surge/assets/icons/conditions/wet.svg', // Match icon path
  duration: { seconds: 3600, rounds: null, turns: null }, // 1 Hour default duration
  disabled: false,
  changes: [
    // Flag to indicate the wet state
    {
      key: 'flags.surge.wet',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: `<p>Immune to Burning status effect.</p>
                <p>Gaining Chilled while Wet also applies Frozen.</p>
                <p>Removes Flammable condition upon application.</p>
                <p><strong>Remedies:</strong> Dries after 1 hour; Heat source for 10 min (GM Adjudicated).</p>`,
  flags: { surge: {} },
};

const bleedingEffectData = {
  name: 'Bleeding', // V12+ name
  img: 'icons/svg/blood.svg', // Core icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until patched/cured
  disabled: false,
  changes: [
    // Flag to indicate the bleeding state
    {
      key: 'flags.surge.bleeding',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: `<p>Takes additional damage from hits equal to the current Bleeding intensity (starts at +1, doubles each turn - see Flags). Assumes bonus applies to *all* hits while active.</p>
                <p>Remedy: Patch Up action, cures.</p>`,
  // Initialize the bonus damage counter flag
  flags: {
    surge: {
      bleedingDamage: 1, // Starts at +1 bonus damage for the first turn
    },
  },
};

// --- Active Effect Data for Broken ---
const brokenEffectData = {
  name: 'Broken', // V12+ name
  img: 'systems/surge/assets/icons/conditions/broken.svg', // Match icon path
  duration: { seconds: null, rounds: null, turns: null }, // Indefinite until patched
  disabled: false,
  changes: [
    // Flag to indicate the broken state
    {
      key: 'flags.surge.broken',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 10,
    },
  ],
  description: `<p>Takes double damage from Physical sources.</p>
                <p>Remedy: Requires Brace item and Patch Up action (details TBD).</p>`,
  flags: { surge: {} },
};

// --- Active Effect Data for Death Saves (Conscious) ---
const deathSavesConsciousEffectData = {
  name: 'Dying (Conscious)',
  img: 'icons/svg/hazard.svg',
  duration: { seconds: null, rounds: null, turns: null },
  disabled: false,
  changes: [
    // Only actor modifications that AREN'T just state for the effect itself
    {
      key: 'system.passives.movement.value',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0',
      priority: 50,
    },
    // No longer setting actor.flags.surge.deathSavesStage via changes here,
    // as the effect itself will carry this info in its own flags.
  ],
  description:
    '<p>Semi-conscious, aware, but unable to move, take actions, or speak.</p><p>Must make a STR or Survival check against escalating DR at the start of each turn (via Death Save button).</p><p>Failure transitions to Unconscious Death Saves.</p>',
  flags: {
    // Store stage and DR level directly on the effect
    surge: {
      deathSavesStage: 'conscious',
      deathSaveDRLevel: 0, // Starts at Easy (level 0)
    },
  },
};

// --- Active Effect Data for Death Saves (Unconscious) ---
const deathSavesUnconsciousEffectData = {
  name: 'Dying (Unconscious)',
  img: 'icons/svg/unconscious.svg',
  duration: { seconds: null, rounds: null, turns: null },
  disabled: false,
  changes: [
    {
      key: 'system.passives.movement.value',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: '0',
      priority: 50,
    },
    {
      // This flag on actor might still be useful for broader checks of being unconscious
      key: 'flags.surge.isTrulyUnconscious',
      mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
      value: 'true',
      priority: 65,
    },
  ],
  description:
    '<p>Unconscious and dying. Unable to move, take actions, or speak.</p><p>Must make a STR or Survival check against escalating DR at the start of each turn (via Death Save button).</p><p>First failure results in permanent death.</p>',
  flags: {
    // Store stage and DR level directly on the effect
    surge: {
      deathSavesStage: 'unconscious',
      deathSaveDRLevel: 0, // Resets to Easy (level 0)
    },
  },
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
    // console.log('SURGE! | Getting REVISED default options (with tabs)...'); // Log message updated
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
    const isIncapacitated = this.actor.flags?.surge?.incapacitated === true;
    const isUnconscious = this.actor.flags?.surge?.unconscious === true;
    let checkFailReason = null;

    if (isIncapacitated) checkFailReason = 'Incapacitated';
    else if (isUnconscious) checkFailReason = 'Unconscious';

    if (checkFailReason) {
      const messageContent = `${this.actor.name} is ${checkFailReason} and automatically fails the ${label}.`;
      ChatMessage.create({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: messageContent,
      });
      ui.notifications.warn(
        `${this.actor.name} automatically failed ${label} due to being ${checkFailReason}.`
      );
      console.log(
        `SURGE | ${this.actor.name} auto-failed check due to ${checkFailReason}.`
      );
      return; // Stop the roll process immediately
    }
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
   * Prepare data for the Handlebars template.
   * This provides the data context when rendering the sheet.
   * @param {object} options Options passed to the getData method.
   * @returns {object} The data object for template rendering.
   * @override
   */
  async getData(options) {
    const context = await super.getData(options);
    context.systemData = context.actor.system;

    // --- Species & Trait Info ---
    let speciesAndTraitDisplay = 'Unknown Species';
    const speciesItem = this.actor.items.find((i) => i.type === 'species');
    let hasTraitOptions = false;

    if (speciesItem) {
      let displayText = speciesItem.name;
      const traitItem = this.actor.items.find((i) => i.type === 'trait');
      if (traitItem) {
        displayText += ` (${traitItem.name})`;
      }
      speciesAndTraitDisplay = displayText;

      // Check if this species has options to swap
      if (
        speciesItem.system.traitOptions &&
        speciesItem.system.traitOptions.length > 0
      ) {
        hasTraitOptions = true;
      }
    }
    context.speciesAndTraitDisplay = speciesAndTraitDisplay;
    context.hasTraitOptions = hasTraitOptions;

    const isDjinn = speciesItem?.name === 'Djinn';
    context.isDjinn = isDjinn;

    // --- Calculate Skill Totals from Trait Bonuses ---
    const skillBonuses = {};
    const traitItems = this.actor.items.filter((item) => item.type === 'trait');
    for (const trait of traitItems) {
      const skill = trait.system.skillBonus?.skill;
      const bonus = trait.system.skillBonus?.value || 0;
      if (skill && bonus !== 0) {
        skillBonuses[skill] = (skillBonuses[skill] || 0) + bonus;
      }
    }
    for (const [key, skill] of Object.entries(context.systemData.skills)) {
      const bonus = skillBonuses[key] || 0;
      skill.total = skill.value + bonus;
      skill.tooltip = `Base: ${skill.value} + Traits: ${bonus}`;
    }

    // --- DERIVED STAT CALCULATIONS (MUST HAPPEN BEFORE DISPLAY LOGIC) ---

    // Calculate Max Actions
    const dexLevel = context.systemData.attributes?.dex?.value ?? 1;
    context.calculatedActions = {
      max: Math.floor(dexLevel / 2) + 2,
      label: 'Actions per Turn',
    };

    // Calculate Max HP
    const baseHp = context.systemData.passives?.hp?.base ?? 0;
    const encounter = context.systemData.passives?.encounter?.value ?? 0;
    const startingMaxHp =
      context.systemData.passives?.hp?.startingMax ?? baseHp;
    context.systemData.passives.hp.max = startingMaxHp + encounter;
    context.systemData.passives.hp.value = Math.min(
      context.systemData.passives.hp.value,
      context.systemData.passives.hp.max
    );

    // Calculate Total Menace
    const baseMenace = Number(context.systemData.passives?.menace?.base ?? 0);
    let equipmentMenace = 0;
    for (const item of this.actor.items) {
      if (
        item.system?.equipped === true &&
        typeof item.system?.menaceContribution === 'number'
      ) {
        equipmentMenace += item.system.menaceContribution;
      }
    }
    const totalMenace = baseMenace + equipmentMenace;
    context.systemData.passives.menace.total = totalMenace;
    context.systemData.passives.menace.tooltip = `Base: ${baseMenace} + Equip: ${equipmentMenace} = Total: ${totalMenace}`;

    // --- DISPLAY LOGIC (MOVED TO THE END) ---

    const hasSpecies = this.actor.items.some((i) => i.type === 'species');

    // Create display-specific variables. Show '?' if no species is present.
    context.displayHP = hasSpecies ? context.systemData.passives.hp.value : '?';
    context.displayMaxHP = hasSpecies
      ? context.systemData.passives.hp.max
      : '?';
    context.displayRecovery = hasSpecies
      ? context.systemData.passives.recovery.value
      : '?';
    context.displayMovement = hasSpecies
      ? context.systemData.passives.movement.value
      : '?';
    context.displayMenace = hasSpecies
      ? context.systemData.passives.menace.total
      : '?';

    // Calculate HP Status Label & Death Save Button State
    let hpStatusLabel = 'Healthy';
    let deathSaveButtonDisabled = true;
    const currentHp = context.systemData.passives.hp.value;
    const maxHp = context.systemData.passives.hp.max;
    const defeatedStatusId = CONFIG.Combat.defeatedStatusId ?? 'dead';
    const isActuallyDead = this.actor.statuses.has(defeatedStatusId);
    const deathSaveEffect = this.actor.effects.find(
      (e) => e.flags?.surge?.deathSavesStage && !e.disabled
    );
    const actorDeathSaveStage = deathSaveEffect?.flags?.surge?.deathSavesStage;

    if (isActuallyDead) {
      hpStatusLabel = 'Dead';
      deathSaveButtonDisabled = true;
    } else if (actorDeathSaveStage === 'conscious') {
      hpStatusLabel = 'Dying - Conscious';
      deathSaveButtonDisabled = false;
    } else if (actorDeathSaveStage === 'unconscious') {
      hpStatusLabel = 'Dying - Unconscious';
      deathSaveButtonDisabled = false;
    } else if (currentHp <= 0 && hasSpecies) {
      // Only show dying state if they have a species
      hpStatusLabel = 'Dying (Awaiting State)';
      deathSaveButtonDisabled = false;
    } else if (maxHp > 0 && currentHp <= maxHp / 2) {
      hpStatusLabel = 'Bloodied';
      deathSaveButtonDisabled = true;
    } else if (!hasSpecies) {
      // If no species, show unknown
      hpStatusLabel = 'Unknown';
      deathSaveButtonDisabled = true;
    } else {
      hpStatusLabel = 'Healthy';
      deathSaveButtonDisabled = true;
    }
    context.hpStatusLabel = hpStatusLabel;
    context.deathSaveButtonDisabled = deathSaveButtonDisabled;

    // --- Calculate BP Costs & Affordability for UI ---
    const currentBp = context.systemData.buyPoints.value || 0;

    // Attributes
    for (const attr of Object.values(context.systemData.attributes)) {
      attr.cost = 4;
      attr.isAffordable = currentBp >= attr.cost && attr.value < 20;
    }

    // Skills (Cost is now flat 3)
    for (const skill of Object.values(context.systemData.skills)) {
      skill.cost = 3;
      skill.isAffordable = currentBp >= skill.cost && skill.total < 20;
    }

    // --- Condition Actions ---
    context.conditionActions = [];

    // Action: Stand Up
    // Rule: "A creature may take one action to stand up."
    // We check for the 'prone' flag. We also check if they are NOT Unconscious/Incapacitated,
    // strictly speaking, but for UI utility, we often leave the button available
    // and let the GM enforce the "unable to act" rule.
    // However, if you want to be strict, you can add: && !context.actor.flags?.surge?.incapacitated
    if (this.actor.flags?.surge?.prone) {
      context.conditionActions.push({
        id: 'stand-up',
        label: 'Stand Up',
        cost: '1 Action',
        icon: 'fas fa-arrow-up',
      });
    }

    // Action: Patch Up (Bleeding)
    if (this.actor.flags?.surge?.bleeding) {
      context.conditionActions.push({
        id: 'patch-up-bleeding',
        label: 'Patch Up (Bleeding)',
        cost: '1 Action + Item?', // Hint to player/GM
        icon: 'fas fa-band-aid',
      });
    }

    // Action: Patch Up (Broken)
    if (this.actor.flags?.surge?.broken) {
      context.conditionActions.push({
        id: 'patch-up-broken',
        label: 'Patch Up (Broken)',
        cost: '1 Action + Item?',
        icon: 'fas fa-tools',
      });
    }

    // --- Check Edit Mode Flag ---
    context.isEditMode = this.actor.flags?.surge?.editMode === true;

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
    // console.log('SURGE! | Activating Listeners');

    // --- Header Listeners ---
    html.find('.death-save-button').click(this._onMakeDeathSave.bind(this));

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

    // --- Spellbook Tab Listeners ---
    const spellbookTab = html.find('.tab.spellbook'); // <<< Find new tab
    spellbookTab.find('.item-cast').click(this._onItemCast.bind(this)); // <<< Target cast button here
    // Add Edit/Delete listeners specifically for spells in this tab too
    spellbookTab.find('.item-edit').click(this._onItemEdit.bind(this));
    spellbookTab.find('.item-delete').click(this._onItemDelete.bind(this));

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

    // Character Level Up Button
    html.find('.level-up-button').click(this._onCharacterLevelUp.bind(this));
    // Spend BP Buttons
    html.find('.spend-bp-button').click(this._onSpendBP.bind(this));

    // --- Condition Action Listeners ---
    html
      .find('.condition-action-btn')
      .click(this._onConditionAction.bind(this));

    // Toggle Edit Mode
    html.find('.toggle-edit-mode').click(this._onToggleEditMode.bind(this));

    // Reset Stats
    html.find('.reset-stats-button').click(this._onResetStats.bind(this));

    // Change Species Trait (Renamed from Djinn)
    html
      .find('.change-species-trait')
      .click(this._onChangeSpeciesTrait.bind(this));

    // console.log('SURGE! | Attached CUSTOM effect control listeners.');
  }

  /**
   * Handle dropping an Item onto the Actor Sheet.
   * This is used for the "Choose a Species" character creation step.
   * @param {DragEvent} event The concluding drag event.
   * @param {object} data   The data transfer object.
   * @override
   */
  async _onDropItem(event, data) {
    // Prevent the default drop behavior
    event.preventDefault();
    console.log('SURGE | _onDropItem triggered', data);

    // Get the dropped Item from the drop data
    const item = await Item.fromDropData(data);
    if (!item) return false;

    // --- Handle SPECIES Drop for Character Creation ---
    if (item.type === 'species') {
      console.log(`SURGE | Dropped item is a Species: ${item.name}`);
      const actor = this.actor;

      // 1. Check if actor already has a species
      const existingSpecies = actor.items.find((i) => i.type === 'species');
      if (existingSpecies) {
        ui.notifications.warn(
          `This character already has a Species (${existingSpecies.name}). Please remove it before adding a new one.`
        );
        return false;
      }

      // 2. Apply Species Attribute Bonus
      const attrBonus = item.system.attributeBonus;
      if (attrBonus?.attribute && attrBonus?.value) {
        const currentAttr = actor.system.attributes[attrBonus.attribute].value;
        await actor.update({
          [`system.attributes.${attrBonus.attribute}.value`]:
            currentAttr + attrBonus.value,
        });
        ui.notifications.info(
          `${item.name} applies +${
            attrBonus.value
          } ${attrBonus.attribute.toUpperCase()}.`
        );
      }

      // 3. Set Base Passives (Movement, Recovery, Menace)
      await actor.update({
        'system.passives.movement.value': item.system.baseMovement || 10,
        'system.passives.recovery.value': item.system.baseRecovery || 0,
        'system.passives.menace.base': item.system.baseMenace || 0,
      });
      ui.notifications.info(`Base passives set by ${item.name}.`);

      // 4. Calculate Starting HP
      const strLevel = actor.system.attributes.str.value; // Use current STR for the roll
      const hpRoll = await this._performRoll(
        strLevel,
        `${actor.name}'s Starting HP (Strength Roll)`,
        [],
        'str'
      );
      // NOTE: _performRoll sends to chat but doesn't return the roll object. We need to roll again here to get the total.
      const hpRollTableData = this._rollTable[strLevel];
      const hpRollFormula = `${hpRollTableData.dice}d6x6 + ${hpRollTableData.mod}`;
      const startingHpRoll = await new Roll(hpRollFormula).evaluate();
      const baseHp = item.system.baseHp || 0;
      const startingMaxHp = startingHpRoll.total + baseHp;

      await actor.update({
        'system.passives.hp.base': baseHp,
        'system.passives.hp.startingMax': startingMaxHp,
        'system.passives.hp.value': startingMaxHp,
        'system.passives.hp.max': startingMaxHp, // max will be recalculated by getData later if En-Counter changes
      });
      // Post the HP roll result to chat for the player to see
      startingHpRoll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        flavor: `Starting HP Roll (${strLevel} STR): ${startingHpRoll.total} + ${baseHp} Base = ${startingMaxHp} Max HP`,
      });

      // 5. Prompt for "Chosen Trait"
      // This part assumes your 'trait' items are in a compendium named 'surge-traits'
      const traitPack = game.packs.get('surge.surge-traits');
      if (!traitPack) {
        ui.notifications.error(
          "Could not find the 'SURGE! Traits' compendium pack (ID: surge-traits)."
        );
        return false;
      }
      await traitPack.getIndex(); // Load the pack index

      let traitChoices = {};
      for (const traitOption of item.system.traitOptions) {
        // Assuming traitOptions on the species item stores the NAME of the trait item
        const traitIndexEntry = traitPack.index.find(
          (entry) => entry.name === traitOption.name
        );
        if (traitIndexEntry) {
          traitChoices[traitIndexEntry._id] = traitOption.name;
        }
      }

      const chosenTraitId = await new Promise((resolve) => {
        new Dialog({
          title: `Choose ${item.name} Trait`,
          content: `<p>As a ${item.name}, you must choose a trait:</p>
                      <div class="form-group">
                        <label for="traitChoice">Spirit Guide:</label>
                        <select id="traitChoice" name="traitChoice">
                            ${Object.entries(traitChoices)
                              .map(
                                ([id, name]) =>
                                  `<option value="${id}">${name}</option>`
                              )
                              .join('')}
                        </select>
                      </div>`,
          buttons: {
            select: {
              icon: '<i class="fas fa-check"></i>',
              label: 'Select Trait',
              callback: (html) =>
                resolve(html.find('select[name="traitChoice"]').val()),
            },
          },
          default: 'select',
          close: () => resolve(null),
        }).render(true);
      });

      if (chosenTraitId) {
        const chosenTrait = await traitPack.getDocument(chosenTraitId);
        if (chosenTrait) {
          await actor.createEmbeddedDocuments('Item', [chosenTrait.toObject()]);
          ui.notifications.info(`Trait added: ${chosenTrait.name}`);
        }
      }

      // 6. Finally, add the Species item itself to the character sheet
      return actor.createEmbeddedDocuments('Item', [item.toObject()]);
    } // End if species

    // If the dropped item was NOT a species, fall back to the default sheet behavior
    return super._onDropItem(event, data);
  }

  /**
   * Handle the GM clicking the "Level Up" button.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onCharacterLevelUp(event) {
    event.preventDefault();

    const actor = this.actor;
    const currentLevel = actor.system.details.level.value;
    const newLevel = currentLevel + 1;

    // Calculate BP to award: 7 + (INT Level / 2, rounded down)
    const intLevel = actor.system.attributes.int.value;
    const bpAwarded = 7 + Math.floor(intLevel / 2);

    const newBpValue = (actor.system.buyPoints.value || 0) + bpAwarded;
    const newBpTotal = (actor.system.buyPoints.total || 0) + bpAwarded;

    // Update actor data
    await actor.update({
      'system.details.level.value': newLevel,
      'system.buyPoints.value': newBpValue,
      'system.buyPoints.total': newBpTotal,
    });

    // Send chat message
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      content: `${actor.name} has reached Level ${newLevel} and gains ${bpAwarded} Buy Points!`,
    });
  }

  /**
   * Handle a player spending Buy Points to increase a stat.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onSpendBP(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const statType = element.dataset.statType; // "attribute" or "skill"
    const statKey = element.dataset.statKey; // "str", "dex", "culture", etc.
    const actor = this.actor;
    const currentBp = actor.system.buyPoints.value || 0;

    if (statType === 'attribute') {
      const cost = 4; // Flat cost for attributes
      const currentLevel = actor.system.attributes[statKey].value;
      const newLevel = currentLevel + 1;

      if (newLevel > 20) {
        return ui.notifications.warn(
          'Cannot raise an attribute above Level 20.'
        );
      }
      if (currentBp < cost) {
        return ui.notifications.warn(
          `Not enough Buy Points! Needs ${cost} BP.`
        );
      }

      // Deduct BP and increase stat
      const statPath = `system.attributes.${statKey}.value`;
      const statLabel = actor.system.attributes[statKey].label;
      await actor.update({
        'system.buyPoints.value': currentBp - cost,
        [statPath]: newLevel,
      });

      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        content: `${actor.name} spent ${cost} BP to increase ${statLabel} to Level ${newLevel}.`,
      });
    } else if (statType === 'skill') {
      const baseLevel = actor.system.skills[statKey].value;
      const statLabel = actor.system.skills[statKey].label;

      // We still need to calculate total level to check the cap (20),
      // but the COST is now always 3.
      let skillBonus = 0;
      const traitItems = this.actor.items.filter(
        (item) => item.type === 'trait'
      );
      for (const trait of traitItems) {
        if (trait.system.skillBonus?.skill === statKey) {
          skillBonus += trait.system.skillBonus?.value || 0;
        }
      }
      const currentTotalLevel = baseLevel + skillBonus;

      // Check level cap using the TOTAL level
      if (currentTotalLevel >= 20) {
        return ui.notifications.warn(
          `${statLabel} is already at the maximum total level of 20.`
        );
      }

      const cost = 3;

      if (currentBp < cost) {
        return ui.notifications.warn(
          `Not enough Buy Points to raise ${statLabel}! Needs ${cost} BP.`
        );
      }

      // If affordable, we increase the BASE level by 1
      const newBaseLevel = baseLevel + 1;
      const statPath = `system.skills.${statKey}.value`;

      // Deduct BP and increase stat's BASE value
      await actor.update({
        'system.buyPoints.value': currentBp - cost,
        [statPath]: newBaseLevel,
      });

      // Send chat message showing the NEW total level
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        content: `${actor.name} spent ${cost} BP to increase ${statLabel} to Level ${nextTotalLevel}.`,
      });
    }
  }

  /**
   * Handle the click on the "Make Death Save" button.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onMakeDeathSave(event) {
    event.preventDefault();
    const actor = this.actor;
    console.log(`SURGE | _onMakeDeathSave triggered for ${actor.name}`);

    // Find the current death save effect to get stage and DR level
    const deathSaveEffect = actor.effects.find(
      (e) => e.flags?.surge?.deathSavesStage && !e.disabled
    );

    if (!deathSaveEffect) {
      ui.notifications.warn(
        `${actor.name} is not currently in a death saving throw state.`
      );
      console.log(
        `SURGE | No active death save effect found for ${actor.name}.`
      );
      return;
    }

    const stage = deathSaveEffect.flags.surge.deathSavesStage;
    let drLevel = Number(deathSaveEffect.flags.surge.deathSaveDRLevel ?? 0);
    const drValue =
      CONFIG.SURGE.DRValueMap[drLevel] ?? CONFIG.SURGE.DRValueMap[0];
    const drLabel =
      CONFIG.SURGE.DRLabelMap[drLevel] ?? CONFIG.SURGE.DRLabelMap[0];

    console.log(
      `SURGE | Current Death Save Stage: ${stage}, DR Level: ${drLevel} (Target: ${drValue} - ${drLabel})`
    );

    // --- Prompt for Stat Choice (Strength or Survival) ---
    const choice = await new Promise((resolve) => {
      new Dialog({
        title: 'Make Death Save',
        content: `
                <p>${actor.name} is ${
          stage === 'conscious' ? 'consciously' : 'unconsciously'
        } dying.</p>
                <p>Choose roll for Death Save (vs DR ${drValue} - ${drLabel}):</p>
                <div class="form-group">
                    <label for="deathSaveStatChoice">Roll Using:</label>
                    <select id="deathSaveStatChoice" name="deathSaveStatChoice">
                        <option value="str">Strength</option>
                        <option value="survival">Survival</option>
                    </select>
                </div>`,
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice-d20"></i>',
            label: 'Roll Save',
            callback: (html) =>
              resolve(html.find('select[name="deathSaveStatChoice"]').val()),
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: 'Cancel',
            callback: () => resolve(null),
          },
        },
        default: 'roll',
        close: () => resolve(null), // Resolve null if closed
      }).render(true);
    });

    if (!choice) {
      console.log(`SURGE | Death Save cancelled.`);
      return;
    }
    console.log(`SURGE | User chose to roll: ${choice}`);

    // --- Perform the Roll ---
    let baseLevel = 1;
    let rollStatLabel = '';
    if (choice === 'str') {
      baseLevel = actor.system.attributes.str?.value ?? 1;
      rollStatLabel = 'Strength';
    } else {
      // survival
      baseLevel = actor.system.skills.survival?.value ?? 1; // Assuming 'survival' is skill key
      rollStatLabel = 'Survival';
    }

    const rollTableEntry = this._rollTable[baseLevel];
    const dice = rollTableEntry?.dice ?? 1;
    const mod = rollTableEntry?.mod ?? 0;
    const rollFormula = `${dice}d6x6 + ${mod}`;
    console.log(
      `SURGE | Death Save Formula for ${rollStatLabel}: ${rollFormula} (Level ${baseLevel})`
    );

    const saveRoll = await new Roll(rollFormula).evaluate();
    console.log(
      `SURGE | Death Save (${rollStatLabel}) Rolled: ${saveRoll.total}`
    );

    // Send roll to chat (adjust visibility as per clarification)
    saveRoll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: `${rollStatLabel} vs DR ${drValue} (${drLabel})`,
    });

    const success = saveRoll.total >= drValue;
    console.log(
      `SURGE | Save Success: ${success} (Rolled ${saveRoll.total} vs DR ${drValue})`
    );

    // --- Process Result ---
    let chatOutcome = '';
    if (success) {
      drLevel++;
      await deathSaveEffect.update({ 'flags.surge.deathSaveDRLevel': drLevel });
      const nextDRKey = Math.min(
        drLevel,
        Object.keys(CONFIG.SURGE.DRLabelMap).length - 1
      ); // Cap at max defined DR
      const nextDRLabel = CONFIG.SURGE.DRLabelMap[nextDRKey] ?? 'Max';
      chatOutcome = `${actor.name} succeeds on their Death Save! They hold on. Next save DR will be: ${nextDRLabel}.`;
      console.log(
        `SURGE | Death Save Success. DRLevel for ${stage} updated to ${drLevel}.`
      );
    } else {
      // Failure
      if (stage === 'conscious') {
        chatOutcome = `${actor.name} fails their Conscious Death Save and slips into Unconscious Death Saving Throws! DR resets to Easy.`;
        console.log(
          `SURGE | Conscious Death Save Failed. Transitioning to Unconscious.`
        );
        await deathSaveEffect.delete();
        const unconsciousData = foundry.utils.deepClone(
          CONFIG.SURGE.effectData['death-saves-unconscious']
        );
        unconsciousData.flags.surge.deathSaveDRLevel = 0; // Ensure DR resets to 0 (Easy)
        await ActiveEffect.create(unconsciousData, { parent: actor });
      } else {
        // stage === "unconscious"
        chatOutcome = `${actor.name} fails their Unconscious Death Save and has died.`;
        console.log(`SURGE | Unconscious Death Save Failed. Actor dies.`);
        const defeatedStatusId = CONFIG.Combat.defeatedStatusId ?? 'dead';
        await actor.toggleStatusEffect(defeatedStatusId, {
          active: true,
          overlay: true,
        });
        await deathSaveEffect.delete();
      }
    }

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      content: chatOutcome,
    });

    // Sheet re-render should be triggered by AE changes or actor updates
  } // End _onMakeDeathSave

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
        const isRestrained = this.actor.flags?.surge?.restrained === true;
        const isProne = this.actor.flags?.surge?.prone === true;
        const isPinned = this.actor.flags?.surge?.pinned === true;
        let autoFailReason = null;

        if (attributeKey === 'dex') {
          if (isRestrained) autoFailReason = 'Restrained';
          else if (isProne) autoFailReason = 'Prone';
          else if (isPinned) autoFailReason = 'Pinned';
        }

        if (autoFailReason) {
          const label = `${attribute.label} Check`; // Get label for message
          const messageContent = `${this.actor.name} is ${autoFailReason} and automatically fails the ${label}.`;
          ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: messageContent,
          });
          ui.notifications.warn(
            `${this.actor.name} automatically failed ${label} due to being ${autoFailReason}.`
          );
          console.log(
            `SURGE | ${this.actor.name} auto-failed DEX attribute check due to ${autoFailReason}.`
          );
          return; // Stop before performing the roll
        }
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
   * Includes bonuses from Traits and the Invisible condition.
   * @param {Event} event The triggering click event
   * @private
   */
  async _onSkillRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const skillKey = element.dataset.skill;
    const skill = this.actor.system.skills[skillKey];

    if (skill) {
      // --- START: Calculate Total Skill Level ---
      let skillBonus = 0;
      // Filter for trait items that provide a bonus to the specific skill being rolled
      const traitItems = this.actor.items.filter(
        (item) => item.type === 'trait'
      );
      for (const trait of traitItems) {
        if (trait.system.skillBonus?.skill === skillKey) {
          skillBonus += trait.system.skillBonus?.value || 0;
        }
      }
      // The final level for the roll is the base value plus any bonuses from traits
      const level = skill.value + skillBonus;
      console.log(
        `SURGE | Rolling ${skillKey}. Base: ${skill.value}, Trait Bonus: ${skillBonus}, Total Level for Roll: ${level}`
      );
      // --- END: Calculate Total Skill Level ---

      const isShift = event.shiftKey;
      const isCtrl = event.ctrlKey || event.metaKey;
      const actorAttributes = this.actor.system.attributes;
      let primaryAttributeKey = null;
      if (skillKey === 'guile' || skillKey === 'marksmanship')
        primaryAttributeKey = 'dex';

      // Get base modifiers (from equipment penalties)
      let baseModifiers = this._getEquippedPenalties(
        primaryAttributeKey,
        skillKey
      );
      if (!Array.isArray(baseModifiers)) {
        baseModifiers = [];
      }

      // Check for Invisible Bonus specifically for Guile
      const isInvisible = this.actor.flags?.surge?.invisible === true;
      if (isInvisible && skillKey === 'guile') {
        console.log(`SURGE | Actor is Invisible. Adding +6 Guile bonus.`);
        baseModifiers.push({ value: 6, label: 'Invisible (Stealth)' });
      }

      console.log(
        `SURGE DEBUG | _onSkillRoll for ${skillKey} - Base Modifiers Found:`,
        JSON.parse(JSON.stringify(baseModifiers))
      );

      // --- Handle skill-specific logic ---
      if (skillKey === 'martial') {
        if (isShift) {
          // Melee Weapon Attack
          if (
            this.actor.flags?.surge?.crushed === true ||
            this.actor.flags?.surge?.pinned === true
          ) {
            ui.notifications.warn(
              `${this.actor.name} cannot make physical attacks while ${
                this.actor.flags?.surge?.crushed ? 'Crushed' : 'Pinned'
              }.`
            );
            return;
          }
          let attackBonus = [
            { value: actorAttributes.str?.value ?? 0, label: 'STR Level' },
          ];
          let finalModifiers = [...baseModifiers, ...attackBonus].filter(
            (m) => m.value !== 0
          );
          await this._performRoll(
            level,
            `Melee Weapon Attack (${skill.label})`,
            finalModifiers,
            'str'
          );
        } else if (isCtrl) {
          // Melee Defense
          await this._rollMeleeDefense();
        } else {
          // Basic Martial Check
          await this._performRoll(
            level,
            `${skill.label} Check`,
            baseModifiers,
            'str'
          );
        }
      } else if (skillKey === 'mystic') {
        if (isCtrl) {
          // Magic Defense
          await this._rollMagicDefense();
        } else {
          // Basic Mystic Check
          let mysticPenalties = this._getEquippedPenalties(null, skillKey);
          if (!Array.isArray(mysticPenalties)) {
            mysticPenalties = [];
          }
          await this._performRoll(
            level,
            `${skill.label} Check`,
            mysticPenalties,
            'int'
          );
        }
      } else {
        // --- Other skill basic checks (Handles Guile, Marksmanship, etc.) ---
        let associatedAttrKey = null;
        if (skillKey === 'guile' || skillKey === 'marksmanship')
          associatedAttrKey = 'dex';
        await this._performRoll(
          level,
          `${skill.label} Check`,
          baseModifiers,
          associatedAttrKey
        );
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
    // --- Check if Crushed or Pinned ---
    if (this.actor.flags?.surge?.crushed === true) {
      ui.notifications.warn(`${this.actor.name} cannot attack while Crushed.`);
      return; // Stop the function
    }
    if (this.actor.flags?.surge?.pinned === true) {
      ui.notifications.warn(
        `${this.actor.name} cannot make physical attacks while Pinned.`
      );
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
   * Handle clicking the "Cast Spell" button on an item in the inventory.
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onItemCast(event) {
    event.preventDefault();
    console.log('SURGE | _onItemCast triggered');

    const element = event.currentTarget;
    const li = element.closest('.item');
    const itemId = li?.dataset?.itemId;
    const spell = this.actor.items.get(itemId);

    if (!spell || spell.type !== 'spell') return;
    console.log(`SURGE | Attempting to cast: ${spell.name}`);

    // Check Mute Condition
    if (this.actor.flags?.surge?.mute === true) {
      ui.notifications.warn(
        `${this.actor.name} cannot cast spells while Mute.`
      );
      return;
    }

    // Get Targets (can be empty for self/area spells)
    const targets = game.user.targets;
    console.log(`SURGE | Targets for spell: ${targets.size}`, targets);

    // Action Cost / Multi-turn casting (Manual for now)
    ui.notifications.info(
      `Casting ${spell.name}... (Action cost/Focus/Multi-turn TBD)`
    );

    // *** Create sourceItemData from the spell ***
    const sourceItemData = {
      id: spell.id,
      name: spell.name,
      appliesCondition: spell.system.appliesCondition?.value || '', // Read from spell object
    };

    // Effect application results (for summary message)
    let effectsAppliedDetails = [];
    let successes = 0;

    // --- Handle Targeted Spells (Requires Contest) ---
    if (targets.size > 0) {
      console.log(`SURGE | Performing contested rolls against targets...`);
      for (const targetToken of targets) {
        const targetActor = targetToken.actor;
        if (!targetActor) continue;

        // Perform the contest
        const success = await this._performContestedSpellRoll(
          spell,
          targetActor
        );
        if (success) {
          successes++;
          console.log(
            `SURGE | Spell successful against ${targetActor.name}. Applying effects...`
          );
          // Apply Damage, Healing, Conditions to this targetActor
          const effectResult = await this._applySpellEffects(
            spell,
            targetActor,
            sourceItemData
          );
          effectsAppliedDetails.push(
            `${targetToken.name}: ${
              effectResult || 'Success (No specific effect)'
            }`
          );
        } else {
          console.log(`SURGE | Spell failed against ${targetActor.name}`);
          effectsAppliedDetails.push(`${targetToken.name}: Defended`);
        }
      }
      console.log(`SURGE | Spell affected ${successes} targets.`);

      // --- Handle Self / Area / No Target Spells --- (Basic - assumes success if no contest needed)
    } else {
      // Check spell range/target type to decide if it affects self or needs different handling
      const range = spell.system.range?.value?.toLowerCase() || '';
      const targetType = spell.system.target?.value?.toLowerCase() || '';

      if (range === 'self' || targetType === 'self') {
        console.log(
          `SURGE | Spell targets Self. Applying effects to ${this.actor.name}...`
        );
        const effectResult = await this._applySpellEffects(
          spell,
          this.actor,
          sourceItemData
        ); // Apply to caster
        effectsAppliedDetails.push(
          `Self: ${effectResult || 'Success (No specific effect)'}`
        );
      } else {
        // Need logic for Area of Effect spells or utility spells without targets later
        console.log(
          `SURGE | Spell has no targets and is not Self-cast. Effect application TBD.`
        );
        effectsAppliedDetails.push(`(No target specified/required)`);
      }
    }

    // --- Final Summary Message (Optional) ---
    if (effectsAppliedDetails.length > 0) {
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: `<strong>${
          spell.name
        } Cast Results:</strong><br>${effectsAppliedDetails.join('<br>')}`,
      });
    }

    console.log('SURGE | _onItemCast finished');
  }

  // --- NEW HELPER: Apply Standard Spell Effects ---
  // Add this helper method inside SurgeCharacterSheet class
  /**
   * Applies common spell effects (damage, healing, conditions) to a target actor.
   * @param {Item} spell         The spell item document.
   * @param {Actor} targetActor The actor to apply effects to.
   * @returns {Promise<string>} A summary string of effects applied.
   * @private
   */
  async _applySpellEffects(spell, targetActor, sourceItemData = {}) {
    if (!spell || !targetActor) return '';

    let results = [];

    // --- Apply Damage ---
    const damageFormula = spell.system.damage?.formula?.value;
    if (damageFormula) {
      console.log(
        `SURGE | Applying spell damage from ${spell.name} to ${targetActor.name}`
      );
      const damageType = spell.system.damage?.type?.value || 'Unknown';
      // Call _performDamageRoll - NOTE: This internally gets targets again, which isn't ideal.
      // We might want a different function `_applyDamageDirectly(damageRoll, damageType, targetActor)` later.
      // For now, re-using _performDamageRoll requires the user to TARGET the actor again.
      // Let's simplify for now and apply damage directly here.

      const roll = await new Roll(
        damageFormula.replace(/d6(?![x0-9])/gi, 'd6x6')
      ).evaluate(); // Apply surge if needed? Assume yes.
      const baseDamage = roll.total;
      let finalDamage = baseDamage; // Start with base

      // Check Bleeding on target (if _performDamageRoll isn't called)
      // Check Broken on target (if _performDamageRoll isn't called & type is physical)
      // Check resistances/vulnerabilities? Needs framework.

      console.log(
        `SURGE | Applying ${finalDamage} ${damageType} damage directly to ${targetActor.name}`
      );
      const currentHp = targetActor.system.passives.hp.value;
      if (typeof currentHp === 'number') {
        const newHp = Math.max(0, currentHp - finalDamage);
        await targetActor.update({ 'system.passives.hp.value': newHp });
        results.push(`${finalDamage} ${damageType} Damage`);
        // Optional scrolling text: canvas.interface.createScrollingText(...)
      }
    }

    // --- Apply Healing ---
    const healingFormula = spell.system.healing?.formula?.value;
    if (healingFormula) {
      console.log(
        `SURGE | Applying spell healing from ${spell.name} to ${targetActor.name}`
      );
      const healRoll = await new Roll(healingFormula).evaluate(); // No surge on healing? Assume no.
      const healingAmount = healRoll.total;
      if (healingAmount > 0) {
        const currentHp = targetActor.system.passives.hp.value;
        const maxHp = targetActor.system.passives.hp.max; // Need maxHp
        if (typeof currentHp === 'number' && typeof maxHp === 'number') {
          const newHp = Math.min(maxHp, currentHp + healingAmount); // Don't exceed max HP
          await targetActor.update({ 'system.passives.hp.value': newHp });
          results.push(`${healingAmount} Healing`);
          console.log(`SURGE | Healed ${targetActor.name} to ${newHp} HP.`);
          // Optional scrolling text
        }
      }
    }

    // --- Apply Conditions ---
    const conditionIdsToApply = (sourceItemData?.appliesCondition || '')
      .split(',')
      .map((id) => id.trim().toLowerCase())
      .filter((id) => id);

    console.log(
      `SURGE DEBUG (_applySpellEffects) | Conditions to check on ${targetActor.name}:`,
      conditionIdsToApply
    ); // Log IDs found

    if (conditionIdsToApply.length > 0) {
      console.log(
        `SURGE | Spell ${spell.name} attempting to apply conditions:`,
        conditionIdsToApply
      );
      let appliedConds = [];
      for (const conditionId of conditionIdsToApply) {
        console.log(
          `SURGE DEBUG (_applySpellEffects) | Processing conditionId: "${conditionId}"`
        );
        // Look up effect data from CONFIG
        const effectBaseData = CONFIG.SURGE?.effectData?.[conditionId];
        console.log(
          `SURGE DEBUG (_applySpellEffects) | Found effectBaseData:`,
          effectBaseData
        ); // Log data found

        if (!effectBaseData) {
          console.warn(
            `SURGE | No effect data found in CONFIG.SURGE.effectData for condition ID: ${conditionId}`
          );
          continue; // Skip if data not found
        }
        // --- Stacking Check --- (Needs specific logic per condition type)
        let shouldApply = true;
        console.log(
          `SURGE DEBUG (_applySpellEffects) | Checking stacking for ${conditionId}...`
        );
        // Example: Generic check for non-stacking poisons based on type flag
        if (conditionId.startsWith('poisoned-')) {
          const poisonType = conditionId.split('-')[1];
          const alreadyHasPoisonType = targetActor.effects.some((e) =>
            e.changes.some(
              (c) =>
                c.key === 'flags.surge.poisonType' && c.value === poisonType
            )
          );
          if (alreadyHasPoisonType) {
            shouldApply = false;
          }
        }
        // Example: Check for Bleeding flag
        else if (conditionId === 'bleeding') {
          const alreadyBleeding = targetActor.effects.some((e) =>
            e.changes.some((c) => c.key === 'flags.surge.bleeding')
          );
          if (alreadyBleeding) {
            shouldApply = false;
          }
        }
        // Add other checks (e.g., for Crushed, Frozen, etc. if they shouldn't stack)
        console.log(
          `SURGE DEBUG (_applySpellEffects) | Should Apply ${conditionId}? ${shouldApply}`
        );

        if (shouldApply) {
          try {
            const dataToCreate = foundry.utils.deepClone(effectBaseData);
            // Apply spell-specific duration? Need duration field on spell item & logic here. Using default AE duration for now.
            console.log(
              `SURGE DEBUG (_applySpellEffects) | Creating ActiveEffect for ${conditionId} with data:`,
              dataToCreate
            );
            await ActiveEffect.create(dataToCreate, { parent: targetActor });
            appliedConds.push(effectBaseData.name || conditionId); // Add name/ID to list
            console.log(
              `SURGE | Applied ${conditionId} effect via spell to ${targetActor.name}.`
            );
          } catch (applyErr) {
            console.error(
              `SURGE | Failed to apply effect ${conditionId} to ${targetActor.name}:`,
              applyErr
            );
          }
        } else {
          console.log(
            `SURGE | Skipping application of ${conditionId} due to stacking rules.`
          );
        }
      }

      if (appliedConds.length > 0) {
        results.push(`Applies ${appliedConds.join(', ')}`);
      }
    }

    return results.join('; '); // Return summary string
  } // --- End _applySpellEffects ---

  /**
   * Handle clicking the damage button on a weapon item.
   * Performs the damage roll using the weapon's damage formula
   * and passes source item info (for condition application) to _performDamageRoll. // <<< UPDATED DOC
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
    const conditionToApply = item.system.appliesCondition || '';
    let label = `${item.name} Damage`;
    if (damageType) {
      label += ` (${damageType})`;
    }

    const sourceItemData = {
      id: item.id,
      name: item.name,
      appliesCondition: conditionToApply.trim().toLowerCase(), // Pass condition ID (lowercase, trimmed)
    };

    console.log(
      `SURGE | Calling _performDamageRoll. Formula: ${damageFormula}, Label: ${label}, Type: ${damageType}, Source Item Data:`,
      sourceItemData
    );

    // Call the new damage roll helper
    await this._performDamageRoll(
      damageFormula,
      label,
      damageType,
      sourceItemData
    );
  }

  /**
   * Performs damage roll, applies damage, adds Bleed/Broken bonus,
   * and applies conditions specified by the source item.
   * @param {string} formula          Base damage formula
   * @param {string} label            Chat message flavor
   * @param {string} [damageType="Physical"] Damage type
   * @param {object} [sourceItemData={}] Data about the item causing damage
   * @param {string} sourceItemData.id   ID of the source item
   * @param {string} sourceItemData.name Name of the source item
   * @param {string} sourceItemData.appliesCondition Comma-separated string of condition IDs
   * @returns {Promise<void>}
   * @private
   */
  async _performDamageRoll(
    formula,
    label,
    damageType = 'Physical',
    sourceItemData = {}
  ) {
    console.log(`SURGE | --- _performDamageRoll START ---`);
    console.log(
      `SURGE | Formula: ${formula}, Label: ${label}, Type: ${damageType}, SourceItem:`,
      sourceItemData
    );

    const surgeFormula = formula.replace(/d6(?![x0-9])/gi, 'd6x6');
    const rollData = this.actor.getRollData() ?? {};
    const roll = new Roll(surgeFormula, rollData);
    const attackerActor = this.actor;

    try {
      console.log(`SURGE | Evaluating roll...`);
      await roll.evaluate();
      const baseRollTotal = roll.total;
      console.log(`SURGE | Roll Evaluated. Base Total: ${baseRollTotal}`);

      // Send base roll to chat
      console.log(`SURGE | Sending base roll to chat...`);
      try {
        await roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: attackerActor }),
          flavor: label,
        });
      } catch (rollMsgErr) {
        console.error(`SURGE | Failed to send base roll message:`, rollMsgErr);
      }

      // Get Targets
      const targets = game.user.targets;
      console.log(`SURGE | Targets found: ${targets.size}`, targets);
      if (targets.size === 0) {
        return;
      }

      let chatDamageDetails = [];
      let chatConditionDetails = [];

      console.log(`SURGE | Starting target loop...`);
      for (const targetToken of targets) {
        const targetActor = targetToken.actor;
        if (!targetActor) {
          continue;
        }
        console.log(`SURGE | Processing target Actor: ${targetActor.name}`);

        let bonusDamage = 0;
        let damageMultiplier = 1;
        let damageNotes = [];

        // Check Bleeding
        const bleedingEffect = targetActor.effects.find(
          (e) =>
            e.changes.some((c) => c.key === 'flags.surge.bleeding') &&
            !e.disabled
        );
        if (bleedingEffect) {
          bonusDamage = Number(
            bleedingEffect.flags?.surge?.bleedingDamage ?? 1
          );
          if (bonusDamage <= 0) bonusDamage = 1;
          damageNotes.push(`${bonusDamage} Bleed`);
        }

        // Check Broken
        const isBroken = targetActor.flags?.surge?.broken === true;
        const isPhysical =
          (damageType || 'Physical').toLowerCase() === 'physical';
        if (isBroken && isPhysical) {
          damageMultiplier = 2;
          damageNotes.push(`x2 Broken`);
        }

        // Calculate and Apply Damage
        const finalDamage = Math.max(
          0,
          (baseRollTotal + bonusDamage) * damageMultiplier
        );
        console.log(
          `SURGE | Calculated final damage for ${targetActor.name}: ${finalDamage}`
        );
        const currentHp = targetActor.system.passives.hp.value;
        if (typeof currentHp === 'number') {
          const newHp = Math.max(0, currentHp - finalDamage);
          try {
            await targetActor.update({ 'system.passives.hp.value': newHp });
            console.log(`SURGE | Updated ${targetActor.name} HP to ${newHp}`);
            // Build chat detail string
            let detail = `${targetToken.name} takes ${finalDamage}`;
            if (damageNotes.length > 0) {
              detail += ` (${baseRollTotal} Base + ${damageNotes.join(', ')})`;
            }
            detail += ` damage.`;
            chatDamageDetails.push(detail);
          } catch (updateErr) {
            console.error(updateErr);
          }
        } else {
          console.error('Error processing HP change');
        }

        // --- Apply Conditions from Item ---
        const conditionIdsToApply = (sourceItemData?.appliesCondition || '')
          .split(',') // Split string by comma
          .map((id) => id.trim().toLowerCase()) // Trim whitespace, lowercase
          .filter((id) => id); // Remove empty strings

        if (conditionIdsToApply.length > 0) {
          console.log(
            `SURGE | Item "${sourceItemData.name}" attempting to apply conditions:`,
            conditionIdsToApply
          );
          let conditionsAppliedThisHit = []; // Track conditions applied by this specific hit

          for (const conditionId of conditionIdsToApply) {
            console.log(
              `SURGE | Checking condition: ${conditionId} for ${targetActor.name}`
            );
            // Look up effect data from CONFIG
            const effectBaseData = CONFIG.SURGE?.effectData?.[conditionId];
            if (!effectBaseData) {
              console.warn(
                `SURGE | No effect data found in CONFIG.SURGE.effectData for condition ID: ${conditionId}`
              );
              continue; // Skip if data not found
            }

            // Perform Stacking Check (customize per condition if needed)
            let shouldApply = true;
            // Example: Generic check for non-stacking poisons based on type flag
            if (conditionId.startsWith('poisoned-')) {
              const poisonType = conditionId.split('-')[1]; // Extract type (sickness, damage, etc.)
              const alreadyHasPoisonType = targetActor.effects.some((e) =>
                e.changes.some(
                  (c) =>
                    c.key === 'flags.surge.poisonType' && c.value === poisonType
                )
              );
              if (alreadyHasPoisonType) {
                console.log(
                  `SURGE | Target already has ${poisonType} poison. Skipping ${conditionId}.`
                );
                shouldApply = false;
              }
            }
            // Check for Bleeding flag
            else if (conditionId === 'bleeding') {
              const alreadyBleeding = targetActor.effects.some((e) =>
                e.changes.some((c) => c.key === 'flags.surge.bleeding')
              );
              if (alreadyBleeding) {
                console.log(`SURGE | Target already Bleeding. Skipping.`);
                shouldApply = false;
              }
            }

            // Check for Broken flag
            else if (conditionId === 'broken') {
              const alreadyBroken = targetActor.effects.some((e) =>
                e.changes.some((c) => c.key === 'flags.surge.broken')
              );
              if (alreadyBroken) {
                console.log(`SURGE | Target already Broken. Skipping.`);
                shouldApply = false;
              }
            }
            // Add more specific stacking checks here for other conditions if needed

            if (shouldApply) {
              try {
                // Clone data to avoid modifying constant; apply specific duration if needed (TBD)
                const dataToCreate = foundry.utils.deepClone(effectBaseData);
                // If effect needs dynamic duration/flags based on source item, modify dataToCreate here

                await ActiveEffect.create(dataToCreate, {
                  parent: targetActor,
                });
                conditionsAppliedThisHit.push(
                  effectBaseData.name || conditionId
                ); // Add name/ID to list
                console.log(
                  `SURGE | Applied ${conditionId} effect to ${targetActor.name}.`
                );
              } catch (applyErr) {
                console.error(
                  `SURGE | Failed to apply effect ${conditionId} to ${targetActor.name}:`,
                  applyErr
                );
              }
            }
          } // End loop through condition IDs

          if (conditionsAppliedThisHit.length > 0) {
            chatConditionDetails.push(
              `${targetToken.name} gains ${conditionsAppliedThisHit.join(
                ', '
              )}.`
            );
          }
        } // --- END Apply Conditions ---
      } // --- END TARGET LOOP ---
      console.log(`SURGE | Finished target loop.`);

      // --- Send summary messages ---
      if (chatDamageDetails.length > 0 || chatConditionDetails.length > 0) {
        let summaryContent = '';
        if (chatDamageDetails.length > 0) {
          summaryContent += `<strong>Damage Applied:</strong><br>${chatDamageDetails.join(
            '<br>'
          )}`;
        }
        if (chatConditionDetails.length > 0) {
          if (summaryContent) summaryContent += '<br>'; // Add separator if damage was also listed
          summaryContent += `<strong>Conditions Applied:</strong><br>${chatConditionDetails.join(
            '<br>'
          )}`;
        }
        try {
          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: attackerActor }),
            content: summaryContent,
          });
          console.log(`SURGE | Summary damage/condition message sent.`);
        } catch (summaryMsgErr) {
          console.error(
            `SURGE | Failed to send summary message:`,
            summaryMsgErr
          );
        }
      }
    } catch (err) {
      console.error(
        `SURGE | Damage roll/application failed for formula "${surgeFormula}":`,
        err
      );
      ui.notifications.error(
        `Failed to evaluate/apply damage roll for ${label}.`
      );
    }
    console.log(`SURGE | --- _performDamageRoll END ---`);
  }

  /**
   * Performs the contested roll for spellcasting using SURGE rules.
   * Caster: [Mystic Dice]d6x6 + [Mystic Mod] + [INT Level]
   * Defender: [Attr Dice]d6x6 + [Attr Mod] (+ [INT Level] if Mystic)
   * @param {Item} spell         The spell Item document being cast.
   * @param {Actor} targetActor  The target Actor document.
   * @returns {Promise<boolean>} True if the caster wins or ties the contest, false otherwise.
   * @private
   */
  async _performContestedSpellRoll(spell, targetActor) {
    console.log(
      `SURGE | Performing contested roll: ${this.actor.name} vs ${targetActor.name} for spell ${spell.name}`
    );
    const casterActor = this.actor;

    // --- Caster's Roll ---
    const casterMysticLevel = casterActor.system.skills.mystic?.value ?? 1;
    const casterIntLevel = casterActor.system.attributes.int?.value ?? 0;
    const casterRollData = this._rollTable[casterMysticLevel]; // Use sheet's _rollTable
    const casterDice = casterRollData?.dice ?? 1; // Get dice count
    const casterMysticMod = casterRollData?.mod ?? 0; // Get modifier
    let casterFormulaParts = [`${casterDice}d6x6`]; // Start with dice
    if (casterMysticMod !== 0)
      casterFormulaParts.push(casterMysticMod.toString()); // Add mod if non-zero
    if (casterIntLevel !== 0)
      casterFormulaParts.push(casterIntLevel.toString()); // Add INT level if non-zero
    const casterFormula = casterFormulaParts.join(' + '); // Join with plus signs

    console.log(
      `SURGE | Caster Roll Formula: ${casterFormula} (Mystic Lvl ${casterMysticLevel} -> ${casterDice}d6x6+${casterMysticMod}, INT Lvl ${casterIntLevel})`
    );
    const casterRoll = await new Roll(casterFormula).evaluate();
    console.log(`SURGE | Caster Rolled: ${casterRoll.total}`);

    // --- Defender's Roll ---
    const defenderAttrKey = spell.system.defenderAttribute?.value || 'mystic';
    let defenderFormula = '';
    let defenderFlavor = '';
    let defenderRollData = null;
    let defenderDice = 1; // Default dice
    let defenderBaseMod = 0; // Default mod
    let defenderIntLevel = 0; // Default INT bonus

    console.log(`SURGE | Defender using attribute key: ${defenderAttrKey}`);

    if (defenderAttrKey === 'mystic') {
      const defenderMysticLevel = targetActor.system.skills.mystic?.value ?? 1;
      defenderIntLevel = targetActor.system.attributes.int?.value ?? 0; // Get defender INT
      defenderRollData = this._rollTable[defenderMysticLevel];
      defenderDice = defenderRollData?.dice ?? 1;
      defenderBaseMod = defenderRollData?.mod ?? 0;
      defenderFlavor = `Mystic Lvl ${defenderMysticLevel} (Mod ${defenderBaseMod}) + INT Lvl ${defenderIntLevel}`;
    } else if (targetActor.system.attributes[defenderAttrKey]) {
      // Defending with a base attribute
      const defenderAttrLevel =
        targetActor.system.attributes[defenderAttrKey].value ?? 1;
      defenderRollData = this._rollTable[defenderAttrLevel];
      defenderDice = defenderRollData?.dice ?? 1;
      defenderBaseMod = defenderRollData?.mod ?? 0;
      // No INT bonus for non-Mystic defense unless specified otherwise
      defenderFlavor = `${defenderAttrKey.toUpperCase()} Lvl ${defenderAttrLevel} (Mod ${defenderBaseMod})`;
    } else {
      // Invalid defender attribute specified, default to basic 1d6x6? Or Mystic? Use Mystic default.
      console.warn(
        `SURGE | Invalid defenderAttribute "${defenderAttrKey}" on spell ${spell.name}. Defaulting to Mystic+INT.`
      );
      const defenderMysticLevel = targetActor.system.skills.mystic?.value ?? 1;
      defenderIntLevel = targetActor.system.attributes.int?.value ?? 0;
      defenderRollData = this._rollTable[defenderMysticLevel];
      defenderDice = defenderRollData?.dice ?? 1;
      defenderBaseMod = defenderRollData?.mod ?? 0;
      defenderFlavor = `(Defaulted) Mystic Lvl ${defenderMysticLevel} (Mod ${defenderBaseMod}) + INT Lvl ${defenderIntLevel}`;
    }

    // Construct defender formula carefully
    let defenderFormulaParts = [`${defenderDice}d6x6`];
    if (defenderBaseMod !== 0)
      defenderFormulaParts.push(defenderBaseMod.toString());
    // Add INT bonus only if defending with Mystic (or if defaulted to Mystic)
    if (
      (defenderAttrKey === 'mystic' ||
        !targetActor.system.attributes[defenderAttrKey]) &&
      defenderIntLevel !== 0
    ) {
      defenderFormulaParts.push(defenderIntLevel.toString());
    }
    defenderFormula = defenderFormulaParts.join(' + ');

    console.log(`SURGE | Defender Roll Formula: ${defenderFormula}`);
    const defenderRoll = await new Roll(defenderFormula).evaluate();
    console.log(`SURGE | Defender Rolled: ${defenderRoll.total}`);

    // --- Compare Rolls & Determine Success ---
    const success = casterRoll.total >= defenderRoll.total; // Caster wins on tie
    console.log(
      `SURGE | Contest Result: ${casterRoll.total} vs ${defenderRoll.total}. Caster Success: ${success}`
    );

    // --- Post Contested Roll to Chat ---
    let chatContent = `
    <div class="dice-roll">
        <div class="dice-formula">Spell Contest: ${spell.name}</div>
        <div class="dice-tooltip" style="display: block;">
            <div>Caster (${
              casterActor.name
            }): ${casterFormula} -> <strong>Rolled ${
      casterRoll.total
    }</strong></div>
            <div>Defender (${
              targetActor.name
            }): ${defenderFormula} (${defenderFlavor}) -> <strong>Rolled ${
      defenderRoll.total
    }</strong></div>
        </div>
        <h4 class="dice-total" style="margin-top: 5px;">${
          success
            ? `${casterActor.name} Succeeds!`
            : `${targetActor.name} Defends!`
        }</h4>
    </div>`;

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: casterActor }),
      content: chatContent,
    });

    return success;
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
      `SURGE DEBUG | _getEquippedPenalties Input: attr=${attributeKey}', skill='${skillKey}'`
    );
    console.log(
      `SURGE DEBUG | _getEquippedPenalties Calculated: attrPenalty=${totalAttrPenalty}, skillPenalty=${totalSkillPenalty}`
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

  /**
   * Handle specific actions related to active conditions (Stand Up, Break Free, etc.)
   * @param {Event} event The triggering click event.
   * @private
   */
  async _onConditionAction(event) {
    event.preventDefault();
    const actionId = event.currentTarget.dataset.action;
    const actor = this.actor;

    console.log(`SURGE | Processing Condition Action: ${actionId}`);

    // --- Stand Up ---
    if (actionId === 'stand-up') {
      const proneEffect = actor.effects.find(
        (e) =>
          e.changes.some((c) => c.key === 'flags.surge.prone') && !e.disabled
      );
      if (proneEffect) {
        await proneEffect.delete();
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          content: `<strong>${actor.name}</strong> spends 1 Action to stand up, removing the <strong>Prone</strong> condition.`,
        });
      } else {
        ui.notifications.warn('Could not find the Prone effect to remove.');
      }
    }

    // --- Patch Up (Bleeding) ---
    else if (actionId === 'patch-up-bleeding') {
      const effect = actor.effects.find(
        (e) =>
          e.changes.some((c) => c.key === 'flags.surge.bleeding') && !e.disabled
      );
      if (effect) {
        await effect.delete();
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          content: `<strong>${actor.name}</strong> spends 1 Action to patch their wounds, removing the <strong>Bleeding</strong> condition.<br><em>(GM: Ensure a Bandage was used if required.)</em>`,
        });
      } else {
        ui.notifications.warn('Could not find the Bleeding effect to remove.');
      }
    }

    // --- Patch Up (Broken) ---
    else if (actionId === 'patch-up-broken') {
      const effect = actor.effects.find(
        (e) =>
          e.changes.some((c) => c.key === 'flags.surge.broken') && !e.disabled
      );
      if (effect) {
        await effect.delete();
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          content: `<strong>${actor.name}</strong> spends 1 Action to fix their broken gear/bone, removing the <strong>Broken</strong> condition.<br><em>(GM: Ensure a Brace/Tool was used if required.)</em>`,
        });
      } else {
        ui.notifications.warn('Could not find the Broken effect to remove.');
      }
    }

    // Future actions (Break Free) will go here as else/if blocks
  }

  /**
   * Toggles the "Edit Mode" flag on the actor.
   * @private
   */
  async _onToggleEditMode(event) {
    event.preventDefault();
    const currentMode = this.actor.flags?.surge?.editMode || false;
    await this.actor.update({ 'flags.surge.editMode': !currentMode });
  }

  /**
   * Resets Attributes and Skills to base levels and refunds BP.
   * @private
   */
  async _onResetStats(event) {
    event.preventDefault();

    const confirm = await Dialog.confirm({
      title: 'Reset Stats & Refund BP',
      content:
        '<p>Are you sure? This will reset all Attributes and Skills to Level 1 (plus species bonuses) and refund the Buy Points to your pool.</p>',
      defaultYes: false,
    });
    if (!confirm) return;

    const actor = this.actor;
    const updates = {};
    let bpRefund = 0;

    // 1. Reset Attributes
    // We need to know the species bonus to reset correctly
    const speciesItem = actor.items.find((i) => i.type === 'species');
    const speciesBonusAttr = speciesItem?.system?.attributeBonus?.attribute;
    const speciesBonusValue = speciesItem?.system?.attributeBonus?.value || 0;

    for (const [key, attr] of Object.entries(actor.system.attributes)) {
      let baseValue = 1;
      if (key === speciesBonusAttr) baseValue += speciesBonusValue;

      if (attr.value > baseValue) {
        const diff = attr.value - baseValue;
        bpRefund += diff * 4; // Flat cost 4 per level
        updates[`system.attributes.${key}.value`] = baseValue;
      }
    }

    // 2. Reset Skills
    for (const [key, skill] of Object.entries(actor.system.skills)) {
      const baseValue = 1;
      if (skill.value > baseValue) {
        const diff = skill.value - baseValue;
        bpRefund += diff * 3; // Flat cost 3 per level
        updates[`system.skills.${key}.value`] = baseValue;
      }
    }

    // 3. Update BP
    const currentBp = actor.system.buyPoints.value || 0;
    updates['system.buyPoints.value'] = currentBp + bpRefund;

    await actor.update(updates);
    ui.notifications.info(`Stats reset. Refunded ${bpRefund} BP.`);
  }

  /**
   * Generic handler to swap the chosen trait for any species.
   * Replaces _onChangeDjinnTrait.
   * @private
   */
  async _onChangeSpeciesTrait(event) {
    event.preventDefault();
    const actor = this.actor;

    const speciesItem = actor.items.find((i) => i.type === 'species');
    if (!speciesItem || !speciesItem.system.traitOptions) return;

    const traitOptions = speciesItem.system.traitOptions;

    // 1. Remove current trait(s) belonging to this species options
    const traitOptionNames = traitOptions.map((t) => t.name);
    const currentTraits = actor.items.filter(
      (i) => i.type === 'trait' && traitOptionNames.includes(i.name)
    );
    if (currentTraits.length > 0) {
      const idsToDelete = currentTraits.map((t) => t.id);
      await actor.deleteEmbeddedDocuments('Item', idsToDelete);
    }

    // 2. Prompt for new trait
    const traitPack = game.packs.get('surge.surge-traits');
    if (!traitPack)
      return ui.notifications.error(
        "Could not find 'SURGE! Traits' compendium."
      );
    await traitPack.getIndex();

    let traitChoices = {};
    for (const option of traitOptions) {
      const entry = traitPack.index.find((e) => e.name === option.name);
      if (entry) traitChoices[entry._id] = option.name;
    }

    const chosenId = await new Promise((resolve) => {
      new Dialog({
        title: `Change ${speciesItem.name} Trait`,
        content: `<div class="form-group"><label>Choose Trait:</label> <select name="choice">${Object.entries(
          traitChoices
        )
          .map(([id, name]) => `<option value="${id}">${name}</option>`)
          .join('')}</select></div>`,
        buttons: {
          ok: {
            label: 'Select',
            callback: (html) => resolve(html.find('select').val()),
          },
        },
        default: 'ok',
        close: () => resolve(null),
      }).render(true);
    });

    if (chosenId) {
      const traitDoc = await traitPack.getDocument(chosenId);
      await actor.createEmbeddedDocuments('Item', [traitDoc.toObject()]);
      ui.notifications.info(`Trait changed to: ${traitDoc.name}`);
    }
  }

  // Define other event handler methods like _onItemAttack, etc.
  // Remember to use async for functions that perform rolls or update the actor.
} // End of SurgeCharacterSheet class

/**
 * Handle Actor updates AFTER they occur.
 * - Removes Stunned if HP decreased.
 * - Manages "Death Saves (Conscious/Unconscious)" states based on HP changes.
 * @param {Actor} actorDocument The Actor document THAT WAS updated.
 * @param {object} change Object containing the changes made in this update.
 * @param {object} options Additional options which trigger this update.
 * @param {string} userId The ID of the User triggering the update.
 */
async function handleActorUpdate(actorDocument, change, options, userId) {
  if (!game.user.isGM) return;

  const actorName = actorDocument.name;
  console.log(
    `SURGE DEBUG (handleActorUpdate) | Hook Fired for actor: ${actorName}. Change keys:`,
    Object.keys(change ?? {})
  );

  const currentHpAfterUpdate = actorDocument.system.passives.hp.value;
  const hpWasChangedInThisUpdate =
    change?.system?.passives?.hp?.value !== undefined;

  // --- Handle Stunned Removal ---
  const isStunnedFlagPresent = actorDocument.flags?.surge?.stunned === true;
  const stunnedEffectFromActor = isStunnedFlagPresent
    ? actorDocument.effects.find(
        (e) =>
          e.changes.some((c) => c.key === 'flags.surge.stunned') && !e.disabled
      )
    : null;

  if (stunnedEffectFromActor && hpWasChangedInThisUpdate) {
    const lastHpForStun = stunnedEffectFromActor.flags?.surge?.stunnedLastHp;
    const newHpToCompareForStun = currentHpAfterUpdate; // Use the already updated HP

    if (
      typeof lastHpForStun === 'number' &&
      typeof newHpToCompareForStun === 'number' &&
      newHpToCompareForStun < lastHpForStun
    ) {
      console.log(
        `SURGE | ${actorName} took damage while Stunned (HP ${lastHpForStun} -> ${newHpToCompareForStun}). Removing Stunned effect.`
      );
      try {
        await stunnedEffectFromActor.delete();
        ui.notifications.info(`${actorName} is no longer Stunned.`);
      } catch (err) {
        console.error(`SURGE | Failed to delete Stunned:`, err);
      }
    } else if (
      typeof newHpToCompareForStun === 'number' &&
      newHpToCompareForStun !== lastHpForStun
    ) {
      try {
        await stunnedEffectFromActor.update({
          'flags.surge.stunnedLastHp': newHpToCompareForStun,
        });
      } catch (err) {
        console.error(`SURGE | Failed to update Stunned last HP:`, err);
      }
    }
  }
  // --- End Stunned Removal ---

  // --- Handle Death Save State Transitions ---
  // Find if there's an *existing* death save effect on the actor (Conscious or Unconscious)
  const defeatedStatusId = CONFIG.Combat.defeatedStatusId ?? 'dead';
  let isCurrentlyMarkedDead = actorDocument.statuses.has(defeatedStatusId); // Actor has the 'dead' icon

  const existingDeathSaveEffect = actorDocument.effects.find(
    (e) => e.flags?.surge?.deathSavesStage && !e.disabled
  );
  const currentActorDeathSaveStage =
    existingDeathSaveEffect?.flags.surge.deathSavesStage;

  console.log(
    `SURGE DEBUG (handleActorUpdate) | ${actorName} - HP: ${currentHpAfterUpdate}, IsMarkedDead: ${isCurrentlyMarkedDead}, CurrentDeathSaveStage: ${currentActorDeathSaveStage}, HP changed this update: ${hpWasChangedInThisUpdate}`
  );

  // SCENARIO 0: Actor was "Dead" but HP is now > 0 (Revival)
  if (
    isCurrentlyMarkedDead &&
    hpWasChangedInThisUpdate &&
    currentHpAfterUpdate > 0
  ) {
    console.log(
      `SURGE | ${actorName} was Dead but now has ${currentHpAfterUpdate} HP. Reviving.`
    );
    try {
      await actorDocument.toggleStatusEffect(defeatedStatusId, {
        active: false,
        overlay: true,
      });
      console.log(
        `SURGE | Toggled '${defeatedStatusId}' status OFF for ${actorName}.`
      );
      isCurrentlyMarkedDead = false; // Update our local check

      // Clean up any lingering death save effects/flags
      for (const effect of actorDocument.effects) {
        if (
          effect.flags?.surge?.deathSavesStage ||
          effect.name === 'Dying (Conscious)' ||
          effect.name === 'Dying (Unconscious)'
        ) {
          await effect.delete();
        }
      }
      const flagsToUnset = {
        'flags.surge.-=deathSavesStage': null,
        'flags.surge.-=deathSaveDRLevel': null,
        'flags.surge.-=isTrulyUnconscious': null,
      };
      await actorDocument.update(flagsToUnset);
      console.log(`SURGE | Cleared death save flags for revived ${actorName}.`);

      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: actorDocument }),
        content: `${actorName} has been revived from death!`,
      });
    } catch (err) {
      console.error(`SURGE | Failed to process revival for ${actorName}:`, err);
    }
  }
  if (!isCurrentlyMarkedDead) {
    // SCENARIO 1: HP is now 0 or below, AND the actor is NOT currently in any death save stage.
    if (
      hpWasChangedInThisUpdate &&
      currentHpAfterUpdate <= 0 &&
      !currentActorDeathSaveStage
    ) {
      console.log(
        `SURGE | ${actorName} HP at ${currentHpAfterUpdate}. Applying "Death Saves (Conscious)".`
      );
      try {
        // Ensure no old death save effects are lingering if we are applying a new one
        for (const effect of actorDocument.effects) {
          if (effect.flags?.surge?.deathSavesStage) await effect.delete();
        }
        const flagsToUnsetIfPresent = {
          'flags.surge.-=deathSavesStage': null,
          'flags.surge.-=deathSaveDRLevel': null,
          'flags.surge.-=isTrulyUnconscious': null,
        };
        await actorDocument.update(flagsToUnsetIfPresent); // Clear just in case

        const effectData =
          CONFIG.SURGE?.effectData?.['death-saves-conscious'] ??
          deathSavesConsciousEffectData;
        await ActiveEffect.create(effectData, { parent: actorDocument });

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor: actorDocument }),
          content: `${actorName} has fallen to 0 HP and is in Conscious Death Saving Throws!`,
        });
      } catch (err) {
        console.error(
          `SURGE | Failed to apply "Death Saves (Conscious)" to ${actorName}:`,
          err
        );
      }

      // SCENARIO 2: Actor *was* in a death save stage (indicated by existingDeathSaveEffect), and HP is now above 0 (healed).
    } else if (
      existingDeathSaveEffect &&
      hpWasChangedInThisUpdate &&
      currentHpAfterUpdate > 0
    ) {
      console.log(
        `SURGE | ${actorName} was dying (Stage: ${currentActorDeathSaveStage}), now has ${currentHpAfterUpdate} HP. Removing death save state.`
      );
      try {
        await existingDeathSaveEffect.delete();
        const flagsToUnset = {
          'flags.surge.-=deathSavesStage': null,
          'flags.surge.-=deathSaveDRLevel': null,
          'flags.surge.-=isTrulyUnconscious': null,
        };
        await actorDocument.update(flagsToUnset);

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor: actorDocument }),
          content: `${actorName} has been stabilized and is no longer dying!`,
        });
      } catch (err) {
        console.error(
          `SURGE | Failed to remove death save effects for ${actorName}:`,
          err
        );
      }
    }
  }
  // --- END Death Save State Transitions ---

  console.log(
    `SURGE DEBUG (handleActorUpdate) | --- Hook Finished for ${actorName} ---`
  );
}

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

  // --- Handle Poisoned (Damage) Condition Damage ---
  // Check if the actor has this specific poison type flag
  const hasDamagePoison = actor.flags?.surge?.poisonType === 'damage';
  // Find the effect to ensure it's not disabled
  const damagePoisonEffect = hasDamagePoison
    ? actor.effects.find(
        (e) =>
          e.changes.some(
            (c) => c.key === 'flags.surge.poisonType' && c.value === 'damage'
          ) && !e.disabled
      )
    : null;
  if (damagePoisonEffect) {
    console.log(
      `SURGE | Applying 1d6 Poison (Damage) damage to ${actor.name}.`
    );
    try {
      const damageRoll = await new Roll('1d6').evaluate();
      damageRoll.toMessage({
        speaker: ChatMessage.getSpeaker({ alias: 'Poison (Damage)' }),
        flavor: `Damage taken by ${actor.name}`,
      });

      const damageTaken = damageRoll.total;
      console.log(`SURGE | Applying ${damageTaken} poison damage.`);

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
        `SURGE | Failed during Poison (Damage) for ${actor.name}:`,
        err
      );
      ui.notifications.error(`Error applying poison damage for ${actor.name}.`);
    }
  } // --- End Poisoned (Damage) Handling ---

  // --- Handle Poisoned (Deadly) Timer ---
  // Check if actor has the flag from an *enabled* effect
  const hasDeadlyPoisonFlag = actor.flags?.surge?.poisonType === 'deadly';
  const deadlyPoisonEffect = hasDeadlyPoisonFlag
    ? actor.effects.find(
        (e) =>
          e.changes.some(
            (c) => c.key === 'flags.surge.poisonType' && c.value === 'deadly'
          ) && !e.disabled
      )
    : null;
  if (deadlyPoisonEffect) {
    let turnCount = Number(
      deadlyPoisonEffect.flags?.surge?.poisonDeadlyTurns ?? 0
    );
    turnCount++; // Increment for the current turn
    console.log(
      `SURGE | Deadly Poison turn count for ${actor.name} is now: ${turnCount}`
    );

    try {
      if (turnCount >= 6) {
        // --- UPDATED Consequence: HP 0 + Incapacitated ---
        console.log(
          `SURGE | Deadly Poison timer reached 6 turns for ${actor.name}. Applying consequence.`
        );
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ alias: 'Deadly Poison' }),
          content: `${actor.name} succumbs to the Deadly Poison and falls Incapacitated!`,
        });

        // 1. Set HP to 0
        await actor.update({ 'system.passives.hp.value': 0 });
        console.log(`SURGE | Set ${actor.name} HP to 0.`);

        // 2. Apply Incapacitated (which should also apply Prone via its macro logic - replicate here)
        // Need Incapacitated and Prone effect data accessible or defined here
        const incapacitatedData = {
          /* ... Copy incapacitatedEffectData definition ... */ name: 'Incapacitated',
          img: 'systems/surge/assets/icons/conditions/incapacitated.svg',
          duration: { seconds: null },
          disabled: false,
          changes: [
            {
              key: 'system.passives.movement.value',
              mode: 5,
              value: '0',
              priority: 50,
            },
            {
              key: 'flags.surge.incapacitated',
              mode: 5,
              value: 'true',
              priority: 60,
            },
          ],
          description: '...',
          flags: { surge: {} },
        };
        const proneData = {
          /* ... Copy proneEffectData definition ... */ name: 'Prone',
          img: 'systems/surge/assets/icons/conditions/prone.svg',
          duration: { seconds: null },
          disabled: false,
          changes: [
            { key: 'flags.surge.prone', mode: 5, value: 'true', priority: 10 },
            {
              key: 'flags.surge.proneUnableToDefend',
              mode: 5,
              value: 'true',
              priority: 10,
            },
          ],
          description: '...',
          flags: { surge: {} },
        };

        // Apply Incapacitated
        await ActiveEffect.create(incapacitatedData, { parent: actor });
        console.log(`SURGE | Applied Incapacitated effect.`);

        // Apply Prone (if not already prone)
        const isAlreadyProne = actor.effects.some(
          (e) =>
            e.changes.some((c) => c.key === 'flags.surge.prone') && !e.disabled
        );
        if (!isAlreadyProne) {
          await ActiveEffect.create(proneData, { parent: actor });
          console.log(`SURGE | Applied Prone effect.`);
        }

        // 3. Remove the Deadly Poison effect itself
        await deadlyPoisonEffect.delete();
        console.log(`SURGE | Removed Deadly Poison effect.`);
        // --- End Updated Consequence ---
      } else {
        // --- Update Counter and Warn ---
        console.log(
          `SURGE | Updating deadly poison turn count to ${turnCount}.`
        );
        // Update the flag on the effect
        await deadlyPoisonEffect.update({
          'flags.surge.poisonDeadlyTurns': turnCount,
        });
        console.log(`SURGE | Effect flag updated.`);

        // Send warning message to chat (NO WHISPER)
        const turnsLeft = 5 - turnCount; // Turns remaining *after* this one
        let warningMsg = `${actor.name} - Deadly Poison: Turn ${turnCount}/5.`;
        if (turnsLeft <= 0) {
          warningMsg += ` Falls Incapacitated next turn if not cured!`;
        } else {
          warningMsg += ` ${turnsLeft} turn${
            turnsLeft > 1 ? 's' : ''
          } remaining!`;
        }
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ alias: 'Deadly Poison' }),
          content: warningMsg,
          // whisper: ChatMessage.getWhisperRecipients("GM") // <<< REMOVED WHISPER
        });
        console.log(`SURGE | Posted warning message to chat.`);
      }
    } catch (err) {
      console.error(
        `SURGE | Failed during Deadly Poison processing for ${actor.name}:`,
        err
      );
      ui.notifications.error(
        `Error processing Deadly Poison for ${actor.name}.`
      );
    }
  } // --- End Poisoned (Deadly) Handling ---

  // --- Handle Bleeding Damage Escalation ---
  // Find the enabled Bleeding effect by checking the flag set in its 'changes'
  const bleedingEffect = actor.effects.find(
    (e) =>
      e.changes.some((c) => c.key === 'flags.surge.bleeding') && !e.disabled
  );

  console.log(
    `SURGE | Checking Bleeding status for ${actor.name}: ${!!bleedingEffect}`
  );

  if (bleedingEffect) {
    // Get the damage bonus that applied *during the turn that just ended*
    let currentBonus = Number(bleedingEffect.flags?.surge?.bleedingDamage ?? 1);
    if (currentBonus <= 0) currentBonus = 1; // Should start at 1

    // Calculate the bonus for the *next* turn
    const nextBonus = currentBonus * 2;
    await bleedingEffect.update({ 'flags.surge.bleedingDamage': nextBonus });
    console.log(
      `SURGE | Updated bleedingDamage flag to ${nextBonus} on effect ${bleedingEffect.id}`
    );

    console.log(
      `SURGE | Bleeding bonus for ${actor.name} is escalating from +${currentBonus} to +${nextBonus}.`
    );

    try {
      // Update the flag on the effect for the next turn
      await bleedingEffect.update({ 'flags.surge.bleedingDamage': nextBonus });
      console.log(
        `SURGE | Updated bleedingDamage flag to ${nextBonus} on effect ${bleedingEffect.id}`
      );

      // Post chat message announcing the NEW bonus for upcoming hits
      const chatMessageContent = `The bleeding on ${actor.name} worsens! Subsequent hits now deal +${nextBonus} damage.`;
      console.log(
        `SURGE | Attempting to create chat message with content: "${chatMessageContent}"`
      );
      try {
        await ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ alias: 'Bleeding' }),
          content: chatMessageContent,
        });
        console.log(
          `SURGE | Bleeding escalation chat message creation attempted.`
        );
      } catch (chatErr) {
        console.error(
          `SURGE | Failed to create Bleeding escalation chat message:`,
          chatErr
        );
      }
    } catch (err) {
      console.error(
        `SURGE | Failed during Bleeding escalation update for ${actor.name}:`,
        err
      );
      ui.notifications.error(
        `Error processing bleeding effect escalation for ${actor.name}.`
      );
    }
  } // --- End Bleeding Handling ---
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
  // console.log(
  //   'SURGE! | Registered combat turn handler for Confused condition.'
  // );

  Hooks.on('preUpdateToken', handlePreUpdateToken); // Add listener for preUpdate
  // console.log('SURGE! | Registered token pre-update handler for Chilled.');

  // Register token update handler (for Chilled damage on move)
  Hooks.on('updateToken', handleTokenUpdate);
  // console.log('SURGE! | Registered token update handler for Chilled.');

  Hooks.on('updateActor', handleActorUpdate);
  // console.log('SURGE! | Registered actor update handler for Stunned removal.');
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

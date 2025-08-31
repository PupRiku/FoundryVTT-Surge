# Changelog

## [0.10.1] - 2025-08-31

### ✨ Features

- Implemented the unique daily trait-swapping mechanic for the **Djinn** species.
- Added a "Change Trait" button to the Actor Sheet header that is only visible for Djinn characters.
- The button's logic removes the current Djinn trait, prompts the user to select a new one from the species' defined options, and adds the new trait item to the sheet, automatically updating any associated skill bonuses.

### 🔧 Maintenance

- Added `isDjinn` check to `ActorSheet.getData` to control UI visibility for the "Change Trait" button.
- Created the `_onChangeDjinnTrait` handler in `SurgeCharacterSheet` to manage the trait swapping logic.

## [0.10.0] - 2025-08-31

### ✨ Features

- Implemented the core of the **Character Creation (Manual Selection)** workflow.
- Added automated logic for dropping a `Species` item onto a new Actor Sheet (`_onDropItem handler`). The drop handler now automatically:
  - Applies the species' attribute bonus.
  - Sets base passives (Movement, Recovery, Menace).
  - Calculates and rolls starting HP (`Strength Roll + Species Base HP`) and updates the sheet.
  - Prompts the user to select a "Chosen Trait" from a list defined on the species item.
  - Adds the chosen `Trait` item and the `Species` item to the character's sheet.
- Implemented a system for `Trait` items to grant skill bonuses, which are now automatically calculated and applied to skill totals and rolls.
- Added a dynamic status label to the Actor Sheet header (e.g., "Unknown Species", "Ponturi (The Manta Ray)") that updates after character creation.
- Added a "?” placeholder for passive stats (HP, Recovery, etc.) on a blank character sheet, which updates to numerical values after a species is applied.
- Added UI to the Item Sheet for `species` and `trait` item types, including dropdowns for attributes/skills.

### 🐛 Bug Fixes

- Fixed `traitItems is not defined` error in `ActorSheet.getData` by correcting the function's code.
- Resolved rendering issues on the Item Sheet for new types (`spell`, `trait`, `species`), including a bug where fields were not appearing due to the types being missing from the `Items.registerSheet` registration list.
- Fixed a bug where a faulty `template.json` definition for `spell` items caused the Description field to initialize as an object instead of a string.

### 🔧 Maintenance

- Created Compendium packs for "SURGE! Species" and "SURGE! Traits" and added initial data (Ponturi species and its traits).
- Updated `ActorSheet.getData` to calculate and display derived skill totals (base + trait bonuses) and species/trait info.
- Updated `_onSkillRoll` to use the total derived skill level for rolls.
- Added `attributes` and `skills` lists to `CONFIG.SURGE` for populating dropdown menus on Item Sheets.
- Updated `item-sheet.hbs` with conditional logic (`#unless` or `#if`/`ne`) to hide common fields for `trait` and `species` types for a cleaner UI.

## [0.9.0] - 2025-05-09

### ✨ Features

- Implemented Death Saving Throw system:
  - Automatic transition to "Dying (Conscious)" state when HP drops to 0 (via `updateActor` hook), applying "Dying (Conscious)" Active Effect (sets movement to 0, stores DR level).
  - Added HP-based status label ("Healthy", "Bloodied", "Dying - Conscious", "Dying - Unconscious", "Dead") to Actor Sheet header.
  - Added "Make Death Save" button to Actor Sheet header, enabled when actor is in a death save state.
  - Implemented Death Save logic (`_onMakeDeathSave`): Prompts for STR/Survival, rolls against escalating DR (Easy DR starts at 5, increases; DR resets on stage transition from Conscious to Unconscious), handles success/failure for both Conscious and Unconscious stages.
  - Failure in Unconscious stage results in applying the core "Dead" status (skull icon).
  - Healing an actor with >0 HP who was "Dead" or in a death save state now correctly removes these states and updates the UI label/button.

### 🐛 Bug Fixes

- Resolved `ReferenceError: currentActorDeathSaveStageReadFromActorFlags is not defined` in `handleActorUpdate` hook.
- Corrected logic in `ActorSheet.getData` for `hpStatusLabel` to reliably detect and display "Dead" and "Dying - Conscious/Unconscious" states by checking effect flags.
- Fixed issue where "Dead" status was not applied correctly due to missing "dead" ID in custom `CONFIG.statusEffects`.
- Fixed issue where "Dead" status was not removed upon revival (HP > 0).

### 🔧 Maintenance

- Created "Dying (Conscious)" and "Dying (Unconscious)" Active Effect data definitions, storing stage and DR level directly on effect flags.
- Added Difficulty Rating (DR) level-to-value mapping to `CONFIG.SURGE` for Death Saves.
- Updated `handleActorUpdate` hook to manage entry into, transition between, and exit from death save states based on HP changes.
- Added "dead" status definition to `SURGE_STATUS_EFFECTS` to integrate with Foundry's core defeated status display.

## [0.8.0] - 2025-05-05

### ✨ Features

- Implemented basic Spellcasting framework:
  - Added "spell" Item type with detailed data model in `template.json` (School, Casting Time, Range, Target, Duration, Focus, Defender Attribute, Damage, Healing, Applies Condition, etc.).
  - Updated Item Sheet (`item-sheet.hbs`) to display and allow editing of all defined spell data fields, including dropdowns for School and Defender Attribute.
  - Added "Spellbook" tab to Actor Sheet (`actor-sheet.hbs`) to list spell items separately from inventory.
  - Added "Cast" button (<i class="fas fa-magic"></i>) to spell items listed in the Spellbook tab.
  - Implemented spellcasting activation logic (`_onItemCast` in `SurgeCharacterSheet`):
    - Checks for Mute condition.
    - Handles basic targeting (`game.user.targets` or self).
    - Initiates contested roll against targets.
    - Applies effects (Damage, Healing, Conditions) via new `_applySpellEffects` helper method upon successful contest.
  - Implemented contested spellcasting roll (`_performContestedSpellRoll` helper) using SURGE! rules (`Xd6x6+Mod+IntLevel` vs. Defender), posting results to chat.

### 🐛 Bug Fixes

- Resolved Item Sheet rendering errors for newly created spell items by correcting `template.json` structure/inheritance issues and Handlebars variable access (`systemData.*` vs direct properties).
- Fixed chat message formatting issue (vertical text) for spell contest results (`.dice-total` CSS).
- Fixed `Roll#evaluate` deprecation error within spell damage application.
- Fixed condition data lookup (`CONFIG.SURGE.effectData`) failure during spell effect application.

### 🔧 Maintenance

- Made Active Effect data constants globally accessible via `CONFIG.SURGE.effectData` registry in `init` hook.
- Refactored actor sheet event listeners (`activateListeners`) to target controls within specific tabs (Inventory vs. Spellbook).
- Added default damage type "Physical" to `_performDamageRoll` signature.

## [0.7.1] - 2025-05-05

### ✨ Features

- Implemented functionality for Weapon items to automatically apply specified conditions (single or multiple, comma-separated) to targeted actors upon dealing damage. Logic added to `_performDamageRoll`.

### 🔧 Maintenance

- Made Active Effect data constants (`bleedingEffectData`, etc.) accessible via `CONFIG.SURGE.effectData` for use in automation hooks/functions.
- Updated `_onItemDamageRoll` to pass necessary source item data (including `appliesCondition` string) to `_performDamageRoll`.
- Added prerequisite check (Restrained/Prone) to "Apply Pinned" macro.
- Added interaction checks/logic to relevant condition application macros (e.g., Wet removes Flammable, Confused removes Frightened, Insulated/Wet block Burning/Chilled).

## [0.7.01] - 2025-05-05

### ✨ Features

- Added Status Effect icons for all defined SURGE! conditions, registered programmatically and replacing Foundry defaults.
- Added "Effects" tab to the Character Sheet to display and manage Active Effects.
- Implemented "Blinded" condition (die reduction / auto-fail via `_performRoll`).
- Implemented "Confused" condition (Frightened immunity, INT/CHA roll penalty, start-of-turn d6 behavior via hook).
- Implemented "Crushed" condition (Move=0, attack prevention, damage/round via hook from weight).
- Implemented "Burning" condition (escalating d6 damage/turn via hook).
- Implemented "Deafened" condition (Magic Defense penalty; perception GM adjudicated).
- Implemented "Flame Resistant" condition (Prevents Burning application; immunities GM adjudicated).
- Implemented "Flammable" condition (Doubles Burning damage; other sources GM adjudicated).
- Implemented "Frightened" condition (Flag set, source stored via macro; restriction GM adjudicated).
- Implemented "Chilled" condition (Damage per foot moved via hook, duration reset via macro).
- Implemented "Frozen" condition (Flag set, Move=0, start-of-turn damage via hook w/ GM disable override; other effects GM adjudicated).
- Implemented "Insulated" condition (Flag set, prevents Chilled, removes Frozen via hook; immunities GM adjudicated).
- Implemented "Invisible" condition (Flag set, +6 Guile bonus via `_onSkillRoll`; perception/visibility GM adjudicated).
- Implemented "Mute" condition (Flag set; spellcasting prevention deferred, speech GM adjudicated).
- Implemented "Paralyzed" condition (Flags set for paralyzed/helpless, Move=0; restriction/defense GM adjudicated).
- Implemented "Restrained" condition (Flag set, Move=0, auto-fails DEX attribute checks).
- Implemented "Prone" condition (Flags set for prone/defenseless, auto-fails DEX attribute checks).
- Implemented "Pinned" condition (Requires Restrained/Prone, flag set, Move=0, prevents physical attacks, auto-fails DEX attribute checks).
- Implemented "Incapacitated" condition (Applies Prone, Move=0, Auto-fails checks; action restriction GM adjudicated).
- Implemented "Poisoned" subtypes:
  - Sickness (Applies random secondary condition & duration).
  - Debilitating (Applies random Blinded/Deafened & duration).
  - Damage (Applies 1d6 damage/turn in combat via hook; hourly GM adjudicated).
  - Deadly (5-turn combat timer via hook leads to HP 0 + Incapacitated).
- Implemented "Bleeding" condition (Escalating bonus damage applied to hits via `_performDamageRoll` modification; bonus value updated via hook).
- Implemented "Broken" condition (Flag set, doubles incoming Physical damage via `_performDamageRoll` modification).
- Added Compendium pack containing macros for applying conditions

### 🐛 Bug Fixes

- Resolved Foundry VTT deprecation warnings and API usage issues (V11/V12).
- Fixed Active Effect controls on Effects tab via custom handlers.
- Fixed coordinate reading issues in `updateToken` hook.
- Resolved various `ReferenceError` and `Assignment to constant variable` errors.
- Fixed effect toggle initial state display and visual disappearance bug (using `actor.effects` loop).
- Corrected DEX auto-fail logic for relevant conditions in `_onAttributeRoll`.
- Corrected various condition interaction logic (e.g., Confused removes Frightened, Wet removes Flammable, Insulated removes Frozen, Wet/Flame Resistant prevent Burning).
- Fixed poison stacking check logic.
- Fixed Stunned removal trigger (using `updateActor` hook).
- Corrected chat message formatting issues for condition effects/macros.

### 🔧 Maintenance

- Refactored Status Effect registration to `surge.js` `init` hook.
- Updated/created macros for applying conditions, using Foundry `Dialog` and including necessary checks.
- Consolidated DEX attribute auto-fail logic.
- Significantly updated `handleCombatTurnStart`, `handleTokenUpdate`, `handleActorUpdate`, `_performDamageRoll`, `_onSkillRoll`, `_onAttributeRoll` functions for condition mechanics.
- Added workarounds/notes for GM adjudication and potential core Foundry bugs.
- Added debug logging (recommend removing before final release).

## [0.5.1] - 2025-04-14

### 🐛 Bug Fixes

- Fixed Description field (`{{editor}}` helper) not rendering correctly on Item Sheet by adjusting wrapper HTML.
- Replaced deprecated `{{select}}` Handlebars helper with `{{selectOptions}}` for dropdowns (Weapon Type, Skill Used) on Item Sheet, resolving console warnings.

### 🔧 Maintenance

- Added data preparation for select options (`weaponTypes`, `weaponSkills`) in `SurgeItemSheet.getData()`.

## [0.5.0] - 2025-04-14

### ✨ Features

- Implemented basic Item Sheet (`SurgeItemSheet`, `item-sheet.hbs`).
- Items can now be opened and edited via the UI.
- Added display and input fields for common item properties (Description, Quantity, Weight, Price).
- Added type-specific input fields for Weapon properties (Damage, Range, Skill, Type, Hands, Actions, Menace, etc.) using Handlebars conditionals.
- Added basic CSS grid layout helpers for item sheet.

### 🔧 Maintenance

- Created `module/item-sheet.js` and `templates/sheets/item-sheet.hbs`.
- Registered `SurgeItemSheet` for most standard item types.

## [0.4.2] - 2025-04-14

### ✨ Features

- Implemented General Penalty Application from equipped items (Armor/Shields).
- Penalties defined in `item.system.attributePenalties` and `item.system.skillPenalties` are now checked and applied automatically to relevant Attribute Checks, Skill Checks, Attack Rolls, and Defense Rolls.
- Implemented Defense Bonuses from equipped Shields (`defenseBonus`) correctly in Melee Defense rolls.

### 🔧 Maintenance

- Added `_getEquippedPenalties` helper function to centralize penalty calculation.
- Updated all roll handler methods (`_onAttributeRoll`, `_onSkillRoll`, `_onItemAttackRoll`) and dedicated defense methods (`_rollMeleeDefense`, `_rollRangedDefense`, `_rollMagicDefense`) to incorporate general penalties and specific defense bonuses.
- Refactored `_performRoll` previously (in v0.4.1 dev) to accept an array of modifiers.

## [0.4.1] - 2025-04-14

### ✨ Features

- Implemented Defense Bonuses/Penalties from equipped items:
  - Melee Defense rolls now include Shield `defenseBonus` and check for STR/Martial penalties.
  - Ranged Defense rolls now include DEX penalties from equipped Armor/Shields.
- Refactored defense roll logic into separate helper methods.

### 🔧 Maintenance

- Updated `template.json` for `armor` and `shield` types to support Damage Reduction arrays, Skill/Attribute Penalty arrays, Shield HP, and Shield Melee Defense Bonus. Removed placeholder `rangedDefenseBonus`.
  - Added placeholder default values to test penalties and DR.
- Added basic `plate` item type to `template.json`.
- Refactored `_performRoll` to accept an array of modifiers.

## [0.4.0] - 2025-04-14

### ✨ Features

- Implemented Combat Rolls from Inventory Items:
  - Added Attack `<i class="fas fa-fist-raised"></i>` and Damage `<i class="fas fa-dice-d6"></i>` buttons to Weapon items in the Inventory tab.
  - Attack button triggers appropriate skill roll (`Martial Combat` or `Marksmanship`) including STR level bonus for melee weapons.
  - Damage button triggers a separate damage roll using the weapon's damage formula.
  - Both attack and damage rolls correctly implement the SURGE mechanic (`x6` exploding dice).
- Added `_performDamageRoll` helper function to handle damage-specific rolling.

### 🔧 Maintenance

- Added listeners and handlers (`_onItemAttackRoll`, `_onItemDamageRoll`) for new item roll buttons.
- Updated HBS template for inventory weapon items.

## [0.3.3] - 2025-04-13

### ✨ Features

- Implemented automatic calculation of Total Menace in `getData()`.
- Total Menace now sums Base Menace and the `menaceContribution` from all equipped items (where applicable).
- Value displayed in the header passives grid updates automatically when items are equipped/unequipped or base menace changes.
- Added dynamic tooltip to Menace display showing Base + Equip = Total breakdown.

## [0.3.2] - 2025-04-13

### ✨ Features

- Implemented Biography tab layout using Foundry's `{{editor}}` helper.
- Added fields for Appearance, Origin, Involvement, Motivation, Aspirations, Allies/Enemies, and Notes.
- Added basic CSS for Biography section spacing.
- Implemented Equipped/Unequipped state toggle for Weapons, Armor, and Shields in the Inventory tab.
- Added `equipped` boolean field to relevant item types in `template.json`.
- Added a shield icon toggle (<i class="fas fa-shield-alt"></i>) to item rows in inventory display (`actor-sheet.hbs`).
- Added JavaScript listener and handler (`_onItemToggleEquipped`) to update item equipped state on click.
- Added basic CSS to style the equipped toggle icon (dimmed when unequipped, green when equipped).
- Added basic `shield` item type to `template.json`

## [0.3.1] - 2025-04-13

### ✨ Features

- Implemented basic inventory item management via controls on the Inventory tab:
  - Edit button (<i class="fas fa-edit"></i>) now opens the corresponding item's sheet.
  - Delete button (<i class="fas fa-trash"></i>) now prompts for confirmation and deletes the item from the actor.

### 🔧 Maintenance

- Added click listeners and handler methods (`_onItemEdit`, `_onItemDelete`) to `SurgeCharacterSheet` for item controls.
- Utilized Foundry's `Dialog.confirm` for delete safety.

## [0.3.0] - 2025-04-13

### ✨ Features

- Implemented basic Inventory tab layout in `actor-sheet.hbs`.
- Owned items are now displayed, categorized into Weapons, Armor/Shields, and Gear/Equipment sections using Handlebars helpers (`#each`, `#if`, `eq`, `or`).
- Each item shows its icon, name, quantity/weight (where applicable), and placeholder edit/delete controls.
- Reordered sheet tabs to Main | Inventory | Biography.

### 🔧 Maintenance

- Added CSS rules to style the inventory list sections, item rows, and controls.

## [0.2.2] - 2025-04-13

### ✨ Features

- Implemented logic for modified rolls using Shift/Ctrl keys on Skills:
  - Shift+Click Martial Combat: Performs Melee Weapon Attack roll (Martial Roll + STR Level).
  - Ctrl+Click Martial Combat: Performs Melee Defense roll (Martial Roll + STR Level).
  - Ctrl+Click Mystic: Performs Magic Defense roll (Mystic Roll + INT Level).
- Roll formulas in chat now correctly include added flat modifiers (e.g., `@strlevel`).

### 🐛 Bug Fixes

- Corrected formula string construction in `_performRoll` to properly interpolate modifiers and remove erroneous HTML/placeholders, fixing dice `SyntaxError`.

## [0.2.1] - 2025-04-13

### 🐛 Bug Fixes

- Attribute roll is no longer triggered when clicking the input field; only the attribute label is rollable.
- Updated dice evaluation in `_performRoll` to use `await roll.evaluate()` instead of the deprecated `{ async: true }` option, resolving console warnings.

### 🔧 Maintenance

- Adjusted JavaScript listener target for attribute rolls in `activateListeners`.

## [0.2.0] - 2025-04-12

### ✨ Features

- Implemented character sheet display for Core Attributes (Strength, Dexterity, Intelligence, Charisma, Luck) on the 'Main' tab.
- Attributes are shown with labels and editable input fields linked directly to actor data via Handlebars.
- Added basic HTML structure for Header and Tab navigation (`Main`, `Biography`, `Inventory`).

## [0.1.1] - 2025-04-12

### 🐛 Bug Fixes

- Resolved critical errors preventing character sheet window from opening (`NotFoundBoundary`, `ENOENT`, `No data returned`). Sheet now opens with placeholder content.
- Simplified `defaultOptions` in `SurgeCharacterSheet` to ensure compatibility with Foundry V12 sheet rendering.

### 🔧 Maintenance

- Created basic `actor-sheet.hbs` template file.
- Added basic data calculation placeholders (Max Actions, Max HP, Total Menace) in `SurgeCharacterSheet.getData()`.
- Added basic structure for `activateListeners()` in `SurgeCharacterSheet`.

## [0.1.0] - 2025-04-12

- Initial system structure setup.
- Created system.json manifest file.
- Basic placeholder files for CSS and JS.
- Initial Actor setup in template.json
- Initial Item setup in template.json
- Added weapons to template.json

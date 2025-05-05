# Changelog

## [0.7.0] - 2025-05-05

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

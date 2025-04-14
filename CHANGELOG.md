# Changelog

## [0.3.2] - 2025-04-13

### ✨ Features

- Implemented Biography tab layout using Foundry's `{{editor}}` helper.
- Added fields for Appearance, Origin, Involvement, Motivation, Aspirations, Allies/Enemies, and Notes.
- Added basic CSS for Biography section spacing.

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

# Changelog

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

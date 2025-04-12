# Changelog

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

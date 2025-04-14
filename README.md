# SURGE! System for Foundry VTT

[![Latest Release](https://img.shields.io/github/v/release/PupRiku/FoundryVTT-Surge?include_prereleases&label=Latest%20Release)](https://github.com/PupRiku/FoundryVTT-Surge/releases/latest)
[![Foundry Compatibility](https://img.shields.io/badge/Foundry%20VTT-v12.331%2B-informational)](https://foundryvtt.com/releases/)
_Note: Compatibility verified for v12.331. Untested on later versions._

## Introduction

This is an unofficial community system implementation for the **SURGE!** tabletop roleplaying game ([SURGE! TTRPG Homepage](https://sites.google.com/warpedtree.com/www-warpedtree-com/products/surge?authuser=0)), designed for use with the Foundry Virtual Tabletop platform.

This system is currently **under active development** (pre-release) and aims to provide a functional character sheet, dice rolling capabilities according to the SURGE! rules, and support for core game mechanics.

## Installation

**Important:** This system is currently in a pre-release state. Features may be incomplete or change. Use with caution!

1.  Open the Foundry VTT Setup screen.
2.  Navigate to the "Game Systems" tab.
3.  Click the "Install System" button.
4.  In the "Manifest URL" field at the bottom, paste the following URL for the latest pre-release (**v0.5.1**):
    ```
    https://raw.githubusercontent.com/PupRiku/FoundryVTT-Surge/v0.5.1/system.json
    ```
5.  Click "Install".

Foundry will download and install the system. You can then create a new world using the SURGE! system.

## Current Features (as of v0.5.1)

- **Basic System Structure:** `system.json` manifest, `template.json` data models (Character, Item types including Weapon, Armor, Shield, Plate, etc.).
- **Character Sheet (`v0.4.1` Features Fully Integrated):**
  - Functional sheet window with basic styling.
  - **Header:** Displays Name (editable), Image (editable), styled Level block (right-aligned), and Passives Grid (HP, Recovery, Movement, Actions, En-Counter, Menace). Total Menace updates automatically based on equipped items.
  - **Main Tab:** Displays Attributes (block style, editable) and Skills (row style, editable) in a two-column layout. Labels/blocks trigger rolls.
  - **Inventory Tab:** Displays owned items categorized (Weapons, Armor/Shields, Gear/Equipment). Functional Edit (opens item sheet) and Delete (with confirmation) buttons. Equipped/Unequipped toggle functional for relevant items. Functional Attack/Damage roll buttons on weapons.
  - **Biography Tab:** Implemented layout with functional rich text editors (`{{editor}}`) for all biography fields.
- **Item Sheet (`v0.5.1` Features):**
  - Basic Item Sheet implemented (`SurgeItemSheet`). Items are editable via UI.
  - Displays common fields (Name, Image, Description, Qty, Wt, Price) with inputs/editors.
  - Displays type-specific fields for Weapons (editable dropdowns for Type/Skill, inputs for damage, range, etc.).
  - Displays type-specific fields for Armor & Shields (editable simple fields like Armor Type, Shield HP/Bonus; read-only display for DR/Penalty arrays).
  - Uses modern `{{selectOptions}}` helper, resolving V12 deprecation warnings.
  - Description `{{editor}}` display fixed.
- **Dice Rolling & Mechanics:**
  - Core SURGE! roll mechanic implemented (`Xd6x6+Y` lookup + `x6` SURGING).
  - Basic Attribute/Skill checks rollable from Actor Sheet labels/blocks.
  - Combat Attack/Damage rolls triggerable from Weapon items in Inventory.
  - Defense rolls triggerable via Ctrl+Click on relevant Actor Sheet labels.
  - **Modifiers/Penalties:** Rolls correctly incorporate applicable attribute bonuses (+STR Level) and item bonuses/penalties (+Shield Bonus, -DEX Penalty, -Guile Penalty, etc.) from equipped items.
- **Item Management & State:** Edit, Delete, and Equip/Unequip functionality working on Inventory tab items. Equipped state used for Menace calculation and defense/penalty application.

## Planned Features / To-Do

- **Status Effects / Conditions:** Implement system (likely Active Effects) for tracking and applying effects like Bleeding, Broken, etc., triggered by attacks or other actions. Implement "Patch Up" action functionality.
- **Item Sheet Enhancements:**
  - Create UI for easily editing array data (Damage Reduction, Attribute/Skill Penalties).
  - Add specific fields/layouts for remaining item types (Gear, Tool, Medicine, Ammo, Plate, etc.).
- **Combat Options & Actions:**
  - Add specific actions/rolls for Unarmed Strike, Grapple, Shove, etc.
  - Implement Shield HP tracking/damage absorption.
  - Implement special Shield option to block Ranged attacks using Melee Defense.
  - Implement Dodge & Counter action mechanics.
- **Kevlar Mechanics:** Implement interaction between Kevlar Vest slots and Kevlar Plates (tracking uses, negation).
- **NPC Sheet:** Design and implement data model and sheet for NPCs.
- **Compendia:** Create packs for base items, species, traits, example actors.
- **Character Creation:** Automate initial HP roll calculation, Species/Trait bonus application.
- **Styling & Polish:** Continue refining CSS and overall sheet usability and appearance.
- **Advanced Automation:** Explore potential for auto-applying damage to targets, tracking action usage, etc.

## Feedback & Issues

Please report any bugs or provide feedback by opening an issue on the [GitHub Issues page](https://github.com/PupRiku/FoundryVTT-Surge/issues).

## License

This project is licensed under the [MIT License](LICENSE).

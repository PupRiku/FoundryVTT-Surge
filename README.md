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
4.  In the "Manifest URL" field at the bottom, paste the following URL for the latest pre-release (**v0.3.3**):
    ```
    https://raw.githubusercontent.com/PupRiku/FoundryVTT-Surge/v0.3.3/system.json
    ```
5.  Click "Install".

Foundry will download and install the system. You can then create a new world using the SURGE! system.

## Current Features (as of v0.3.3)

- **Basic System Structure:** `system.json` manifest, `template.json` data models (Character, Item types including Weapon, Armor, Shield, Gear, etc.).
- **Character Sheet:**
  - Functional sheet window opens with initial CSS styling.
  - **Header:** Displays Character Name (editable), Image (editable), styled Level block (right-aligned), and Passives Grid (HP, Recovery, Movement, Actions, En-Counter, Menace).
  - **Total Menace:** Automatically calculated in header based on Base Menace + `menaceContribution` from equipped items.
  - **Main Tab:** Displays Attributes (block style, editable, left column ~15%) and Skills (row style, editable, right column ~85%). Labels/blocks are rollable.
  - **Inventory Tab:** Displays owned items categorized (Weapons, Armor/Shields, Gear/Equipment). Items show icon, name, basic info. Functional Edit (opens item sheet) and Delete (with confirmation) buttons. Equipped/Unequipped toggle icon `<i class="fas fa-shield-alt"></i>` functional for relevant items (updates data and appearance).
  - **Biography Tab:** Implemented layout with functional rich text editors (`{{editor}}`) for all biography fields (Appearance, Origin, Notes, etc.).
- **Dice Rolling:**
  - Core SURGE! roll mechanic implemented (`Xd6x6+Y` lookup with `x6` SURGING).
  - Basic Attribute/Skill checks rollable from sheet labels/blocks.
  - **Modified Rolls:** Shift+Click / Ctrl+Click on relevant skill labels trigger modified rolls (Melee Weapon Attack, Melee Defense, Magic Defense) correctly adding flat bonuses (+STR Level, +INT Level) and sending results to chat.
- **Item Management:** Edit, Delete, and Equip/Unequip functionality working on Inventory tab items via clickable controls.

## Planned / To-Do Features

- Combat Rolls triggered from Weapon items (Attack & Damage).
- Implementation of Shield/Armor bonuses in defense rolls.
- Status Effect / Condition tracking and application (e.g., from weapon specialties).
- Spellcasting implementation.
- NPC sheet design.
- Compendium packs for base items, species, traits, etc.
- Further styling and polish.
- More robust data calculations and automation.

## Feedback & Issues

Please report any bugs or provide feedback by opening an issue on the [GitHub Issues page](https://github.com/PupRiku/FoundryVTT-Surge/issues).

## License

This project is licensed under the [MIT License](LICENSE).

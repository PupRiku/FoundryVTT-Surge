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
4.  In the "Manifest URL" field at the bottom, paste the following URL for the latest pre-release (**v0.3.1**):
    ```
    [https://raw.githubusercontent.com/PupRiku/FoundryVTT-Surge/v0.3.1/system.json](https://raw.githubusercontent.com/PupRiku/FoundryVTT-Surge/v0.3.1/system.json)
    ```
5.  Click "Install".

Foundry will download and install the system. You can then create a new world using the SURGE! system.

## Current Features (as of v0.3.1)

- **Basic System Structure:** `system.json` manifest, `template.json` data models (Character, basic Item types).
- **Character Sheet:**
  - Functional sheet window opens.
  - **Header:** Displays Character Name (editable), Image (editable), styled Level block, and Passives Grid (HP, Recovery, Movement, Actions, En-Counter, Menace).
  - **Main Tab:** Displays Attributes (block style, editable) and Skills (row style, editable) in a two-column layout.
  - **Inventory Tab:** Displays owned items categorized by type (Weapons, Armor/Shields, Gear/Equipment) with icon, name, basic info, and functional Edit/Delete buttons.
  - **Biography Tab:** Basic placeholder tab exists.
- **Dice Rolling:**
  - Core SURGE! roll mechanic implemented (`Xd6x6+Y` based on level lookup).
  - Clicking Attribute labels/blocks or Skill labels triggers base checks.
  - **Modified Rolls:** Shift+Click / Ctrl+Click on certain skill labels trigger modified rolls (Melee Weapon Attack, Melee Defense, Magic Defense) correctly adding flat bonuses (+STR Level, +INT Level).
  - Roll results sent to chat with appropriate labels and working formula tooltips.
- **Basic Styling:** Initial CSS applied for header layout, main tab columns, attribute blocks, skill rows, passives grid, and inventory lists.

## Planned / To-Do Features

- Full implementation of Biography tab layout (`{{editor}}`).
- Combat Rolls triggered from Weapon items (Attack & Damage).
- Implementation of Shield/Armor bonuses in defense rolls.
- Calculation of Total Menace based on equipped items.
- Status Effect / Condition tracking and application (e.g., from weapon specialties).
- Spellcasting implementation (if applicable).
- NPC sheet design.
- Compendium packs for base items, species, traits, etc.
- Further styling and polish.
- More robust data calculations and automation.

## Feedback & Issues

Please report any bugs or provide feedback by opening an issue on the [GitHub Issues page](https://github.com/PupRiku/FoundryVTT-Surge/issues).

## License

This project is licensed under the [MIT License](LICENSE) (assuming you chose MIT).

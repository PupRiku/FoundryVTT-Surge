# SURGE! System for Foundry VTT

[![Latest Release](https://img.shields.io/github/v/release/PupRiku/FoundryVTT-Surge?include_prereleases&label=Latest%20Release)](https://github.com/PupRiku/FoundryVTT-Surge/releases/latest)
[![Foundry Compatibility](https://img.shields.io/badge/Foundry%20VTT-v12.331%2B-informational)](https://foundryvtt.com/releases/)
_Note: Compatibility verified specifically for v12.331 during development. Untested on later versions._

## Introduction

This is an unofficial community system implementation for the **SURGE!** tabletop roleplaying game ([SURGE! TTRPG Homepage](https://sites.google.com/warpedtree.com/www-warpedtree-com/products/surge?authuser=0)), designed for use with the Foundry Virtual Tabletop platform.

This system is currently **under active development** (pre-release) but now includes functional character sheets, item sheets, core dice rolling, and implementation for numerous status effects/conditions.

## Installation

**Important:** This system is currently in a pre-release state (v0.8.0). Features may be incomplete or change. Use with caution!

1.  Open the Foundry VTT Setup screen.
2.  Navigate to the "Game Systems" tab.
3.  Click the "Install System" button.
4.  In the "Manifest URL" field at the bottom, paste the following URL for the **v0.8.0** release:
    ```
    https://raw.githubusercontent.com/PupRiku/FoundryVTT-Surge/v0.8.0/system.json
    ```
5.  Click "Install".

Foundry will download and install the system. You can then create a new world using the SURGE! system.

## Current Features (as of v0.8.0)

- **Basic System Structure:** `system.json` manifest, `template.json` data models (Character, various Item types). Basic CSS styling. Includes Macro Compendium pack.
- **Character Sheet:**
  - Functional sheet window with Header (Name, Image, Level, Passives Grid) and Tabs (Main, Inventory, Spellbook, Biography, Effects).
  - **Header:** Displays core info; Total Menace updates automatically.
  - **Main Tab:** Displays Attributes and Skills with editable fields and rollable labels.
  - **Inventory Tab:** Categorized item display (Weapons, Armor/Shields, Gear) with functional Edit, Delete, Equip/Unequip controls. Attack/Damage roll buttons on weapons.
  - **Biography Tab:** Rich text editors for all biography fields.
  - **Effects Tab:** Displays active effects applied to the actor with working Toggle (Enable/Disable), Edit, and Delete controls (using custom handlers).
- **Item Sheet:**
  - Basic functional sheet for viewing/editing items.
  - Common fields (Name, Image, Description, Qty, Wt, Price).
  - Type-specific fields for Weapons (Damage, Range, Skill, Type, etc.).
  - Type-specific fields for Armor & Shields.
  - Fields & layout for "spell" type items.
- **Dice Rolling & Mechanics:**
  - Core SURGE! roll mechanic (`Xd6x6+Y` lookup + `x6` SURGING) via `_performRoll`.
  - Attribute/Skill checks rollable from Actor Sheet.
  - Weapon Attack/Damage rolls triggerable from Inventory, calculating damage via `_performDamageRoll`.
  - Defense rolls (Melee, Ranged, Magic) triggerable via Ctrl+Click.
  - Rolls incorporate applicable bonuses/penalties from stats and equipped items.
  - Contested rolls for spellcasting.
- **Status Effects & Conditions:**
  - Dynamic registration of system-specific status effect icons, replacing core defaults.
  - Implementation of numerous conditions with automated mechanics where practical:
    - **Automated Effects:** Movement=0 (Crushed, Frozen, Paralyzed, Restrained, Prone, Pinned), DEX Check Auto-Fail (Restrained, Prone, Pinned, Incapacitated, Unconscious), INT/CHA Check Penalty (Confused), Magic Defense Penalty (Deafened), Guile Bonus (Invisible), Physical Attack Prevention (Crushed, Pinned).
    - **Damage/Healing Interactions:** Damage removes Stunned (via `updateActor` hook), Escalating Damage/Turn (Burning, Bleeding via `updateCombat` hook), Damage/Turn (Frozen, Damage Poison via `updateCombat` hook), Damage on Move (Chilled via `updateToken` hook), Damage Vulnerability (Flammable doubles Burning, Broken doubles Physical via `_performDamageRoll`), Damage Immunity (Flame Resistant prevents Burning via macro).
    - **Condition Interactions:** Confused prevents Frightened (via status `overrides`), Wet prevents Burning (via override/macro), Wet removes Flammable (via macro), Insulated prevents Chilled (via override/macro), Insulated removes Frozen (via `updateCombat` hook), Incapacitated/Stunned/Unconscious apply Prone (via macro).
    - **Complex Conditions:** Confused (random start-of-turn behavior via hook/chat), Poisoned subtypes (Sickness/Debilitating apply random secondary effects/durations via macro; Deadly triggers HP 0 + Incapacitated after 5 combat turns via hook).
    - **Weapon Interactions:** Added a field in the the item sheet to specify conditions a weapon will apply when damaging a target. This will automatically apply the condition(s).
  - **Spellcasting:**
    - Defined "spell" item type with comprehensive data fields (School, Casting Time, Range, Target, Duration, Focus req., Defender Attr., Damage/Heal/Condition effects).
    - Item sheet supports viewing/editing spell data.
    - Actor sheet includes a "Spellbook" tab listing owned spells.
    - "Cast" button on spell items initiates casting process.
    - Implemented core contested roll mechanic (Mystic+INT vs Defender).
    - Basic application of damage, healing, and conditions from spells upon successful cast against targets.
    - Mute condition prevents casting.
  - **GM Adjudication:** Many conditions rely on GM ruling for effects not easily automated (e.g., action restrictions for Frightened/Paralyzed/Stunned/Unconscious/Mute, perception checks for Invisible/Deafened, immunities for Flame Resistant/Insulated, specific remedies like Patch Up/Break Free/Heat Sources). Descriptions added to effects as reminders.
  - **Macros:** Compendium pack created ("SURGE! Condition Macros") containing macros to apply each condition (including prerequisite/stacking checks and input dialogs where needed).
  - **Workarounds:** Implemented workarounds/notes for known core Foundry bugs (e.g., round duration expiry).

## Planned Features / To-Do

- **Refine Condition Mechanics:** Implement specific Condition Actions (Break Free, Patch Up, Shake Off Stun, Stand Up); Implement Death Saving Throw mechanic.
- **Refine Spellcasting System:** Implement Focus mechanic (concentration checks); Handle multi-turn casting times & action costs; Implement Area of Effect targeting/templates; Refine spell damage/healing application (e.g., centralized function considering resistances/vulnerabilities like Bleed/Broken); Implement Mending school healing interaction with Unconscious.
- **Item Sheet Enhancements:** UI for editing array data (DR, Penalties); Layouts for remaining item types (Gear, Tool, Medicine, Antidotes, Brace, etc.).
- **Combat Options:** Unarmed Strike, Grapple, Shove, Shield HP/Blocking, Dodge/Counter, Kevlar mechanics.
- **NPC Sheet:** Design data model and sheet.
- **Compendia:** Packs for base items (weapons, armor, gear, remedies), spells, species, traits, actors/NPCs.
- **Character Creation:** Automate starting calculations.
- **Styling & Polish:** Continue refining CSS and usability.
- **Code Refinement:** Remove debug logging; Centralize damage/healing application.

## Feedback & Issues

Please report any bugs or provide feedback by opening an issue on the [GitHub Issues page](https://github.com/PupRiku/FoundryVTT-Surge/issues).

## License

This project is licensed under the [MIT License](LICENSE).

# SURGE! System for Foundry VTT

An unofficial community implementation of the [SURGE! TTRPG](https://surgettrpg.com) ruleset for [Foundry Virtual Tabletop](https://foundryvtt.com) — bringing the full SURGE! experience to a digital tabletop.

![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13.351-green)
![Version](https://img.shields.io/badge/version-v0.12.0-blue)
![Status](https://img.shields.io/badge/status-pre--release-orange)

> ⚠️ **Pre-release (v0.12.0).** Functional and playable, but features are still being added. Use with caution in live campaigns.

---

## Overview

This system implements the full SURGE! ruleset inside Foundry VTT — including character creation, skill progression, spellcasting, combat mechanics, and an extensive automated condition system. Developed in close collaboration with the SURGE! writers to ensure rules accuracy, with an emphasis on automating as much of the mechanical overhead as possible so players can focus on the game.

Built with vanilla JavaScript and Handlebars templating, following Foundry's system development API.

---

## Installation

1. Open the Foundry VTT Setup screen
2. Navigate to the **Game Systems** tab
3. Click **Install System**
4. Paste the following manifest URL:

```
https://raw.githubusercontent.com/PupRiku/FoundryVTT-Surge/v0.12.0/system.json
```

5. Click **Install** — Foundry will handle the rest
6. Create a new world using the **SURGE!** system

---

## Current Features (v0.12.0)

### Character Sheet

A fully functional player character sheet with tabbed navigation:

- **Header** — Name, image, level, passives grid, dynamic Species/Trait display, and HP-based status label (Healthy → Bloodied → Dying)
- **Main Tab** — Attributes and derived skill totals with editable base values and rollable labels
- **Inventory Tab** — Categorized items (Weapons, Armor/Shields, Gear) with equip/unequip controls and attack/damage roll buttons
- **Spellbook Tab** — Lists owned spells with cast initiation
- **Biography Tab** — Rich text editors for all biography fields
- **Effects Tab** — Active condition display with toggle, edit, and delete controls; context-aware Condition Actions (Stand Up, Patch Up) that appear based on active status effects
- **Edit Mode** — Manual stat overrides, BP resets, and species removal

### NPC Support

Streamlined NPC actor type with access to items, spells, and effects — without the complexity of player character progression. Includes a Role field for enemy classification (Minion, Boss, Guard, etc.).

### Character Creation Pipeline

Automated setup via drag-and-drop of a Species item onto the actor sheet:

- Applies attribute bonuses automatically
- Calculates and rolls starting HP based on Strength
- Sets base passives (Movement, Recovery, Menace)
- Prompts the player to select a Chosen Trait via a dialog
- Blank sheets display `?` for key stats until a species is applied

### Character Advancement

Full Buy Point (BP) level system:

- Characters gain 7 BP on level-up (+ Intelligence bonus)
- Attribute upgrades: 4 BP | Skill upgrades: 3 BP
- UI feedback on cost affordability; buttons disabled when unaffordable or at max level

### Dice Rolling & Core Mechanics

- Custom SURGE! roll mechanic: `Xd6x6 + Y` lookup with x6 SURGING explosion via `_performRoll`
- Attribute and skill checks rollable directly from the sheet
- Weapon attack and damage rolls from the Inventory tab
- Defense rolls (Melee, Ranged, Magic) via Ctrl+Click
- Contested spellcasting rolls (Mystic+INT vs. Defender)
- All rolls incorporate bonuses/penalties from stats, equipped items, and owned Traits

### Death Saving Throw System

- Characters dropping to 0 HP automatically enter a two-stage death save process (Conscious → Unconscious) with escalating Difficulty Ratings
- Status labels and save button appear dynamically on the sheet header
- Healing from 0 HP or Dead state correctly clears dying/dead status

### Status Effects & Conditions

Extensive automated condition system with over 20 conditions implemented:

| Category               | Conditions                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Movement               | Crushed, Frozen, Paralyzed, Restrained, Prone, Pinned (all set Movement = 0)                                                               |
| Check Penalties        | Restrained, Prone, Pinned, Incapacitated, Unconscious (DEX auto-fail); Confused (INT/CHA penalty)                                          |
| Damage Over Time       | Burning, Bleeding (escalating); Frozen, Poison (flat); Chilled (on move)                                                                   |
| Damage Interactions    | Flammable doubles Burning; Broken doubles Physical damage                                                                                  |
| Condition Interactions | Wet prevents/removes Burning & Flammable; Insulated prevents/removes Chilled & Frozen; Confused prevents Frightened                        |
| Complex Behavior       | Confused (random start-of-turn behavior via hook); Poisoned subtypes (Sickness, Debilitating, Deadly — each with unique automated effects) |

Includes a **SURGE! Condition Macros** compendium pack for applying all conditions with prerequisite checks and input dialogs.

### Spellcasting

- Full spell item type with fields for School, Casting Time, Range, Target, Duration, Focus requirement, and Defender Attribute
- Core contested roll mechanic fully implemented
- Damage, healing, and condition application on successful cast
- Mute condition prevents casting

### Compendium Content

- Species and Traits compendium packs (Ponturi data complete)
- Condition Macros compendium pack
- Item, spell, and example actor packs planned (see Roadmap)

---

## Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Language      | JavaScript                  |
| Templating    | Handlebars                  |
| Platform      | Foundry VTT v13 API         |
| Compatibility | Verified on Foundry v13.351 |

---

## Roadmap

**Condition System**

- [ ] Implement remaining Condition Actions (Break Free, Shake Off Stun)
- [ ] Full GM adjudication notes for conditions requiring manual rulings

**Spellcasting**

- [ ] Focus/concentration mechanic
- [ ] Multi-turn casting times and action costs
- [ ] Area of Effect targeting and templates
- [ ] Mending school interaction with Unconscious state

**Item Sheets**

- [ ] UI for editing array data (DR, Penalties)
- [ ] Layouts for remaining item types (Gear, Tool, Medicine, Antidotes, Brace, etc.)

**Combat**

- [ ] Unarmed Strike, Grapple, Shove
- [ ] Shield HP and blocking mechanics
- [ ] Dodge and Counter actions
- [ ] Kevlar mechanics

**Compendia**

- [ ] Base items pack (weapons, armor, gear, remedies)
- [ ] Spells pack
- [ ] Example actors and NPCs pack

**Code Quality**

- [ ] Remove debug logging
- [ ] Centralize damage/healing application logic

---

## Development Notes

This system was developed through close collaboration with the SURGE! TTRPG writers — learning the ruleset, prioritizing which mechanics to implement first, and iterating based on playtesting feedback. The goal was always to automate the mechanical overhead that slows down play, while keeping GM control and adjudication accessible where full automation isn't practical or desirable.

---

## Disclaimer

This is an unofficial, community-developed system and is not affiliated with or endorsed by the creators of SURGE! TTRPG. All SURGE! intellectual property belongs to its respective owners.

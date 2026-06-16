# NIN9ONE WORLD MATERIAL LANGUAGE

## Status

Preliminary.

Implemented on `feature/world-foundation-006`; awaiting founder review.

This document records the first visual material language pass for The Citadel and future district inheritance. It is presentation guidance, not canon. `docs/governance/WORLD_CANON.md` remains the only authority for founder-approved lore.

## Material Family 01 — Obsidian Matter

Purpose:

Primary structural material.

Characteristics:

- Near black
- Slight metallic response
- Sharp silhouette readability
- Ancient appearance

Application:

- Citadel
- Primary towers
- Major structures

Goal:

Create a sense of permanence and age.

## Material Family 02 — Celestial Gold

Purpose:

Primary accent and energy material.

Characteristics:

- Warm emissive gold
- High visual contrast
- Used intentionally and sparingly

Application:

- Light sources
- Sacred structures
- Key architectural accents
- Focal points

Goal:

Create visual hierarchy.

## Material Family 03 — Black Water

Purpose:

World connective layer.

Characteristics:

- Dark reflective surface
- Gold light response
- Mirror-like behavior

Goal:

Support atmosphere, depth, and mystery.

## Material Family 04 — Atmospheric Matter

Purpose:

Scale amplification.

Characteristics:

- Mist
- Dust
- Haze
- Light diffusion

Goal:

Make the world feel larger than rendered geometry.

## Material Family 05 — Weathered Remnants

Purpose:

Evidence of age.

Characteristics:

- Rough surfaces
- Erosion
- Decay
- Reduced contrast

Application:

- Distant structures
- Realm fragments
- Islands
- Outer regions

Goal:

Suggest history and passage of time.

## Preliminary Visual Rules

1. Dark materials dominate.
2. Gold is rare and intentional.
3. Atmosphere is a material.
4. Reflections are part of world identity.
5. Silhouette is more important than texture detail.

## Implementation Notes

- Material tokens live in `src/data/materials/nin9oneMaterialLanguage.ts`.
- Reusable material components live in `src/components/world/WorldMaterials.tsx`.
- The Citadel and primary spires use Obsidian Matter.
- Gold is constrained to the celestial body, threshold accent, light signals, rim glints, and water response.
- Black Water remains a broad reflective plane with layered gold response.
- Distant structures, rocks, fragments, and horizon masses use Weathered Remnants.
- Fog, haze curtains, mist banks, and particles are treated as Atmospheric Matter.

## Out of Scope

- Creature systems
- Character materials
- Living materials
- Advanced shaders
- Texture authoring
- PBR asset production
- Final visual polish
- Mythology-driven materials

## Future Exploration

Potential follow-up:

WORLD-FOUNDATION-006A — Material Ontology Exploration

Deferred pending mythology and realm workshop.

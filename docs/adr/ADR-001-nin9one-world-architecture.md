# ADR-001: NIN9ONE World Architecture

## Status

Proposed

## Context

NIN9ONE is evolving from a music collective into a broader cultural universe.
"The Citadel" is the first district/location in this universe. It should not be
treated as a one-off visualizer or campaign asset. It is the first modular
environment in a future expandable world that may include additional districts,
lore, music experiences, artist portals, community spaces, events, games,
merchandise, and licensing opportunities.

The initial goal is to build a single-player atmospheric prototype that allows
users to enter and experience The Citadel as a cinematic 3D landscape.

## Decision

Build the NIN9ONE World as a standalone interactive 3D web experience, separate
from the main NIN9ONE marketing/D2C website.

The system will treat locations, landmarks, lore, music, and atmosphere as
reusable/data-driven modules rather than hardcoded one-off scene elements.

## Architecture Principles

- The Citadel is the first district, not the whole universe.
- Music is an interface into the world, not the full product.
- World elements should be modular and reusable.
- Lore should be stored as structured data.
- Landmarks should be stored as structured data.
- Scene components should support future districts.
- Multiplayer is anticipated but explicitly out of scope for the initial
  prototype.
- The first prototype should prioritize mood, composition, and user feeling over
  feature depth.

## Initial Scope

### In Scope

- Single-player 3D scene
- The Citadel district
- Cinematic camera/orbit exploration
- Atmospheric lighting and fog
- Reflective shallow water
- Central citadel/spire structure
- Supporting spires/rock formations
- Celestial body/background object
- Landmark/lore card interactions
- Ambient audio placeholder support

### Out of Scope

- Multiplayer
- User accounts
- Persistent inventory
- Token-gated access
- Commerce
- Full game mechanics
- Backend CMS
- Production-grade performance optimization

## Proposed Repository Structure

```txt
src/
  app/
    citadel/
  components/
    world/
    scene/
    atmosphere/
    audio/
    ui/
  scenes/
    citadel/
  data/
    locations/
    landmarks/
    lore/
  hooks/
  utils/
  assets/
    audio/
    textures/
    models/
```

## Data Model Direction

Locations should be represented as structured data.

Example:

```ts
type WorldLocation = {
  id: string
  name: string
  description: string
  districtType: "citadel" | "island" | "realm" | "portal"
  atmosphere: {
    palette: string[]
    mood: string[]
    audio?: string
  }
  landmarks: string[]
}
```

Landmarks should also be structured.

```ts
type Landmark = {
  id: string
  locationId: string
  name: string
  description: string
  position: [number, number, number]
  audioCue?: string
}
```

## Implementation Implications

- Build TheCitadel as a scene module, not a page-only component.
- Avoid hardcoding lore into UI components.
- Keep audio logic isolated.
- Keep landmark interaction isolated.
- Use placeholder primitives first before importing detailed 3D assets.
- Treat visual fidelity as iterative.
- Preserve future flexibility for additional districts.

## Success Criteria

The first successful prototype should answer:

Can someone enter The Citadel, remain for 60 seconds, and feel like they have
stepped into the NIN9ONE universe?

## Consequences

### Positive

- The world can expand without major rewrites.
- The Citadel becomes reusable IP infrastructure.
- Music, lore, events, and community can plug into the same world layer.
- Future districts can follow a repeatable pattern.

### Tradeoffs

- More upfront structure than a simple visualizer.
- Slightly slower initial setup.
- Requires discipline to avoid overbuilding too early.

## Decision Owner

NIN9ONE Founder / Creative Direction

## Date

2026-06-16

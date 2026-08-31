# NIN9ONE World Contributor Guidance

## Mission

Build a scalable interactive cultural universe beginning with The Citadel.

## Priorities

1. Atmosphere
2. Exploration
3. Discovery
4. Lore
5. Community

## Non-Priorities

Unless explicitly approved:

- Multiplayer
- Commerce
- NFTs
- Economy systems
- Gamification
- Backend complexity

## Architectural Principles

- Prefer modular components.
- Prefer data-driven content.
- Avoid hardcoded lore.
- Build districts as reusable entities.
- Build landmarks as reusable entities.
- Build atmosphere as reusable systems.

## Canon Management

[docs/governance/WORLD_CANON.md](docs/governance/WORLD_CANON.md) is the canonical reference for founder-approved world-building decisions.

Do not add, change, or imply canon unless the decision is explicitly founder-approved.

## Execution Tracking

[docs/governance/WORLD_STATUS.md](docs/governance/WORLD_STATUS.md) tracks the current phase, active ticket, completed work, upcoming work, and district status.

Check it before starting work to avoid duplicate execution or drift.

## Autonomous Execution

[docs/governance/AGENT_AUTONOMY.md](docs/governance/AGENT_AUTONOMY.md) defines the bounded autonomous operating authority, Founder-reserved decisions, three-move work budget, and review format.

Autonomous execution must remain within current canon and the active ticket recorded in `WORLD_STATUS.md`.

Among agents, Codex is the sole implementation writer. Grokbot is a read-only World Steward that independently challenges Codex Founder Reviews using [docs/governance/GROKBOT_WORLD_STEWARD.md](docs/governance/GROKBOT_WORLD_STEWARD.md). Grokbot must not author or apply repository changes.

## Branching Guidance

main represents the stable world state.
New work should be completed on feature branches and merged after review.

Examples:

- feature/world-foundation-003
- feature/atmosphere-pass-001
- feature/citadel-lighting-001

Avoid direct commits to main unless explicitly approved by the founder.

## Governance Scope

NIN9ONE World intentionally uses lightweight governance.

The objective is:

- Alignment
- Architectural consistency
- Canon protection

The objective is not:

- Bureaucracy
- Heavy process
- Sprint management
- Approval bottlenecks

Governance should remain proportional to project complexity.

## Pull Request Governance

### Class A — Auto Merge Eligible

Class A changes do not alter behavior, canon, visual direction, or architecture.

Examples:

- Documentation
- Folder structure
- Comments
- ADR formatting
- Non-functional cleanup

### Class B — Founder Review

Class B changes affect the experience or presentation of the world.

Examples:

- Scene changes
- Atmosphere changes
- Lighting changes
- Visual direction changes
- World presentation changes

Class B work normally requires Founder review before merge. When the Founder explicitly opens a three-ticket auto-merge window under `AGENT_AUTONOMY.md`, bounded Class B work inside an already-approved experiential direction may auto-merge after all recorded eligibility and validation gates pass.

### Class C — Explicit Founder Approval

Class C changes require explicit founder approval before implementation or merge.

Examples:

- Introduction of new external dependencies
- Architecture changes
- Multiplayer
- Authentication
- Backend services
- Monetization systems
- Canon modifications

#### Introduction of new external dependencies

Approved foundation dependencies:

- Next.js
- TypeScript
- Three.js
- React Three Fiber
- @react-three/drei

Use of approved dependencies does not require additional approval.
Only introduction of new external packages requires Class C review.

## Philosophy

"The goal is not to build a game.

The goal is to build a place."

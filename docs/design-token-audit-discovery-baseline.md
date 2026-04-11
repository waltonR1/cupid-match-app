# Design Token Audit Discovery Baseline

## Scope

- `src/components/discovery`
- `src/pages/discovery`

## Current Findings

- Discovery is the remaining page area with broad legacy token usage.
- List pages use legacy page tokens: `bg-page-base`, `text-text-heading`.
- Detail pages use legacy page tokens: `bg-page-soft`, `text-text-heading`.
- Directory controls use legacy `brand` and opacity tokens for active state, hover state, dropdown selection, chips, pagination, and sorting.
- `DetailHeroPanel.vue` uses the most opacity-based styling: `/45`, `/20`, `/65`, `/55`, `/10`, `/60`, `/70`, `/80`.
- `DirectoryCardFrame.vue` already uses `next-*`, but still uses generic `next-semantic-accent-primary` and `next-semantic-accent-secondary` for avatar, badge, and footer label. These are local card roles, not global semantic accent roles.
- No palette utility usage was found in discovery source files.

## Migration Order

1. Directory list shell and controls.
2. Discovery detail regular content.
3. `DetailHeroPanel.vue`, because it has the highest opacity concentration and needs local hero tokens.

## Initial Token Direction

- Generic card/page/body/label/divider semantics should use `next.semantic`.
- Repeated directory control states should use `next.component.directory-control`.
- Directory card-specific accent labels should stay in `next.component.directory-card`.
- Hero-only overlay and ornament values should stay in `next.component.discovery-hero` or `next.effect`.

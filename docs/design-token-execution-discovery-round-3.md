# Design Token Execution Discovery Round 3

## Scope

- `src/components/discovery/shared/detail/DetailHeroPanel.vue`
- `src/constants/theme-tokens.json`

## Changes

- Added `next.component.discovery-hero.*` for local hero roles:
  - `edge`
  - `halo`
  - `connector`
  - `record.*`
  - `avatar.*`
  - `index.*`
  - `pill.default.*`
  - `pill.muted.*`
- Added `next.effect.gradient.discovery-hero`.
- Added `next.effect.shadow.discovery-hero`.
- Replaced root hero styling:
  - `bg-home-hero` -> `bg-next-gradient-discovery-hero`
  - `shadow-hero` -> `shadow-next-shadow-discovery-hero`
  - `border-border-base` -> `border-next-semantic-border-default`
  - `text-text-heading` -> `text-next-semantic-text-primary`
- Replaced all opacity-mixed hero colors with pre-defined component tokens:
  - `bg-border-light/45` -> `bg-next-component-discovery-hero-edge`
  - `border-border-light/20` -> `border-next-component-discovery-hero-halo`
  - `bg-border-accent/65` -> `bg-next-component-discovery-hero-connector`
  - `border-border-accent/55 bg-brand-accent/10` -> `discovery-hero.record` or `discovery-hero.pill.default`
  - `border-border-accent/45 bg-surface-base/60` -> `discovery-hero.avatar`
  - `bg-surface-base/70` -> `bg-next-semantic-surface-panel`
  - `bg-surface-card/80` -> `discovery-hero.index.background`
  - `border-border-light/55` -> `discovery-hero.index.divider`
  - `bg-surface-card/70` -> `discovery-hero.pill.muted.background`
- Replaced hero text roles with semantic or local component text tokens.

## Search Result

- Discovery remaining legacy utility matches: `0`
- Discovery remaining opacity utility matches: `0`
- Discovery remaining palette usage: `0`
- Discovery remaining `next-semantic-accent-*` matches: `0`

## Validation

- `theme-tokens.json` JSON parse -> passed
- `npm.cmd run check:i18n` -> passed
- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

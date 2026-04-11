# Design Token Execution Discovery Round 2

## Scope

- `src/pages/discovery/family/detail.vue`
- `src/pages/discovery/self/detail.vue`
- `src/constants/theme-tokens.json`

## Changes

- Added `next.component.discovery-detail.tag.*` for discovery detail data tags.
- Replaced detail page wrappers:
  - `bg-page-soft` -> `bg-next-semantic-page-subtle`
  - `text-text-heading` -> `text-next-semantic-text-primary`
- Replaced back affordance:
  - `border-border-base` -> `border-next-semantic-border-default`
  - `bg-surface-card` -> `bg-next-semantic-surface-card`
  - `text-text-body-soft` -> `text-next-semantic-text-muted`
  - `hover:text-brand-support` -> `hover:text-next-semantic-text-link`
- Replaced regular detail panels with semantic card/soft surface, default border, divider border, and `next` shadow.
- Replaced section heading text:
  - `text-brand-support` -> `text-next-semantic-text-eyebrow`
- Replaced detail labels and values:
  - `text-text-muted` -> `text-next-semantic-text-muted`
  - `text-text-body` -> `text-next-semantic-text-secondary`
  - `text-text-body-soft` -> `text-next-semantic-text-muted`
  - `text-text-heading` -> `text-next-semantic-text-primary`
- Replaced discovery detail tag chips with `next.component.discovery-detail.tag.*`.

## Search Result

- Detail page `.vue` remaining legacy/opacity matches: `0`
- Discovery remaining palette usage: `0`
- Discovery remaining `next-semantic-accent-*` matches: `0`
- Remaining discovery legacy/opacity scope is now limited to `DetailHeroPanel.vue`.

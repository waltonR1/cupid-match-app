# Design Token Execution Round 19

## Scope

- Excluded from audit: `account`, `discovery`
- Goal: migrate the remaining non-account/non-discovery legacy UI token usage in the empty state and 404 page

## Why

Two non-account/non-discovery files were still using legacy utility classes:

- [EmptyStatePanel.vue](/mnt/d/uniapp/cupid-match/src/components/common/feedback/EmptyStatePanel.vue)
- [not-found.vue](/mnt/d/uniapp/cupid-match/src/pages/not-found.vue)

`EmptyStatePanel` is also used by discovery pages, but this round only changes the shared component from legacy utilities to `next-*` utilities. Discovery itself remains excluded from semantic audit.

## Changes

### 1. Added empty-state component token

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- added `next.component.empty-state.code`

The `404` / code marker is a local empty-state marker, not a section title highlight, so it stays in `component` instead of being forced into `semantic.text.section-highlight`.

### 2. Migrated EmptyStatePanel

Updated [EmptyStatePanel.vue](/mnt/d/uniapp/cupid-match/src/components/common/feedback/EmptyStatePanel.vue):

- container:
  - `border-border-base` -> `border-next-semantic-border-default`
  - `bg-surface-card` -> `bg-next-semantic-surface-card`
- code marker:
  - `text-brand-primary` -> `text-next-component-empty-state-code`
- title:
  - `text-text-heading` -> `text-next-semantic-text-primary`
- subtitle:
  - `text-text-body-soft` -> `text-next-semantic-text-muted`
- solid button:
  - `border-button-primary` -> `border-next-semantic-action-primary`
  - `bg-button-primary` -> `bg-next-semantic-action-primary`
  - `text-white` -> `text-next-semantic-action-primary-contrast`
  - `hover:border-button-primary-hover` -> `hover:border-next-semantic-action-primary-hover`
  - `hover:bg-button-primary-hover` -> `hover:bg-next-semantic-action-primary-hover`
- outline button:
  - `border-border-base` -> `border-next-semantic-border-default`
  - `bg-surface-base` -> `bg-next-semantic-surface-card`
  - `text-text-body-soft` -> `text-next-semantic-text-secondary`
  - `hover:border-border-accent` -> `hover:border-next-semantic-border-card-hover`
  - `hover:bg-surface-panel` -> `hover:bg-next-semantic-surface-panel`
  - `hover:text-text-heading` -> `hover:text-next-semantic-text-primary`

### 3. Migrated not-found page wrapper

Updated [not-found.vue](/mnt/d/uniapp/cupid-match/src/pages/not-found.vue):

- `bg-page-base` -> `bg-next-semantic-page-default`
- `text-text-heading` -> `text-next-semantic-text-primary`

## Search Result

- Remaining legacy utility matches in non-account/non-discovery `.vue` files: `0`
- Remaining `text-white` in [EmptyStatePanel.vue](/mnt/d/uniapp/cupid-match/src/components/common/feedback/EmptyStatePanel.vue): `0`

## Validation

- `npm.cmd run check:i18n` -> passed
- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

# Design Token Execution Discovery Round 1

## Scope

- `src/components/discovery/family/FamilyFilterToolbar.vue`
- `src/components/discovery/self/SelfFilterToolbar.vue`
- `src/components/discovery/shared/directory/DirectoryActiveFilterChips.vue`
- `src/components/discovery/shared/directory/DirectoryCardFrame.vue`
- `src/components/discovery/shared/directory/DirectoryFilterSelectCard.vue`
- `src/components/discovery/shared/directory/DirectoryIntro.vue`
- `src/components/discovery/shared/directory/DirectoryPagination.vue`
- `src/components/discovery/shared/directory/DirectoryResultToolbar.vue`
- `src/pages/discovery/family/index.vue`
- `src/pages/discovery/self/index.vue`

## Changes

- Added `next.component.directory-card.avatar.text`.
- Added `next.component.directory-card.badge.text`.
- Added `next.component.directory-card.footer.text`.
- Added `next.component.directory-control.selected.*` for selected filter, active chip, active pagination, active sort, and selected dropdown indicator.
- Replaced directory list page wrappers:
  - `bg-page-base` -> `bg-next-semantic-page-default`
  - `text-text-heading` -> `text-next-semantic-text-primary`
- Replaced generic directory panels:
  - `border-border-base` -> `border-next-semantic-border-default`
  - `bg-surface-card` -> `bg-next-semantic-surface-card`
  - `shadow-panel` -> `shadow-next-shadow-panel`
- Replaced directory control default states with semantic surface/text/border tokens.
- Replaced selected control states with `next.component.directory-control.selected`.
- Replaced dropdown selected indicator from `bg-brand-support opacity-100` / `opacity-0` to a direct selected indicator token / `bg-transparent`.
- Replaced `DirectoryCardFrame.vue` generic `next-semantic-accent-*` usage with local `next.component.directory-card.*` text tokens.

## Search Result

- Directory list scope remaining legacy/opacity matches: `0`
- Discovery remaining `next-semantic-accent-*` matches: `0`
- Remaining discovery legacy/opacity scope is limited to:
  - `DetailHeroPanel.vue`
  - `pages/discovery/family/detail.vue`
  - `pages/discovery/self/detail.vue`

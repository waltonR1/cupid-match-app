# Design Token Execution Discovery Round 4

## Scope

- `src/components/discovery/shared/directory/DirectoryIntro.vue`
- `src/components/discovery/shared/detail/DetailHeroPanel.vue`
- `src/components/discovery/shared/directory/DirectoryCardFrame.vue`
- `src/constants/theme-tokens.json`

## Goal

Apply the follow-up semantic-count audit:

- fix `DirectoryIntro` eyebrow semantic misuse;
- reduce discovery component token count without merging unrelated semantics;
- remove stale hero-only tokens that can be represented by existing semantic tokens.

## Changes

### 1. Fixed intro eyebrow semantic misuse

`DirectoryIntro.vue` eyebrow changed from selected-control tokens to semantic label tokens:

- `border-next-component-directory-control-selected-border` -> `border-next-semantic-border-eyebrow`
- `bg-next-component-directory-control-selected-background` -> `bg-next-semantic-surface-soft`
- `text-next-component-directory-control-selected-text` -> `text-next-semantic-text-eyebrow`

### 2. Replaced hero index and muted badge local tokens with semantic tokens

`DetailHeroPanel.vue` index panel:

- `border-next-component-discovery-hero-index-border` -> `border-next-semantic-border-default`
- `bg-next-component-discovery-hero-index-background` -> `bg-next-semantic-surface-card`
- `text-next-component-discovery-hero-index-title` -> `text-next-semantic-text-eyebrow`
- `border-next-component-discovery-hero-index-divider` -> `border-next-semantic-border-divider`

Muted hero badge:

- `border-next-component-discovery-hero-pill-muted-border` -> `border-next-semantic-border-default`
- `bg-next-component-discovery-hero-pill-muted-background` -> `bg-next-semantic-surface-card`
- `text-next-component-discovery-hero-pill-muted-text` -> `text-next-semantic-text-muted`

### 3. Consolidated hero accent badge semantics

`DetailHeroPanel.vue` record ID and default hero badge now share:

- `discovery-hero.badge.meta.background`
- `discovery-hero.badge.meta.border`
- `discovery-hero.badge.meta.text`

Removed the older split:

- `discovery-hero.record.*`
- `discovery-hero.pill.default.*`

### 4. Consolidated directory card meta text

`DirectoryCardFrame.vue` badge text and footer text now share:

- `directory-card.meta.text`

Removed the older split:

- `directory-card.badge.text`
- `directory-card.footer.text`

### 5. Replaced hero ornament one-off tokens with semantic tokens

`DetailHeroPanel.vue` hero ornaments:

- `bg-next-component-discovery-hero-edge` -> `bg-next-semantic-border-divider`
- `border-next-component-discovery-hero-halo` -> `border-next-semantic-border-default`
- `bg-next-component-discovery-hero-connector` -> `bg-next-semantic-border-eyebrow`

Removed:

- `discovery-hero.edge`
- `discovery-hero.halo`
- `discovery-hero.connector`

## Token Count

- Discovery component token count before this round: `26`
- Discovery component token count after this round: `22`

Remaining discovery component token groups:

- `directory-card.*`
- `directory-control.selected.*`
- `discovery-detail.tag.*`
- `discovery-hero.badge.meta.*`
- `discovery-hero.avatar.*`

## Validation

- Discovery stale token scan: `0`
- Discovery legacy / opacity / palette / `next-semantic-accent-*` scan: `0`
- `theme-tokens.json` JSON parse -> passed
- `npm.cmd run check:i18n` -> passed
- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed
- `git diff --check` on discovery/token scope -> passed with CRLF normalization warnings only

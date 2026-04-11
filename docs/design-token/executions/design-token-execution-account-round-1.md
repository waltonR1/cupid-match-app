# Design Token Execution Account Round 1

## Scope

- Included: `account`
- Goal: replace account usage of shared legacy component token names that already have stricter `next.semantic` equivalents

## Why

After the non-account/non-discovery migration, these shared visual roles had already been promoted to `next.semantic`:

- section eyebrow line
- section eyebrow text
- card label text
- card hover border
- emphasis card surface/border/divider

`account` still used the old `next.component` names for the same roles, so this round performs direct semantic replacements without introducing new tokens.

## Changes

Updated account shell components:

- [AccountSectionHeader.vue](/mnt/d/uniapp/cupid-match/src/components/account/AccountSectionHeader.vue)
- [AccountTopSummary.vue](/mnt/d/uniapp/cupid-match/src/components/account/AccountTopSummary.vue)
- [AccountPrimaryNav.vue](/mnt/d/uniapp/cupid-match/src/components/account/AccountPrimaryNav.vue)

Updated account pages:

- [connections.vue](/mnt/d/uniapp/cupid-match/src/pages/account/connections.vue)
- [messages.vue](/mnt/d/uniapp/cupid-match/src/pages/account/messages.vue)
- [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue)
- [profile.vue](/mnt/d/uniapp/cupid-match/src/pages/account/profile.vue)
- [verification.vue](/mnt/d/uniapp/cupid-match/src/pages/account/verification.vue)

## Replacement Mapping

- `bg-next-component-section-line`
  -> `bg-next-semantic-border-eyebrow`
- `text-next-component-section-eyebrow`
  -> `text-next-semantic-text-eyebrow`
- `text-next-component-card-label`
  -> `text-next-semantic-text-card-label`
- `hover:border-next-component-section-card-hover-border`
  -> `hover:border-next-semantic-border-card-hover`
- `border-next-component-emphasis-card-border`
  -> `border-next-semantic-border-emphasis`
- `bg-next-component-emphasis-card-background`
  -> `bg-next-semantic-surface-emphasis`
- `bg-next-component-emphasis-card-line`
  -> `bg-next-semantic-border-emphasis-divider`

## Search Result

- Remaining account `next-component-section-line` matches: `0`
- Remaining account `next-component-section-eyebrow` matches: `0`
- Remaining account `next-component-card-label` matches: `0`
- Remaining account `next-component-emphasis-card-*` matches: `0`
- Remaining account `next-component-section-card-hover-border` matches: `0`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

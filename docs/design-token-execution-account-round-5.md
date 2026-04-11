# Design Token Execution Account Round 5

## Scope

- Included: `account`
- Goal: remove the over-thin `AccountPageHeader` component layer

## Why

`AccountPageHeader.vue` only wrapped `AccountSectionHeader` with one fixed panel container:

- no page-specific logic
- no unique token semantics
- no active slot usage in the account pages
- used only by the seven account pages through a repeated `#header` slot

That made it a thin pass-through component. The page-level header belongs in `AccountShell`, because it is part of the account shell layout rather than an independent reusable component.

## Changes

### 1. Moved page header rendering into AccountShell

Updated [AccountShell.vue](/mnt/d/uniapp/cupid-match/src/components/account/AccountShell.vue):

- added `headerEyebrow`
- added `headerTitle`
- added optional `headerDescription`
- renders the header panel directly with `AccountSectionHeader`
- removed the named `header` slot

### 2. Removed AccountPageHeader usage from pages

Updated:

- [profile.vue](/mnt/d/uniapp/cupid-match/src/pages/account/profile.vue)
- [verification.vue](/mnt/d/uniapp/cupid-match/src/pages/account/verification.vue)
- [connections.vue](/mnt/d/uniapp/cupid-match/src/pages/account/connections.vue)
- [messages.vue](/mnt/d/uniapp/cupid-match/src/pages/account/messages.vue)
- [safety.vue](/mnt/d/uniapp/cupid-match/src/pages/account/safety.vue)
- [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue)
- [activity.vue](/mnt/d/uniapp/cupid-match/src/pages/account/activity.vue)

Each page now passes:

- `header-eyebrow`
- `header-title`
- `header-description`

directly to `AccountShell`.

### 3. Deleted thin wrapper component

Deleted:

- `src/components/account/AccountPageHeader.vue`

## Search Result

- Remaining `AccountPageHeader` references: `0`
- Remaining account `#header` slot usage: `0`

## Validation

- `npm.cmd run check:i18n` -> passed
- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

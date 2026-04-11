# Design Token Execution Account Round 3

## Scope

- Included: `account`
- Goal: remove account usage of generic `next.semantic.surface.info-card`

## Why

Account used `next-semantic-surface-info-card` for four different UI meanings:

- profile public preview
- message boundary guidance
- safety risk guidance
- activity family follow-up guidance

These are account-specific callouts, not one global info-card surface. They should remain in `next.component` with separate semantics so values can diverge later.

## Changes

### 1. Added account callout tokens

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `next.component.account-callout.profile-preview.{background,border}`
- `next.component.account-callout.message-boundary.{background,border}`
- `next.component.account-callout.safety-risk.{background,border}`
- `next.component.account-callout.activity-family.{background,border}`

### 2. Replaced account callout usage

Updated [profile.vue](/mnt/d/uniapp/cupid-match/src/pages/account/profile.vue):

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-account-callout-profile-preview-background`
- `border-next-semantic-border-soft`
  -> `border-next-component-account-callout-profile-preview-border`

Updated [messages.vue](/mnt/d/uniapp/cupid-match/src/pages/account/messages.vue):

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-account-callout-message-boundary-background`
- `border-next-semantic-border-default`
  -> `border-next-component-account-callout-message-boundary-border`

Updated [safety.vue](/mnt/d/uniapp/cupid-match/src/pages/account/safety.vue):

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-account-callout-safety-risk-background`
- `border-next-semantic-border-soft`
  -> `border-next-component-account-callout-safety-risk-border`

Updated [activity.vue](/mnt/d/uniapp/cupid-match/src/pages/account/activity.vue):

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-account-callout-activity-family-background`
- `border-next-semantic-border-soft`
  -> `border-next-component-account-callout-activity-family-border`

## Search Result

- Remaining account `next-semantic-surface-info-card` matches: `0`
- Remaining account `next-semantic-accent-*` matches: `0`
- Remaining account direct `next-semantic-action-primary*` matches: `0`
- Remaining account legacy utility / opacity matches: `0`

## Validation

- `npm.cmd run check:i18n` -> passed
- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

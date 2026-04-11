# Design Token Execution Account Round 6

## Scope

- Included: `account`
- Goal: reduce account-only token count without breaking semantic boundaries

## Why

The account token pass had correctly removed generic misuse such as `accent`, `action-primary`, and `info-card`, but it left several account-only tokens that were too granular:

- `account-badge.tier`
- `account-badge.visibility`
- `account-badge.current`
- `account-badge.enabled`
- `account-badge.unread`
- `account-list-marker.default`
- `account-list-marker.emphasis`
- `account-callout.*`

This round tightened token count using semantic grouping instead of value-based grouping.

## Changes

### 1. Collapsed account badge roles

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `account-badge.tier.*`
- `account-badge.visibility.*`

into:

- `account-badge.meta.{border,background,text}`

Also collapsed:

- `account-badge.current.*`
- `account-badge.enabled.*`
- `account-badge.unread.*`

into:

- `account-badge.status.{border,background,text}`

Updated account pages:

- [profile.vue](/mnt/d/uniapp/cupid-match/src/pages/account/profile.vue)
- [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue)
- [connections.vue](/mnt/d/uniapp/cupid-match/src/pages/account/connections.vue)
- [messages.vue](/mnt/d/uniapp/cupid-match/src/pages/account/messages.vue)
- [safety.vue](/mnt/d/uniapp/cupid-match/src/pages/account/safety.vue)
- [verification.vue](/mnt/d/uniapp/cupid-match/src/pages/account/verification.vue)

### 2. Removed account callout token group

Deleted from [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `account-callout.profile-preview.*`
- `account-callout.message-boundary.*`
- `account-callout.safety-risk.*`
- `account-callout.activity-family.*`

The panels now use existing semantic surface/border tokens:

- `bg-next-semantic-surface-panel`
- `bg-next-semantic-surface-soft`
- `border-next-semantic-border-soft`

Updated account pages:

- [profile.vue](/mnt/d/uniapp/cupid-match/src/pages/account/profile.vue)
- [messages.vue](/mnt/d/uniapp/cupid-match/src/pages/account/messages.vue)
- [safety.vue](/mnt/d/uniapp/cupid-match/src/pages/account/safety.vue)
- [activity.vue](/mnt/d/uniapp/cupid-match/src/pages/account/activity.vue)

### 3. Collapsed list marker roles

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `account-list-marker.default`
- `account-list-marker.emphasis`

into:

- `account-list-marker.dot`

Updated account pages:

- [profile.vue](/mnt/d/uniapp/cupid-match/src/pages/account/profile.vue)
- [activity.vue](/mnt/d/uniapp/cupid-match/src/pages/account/activity.vue)
- [connections.vue](/mnt/d/uniapp/cupid-match/src/pages/account/connections.vue)
- [messages.vue](/mnt/d/uniapp/cupid-match/src/pages/account/messages.vue)
- [safety.vue](/mnt/d/uniapp/cupid-match/src/pages/account/safety.vue)

## Kept As Separate Tokens

Kept:

- `account-nav.current-border`
- `account-registration.confirmed.*`
- `account-registration.waitlist.*`
- `account-registration.completed.*`

Reason:

- active navigation is a distinct account navigation state
- registration card/badge states represent different account activity states and need separate border/background/text values

## Search Result

- Remaining `account-badge-(tier|visibility|current|enabled|unread)` matches: `0`
- Remaining `account-callout` matches: `0`
- Remaining `account-list-marker-(default|emphasis)` matches: `0`
- Current account-only token groups:
  - `account-badge.meta`
  - `account-badge.status`
  - `account-list-marker.dot`
  - `account-nav.current-border`
  - `account-registration.confirmed`
  - `account-registration.waitlist`
  - `account-registration.completed`

## Validation

- `npm.cmd run check:i18n` -> passed
- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

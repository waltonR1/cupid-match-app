# Design Token Execution Account Round 2

## Scope

- Included: `account`
- Goal: remove account usage of generic `accent` and non-action `action-primary` classes

## Why

Account used `next-semantic-accent-secondary` and `next-semantic-action-primary` for several unrelated roles:

- active account navigation
- membership/current/visibility badges
- unread and enabled state badges
- list marker dots
- inline open/action text
- account event registration status cards

These are not the same UI semantics and should not share a single global accent/action token.

## Changes

### 1. Added account component tokens

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `next.component.account-nav.current-border`
- `next.component.account-badge.tier.{border,background,text}`
- `next.component.account-badge.visibility.{border,background,text}`
- `next.component.account-badge.current.{border,background,text}`
- `next.component.account-badge.enabled.{border,background,text}`
- `next.component.account-badge.unread.{border,background,text}`
- `next.component.account-list-marker.{default,emphasis}`
- `next.component.account-registration.confirmed.{card-border,card-background,badge-border,badge-background,badge-text}`
- `next.component.account-registration.waitlist.{card-border,card-background,badge-border,badge-background,badge-text}`
- `next.component.account-registration.completed.{card-border,card-background,badge-border,badge-background,badge-text}`

These stay in `component` because they are account-specific roles and should not pollute global semantic tokens.

### 2. Replaced active navigation and badges

Updated:

- [AccountPrimaryNav.vue](/mnt/d/uniapp/cupid-match/src/components/account/AccountPrimaryNav.vue)
- [profile.vue](/mnt/d/uniapp/cupid-match/src/pages/account/profile.vue)
- [connections.vue](/mnt/d/uniapp/cupid-match/src/pages/account/connections.vue)
- [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue)
- [messages.vue](/mnt/d/uniapp/cupid-match/src/pages/account/messages.vue)
- [safety.vue](/mnt/d/uniapp/cupid-match/src/pages/account/safety.vue)
- [verification.vue](/mnt/d/uniapp/cupid-match/src/pages/account/verification.vue)

Representative replacements:

- `border-next-semantic-accent-secondary`
  -> account-specific badge/nav/status border tokens
- `text-next-semantic-accent-secondary`
  -> account-specific badge text tokens or `text-next-semantic-text-link`
- `bg-next-semantic-action-primary`
  -> account-specific enabled/unread/status/marker tokens

### 3. Replaced account activity status tones

Updated [activity.vue](/mnt/d/uniapp/cupid-match/src/pages/account/activity.vue):

- confirmed registration tone
  -> `next.component.account-registration.confirmed.*`
- waitlist registration tone
  -> `next.component.account-registration.waitlist.*`
- completed registration tone
  -> `next.component.account-registration.completed.*`

## Search Result

- Remaining account `next-semantic-accent-*` matches: `0`
- Remaining account direct `next-semantic-action-primary*` matches: `0`
- Remaining account `next-semantic-surface-info-card` matches: `4`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

# Design Token Execution Round 12

## Scope

- Excluded: `account`, `discovery`
- Goal: remove the incorrect `home-membership` badge token and converge silver tier badge semantics onto a single membership token

## Why

`next-component-home-membership-badge` was only used once, in the silver card inside `HomeMembership`.

Its real role was not "home membership badge". It was the same `silver tier label` semantic already used in:

- [MembershipHero.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipHero.vue)
- [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue)

Keeping a separate `home-*` token for the same tier label added unnecessary divergence.

## Changes

### 1. Removed the incorrect token group

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- removed `next.component.home-membership.badge`

### 2. Unified silver label usage

Updated [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue):

- `text-next-component-home-membership-badge`
  -> `text-next-component-membership-tier-silver-label`

## Search Result

- Remaining `next-component-home-membership-badge` matches: `0`
- Remaining `home-membership` token group definitions: `0`

Current `silver-label` usage points:

- [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue)
- [MembershipHero.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipHero.vue)
- [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue)

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

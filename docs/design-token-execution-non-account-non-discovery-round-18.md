# Design Token Execution Round 18

## Scope

- Excluded from audit: `account`, `discovery`
- Goal: make the free membership tier card token match its actual semantic role

## Why

The free membership tier used:

- `membership-tier.free.panel-background`
- `membership-tier.free.panel-border`

But the actual UI is not a generic layout panel. It is the free tier card in the membership tier group, used by:

- [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue)
- [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue)

So `card` is the stricter semantic name. `feature-*` and `button-*` were left unchanged because they already refer to distinct sub-parts of the free tier card.

## Changes

### 1. Renamed free tier card tokens

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `membership-tier.free.panel-background`
  -> `membership-tier.free.card-background`
- `membership-tier.free.panel-border`
  -> `membership-tier.free.card-border`

### 2. Replaced non-account usage

Updated [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue):

- `border-next-component-membership-tier-free-panel-border`
  -> `border-next-component-membership-tier-free-card-border`
- `bg-next-component-membership-tier-free-panel-background`
  -> `bg-next-component-membership-tier-free-card-background`

Updated [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue):

- `border-next-component-membership-tier-free-panel-border`
  -> `border-next-component-membership-tier-free-card-border`
- `bg-next-component-membership-tier-free-panel-background`
  -> `bg-next-component-membership-tier-free-card-background`

### 3. Mechanically synchronized account reference

Updated [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue):

- `border-next-component-membership-tier-free-panel-border`
  -> `border-next-component-membership-tier-free-card-border`
- `bg-next-component-membership-tier-free-panel-background`
  -> `bg-next-component-membership-tier-free-card-background`

This was a mechanical sync only. `account` remains excluded from this audit pass.

## Search Result

- Remaining `next-component-membership-tier-free-panel-*` matches: `0`
- New `next-component-membership-tier-free-card-*` matches:
  - [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue)
  - [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue)
  - [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue)

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

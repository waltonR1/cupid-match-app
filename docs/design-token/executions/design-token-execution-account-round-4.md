# Design Token Execution Account Round 4

## Scope

- Included: `account`
- Goal: align the free membership tier feature cards with the shared membership tier semantics

## Why

In [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue), the free plan card already used `next.component.membership-tier.free.card-*`, but its feature cells still used generic semantic surface and border tokens:

- `border-next-semantic-border-soft`
- `bg-next-semantic-surface-card`

The public membership page already has strict tier feature tokens for the same UI role, so account should use the same membership tier semantics.

## Changes

Updated [membership.vue](/mnt/d/uniapp/cupid-match/src/pages/account/membership.vue):

- `border-next-semantic-border-soft`
  -> `border-next-component-membership-tier-free-feature-border`
- `bg-next-semantic-surface-card`
  -> `bg-next-component-membership-tier-free-feature-background`

## Search Result

- Account free membership feature cells now use `next-component-membership-tier-free-feature-*`
- Remaining account `next-semantic-accent-*` matches: `0`
- Remaining account direct `next-semantic-action-primary*` matches: `0`
- Remaining account `next-semantic-surface-info-card` matches: `0`
- Remaining account legacy utility / opacity matches: `0`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

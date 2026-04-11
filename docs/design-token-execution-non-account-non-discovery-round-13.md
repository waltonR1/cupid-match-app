# Design Token Execution Round 13

## Scope

- Excluded: `account`, `discovery`
- Goal: rename the misleading membership bullet token so its name matches its actual role

## Why

`next-component-membership-tier-bullet` was not a tier-specific token.

It was used as the shared list marker for:

- silver feature list
- gold feature list
- diamond feature list
- free feature list

All within [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue).

That makes it a membership feature-list token, not a tier token.

## Changes

### 1. Renamed the token group

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- removed:
  - `next.component.membership-tier.bullet`
- added:
  - `next.component.membership-feature.bullet`

### 2. Replaced usages

Updated [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue):

- `text-next-component-membership-tier-bullet`
  -> `text-next-component-membership-feature-bullet`

## Search Result

- Remaining `next-component-membership-tier-bullet` matches: `0`
- Current `next-component-membership-feature-bullet` matches: `12`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

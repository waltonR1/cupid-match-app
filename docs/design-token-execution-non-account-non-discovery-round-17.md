# Design Token Execution Round 17

## Scope

- Excluded: `account`, `discovery`
- Goal: split decorative `accent-line` and `divider` semantics inside `membership-tier` cards

## Why

The tier cards still had inconsistent line semantics:

- `membership-tier.silver.line` was used for both accent lines and the full divider
- `membership-tier.gold.divider` was used for both accent lines and the full divider
- `membership-tier.diamond.line` was only used as an accent line

That made the token names unreliable. The same role should use the same semantic shape across tiers:

- `accent-line` for top strip and short decorative line
- `divider` for the full-width content separator

## Changes

### 1. Normalized tier line tokens

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `membership-tier.silver.line`
  -> `membership-tier.silver.accent-line`
- added `membership-tier.silver.divider`
- added `membership-tier.gold.accent-line`
- `membership-tier.diamond.line`
  -> `membership-tier.diamond.accent-line`

`membership-tier.gold.divider` stays, but now only represents the full divider role.

### 2. Replaced decorative line usage

Updated [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue):

- silver top strip and short line
  -> `bg-next-component-membership-tier-silver-accent-line`
- silver full divider
  -> `bg-next-component-membership-tier-silver-divider`
- gold top strip and short line
  -> `bg-next-component-membership-tier-gold-accent-line`
- gold full divider
  -> kept `bg-next-component-membership-tier-gold-divider`
- diamond top strip and short line
  -> `bg-next-component-membership-tier-diamond-accent-line`
- diamond full divider
  -> kept `bg-next-component-membership-tier-diamond-divider`

## Search Result

- Remaining `next-component-membership-tier-silver-line` matches: `0`
- Remaining `next-component-membership-tier-diamond-line` matches: `0`
- Remaining `next-component-membership-tier-gold-divider` non-divider matches: `0`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

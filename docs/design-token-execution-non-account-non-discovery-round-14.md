# Design Token Execution Round 14

## Scope

- Excluded: `account`, `discovery`
- Goal: fix the `membership-tier.diamond` button token branch where one token was incorrectly reused across multiple visual properties

## Why

`next-component-membership-tier-diamond-button` and `...button-hover` were being used for both:

- border
- background fill

That violated the split rule for multi-attribute semantics. The button can remain a membership-diamond local component token, but border and fill must be represented separately.

## Changes

### 1. Split diamond button semantics

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- removed:
  - `next.component.membership-tier.diamond.button`
  - `next.component.membership-tier.diamond.button-hover`
- added:
  - `next.component.membership-tier.diamond.button-border`
  - `next.component.membership-tier.diamond.button-fill`
  - `next.component.membership-tier.diamond.button-border-hover`
  - `next.component.membership-tier.diamond.button-fill-hover`

### 2. Replaced usages

Updated [AppButton.vue](/mnt/d/uniapp/cupid-match/src/components/common/AppButton.vue):

- `border-next-component-membership-tier-diamond-button`
  -> `border-next-component-membership-tier-diamond-button-border`
- `bg-next-component-membership-tier-diamond-button`
  -> `bg-next-component-membership-tier-diamond-button-fill`
- `hover:border-next-component-membership-tier-diamond-button-hover`
  -> `hover:border-next-component-membership-tier-diamond-button-border-hover`
- `hover:bg-next-component-membership-tier-diamond-button-hover`
  -> `hover:bg-next-component-membership-tier-diamond-button-fill-hover`

## Search Result

- Remaining `next-component-membership-tier-diamond-button` matches: `0`
- Remaining `next-component-membership-tier-diamond-button-hover` matches: `0`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

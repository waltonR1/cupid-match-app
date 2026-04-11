# Design Token Execution Round 16

## Scope

- Excluded: `account`, `discovery`
- Goal: make `membership-silver` and `membership-free` button token names match their actual fill semantics

## Why

Two button branches still had imprecise naming:

- `membership-tier.silver.button-background`
- `membership-tier.silver.button-hover`
- `membership-tier.free.button-hover`

Actual usage in [AppButton.vue](/mnt/d/uniapp/cupid-match/src/components/common/AppButton.vue):

- `silver.button-background` was only used as the normal button fill
- `silver.button-hover` was only used as the hover fill
- `free.button-hover` was only used as the hover fill

So `background` / generic `hover` were too vague for the role.

## Changes

### 1. Renamed button fill tokens

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `membership-tier.silver.button-background`
  -> `membership-tier.silver.button-fill`
- `membership-tier.silver.button-hover`
  -> `membership-tier.silver.button-fill-hover`
- `membership-tier.free.button-hover`
  -> `membership-tier.free.button-fill-hover`

### 2. Replaced button context usage

Updated [AppButton.vue](/mnt/d/uniapp/cupid-match/src/components/common/AppButton.vue):

- `bg-next-component-membership-tier-silver-button-background`
  -> `bg-next-component-membership-tier-silver-button-fill`
- `hover:bg-next-component-membership-tier-silver-button-hover`
  -> `hover:bg-next-component-membership-tier-silver-button-fill-hover`
- `hover:bg-next-component-membership-tier-free-button-hover`
  -> `hover:bg-next-component-membership-tier-free-button-fill-hover`

## Search Result

- Remaining `next-component-membership-tier-silver-button-background` matches: `0`
- Remaining `next-component-membership-tier-silver-button-hover` matches: `0`
- Remaining `next-component-membership-tier-free-button-hover` matches: `0`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

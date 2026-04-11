# Design Token Execution Round 11

## Scope

- Excluded: `account`, `discovery`
- Goal: fix the `membership-tier.gold` token branch where one token was incorrectly reused across multiple visual properties

## Why

`next-component-membership-tier-gold-accent` was being used as:

- border
- background fill
- text color
- decorative line
- button hover color

That directly violated the split rule for multi-attribute semantics. The `gold` tier can remain a membership-local component semantic, but its border, fill, label, divider, and hover states must be represented separately.

## Changes

### 1. Split gold tier semantics

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- removed:
  - `next.component.membership-tier.gold.accent`
  - `next.component.membership-tier.gold.accent-hover`
- added:
  - `next.component.membership-tier.gold.border`
  - `next.component.membership-tier.gold.fill`
  - `next.component.membership-tier.gold.label`
  - `next.component.membership-tier.gold.border-hover`
  - `next.component.membership-tier.gold.fill-hover`

Existing token kept and reused more accurately:

- `next.component.membership-tier.gold.divider`

### 2. Replaced usages

Updated files:

- [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json)
- [AppButton.vue](/mnt/d/uniapp/cupid-match/src/components/common/AppButton.vue)
- [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue)
- [MembershipHero.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipHero.vue)
- [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue)

Representative replacements:

- `border-next-component-membership-tier-gold-accent` -> `border-next-component-membership-tier-gold-border`
- `bg-next-component-membership-tier-gold-accent` -> `bg-next-component-membership-tier-gold-fill`
- `text-next-component-membership-tier-gold-accent` -> `text-next-component-membership-tier-gold-label`
- `hover:border-next-component-membership-tier-gold-accent-hover` -> `hover:border-next-component-membership-tier-gold-border-hover`
- `hover:bg-next-component-membership-tier-gold-accent-hover` -> `hover:bg-next-component-membership-tier-gold-fill-hover`

### 3. Corrected line semantics inside the gold card

In [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue), the top decorative rules no longer use the old accent token. They now use:

- `bg-next-component-membership-tier-gold-divider`

This better matches their role as internal separators rather than borders or fills.

## Search Result

- Remaining `next-component-membership-tier-gold-accent` matches in scope: `0`
- Remaining `next-component-membership-tier-gold-accent-hover` matches in scope: `0`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

# Design Token Execution Round 15

## Scope

- Excluded: `account`, `discovery`
- Goal: make membership tier label tokens explicitly describe their badge role

## Why

The existing tokens:

- `membership-tier.silver.label`
- `membership-tier.gold.label`
- `membership-tier.diamond.label`

were not generic labels. They were used specifically for:

- silver badge text
- gold pill/badge text
- diamond badge text

Renaming them to `badge-label` makes the role explicit and avoids another vague `label` bucket.

## Changes

### 1. Renamed tier label tokens

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `membership-tier.silver.label` -> `membership-tier.silver.badge-label`
- `membership-tier.gold.label` -> `membership-tier.gold.badge-label`
- `membership-tier.diamond.label` -> `membership-tier.diamond.badge-label`

### 2. Replaced usages

Updated files:

- [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue)
- [MembershipHero.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipHero.vue)
- [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue)

Representative replacements:

- `text-next-component-membership-tier-silver-label`
  -> `text-next-component-membership-tier-silver-badge-label`
- `text-next-component-membership-tier-gold-label`
  -> `text-next-component-membership-tier-gold-badge-label`
- `text-next-component-membership-tier-diamond-label`
  -> `text-next-component-membership-tier-diamond-badge-label`

## Search Result

- Remaining `next-component-membership-tier-(silver|gold|diamond)-label` matches: `0`

Current badge-label usage points:

- [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue)
- [MembershipHero.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipHero.vue)
- [MembershipTiersSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipTiersSection.vue)

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

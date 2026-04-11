# Design Token Execution Round 9

## Scope

- Excluded: `account`, `discovery`
- Goal: merge duplicated informational/editorial card surface tokens into one shared component token group

## Why

The following token groups had identical values and equivalent usage semantics:

- `about-card.*`
- `contact-card.*`
- `home-vision.point.{background,background-hover,border-hover,line}`
- `membership-rule.card.*`
- `auth.access-card.*`

They are narrower and more accurate than the old `info-card`, but no longer need to exist as five separate local groups. Their shared role is an editorial / informational card surface used across marketing and guidance content.

## Changes

### 1. Added shared component token group

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `next.component.editorial-card.background`
- `next.component.editorial-card.background-hover`
- `next.component.editorial-card.border-hover`
- `next.component.editorial-card.line`

### 2. Removed duplicated definitions

Deleted duplicated surface definitions from:

- `next.component.about-card.*`
- `next.component.contact-card.*`
- `next.component.home-vision.point.{background,background-hover,border-hover,line}`
- `next.component.membership-rule.card.*`
- `next.component.auth.access-card.*`

Kept local tokens that are still page-specific:

- `next.component.about-hero.ghost-title`
- `next.component.home-vision.point-title`
- `next.component.home-vision.quote`
- `next.component.membership-rule.emphasis`
- `next.component.auth.overlay.*`
- `next.component.auth.selection.*`

### 3. Replaced usages

Updated files:

- [AboutAudience.vue](/mnt/d/uniapp/cupid-match/src/components/about/AboutAudience.vue)
- [AboutDifference.vue](/mnt/d/uniapp/cupid-match/src/components/about/AboutDifference.vue)
- [AboutOrigin.vue](/mnt/d/uniapp/cupid-match/src/components/about/AboutOrigin.vue)
- [AboutValues.vue](/mnt/d/uniapp/cupid-match/src/components/about/AboutValues.vue)
- [ContactCases.vue](/mnt/d/uniapp/cupid-match/src/components/contact/ContactCases.vue)
- [ContactGuide.vue](/mnt/d/uniapp/cupid-match/src/components/contact/ContactGuide.vue)
- [ContactInfo.vue](/mnt/d/uniapp/cupid-match/src/components/contact/ContactInfo.vue)
- [HomeVision.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeVision.vue)
- [MembershipRulesSection.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipRulesSection.vue)
- [login.vue](/mnt/d/uniapp/cupid-match/src/pages/auth/login.vue)

Representative replacements:

- `next-component-about-card-background` -> `next-component-editorial-card-background`
- `next-component-contact-card-border-hover` -> `next-component-editorial-card-border-hover`
- `next-component-home-vision-point-line` -> `next-component-editorial-card-line`
- `next-component-membership-rule-card-background-hover` -> `next-component-editorial-card-background-hover`
- `next-component-auth-access-card-background` -> `next-component-editorial-card-background`

## Search Result

- Remaining matches for `next-component-about-card-*` in scope: `0`
- Remaining matches for `next-component-contact-card-*` in scope: `0`
- Remaining matches for `next-component-home-vision-point-(background|background-hover|border-hover|line)` in scope: `0`
- Remaining matches for `next-component-membership-rule-card-*` in scope: `0`
- Remaining matches for `next-component-auth-access-card-*` in scope: `0`

Still intentionally retained:

- `next-component-home-vision-point-title`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

# Non-account / Non-discovery Next Token Execution Round 3

- Date: `2026-04-10`
- Scope: exclude `account` and `discovery`
- Related docs:
  - `docs/design-token-audit-non-account-non-discovery.md`
  - `docs/design-token-replacement-list-non-account-non-discovery.md`
  - `docs/design-token-execution-non-account-non-discovery-round-1.md`
  - `docs/design-token-execution-non-account-non-discovery-round-2.md`

## Strategy

Split the remaining non-account / non-discovery `accent` usages into narrower component semantics.

This round only handles places where the old `accent` token was being used for a more specific role:

- section title emphasis
- inline links
- auth selection state
- header / footer brand and nav emphasis
- hero label hover and secondary action emphasis
- home hero quote and metric emphasis
- contact case emphasis
- membership rule emphasis
- membership tier label / bullet emphasis
- event card title hover

## New token surfaces added in `theme-tokens.json`

- `next.component.section-title-accent`
- `next.component.inline-link`
- `next.component.auth.selection.border`
- `next.component.auth.selection.background`
- `next.component.auth.selection.hover-border`
- `next.component.auth.selection.indicator`
- `next.component.hero.label-hover`
- `next.component.hero-secondary-action.emphasis`
- `next.component.section-action.emphasis`
- `next.component.home-hero.quote-border`
- `next.component.home-hero.metric-value`
- `next.component.home-feature.title`
- `next.component.home-feature.label`
- `next.component.home-vision.quote`
- `next.component.home-vision.point-title`
- `next.component.home-membership.badge`
- `next.component.contact-case.emphasis`
- `next.component.contact-case.default`
- `next.component.contact-case.soft`
- `next.component.membership-rule.emphasis`
- `next.component.membership-tier.bullet`
- `next.component.membership-tier.silver.label`
- `next.component.membership-tier.diamond.label`
- `next.component.footer.brand-wordmark`
- `next.component.footer.brand-tagline`
- `next.component.footer.heading`
- `next.component.footer.nav-indicator`
- `next.component.header.brand-wordmark`
- `next.component.header.brand-tagline`
- `next.component.header.nav-current`
- `next.component.header.nav-indicator`
- `next.component.header.nav-indicator-hover`
- `next.component.header.ghost-label`
- `next.component.header.ghost-label-hover`
- `next.component.header.menu-selected-label`
- `next.component.event-card.title-hover`

## Files changed

- `src/constants/theme-tokens.json`
- `src/components/common/AppButton.vue`
- `src/components/layout/AppHeader.vue`
- `src/components/layout/AppFooter.vue`
- `src/pages/auth/login.vue`
- `src/pages/auth/register.vue`
- `src/components/events/EventDetailRelatedProfiles.vue`
- `src/components/events/EventsHero.vue`
- `src/components/events/EventsScheduleList.vue`
- `src/components/about/AboutAudience.vue`
- `src/components/about/AboutDifference.vue`
- `src/components/about/AboutOrigin.vue`
- `src/components/about/AboutValues.vue`
- `src/components/contact/ContactCases.vue`
- `src/components/contact/ContactGuide.vue`
- `src/components/contact/ContactInfo.vue`
- `src/components/home/HomeAudience.vue`
- `src/components/home/HomeEventsPreview.vue`
- `src/components/home/HomeFamily.vue`
- `src/components/home/HomeFeatures.vue`
- `src/components/home/HomeHero.vue`
- `src/components/home/HomeMembership.vue`
- `src/components/home/HomeProfilesPreview.vue`
- `src/components/home/HomeVision.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipRulesSection.vue`
- `src/components/membership/MembershipTiersSection.vue`

## Direct replacement map

### Section title emphasis

- `text-next-semantic-accent-primary`
  -> `text-next-component-section-title-accent`

Used in:

- `AboutAudience`
- `AboutDifference`
- `AboutOrigin`
- `AboutValues`
- `ContactCases`
- `ContactGuide`
- `ContactInfo`
- `HomeAudience`
- `HomeEventsPreview`
- `HomeFamily`
- `HomeFeatures`
- `HomeMembership`
- `HomeProfilesPreview`
- `HomeVision`
- `MembershipRulesSection`
- `MembershipTiersSection`

### Inline link emphasis

- `text-next-semantic-accent-secondary`
  -> `text-next-component-inline-link`

Used in:

- `src/pages/auth/login.vue`
- `src/pages/auth/register.vue`

### Header / footer emphasis

- `text-next-semantic-accent-primary`
  -> `text-next-component-header-brand-wordmark`
  -> `text-next-component-header-nav-current`
  -> `text-next-component-footer-brand-wordmark`
- `text-next-semantic-accent-secondary`
  -> `text-next-component-header-brand-tagline`
  -> `text-next-component-footer-brand-tagline`
  -> `text-next-component-footer-heading`
  -> `text-next-component-header-ghost-label`
  -> `text-next-component-header-ghost-label-hover`
  -> `text-next-component-header-menu-selected-label`
- `bg-next-semantic-accent-primary`
  -> `bg-next-component-header-nav-indicator`
  -> `bg-next-component-header-nav-indicator-hover`
  -> `bg-next-component-footer-nav-indicator`

### Auth selection state

- `border-next-semantic-accent-secondary`
  -> `border-next-component-auth-selection-border`
- `bg-next-semantic-accent-secondary`
  -> `bg-next-component-auth-selection-background`
- `hover:border-next-semantic-accent-secondary`
  -> `hover:border-next-component-auth-selection-hover-border`
- `bg-next-semantic-accent-secondary`
  -> `bg-next-component-auth-selection-indicator`

Used in:

- `src/pages/auth/register.vue`

### Hero and event emphasis

- `group-hover:text-next-semantic-accent-muted`
  -> `group-hover:text-next-component-hero-label-hover`
- `group-hover:text-next-semantic-accent-muted`
  -> `group-hover:text-next-component-event-card-title-hover`
- `text-next-semantic-accent-primary`
  -> `text-next-component-home-hero-metric-value`
- `border-next-semantic-accent-secondary`
  -> `border-next-component-home-hero-quote-border`

Used in:

- `src/components/events/EventsHero.vue`
- `src/components/events/EventDetailRelatedProfiles.vue`
- `src/components/events/EventsScheduleList.vue`
- `src/components/home/HomeHero.vue`

### Membership emphasis

- `text-next-semantic-accent-secondary`
  -> `text-next-component-home-membership-badge`
  -> `text-next-component-membership-tier-silver-label`
  -> `text-next-component-membership-tier-diamond-label`
- `text-next-semantic-accent-primary`
  -> `text-next-component-membership-rule-emphasis`
  -> `text-next-component-membership-tier-bullet`

Used in:

- `src/components/home/HomeMembership.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipRulesSection.vue`
- `src/components/membership/MembershipTiersSection.vue`

### Contact case emphasis

- `text-next-semantic-accent-primary`
  -> `text-next-component-contact-case-emphasis`
  -> `text-next-component-contact-case-default`
- `text-next-semantic-accent-secondary`
  -> `text-next-component-contact-case-soft`

Used in:

- `src/components/contact/ContactCases.vue`

## Result

- Remaining `next-semantic-accent-(primary|secondary|muted)` usages in non-account / non-discovery scope: `0`
- The direct replacement phase of the current `accent` split is complete

## Incidental compile-safe cleanup

While finishing the encoding-affected Home files, two non-token fixes were applied so the SFCs remain valid:

- Restored a missing closing quote in one `icon` string in `src/components/home/HomeFeatures.vue`
- Normalized malformed membership bullet glyph nodes in `src/components/home/HomeMembership.vue` to ASCII `-`

## Validation

- `npm.cmd run type-check`
- `npm.cmd run build:h5`

## Still pending after this round

- Semantic narrowing for `surface-info-card`
- Effect rename for `next-gradient-home-membership-*`
- Promotion review for cross-page component tokens that may belong in `semantic`

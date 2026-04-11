# Non-account / Non-discovery Next Token Execution Round 5

- Date: `2026-04-10`
- Scope: exclude `account` and `discovery`
- Related docs:
  - `docs/design-token/audits/design-token-audit-non-account-non-discovery.md`
  - `docs/design-token/mappings/design-token-replacement-list-non-account-non-discovery.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-1.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-2.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-3.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-4.md`

## Strategy

Stop using the generic `next.semantic.surface.info-card` family for local module cards.

This round splits the remaining non-account / non-discovery `info-card` usage into module-scoped component surfaces:

- `about-card`
- `contact-card`
- `home-vision.point`
- `membership-rule.card`
- `auth.access-card`

## Actual changes

- Added module-scoped surface tokens for About cards
- Added module-scoped surface tokens for Contact cards
- Added module-scoped surface tokens for Home Vision point cards
- Added module-scoped surface tokens for Membership Rule tag cards
- Added module-scoped surface tokens for Login access cards
- Replaced all remaining non-account / non-discovery `surface-info-card` usages with the new component tokens
- Replaced the remaining non-account / non-discovery `info-card` hover border / hover surface / top line tokens with module-scoped tokens

## New token surfaces

### `next.component.about-card`

- `background`
- `background-hover`
- `border-hover`
- `line`

### `next.component.contact-card`

- `background`
- `background-hover`
- `border-hover`
- `line`

### `next.component.home-vision.point`

- `background`
- `background-hover`
- `border-hover`
- `line`

### `next.component.membership-rule.card`

- `background`
- `background-hover`
- `border-hover`

### `next.component.auth.access-card`

- `background`
- `background-hover`
- `border-hover`

## Files changed

- `src/constants/theme-tokens.json`
- `src/components/about/AboutAudience.vue`
- `src/components/about/AboutDifference.vue`
- `src/components/about/AboutOrigin.vue`
- `src/components/about/AboutValues.vue`
- `src/components/contact/ContactCases.vue`
- `src/components/contact/ContactGuide.vue`
- `src/components/contact/ContactInfo.vue`
- `src/components/home/HomeVision.vue`
- `src/components/membership/MembershipRulesSection.vue`
- `src/pages/auth/login.vue`

## Class mapping

### About cards

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-about-card-background`
- `hover:bg-next-semantic-surface-info-card-hover`
  -> `hover:bg-next-component-about-card-background-hover`
- `hover:border-next-semantic-border-info-card-hover`
  -> `hover:border-next-component-about-card-border-hover`
- `bg-next-component-info-card-line`
  -> `bg-next-component-about-card-line`

Used in:

- `src/components/about/AboutAudience.vue`
- `src/components/about/AboutDifference.vue`
- `src/components/about/AboutOrigin.vue`
- `src/components/about/AboutValues.vue`

### Contact cards

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-contact-card-background`
- `hover:bg-next-semantic-surface-info-card-hover`
  -> `hover:bg-next-component-contact-card-background-hover`
- `hover:border-next-semantic-border-info-card-hover`
  -> `hover:border-next-component-contact-card-border-hover`
- `bg-next-component-info-card-line`
  -> `bg-next-component-contact-card-line`

Used in:

- `src/components/contact/ContactCases.vue`
- `src/components/contact/ContactGuide.vue`
- `src/components/contact/ContactInfo.vue`

### Home Vision point cards

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-home-vision-point-background`
- `hover:bg-next-semantic-surface-info-card-hover`
  -> `hover:bg-next-component-home-vision-point-background-hover`
- `hover:border-next-semantic-border-info-card-hover`
  -> `hover:border-next-component-home-vision-point-border-hover`
- `bg-next-component-info-card-line`
  -> `bg-next-component-home-vision-point-line`

Used in:

- `src/components/home/HomeVision.vue`

### Membership Rule cards

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-membership-rule-card-background`
- `hover:bg-next-semantic-surface-info-card-hover`
  -> `hover:bg-next-component-membership-rule-card-background-hover`
- `hover:border-next-semantic-border-info-card-hover`
  -> `hover:border-next-component-membership-rule-card-border-hover`

Used in:

- `src/components/membership/MembershipRulesSection.vue`

### Auth access cards

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-auth-access-card-background`
- `hover:bg-next-semantic-surface-info-card-hover`
  -> `hover:bg-next-component-auth-access-card-background-hover`
- `hover:border-next-semantic-border-info-card-hover`
  -> `hover:border-next-component-auth-access-card-border-hover`

Used in:

- `src/pages/auth/login.vue`

## Result

- Remaining non-account / non-discovery usages of:
  - `next-semantic-surface-info-card`: `0`
  - `next-semantic-surface-info-card-hover`: `0`
  - `next-semantic-border-info-card-hover`: `0`
  - `next-component-info-card-line`: `0`
- The remaining local informational cards in this scope now use module-scoped component semantics instead of a generic semantic surface

## Validation

- `npm.cmd run type-check`
- `npm.cmd run build:h5`

## Still pending after this round

- review whether the newly introduced cross-file component surfaces should stay component or later be lifted into a more stable shared semantic layer
- review remaining cross-page component tokens such as `section-line`, `section-eyebrow`, `card-label`, `emphasis-card`, and `section-card.hover-border`

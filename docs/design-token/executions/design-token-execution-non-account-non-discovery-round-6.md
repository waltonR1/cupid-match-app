# Non-account / Non-discovery Next Token Execution Round 6

- Date: `2026-04-10`
- Scope: exclude `account` and `discovery`
- Related docs:
  - `docs/design-token/audits/design-token-audit-non-account-non-discovery.md`
  - `docs/design-token/mappings/design-token-replacement-list-non-account-non-discovery.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-1.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-2.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-3.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-4.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-5.md`

## Strategy

Promote the stable shared section / label / emphasis tokens from `next.component` to `next.semantic`.

This round only promotes semantics that are already clearly cross-page in the audited scope:

- eyebrow text
- eyebrow marker line
- card label text
- section title highlight text
- emphasis surface
- emphasis border
- emphasis divider line
- generic card hover border

The old component token definitions are kept for compatibility while `account` and `discovery` are still excluded.

## New semantic aliases added

### `next.semantic.text`

- `eyebrow`
- `card-label`
- `section-highlight`

### `next.semantic.surface`

- `emphasis`

### `next.semantic.border`

- `eyebrow`
- `card-hover`
- `emphasis`
- `emphasis-divider`

## Class mapping

### Section eyebrow

- `bg-next-component-section-line`
  -> `bg-next-semantic-border-eyebrow`
- `text-next-component-section-eyebrow`
  -> `text-next-semantic-text-eyebrow`

### Card label

- `text-next-component-card-label`
  -> `text-next-semantic-text-card-label`

### Section title highlight

- `text-next-component-section-title-accent`
  -> `text-next-semantic-text-section-highlight`

### Emphasis surface

- `bg-next-component-emphasis-card-background`
  -> `bg-next-semantic-surface-emphasis`
- `border-next-component-emphasis-card-border`
  -> `border-next-semantic-border-emphasis`
- `bg-next-component-emphasis-card-line`
  -> `bg-next-semantic-border-emphasis-divider`

### Generic interactive card hover border

- `hover:border-next-component-section-card-hover-border`
  -> `hover:border-next-semantic-border-card-hover`

## Files changed

- `src/constants/theme-tokens.json`
- `src/components/about/AboutAudience.vue`
- `src/components/about/AboutDifference.vue`
- `src/components/about/AboutHero.vue`
- `src/components/about/AboutOrigin.vue`
- `src/components/about/AboutValues.vue`
- `src/components/contact/ContactCases.vue`
- `src/components/contact/ContactGuide.vue`
- `src/components/contact/ContactHero.vue`
- `src/components/contact/ContactInfo.vue`
- `src/components/events/EventDetailAgenda.vue`
- `src/components/events/EventDetailHero.vue`
- `src/components/events/EventDetailNotes.vue`
- `src/components/events/EventDetailRelatedProfiles.vue`
- `src/components/events/EventOverviewCard.vue`
- `src/components/events/EventsFeaturedGrid.vue`
- `src/components/events/EventsHero.vue`
- `src/components/events/EventsScheduleList.vue`
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
- `src/pages/auth/login.vue`
- `src/pages/auth/register.vue`

## Incidental encoding-safe cleanup

Because the bulk replacement step touched many UTF-8 files in PowerShell, two code-level fixes were applied to keep script literals stable:

- Replaced `AboutHero` icon literals with Unicode escape sequences
- Replaced `HomeEventsPreview` Chinese field labels and status labels with Unicode escape sequences

After that, all BOM-prefixed files touched in this round were normalized back to UTF-8 without BOM.

## Result

- Remaining non-account / non-discovery usages of:
  - `next-component-section-line`: `0`
  - `next-component-section-eyebrow`: `0`
  - `next-component-card-label`: `0`
  - `next-component-section-title-accent`: `0`
  - `next-component-emphasis-card-background`: `0`
  - `next-component-emphasis-card-border`: `0`
  - `next-component-emphasis-card-line`: `0`
  - `next-component-section-card-hover-border`: `0`
- The audited scope now uses semantic tokens for the stable cross-page section / label / emphasis patterns

## Validation

- `npm.cmd run type-check`
- `npm.cmd run build:h5`
- UTF-8 BOM scan across `src`: no matches

## Still pending after this round

- decide whether `text.section-highlight` should remain distinct from other future highlight semantics
- decide whether the remaining module-scoped component surfaces from round 5 should stay local or be lifted later
- review the remaining component-only tokens that are still intentionally module-specific

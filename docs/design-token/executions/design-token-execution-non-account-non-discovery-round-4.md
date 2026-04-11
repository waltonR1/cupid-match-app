# Non-account / Non-discovery Next Token Execution Round 4

- Date: `2026-04-10`
- Scope: exclude `account` and `discovery`
- Related docs:
  - `docs/design-token/audits/design-token-audit-non-account-non-discovery.md`
  - `docs/design-token/mappings/design-token-replacement-list-non-account-non-discovery.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-1.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-2.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-3.md`

## Strategy

Handle the next two semantic issues after the direct `accent` split:

- narrow `surface-info-card` where it was being used for event-domain recommendation cards
- rename shared membership gradients so they no longer carry the incorrect `home-` prefix

## Actual changes

- Added `next.component.event-card.border-hover`
- Switched `EventDetailRelatedProfiles` from generic `info-card` surface tokens to `event-card` surface tokens
- Renamed shared membership gradients from `home-membership-*` to shared membership effect names
- Updated all non-account / non-discovery references to the renamed membership effect tokens

## Token changes

### Added

- `next.component.event-card.border-hover`

### Renamed

- `next.effect.gradient.home-membership-ambient`
  -> `next.effect.gradient.membership-showcase-ambient`
- `next.effect.gradient.home-membership-silver-card`
  -> `next.effect.gradient.membership-tier-silver-card`
- `next.effect.gradient.home-membership-silver-glow`
  -> `next.effect.gradient.membership-tier-silver-glow`
- `next.effect.gradient.home-membership-gold-card`
  -> `next.effect.gradient.membership-tier-gold-card`
- `next.effect.gradient.home-membership-gold-glow`
  -> `next.effect.gradient.membership-tier-gold-glow`
- `next.effect.gradient.home-membership-diamond-card`
  -> `next.effect.gradient.membership-tier-diamond-card`
- `next.effect.gradient.home-membership-diamond-glow`
  -> `next.effect.gradient.membership-tier-diamond-glow`

## Files changed

- `src/constants/theme-tokens.json`
- `src/components/events/EventDetailRelatedProfiles.vue`
- `src/components/home/HomeMembership.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipTiersSection.vue`

## Compatibility alignment outside the audit scope

Because the membership effect rename is shared infrastructure, one excluded account file also needed a mechanical rename so styles do not break:

- `src/pages/account/membership.vue`

## Class mapping

### Event related profile card

- `bg-next-semantic-surface-info-card`
  -> `bg-next-component-event-card-background`
- `hover:bg-next-semantic-surface-info-card-hover`
  -> `hover:bg-next-component-event-card-background-hover`
- `hover:border-next-semantic-border-info-card-hover`
  -> `hover:border-next-component-event-card-border-hover`

Used in:

- `src/components/events/EventDetailRelatedProfiles.vue`

### Membership gradients

- `bg-next-gradient-home-membership-ambient`
  -> `bg-next-gradient-membership-showcase-ambient`
- `bg-next-gradient-home-membership-silver-card`
  -> `bg-next-gradient-membership-tier-silver-card`
- `bg-next-gradient-home-membership-silver-glow`
  -> `bg-next-gradient-membership-tier-silver-glow`
- `bg-next-gradient-home-membership-gold-card`
  -> `bg-next-gradient-membership-tier-gold-card`
- `bg-next-gradient-home-membership-gold-glow`
  -> `bg-next-gradient-membership-tier-gold-glow`
- `bg-next-gradient-home-membership-diamond-card`
  -> `bg-next-gradient-membership-tier-diamond-card`
- `bg-next-gradient-home-membership-diamond-glow`
  -> `bg-next-gradient-membership-tier-diamond-glow`

Used in:

- `src/components/home/HomeMembership.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipTiersSection.vue`

## Result

- Remaining `next-gradient-home-membership-*` usages in non-account / non-discovery scope: `0`
- `EventDetailRelatedProfiles` no longer uses `info-card` tokens for an event-domain recommendation card

## Validation

- `npm.cmd run type-check`
- `npm.cmd run build:h5`

## Still pending after this round

- broader `surface-info-card` review for whether the remaining About / Contact / HomeVision / Auth / Membership usages should stay semantic or become narrower component surfaces
- promotion review for cross-page component tokens that may belong in `semantic`

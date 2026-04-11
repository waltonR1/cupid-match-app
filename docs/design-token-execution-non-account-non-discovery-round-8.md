# Design Token Execution Round 8

## Scope

- Excluded: `account`, `discovery`
- Goal: continue promoting clearly shared `component` tokens into `semantic` without disturbing local business semantics

## Why

- `hero ornament line` is reused across events, home, membership, and auth hero compositions
- `inline link` is a stable text role, even though it currently appears only in auth agreement copy
- `membership-tier`, `about-card`, `contact-card`, and `event-card` are still business-local groups and should not be promoted just because some values match

## Changes

### 1. Added semantic aliases

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `next.semantic.border.hero-ornament`
- `next.semantic.text.link`

### 2. Replaced shared hero ornament usages

Updated:

- [EventDetailHero.vue](/mnt/d/uniapp/cupid-match/src/components/events/EventDetailHero.vue)
- [EventsHero.vue](/mnt/d/uniapp/cupid-match/src/components/events/EventsHero.vue)
- [HomeHero.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeHero.vue)
- [MembershipHero.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipHero.vue)
- [login.vue](/mnt/d/uniapp/cupid-match/src/pages/auth/login.vue)
- [register.vue](/mnt/d/uniapp/cupid-match/src/pages/auth/register.vue)

Replacement:

- `next-component-hero-ornament-line` -> `next-semantic-border-hero-ornament`

### 3. Replaced inline link usages

Updated:

- [login.vue](/mnt/d/uniapp/cupid-match/src/pages/auth/login.vue)
- [register.vue](/mnt/d/uniapp/cupid-match/src/pages/auth/register.vue)

Replacement:

- `next-component-inline-link` -> `next-semantic-text-link`

## Kept As Component On Purpose

These still remain local and were not promoted:

- `next-component-auth-overlay-background-soft`
  - auth-only overlay surface
- `next-component-hero-ornament-line-secondary`
  - detail-hero-only ornament layer
- `next-component-hero-ornament-line-tertiary`
  - detail-hero-only ornament layer
- `next-component-hero-ornament-fill`
  - home-hero-only decorative fill
- `next-component-membership-tier-*`
  - business-local membership presentation tokens shared only inside membership surfaces
- `next-component-about-card-*`
  - about-page editorial card tokens
- `next-component-contact-card-*`
  - contact-page card tokens
- `next-component-event-card-*`
  - events-domain card tokens

## Search Result

- Remaining `next-component-inline-link` matches in scope: `0`
- Remaining exact `next-component-hero-ornament-line` matches in scope: `0`

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

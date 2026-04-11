# Design Token Execution Round 7

## Scope

- Excluded: `account`, `discovery`
- Goal: promote stable shared `hero` tokens from `next.component.hero.*` usage to `next.semantic.*`

## Why

- `hero` border / body text / label / eyebrow / highlight / soft-panel surface are now reused across about, contact, events, home, membership, auth
- These values are no longer local component semantics
- Keep `auth`-only overlay and interactive affordance tokens in `component`

## Changes

### 1. Added semantic hero aliases

Updated [theme-tokens.json](/mnt/d/uniapp/cupid-match/src/constants/theme-tokens.json):

- `next.semantic.surface.hero-soft`
- `next.semantic.surface.hero-panel`
- `next.semantic.text.hero-eyebrow`
- `next.semantic.text.hero-label`
- `next.semantic.text.hero-highlight`
- `next.semantic.text.hero-body`
- `next.semantic.text.hero-secondary`
- `next.semantic.border.hero`

### 2. Replaced shared hero usages

Updated files:

- [AboutHero.vue](/mnt/d/uniapp/cupid-match/src/components/about/AboutHero.vue)
- [ContactHero.vue](/mnt/d/uniapp/cupid-match/src/components/contact/ContactHero.vue)
- [AgreementDialog.vue](/mnt/d/uniapp/cupid-match/src/components/common/AgreementDialog.vue)
- [EventDetailHero.vue](/mnt/d/uniapp/cupid-match/src/components/events/EventDetailHero.vue)
- [EventsHero.vue](/mnt/d/uniapp/cupid-match/src/components/events/EventsHero.vue)
- [HomeHero.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeHero.vue)
- [MembershipHero.vue](/mnt/d/uniapp/cupid-match/src/components/membership/MembershipHero.vue)
- [login.vue](/mnt/d/uniapp/cupid-match/src/pages/auth/login.vue)
- [register.vue](/mnt/d/uniapp/cupid-match/src/pages/auth/register.vue)

Representative replacements:

- `border-next-component-hero-border` -> `border-next-semantic-border-hero`
- `bg-next-component-hero-overlay-background-panel` -> `bg-next-semantic-surface-hero-panel`
- `bg-next-component-hero-overlay-background-soft` -> `bg-next-semantic-surface-hero-soft`
- `text-next-component-hero-eyebrow` -> `text-next-semantic-text-hero-eyebrow`
- `text-next-component-hero-label` -> `text-next-semantic-text-hero-label`
- `text-next-component-hero-title-accent` -> `text-next-semantic-text-hero-highlight`
- `text-next-component-hero-description` -> `text-next-semantic-text-hero-body`
- `text-next-component-hero-secondary-description` -> `text-next-semantic-text-hero-secondary`

### 3. Kept as component on purpose

These are still local interaction or auth-only semantics:

- `next-component-auth-overlay-background-soft`
- `next-component-hero-label-hover`
- `next-component-hero-affordance`
- `next-component-hero-affordance-hover`
- `next-component-hero-ornament-line`

## Search Result

- Remaining old shared hero token matches in scope: `0`
- Intentionally retained `hero` component match:
  - `group-hover:text-next-component-hero-label-hover` in [EventsHero.vue](/mnt/d/uniapp/cupid-match/src/components/events/EventsHero.vue)

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

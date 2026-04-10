# Account Overview Design Token Mapping

> Status: legacy audit only. Superseded on 2026-04-10 by benchmark-first rewrite strategy.
>
> Account should not be implemented by following current page structure or current class mapping.
> Use `docs/design-token-account-benchmark-rewrite.md` as the rewrite baseline.

## Scope

- `src/pages/account/index.vue`
- `src/components/account/AccountPageShell.vue`
- `src/components/account/AccountPerspectiveGrid.vue`
- `src/components/account/AccountSubnav.vue`

## Background Analysis

### `AccountPageShell`

- `bg-page-base`: `page.default`
- `bg-home-hero` / `bg-events-hero` / `bg-membership-hero`: `effect.gradient.*`
- `bg-decor-glow`: account hero local effect, not `page` or `surface`
- `bg-decor-ambient`: account hero local effect, not `page` or `surface`
- `bg-surface-inverse-panel/35`: hero eyebrow overlay surface
- `bg-surface-inverse-panel/70`: hero stat card overlay surface

### `AccountPerspectiveGrid`

- `bg-surface-card`: `surface.card`
- `bg-surface-card-soft`: account highlight surface
- `bg-surface-panel`: compact badge surface
- `bg-surface-inverse-panel`: account inverse panel surface
- `bg-brand-accent/10`: highlight badge surface
- `bg-white/5`: inverse chip surface

### `AccountSubnav`

- `bg-button-accent`: active action surface
- `bg-surface-card-soft`: inactive soft surface
- `hover:bg-surface-panel`: inactive hover surface

### `account/index.vue`

- `bg-surface-base`: `surface.panel`
- `hover:bg-surface-card`: interactive card hover surface
- `bg-surface-card`: compact neutral badge surface
- `bg-surface-card-soft`: account highlight panel surface
- `bg-button-accent/10` / `bg-button-accent/15`: highlight badge surface
- `bg-brand-accent`: accent dot

## Text Analysis

- `text-text-heading`: `text.primary`
- `text-text-body`: `text.secondary`
- `text-text-body-soft`: `text.muted`
- `text-text-subtle`: `text.subtle`
- `text-text-inverse`: `text.inverse`
- `text-text-inverse-soft`: inverse secondary text
- `text-text-inverse-muted`: inverse muted text
- `text-brand-support`: section eyebrow / section label
- `text-brand-accent`: hero stat label
- `text-brand-accent-foreground`: hero eyebrow / inverse panel eyebrow
- `text-brand-accent-strong`: highlight text, not generic body text
- `text-button-neutral-ink`: action primary contrast text

## Border Analysis

- `border-border-base`: `border.default`
- `border-border-soft`: `border.soft`
- `border-border-accent`: strong accent border
- `hover:border-border-accent`: interactive card hover border
- `border-border-accent/35`: account highlight panel border
- `border-border-accent/50`: highlight badge border
- `border-border-inverse`: account inverse panel / hero overlay border
- `border-border-inverse-hover`: inverse chip border
- `border-button-accent`: active action border

## Issues Identified

- Same semantic split across multiple tokens:
  - section label uses both `text-brand-support` and `text-brand-accent-strong`
  - highlight badges use both `bg-button-accent/10` and `bg-button-accent/15`
  - highlight containers use `border-border-accent`, `border-border-accent/35`, `border-border-accent/50`
  - content cards mix `bg-surface-base`, `bg-surface-card`, `bg-surface-card-soft` without a stable semantic boundary
- Opacity usage exists:
  - `bg-surface-inverse-panel/35`
  - `bg-surface-inverse-panel/70`
  - `bg-button-accent/10`
  - `bg-button-accent/15`
  - `bg-brand-accent/10`
  - `border-border-accent/35`
  - `border-border-accent/50`
  - `bg-white/5`
  - `opacity-90`
  - `opacity-80`
- Semantic mismatch exists:
  - `button.*` token is used as badge background, not action
  - `brand.accent-foreground` is used as hero/inverse eyebrow label, not foreground-on-accent text
  - `decor-*` effect is combined with wrapper opacity, so the page is still stitching color at use-site
- No direct `palette` usage found in page/component classes

## Semantic Extraction

### Reuse Existing `next.semantic`

- `page.default`
- `surface.panel`
- `surface.card`
- `surface.soft`
- `text.primary`
- `text.secondary`
- `text.muted`
- `text.subtle`
- `text.inverse`
- `border.default`
- `border.soft`
- `accent.primary`
- `accent.secondary`
- `action.primary`
- `action.primary-hover`
- `action.primary-contrast`

### Add To `next.semantic`

```json
{
  "state": {
    "highlight": {
      "background": "...",
      "border": "...",
      "text": "..."
    }
  }
}
```

Reason:

- `bg-button-accent/10` is already repeated in `account/index.vue`, `account/favorites.vue`, `account/messages.vue`
- this is no longer a single-page color stitch, and it is not action semantics

### Add To `next.component`

```json
{
  "account": {
    "hero": {
      "eyebrow": {
        "background": "..."
      },
      "stat": {
        "background": "..."
      }
    },
    "highlight": {
      "border": "..."
    },
    "inverse-panel": {
      "background": "...",
      "border": "..."
    },
    "inverse-chip": {
      "background": "...",
      "border": "..."
    }
  }
}
```

### Add To `next.effect`

```json
{
  "gradient": {
    "account-hero-glow": "...",
    "account-hero-ambient": "..."
  }
}
```

Reason:

- `decor-glow` and `decor-ambient` are pure effect tokens
- they should absorb final alpha themselves; page code should not keep `opacity-90` / `opacity-80`

## Direct Replacement

### `src/components/account/AccountPageShell.vue`

| Original | Replace with |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `bg-home-hero` | `bg-next-gradient-home-hero` |
| `bg-events-hero` | `bg-next-gradient-events-hero` |
| `bg-membership-hero` | `bg-next-gradient-membership-hero` |
| `opacity-90 + bg-decor-glow` | `bg-next-gradient-account-hero-glow` |
| `opacity-80 + bg-decor-ambient` | `bg-next-gradient-account-hero-ambient` |
| `border-border-inverse bg-surface-inverse-panel/35` | `border-next-component-hero-border bg-next-component-account-hero-eyebrow-background` |
| `bg-brand-accent` | `bg-next-component-section-line` |
| `text-brand-accent-foreground` | `text-next-component-hero-eyebrow` |
| `text-text-inverse` | `text-next-semantic-text-inverse` |
| `text-text-inverse-soft` | `text-next-component-hero-description` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `border-border-inverse bg-surface-inverse-panel/70` | `border-next-component-hero-border bg-next-component-account-hero-stat-background` |
| `text-brand-accent` | `text-next-component-card-label` |
| `text-text-inverse-muted` | `text-next-component-hero-secondary-description` |

### `src/components/account/AccountPerspectiveGrid.vue`

| Original | Replace with |
| --- | --- |
| `border-border-base bg-surface-card` | `border-next-semantic-border-default bg-next-semantic-surface-card` |
| `bg-brand-accent` used for eyebrow line | `bg-next-component-section-line` |
| `text-brand-support` | `text-next-component-section-eyebrow` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `bg-brand-accent` used for bullet dot | `bg-next-semantic-accent-secondary` |
| `border-border-base bg-surface-panel text-text-body-soft` | `border-next-semantic-border-default bg-next-semantic-surface-panel text-next-semantic-text-muted` |
| `border-border-accent/35 bg-surface-card-soft` | `border-next-component-account-highlight-border bg-next-semantic-surface-soft` |
| `border-border-accent/50 bg-brand-accent/10 text-brand-accent-strong` | `border-next-semantic-state-highlight-border bg-next-semantic-state-highlight-background text-next-semantic-state-highlight-text` |
| `border-border-inverse bg-surface-inverse-panel` | `border-next-component-account-inverse-panel-border bg-next-component-account-inverse-panel-background` |
| `text-brand-accent-foreground` | `text-next-component-hero-label` |
| `text-text-inverse` | `text-next-semantic-text-inverse` |
| `text-text-inverse-soft` | `text-next-component-hero-description` |
| `text-text-inverse-muted` | `text-next-component-hero-secondary-description` |
| `border-border-inverse-hover bg-white/5 text-text-inverse` | `border-next-component-account-inverse-chip-border bg-next-component-account-inverse-chip-background text-next-semantic-text-inverse` |

### `src/components/account/AccountSubnav.vue`

| Original | Replace with |
| --- | --- |
| `border-button-accent bg-button-accent text-button-neutral-ink shadow-panel` | `border-next-semantic-action-primary bg-next-semantic-action-primary text-next-semantic-action-primary-contrast shadow-next-shadow-panel` |
| `border-border-base bg-surface-card-soft text-text-body hover:-translate-y-[1px] hover:border-border-accent hover:bg-surface-panel hover:text-text-heading` | `border-next-semantic-border-default bg-next-semantic-surface-soft text-next-semantic-text-secondary hover:-translate-y-[1px] hover:border-next-component-section-card-hover-border hover:bg-next-semantic-surface-panel hover:text-next-semantic-text-primary` |

### `src/pages/account/index.vue`

| Original | Replace with |
| --- | --- |
| `border border-border-base bg-surface-base px-6 py-6 shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:border-border-accent hover:bg-surface-card` | `border border-next-semantic-border-default bg-next-semantic-surface-panel px-6 py-6 shadow-next-shadow-panel transition-all duration-200 hover:-translate-y-[2px] hover:border-next-component-section-card-hover-border hover:bg-next-semantic-surface-card` |
| `border-border-accent bg-surface-card-soft` | `border-next-semantic-accent-secondary bg-next-semantic-surface-soft` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-brand-support` | `text-next-component-section-eyebrow` |
| `border-border-accent bg-button-accent/15 text-brand-accent-strong` | `border-next-semantic-state-highlight-border bg-next-semantic-state-highlight-background text-next-semantic-state-highlight-text` |
| `border-border-soft bg-surface-card text-text-body-soft` | `border-next-semantic-border-soft bg-next-semantic-surface-card text-next-semantic-text-muted` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `border border-border-base bg-surface-base px-7 py-7 shadow-card` | `border border-next-semantic-border-default bg-next-semantic-surface-panel px-7 py-7 shadow-next-shadow-panel` |
| `text-brand-support` | `text-next-component-section-eyebrow` |
| `rounded-full border border-border-accent bg-button-accent/10 px-3 py-1 text-[11px] uppercase tracking-[2px] text-brand-accent-strong` | `rounded-full border border-next-semantic-state-highlight-border bg-next-semantic-state-highlight-background px-3 py-1 text-[11px] uppercase tracking-[2px] text-next-semantic-state-highlight-text` |
| `border-t border-border-soft` | `border-t border-next-semantic-border-soft` |
| `text-text-subtle` | `text-next-semantic-text-subtle` |
| `border border-border-accent/35 bg-surface-card-soft px-7 py-7 shadow-card` | `border border-next-component-account-highlight-border bg-next-semantic-surface-soft px-7 py-7 shadow-next-shadow-panel` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |

## Line-Level Replace Order

### `AccountPageShell.vue`

- line 2
- lines 11-12
- lines 113-124
- lines 130-141
- lines 146-157

### `AccountPerspectiveGrid.vue`

- lines 70-77
- lines 83-90
- lines 95-102

### `AccountSubnav.vue`

- lines 7-9

### `account/index.vue`

- lines 19-20
- lines 24
- lines 29-31
- lines 37
- lines 41
- line 48
- line 51
- line 59
- line 64
- line 72
- line 74
- line 77
- line 84
- line 85
- line 88
- line 96
- line 98

## Convergence Notes

- `bg-button-accent/10` and `bg-button-accent/15` should converge to one `semantic.state.highlight.background`
- `border-border-accent/35` stays local to `component.account.highlight.border`; it is a panel/container border, not badge state
- `border-border-inverse` and `bg-surface-inverse-panel` should not be promoted to global semantic yet; they are currently contained inside account shared components

# Design Token Execution: Discovery Round 5

Date: 2026-04-11

## Scope

- Audited discovery token usage after rollback.
- Kept discovery on the `next` token system.
- Reduced discovery token usage from `55` unique token utilities to `33`.
- Reduced discovery component token utilities from `36` unique to `11`.

## Changes

- Replaced over-specific `component.discovery-hero.*` usage in `DetailHeroPanel.vue` with semantic/accent tokens where the role was generic surface, divider, accent, or text.
- Replaced `component.discovery-detail.tag.*` usage in detail pages with semantic tag styling.
- Replaced `directory-control.selected.*` usage in `DirectoryIntro.vue` because the intro eyebrow is not a selected control.
- Replaced card-internal `semantic.page.subtle` usage with `semantic.surface.panel`.
- Added `semantic.border.interactive-hover` for non-card interactive control hover borders.
- Removed no-longer-used discovery-local token definitions:
  - `component.discovery-hero.*`
  - `component.discovery-detail.*`
  - `component.directory-control.selected.indicator`
  - `component.directory-card.avatar.text`
  - `component.directory-card.footer.text`

## Validation

- `src/constants/theme-tokens.json` parses successfully.
- `tailwind.config.js` generates `next-semantic-border-interactive-hover`.
- Confirmed discovery no longer references removed token utilities.
- Confirmed discovery has no palette references, opacity suffixes, or raw `rgba(` usage.
- Confirmed discovery has `0` unknown next token references after this round.

## Remaining

- The project is not fully next-only at the token system layer because `legacy` still exists in `src/constants/theme-tokens.json` and is still generated in `tailwind.config.js`.
- The remaining discovery single-use component tokens are retained for `DirectoryCardFrame` badge/tag/card-hover semantics.

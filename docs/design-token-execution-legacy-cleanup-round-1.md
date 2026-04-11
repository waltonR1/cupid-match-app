# Design Token Execution Legacy Cleanup Round 1

## Scope

- `src/constants/theme-tokens.json`
- `tailwind.config.js`
- `scripts/generate-token-docs.js`

## Goal

Remove the legacy design-token data and generation path after source usage has moved to `next-*` utilities.

## Baseline

- Source legacy utility scan before cleanup: `0`
- Source opacity utility scan before cleanup: `0`
- Source palette / `next-palette` usage before cleanup: `0`

## Non-Goals

- Do not change `src/i18n/index.ts` `legacy: false`; it is Vue I18n mode configuration, not a design-token legacy path.
- Do not change dependency names such as `@vitejs/plugin-legacy` in `package-lock.json`; that is unrelated to design tokens.

## Planned Changes

- Remove top-level `legacy` from `theme-tokens.json`.
- Remove legacy Tailwind color/effect utility generation.
- Remove legacy CSS variable generation.
- Update token-doc generation script so it reads `next.themes` instead of the removed legacy root.

## Changes

### 1. Removed legacy token data

Updated `src/constants/theme-tokens.json`:

- removed top-level `legacy`
- kept top-level `next`

### 2. Removed legacy Tailwind generation

Updated `tailwind.config.js`:

- removed `LEGACY_RAW_TOKEN_ROOTS`
- removed `LEGACY_THEME_NAMES`
- removed `legacySharedTokens`
- removed `legacyThemeOverrides`
- removed `legacyBaseThemeTokens`
- removed `buildLegacyTailwindColors`
- removed `buildLegacyRawTokenUtilities`
- removed `buildLegacyThemeVariableMap`
- removed legacy CSS variable injection from `buildThemeBaseStyles`

The generated Tailwind utilities now come from:

- `next.semantic`
- `next.component`
- `next.effect.gradient`
- `next.effect.shadow`

`next.palette` remains internal and still does not generate utilities.

### 3. Rebuilt token docs for next-only structure

Rewrote `scripts/generate-token-docs.js`:

- reads `themeTokens.next.themes`
- scans only `next-*` utilities
- reports unknown next utility references
- documents that legacy utilities are no longer generated
- documents palette as internal-only

Ran `npm.cmd run generate:token-docs`, updating:

- `docs/style-token-usage.md`
- `docs/token-usage-audit.md`

### 4. Fixed unknown next utility references exposed by docs generation

The next-only docs generator initially reported `18` unknown next utility references.

Fixed invalid shadow class names:

- `shadow-next-panel` -> `shadow-next-shadow-panel`
- `shadow-next-about-hero-panel` -> `shadow-next-shadow-about-hero-panel`
- `shadow-next-about-hero-feature` -> `shadow-next-shadow-about-hero-feature`

Added missing next token definitions:

- `next.effect.shadow.hero`
- `next.component.hero-secondary-action.background-hover` in dark theme

After fixes:

- `npm.cmd run generate:token-docs` -> `unknownCount: 0`

## Validation

- Source legacy utility scan -> `0`
- Legacy token data / generation path reference scan under `src` and `scripts` -> `0`
- `docs/token-usage-audit.md` unknown next utility references -> `0`
- `theme-tokens.json` JSON parse -> passed
- `tailwind.config.js` require check -> passed
- `npm.cmd run generate:token-docs` -> passed
- `npm.cmd run check:i18n` -> passed
- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed
- `git diff --check` on touched scope -> passed with CRLF normalization warnings only

## Notes

- `src/i18n/index.ts` still contains `legacy: false`; this is Vue I18n configuration and was intentionally not changed.
- `package-lock.json` may contain dependency names such as `@vitejs/plugin-legacy`; this is unrelated to design-token legacy and was intentionally not changed.

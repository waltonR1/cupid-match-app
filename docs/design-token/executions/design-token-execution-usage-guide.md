# Design Token Execution: Usage Guide

Date: 2026-04-11

## Scope

- Added `docs/token-usage-guide.md` as the manual Chinese guide for developers using design token utilities.
- Removed `docs/design-token/token-usage-guide.md` because `docs/design-token/` is migration/process documentation and may not be part of the long-lived main-branch docs.
- Kept generated token inventory in `docs/design-token/generated/style-token-usage.md`.

## Coverage

- Allowed utility families.
- Disallowed token usage.
- Utility naming format.
- Semantic/component/effect selection order.
- Common semantic tokens.
- Component token boundary.
- Effect token usage.
- Common Vue usage patterns.
- New token naming rules.
- Validation commands.

## Validation

- `node --check scripts/generate-token-docs.js` passed.
- Confirmed these docs exist:
  - `docs/token-usage-guide.md`
  - `docs/design-token/generated/style-token-usage.md`
  - `docs/design-token/generated/token-usage-audit.md`
- Confirmed mentions of `next-*`, `palette-*`, and `shadow-shadow-*` in the guide are only in forbidden-usage explanations.

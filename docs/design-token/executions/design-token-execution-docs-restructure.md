# Design Token Execution: Docs Restructure

Date: 2026-04-11

## Scope

- Created `docs/design-token/` as the design-token documentation root.
- Moved execution records to `docs/design-token/executions/`.
- Moved audit and validation records to `docs/design-token/audits/`.
- Moved mapping, benchmark, remediation, and replacement notes to `docs/design-token/mappings/`.
- Moved generated token usage docs to `docs/design-token/generated/`.

## Script Updates

- Updated `scripts/generate-token-docs.js` to write generated docs to `docs/design-token/generated/`.
- Added directory creation for the generated docs output path.
- Updated generated output reporting paths.

## Path Reference Updates

- Updated internal doc references from old root-level design-token paths to the new grouped paths.

## Validation

- `npm run generate:token-docs` passed.
- Generated files:
  - `docs/design-token/generated/style-token-usage.md`
  - `docs/design-token/generated/token-usage-audit.md`
- Generated token docs reported:
  - unknown token utility references: `0`
  - residual next-prefixed token references: `0`
  - token opacity suffix references: `0`

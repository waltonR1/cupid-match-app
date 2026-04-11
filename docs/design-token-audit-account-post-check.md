# Design Token Account Post Check

## Scope

- Included: `account`
- Mode: audit only
- Code changes in this audit: none

## Checks

### 1. Token hard-rule scan

Scanned:

- `src/components/account/**/*.vue`
- `src/components/account/**/*.ts`
- `src/pages/account/**/*.vue`
- `src/pages/account/**/*.ts`

Checked for:

- `next-semantic-accent-*`
- direct static-state usage of `next-semantic-action-primary*`
- `next-semantic-surface-info-card`
- old shared component tokens:
  - `next-component-section-line`
  - `next-component-section-eyebrow`
  - `next-component-card-label`
  - `next-component-emphasis-card-*`
  - `next-component-section-card-hover-border`
- opacity utility usage
- legacy utility usage
- palette references
- removed `AccountPageHeader` / `#header` slot usage

Result:

- no matches

### 2. Remaining account component token usage

Remaining `next.component` usage is intentional and falls into these groups:

- `account-nav.current-border`
- `account-badge.*`
- `account-list-marker.*`
- `account-registration.*`
- `account-callout.*`
- shared membership tier tokens used by the account membership page:
  - `membership-tier.free.*`
  - `membership-tier.silver.*`
  - `membership-tier.gold.*`
  - `membership-tier.diamond.*`

These are currently valid local/business semantics and should not be promoted to `semantic` yet.

### 3. i18n

`npm.cmd run check:i18n`:

- passed
- output: `NO_MISSING_KEYS`

### 4. Type and build

`npm.cmd run type-check`:

- passed

`npm.cmd run build:h5`:

- passed

### 5. Legacy account structure scan

Checked for removed old account artifacts:

- `AccountPageHeader`
- `AccountPageShell`
- `AccountPerspectiveGrid`
- `AccountSubnav`
- `openFavoritesPage`
- `openPrivacyPage`
- `openMyEventsPage`
- old account route strings:
  - `pages/account/index`
  - `pages/account/events`
  - `pages/account/favorites`
  - `pages/account/privacy`

Result:

- no matches

## Conclusion

Account token usage is currently clean against the active rules:

- no legacy utility usage
- no palette references
- no opacity utility usage
- no `accent` semantic leakage
- no static-state `action-primary` misuse
- no generic `surface.info-card` reuse
- no old shared component token usage

Remaining risks are structural/product-level, not token hard-rule violations:

- `use-account-data.ts` is still a broad account data aggregator.
- Several pages are still relatively large and may later benefit from page-specific subcomponents, but there is no obvious over-extraction after `AccountPageHeader` was removed.

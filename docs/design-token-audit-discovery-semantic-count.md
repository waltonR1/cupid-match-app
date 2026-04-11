# Design Token Audit Discovery Semantic Count

## Scope

- Full source hard scan: `src/**/*.vue`, `src/**/*.ts`, `src/**/*.js`
- Discovery semantic usage scan:
  - `src/components/discovery`
  - `src/pages/discovery`

## Full Project Next Status

- Source-level legacy utility scan: `0`
- Source-level opacity utility scan: `0`
- Source-level palette / `next-palette` scan: `0`

This means the source usage layer is effectively migrated to `next-*` utilities.

It does not mean the project can delete `legacy` yet:

- `src/constants/theme-tokens.json` still contains `legacy`.
- `tailwind.config.js` still generates legacy utilities.

## Discovery Component Token Usage Count

- `directory-control.selected.*`: used across active chips, selected dropdown state, sort active state, pagination active state, and filter open state.
- `directory-card.*`: used by `DirectoryCardFrame.vue`.
- `discovery-detail.tag.*`: used by family/self detail tag chips.
- `discovery-hero.*`: used by `DetailHeroPanel.vue`.

## Findings

### 1. Resolved: `DirectoryIntro` eyebrow no longer uses `directory-control.selected`

Previous issue:

- `border-next-component-directory-control-selected-border`
- `bg-next-component-directory-control-selected-background`
- `text-next-component-directory-control-selected-text`

This was not a selected control. It was an intro eyebrow / page label.

Resolved in `docs/design-token-execution-discovery-round-4.md`:

- `border-next-component-directory-control-selected-border` -> `border-next-semantic-border-eyebrow`
- `bg-next-component-directory-control-selected-background` -> `bg-next-semantic-surface-soft`
- `text-next-component-directory-control-selected-text` -> `text-next-semantic-text-eyebrow`

### 2. Resolved: `discovery-hero.index.*` removed

Previous local tokens:

- `discovery-hero.index.background`
- `discovery-hero.index.border`
- `discovery-hero.index.divider`
- `discovery-hero.index.title`

Resolved in `docs/design-token-execution-discovery-round-4.md` by replacing them with:

- `surface.card`
- `border.default`
- `border.divider`
- `text.eyebrow`

### 3. Resolved: `discovery-hero.pill.muted.*` removed

Previous local tokens:

- `discovery-hero.pill.muted.background`
- `discovery-hero.pill.muted.border`
- `discovery-hero.pill.muted.text`

Resolved in `docs/design-token-execution-discovery-round-4.md` by replacing them with:

- `surface.card`
- `border.default`
- `text.muted`

### 4. Resolved: `discovery-hero.record.*` and `discovery-hero.pill.default.*` consolidated

Record ID and default hero badges use the same values and are both accent pills inside the same hero module.

Resolved in `docs/design-token-execution-discovery-round-4.md`:

- `discovery-hero.record.*` removed
- `discovery-hero.pill.default.*` removed
- `discovery-hero.badge.meta.*` added

### 5. Resolved: `directory-card.badge.text` and `directory-card.footer.text` consolidated

Resolved in `docs/design-token-execution-discovery-round-4.md`:

- `directory-card.badge.text` removed
- `directory-card.footer.text` removed
- `directory-card.meta.text` added

### 6. Remaining acceptable split despite equal values

These have equal or near-equal values to other tokens, but keeping separate semantics is currently defensible:

- `directory-control.selected.border/text/indicator`: same color, different CSS attributes and selected-control roles.
- `discovery-detail.tag.text`: not a link or section label, so keeping a local detail tag text token is semantically cleaner than using `semantic.text.link` or `semantic.text.eyebrow`.
- `discovery-hero.avatar.*`: hero avatar identity marker, not a generic section highlight or eyebrow.
- `directory-card.avatar.text`: directory card avatar identity marker, not a generic section highlight.

## Conclusion

Discovery is not using legacy/palette/opacity now, and the follow-up token-count tightening has been applied.

After round 4:

- Discovery component token count: `22`
- Discovery stale token scan: `0`
- Discovery legacy / opacity / palette / `next-semantic-accent-*` scan: `0`

No additional mandatory discovery token correction is identified at this point.

The next meaningful project-level step is not discovery-specific: remove the legacy data/generation path only after confirming all pages and shared components are stable on `next`.

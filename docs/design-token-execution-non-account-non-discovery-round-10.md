# Design Token Execution Round 10

## Scope

- Excluded: `account`, `discovery`
- Goal: clean corrupted visible literals introduced by prior encoding damage so the non-account UI no longer renders mojibake text

## Why

- Several `home` components still contained corrupted literal prefixes around `titleAccent`
- `HomeHero` had a broken quote text node
- `HomeFeatures` contained corrupted inline badge/icon strings that were visible in the UI
- `HomeFamily.vue` was stored with invalid UTF-8 and could not be edited with `apply_patch`

## Changes

### 1. Fixed visible home-page literals

Updated:

- [HomeHero.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeHero.vue)
- [HomeAudience.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeAudience.vue)
- [HomeFeatures.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeFeatures.vue)
- [HomeVision.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeVision.vue)
- [HomeEventsPreview.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeEventsPreview.vue)
- [HomeMembership.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeMembership.vue)
- [HomeProfilesPreview.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeProfilesPreview.vue)

Cleanups:

- removed corrupted prefix text before `titleAccent`
- replaced the broken `HomeHero` quote literal with a plain quoted interpolation
- replaced broken `HomeFeatures` inline markers with stable ASCII labels:
  - `AI`
  - `MSG`
  - `EVT`
  - `FAM`
  - `VIP`
  - `STORY`

### 2. Rewrote invalid UTF-8 file

Rewrote [HomeFamily.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeFamily.vue) as valid UTF-8.

Reason:

- `apply_patch` could not read the file because the stream was not valid UTF-8
- rewrote the file content with equivalent structure and cleaned comments

### 3. Cleaned nearby comment noise where practical

While touching the affected files, cleaned obviously corrupted section comments in:

- [HomeAudience.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeAudience.vue)
- [HomeFeatures.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeFeatures.vue)
- [HomeVision.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeVision.vue)
- [HomeFamily.vue](/mnt/d/uniapp/cupid-match/src/components/home/HomeFamily.vue)

## Search Result

- Visible mojibake scan in `src/**/*.vue` and `src/**/*.ts`: `0`

Pattern bucket checked:

- broken `titleAccent` prefixes
- common mojibake characters from previous damaged files

## Validation

- `npm.cmd run type-check` -> passed
- `npm.cmd run build:h5` -> passed

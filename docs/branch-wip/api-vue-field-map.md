# API To Vue Field Map

- Goal: list what each Vue file actually needs from API / store data before rebuilding the API-to-Vue chain.
- Conventions:
  - `raw fields`: fields read from API return objects or auth/account stores.
  - `collection control`: fields only used for filtering, sorting, partitioning, or fallback selection.
  - `prop contract`: fields consumed after data has already been reshaped into a view model.

## Profile Domain

### `src/pages/index.vue`
- Source: `useSelfDirectory().featuredProfiles`
- Raw fields: none in-page; forwards `Profile[]`
- Downstream: `HomeProfilesPreview.vue`

### `src/components/home/HomeProfilesPreview.vue`
- Source: `props.profiles: Profile[]`
- Raw fields:
  - `id`, `displayName`, `avatarUrl`, `gender`, `age`
  - `city`, `occupation`, `education`, `summary`, `languages`, `tags`
  - `intentCode`, `status`
- Notes:
  - Runs `getLocalizedProfileCardData(locale, profile, 'self')`
  - Then runs `buildProfileCardViewModel(...)`
- Downstream: `ProfileCardFrame.vue` via `ProfileCardViewModel`

### `src/pages/profiles/self/index.vue`
- Source: `useSelfDirectory() -> Profile[]`
- Collection control:
  - filtering: `gender`, `age`, `city.en`, `height`, `degreeLevel`, `intentCode`, `industry.en`, `occupation.en`, `languages`, `isVerified`, `maritalStatus`, `hasChildren`, `acceptLongDistance`
  - sorting: `lastActiveAt`, `status`, `age`
- Raw fields for filter option generation:
  - `city`, `intent`, `intentCode`, `industry`, `occupation`, `languages`
- Raw fields for card rendering chain:
  - `id`, `displayName`, `avatarUrl`, `gender`, `age`
  - `city`, `occupation`, `education`, `summary`, `languages`, `tags`
  - `intentCode`, `status`
- Downstream:
  - `ProfileFilterToolbar.vue` with filter item view models
  - `ProfileResultToolbar.vue` with sort/result summary view model
  - `ProfileCardFrame.vue` with `ProfileCardViewModel`

### `src/pages/profiles/family/index.vue`
- Source: `useFamilyDirectory() -> Profile[]`
- Collection control:
  - filtering: `gender`, `age`, `city.en`, `degreeLevel`, `intentCode`, `occupation.en`, `industry.en`, `maritalStatus`, `hasChildren`, `acceptLongDistance`
  - family mode routing: `allowFamilyContact`, `familyPriority`
  - sorting: `familyPriority`, `allowFamilyContact`, `lastActiveAt`, `age`
- Raw fields for filter option generation:
  - `city`, `intent`, `intentCode`, `occupation`, `industry`
- Raw fields for card rendering chain:
  - `id`, `displayName`, `avatarUrl`, `gender`, `age`
  - `city`, `occupation`, `education`, `maritalPlan`, `residencePlan`, `tags`
  - `intentCode`, `status`, `maritalStatus`, `hasChildren`, `acceptLongDistance`
  - `allowFamilyContact`, `familyPriority`
- Downstream:
  - `ProfileFilterToolbar.vue` with filter item view models
  - `ProfileResultToolbar.vue` with sort/result summary view model
  - `ProfileCardFrame.vue` with `ProfileCardViewModel`

### `src/pages/profiles/self/detail.vue`
- Source: `useProfileDetail(profileId) -> Profile | null`
- Raw fields:
  - identity/meta: `id`, `displayName`, `avatarUrl`, `gender`, `status`, `isVerified`, `familyVisible`, `familyPriority`, `allowFamilyContact`
  - timeline: `lastActiveAt`, `joinedAt`
  - overview: `age`, `height`, `city`, `country`, `nationality`, `education`, `occupation`, `industry`, `employer`, `incomeRange`
  - relationship: `maritalStatus`, `hasChildren`, `wantChildren`, `acceptLongDistance`, `intent`, `maritalPlan`
  - lifestyle: `languages`, `smoke`, `drink`, `exercise`, `residencePlan`
  - content: `summary`, `highlights`, `tags`
- Downstream:
  - `ProfileDetailHero.vue` via `ProfileDetailHeroData`
  - `ProfileDetailFactGrid.vue` / `ProfileDetailFactSection.vue` via fact-item arrays

### `src/pages/profiles/family/detail.vue`
- Source: `useProfileDetail(profileId) -> Profile | null`
- Raw fields:
  - identity/meta: `id`, `displayName`, `avatarUrl`, `gender`, `isVerified`, `familyVisible`, `familyPriority`, `allowFamilyContact`
  - timeline: `lastActiveAt`, `joinedAt`
  - overview: `age`, `city`, `country`, `nationality`, `education`, `occupation`, `industry`, `incomeRange`, `residencePlan`
  - relationship: `maritalStatus`, `hasChildren`, `wantChildren`, `acceptLongDistance`, `intent`, `maritalPlan`
  - lifestyle: `languages`, `exercise`, `smoke`, `drink`
  - content: `summary`, `tags`
- Notes:
  - Family detail hero uses `maritalPlan` as hero summary instead of `summary`
  - Highlight block additionally reuses `summary`, `residencePlan`, `acceptLongDistance`
- Downstream:
  - `ProfileDetailHero.vue` via `ProfileDetailHeroData`
  - `ProfileDetailFactGrid.vue` / `ProfileDetailFactSection.vue` via fact-item arrays

### `src/components/profiles/directory/ProfileCardFrame.vue`
- Prop contract:
  - `data.avatarUrl`, `data.avatarFallback`, `data.displayName`, `data.gender`
  - `data.meta`, `data.badge`, `data.summary`, `data.footer`
  - `data.facts[].label`, `data.facts[].value`
  - `data.tags[]`

### `src/components/profiles/detail/ProfileDetailHero.vue`
- Prop contract:
  - `data.eyebrow`, `data.recordId`, `data.avatarUrl`, `data.avatarFallback`
  - `data.displayName`, `data.gender`, `data.meta`, `data.summary`
  - `data.badges[].label`, `data.badges[].tone`
  - `data.indexTitle`
  - `data.indexFacts[].label`, `data.indexFacts[].value`

## Event Domain

### `src/pages/index.vue`
- Source: `useEvents().featuredEvents`
- Raw fields: none in-page; forwards `CupidEvent[]`
- Downstream: `HomeEventsPreview.vue`

### `src/components/home/HomeEventsPreview.vue`
- Source: `props.events: CupidEvent[]`
- Raw fields:
  - `id`, `date`, `title`, `summary`, `city`, `venue`, `format`, `audience`
  - `registered`, `seats`, `status`
- Downstream:
  - Builds `EventOverviewItem[]`
  - Passes each item to `EventOverviewCard.vue`

### `src/pages/events/index.vue`
- Source: `useEvents() -> CupidEvent[]`
- Collection control:
  - sorting: `date`
  - featured filtering: `status !== 'closed'`
  - stats: `status`, localized `city`
- Raw fields for card rendering:
  - `id`, `date`, `title`, `summary`, `city`, `venue`, `format`, `audience`
  - `registered`, `seats`, `status`
- Downstream:
  - `EventsHero.vue` with one `EventOverviewItem`
  - `EventsFeaturedGrid.vue` with `EventOverviewItem[]` and `EventStatItem[]`
  - `EventsScheduleList.vue` with `EventOverviewItem[]`

### `src/pages/events/detail.vue`
- Source:
  - `useEventDetail(eventId).event -> CupidEvent | null`
  - `useEventDetail(eventId).relatedProfiles -> EventRelatedProfile[]`
- Raw event fields:
  - `id`, `date`, `title`, `summary`, `city`, `venue`, `format`, `audience`
  - `registered`, `seats`, `status`
  - `agenda[].time`, `agenda[].title`, `agenda[].desc`
- Raw related-profile fields:
  - `id`, `displayName`, `summary`, `age`, `city`, `intent`, `status`, `isVerified`
- Collection control:
  - same-city reason check: `event.city.en` against `profile.city.en`
- Downstream:
  - `EventDetailHero.vue` with `EventOverviewItem` + action view model
  - `EventDetailAgenda.vue` with `EventAgendaItem[]`
  - `EventDetailNotes.vue` with static note items
  - `EventDetailRelatedProfiles.vue` with `EventRelatedProfileItem[]`

### `src/components/events/EventsHero.vue`
- Prop contract:
  - `nextEvent.id`, `nextEvent.title`, `nextEvent.status`, `nextEvent.statusLabel`
  - `nextEvent.date`, `nextEvent.city`, `nextEvent.venue`, `nextEvent.format`, `nextEvent.seats`, `nextEvent.summary`
  - `fields.date`, `fields.city`, `fields.venue`, `fields.format`, `fields.seats`

### `src/components/events/EventsFeaturedGrid.vue`
- Prop contract:
  - `stats[].label`, `stats[].value`
  - `events[].id`, `events[].title`, `events[].summary`, `events[].date`
  - `events[].city`, `events[].venue`, `events[].format`, `events[].audience`
  - `events[].seats`, `events[].status`, `events[].statusLabel`

### `src/components/events/EventsScheduleList.vue`
- Prop contract:
  - `events[].id`, `events[].date`, `events[].city`, `events[].title`
  - `events[].summary`, `events[].status`, `events[].statusLabel`, `events[].seats`

### `src/components/events/EventOverviewCard.vue`
- Prop contract:
  - `event.id`, `event.date`, `event.title`, `event.status`, `event.statusLabel`
  - `event.city`, `event.venue`, `event.format`, `event.audience`
  - `event.summary`, `event.seats`
  - `fields.city`, `fields.venue`, `fields.format`, `fields.audience`, `fields.seats`

### `src/components/events/EventDetailHero.vue`
- Prop contract:
  - `event.title`, `event.summary`, `event.status`, `event.statusLabel`
  - `event.date`, `event.city`, `event.venue`, `event.format`, `event.audience`, `event.seats`
  - `action.text`, `action.hint`, `action.disabled`

### `src/components/events/EventDetailAgenda.vue`
- Prop contract:
  - `items[].time`, `items[].title`, `items[].desc`

### `src/components/events/EventDetailNotes.vue`
- Prop contract:
  - `items[].title`, `items[].desc`

### `src/components/events/EventDetailRelatedProfiles.vue`
- Prop contract:
  - `profiles[].id`, `profiles[].displayName`, `profiles[].meta`, `profiles[].reason`, `profiles[].summary`

### `src/components/events/EventStatusBadge.vue`
- Prop contract:
  - `status`, `label`

## Account Domain

### `src/components/account/AccountShell.vue`
- Source: `props.accountData: AccountDataContext`
- Raw/store fields:
  - display name fallback: `profile.displayName`, `account.displayName`
  - summary metrics: `account.completion`, `account.membership`, `userEvents.length`
- Indirect dependency through `verificationCount`:
  - `profile.familyVisible`
  - `privacySettings[].id`, `privacySettings[].enabled` for `privacy-family`
  - `account.membership`
- Downstream: `AccountTopSummary.vue`

### `src/components/account/AccountTopSummary.vue`
- Prop contract:
  - `accountName`
  - `summaryItems[].key`, `summaryItems[].value`

### `src/pages/account/activity.vue`
- Source: `useAccountData().userEvents`
- Raw fields:
  - registration: `registration.id`, `registration.status`, `registration.note`
  - event: `event.id`, `event.date`, `event.city`, `event.title`, `event.venue`
- Collection control:
  - counts by `registration.status`

### `src/pages/account/connections.vue`
- Source:
  - `useAccountData().favorites`
  - derived `familyVisibleFavorites`, `privateFavorites`
- Raw fields:
  - favorite: `favorite.note`
  - profile: `id`, `avatarUrl`, `displayName`, `city`, `age`, `familyVisible`, `tags`
- Collection control:
  - partitions by `profile.familyVisible`

### `src/pages/account/messages.vue`
- Source:
  - `useAccountData().threads`
  - derived `unreadCount`, `familyVisibleThreads`
- Raw fields:
  - thread: `id`, `unread`, `lastMessage`, `updatedAt`
  - profile: `id`, `avatarUrl`, `displayName`, `city`, `age`, `familyVisible`
- Collection control:
  - unread summary by `thread.unread`
  - family partition by `profile.familyVisible`

### `src/pages/account/membership.vue`
- Source: `useAccountData().account`
- Raw fields:
  - `membership`, `completion`, `joinedAt`
- Notes:
  - `membership` also controls disabled state for each plan CTA

### `src/pages/account/profile.vue`
- Source:
  - `useAccountData().account`
  - `useAccountData().profile`
  - `familyAssistSetting`, `visibleFieldsSetting`
- Raw fields:
  - account: `bio`, `membership`, `completion`
  - profile: `familyVisible`, `city`, `education`, `occupation`, `languages`, `summary`, `highlights`, `tags`
  - privacy-derived: `familyAssistSetting.enabled`, `visibleFieldsSetting.enabled`

### `src/pages/account/safety.vue`
- Source:
  - `useAccountData().profile`
  - `privacySettings`
  - `familyAssistSetting`, `advisorContactSetting`, `visibleFieldsSetting`
- Raw fields:
  - profile: `familyVisible`
  - privacy settings list: `id`, `title`, `desc`, `enabled`
  - derived setting rows: `familyAssistSetting.desc`, `familyAssistSetting.enabled`, `advisorContactSetting.title`, `advisorContactSetting.enabled`, `visibleFieldsSetting.enabled`

### `src/pages/account/verification.vue`
- Source:
  - `useAccountData().account`
  - `useAccountData().profile`
  - `familyAssistSetting`, `visibleFieldsSetting`
- Raw fields:
  - account: `membership`
  - profile: `education`, `maritalStatus`, `occupation`, `familyVisible`, `summary`
  - privacy-derived: `familyAssistSetting.enabled`, `visibleFieldsSetting.enabled`

## Auth / Session Domain

### `src/pages/auth/login.vue`
- Request payload fields sent to API:
  - `identity`, `password`
- Response/session fields actually used by the current chain:
  - `session.user.id`
  - `session.user.displayName`
  - `session.user.avatarUrl`
- Response fields currently ignored by the Vue page:
  - `session.token`
- Notes:
  - `useLogin()` stores `session.user` into `useAuthStore()`
  - page redirects after submit and does not render response data directly

### `src/pages/auth/register.vue`
- Request payload fields sent to API:
  - `role`, `email`, `password`, `nickName`, `city`
- Response fields currently unused by the Vue page:
  - `token`
  - `user.id`, `user.displayName`, `user.avatarUrl`

### `src/components/layout/AppHeader.vue`
- Source: `useAuthStore()`
- Store fields used in UI:
  - `isLoggedIn`
  - `displayName`
- Notes:
  - `displayName` ultimately comes from login/register response user data
  - `avatarUrl` exists in store but is not used here

## No API-Specific Field Dependency

- `src/App.vue`: none; app lifecycle + theme only
- `src/components/about/AboutAudience.vue`: none; static i18n copy
- `src/components/about/AboutDifference.vue`: none; static i18n copy
- `src/components/about/AboutHero.vue`: none; static i18n copy
- `src/components/about/AboutOrigin.vue`: none; static i18n copy
- `src/components/about/AboutValues.vue`: none; static i18n copy
- `src/components/account/AccountPrimaryNav.vue`: none; nav state only
- `src/components/account/AccountSectionHeader.vue`: none; generic heading
- `src/components/common/AgreementDialog.vue`: none; static agreement copy
- `src/components/common/AppAvatar.vue`: none; generic avatar UI
- `src/components/common/AppButton.vue`: none; generic button UI
- `src/components/common/AppGenderBadge.vue`: none; generic gender badge UI
- `src/components/common/feedback/EmptyStatePanel.vue`: none; generic empty state UI
- `src/components/contact/ContactCases.vue`: none; props/i18n only
- `src/components/contact/ContactGuide.vue`: none; props/i18n only
- `src/components/contact/ContactHero.vue`: none; props/i18n only
- `src/components/contact/ContactInfo.vue`: none; props/i18n only
- `src/components/home/HomeAudience.vue`: none; static i18n copy
- `src/components/home/HomeFamily.vue`: none; static i18n copy
- `src/components/home/HomeFeatures.vue`: none; static i18n copy
- `src/components/home/HomeHero.vue`: none; static i18n copy
- `src/components/home/HomeMembership.vue`: none; static i18n copy
- `src/components/home/HomeVision.vue`: none; static i18n copy
- `src/components/layout/AppFooter.vue`: none; static footer/nav copy
- `src/components/layout/AppPageLayout.vue`: none; layout wrapper only
- `src/components/membership/MembershipHero.vue`: none; static i18n copy
- `src/components/membership/MembershipPlanButton.vue`: none; generic tier CTA UI
- `src/components/membership/MembershipRulesSection.vue`: none; static i18n copy
- `src/components/membership/MembershipTiersSection.vue`: none; static i18n copy
- `src/components/profiles/detail/ProfileDetailFactGrid.vue`: none; generic fact grid
- `src/components/profiles/detail/ProfileDetailFactSection.vue`: none; generic fact section
- `src/components/profiles/directory/ProfileActiveFilterChips.vue`: none; generic filter-chip UI
- `src/components/profiles/directory/ProfileDirectoryIntro.vue`: none; generic intro UI
- `src/components/profiles/directory/ProfileDirectoryPagination.vue`: none; generic pagination UI
- `src/components/profiles/directory/ProfileFilterSelectCard.vue`: none; generic select-card UI
- `src/components/profiles/directory/ProfileFilterToolbar.vue`: none; generic toolbar UI over prebuilt filter models
- `src/components/profiles/directory/ProfileResultsGrid.vue`: none; generic result-grid UI
- `src/components/profiles/directory/ProfileResultToolbar.vue`: none; generic sort/result toolbar UI
- `src/pages/not-found.vue`: none; route fallback only
- `src/pages/public/about.vue`: none; static page composition
- `src/pages/public/contact.vue`: none; static page composition
- `src/pages/public/membership.vue`: none; static page composition

## Suggested Rebuild Boundaries

- First split raw API schema from UI view models:
  - `Profile`
  - `CupidEvent`
  - `AccountOverview`
  - `AuthSession`
- Then move all current shaping logic out of Vue pages/components:
  - profile card shaping: `getLocalizedProfileCardData` + `buildProfileCardViewModel`
  - event card shaping: `buildEventOverviewItem`
  - account dashboard shaping: all `summaryItems` / `visibilityRows` / `verificationItems`
- Keep leaf components on prop contracts only:
  - `ProfileCardFrame.vue`
  - `ProfileDetailHero.vue`
  - `EventOverviewCard.vue`
  - `EventDetailHero.vue`
  - `AccountTopSummary.vue`

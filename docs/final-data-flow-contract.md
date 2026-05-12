# Final Data Flow Contract

## Purpose

本文约束后续代码生成时每条业务链路应该从哪些数据库集合取数、经过哪些 API / mapper、返回哪些 DTO 字段，以及哪些字段必须迁移、派生或禁止继续使用。

配套文档：

- `docs/final-database-schema.md`：最终数据库形态。
- `docs/implementation-roadmap.md`：分阶段执行顺序。
- `docs/project-database-fields.md`：当前实现状态。

本文描述最终目标，不描述当前代码已经完成的状态。

## Global Rules

- 数据链路保持 `page -> hook -> api -> mock-server`。
- 当前 `mock-server` 用于验证 DTO、业务状态、数据链路和前端消费稳定性，不代表生产级后端安全实现。
- 当前 `X-User-Id` 只允许作为 mock request context。
- 本 contract 的目标是让前端消费稳定，并为未来 Java 后端复刻领域模型。
- 页面只消费 API DTO / ViewModel，不直接依赖数据库 Record。
- `mock-server/db.json` 按最终数据库集合建模，不再为了 mock 便利嵌套 `photos / prompts / agenda`。
- Database Record、API DTO、Frontend ViewModel 必须分层。
- 主表只保存稳定事实；展示名、年龄、头像、文案 label、权限结果、报名人数等可派生字段由后端 mapper / service 输出到 DTO。
- 后端负责权限与字段 masking，前端只根据 DTO 的 `access / privacy / visibility` 结果展示。
- security / transaction / infra 可以保持 prototype 级别；DTO boundary、source of truth、visibility / masking、ownership 等领域规则不能简化。
- account 不允许反向决定 profile schema。

## Source of Truth Matrix

| Concern | Source of truth | DTO derived fields | Must not be source of truth |
| --- | --- | --- | --- |
| 登录账户 | `users`, `auth_identities` | `AuthSession.user.accountName` | `profiles`, `profile_ownerships.role` |
| 注册后引导 | `user_onboarding_states` | `AuthSession.onboarding` | `users.onboardingPath`, `users.onboardingStep` |
| profile 主资料 | `profiles` | `displayName`, `age`, `datingIntentionLabel` | `displayName`, `age`, `datingIntentionLabel` in DB |
| profile 头像 | `profile_photos.isPrimary` | `avatarUrl` | `profiles.avatarUrl` |
| profile 问答 | `profile_prompts` | `prompts[]` | `profiles.prompts` |
| profile 可见性 | `profile_visibility_settings` plus default constants | `access`, masked field values | frontend hardcoded member checks |
| 联系方式 | `profile_contact_methods` | `contactAccess` | phone/email/wechat in detail DTO |
| 后台资料 | `profile_internal_records`, `profile_verifications` | advisor/admin DTO only | public profile DTO |
| 活动主体 | `events` | localized event DTO | nested agenda |
| 活动流程 | `event_agenda_items` | `agendaItems[]` | `events.agenda` |
| 活动报名 | `event_registrations` | `registration`, `registeredCount`, `waitlistCount` | event main record counts |
| 收藏 | `favorite_profiles` | `isFavorite`, favorite list items | profile record |
| 会员权益 | `membership_plans`, `user_memberships`, `membership_entitlements`, `user_entitlement_balances` | `membership`, `entitlements`, `quota` | `users.tier`, profile fields |
| 私人介绍 | `private_introduction_requests`, `private_introduction_rooms` | request / room status DTO | contact values in profile detail |

## Auth Chain

### Register

Flow:

```text
register page
-> use auth hook / auth api
-> POST /api/auth/register
-> mock-server auth service
-> users + auth_identities + user_onboarding_states + default membership records
-> AuthSession DTO
-> auth store
```

Database writes:

```text
users:
  id
  accountName
  avatarUrl
  preferredLocale
  status
  createdAt
  updatedAt

auth_identities:
  id
  userId
  provider
  identifier
  passwordHash
  verifiedAt
  createdAt
  updatedAt

user_onboarding_states:
  id
  userId
  path
  step
  profileId
  createdAt
  updatedAt
```

Register payload:

```ts
interface RegisterPayload {
  provider: 'email' | 'phone'
  identifier: string
  password: string
  accountName: string
  preferredLocale: 'zh' | 'fr' | 'en'
  path: 'self' | 'family'
}
```

DTO:

```ts
interface AuthSession {
  token: string
  user: {
    id: string
    accountName: string
    avatarUrl: string
  }
  onboarding: {
    path: 'self' | 'family'
    step: 'create_profile' | 'review_profile' | 'browse'
    profileId?: string
  }
}
```

Field changes:

- Remove `users.city`.
- Remove `users.onboardingPath`.
- Remove `users.onboardingStep`.
- Do not write profile fields during register.
- Do not write `role`, membership tier, profile completion, or profile display fields into `users`.

### Login

Flow:

```text
login page
-> auth api
-> POST /api/auth/login
-> auth_identities lookup
-> users lookup
-> user_onboarding_states lookup
-> AuthSession DTO
-> auth store
```

Rules:

- Login returns account identity and onboarding state.
- Login does not fetch profile detail by default.
- `X-User-Id` is mock request context only.
- Future Authorization token behavior must be explicit; do not half-use token in some calls.

## Profile Directory Chain

Flow:

```text
profile directory page
-> use profile directory hook
-> GET /api/profiles
-> profiles query
-> profile_photos primary lookup
-> profile_visibility_settings/default access policy
-> backend mapper
-> ProfileDirectoryItemDTO[]
-> frontend ViewModel
```

Database reads:

```text
profiles:
  id
  gender
  birthYear
  height
  city
  country
  nationality
  languages
  profileStatus
  lastActiveAt
  familyVisible
  familyPriority
  degreeLevel
  education
  industry
  careerDirection
  maritalStatus
  hasChildren
  wantsChildren
  acceptsLongDistance
  datingIntentionCode
  relationshipPlan
  residencePlan
  values
  preferredAgeMin
  preferredAgeMax
  locationScope
  tags
  createdAt
  updatedAt

profile_photos:
  profileId
  url
  isPrimary
  status
```

DTO fields:

```ts
interface ProfileDirectoryItemDTO {
  id: string
  displayName: string
  avatarUrl: string
  age: number
  city: string
  country: string
  height: number
  education: string
  industry: string
  careerDirection?: string
  datingIntentionCode: string
  datingIntentionLabel: string
  tags: string[]
  familyVisible: boolean
  familyPriority: boolean
  access: ProfileAccessDTO
}
```

Derived fields:

- `displayName`: from `profile.id`.
- `avatarUrl`: from primary approved `profile_photos`.
- `age`: from `birthYear` or verified `dateOfBirth`.
- `datingIntentionLabel`: from `datingIntentionCode`.
- localized strings: resolved in backend mapper.

Filters:

- age range filters compare derived age from `birthYear`.
- intention filters compare `datingIntentionCode`.
- location filters compare normalized city / country codes or localized values consistently.
- Do not filter / sort by label text.

Forbidden:

- Do not return `ProfileRecord` directly.
- Do not read `profiles.displayName`, `profiles.avatarUrl`, `profiles.age`, `profiles.datingIntentionLabel`, `profiles.occupation`.
- Do not expose phone, email, wechat.

## Profile Detail Chain

Flow:

```text
profile detail page
-> use profile detail hook
-> GET /api/profiles/:id
-> viewer context from auth request
-> profiles lookup
-> profile_photos lookup
-> profile_prompts lookup
-> profile_visibility_settings/default access policy
-> favorite_profiles lookup for viewer
-> private introduction state lookup for viewer
-> backend mapper/masking
-> ProfileDetailDTO
-> frontend ViewModel
```

Database reads:

```text
profiles
profile_photos
profile_prompts
profile_visibility_settings
profile_ownerships
favorite_profiles
private_introduction_requests
user_memberships / user_entitlement_balances
```

DTO fields:

```ts
interface ProfileDetailDTO {
  id: string
  displayName: string
  avatarUrl: string
  age: number
  gallery: ProfilePhotoDTO[]
  prompts: ProfilePromptDTO[]
  basics: ProfileBasicsDTO
  relationship: ProfileRelationshipDTO
  lifestyle: ProfileLifestyleDTO
  preferences: ProfilePreferencesDTO
  family: ProfileFamilyDTO
  access: ProfileAccessDTO
  privacy: ProfilePrivacyDTO
  favorite: FavoriteStateDTO
  introduction: IntroductionStateDTO
  contactAccess: ContactAccessDTO
}
```

Profile relationship DTO:

```ts
interface ProfileRelationshipDTO {
  datingIntentionCode: string
  datingIntentionLabel: string
  relationshipPlan: string
  residencePlan: string
  relocationWillingness: string
  values: string[]
}
```

Visibility input:

```text
profile_visibility_settings:
  profileId
  fieldCode
  visibility
  lockedByAdvisor
```

Visibility output:

```ts
interface ProfileAccessDTO {
  viewerRole: 'guest' | 'free_user' | 'member' | 'owner' | 'advisor'
  canViewFullProfile: boolean
  canViewFamilySection: boolean
  canRequestIntroduction: boolean
  hiddenFields: string[]
  memberOnlyFields: string[]
  introducedOnlyFields: string[]
}
```

Rules:

- Backend decides field visibility.
- Frontend renders locked / hidden states from DTO only.
- If no `profile_visibility_settings` exists, backend uses default constants.
- Owner/advisor can see fields according to ownership and advisor rules, not page assumptions.

Forbidden:

- Do not return contact values in profile detail.
- Do not let frontend decide raw field masking with scattered `isMember` checks.
- Do not use nested `profile.photos` or `profile.prompts` as final source.

## Profile Self / Family Detail Chain

Flow:

```text
self/family detail page
-> profile detail api with viewer context
-> profile_ownerships determines relation
-> same profile detail mapper
-> owner/family scoped DTO
```

Database reads:

```text
profile_ownerships:
  userId
  profileId
  role
  relationshipToProfile
  permission
  isPrimary

profiles
profile_photos
profile_prompts
profile_visibility_settings
```

Rules:

- Self/family pages still consume DTOs, not database records.
- Ownership decides editable or managed profile scope.
- Family-specific sections use `familyVisible`, `allowFamilyContact`, `familyPriority` and visibility policy.
- Do not add family-only fields back into `users`.

## Profile Edit / Creation Chain

Flow:

```text
profile create/edit page
-> profile api
-> profiles write
-> profile_photos/profile_prompts/contact/internal/verification writes where applicable
-> profile_ownerships created or updated
```

Profile main table writes:

```text
gender
birthYear
height
city
country
nationality
languages
profileStatus
lastActiveAt
familyVisible
allowFamilyContact
familyPriority
degreeLevel
education
industry
careerDirection
maritalStatus
hasChildren
wantsChildren
acceptsLongDistance
datingIntentionCode
relationshipPlan
residencePlan
relocationWillingness
values
preferredAgeMin
preferredAgeMax
locationScope
preferredEducation
familyPlan
dealBreakers
smoking
drinking
exercise
activityLevel
weekendStyle
pets
personalityTraits
interests
communicationStyle
summary
tags
createdAt
updatedAt
```

Separate writes:

```text
profile_photos:
  url, caption, isPrimary, sortOrder, status

profile_prompts:
  promptCode, prompt, answer, sortOrder, status

profile_contact_methods:
  type, value, verifiedAt, visibleAfterIntroduction

profile_internal_records:
  employer, incomeRange, religion, politicalViews, staffNotes, riskFlags, source

profile_verifications:
  legalName, dateOfBirth, identityStatus, educationStatus, incomeStatus, maritalStatus, advisorStatus

profile_visibility_settings:
  fieldCode, visibility, lockedByAdvisor, reason
```

Forbidden writes:

```text
profiles.displayName
profiles.nickname unless redefined as reviewed publicAlias
profiles.avatarUrl
profiles.age
profiles.occupation
profiles.datingIntentionLabel
profiles.phone
profiles.email
profiles.wechat
profiles.photos
profiles.prompts
```

## Event Directory Chain

Flow:

```text
events page
-> use events hook
-> GET /api/events
-> events query
-> event_registrations aggregate
-> backend mapper
-> EventDirectoryItemDTO[]
```

Database reads:

```text
events:
  id
  slug
  status
  visibility
  title
  summary
  city
  venue
  date
  startTime
  endTime
  format
  audience
  relationshipFocus
  languageCodes
  capacity
  registeredCountCache
  waitlistCountCache
  memberOnly
  coverImageUrl

event_registrations:
  eventId
  status
```

DTO fields:

```ts
interface EventDirectoryItemDTO {
  id: string
  slug: string
  title: string
  summary: string
  city: string
  venue: string
  date: string
  startTime: string
  endTime: string
  format: string
  audience: string
  relationshipFocus: string[]
  capacity: number
  registeredCount: number
  waitlistCount: number
  remainingSeats: number
  memberOnly: boolean
  coverImageUrl: string
}
```

Rules:

- `event_registrations` is source of truth for registered/waitlist counts.
- `registeredCountCache` and `waitlistCountCache` may be used only as rebuildable cache.
- Directory DTO can expose counts, but EventRecord counts are not authoritative.
- No nested `agenda` in event directory records.

## Event Detail / Registration Chain

Flow:

```text
event detail page
-> use event detail hook
-> GET /api/events/:id
-> events lookup
-> event_agenda_items lookup
-> viewer event_registrations lookup
-> membership / entitlement lookup if memberOnly
-> EventDetailDTO
```

Detail DTO:

```ts
interface EventDetailDTO {
  id: string
  title: string
  summary: string
  city: string
  venue: string
  date: string
  startTime: string
  endTime: string
  format: string
  audience: string
  relationshipFocus: string[]
  languageCodes: string[]
  capacity: number
  registeredCount: number
  waitlistCount: number
  memberOnly: boolean
  advisorNote: string
  coverImageUrl: string
  agendaItems: EventAgendaItemDTO[]
  registration: EventRegistrationStateDTO
}
```

Registration flow:

```text
POST /api/events/:id/register
-> viewer context
-> event capacity and membership check
-> create/update event_registrations
-> return EventRegistrationStateDTO + derived counts

POST /api/events/:id/cancel
-> viewer context
-> update event_registrations.status = cancelled
-> return EventRegistrationStateDTO + derived counts
```

Forbidden:

- Do not use `user_registrations` as final collection name.
- Do not update EventRecord count as the only source of truth.
- Do not store `events.agenda`.

## Account Chain

Phase 1 account is frozen. Final account is rebuilt after profile, auth, and events are stable.

Final flow:

```text
account page
-> account dashboard api
-> users
-> profile_ownerships
-> user_memberships
-> user_entitlement_balances
-> favorite_profiles
-> event_registrations
-> private_introduction_requests
-> AccountDashboardDTO
```

Account DTO:

```ts
interface AccountDashboardDTO {
  user: AccountUserDTO
  profiles: ManagedProfileSummaryDTO[]
  membership: AccountMembershipDTO
  entitlements: AccountEntitlementDTO[]
  favorites: FavoriteProfileSummaryDTO[]
  events: AccountEventRegistrationDTO[]
  introductions: AccountIntroductionSummaryDTO[]
}
```

Rules:

- Account user identity comes from `users`.
- Managed profiles come from `profile_ownerships`.
- Membership comes from membership collections.
- Account profile summaries must use profile DTO mappers, not raw profile records.
- Account must not require `profiles.occupation`, `profiles.displayName`, `profiles.highlights`, or contact fields.

Forbidden:

- Do not store account page copy in database.
- Do not store privacy setting title/description in database.
- Do not let account summary force profile fields back into `profiles`.

## Favorite Chain

Flow:

```text
profile card/detail favorite action
-> POST/DELETE /api/favorites/:profileId
-> favorite_profiles upsert/delete
-> return favorite state
```

Database:

```text
favorite_profiles:
  id
  userId
  profileId
  createdAt
```

Rules:

- Favorite state is viewer-specific.
- Profile record does not store global favorite flags.
- Directory/detail DTO can include `favorite.isFavorite` only when viewer context exists.

## Membership / Entitlement Chain

Flow:

```text
account membership page or guarded action
-> membership api
-> membership_plans
-> user_memberships
-> membership_entitlements
-> user_entitlement_balances
-> MembershipDTO / EntitlementDTO
```

Database:

```text
membership_plans:
  tier
  name
  monthlyPrivateIntroductionQuota
  conciergePriority
  isActive

user_memberships:
  userId
  planId
  tier
  status
  startedAt
  expiresAt

membership_entitlements:
  planId
  entitlementCode
  entitlementValue

user_entitlement_balances:
  userId
  entitlementCode
  period
  quotaTotal
  quotaUsed
  quotaRemaining
  resetAt
```

Rules:

- User tier is not stored directly on `users`.
- Quota is not derived ad hoc from a string tier in page code.
- Private introduction permission reads entitlement result from backend DTO.

## Private Introduction Chain

Flow:

```text
profile detail CTA
-> POST /api/private-introductions
-> viewer context
-> profile ownership check
-> membership entitlement check
-> contact visibility remains closed
-> private_introduction_requests write
-> entitlement balance update if needed
-> IntroductionStateDTO
```

Database:

```text
private_introduction_requests:
  id
  requesterUserId
  requesterProfileId
  targetProfileId
  status
  message
  createdAt
  updatedAt

private_introduction_rooms:
  id
  requestId
  status
  openedAt
  closedAt
  createdAt
  updatedAt

private_introduction_room_messages:
  id
  roomId
  senderType
  senderUserId
  body
  createdAt
```

Rules:

- Profile detail never returns contact values just because a request exists.
- Contact values can only be exposed through a controlled introduction/contact access flow.
- Users cannot request introduction to their own managed profile.
- Quota and membership checks happen on backend.

## Field Migration Summary

Remove from `users`:

```text
city
role
profileCompletion
membership tier
onboardingPath
onboardingStep
profile display fields
```

Remove from `profiles`:

```text
displayName
nickname unless reviewed publicAlias is introduced
avatarUrl
age
occupation
datingIntentionLabel
legalName
phone
email
wechat
photos
prompts
employer
incomeRange
religion
politicalViews
conversationStarters
dateIdeas
compatibilityDimensions
joinedAt
```

Move to independent collections:

```text
photos -> profile_photos
prompts -> profile_prompts
phone/email/wechat -> profile_contact_methods
legalName/dateOfBirth/statuses -> profile_verifications
employer/income/religion/political/staff notes -> profile_internal_records
field privacy -> profile_visibility_settings
agenda -> event_agenda_items
user registration -> event_registrations
onboarding -> user_onboarding_states
membership tier/quota -> membership and entitlement collections
```

Derive in backend DTO:

```text
displayName
avatarUrl
age
datingIntentionLabel
registeredCount
waitlistCount
remainingSeats
favorite state
profile access/privacy state
contact access state
introduction state
membership entitlement state
```

## Code Generation Checklist

Before generating or changing code for any chain:

1. Identify database source collections.
2. Define API DTO separately from database Record.
3. Define frontend ViewModel separately if UI needs formatting.
4. Put derived fields in backend mapper/service.
5. Put permission and masking in backend service.
6. Keep page code on hooks and DTOs only.
7. Reject any implementation that adds removed fields back to `users`, `profiles`, or `events`.
8. Update `docs/project-database-fields.md` after implementation changes current schema.

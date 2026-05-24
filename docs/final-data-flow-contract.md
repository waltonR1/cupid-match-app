# Final Data Flow Contract

## Purpose

本文约束后续代码生成时每条业务链路应该从哪些数据库集合取数、经过哪些 API / mapper、返回哪些 DTO 字段，以及哪些字段必须迁移、派生或禁止继续使用。

配套文档：

- `docs/final-database-schema.md`：最终数据库形态。
- `docs/final-api-contract.md`：最终 API endpoint 和 DTO。
- `docs/final-page-fields.md`：最终页面 ViewModel 字段。
- `docs/implementation-roadmap.md`：分阶段执行顺序。
- `docs/project-database-fields.md`：当前实现状态。

本文描述最终目标，不描述当前代码已经完成的状态。

## Global Rules

- 数据链路保持 `page -> hook -> api -> mock-server`。
- 当前 `mock-server` 用于验证 DTO、业务状态、数据链路和前端消费稳定性，不代表生产级后端安全实现。
- 当前 `X-User-Id` 只允许作为 mock request context。
- 本 contract 的目标是让前端消费稳定，并为未来 Java 后端复刻领域模型。
- 页面只消费 API DTO / ViewModel，不直接依赖数据库 Record。
- Database Record、API DTO、Frontend ViewModel 必须分层。
- API DTO 的业务字段尽量保持扁平；页面所需的 section / group / card 结构由前端 mapper 组装。`access`、`favorite`、`privateIntroduction` 这类独立状态对象可以保留，因为它们表达领域状态，不是页面分组。
- 主表只保存稳定事实；展示名、年龄、头像、文案 label、权限结果、报名人数等可派生字段由后端 mapper / service 输出到 DTO。
- 后端负责权限与字段 masking，前端只根据 DTO 的 `access` 结果和受限字段特殊值展示。
- security / transaction / infra 可以保持 prototype 级别；DTO boundary、source of truth、visibility / masking、ownership 等领域规则不能简化。
- account 不允许反向决定 profile schema。

## Source of Truth Matrix

| Concern | Source of truth | DTO derived fields | Must not be source of truth |
| --- | --- | --- | --- |
| 登录账户 | `users`, `auth_identities` | `AuthSession.user.accountName` | `profiles`, `profiles.profileType` |
| 协议文本 | `legal_documents` | `LegalDocumentDTO` | frontend i18n only |
| 协议确认记录 | `user_agreement_acceptances` | latest accepted agreement versions | frontend-managed version state |
| profile 主资料 | `profiles` | `displayName`, `age`, `datingIntentionLabel` | `displayName`, `age`, `datingIntentionLabel` in DB |
| profile 头像 | `profile_photos.isPrimary` | `avatarUrl` | `profiles.avatarUrl` |
| profile 半敏感字段隐藏偏好 | `profile_privacy_preferences` + 默认权限常量 | `access`、遮罩字段值 | 前端散落的会员判断或通用可见性表 |
| 联系方式 | `profile_contacts` | private introduction / inbox DTO | phone/email/wechat in profile detail DTO |
| 后台资料 | `profile_internal_records`, `profile_verifications` | staff/admin DTO only | public profile DTO |
| 活动主体 | `events` | localized event DTO | nested agenda |
| 活动流程 | `event_agenda_items` | `agendaItems[]` | `events.agenda` |
| 活动报名 | `event_registrations` | `registration`, `registeredCount`, `waitlistCount` | event main record counts |
| 收藏 | `favorite_profiles` | `isFavorite`, favorite list items | profile record |
| 会员权益 | `membership_plans`, `user_memberships`, `user_entitlement_balances` | `membership`, `plans`, `quota` | `users.tier`, profile fields |
| 私人介绍 | `private_introduction_requests`, `inbox_threads`, `inbox_messages` | request / inbox status DTO | contact values in profile detail |
| 消息中心 | `inbox_threads`, `inbox_messages`, `inbox_reads` | thread summary, messages, unread state | standalone notifications table |

## Auth Chain

### Register

Flow:

```text
register page
-> use auth hook / auth api
-> POST /api/auth/register
-> mock-server auth service
-> users + auth_identities + default membership records + user_agreement_acceptances
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

user_agreement_acceptances:
  id
  userId
  documentType
  documentVersion
  locale
  acceptedAt
  createdAt
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

说明：

- 当前注册表单只开放 `email` 和 `phone`。
- 注册页不展示 `preferredLocale` 手动选择器；前端读取当前页面 locale 后自动填充 `RegisterPayload.preferredLocale`。
- 成功注册 / 成功登录即表示用户接受当前 active 服务条款与隐私说明；后端自动写入 `user_agreement_acceptances`（upsert by userId + documentType），版本不变则跳过。
- `wechat`、`google` 是 `auth_identities` 的最终预留登录方式，后续通过绑定身份或第三方登录链路接入，不进入当前注册 payload。

DTO:

```ts
interface AuthSession {
  token: string
  user: {
    id: string
    accountName: string
    avatarUrl: string
    preferredLocale: 'zh' | 'fr' | 'en'
  }
}
```

Field changes:

- Remove `users.city`.
- Remove `users.onboardingPath`.
- Remove `users.onboardingStep`.
- Do not write profile fields during register.
- Do not write `role`, membership tier, profile completion, or profile display fields into `users`.
- `RegisterPayload.path` is request-time routing intent only; it is not persisted as user identity or onboarding state.

### Login

Flow:

```text
login page
-> auth api
-> POST /api/auth/login
-> auth_identities lookup
-> users lookup
-> active user_memberships lookup
-> user_agreement_acceptances upsert (backend only)
-> AuthSession DTO
-> auth store
```

Rules:

- Login returns account identity and lightweight membership state for app shell display.
- Login returns `user.preferredLocale`; frontend syncs locale store from it after successful login.
- Login 成功即表示用户接受当前 active 服务条款与隐私说明；后端自动 upsert `user_agreement_acceptances`（版本不变则跳过），前端无须传版本。
- `X-User-Id` is mock request context only.
- Future Authorization token behavior must be explicit; do not half-use token in some calls.

### Legal Document Fetch

Flow:

```text
agreement dialog
-> GET /api/legal/documents/:type?lang=
-> legal_documents active record by type, joined with legal_document_contents by documentId + locale
-> LegalDocumentDTO
-> frontend renders section headings and clauses in AgreementDialog
```

Rules:

- `legal_documents` + `legal_document_contents` is the source of truth for official agreement text and version.
- i18n only provides button labels and helper copy, not the official legal document body.
- Agreement content is returned as structured sections and clauses; frontend renders fields directly and does not parse Markdown.
- If content is missing for the requested locale, mock API falls back to `zh` content for the same document, then to any available locale.
- `AgreementDialog` 打开时按需调用此 API，不预加载。

## Profile Directory Chain

Flow:

```text
profile directory page
-> use profile directory hook
-> GET /api/profiles/self or GET /api/profiles/family
-> profiles query
-> profile_photos primary lookup
-> 默认权限策略
-> backend mapper
-> SelfProfileDirectoryItemDTO[] / FamilyProfileDirectoryItemDTO[]
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
  languages
  profileStatus
  lastActiveAt
  familyVisible
  allowFamilyContact
  familyPriority
  degreeLevel
  education
  industry
  maritalStatus
  hasChildren
  childrenPlan
  acceptsLongDistance
  datingIntentionCode
  relationshipPlan
  residencePlan
  summary
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
interface ProfileDirectoryBaseItemDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: 'male' | 'female'
  age: number
  city: string
  profileStatus: 'open' | 'review'
  isPriorityProfile: boolean
  education: string
  industry: string
  datingIntentionCode: string
  datingIntentionLabel: string
  summary: string
  tags: string[]
}

interface SelfProfileDirectoryItemDTO extends ProfileDirectoryBaseItemDTO {
  languages: string[]
}

interface FamilyProfileDirectoryItemDTO extends ProfileDirectoryBaseItemDTO {
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  acceptsLongDistance: boolean
  relationshipPlan: string
  residencePlan: string
  allowFamilyContact: boolean
  familyPriority: boolean
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
- Do not read `profiles.displayName`, `profiles.avatarUrl`, `profiles.age`, `profiles.datingIntentionLabel`, `profiles.occupation`, `profiles.wantsChildren`.
- Do not expose phone, email, wechat.

## Profile Detail Chain

Flow:

```text
profile detail page
-> use profile detail hook
-> GET /api/profiles/self/:id or GET /api/profiles/family/:id
-> viewer context from auth request
-> profiles lookup
-> profile_photos lookup
-> profile_privacy_preferences / 默认权限策略
-> favorite_profiles lookup for viewer
-> private introduction state lookup for viewer
-> backend mapper/masking
-> SelfProfileDetailDTO | FamilyProfileDetailDTO
-> frontend ViewModel
```

Database reads:

```text
profiles
profile_photos
profile_privacy_preferences
profile_ownerships
favorite_profiles
private_introduction_requests
user_memberships / user_entitlement_balances
```

DTO fields:

```ts
interface ProfileDetailBaseDTO {
  id: string
  displayName: string
  avatarUrl: string
  photos: RestrictedProfileField<ProfilePhotoDTO[]>
  gender: 'male' | 'female'
  age: RestrictedProfileField<number>
  height: number
  city: string
  country: RestrictedProfileField<string>
  nationality: RestrictedProfileField<string>
  languages: RestrictedProfileField<string[]>
  profileStatus: 'open' | 'review'
  isPriorityProfile: boolean
  isVerified: boolean
  degreeLevel: 'bachelor' | 'master' | 'phd'
  education: string
  industry: RestrictedProfileField<string>
  careerDirection?: RestrictedProfileField<string>
  maritalStatus: RestrictedProfileField<'never_married' | 'divorced' | 'widowed'>
  hasChildren: RestrictedProfileField<boolean>
  childrenPlan: RestrictedProfileField<'wants' | 'open_to_discuss' | 'does_not_want'>
  acceptsLongDistance: RestrictedProfileField<boolean>
  datingIntentionCode: string
  datingIntentionLabel: string
  relationshipPlan: RestrictedProfileField<string>
  residencePlan: RestrictedProfileField<string>
  relocationWillingness: RestrictedProfileField<string>
  values: RestrictedProfileField<string[]>
  preferredAgeMin: RestrictedProfileField<number>
  preferredAgeMax: RestrictedProfileField<number>
  locationScope: RestrictedProfileField<string>
  preferredEducation: RestrictedProfileField<string>
  familyPlan: RestrictedProfileField<string>
  dealBreakers: RestrictedProfileField<string[]>
  smoking: RestrictedProfileField<'never' | 'social' | 'often'>
  drinking: RestrictedProfileField<'never' | 'social' | 'often'>
  exercise: RestrictedProfileField<string>
  activityLevel: RestrictedProfileField<string>
  weekendStyle: RestrictedProfileField<string>
  pets: RestrictedProfileField<string>
  personalityTraits: RestrictedProfileField<string[]>
  interests: RestrictedProfileField<string[]>
  communicationStyle: RestrictedProfileField<string>
  summary: string
  tags: string[]
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  access: ProfileAccessDTO
  favorite?: FavoriteStateDTO
  privateIntroduction: ProfilePrivateIntroductionDTO
}

interface SelfProfileDetailDTO extends ProfileDetailBaseDTO {
}

interface FamilyProfileDetailDTO extends ProfileDetailBaseDTO {}
```

前端可在 `src/mappers` 中把这些扁平字段组装为 `basics`、`relationship`、`lifestyle`、`preferences`、`family` 等页面 section；后端 DTO 不以页面分组作为字段结构来源。


隐藏偏好输入：

```text
profile_privacy_preferences:
  profileId
  hideMaritalStatus
  hideHasChildren
  hideChildrenPlan
  hideAcceptsLongDistance
  hideSmoking
  hideDrinking
```

展示权限输出：

```ts
type ProfileFieldLockCode = '__LOGIN_REQUIRED__' | '__MEMBER_ONLY__' | '__INTRODUCTION_REQUIRED__' | '__HIDDEN__'
type RestrictedProfileField<T> = T | ProfileFieldLockCode
type ProfileFieldCode =
  | 'photos'
  | 'country'
  | 'nationality'
  | 'languages'
  | 'industry'
  | 'careerDirection'
  | 'maritalStatus'
  | 'hasChildren'
  | 'childrenPlan'
  | 'acceptsLongDistance'
  | 'relationshipPlan'
  | 'residencePlan'
  | 'relocationWillingness'
  | 'values'
  | 'preferredAgeMin'
  | 'preferredAgeMax'
  | 'locationScope'
  | 'preferredEducation'
  | 'familyPlan'
  | 'dealBreakers'
  | 'smoking'
  | 'drinking'
  | 'exercise'
  | 'activityLevel'
  | 'weekendStyle'
  | 'pets'
  | 'personalityTraits'
  | 'interests'
  | 'communicationStyle'
  | 'contact'

interface ProfileAccessDTO {
  viewerRole: 'guest' | 'free_user' | 'member' | 'owner' | 'staff'
  accessLevel: 'visitor' | 'registered' | 'premium' | 'owner' | 'staff'
  canViewFullProfile: boolean
  canViewFamilySection: boolean
  canRequestIntroduction: boolean
  lockedFields: ProfileFieldLockDTO[]
  hiddenFields: string[]
}

interface ProfileFieldLockDTO {
  fieldCode: ProfileFieldCode
  reason: 'login' | 'member' | 'introduction' | 'staff' | 'hidden'
}

interface FavoriteStateDTO {
  isFavorite: boolean
  favoriteId?: string
}

interface ProfilePrivateIntroductionDTO {
  status: 'available' | 'login_required' | 'membership_required' | 'quota_exhausted' | 'requested' | 'accepted' | 'declined' | 'expired' | 'cooldown'
  requestId?: string
  membership: 'guest' | 'free' | 'silver' | 'gold' | 'diamond'
  quotaTotal: number
  quotaRemaining: number
  alreadyRequested: boolean
  canRequest: boolean
  expiresAt?: string
  cooldownUntil?: string
}
```

Rules:

- 后端决定字段是否展示。
- 后端用 `ProfileFieldLockCode` 遮罩受限字段；前端只根据 DTO 渲染锁定 / 隐藏状态。
- 后端永远先应用默认权限常量，再叠加 `profile_privacy_preferences` 的半敏感字段隐藏偏好。
- profile 所有人只能把允许自定义的半敏感字段继续隐藏，不能放开默认被锁定的字段。

Forbidden:

- Do not return contact values in profile detail.
- Do not let frontend decide raw field masking with scattered `isMember` checks.

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
profile_privacy_preferences
```

Rules:

- Self/family pages still consume DTOs, not database records.
- Ownership decides editable or managed profile scope.
- Family-specific sections use `familyVisible`, `allowFamilyContact`, `familyPriority` and access policy.
- Do not add family-only fields back into `users`.

## Profile Edit / Creation Chain

Flow:

```text
profile create/edit page
-> profile api
-> profiles write
-> profile_photos writes through separate endpoints where applicable
-> profile_ownerships created or updated
```


Localized write rule:

- `ProfileCreatePayload` and `ProfileUpdatePayload` accept plain strings from the current form locale.
- Backend writes each localized field to the request locale slot as `manual / human / ready`, including explicit empty strings.
- Other non-manual locale slots are kept as empty `machine / null / pending`; database never stores UI placeholder text.
- Public display DTOs use fallback resolver: current locale ready non-empty, then zh ready non-empty, then en ready non-empty, then any ready non-empty, otherwise `''`.
- Account profile detail editing DTO uses the exact request locale slot value and does not fallback, so untranslated languages appear as empty editable fields.
- Account profile detail editing DTO also returns `localizedMeta` for the request locale only. It exposes source / provider / status / updatedAt / hasValue per editable localized field, but does not return all three language values in one response.
- Empty locale slots are completed later by staff/admin review or translation tooling; frontend must not synthesize missing translations.

Profile main table writes:

```text
profileName
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
childrenPlan
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
  url, isPrimary, sortOrder, status


profile_contacts:
  phone, phoneVerificationStatus, email, emailVerificationStatus, wechat, wechatVerificationStatus, preferredChannel, visibility

profile_internal_records:
  employer, incomeRange, staffNotes, riskFlags, source, updatedByUserId

profile_verifications:
  legalName, dateOfBirth, identityStatus, educationStatus, incomeStatus, maritalStatus, reviewStatus, verifiedAt, verifiedByUserId

profile_privacy_preferences:
  hideMaritalStatus, hideHasChildren, hideChildrenPlan, hideAcceptsLongDistance, hideSmoking, hideDrinking
```

Forbidden writes:

```text
profiles.displayName
profiles.nickname unless redefined as reviewed publicAlias
profiles.avatarUrl
profiles.age
profiles.occupation
profiles.wantsChildren
profiles.datingIntentionLabel
profiles.phone
profiles.email
profiles.wechat
profiles.photos
profiles.pronouns
profiles.sexuality
profiles.interestedIn
profiles.hometown
profiles.livingSituation
profiles.zodiac
profiles.funFacts
profiles.highlights
profiles.conversationStarters
profiles.dateIdeas
profiles.compatibilityDimensions
```

## Account Center Write Chains

### Managed profile create

```text
/pages/account/profiles
-> create profile action
-> POST /api/account/profiles
-> create profiles row
-> derive initial current-user owner ownership from account attributes
-> create profile_verifications row with unverified / unreviewed defaults
-> rebuild AccountProfileDetailDTO
-> open / refresh AccountProfileDetailPageData
```

Rules:

- Creation starts from the managed profiles collection page, not from settings.
- The current user becomes the initial `owner`.
- The create action derives an initial ownership default from account attributes; the owner may later adjust it from profile detail.
- The created profile uses the same unified self / family account detail editor afterward.
- Create must write `profiles`, `profile_ownerships`, and `profile_verifications`.
- `profile_photos`、`profile_contacts`、`profile_privacy_preferences` 和 `profile_internal_records` 保持按需创建。

### Managed profile update

```text
/pages/account/profile-detail
-> account profile edit form
-> POST /api/account/profiles/:profileId
-> ownership permission check
-> profiles write
-> rebuild AccountProfileDetailDTO
-> refresh AccountProfileDetailPageData
```

Rules:

- Only `owner` and `manager` can write.
- This endpoint writes only profile main-table fields.
- Localized fields write only to the current request locale slot.
- `profileName` 是账户中心内部资料称呼。它只把当前语言槽位写为 `manual / human / ready`，不会为其他语言创建机翻任务。
- `profileStatus` and `isPriorityProfile` are not user-editable through this chain.

### Managed profile ownership update

```text
/pages/account/profile-detail
-> ownership editor
-> POST /api/account/profiles/:profileId/ownership
-> owner permission check
-> profile_ownerships write
-> rebuild AccountProfileDetailDTO
-> refresh AccountProfileDetailPageData
```

Rules:

- New profiles receive an initial ownership default from account attributes.
- The owner may adjust that relation later from the unified profile detail editor.
- This chain updates only `profile_ownerships`, not profile main-table fields.

### Managed profile contact update

```text
/pages/account/profile-detail
-> contact editor
-> POST /api/account/profiles/:profileId/contact
-> ownership permission check
-> profile_contacts upsert
-> rebuild AccountProfileDetailDTO
-> refresh AccountProfileDetailPageData
```

Rules:

- Contact information is edited as one flattened owner-side record, but it never writes back into `profiles`.
- Only `owner` and `manager` can write.
- The payload writes the flattened contact record: phone, email, wechat, preferred channel and the contact-level visibility policy.
- Public browsing detail DTOs still do not expose raw contact values.

### Managed profile photos update

```text
/pages/account/profile-detail
-> photos editor
-> POST / POST / DELETE profile photo endpoints
-> ownership permission check
-> profile_photos write
-> rebuild AccountProfileDetailDTO
-> refresh AccountProfileDetailPageData
```

Rules:

- Photos are maintained from the unified owner-side profile detail page.
- Photo writes stay in `profile_photos`; `avatarUrl` remains derived from the approved primary photo.
- Public profile chains only expose approved profile photos.
- Newly uploaded account photos start in `review`; debug or admin review moves them to `approved` or `hidden`.
- At most one approved primary photo may exist per profile.


### Managed profile archive

```text
/pages/account/profile-detail
-> delete profile action
-> POST /api/account/profiles/:profileId/archive
-> ownership permission check
-> relation safety check
-> profiles.archivedAt write
-> return AccountProfileArchiveResultDTO
-> refresh /pages/account/profiles
```

Rules:

- Only the `owner` can archive.
- `manager` cannot archive.
- Profiles with active formal relationship flows cannot be archived directly.
- `archivedAt` is a backend lifecycle marker, not another `profileStatus` value.
- `archivedAt != null` profiles no longer participate in new public directory results, recommendation, private-introduction creation, or other new business actions.
- Historical favorites, introductions, inbox threads and audit records remain queryable for history.
- Ordinary owner-side account DTOs do not return archived profiles. Historical retention remains backend-only unless a dedicated history surface is introduced later.
- The page may label the action as delete, but the backend lifecycle action is archive.

### 可管理 profile 半敏感字段隐藏偏好更新

```text
/pages/account/profile-detail
-> privacy preference editor
-> POST /api/account/profiles/:profileId/privacy-preferences
-> ownership permission check
-> profile_privacy_preferences update/create
-> return AccountProfilePrivacyPreferencesDTO
-> refresh privacyPreferenceItems
```

Rules:

- 只允许更新 `hideMaritalStatus`、`hideHasChildren`、`hideChildrenPlan`、`hideAcceptsLongDistance`、`hideSmoking`、`hideDrinking`。
- 未传入的布尔字段不覆盖。
- 隐藏偏好属于具体 profile，不是 account-wide 设置。
- 工作人员强制隐藏、审核锁定、会员权限规则不进入这张表。

### Account preferences update

```text
/pages/account/settings
-> preference controls
-> POST /api/account/settings/preferences
-> user_preferences typed row update/create
-> return AccountSettingsDTO
-> refresh AccountSettingsPageData
```

Rules:

- Account settings writes the current user's single typed `user_preferences` row.
- Settings stores explicit preference fields, never display copy.
- This chain does not mutate `users`, `auth_identities`, or agreement acceptance history.

### Account basics update

```text
/pages/account/settings
-> account identity form
-> POST /api/account/me
-> users write
-> return AccountMeDTO
-> refresh account shell and AccountSettingsPageData
```

Rules:

- Only `accountName` and `avatarUrl` are writable in this phase.
- `preferredLocale` remains owned by the language flow.
- `status` and auth identities are not mutated here.

### Membership upgrade

```text
/pages/account/membership
-> choose target plan
-> POST /api/account/membership/upgrade
-> return placeholder external-flow acknowledgement
-> return AccountMembershipUpgradeResultDTO
```

Rules:

- Phase 5.5 only reserves the upgrade entry point.
- Formal payment or staff confirmation is introduced later before membership state changes.
- The page contract stays stable even if the execution path later becomes asynchronous.
- Membership tier is never written into `users`.

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
  status: 'open' | 'waitlist' | 'closed' | 'completed'
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
- Directory card status is derived from `events.status`, not from remaining seats.
- `memberOnly` in DTO is derived from `events.visibility === 'member'`; do not persist a second boolean source of truth on EventRecord.
- Directory DTO exposes `venue` only; exact `address` is detail-only and requires backend viewer checks.
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
  address?: string
  addressVisible: boolean
  addressLockReason?: 'login_required' | 'registration_required' | 'confirmation_required'
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
  curatorNote: string
  coverImageUrl: string
  agendaItems: EventAgendaItemDTO[]
  registration: EventRegistrationStateDTO
}
```

Address rules:

- `venue` is the public place label.
- `events.address` is the exact address and is only returned from detail/account contexts after backend checks `events.addressVisibility`.
- `registered_only` requires a logged-in viewer.
- `confirmed_attendee_only` requires a confirmed event registration.
- `confirmed_attendee_only` maps to `addressLockReason = 'confirmation_required'` when the viewer is logged in but not confirmed.
- Frontend renders the returned `addressVisible` / `addressLockReason`; it must not infer or reconstruct the exact address.

Registration flow:

```text
POST /api/events/:id/register
-> viewer context
-> event capacity and membership check
-> create/update event_registrations.status = requested
-> return EventRegistrationStateDTO + derived counts

Event review / admin action
-> staff context
-> update event_registrations.status = confirmed / waitlist / declined
-> return EventRegistrationStateDTO + derived counts

Event settlement
-> scheduled settlement or staff attendance confirmation
-> update confirmed event_registrations.status = attended
-> return attended as a user-visible terminal state

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

Home flow:

```text
account home page
-> account dashboard api
-> users
-> profile_ownerships
-> membership_plans
-> user_memberships
-> user_entitlement_balances
-> event_registrations
-> private_introduction_requests
-> favorite_profiles count
-> AccountDashboardDTO
```

Home DTO:

```ts
interface AccountDashboardDTO {
  user: AccountUserDTO
  profiles: ManagedProfileSummaryDTO[]
  membership: AccountMembershipDTO
  entitlements: AccountEntitlementBalanceDTO[]
  upcomingEvents: AccountEventRegistrationDTO[]
  recentIntroductions: AccountIntroductionSummaryDTO[]
  favoriteCount: number
}
```

Split account endpoint flows:

```text
GET /api/account/me
-> users
-> AccountMeDTO

GET /api/account/profiles
-> profile_ownerships
-> profile_verifications
-> profile_privacy_preferences
-> derived profile identity
-> AccountProfilesDTO

GET /api/account/membership
-> membership_plans
-> user_memberships
-> user_entitlement_balances
-> AccountMembershipDTO + AccountEntitlementBalanceDTO[]

GET /api/account/favorites
-> favorite_profiles
-> derived profile identity
-> FavoriteProfileSummaryDTO[]

GET /api/account/events
-> event_registrations
-> derived event summary
-> AccountEventRegistrationDTO[]

GET /api/account/private-introductions
-> private_introduction_requests
-> derived profile identity
-> AccountIntroductionSummaryDTO[]

GET /api/account/settings
-> users + auth_identities + user_preferences
-> AccountSettingsDTO

GET /api/account/inbox-summary
-> inbox_threads
-> inbox_messages latest summary
-> inbox_reads
-> AccountInboxSummaryDTO
```

Rules:

- Account user identity comes from `users`.
- Managed profiles come from `profile_ownerships`.
- Membership comes from membership collections.
- Preferences come from `user_preferences`, not legacy `privacy_settings.title/desc`.
- Agreement acceptance records stay backend/audit data and are not shown in account pages by default.
- Account profile detail 读取 `profile_privacy_preferences` 作为类型明确的布尔偏好，不存页面文案。
- Dashboard returns `favoriteCount`, not a full favorites list; detailed favorites stay under relationship.
- Dashboard only returns summary slices: `upcomingEvents` and `recentIntroductions`; full event and introduction lists stay on their dedicated pages.
- Staff tasks are internal by default and do not enter account dashboard DTOs directly; user-visible follow-up should be exposed through inbox messages or the specific business DTO that owns the state.
- Account profile summaries must use profile DTO mappers, not raw profile records.
- Account must not require `profiles.occupation`, `profiles.displayName`, `profiles.highlights`, or contact fields.

Forbidden:

- Do not store account page copy in database.
- Do not store privacy setting title/description in database.
- Do not let account summary force profile fields back into `profiles`.

Page composition:

```text
/pages/account/index
-> dashboard summary
-> user stage decides primary action and module order

/pages/account/relationship
-> favorites
-> private introductions
-> one account relationship page with tabs

/pages/messages/index
-> inbox threads
-> private introduction messages
-> standalone message center, not an account relationship tab

/pages/account/profiles
-> managed profiles
-> profile verifications
-> profile 半敏感字段隐藏偏好
-> one self-presentation page

/pages/account/events
-> account event registrations
-> event directory recommendations
-> one participation page

/pages/account/membership
-> membership
-> entitlements
-> available plans
-> one service-value page

/pages/account/settings
-> user preferences
-> legal document entry points from legal API
-> one low-frequency configuration page
```

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
  updatedAt
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
-> user_entitlement_balances
-> MembershipDTO / EntitlementDTO
```

Database:

```text
membership_plans:
  tier
  name
  description
  priceCents
  currency
  billingPeriod
  privateIntroductionQuota
  privateIntroductionPeriod
  eventPriorityEnabled
  staffReviewEnabled
  profileDetailAccessLevel
  staffSupportLevel
  conciergePriority
  featured
  sortOrder
  isActive

user_memberships:
  userId
  planId
  tier
  status
  startedAt
  expiresAt

user_entitlement_balances:
  userId
  membershipId
  entitlementCode
  periodStartedAt
  periodEndsAt
  quotaTotal
  quotaUsed
  quotaRemaining
```

Rules:

- User tier is not stored directly on `users`.
- Quota is not derived ad hoc from a string tier in page code.
- Private introduction permission reads entitlement result from backend DTO.
- `profile_detail_access` means paid viewer access to additional restricted profile detail fields. It does not control a user's own profile exposure or ranking; those remain under default profile access, `profile_privacy_preferences`, and staff policy.

## Private Introduction Chain

Flow:

```text
profile detail CTA
-> POST /api/profiles/self/:id/private-introduction or POST /api/profiles/family/:id/private-introduction
-> viewer context
-> profile ownership check
-> membership entitlement check
-> contact visibility remains closed
-> private_introduction_requests write
-> entitlement balance update if needed
-> ProfilePrivateIntroductionDTO / PrivateIntroductionDTO
```

Inbox flow:

```text
accepted private introduction
-> create or open inbox_threads where type = private_introduction and subjectId = requestId
-> create inbox_messages status update
-> GET /api/inbox/threads/:id?before=&limit=
-> viewer thread ownership check
-> inbox_messages cursor page
-> InboxThreadDetailDTO

POST /api/inbox/threads/:id/messages
-> viewer thread ownership check
-> thread status and moderation checks
-> inbox_messages write
-> InboxMessageDTO
```

Database:

```text
private_introduction_requests:
  id
  requesterUserId
  requesterProfileId?
  targetProfileId
  status
  message?
  requestedAt
  expiresAt?
  respondedAt?
  cooldownUntil?
  entitlementBalanceId?
  createdAt
  updatedAt

inbox_threads:
  id
  userId
  type
  subjectType?
  subjectId?
  status
  createdAt
  updatedAt

inbox_messages:
  id
  threadId
  senderType
  senderUserId
  messageType
  body
  actionType?
  actionPayload?
  createdAt
  updatedAt

inbox_reads:
  id
  threadId
  userId
  lastReadAt
  createdAt
  updatedAt
```

Rules:

- Profile detail never returns contact values just because a request exists.
- Contact values can only be exposed through a controlled private introduction / inbox flow.
- Users cannot request introduction to their own managed profile.
- Quota and membership checks happen on backend.
- Private introduction keeps the current self/family split: `POST /api/profiles/self/:id/private-introduction` and `POST /api/profiles/family/:id/private-introduction`.
- `:id` is the target profile id; profile detail pages do not repeat `targetProfileId` in request body.
- `cooldown` is derived from `status = 'declined'` plus `cooldownUntil`; do not use `cooldown` as a persisted request status.
- `expired` is derived from `status = 'requested'` plus `expiresAt < now`; do not use `expired` as a persisted request status.
- `quota_exhausted` is a DTO state returned by the create action when entitlement balance is insufficient; it is not persisted as request status.
- Inbox messages use cursor pagination. Do not return the full message history by default.

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
phone/email/wechat -> profile_contacts
legalName/dateOfBirth/statuses -> profile_verifications
employer/income/staff notes/risk flags -> profile_internal_records
field privacy（半敏感字段隐藏偏好）-> profile_privacy_preferences
agenda -> event_agenda_items
user registration -> event_registrations
registration path -> request-time routing intent only
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
profile access state
private introduction state
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

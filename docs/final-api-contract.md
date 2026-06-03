# Final API Contract

本文定义最终目标下前端 API 层应面对的 endpoint、query、payload 和 DTO 字段。它不描述数据库存储细节，也不描述页面如何排版。
配套文档：
- `docs/final-database-schema.md`：最终数据库字段。
- `docs/final-page-fields.md`：最终页面 ViewModel 字段。
- `docs/final-data-flow-contract.md`：数据库、API、mapper、页面之间的数据流动。
- `docs/deployment-guide.md`：部署前检查和运行边界。

## Global Rules

- API 文档拥有 HTTP 边界和 DTO 类型，页面不直接调用 HTTP。
- API 到前端的业务字段尽量扁平。
- 后端不返回 i18n key；返回 code 或已按 locale 本地化后的文案。
- DTO 可以包含派生字段，例如 `displayName`、`avatarUrl`、`age`、`memberOnly`、`registeredCount`。
- DTO 不返回数据库 Record。
- DTO 不返回 profile 联系方式值；联系方式只允许通过 private introduction / inbox flow 的独立接口开放。
- `X-User-Id` 只作为 development / staging 的 mock request context；production 前端使用 `Authorization: Bearer <token>`。RuoYi 后端应在登录 / 注册返回可校验 JWT 或同等 Bearer token。
- 所有列表接口统一返回 `items + pagination + facets?`。
- 所有写操作返回变更后的领域状态 DTO，不要求前端自行拼状态。
## Common Types

```ts
type LocaleCode = 'zh' | 'fr' | 'en'
type RegisterProvider = 'email' | 'phone'
type RegisterPath = 'self' | 'family'
type LegalDocumentType = 'terms' | 'privacy'
type ViewerRole = 'guest' | 'free_user' | 'member' | 'owner' | 'staff'
type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond'
type IntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired'
type ProfileAccessLevel = 'visitor' | 'registered' | 'premium' | 'owner' | 'staff'
type ProfileFieldLockCode = '__LOGIN_REQUIRED__' | '__MEMBER_ONLY__' | '__INTRODUCTION_REQUIRED__' | '__HIDDEN__'
type RestrictedProfileField<T> = T | ProfileFieldLockCode
type EntitlementCode = 'private_introduction' | 'event_priority' | 'staff_review' | 'profile_detail_access'
type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
type ProfileReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
type PreferredContactChannel = 'email' | 'phone' | 'wechat'
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
  | 'relationshipGoal'
  | 'residencePlan'
  | 'relocation'
  | 'relationshipValues'
  | 'preferredAgeMin'
  | 'preferredAgeMax'
  | 'preferredLocation'
  | 'preferredEducation'
  | 'familyLife'
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

interface PaginationDTO {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface ApiErrorDTO {
  code: string
  message: string
}
```

## Endpoint Overview

| Domain | Method | Endpoint | Purpose |
| --- | --- | --- | --- |
| Auth | `POST` | `/api/auth/register` | 创建账户；注册入口路径只用于前端注册成功后的落点。 |
| Auth | `POST` | `/api/auth/verification-code` | Request registration verification code metadata. Product response does not include the code. |
| Auth | `POST` | `/api/auth/login` | 登录并返回 session。 |
| Legal | `GET` | `/api/legal/documents/:type` | 获取当前生效服务条款或隐私说明。 |
| Profiles | `GET` | `/api/profiles/self` | self 资料目录。 |
| Profiles | `GET` | `/api/profiles/family` | family 资料目录。 |
| Profiles | `GET` | `/api/profiles/self/:id` | self 资料详情。 |
| Profiles | `GET` | `/api/profiles/family/:id` | family 资料详情。 |
| Profiles | `POST` | `/api/profiles/self` | 创建 self profile。 |
| Profiles | `POST` | `/api/profiles/family` | 创建 family profile。 |
| Profiles | `POST` | `/api/profiles/self/:id` | 更新 self profile。 |
| Profiles | `POST` | `/api/profiles/family/:id` | 更新 family profile。 |
| Profiles | `POST` | `/api/profiles/self/:id/photos` | 新增 self profile 照片。 |
| Profiles | `POST` | `/api/profiles/family/:id/photos` | 新增 family profile 照片。 |
| Profiles | `POST` | `/api/profiles/self/:id/photos/:photoId` | 更新 self profile 照片。 |
| Profiles | `POST` | `/api/profiles/family/:id/photos/:photoId` | 更新 family profile 照片。 |
| Favorites | `POST` | `/api/favorites/:profileId` | 收藏 profile。 |
| Favorites | `DELETE` | `/api/favorites/:profileId` | 取消收藏。 |
| Private Introductions | `POST` | `/api/profiles/self/:id/private-introduction` | 从 self detail 申请私人介绍。 |
| Private Introductions | `POST` | `/api/profiles/family/:id/private-introduction` | 从 family detail 申请私人介绍。 |
| Inbox | `GET` | `/api/inbox/threads` | 消息中心线程列表。 |
| Inbox | `GET` | `/api/inbox/threads/:id` | 查看消息中心线程详情。 |
| Inbox | `POST` | `/api/inbox/threads/:id/messages` | 在允许的受控线程中发送消息。 |
| Inbox | `POST` | `/api/inbox/threads/:id/read` | 标记线程已读。 |
| Events | `GET` | `/api/events` | 活动目录。 |
| Events | `GET` | `/api/events/:id` | 活动详情。 |
| Events | `POST` | `/api/events/:id/register` | 报名活动。 |
| Events | `POST` | `/api/events/:id/cancel` | 取消活动报名。 |
| Account | `GET` | `/api/account/me` | 当前账户身份。 |
| Account | `GET` | `/api/account/dashboard` | 账户首页阶段引导与动态摘要。 |
| Account | `GET` | `/api/account/profiles` | 用户管理的 profiles 与认证摘要。 |
| Account | `GET` | `/api/account/profiles/:profileId` | 单份可管理 profile 的完整详情、认证和字段可见性。 |
| Account | `GET` | `/api/account/membership` | 当前会员、权益和可升级套餐。 |
| Account | `GET` | `/api/account/favorites` | 收藏列表。 |
| Account | `GET` | `/api/account/events` | 活动报名。 |
| Account | `GET` | `/api/account/private-introductions` | 私人介绍申请。 |
| Account | `GET` | `/api/account/private-introductions/:requestId/contact` | accepted 私人介绍后的联系方式开放。 |
| Account | `GET` | `/api/account/inbox-summary` | 账户入口使用的消息中心摘要。 |
| Account | `GET` | `/api/account/settings` | 账户偏好设置。 |
| Account | `POST` | `/api/account/profiles/save` | 新建或保存可管理 profile 的主体字段、归属关系、受控联系方式和照片草稿。 |
| Account | `POST` | `/api/account/profiles/:profileId/archive` | 将满足规则的可管理 profile 归档退出业务。 |
| Account | `POST` | `/api/account/profiles/:profileId/privacy-preferences` | 更新可管理 profile 的半敏感字段隐藏偏好。 |
| Account | `POST` | `/api/account/me` | 更新账户基础信息。 |
| Account | `POST` | `/api/account/settings/preferences` | 更新账户偏好。 |
| Account | `GET` | `/api/account/mfa/status` | 读取二次验证状态与可用验证方式。 |
| Account | `POST` | `/api/account/mfa/verification-code` | 为开启或关闭二次验证发送验证码。 |
| Account | `POST` | `/api/account/mfa/enable` | 验证后开启二次验证。 |
| Account | `POST` | `/api/account/mfa/disable` | 验证后关闭二次验证。 |
| Account | `POST` | `/api/account/security/challenge-code` | 为敏感操作发送二次验证验证码。 |
| Account | `POST` | `/api/account/security/challenge` | 校验敏感操作验证码并返回短期 challenge token。 |
| Account | `POST` | `/api/account/membership/upgrade` | 发起会员升级。 |
| Debug | `GET` | `/api/debug/private-introductions` | 调试私人介绍申请。 |
| Debug | `POST` | `/api/debug/private-introductions/:id/accept` | 调试接受申请。 |
| Debug | `POST` | `/api/debug/private-introductions/:id/decline` | 调试拒绝申请。 |

## Auth API

### Register

```ts
interface RegisterPayload {
  path: RegisterPath
  provider: RegisterProvider
  identifier: string
  code: string
  password: string
  accountName: string
  preferredLocale: LocaleCode
}

interface AuthVerificationCodeRequestPayload {
  provider: RegisterProvider
  identifier: string
}

interface AuthVerificationCodeRequestResultDTO {
  id: string
  expiresAt: string
}

interface AuthSessionDTO {
  token: string
  user: AuthUserDTO
  membership: AuthSessionMembershipDTO | null
}

interface AuthSessionMembershipDTO {
  tier: MembershipTier
  status: 'active' | 'expired' | 'cancelled' | 'paused'
}

interface AuthUserDTO {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: LocaleCode
}

```

- 注册 payload 不包含 `city`。
- 注册不创建 profile。
- `RegisterPayload.path` 只表示本次注册入口，用于前端注册成功后跳转 self 或 family 目录；后端不持久化 onboarding 状态。
- 成功注册 / 成功登录即表示用户接受当前 active 服务条款与隐私说明；后端自动写入 `user_agreement_acceptances`，版本不变则跳过。
- 注册页不展示 `preferredLocale` 手动选择器；前端用当前页面 locale 自动填充 `RegisterPayload.preferredLocale`。
- 登录和注册都返回 `AuthUserDTO.preferredLocale`；前端登录成功后用它同步 locale store。
- 当前注册只开放 `email`、`phone`；`wechat`、`google` 是最终 `auth_identities` 预留 provider。
- `AuthSessionDTO.token` 是前端持久化并在 production 请求中作为 `Authorization: Bearer <token>` 发送的登录凭证。mock 可继续返回 `mock-token-*`，RuoYi 后端应返回 JWT 或同等可校验 token。
### Login

```ts
interface LoginPayload {
  identifier: string
  password: string
}
```

返回 `AuthSessionDTO`。
## Legal API

### Get Legal Document

```text
GET /api/legal/documents/:type?lang=zh
```

`:type` 为 `terms` 或 `privacy`。

若目标 `lang` 暂无 active 文档，mock 后端可回退到 `zh` active 文档；正式库应补齐三语言协议版本。
```ts
interface LegalDocumentDTO {
  type: LegalDocumentType
  version: string
  locale: LocaleCode
  title: string
  sections: LegalDocumentSectionDTO[]
  effectiveAt: string
}

interface LegalDocumentSectionDTO {
  heading: string
  clauses: LegalDocumentClauseDTO[]
}

interface LegalDocumentClauseDTO {
  number: string
  body: string
}
```

- 返回当前 locale 下 active 的指定类型文档。
- 前端 `AgreementDialog` 打开时按需调用，不预加载。
- `sections` 为协议正文结构；前端按 section heading 与 clause 字段渲染，不解析 Markdown。
## Profiles API

### Profile Directory

Profile 目录 API 当前按入口拆分，不使用 `view` query：
```text
GET /api/profiles/self
GET /api/profiles/family
```

```ts
interface SelfProfileDirectoryQuery {
  page: number
  pageSize: number
  sort?: 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'
  gender?: string
  ageRange?: string
  heightRange?: string
  city?: string
  education?: string
  industry?: string
  language?: string
  verified?: string
  maritalStatus?: string
  hasChildren?: string
  acceptsLongDistance?: string
  datingIntentionCode?: string
}

interface FamilyProfileDirectoryQuery {
  page: number
  pageSize: number
  sort?: 'priorityFirst' | 'recentActive' | 'ageAsc' | 'ageDesc'
  gender?: string
  ageRange?: string
  city?: string
  education?: string
  datingIntentionCode?: string
  familyMode?: 'priority' | 'contact_ready' | 'context_only'
  industry?: string
  maritalStatus?: string
  hasChildren?: string
  acceptsLongDistance?: string
}

interface SelfProfileDirectoryResponseDTO {
  items: SelfProfileDirectoryItemDTO[]
  pagination: PaginationDTO
  facets: SelfProfileDirectoryFacetsDTO
}

interface FamilyProfileDirectoryResponseDTO {
  items: FamilyProfileDirectoryItemDTO[]
  pagination: PaginationDTO
  facets: FamilyProfileDirectoryFacetsDTO
}

interface ProfileDirectoryBaseItemDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: 'male' | 'female'
  age: number
  city: string
  profileStatus: 'open' | 'review'
  education: string
  industry: string
  datingIntentionCode: string
  datingIntentionLabel: string
  tags: string[]
  summary: string
}

interface SelfProfileDirectoryItemDTO extends ProfileDirectoryBaseItemDTO {
  languages: string[]
}

interface FamilyProfileDirectoryItemDTO extends ProfileDirectoryBaseItemDTO {
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  acceptsLongDistance: boolean
  relationshipGoal: string
  residencePlan: string
}

interface SelfProfileDirectoryFacetsDTO {
  gender: ProfileFacetOptionDTO[]
  cities: ProfileFacetOptionDTO[]
  education: ProfileFacetOptionDTO[]
  industries: ProfileFacetOptionDTO[]
  intents: ProfileIntentFacetDTO[]
  languages: string[]
}

interface FamilyProfileDirectoryFacetsDTO {
  gender: ProfileFacetOptionDTO[]
  cities: ProfileFacetOptionDTO[]
  education: ProfileFacetOptionDTO[]
  industries: ProfileFacetOptionDTO[]
  intents: ProfileIntentFacetDTO[]
}

interface ProfileFacetOptionDTO {
  value: string
  label: string
  count: number
}

interface ProfileIntentFacetDTO {
  code: string
  label: string
}
```

### Profile Detail

Profile detail API 当前按入口拆分，不使用统一的 `/api/profiles/:id`：
```text
GET /api/profiles/self/:id
GET /api/profiles/family/:id
```

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
  relationshipGoal: RestrictedProfileField<string>
  residencePlan: RestrictedProfileField<string>
  relocation: RelocationCode
  relationshipValues: RelationshipValueCode[]
  preferredAgeMin: RestrictedProfileField<number>
  preferredAgeMax: RestrictedProfileField<number>
  preferredLocation: LocationScopeCode
  preferredEducation: RestrictedProfileField<string>
  familyLife: RestrictedProfileField<string>
  dealBreakers: RestrictedProfileField<string[]>
  smoking: RestrictedProfileField<'never' | 'social' | 'often'>
  drinking: RestrictedProfileField<'never' | 'social' | 'often'>
  exercise: RestrictedProfileField<string>
  activityLevel: ActivityLevelCode
  weekendStyle: WeekendStyleCode
  pets: PetCode
  personalityTraits: RestrictedProfileField<string[]>
  interests: RestrictedProfileField<string[]>
  communicationStyle: CommunicationStyleCode
  summary: string
  tags: string[]
  familyVisible: boolean
  access: ProfileAccessDTO
  favorite?: FavoriteStateDTO
  privateIntroduction: ProfilePrivateIntroductionDTO
}

interface SelfProfileDetailDTO extends ProfileDetailBaseDTO {
}

interface FamilyProfileDetailDTO extends ProfileDetailBaseDTO {}

interface ProfileAccessDTO {
  viewerRole: ViewerRole
  accessLevel: ProfileAccessLevel
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

interface ProfilePhotoDTO {
  id: string
  url: string
  isPrimary: boolean
  sortOrder: number
}


interface FavoriteStateDTO {
  isFavorite: boolean
  favoriteId?: string
  canFavorite: boolean
  unavailableReason?: 'visitor' | 'own_profile'
}

interface ProfilePrivateIntroductionDTO {
  status: 'available' | 'login_required' | 'membership_required' | 'quota_exhausted' | 'requested' | 'accepted' | 'declined' | 'expired' | 'cooldown'
  requestId?: string
  membership: MembershipTier | 'guest'
  quotaTotal: number
  quotaRemaining: number
  alreadyRequested: boolean
  canRequest: boolean
  expiresAt?: string
  cooldownUntil?: string
}
```

- `ProfileDetailBaseDTO` / `SelfProfileDetailDTO` / `FamilyProfileDetailDTO` 保持扁平字段；页面 section 由前端 mapper 组装。
- 受限字段返回 `ProfileFieldLockCode`；前端不根据会员状态自行判断原始字段是否可见。
- `privateIntroduction` 只表达申请状态和额度，不包含 phone / email / wechat。

禁止返回：
```text
ProfileRecord
phone
email
wechat
legalName
profiles.displayName
profiles.avatarUrl
profiles.age
profiles.datingIntentionLabel
profiles.occupation
profiles.nickname
profiles.wantsChildren
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
profiles.photos
```

### Favorite Actions

```ts
interface FavoriteActionResponseDTO {
  favoriteId: string
  alreadyFavorited: boolean
}
```

### Profile Create / Update

```ts
interface ProfileCreatePayload {
  gender: 'male' | 'female'
  birthYear: number
  height: number
  city: string
  country: string
  nationality: string
  languages: string[]
  degreeLevel: 'bachelor' | 'master' | 'phd'
  education: string
  industry: string
  careerDirection?: string
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  childrenPlan: 'wants' | 'open_to_discuss' | 'does_not_want'
  acceptsLongDistance: boolean
  datingIntentionCode: string
  relationshipGoal: string
  residencePlan: string
  relocation: RelocationCode
  relationshipValues: RelationshipValueCode[]
  preferredAgeMin: number
  preferredAgeMax: number
  preferredLocation: LocationScopeCode
  preferredEducation: string
  familyLife: string
  dealBreakers: string[]
  smoking: 'never' | 'social' | 'often'
  drinking: 'never' | 'social' | 'often'
  exercise: string
  activityLevel: ActivityLevelCode
  weekendStyle: WeekendStyleCode
  pets: PetCode
  personalityTraits: string[]
  interests: string[]
  communicationStyle: CommunicationStyleCode
  summary: string
  tags: string[]
  familyVisible: boolean
}

type ProfileUpdatePayload = Partial<ProfileCreatePayload>

interface ProfileMutationResponseDTO {
  profile: SelfProfileDetailDTO | FamilyProfileDetailDTO
}

```

- 创建 / 更新 payload 使用前端输入值；后端负责保存为目标数据库结构和本地化字段。
- `ProfileCreatePayload` / `ProfileUpdatePayload` 中的单语言字符串按请求 locale 写入 `LocalizedText` 的对应语言；当前 locale 保存为 `manual / human / ready`，其他非人工 locale 保存为空字符串 `machine / null / pending`，由后台、staff 或后续翻译流程补齐。
- public profile API 使用带 fallback 的本地化解析，跳过空字符串和 pending 值；account profile detail 编辑 API 使用当前 `lang` 槽位原值，不做 fallback。
- 创建 profile 时同步创建或更新 `profile_ownerships`。
## Private Introduction API

```ts
interface PrivateIntroductionDTO {
  requestId: string
  requesterUserId: string
  requesterProfileId?: string
  targetProfileId: string
  status: IntroductionStatus | 'cooldown' | 'quota_exhausted'
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
  quotaRemaining?: number
}
```

- self/family detail 继续使用分开的申请入口：`POST /api/profiles/self/:id/private-introduction` 和 `POST /api/profiles/family/:id/private-introduction`。
- `:id` 就是 target profile id，前端不在 body 里重复传 `targetProfileId`。
- 后端检查 ownership、membership entitlement、quota 和 cooldown。
- `cooldown` 是 DTO 派生状态，数据库使用 `declined + cooldownUntil`。
- `expired` 是 DTO 派生状态，数据库使用 `requested + expiresAt < now`；过期后是否进入 cooldown 由服务策略决定。
- 额度不足时返回 `quota_exhausted` 状态，不要求前端把普通错误转换成业务状态。
### Contact Reveal After Accepted Introduction

```ts
interface AccountPrivateIntroductionContactDTO {
  requestId: string
  targetProfileId: string
  preferredChannel?: 'phone' | 'email' | 'wechat'
  phone?: string
  email?: string
  wechat?: string
  unavailableReason?: 'not_accepted' | 'contact_disabled' | 'owner_only' | 'not_found'
}
```

Rules:

- `GET /api/account/private-introductions/:requestId/contact` only serves the requester of that private introduction request.
- Contact values are returned only when the request is accepted and `profile_contacts.visibility === 'after_introduction'`.
- `owner_only` and `disabled` do not expose contact values to the requester; return an unavailable reason instead.
- Profile detail DTOs must not expose contact values.

## Inbox API

```ts
interface InboxThreadSummaryDTO {
  threadId: string
  category: 'system' | 'chat'
  subjectType?: InboxSubjectType
  subjectId?: string
  title: string
  preview: string
  status: 'open' | 'closed' | 'archived'
  unread: boolean
  updatedAt: string
}

interface InboxThreadDetailDTO {
  thread: InboxThreadSummaryDTO
  messages: InboxMessageDTO[]
  messagePage: InboxMessagePageDTO
  composer?: InboxComposerDTO
}

interface InboxMessageDTO {
  messageId: string
  senderType: 'system' | 'staff' | 'user'
  senderUserId?: string
  messageType: 'text' | 'system_notice' | 'status_update' | 'action_prompt'
  body: string
  templateCode?: string
  templateLocale?: 'zh' | 'fr' | 'en'
  actionType?: string
  actionPayload?: unknown
  createdAt: string
}

interface SendInboxMessagePayload {
  body: string
}

interface InboxComposerDTO {
  enabled: boolean
  disabledReason?: 'closed' | 'staff_only' | 'rate_limited'
}

interface InboxMessagePageDTO {
  limit: number
  hasMore: boolean
  nextBefore?: string
}
```

Rules:

- `GET /api/inbox/threads`, `GET /api/inbox/threads/:id/messages?before=&limit=`, and `POST /api/inbox/threads/:id/read` provide notification detail viewing.
- `POST /api/inbox/threads/:id/messages` stays in the contract for controlled conversation work, but current UI does not expose message sending.
- Accepted private introductions do not automatically create chat rooms; requester contact reveal is handled by `GET /api/account/private-introductions/:requestId/contact`.
- User-visible event, profile review, legal document, membership, and staff notices should enter inbox threads/messages instead of a separate notifications table.

## Events API

### Event Directory

```ts
interface EventDirectoryQuery {
  page: number
  pageSize: number
  city?: string
  status?: string
  visibility?: 'public' | 'registered' | 'member'
  month?: string
}

interface EventDirectoryResponseDTO {
  items: EventDirectoryItemDTO[]
  pagination: PaginationDTO
  facets: EventDirectoryFacetsDTO
}

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

interface EventDirectoryFacetsDTO {
  city: EventFacetOptionDTO[]
  status: EventFacetOptionDTO[]
  visibility: EventFacetOptionDTO[]
  month: EventFacetOptionDTO[]
}

interface EventFacetOptionDTO {
  value: string
  label: string
  count: number
}
```

`memberOnly` 由 `visibility === 'member'` 派生。
### Event Detail

```ts
interface EventDetailDTO extends EventDirectoryItemDTO {
  address?: string
  addressVisible: boolean
  addressLockReason?: 'login_required' | 'registration_required' | 'confirmation_required'
  languageCodes: string[]
  curatorNote: string
  agendaItems: EventAgendaItemDTO[]
  registration: EventRegistrationStateDTO
}

interface EventAgendaItemDTO {
  id: string
  time: string
  title: string
  description: string
  sortOrder: number
}

interface EventRegistrationStateDTO {
  status: 'guest' | 'available' | 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended' | 'closed' | 'member_required'
  registrationId?: string
}
```

`venue` 是可公开展示的地点名称；`address` 是精确地址，只在后端判断当前 viewer 满足地址可见规则时返回。活动列表不返回精确地址，避免未登录用户从列表一次性看到线下地址。
### Event Registration

```ts
interface EventRegistrationResponseDTO {
  registration: EventRegistrationStateDTO
  registeredCount: number
  waitlistCount: number
  remainingSeats: number
}
```

## Account API

Account API 不应继续用一个过大的 legacy overview 反向决定数据库结构。可以保留 `dashboard` 作为页面聚合 DTO，但 source of truth 来自独立集合。
### Account Me

```ts
interface AccountMeDTO {
  user: AccountUserDTO
}

interface AccountUserDTO {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: LocaleCode
  status: 'active' | 'deactivated' | 'suspended'
}
```

### Account Dashboard

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

### Account Profiles

```ts
interface AccountProfilesDTO {
  profiles: ManagedProfileSummaryDTO[]
}

interface AccountProfileDetailDTO {
  profileId: string
  profileType: 'self' | 'family'
  profileName: string
  avatarUrl: string
  ownership: {
    relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
    permission: 'owner' | 'manager'
    status: 'pending' | 'active' | 'revoked'
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
  }
  verification: AccountProfileVerificationDTO
  privacyPreferences: AccountProfilePrivacyPreferencesDTO
  localizedMeta: AccountProfileLocalizedMetaDTO
  contact: AccountProfileContactDTO
  photos: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number; status: 'review' | 'approved' | 'hidden' }>
  // 其余业务字段与当前 profile 主表字段保持扁平一致。
}

interface AccountProfileLocalizedMetaDTO {
  editLocale: 'zh' | 'fr' | 'en'
  fields: Record<string, EditableLocalizedFieldMetaDTO | EditableLocalizedFieldMetaDTO[]>
}

interface EditableLocalizedFieldMetaDTO {
  locale: 'zh' | 'fr' | 'en'
  source: 'manual' | 'machine' | null
  provider: 'human' | 'translation_api' | null
  status: 'ready' | 'pending' | 'failed' | 'stale' | 'missing'
  updatedAt?: string
  hasValue: boolean
}

interface ManagedProfileSummaryDTO {
  profileId: string
  profileType: 'self' | 'family'
  profileName: string
  avatarUrl: string
  age: number
  city: string
  relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
  permission: 'owner' | 'manager'
  ownershipStatus: 'pending' | 'active' | 'revoked'
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  verification: AccountProfileVerificationDTO
}

interface AccountProfileVerificationDTO {
  legalName?: string
  dateOfBirth?: string
  identityStatus: ProfileVerificationStatus
  educationStatus: ProfileVerificationStatus
  incomeStatus: ProfileVerificationStatus
  maritalStatus: ProfileVerificationStatus
  reviewStatus: ProfileReviewStatus
  verifiedByUserId?: string
}
```

### Account Membership

```ts
interface AccountMembershipDTO {
  tier: MembershipTier
  name: string
  status: 'active' | 'expired' | 'cancelled' | 'paused'
  startedAt: string
  expiresAt?: string
  staffSupportLevel: 'none' | 'standard' | 'priority' | 'concierge'
  conciergePriority: boolean
}

interface MembershipPlanDTO {
  id: string
  tier: MembershipTier
  name: string
  description: string
  priceCents?: number
  currency?: string
  billingPeriod?: string
  privateIntroductionQuota: number
  privateIntroductionPeriod: 'monthly' | 'quarterly' | 'yearly'
  eventPriorityEnabled: boolean
  staffReviewEnabled: boolean
  profileDetailAccessLevel: 'registered' | 'premium'
  staffSupportLevel: 'none' | 'standard' | 'priority' | 'concierge'
  conciergePriority: boolean
  featured: boolean
  sortOrder: number
}

interface AccountEntitlementBalanceDTO {
  code: EntitlementCode
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  periodStartedAt: string
  periodEndsAt: string
}
```

### Account Lists

```ts
interface FavoriteProfileSummaryDTO {
  favoriteId: string
  profileId: string
  profileType: 'self' | 'family'
  displayName: string
  avatarUrl: string
  age: number
  city: string
  education: string
  industry: string
  summary: string
  tags: string[]
  createdAt: string
}

interface AccountEventRegistrationDTO {
  registrationId: string
  eventId: string
  title: string
  coverImageUrl: string
  city: string
  venue: string
  date: string
  startTime: string
  endTime: string
  status: 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
}

interface AccountIntroductionSummaryDTO {
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired' | 'cooldown'
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
}

interface AccountInboxSummaryDTO {
  unreadCount: number
  latestThreads: InboxThreadSummaryDTO[]
}
```

### Account Preferences

### Account Settings

```ts
interface AccountPreferencesDTO {
  preferredCity?: string
  preferredContactChannel?: PreferredContactChannel
  staffContactEnabled: boolean
  familyAssistEnabled: boolean
  introductionUpdatesEnabled: boolean
  eventRemindersEnabled: boolean
  serviceAnnouncementsEnabled: boolean
  marketingEmailsEnabled: boolean
  analyticsConsentEnabled: boolean
}

interface AccountSettingsDTO {
  account: {
    id: string
    accountName: string
    avatarUrl: string
    preferredLocale: string
    status: string
    createdAt: string
    updatedAt: string
  }
  identities: AccountAuthIdentityDTO[]
  password: AccountPasswordSecurityDTO
  mfa: AccountMfaStatusDTO
  preferences: AccountPreferencesDTO
}

interface AccountAuthIdentityDTO {
  id: string
  provider: 'email' | 'phone' | 'wechat' | 'google'
  identifier: string
  verifiedAt?: string
}

interface AccountPasswordSecurityDTO {
  isSet: boolean
  lastChangedAt?: string
  canReset: boolean
  requiresMfa: boolean
}

interface AccountDeactivateResultDTO {
  status: 'deactivated'
  deactivatedAt: string
}

interface AccountExportResultDTO {
  status: 'generated'
  downloadUrl: string
}

interface AccountIdentityCreatePayload {
  provider: 'email' | 'phone'
  identifier: string
  code: string
}

interface VerificationCodeRequestPayload {
  provider: 'email' | 'phone'
  identifier: string
}

interface VerificationCodeRequestResultDTO {
  id: string
  expiresAt: string
}

interface AccountIdentityActionResultDTO {
  identity: AccountAuthIdentityDTO
}

interface AccountIdentityDeleteResultDTO {
  removed: boolean
}

interface AccountMfaStatusDTO {
  enabled: boolean
  method?: 'email' | 'phone'
  identityId?: string
  identityLabel?: string
  enabledAt?: string
  availableMethods: AccountMfaMethodOptionDTO[]
}

interface AccountMfaMethodOptionDTO {
  method: 'email' | 'phone'
  identityId: string
  maskedIdentifier: string
  label: string
}

interface AccountMfaVerificationCodePayload {
  method: 'email' | 'phone'
  identityId: string
}

interface AccountMfaEnablePayload {
  method: 'email' | 'phone'
  identityId: string
  code: string
}

interface AccountMfaDisablePayload {
  code: string
}

interface AccountSecurityChallengeCodePayload {
  action: 'change_password' | 'deactivate_account' | 'export_data' | 'unbind_identity'
  identityId?: string
}

interface AccountSecurityChallengeVerifyPayload {
  action: 'change_password' | 'deactivate_account' | 'export_data' | 'unbind_identity'
  code: string
}

interface AccountSecurityChallengeResultDTO {
  challengeToken: string
  expiresAt: string
}

interface AccountSensitiveActionPayload {
  challengeToken?: string
}

interface AccountProfilePrivacyPreferencesDTO {
  hideMaritalStatus: boolean
  hideHasChildren: boolean
  hideChildrenPlan: boolean
  hideAcceptsLongDistance: boolean
  hideSmoking: boolean
  hideDrinking: boolean
}

type AccountProfilePrivacyPreferencesUpdatePayload = Partial<AccountProfilePrivacyPreferencesDTO>

type AccountProfileCreatePayload = ProfileCreatePayload

type AccountProfileUpdatePayload = Partial<AccountProfileCreatePayload>

interface AccountProfilePhotoSavePayload {
  id?: string
  url: string
  isPrimary: boolean
  sortOrder: number
  delete?: boolean
}

interface AccountProfileDetailSavePayload {
  profileId?: string
  profileType: 'self' | 'family'
  ownership: AccountProfileOwnershipUpdatePayload
  profile: AccountProfileUpdatePayload
  contact: AccountProfileContactUpdatePayload
  verification: AccountProfileVerificationUpdatePayload
  photos: AccountProfilePhotoSavePayload[]
}

interface AccountProfileVerificationUpdatePayload {
  legalName?: string
  dateOfBirth?: string
}

interface AccountProfileContactDTO {
  phone?: string
  email?: string
  wechat?: string
  preferredChannel?: 'phone' | 'email' | 'wechat'
  visibility: 'after_introduction' | 'owner_only' | 'disabled'
}

interface AccountProfileContactUpdatePayload {
  phone?: string
  email?: string
  wechat?: string
  preferredChannel?: 'phone' | 'email' | 'wechat'
  visibility?: 'after_introduction' | 'owner_only' | 'disabled'
}

interface AccountProfileArchiveResultDTO {
  profileId: string
  archivedAt: string
}

interface AccountPreferenceUpdatePayload {
  preferences: Partial<AccountPreferencesDTO>
}

interface AccountMeUpdatePayload {
  accountName?: string
  avatarUrl?: string
  preferredLocale?: LocaleCode
}

interface AccountMembershipUpgradePayload {
  tier: 'free' | 'silver' | 'gold' | 'diamond'
}

interface AccountMembershipUpgradeResultDTO {
  status: 'pending_external_flow'
  requestedTier: 'free' | 'silver' | 'gold' | 'diamond'
}
```

Write rules:

- `POST /api/account/profiles/save` is the primary owner-side save boundary for profile detail. It upserts the managed profile, writes user-editable profile fields, updates owner relation defaults, upserts `profile_contacts`, reconciles `profile_photos`, updates user-submitted `profile_verifications.legalName/dateOfBirth`, and returns the rebuilt detail DTO.
- `POST /api/account/profiles/:profileId/archive` is owner-only, rejects unsafe archive when active formal flows still exist, and returns a typed archive result.
- `POST /api/account/profiles/:profileId/privacy-preferences` 只更新 profile 所有人可控制的半敏感字段隐藏偏好，并返回最新偏好对象。
- `POST /api/account/me` updates account display basics and the account default language preference; auth identities and status are out of scope.
- `POST /api/account/settings/preferences` updates the single typed `user_preferences` row for the current user.
- `POST /api/account/password/change` changes the current password through the account security form, writes `auth_identities.passwordHash`, and requires the frontend to log the user out after success.
- `POST /api/account/deactivate` deactivates the current user, writes `users.status = 'deactivated'`, and returns `AccountDeactivateResultDTO`.
- A successful login for a self-deactivated account silently writes `users.status = 'active'` and returns the normal `AuthSession`; suspended accounts must not self-reactivate.
- `POST /api/account/export` creates an account export request and returns a download URL; `GET /api/account/export/download` returns the generated JSON export for the current user.
- `POST /api/auth/verification-code` starts registration email or phone verification and returns only `{ id, expiresAt }`; the product API never returns the verification code.
- `POST /api/account/identities/verification-code` starts the identity verification step for email or phone binding and returns only `{ id, expiresAt }`; product pages must call the account endpoint.
- `POST /api/account/identities` binds a verified email or phone identity using a verification code; `DELETE /api/account/identities/:id` removes a bound identity after server-side safety checks.
- `GET /api/account/mfa/status` reads MFA status from `user_security_settings` and returns available verified email/phone identities.
- `POST /api/account/mfa/verification-code` sends a code to the selected verified identity before enabling or disabling MFA; product response returns only `{ id, expiresAt }`.
- `POST /api/account/mfa/enable` verifies the code and writes `user_security_settings.mfaEnabled = true`, `mfaMethod`, `mfaIdentityId`, and `mfaEnabledAt`.
- `POST /api/account/mfa/disable` verifies the code through the current MFA identity and writes `user_security_settings.mfaEnabled = false`.
- `POST /api/account/security/challenge-code` starts a short-lived step-up verification for one sensitive action.
- `POST /api/account/security/challenge` verifies the code and returns a short-lived `challengeToken`; sensitive endpoints consume this token through their payload when MFA is enabled.
- Sensitive account write endpoints that can expose or change account access, including password change, identity unbind, account deactivation, and data export, accept `challengeToken?: string` as a step-up verification field. This field is not the login token and must be consumed once by the target operation.
- `POST /api/account/membership/upgrade` is an external-flow entry point; formal payment or staff confirmation happens before membership state changes.

禁止在 account DTO 中返回这些 legacy 字段：
```text
realName
nickName
profileType as profile identity
completion
profile phone/email/wechat
privacy setting title/desc from DB
message_threads as final source; use inbox threads/messages instead
```

## Debug API

Debug API 只服务本地验证，不作为正式前端产品入口。
```ts
interface DebugPrivateIntroductionItemDTO {
  requestId: string
  requesterUserId: string
  targetProfileId: string
  status: string
  requestedAt: string
  respondedAt?: string
}
```

Debug 页面可以调用 accept / decline 工具，但生产 account / profile 页面只能消费正式 private introduction 状态。

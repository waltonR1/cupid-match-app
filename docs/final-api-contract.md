# Final API Contract

本文定义最终目标下前端 API 层应面对的 endpoint、query、payload 和 DTO 字段。它不描述数据库存储细节，也不描述页面如何排版。

配套文档：

- `docs/final-database-schema.md`：最终数据库字段。
- `docs/final-page-fields.md`：最终页面 ViewModel 字段。
- `docs/final-data-flow-contract.md`：数据库、API、mapper、页面之间的数据流动。
- `docs/implementation-roadmap.md`：分阶段执行顺序。

## Global Rules

- API 文件拥有 HTTP 边界和 DTO 类型，页面不直接调用 HTTP。
- API 到前端的业务字段尽量扁平。
- 后端不返回 i18n key；返回 code 或已按 locale 本地化后的文案。
- DTO 可以包含派生字段，例如 `displayName`、`avatarUrl`、`age`、`memberOnly`、`registeredCount`。
- DTO 不返回数据库 Record。
- DTO 不返回 profile 联系方式值；联系方式只允许通过 private introduction / room flow 的独立接口开放。
- `X-User-Id` 只作为 mock request context；正式鉴权 token 策略后续单独定义。
- 所有列表接口统一返回 `items + pagination + facets?`。
- 所有写操作返回变更后的领域状态 DTO，不要求前端自行拼状态。

## Common Types

```ts
type LocaleCode = 'zh' | 'fr' | 'en'
type RegisterProvider = 'email' | 'phone'
type OnboardingPath = 'self' | 'family'
type OnboardingStep = 'create_profile' | 'review_profile' | 'browse'
type LegalDocumentType = 'terms' | 'privacy'
type ViewerRole = 'guest' | 'free_user' | 'member' | 'owner' | 'advisor'
type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond'
type IntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired'
type ProfileAccessLevel = 'visitor' | 'registered' | 'premium' | 'owner' | 'advisor'
type ProfileFieldLockCode = '__LOGIN_REQUIRED__' | '__MEMBER_ONLY__' | '__INTRODUCTION_REQUIRED__' | '__HIDDEN__'
type RestrictedProfileField<T> = T | ProfileFieldLockCode
type EntitlementCode = 'private_introduction' | 'event_priority' | 'advisor_review' | 'profile_detail_access'
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
  | 'prompts'
  | 'contactMethods'

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
| Auth | `POST` | `/api/auth/register` | 创建账户和 onboarding 状态。 |
| Auth | `POST` | `/api/auth/login` | 登录并返回 session。 |
| Legal | `GET` | `/api/legal/documents/:type` | 获取当前生效服务条款或隐私说明。 |
| Profiles | `GET` | `/api/profiles/self` | self 资料目录。 |
| Profiles | `GET` | `/api/profiles/family` | family 资料目录。 |
| Profiles | `GET` | `/api/profiles/self/:id` | self 资料详情。 |
| Profiles | `GET` | `/api/profiles/family/:id` | family 资料详情。 |
| Profiles | `POST` | `/api/profiles/self` | 创建 self profile。 |
| Profiles | `POST` | `/api/profiles/family` | 创建 family profile。 |
| Profiles | `PATCH` | `/api/profiles/self/:id` | 更新 self profile。 |
| Profiles | `PATCH` | `/api/profiles/family/:id` | 更新 family profile。 |
| Profiles | `POST` | `/api/profiles/self/:id/photos` | 新增 self profile 照片。 |
| Profiles | `POST` | `/api/profiles/family/:id/photos` | 新增 family profile 照片。 |
| Profiles | `PATCH` | `/api/profiles/self/:id/photos/:photoId` | 更新 self profile 照片。 |
| Profiles | `PATCH` | `/api/profiles/family/:id/photos/:photoId` | 更新 family profile 照片。 |
| Profiles | `POST` | `/api/profiles/self/:id/prompts` | 新增 self profile 问答。 |
| Profiles | `PATCH` | `/api/profiles/self/:id/prompts/:promptId` | 更新 self profile 问答。 |
| Favorites | `POST` | `/api/favorites/:profileId` | 收藏 profile。 |
| Favorites | `DELETE` | `/api/favorites/:profileId` | 取消收藏。 |
| Private Introductions | `POST` | `/api/profiles/self/:id/private-introduction` | 从 self detail 申请私人介绍。 |
| Private Introductions | `POST` | `/api/profiles/family/:id/private-introduction` | 从 family detail 申请私人介绍。 |
| Private Introduction Rooms | `GET` | `/api/private-introduction-rooms/:id` | 查看受控私人沟通空间。 |
| Private Introduction Rooms | `POST` | `/api/private-introduction-rooms/:id/messages` | 发送受控沟通消息。 |
| Events | `GET` | `/api/events` | 活动目录。 |
| Events | `GET` | `/api/events/:id` | 活动详情。 |
| Events | `POST` | `/api/events/:id/register` | 报名活动。 |
| Events | `POST` | `/api/events/:id/cancel` | 取消活动报名。 |
| Account | `GET` | `/api/account/me` | 当前账户身份。 |
| Account | `GET` | `/api/account/dashboard` | 账户首页聚合。 |
| Account | `GET` | `/api/account/profiles` | 用户管理的 profiles。 |
| Account | `GET` | `/api/account/membership` | 当前会员和权益。 |
| Account | `GET` | `/api/account/favorites` | 收藏列表。 |
| Account | `GET` | `/api/account/events` | 活动报名。 |
| Account | `GET` | `/api/account/private-introductions` | 私人介绍申请。 |
| Account | `GET` | `/api/account/private-introduction-rooms` | 私人介绍沟通空间。 |
| Account | `GET` | `/api/account/preferences` | 账户偏好。 |
| Account | `GET` | `/api/account/verifications` | 资料认证状态。 |
| Account | `GET` | `/api/account/safety` | 账户安全与可见性设置。 |
| Debug | `GET` | `/api/debug/private-introductions` | 调试私人介绍申请。 |
| Debug | `POST` | `/api/debug/private-introductions/:id/accept` | 调试接受申请。 |
| Debug | `POST` | `/api/debug/private-introductions/:id/decline` | 调试拒绝申请。 |

## Auth API

### Register

```ts
interface RegisterPayload {
  path: OnboardingPath
  provider: RegisterProvider
  identifier: string
  password: string
  accountName: string
  preferredLocale: LocaleCode
}

interface AuthSessionDTO {
  token: string
  user: AuthUserDTO
  onboarding: AuthOnboardingDTO
}

interface AuthUserDTO {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: LocaleCode
}

interface AuthOnboardingDTO {
  path: OnboardingPath
  step: OnboardingStep
  profileId?: string
}
```

规则：

- 注册 payload 不包含 `city`。
- 注册不创建 profile。
- 成功注册 / 成功登录即表示用户接受当前 active 服务条款与隐私说明；后端自动写入 `user_agreement_acceptances`（upsert by userId + documentType），版本不变则跳过。
- 注册页不展示 `preferredLocale` 手动选择器；前端用当前页面 locale 自动填充 `RegisterPayload.preferredLocale`。
- 登录和注册都返回 `AuthUserDTO.preferredLocale`；前端登录成功后用它同步 locale store，确保跨设备登录时使用账户默认语言。
- 当前注册只开放 `email`、`phone`；`wechat`、`google` 是最终 `auth_identities` 预留 provider。
- `token` 当前可以作为 mock 占位；正式 Authorization 行为后续单独定义。

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

若目标 `lang` 暂无 active 文档，mock 后端可回退到 `zh` active 文档，正式库应补齐三语言版本。

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

规则：

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
  profileStatus: 'open' | 'review' | 'vip'
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
  relationshipPlan: string
  residencePlan: string
  allowFamilyContact: boolean
  familyPriority: boolean
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
  profileStatus: 'open' | 'review' | 'vip'
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
  prompts: RestrictedProfileField<ProfilePromptDTO[]>
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
  lockedByAdvisorFields: string[]
}

interface ProfileFieldLockDTO {
  fieldCode: ProfileFieldCode
  reason: 'login' | 'member' | 'introduction' | 'advisor' | 'hidden'
}

interface ProfilePhotoDTO {
  id: string
  url: string
  caption: string
  isPrimary: boolean
  sortOrder: number
}

interface ProfilePromptDTO {
  id: string
  promptCode: string
  prompt: string
  answer: string
  sortOrder: number
}

interface FavoriteStateDTO {
  isFavorite: boolean
  favoriteId?: string
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

规则：

- `ProfileDetailBaseDTO` / `SelfProfileDetailDTO` / `FamilyProfileDetailDTO` 保持扁平字段；页面 section 由前端 mapper 组装。
- `prompts` 只属于 `SelfProfileDetailDTO`；family detail 不默认返回 prompts，除非后续产品确认家长视角也需要该信息。
- 受限字段返回 `ProfileFieldLockCode`，前端不根据会员状态自行判断原始字段是否可见。
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
profiles.prompts
```

### Favorite Actions

```ts
interface FavoriteActionResponseDTO {
  favorite: FavoriteStateDTO
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
  relationshipPlan: string
  residencePlan: string
  relocationWillingness: string
  values: string[]
  preferredAgeMin: number
  preferredAgeMax: number
  locationScope: string
  preferredEducation: string
  familyPlan: string
  dealBreakers: string[]
  smoking: 'never' | 'social' | 'often'
  drinking: 'never' | 'social' | 'often'
  exercise: string
  activityLevel: string
  weekendStyle: string
  pets: string
  personalityTraits: string[]
  interests: string[]
  communicationStyle: string
  summary: string
  tags: string[]
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
}

type ProfileUpdatePayload = Partial<ProfileCreatePayload>

interface ProfileMutationResponseDTO {
  profile: SelfProfileDetailDTO | FamilyProfileDetailDTO
  onboarding?: AuthOnboardingDTO
}

interface ProfilePhotoMutationPayload {
  url: string
  caption?: string
  isPrimary?: boolean
  sortOrder?: number
}

interface ProfilePromptMutationPayload {
  promptCode: string
  prompt: string
  answer: string
  sortOrder?: number
}
```

规则：

- 创建 / 更新 payload 使用前端输入值；后端负责保存为最终数据库结构和本地化字段。
- `ProfileCreatePayload` / `ProfileUpdatePayload` 中的单语言字符串按请求 locale 写入 `LocalizedText` 的对应语言，例如 `lang=zh` 时写入 `{ zh: value, fr: '', en: '' }`；其他 locale 由后台、顾问或后续翻译流程补齐。
- 创建 profile 时同步创建或更新 `profile_ownerships`。
- 创建 / 更新不接受 `displayName`、`avatarUrl`、`age`、`phone`、`email`、`wechat`、`legalName`、`nickname`、`occupation`、`wantsChildren`、`photos`、`prompts` 或任何已迁移到 internal / verification / contact 集合的字段。
- `photos` 和 `prompts` 通过独立 endpoint 写入 `profile_photos` / `profile_prompts`，不嵌套进 `ProfileCreatePayload`。

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

规则：

- self/family detail 继续使用分开的申请入口：`POST /api/profiles/self/:id/private-introduction` 和 `POST /api/profiles/family/:id/private-introduction`。
- `:id` 就是 target profile id，前端不在 body 里重复传 `targetProfileId`。
- 后端检查 ownership、membership entitlement、quota 和 cooldown。
- `cooldown` 是 DTO 派生状态，数据库使用 `declined + cooldownUntil`。
- `expired` 是 DTO 派生状态，数据库使用 `requested + expiresAt < now`；过期后是否进入 cooldown 由服务策略决定。
- 额度不足时返回 `quota_exhausted` 状态，不要求前端把普通错误转换成业务状态。

## Private Introduction Room API

```ts
interface PrivateIntroductionRoomDetailDTO {
  roomId: string
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: 'open' | 'paused' | 'closed'
  openedAt: string
  closedAt?: string
  messages: PrivateIntroductionRoomMessageDTO[]
  messagePage: PrivateIntroductionRoomMessagePageDTO
}

interface PrivateIntroductionRoomMessageDTO {
  messageId: string
  senderType: 'user' | 'advisor' | 'system'
  senderUserId?: string
  body: string
  createdAt: string
}

interface SendPrivateIntroductionRoomMessagePayload {
  body: string
}

interface PrivateIntroductionRoomMessagePageDTO {
  limit: number
  hasMore: boolean
  nextBefore?: string
}
```

规则：

- `GET /api/private-introduction-rooms/:id` 使用 cursor 分页读取消息：`?before=<messageCreatedAtOrId>&limit=30`。
- room 只在双方接受私人介绍后创建或开放。
- 产品暂时不开放自由聊天时，room messages 仍可承载顾问代发说明、系统通知和受控沟通记录。
- `POST /api/private-introduction-rooms/:id/messages` 必须检查 room 状态、viewer 身份和平台风控，不允许绕过私人介绍申请直接联系。

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
  advisorNote: string
  agendaItems: EventAgendaItemDTO[]
  registration: EventRegistrationStateDTO
}

interface EventAgendaItemDTO {
  id: string
  time: string
  title: string
  desc: string
  sortOrder: number
}

interface EventRegistrationStateDTO {
  status: 'guest' | 'available' | 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'closed' | 'member_required'
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
  onboarding: AuthOnboardingDTO
}

interface AccountUserDTO {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: LocaleCode
  status: 'active' | 'paused' | 'banned'
}
```

### Account Dashboard

```ts
interface AccountDashboardDTO {
  user: AccountUserDTO
  onboarding: AuthOnboardingDTO
  profiles: ManagedProfileSummaryDTO[]
  membership: AccountMembershipDTO
  entitlements: AccountEntitlementBalanceDTO[]
  favorites: FavoriteProfileSummaryDTO[]
  events: AccountEventRegistrationDTO[]
  introductions: AccountIntroductionSummaryDTO[]
  advisorFollowUps: AdvisorFollowUpDTO[]
}

interface AdvisorFollowUpDTO {
  id: string
  status: 'open' | 'done' | 'snoozed'
  priority: 'low' | 'normal' | 'high'
  note: string
  dueAt?: string
  completedAt?: string
}
```

### Account Profiles

```ts
interface ManagedProfileSummaryDTO {
  profileId: string
  displayName: string
  avatarUrl: string
  age: number
  city: string
  role: 'self' | 'parent' | 'guardian' | 'advisor'
  relationshipToProfile?: 'self' | 'father' | 'mother' | 'relative' | 'advisor'
  permission: 'owner' | 'manager' | 'viewer'
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'vip' | 'hidden'
  isPrimary: boolean
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
  conciergePriority: boolean
}

interface AccountEntitlementBalanceDTO {
  code: EntitlementCode
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  resetAt?: string
}
```

### Account Lists

```ts
interface FavoriteProfileSummaryDTO {
  favoriteId: string
  profileId: string
  displayName: string
  avatarUrl: string
  age: number
  city: string
  createdAt: string
}

interface AccountEventRegistrationDTO {
  registrationId: string
  eventId: string
  title: string
  coverImageUrl: string
  city: string
  venue: string
  address?: string
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

interface AccountPrivateIntroductionRoomDTO {
  roomId: string
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: 'open' | 'paused' | 'closed'
  openedAt: string
  closedAt?: string
  lastMessage?: string
}
```

### Account Preferences

```ts
interface AccountPreferenceDTO {
  code: string
  value: string | boolean | number | string[]
}
```

### Account Verifications

```ts
interface AccountVerificationSummaryDTO {
  profileId: string
  displayName: string
  identityStatus: string
  educationStatus: string
  incomeStatus: string
  maritalStatus: string
  advisorStatus: string
}
```

### Account Safety

```ts
interface AccountSafetyDTO {
  preferences: AccountPreferenceDTO[]
  profileVisibility: AccountProfileVisibilityDTO[]
}

interface AccountProfileVisibilityDTO {
  profileId: string
  fieldCode: ProfileFieldCode
  visibility: 'public' | 'member' | 'introduced' | 'owner_only' | 'hidden'
  lockedByAdvisor: boolean
}
```

禁止在 account DTO 中返回这些 legacy 字段：

```text
realName
nickName
role as user identity
completion
profile phone/email/wechat
privacy setting title/desc from DB
message_threads as final source
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

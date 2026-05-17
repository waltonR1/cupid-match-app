# Final Database Schema

本文描述项目最终目标数据库形态。`mock-server/db.json` 后续应按本文逐步收敛；当前实现状态仍以 `docs/project-database-fields.md` 为准。

配套文档：

- `docs/final-api-contract.md`：最终 API endpoint 和 DTO。
- `docs/final-page-fields.md`：最终页面 ViewModel 字段。
- `docs/final-data-flow-contract.md`：最终数据流动和 source of truth。
- `docs/implementation-roadmap.md`：分阶段执行顺序。

本文描述最终领域数据库形态，不代表当前 Node.js + TypeScript `mock-server` 已具备生产级安全、事务、审计、部署等能力。当前 `mock-server` 只用于验证未来 Java 后端可复刻的数据边界和领域模型；数据结构应贴近最终 Java 后端目标，实现能力可保持 prototype 级别。

设计参照成熟婚恋平台、会员制服务、CRM 和顾问撮合系统的常见边界：

- 账户身份、被撮合资料、后台审核资料、联系方式、会员权益、活动报名、私人介绍、顾问跟进分开建模。
- 前台 profile 只保存可用于公开展示和撮合筛选的资料。
- 后台工作人员需要看的敏感字段进入 internal / verification / contact 结构。
- 任何页面 DTO 可以有派生字段，但派生字段不反向污染数据库主表。
- 年龄、展示名、头像这类会变化或可派生字段由后端 DTO 生成，不直接保存在主表。

## 顶层集合

```ts
interface FinalDatabase {
  users: UserRecord[]
  auth_identities: AuthIdentityRecord[]
  user_onboarding_states: UserOnboardingStateRecord[]
  user_preferences: UserPreferenceRecord[]
  legal_documents: LegalDocumentRecord[]
  user_agreement_acceptances: UserAgreementAcceptanceRecord[]

  profiles: ProfileRecord[]
  profile_photos: ProfilePhotoRecord[]
  profile_prompts: ProfilePromptRecord[]
  profile_ownerships: ProfileOwnershipRecord[]
  profile_internal_records: ProfileInternalRecord[]
  profile_verifications: ProfileVerificationRecord[]
  profile_contact_methods: ProfileContactMethodRecord[]
  profile_visibility_settings: ProfileVisibilitySettingRecord[]

  membership_plans: MembershipPlanRecord[]
  membership_entitlements: MembershipEntitlementRecord[]
  user_memberships: UserMembershipRecord[]
  user_entitlement_balances: UserEntitlementBalanceRecord[]

  events: EventRecord[]
  event_agenda_items: EventAgendaItemRecord[]
  event_registrations: EventRegistrationRecord[]

  favorite_profiles: FavoriteProfileRecord[]
  private_introduction_requests: PrivateIntroductionRequestRecord[]
  private_introduction_rooms: PrivateIntroductionRoomRecord[]
  private_introduction_room_messages: PrivateIntroductionRoomMessageRecord[]
  advisor_follow_ups: AdvisorFollowUpRecord[]
}
```

说明：

- `profile_photos`、`profile_prompts`、`event_agenda_items` 是独立集合；mock-server 也应按最终形态实现，不再为了开发便利嵌套到主记录。
- `displayName`、`avatarUrl` 可以出现在 DTO，不保存在 `profiles` 主表。
- `profile_internal_records`、`profile_verifications`、`profile_contact_methods` 只给后台、顾问、受控流程使用。
- `profile_visibility_settings` 是 profile 链路预留的字段可见性配置；account 重写后再和用户侧设置联调。

## 通用类型

```ts
interface LocalizedText {
  zh: string
  fr: string
  en: string
}

type LocaleCode = 'zh' | 'fr' | 'en'
type GenderCode = 'male' | 'female'
type UserStatus = 'active' | 'paused' | 'banned'
type AuthProvider = 'email' | 'phone' | 'wechat' | 'google'
type OnboardingPath = 'self' | 'family'
type OnboardingStep = 'create_profile' | 'review_profile' | 'browse'
type LegalDocumentType = 'terms' | 'privacy'
type LegalDocumentStatus = 'draft' | 'active' | 'archived'
type ProfileStatus = 'draft' | 'review' | 'open' | 'paused' | 'vip' | 'hidden'
type DegreeLevel = 'bachelor' | 'master' | 'phd'
type MaritalStatus = 'never_married' | 'divorced' | 'widowed'
type ChildrenPlan = 'wants' | 'open_to_discuss' | 'does_not_want'
type DatingIntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
type HabitCode = 'never' | 'social' | 'often'
type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond'
type RecordStatus = 'active' | 'archived'
type ProfileFieldVisibility = 'public' | 'member' | 'introduced' | 'owner_only' | 'hidden'
type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
type AdvisorReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
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
```

`MaritalStatus` 是前台公开婚史状态，只表达当前可公开匹配语义。若顾问需要记录“已婚分居但未完成法律离婚”等敏感情况，不进入公开 enum，放入 `profile_internal_records` 或 `profile_verifications` 的顾问审核备注中处理。

## Account and Auth

### users

账户主体，只描述登录账户，不描述被撮合资料，不表达会员等级。

```ts
interface UserRecord {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: LocaleCode
  status: UserStatus
  createdAt: string
  updatedAt: string
}
```

约束：

- 不保存 `role`。
- 不保存 `profileCompletion`。
- 不保存 `membership tier`。
- 不保存 `city`。城市应进入 profile、event 或 user preference。
- 不保存 `displayName`。账户显示使用 `accountName`。
- `accountName` 允许重名，不作为登录唯一键；登录唯一性由 `auth_identities(provider, identifier)` 保证。

### auth_identities

登录身份。一个 user 可以绑定多个登录方式。

```ts
interface AuthIdentityRecord {
  id: string
  userId: string
  provider: AuthProvider
  identifier: string
  passwordHash?: string
  verifiedAt?: string
  createdAt: string
  updatedAt: string
}
```

约束：

- 唯一键：`provider + identifier`。
- 开发阶段也使用 `passwordHash` 字段；如暂不接入真实哈希算法，可写入伪 hash，但不新增 `password` 字段。
- email、phone、wechat 不重复存到 `users`。

### user_onboarding_states

注册后的引导状态。`self / family` 是入口路径，不是用户永久身份。

```ts
interface UserOnboardingStateRecord {
  id: string
  userId: string
  path: OnboardingPath
  step: OnboardingStep
  profileId?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}
```

### user_preferences

账户偏好和开关，使用 code/value，而不是存页面文案。

```ts
type AccountPreferenceCode =
  | 'preferred_city'
  | 'preferred_contact_channel'
  | 'advisor_contact_enabled'
  | 'family_assist_enabled'
  | 'introduction_updates_enabled'
  | 'event_reminders_enabled'
  | 'service_announcements_enabled'
  | 'marketing_emails_enabled'
  | 'analytics_consent_enabled'

interface UserPreferenceRecord {
  id: string
  userId: string
  code: AccountPreferenceCode
  value: string | boolean | number | string[]
  createdAt: string
  updatedAt: string
}
```

当前稳定 code：

```text
preferred_city
preferred_contact_channel
advisor_contact_enabled
family_assist_enabled
introduction_updates_enabled
event_reminders_enabled
service_announcements_enabled
marketing_emails_enabled
analytics_consent_enabled
```

默认语言不放入 `user_preferences`，统一以 `users.preferredLocale` 为 source of truth；账户偏好页修改语言时更新 `users.preferredLocale`。后续若新增明确的设置项，再扩展 `AccountPreferenceCode`，不使用任意字符串兜底。

### legal_documents

协议文档版本。平台服务条款和隐私说明不只存在于前端 i18n；最终应由后端按类型、版本和语言返回当前生效文档。

```ts
interface LegalDocumentRecord {
  id: string
  type: LegalDocumentType
  version: string
  locale: LocaleCode
  title: string
  sections: LegalDocumentSection[]
  status: LegalDocumentStatus
  effectiveAt: string
  createdAt: string
  updatedAt: string
}

interface LegalDocumentSection {
  heading: string
  clauses: LegalDocumentClause[]
  sortOrder: number
}

interface LegalDocumentClause {
  number: string
  body: string
}
```

规则：

- 同一 `type + locale` 只能有一个 `active` 文档。
- `version` 是面向确认记录的稳定版本号，不使用页面发布时间临时派生。
- `sections` 是该语言完整正文结构；每个 section 包含稳定 heading 与 clauses，前端按字段渲染，不解析 Markdown。

### user_agreement_acceptances

用户当前已确认的协议版本。成功注册或成功登录本身即表示用户接受当前 active 服务条款与隐私说明，后端据此自动写入或更新确认记录。

```ts
interface UserAgreementAcceptanceRecord {
  id: string
  userId: string
  documentType: LegalDocumentType
  documentVersion: string
  locale: LocaleCode
  acceptedAt: string
  createdAt: string
}
```

规则：

- 每个用户对每个 `documentType` 最多保留一条最新确认记录（upsert by userId + documentType）。
- 成功注册 / 成功登录后，后端读取当前 active 文档版本；若版本相同则跳过写入，版本不同则更新为最新版本和时间戳。
- 前端不需要传版本号，不需要处理协议更新拦截；正常 UI 仍必须勾选同意后才允许提交登录 / 注册。

## Profiles

### profiles

被撮合资料主表。只保存前台展示和撮合筛选需要的结构化资料。

```ts
interface ProfileRecord {
  id: string
  gender: GenderCode
  birthYear: number
  height: number
  city: LocalizedText
  country: LocalizedText
  nationality: LocalizedText
  languages: string[]

  profileStatus: ProfileStatus
  lastActiveAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean

  degreeLevel: DegreeLevel
  education: LocalizedText
  industry: LocalizedText
  careerDirection?: LocalizedText

  maritalStatus: MaritalStatus
  hasChildren: boolean
  childrenPlan: ChildrenPlan
  acceptsLongDistance: boolean
  datingIntentionCode: DatingIntentionCode
  relationshipPlan: LocalizedText
  residencePlan: LocalizedText
  relocationWillingness: LocalizedText
  values: LocalizedText[]

  preferredAgeMin: number
  preferredAgeMax: number
  locationScope: LocalizedText
  preferredEducation: LocalizedText
  familyPlan: LocalizedText
  dealBreakers: LocalizedText[]

  smoking: HabitCode
  drinking: HabitCode
  exercise: LocalizedText
  activityLevel: LocalizedText
  weekendStyle: LocalizedText
  pets: LocalizedText
  personalityTraits: LocalizedText[]
  interests: LocalizedText[]
  communicationStyle: LocalizedText

  summary: LocalizedText
  tags: LocalizedText[]

  createdAt: string
  updatedAt: string
}
```

不进入 `profiles` 主表的字段：

```text
displayName
avatarUrl
legalName
nickname
age
wantsChildren
phone
email
wechat
pronouns
sexuality
interestedIn
hometown
livingSituation
zodiac
occupation
employer
incomeRange
religion
politicalViews
funFacts
highlights
conversationStarters
dateIdeas
compatibilityDimensions
photos
prompts
joinedAt
```

字段处理：

- `displayName`：后端根据 `profile.id` 派生，返回 DTO，不入库。
- `avatarUrl`：由主图派生，返回 DTO，不入库。
- `age`：由 `birthYear` 或认证生日派生，返回 DTO，不入库，避免年龄字段随时间失真。
- `datingIntentionLabel`：由 `datingIntentionCode` 通过后端字典 / i18n 派生，返回 DTO，不入库。
- `nickname`：若确实需要用户自定义公开称呼，迁移为 `publicAlias` 并走审核；否则删除。
- `occupation`：不公开精确职位；公开层使用 `industry` / `careerDirection`。
- `joinedAt`：统一为 `createdAt`。

### profile_photos

```ts
interface ProfilePhotoRecord {
  id: string
  profileId: string
  url: string
  caption: LocalizedText
  isPrimary: boolean
  sortOrder: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}
```

### profile_prompts

```ts
interface ProfilePromptRecord {
  id: string
  profileId: string
  promptCode: string
  prompt: LocalizedText
  answer: LocalizedText
  sortOrder: number
  status: 'active' | 'hidden'
  createdAt: string
  updatedAt: string
}
```

### profile_ownerships

用户和资料的关系。本人、父母、亲属、顾问都在这里表达。

```ts
interface ProfileOwnershipRecord {
  id: string
  userId: string
  profileId: string
  role: 'self' | 'parent' | 'guardian' | 'advisor'
  relationshipToProfile?: 'self' | 'father' | 'mother' | 'relative' | 'advisor'
  permission: 'owner' | 'manager' | 'viewer'
  isPrimary: boolean
  createdAt: string
  updatedAt: string
}
```

### profile_internal_records

后台工作人员和顾问看的敏感运营资料，不进入前台 profile DTO。

```ts
interface ProfileInternalRecord {
  id: string
  profileId: string
  employer?: LocalizedText
  incomeRange?: LocalizedText
  religion?: LocalizedText
  politicalViews?: LocalizedText
  staffNotes?: LocalizedText
  riskFlags?: string[]
  source?: 'self_submitted' | 'family_submitted' | 'advisor_collected'
  updatedBy?: string
  createdAt: string
  updatedAt: string
}
```

### profile_verifications

认证和审核，不和公开资料混放。

```ts
interface ProfileVerificationRecord {
  id: string
  profileId: string
  legalName?: string
  dateOfBirth?: string
  identityStatus: ProfileVerificationStatus
  educationStatus: ProfileVerificationStatus
  incomeStatus: ProfileVerificationStatus
  maritalStatus: ProfileVerificationStatus
  advisorStatus: AdvisorReviewStatus
  verifiedAt?: string
  verifiedBy?: string
  createdAt: string
  updatedAt: string
}
```

### profile_contact_methods

联系方式受控保存。只有私人介绍成功或顾问确认后才可能开放。

```ts
interface ProfileContactMethodRecord {
  id: string
  profileId: string
  type: 'phone' | 'email' | 'wechat'
  value: string
  verifiedAt?: string
  visibleAfterIntroduction: boolean
  createdAt: string
  updatedAt: string
}
```

### profile_visibility_settings

profile 字段可见性配置。此集合先在 profile 链路预留，用于 detail API 的字段权限判断；account 重写后再与用户偏好、会员权益、顾问审核联调。

```ts
interface ProfileVisibilitySettingRecord {
  id: string
  profileId: string
  fieldCode: ProfileFieldCode
  visibility: ProfileFieldVisibility
  lockedByAdvisor: boolean
  reason?: string
  createdAt: string
  updatedAt: string
}
```

建议第一批 fieldCode：

```text
country
nationality
languages
industry
careerDirection
maritalStatus
hasChildren
childrenPlan
acceptsLongDistance
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
prompts
photos
contactMethods
```

说明：

- 默认可见性仍可由代码常量提供，避免每个 profile 都必须写完整配置。
- 一旦存在 `profile_visibility_settings` 记录，detail API 应优先使用记录值。
- `contactMethods` 只代表联系方式开放策略，不直接暴露联系方式值。
- `profile_detail_access` entitlement 只影响 viewer 查看他人 profile detail 的字段开放层级，不影响自己 profile 的曝光排序或公开范围；自己资料曝光仍由 `profile_visibility_settings`、顾问审核和页面策略控制。

## Membership

### membership_plans

```ts
interface MembershipPlanRecord {
  id: string
  tier: MembershipTier
  name: LocalizedText
  description: LocalizedText
  priceCents?: number
  currency?: 'EUR' | 'USD' | 'CNY'
  billingPeriod?: 'monthly' | 'quarterly' | 'yearly'
  conciergePriority: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### membership_entitlements

```ts
interface MembershipEntitlementRecord {
  id: string
  planId: string
  code: EntitlementCode
  quota: number
  period: 'none' | 'monthly' | 'quarterly' | 'yearly'
  createdAt: string
  updatedAt: string
}
```

### user_memberships

```ts
interface UserMembershipRecord {
  id: string
  userId: string
  planId: string
  tier: MembershipTier
  status: 'active' | 'expired' | 'cancelled' | 'paused'
  startedAt: string
  expiresAt?: string
  createdAt: string
  updatedAt: string
}
```

### user_entitlement_balances

```ts
interface UserEntitlementBalanceRecord {
  id: string
  userId: string
  entitlementCode: EntitlementCode
  period: string
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  resetAt?: string
  createdAt: string
  updatedAt: string
}
```

## Events

### events

```ts
interface EventRecord {
  id: string
  slug: string
  status: 'draft' | 'open' | 'waitlist' | 'closed' | 'completed'
  visibility: 'public' | 'registered' | 'member'
  title: LocalizedText
  summary: LocalizedText
  city: LocalizedText
  venue: LocalizedText
  address?: LocalizedText
  addressVisibility: 'registered_only' | 'confirmed_attendee_only'
  date: string
  startTime: string
  endTime: string
  format: LocalizedText
  audience: LocalizedText
  relationshipFocus: LocalizedText[]
  languageCodes: string[]
  capacity: number
  registeredCountCache?: number
  waitlistCountCache?: number
  advisorNote: LocalizedText
  coverImageUrl: string
  createdAt: string
  updatedAt: string
}
```

`venue` 是公开地点名称，`address` 是精确地址。精确地址不公开进入列表链路，由后端按 `addressVisibility` 和 viewer 状态决定是否在 detail/account DTO 中返回。

`event_registrations` 是报名人数的真实来源。`registeredCountCache` / `waitlistCountCache` 只允许作为可重建缓存；事件 DTO 可以继续返回 `registeredCount` / `waitlistCount`，但必须由 registration 明细或缓存计算得出。

### event_agenda_items

```ts
interface EventAgendaItemRecord {
  id: string
  eventId: string
  time: string
  title: LocalizedText
  desc: LocalizedText
  sortOrder: number
  createdAt: string
  updatedAt: string
}
```

### event_registrations

```ts
interface EventRegistrationRecord {
  id: string
  userId: string
  eventId: string
  status: 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
  requestedAt: string
  confirmedAt?: string
  declinedAt?: string
  cancelledAt?: string
  note?: LocalizedText
  createdAt: string
  updatedAt: string
}
```

## Relationship Actions

### favorite_profiles

```ts
interface FavoriteProfileRecord {
  id: string
  userId: string
  profileId: string
  createdAt: string
  updatedAt: string
}
```

### private_introduction_requests

```ts
interface PrivateIntroductionRequestRecord {
  id: string
  requesterUserId: string
  requesterProfileId?: string
  targetProfileId: string
  status: 'requested' | 'accepted' | 'declined' | 'cancelled'
  message?: string
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
  entitlementBalanceId?: string
  advisorId?: string
  createdAt: string
  updatedAt: string
}
```

### private_introduction_rooms

```ts
interface PrivateIntroductionRoomRecord {
  id: string
  requestId: string
  requesterUserId: string
  targetProfileId: string
  status: 'open' | 'paused' | 'closed'
  openedAt: string
  closedAt?: string
  advisorId?: string
  createdAt: string
  updatedAt: string
}
```

### private_introduction_room_messages

私人介绍 room 的消息记录。若产品暂时不开放自由聊天，也可用于记录顾问代发说明、系统通知和受控沟通记录。

```ts
interface PrivateIntroductionRoomMessageRecord {
  id: string
  roomId: string
  senderType: 'user' | 'advisor' | 'system'
  senderUserId?: string
  body: string
  createdAt: string
  updatedAt: string
}
```

### advisor_follow_ups

```ts
interface AdvisorFollowUpRecord {
  id: string
  advisorId: string
  userId?: string
  profileId?: string
  requestId?: string
  eventId?: string
  status: 'open' | 'done' | 'snoozed'
  priority: 'low' | 'normal' | 'high'
  note: LocalizedText
  visibility: 'internal' | 'user_visible'
  dueAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}
```

## Derived DTO Fields

这些字段允许返回给前端，但不入库。

### Profile identity

```ts
interface ProfilePublicIdentityDTO {
  id: string
  displayName: string
  avatarUrl: string
  age: number
}
```

规则：

- `displayName` 由 `profile.id` 生成稳定匿名码。
- 推荐算法：`CM-${stableHash(profile.id).slice(0, 6).toUpperCase()}`。如果未来后端需要连续编号，可单独引入不可变 `displayCode`，但不使用真实姓名、昵称或账户名生成。
- 生成逻辑在后端 service / mapper。
- 不使用 `legalName`、`nickname`、`accountName` 生成前台展示名。
- `avatarUrl` 由 `profile_photos.isPrimary` 派生。
- `age` 由 `profiles.birthYear` 或 `profile_verifications.dateOfBirth` 派生。
- `datingIntentionLabel` 由 `profiles.datingIntentionCode` 派生。

## Index and Constraint Notes

建议约束：

```text
auth_identities: unique(provider, identifier)
legal_documents: unique(type, locale, version)
legal_documents: unique_active(type, locale) where status = 'active'
user_agreement_acceptances: unique(userId, documentType)
user_onboarding_states: unique(userId)
profile_ownerships: index(userId), index(profileId)
profile_contact_methods: unique(profileId, type, value)
profile_visibility_settings: unique(profileId, fieldCode)
user_memberships: index(userId, status)
user_entitlement_balances: unique(userId, entitlementCode, period)
event_registrations: unique(userId, eventId)
favorite_profiles: unique(userId, profileId)
private_introduction_requests: unique(requesterUserId, targetProfileId, status in active statuses)
private_introduction_rooms: unique(requestId)
```

## Migration Principles

- 先冻结 account，再迁 profile 字段。
- 前台字段和后台字段拆开迁，不要直接丢失后台需要的信息。
- `users.city` 从注册链路移除；城市进入 profile 或 preference。
- `profiles.displayName` 从数据库移除；所有前端 DTO 的 displayName 由后端派生。
- `profiles.datingIntentionLabel` 从数据库移除；所有前端 DTO 的 datingIntentionLabel 由后端派生。
- 所有主表和关系表保留 `createdAt` 和 `updatedAt`。
- `project-database-fields.md` 继续记录当前实现；本文记录最终形态。

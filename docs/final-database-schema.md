# Final Database Schema

本文描述项目最终目标数据库形态。`mock-server/db.json` 后续应按本文逐步收敛；当前实现状态仍以 `docs/project-database-fields.md` 为准。

配套文档：

- `docs/final-api-contract.md`：最终 API endpoint 和 DTO。
- `docs/final-page-fields.md`：最终页面 ViewModel 字段。
- `docs/final-data-flow-contract.md`：最终数据流动和 source of truth。
- `docs/implementation-roadmap.md`：分阶段执行顺序。

本文描述最终领域数据库形态，不代表当前 Node.js + TypeScript `mock-server` 已具备生产级安全、事务、审计、部署等能力。当前 `mock-server` 只用于验证未来 Java 后端可复刻的数据边界和领域模型；数据结构应贴近最终 Java 后端目标，实现能力可保持 prototype 级别。

设计参照成熟婚恋平台、会员制服务、CRM 和后台运营系统的常见边界：

- 账户身份、被撮合资料、后台审核资料、联系方式、会员权益、活动报名、私人介绍、后台任务分开建模。
- 前台 profile 只保存可用于公开展示和撮合筛选的资料。
- 后台工作人员需要看的敏感字段进入 internal / verification / contact 结构。
- 任何页面 DTO 可以有派生字段，但派生字段不反向污染数据库主表。
- 年龄、展示名、头像这类会变化或可派生字段由后端 DTO 生成，不直接保存在主表。

## 顶层集合

```ts
interface FinalDatabase {
  users: UserRecord[]
  auth_identities: AuthIdentityRecord[]
  user_preferences: UserPreferenceRecord[]
  legal_documents: LegalDocumentRecord[]
  legal_document_contents: LegalDocumentContentRecord[]
  user_agreement_acceptances: UserAgreementAcceptanceRecord[]

  profiles: ProfileRecord[]
  profile_photos: ProfilePhotoRecord[]
  profile_ownerships: ProfileOwnershipRecord[]
  profile_internal_records: ProfileInternalRecord[]
  profile_verifications: ProfileVerificationRecord[]
  profile_contacts: ProfileContactRecord[]
  profile_privacy_preferences: ProfilePrivacyPreferenceRecord[]

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
  staff_tasks: StaffTaskRecord[]
}
```

说明：

- `displayName`、`avatarUrl` 可以出现在 DTO，不保存在 `profiles` 主表。
- `profile_internal_records`、`profile_verifications`、`profile_contacts` 只给后台工作人员和受控流程使用。
- `profile_privacy_preferences` 是 profile 所有人主动设置的半敏感字段隐藏偏好；它只在平台默认权限之上继续收紧展示。

## 通用类型

```ts
interface LocalizedValue {
  value: string
  source: 'manual' | 'machine'
  provider: 'human' | 'placeholder' | 'translation_api'
  status: 'ready' | 'pending' | 'failed' | 'stale'
  updatedAt: string
}

interface LocalizedText {
  zh: LocalizedValue
  fr: LocalizedValue
  en: LocalizedValue
}

type LocaleCode = 'zh' | 'fr' | 'en'
type GenderCode = 'male' | 'female'
type UserStatus = 'active' | 'paused' | 'banned'
type AuthProvider = 'email' | 'phone' | 'wechat' | 'google'
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
type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
type ProfileReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
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
  | 'contact'
```

`MaritalStatus` 是前台公开婚史状态，只表达当前可公开匹配语义。若后台工作人员需要记录“已婚分居但未完成法律离婚”等敏感情况，不进入公开 enum，放入 `profile_internal_records` 或 `profile_verifications` 的内部审核备注中处理。

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

### user_preferences

Account preferences are stored as one row per user with explicit typed fields. This is not a code/value KV table.

```ts
type PreferredContactChannel = 'email' | 'phone' | 'wechat'

interface UserPreferenceRecord {
  id: string
  userId: string
  preferredCity?: string
  preferredContactChannel?: PreferredContactChannel
  advisorContactEnabled: boolean
  familyAssistEnabled: boolean
  introductionUpdatesEnabled: boolean
  eventRemindersEnabled: boolean
  serviceAnnouncementsEnabled: boolean
  marketingEmailsEnabled: boolean
  analyticsConsentEnabled: boolean
  createdAt: string
  updatedAt: string
}
```

`users.preferredLocale` remains the source of truth for language. Add new account preference fields by extending `UserPreferenceRecord`; do not add arbitrary preference codes.

### legal_documents

协议文档主记录。`version` 是跨语言的全局法律修订版本号，不按 locale 独立管理。

```ts
interface LegalDocumentRecord {
  id: string
  type: LegalDocumentType
  version: string
  status: LegalDocumentStatus
  effectiveAt: string
  createdAt: string
  updatedAt: string
}
```

### legal_document_contents

按 locale 的协议文档翻译内容。每个文档主记录可有多个 locale 的翻译。

```ts
interface LegalDocumentContentRecord {
  id: string
  documentId: string
  locale: string
  title: string
  sections: LegalDocumentSection[]
  createdAt: string
  updatedAt: string
}
```

```ts
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

- `legal_documents`: 同一 `type` 只能有一个 `active` 文档。
- `legal_documents`: `unique(type, version)`。
- `legal_document_contents`: `unique(documentId, locale)`。
- `version` 是全局法律修订版本号，所有 locale 共享。一次法律条款变更创建一个新版本，所有语言的翻译都关联到该版本。
- 翻译修正（错字、措辞）不涉及 version bump，只更新 content。
- `sections` 是该语言完整正文结构；每个 section 包含稳定 heading 与 clauses，前端按字段渲染，不解析 Markdown。

### user_agreement_acceptances

用户当前已确认的协议版本。成功注册或成功登录本身即表示用户接受当前 active 服务条款与隐私说明，后端据此自动写入或更新确认记录。

```ts
interface UserAgreementAcceptanceRecord {
  id: string
  userId: string
  documentType: LegalDocumentType
  documentVersion: string
  acceptedAt: string
  createdAt: string
}
```

规则：

- 每个用户对每个 `documentType` 最多保留一条最新确认记录（upsert by userId + documentType）。
- 成功注册 / 成功登录后，后端读取当前 active 文档版本；若版本相同则跳过写入，版本不同则更新为最新版本和时间戳。
- `documentVersion` 是全局版本号，与 locale 无关。
- 前端不需要传版本号，不需要处理协议更新拦截；正常 UI 仍必须勾选同意后才允许提交登录 / 注册。

## Profiles

### profiles

被撮合资料主表。只保存前台展示和撮合筛选需要的结构化资料。

```ts
interface ProfileRecord {
  id: string
  profileType: 'self' | 'family'
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

  archivedAt?: string
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
- `archivedAt`：仅供后端生命周期判断使用；非空时表示该 profile 已退出正常业务流，不再参与新的公开目录、推荐、私人介绍或其他新增动作，但历史关系仍保留。

### profile_photos

```ts
interface ProfilePhotoRecord {
  id: string
  profileId: string
  url: string
  isPrimary: boolean
  sortOrder: number
  status: 'review' | 'approved' | 'hidden'
  createdAt: string
  updatedAt: string
}
```


### profile_ownerships

用户和资料的关系。本人、父母、亲属都在这里表达。

```ts
interface ProfileOwnershipRecord {
  id: string
  userId: string
  profileId: string
  relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
  permission: 'owner' | 'manager' | 'viewer'
  status: 'pending' | 'active' | 'revoked'
  invitedByUserId?: string
  acceptedAt?: string
  revokedAt?: string
  isPrimary: boolean
  createdAt: string
  updatedAt: string
}
```

### profile_internal_records

平台工作人员看的敏感运营资料，不进入前台 profile DTO。

```ts
interface ProfileInternalRecord {
  id: string
  profileId: string
  employer?: LocalizedText
  incomeRange?: LocalizedText
  staffNotes?: LocalizedText
  riskFlags?: string[]
  source?: 'self_submitted' | 'family_submitted' | 'staff_collected'
  updatedByUserId?: string
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
  reviewStatus: ProfileReviewStatus
  verifiedAt?: string
  verifiedByUserId?: string
  createdAt: string
  updatedAt: string
}
```

### profile_contacts

联系方式受控保存。只有私人介绍成功或顾问确认后才可能开放。

```ts
type ContactVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
type ProfileContactVisibility = 'after_introduction' | 'owner_only' | 'disabled'
type ProfileContactChannel = 'phone' | 'email' | 'wechat'

interface ProfileContactRecord {
  id: string
  profileId: string
  phone?: string
  phoneVerificationStatus: ContactVerificationStatus
  email?: string
  emailVerificationStatus: ContactVerificationStatus
  wechat?: string
  wechatVerificationStatus: ContactVerificationStatus
  preferredChannel?: ProfileContactChannel
  visibility: ProfileContactVisibility
  createdAt: string
  updatedAt: string
}
```

### profile_privacy_preferences

profile 级半敏感字段隐藏偏好。该集合不定义完整权限模型。后端必须先应用 guest / free / member 默认展示规则，再叠加该记录里的隐藏开关。没有记录表示完全沿用平台默认规则。

```ts
interface ProfilePrivacyPreferenceRecord {
  id: string
  profileId: string
  hideMaritalStatus: boolean
  hideHasChildren: boolean
  hideChildrenPlan: boolean
  hideAcceptsLongDistance: boolean
  hideSmoking: boolean
  hideDrinking: boolean
  createdAt: string
  updatedAt: string
}
```

规则：

- 默认权限常量永远先执行。
- `profile_privacy_preferences` 只能把指定半敏感字段继续隐藏，不能把默认锁定字段变公开。
- 当前只覆盖婚姻 / 子女 / 是否接受异地 / 烟酒这类由用户决定是否公开的边缘敏感字段。
- 后台工作人员强制下架、审核锁定、会员权限，不进入这张表。

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

### staff_tasks

```ts
type StaffTaskSubjectType = 'user' | 'profile' | 'private_introduction_request' | 'event'

interface StaffTaskRecord {
  id: string
  assigneeUserId?: string
  subjectType: StaffTaskSubjectType
  subjectId: string
  status: 'open' | 'done' | 'snoozed'
  priority: 'low' | 'normal' | 'high'
  note: LocalizedText
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
legal_documents: unique(type, version)
legal_documents: unique(type) where status = 'active'
legal_document_contents: unique(documentId, locale)
user_agreement_acceptances: unique(userId, documentType)
user_onboarding_states: unique(userId)
profile_ownerships: index(userId), index(profileId)
profile_verifications: unique(profileId)
profile_contacts: unique(profileId)
profile_privacy_preferences: unique(profileId)
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

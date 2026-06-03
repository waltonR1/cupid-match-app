# 项目数据库字段（当前实现）

本文记录当前 `mock-server` 与 `mock-server/db.json` 的实际字段状态。它是当前实现快照，不是最终目标说明。

最终目标仍以这些文件为准：

- `docs/final-database-schema.md`
- `docs/final-api-contract.md`
- `docs/final-page-fields.md`
- `docs/final-data-flow-contract.md`
- `docs/deployment-guide.md`

最近核对时间：2026-05-31。

## 顶层集合

| Collection | Type | 当前职责 | 说明 |
| --- | --- | --- | --- |
| `profiles` | `ProfileRecord[]` | 相亲资料主表，只保存结构化 profile 核心字段。 | 公开展示字段、筛选字段和 account profile 编辑共同使用。 |
| `profile_photos` | `ProfilePhotoRecord[]` | profile 照片独立集合，头像由 `isPrimary` 派生。 | 上传后的 URL 写入此集合；公开头像由后端派生。 |
| `profile_internal_records` | `ProfileInternalRecord[]` | 后台工作人员可见的敏感运营资料与公开排序运营字段。 | `isFeatured` 只在后端用于排序 / 精选，不进入公开 DTO。 |
| `profile_verifications` | `ProfileVerificationRecord[]` | 实名、学历、收入、婚姻状态和平台审核等认证资料。 | detail 的 `isVerified` 由身份认证和平台审核共同派生。 |
| `profile_contacts` | `ProfileContactRecord[]` | phone / email / wechat 等受控联系方式。 | 仅 private introduction 成功后的受控流程可使用。 |
| `profile_privacy_preferences` | `ProfilePrivacyPreferenceRecord[]` | profile 半敏感字段隐藏偏好；detail 链路先使用默认常量表，再叠加该集合里的隐藏开关。 | account profile detail 可写。 |
| `events` | `EventRecord[]` | 活动主表，保存扁平活动资料、开放范围、地址可见性、容量与展示文案。 | events 公开页、account events 和 debug 管理共用。 |
| `event_agenda_items` | `EventAgendaItemRecord[]` | 活动流程项，按 `eventId + sortOrder` 关联活动。 | detail 页面按 sortOrder 展示。 |
| `event_registrations` | `EventRegistrationRecord[]` | 活动报名关系，是活动人数、候补与报名状态的 source of truth。 | account events 和活动报名状态共用。 |
| `users` | `UserRecord[]` | 登录账户主体，只保存账户身份、头像、默认语言和状态。 | 不保存 profile 展示字段。 |
| `auth_identities` | `AuthIdentityRecord[]` | 登录身份，使用 `provider + identifier + passwordHash`。 | 邮箱、手机号、微信、Google provider 统一建模；当前页面隐藏未开放项。 |
| `user_security_settings` | `UserSecuritySettingRecord[]` | 账户 MFA 设置。 | MFA 只使用已验证邮箱或手机号。 |
| `user_security_challenges` | `UserSecurityChallengeRecord[]` | 敏感操作短期验证码 challenge。 | 改密码、解绑身份、停用账户、导出数据前消费。 |
| `user_preferences` | `UserPreferenceRecord[]` | 用户服务偏好和通知偏好。 | 独立宽表，便于低频更新。 |
| `legal_documents` | `LegalDocumentRecord[]` | 协议主记录。 | 与多语言内容分离。 |
| `legal_document_contents` | `LegalDocumentContentRecord[]` | 协议多语言内容。 | `documentId + locale` 唯一。 |
| `user_agreement_acceptances` | `UserAgreementAcceptanceRecord[]` | 用户协议确认记录。 | 登录或注册成功即确认当前 active 协议。 |
| `membership_plans` | `MembershipPlanRecord[]` | 会员套餐事实源。 | 公开会员页和账户会员页共用。 |
| `user_memberships` | `UserMembershipRecord[]` | 当前用户会员等级与状态。 | 不与套餐定义或余额合并。 |
| `user_entitlement_balances` | `UserEntitlementBalanceRecord[]` | 用户权益额度使用量。 | 私人介绍额度等消耗型权益的 source of truth。 |
| `profile_ownerships` | `ProfileOwnershipRecord[]` | user 与 profile 的拥有关系。 | account profile 管理和权限判断使用。 |
| `favorite_profiles` | `FavoriteProfileRecord[]` | 收藏关系。 | account relationship 读取收藏列表；profile directory / detail 支持收藏与取消收藏写入。 |
| `private_introduction_requests` | `PrivateIntroductionRequestRecord[]` | 私人介绍申请。 | 申请状态和 quota 消耗闭环使用。 |
| `inbox_threads` | `InboxThreadRecord[]` | 消息中心线程。 | 系统通知和后续受控沟通统一入口。 |
| `inbox_messages` | `InboxMessageRecord[]` | 消息中心消息。 | 支持分页读取。 |
| `inbox_reads` | `InboxReadRecord[]` | 消息已读记录。 | 用于未读状态派生。 |
| `staff_tasks` | `StaffTaskRecord[]` | 后台工作人员待办任务。 | 不直接暴露给用户端。 |

## 通用本地化字段

```ts
interface LocalizedValue {
    value: string
    source: 'manual' | 'machine'
    provider: 'human' | 'translation_api' | null
    status: 'ready' | 'pending' | 'failed' | 'stale'
    updatedAt: string
}

interface LocalizedText {
    zh: LocalizedValue
    fr: LocalizedValue
    en: LocalizedValue
}
```

当前 `mock-server/db.json` 中所有 `LocalizedText` 字段都按上述结构保存：文本值与翻译元信息放在同一个 locale slot 内，不再拆成独立的 `meta` 对象。

当前规则：

- 人工填写或用户主动清空当前语言槽位时，使用 `manual / human / ready`。
- 待机器翻译的语言槽位使用 `machine / null / pending / value = ''`。
- 机器翻译成功后使用 `machine / translation_api / ready`。
- 数据库不保存 UI 占位文案；待翻译提示只由前端展示层处理。

## Auth / Account 当前字段

### users

```ts
interface UserRecord {
    id: string
    accountName: string
    avatarUrl: string
    preferredLocale: 'zh' | 'fr' | 'en'
    status: 'active' | 'deactivated' | 'suspended'
    createdAt: string
    updatedAt: string
}
```

`users` 不保存：

- `city`
- `onboardingPath`
- `onboardingStep`
- role / profileCompletion / membership tier
- profile display 字段

### auth_identities

```ts
interface AuthIdentityRecord {
    id: string
    userId: string
    provider: 'email' | 'phone' | 'wechat' | 'google'
    identifier: string
    passwordHash?: string
    verifiedAt?: string
    createdAt: string
    updatedAt: string
}
```

当前 mock 使用 `mock-sha256:<base64>` 形式的伪 hash。它只用于本地 mock，不是正式密码哈希方案。

登录 / 注册返回 `AuthSession.token`、`user` 和当前 `membership`，不返回 onboarding 状态。

### user_memberships

```ts
interface UserMembershipRecord {
    id: string
    userId: string
    planId: string
    tier: 'free' | 'silver' | 'gold' | 'diamond'
    status: 'active' | 'expired' | 'cancelled' | 'paused'
    startedAt: string
    expiresAt?: string
    createdAt: string
    updatedAt: string
}
```

profile detail 的访问层级和 account shell 当前从 active `user_memberships` 推导。

### profile_ownerships

```ts
interface ProfileOwnershipRecord {
    id: string
    profileId: string
    userId: string
    relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
    permission: 'owner' | 'manager'
    status: 'pending' | 'active' | 'revoked'
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
    createdAt: string
    updatedAt: string
}
```

## Auth API 当前形态

### POST /api/auth/register

```ts
interface RegisterPayload {
    path: 'self' | 'family'
    provider: 'email' | 'phone'
    identifier: string
    code: string
    password: string
    accountName: string
    preferredLocale: 'zh' | 'fr' | 'en'
}
```

注册只创建账户、登录身份、默认 user preference、默认 active free 会员状态和协议确认记录，不创建 profile，也不写 profile 字段。`RegisterPayload.path` 只表示本次注册入口，用于前端跳转，不持久化 onboarding 状态。`preferredLocale` 由前端当前页面语言自动传入，注册页不提供手动语言选择。

### POST /api/auth/login

```ts
interface LoginPayload {
    identifier: string
    password: string
}
```

登录通过 `auth_identities.identifier + passwordHash` 查找用户。

### AuthSession

```ts
interface AuthSession {
    token: string
    user: {
        id: string
        accountName: string
        avatarUrl: string
        preferredLocale: 'zh' | 'fr' | 'en'
        status: 'active' | 'deactivated' | 'suspended'
    }
    membership: {
        tier: 'free' | 'silver' | 'gold' | 'diamond'
        status: 'active' | 'expired' | 'cancelled' | 'paused'
    } | null
}
```

前端会持久化 `token`。当前前端在 development / staging 环境使用 `X-User-Id` 作为 mock request context；production 环境会把 `token` 作为 `Authorization: Bearer <token>` 发送。RuoYi 后端应返回可校验 JWT 或同等 Bearer token。

## Profile 主链路

### profiles

`profiles` 当前只保存核心结构化字段，不再保存展示派生字段、照片、问答、联系方式、实名、收入和雇主等敏感资料。

```ts
interface ProfileRecord {
    id: string
    profileType: 'self' | 'family'
    profileName: LocalizedText
    gender: GenderCode
    birthYear: number
    height: number
    city: LocalizedText
    country: LocalizedText
    nationality: LocalizedText
    languages: string[]
    profileStatus: ProfileStatus  // 'draft' | 'review' | 'open' | 'paused' | 'hidden'
    lastActiveAt: string
    familyVisible: boolean
    degreeLevel: DegreeLevel
    education: LocalizedText
    industry: LocalizedText
    careerDirection?: LocalizedText
    maritalStatus: MaritalStatus
    hasChildren: boolean
    childrenPlan: ChildrenPlan
    acceptsLongDistance: boolean
    datingIntentionCode: DatingIntentionCode
    relationshipGoal: LocalizedText
    residencePlan: LocalizedText
    relocation: RelocationCode
    relationshipValues: RelationshipValueCode[]
    preferredAgeMin: number
    preferredAgeMax: number
    preferredLocation: LocationScopeCode
    preferredEducation: LocalizedText
    familyLife: LocalizedText
    dealBreakers: LocalizedText[]
    smoking: HabitCode
    drinking: HabitCode
    exercise: LocalizedText
    activityLevel: ActivityLevelCode
    weekendStyle: WeekendStyleCode
    pets: PetCode
    personalityTraits: LocalizedText[]
    interests: LocalizedText[]
    communicationStyle: CommunicationStyleCode
    summary: LocalizedText
    tags: LocalizedText[]
    archivedAt?: string
    createdAt: string
    updatedAt: string
}
```

## Profile 派生字段

这些字段可以出现在 API DTO，但不保存在 `profiles` 主表：

| DTO 字段 | 派生来源 |
| --- | --- |
| `displayName` | `mock-server/src/utils/profile-derived.ts` 根据 `profile.id` 生成匿名展示名。 |
| `avatarUrl` | `profile_photos` 中 `isPrimary` 的照片。 |
| `age` | `profiles.birthYear`。 |
| `isVerified` | `profile_verifications.identityStatus = verified` 且 `reviewStatus = approved`。 |
| `datingIntentionLabel` | `profiles.datingIntentionCode` 后端字典派生。 |
| `photos` | `profile_photos` 按 `sortOrder` 返回。 |

## Events 主链路

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
    curatorNote: LocalizedText
    coverImageUrl: string
    createdAt: string
    updatedAt: string
}
```

Directory API 不返回 `address`；detail API 根据登录与报名状态返回 `addressVisible` / `addressLockReason`。

### event_agenda_items

```ts
interface EventAgendaItemRecord {
    id: string
    eventId: string
    time: string
    title: LocalizedText
    description: LocalizedText
    sortOrder: number
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
    waitlistedAt?: string
    attendedAt?: string
    createdAt: string
    updatedAt: string
}
```


## 当前边界

- `mock-server/db.json` 是演示数据源，不是生产数据库迁移脚本。
- `mock-server` 使用 LowDB 验证业务规则和 DTO，不提供生产级事务、审计、备份和并发控制。
- development / staging 当前请求上下文使用 `X-User-Id`；production 前端发送 `Authorization: Bearer <token>`。正式 RuoYi 后端应实现 token 校验、过期处理和权限解析。

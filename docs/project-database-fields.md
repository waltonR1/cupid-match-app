# 项目数据库字段（当前实现）

本文记录当前 `mock-server` 与 `mock-server/db.json` 的实际字段状态。它是当前实现快照，不是最终目标说明。

最终目标仍以这些文件为准：

- `docs/final-database-schema.md`
- `docs/final-api-contract.md`
- `docs/final-page-fields.md`
- `docs/final-data-flow-contract.md`
- `docs/implementation-roadmap.md`

最近核对时间：2026-05-13。

## 顶层集合

| Collection | Type | 当前职责 | 后续计划 |
| --- | --- | --- | --- |
| `profiles` | `ProfileRecord[]` | 相亲资料主表，只保存结构化 profile 核心字段。 | 已完成 Phase 2 收紧；后续随 profile 编辑链路继续补齐。 |
| `profile_photos` | `ProfilePhotoRecord[]` | profile 照片独立集合，头像由 `isPrimary` 派生。 | 后续接入照片上传、审核、排序。 |
| `profile_internal_records` | `ProfileInternalRecord[]` | 后台工作人员可见的敏感运营资料与公开排序运营字段。 | `isFeatured` 只在后端用于排序 / 精选，不进入公开 DTO。 |
| `profile_verifications` | `ProfileVerificationRecord[]` | 实名、学历、收入、婚姻状态和平台审核等认证资料。 | detail 的 `isVerified` 由身份认证和平台审核共同派生。 |
| `profile_contacts` | `ProfileContactRecord[]` | phone / email / wechat 等受控联系方式。 | 仅 private introduction 成功后的受控流程可使用。 |
| `profile_privacy_preferences` | `ProfilePrivacyPreferenceRecord[]` | profile 半敏感字段隐藏偏好；detail 链路先使用默认常量表，再叠加该集合里的隐藏开关。 | Phase 5.5 接入 account profile detail 写入。 |
| `events` | `EventRecord[]` | 活动主表，保存扁平活动资料、开放范围、地址可见性、容量与展示文案。 | 后续接入真实活动创建 / 编辑入口。 |
| `event_agenda_items` | `EventAgendaItemRecord[]` | 活动流程项，按 `eventId + sortOrder` 关联活动。 | 后续接入活动后台编辑。 |
| `event_registrations` | `EventRegistrationRecord[]` | 活动报名关系，是活动人数、候补与报名状态的 source of truth。 | 后续与 account activity / notification 联动。 |
| `users` | `UserRecord[]` | 登录账户主体，只保存账户身份、头像、默认语言和状态。 | 保持账户主体精简；Phase 5.5 只补 `accountName` / `avatarUrl` 写入。 |
| `auth_identities` | `AuthIdentityRecord[]` | 登录身份，使用 `provider + identifier + passwordHash`。 | 后续接入真实哈希和第三方 provider。 |
| `user_onboarding_states` | `UserOnboardingStateRecord[]` | 注册入口路径和 onboarding 进度。 | 后续 profile 创建链路更新 `profileId` / `completedAt`。 |
| `user_memberships` | `UserMembershipRecord[]` | 当前用户会员等级与状态。 | 已与 plan、entitlement、balance 分层；Phase 5.5 接入升级写入。 |
| `profile_ownerships` | `ProfileOwnershipRecord[]` | user 与 profile 的拥有关系。 | 后续扩展多 profile 管理和 advisor 权限。 |
| `favorite_profiles` | `FavoriteProfileRecord[]` | 收藏关系。 | 当前只支持 account relationship 读取；收藏 / 取消收藏写入链路留到 Phase 6。 |
| `message_threads` | `MessageThreadRecord[]` | 旧会话摘要。 | 后续被 private introduction room / messages 替代。 |
| `private_introduction_requests` | `PrivateIntroductionRequestRecord[]` | 私人介绍申请。 | 后续补齐 room、messages、quota source of truth。 |
| `staff_tasks` | `StaffTaskRecord[]` | 后台工作人员待办任务。 | 当前不直接进入用户端 dashboard；后续由 staff 后台管理。 |
| `privacy_settings` | `PrivacySettingRecord[]` | 旧隐私设置。 | 后续迁移到 user preferences；profile 字段隐藏偏好使用 `profile_privacy_preferences`。 |

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
    status: 'active' | 'paused' | 'banned'
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

### user_onboarding_states

```ts
interface UserOnboardingStateRecord {
    id: string
    userId: string
    path: 'self' | 'family'
    step: 'create_profile' | 'review_profile' | 'browse'
    profileId?: string
    completedAt?: string
    createdAt: string
    updatedAt: string
}
```

登录 / 注册返回的 onboarding 信息来自该集合，不来自 `users`。

### user_memberships

```ts
interface UserMembershipRecord {
    id: string
    userId: string
    tier: 'free' | 'silver' | 'gold' | 'diamond'
    status: 'active' | 'expired' | 'cancelled'
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
    password: string
    accountName: string
    preferredLocale: 'zh' | 'fr' | 'en'
}
```

注册只创建账户、登录身份、onboarding 状态和默认 active free 会员状态，不创建 profile，也不写 profile 字段。`preferredLocale` 由前端当前页面语言自动传入，注册页不提供手动语言选择。

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
    }
    onboarding: {
        path: 'self' | 'family'
        step: 'create_profile' | 'review_profile' | 'browse'
        profileId?: string
    }
}
```

前端会持久化 `token`，但当前请求鉴权仍使用 mock request context：`X-User-Id`。`token` 是为后续 Authorization 预留的 mock placeholder。

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
    registeredCountCache?: number
    waitlistCountCache?: number
    advisorNote: LocalizedText
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
    desc: LocalizedText
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
    createdAt: string
    updatedAt: string
}
```

活动人数、候补人数和剩余席位当前由 `event_registrations` 动态计算，`registeredCountCache` / `waitlistCountCache` 仅作为后续缓存字段预留。

## 仍待后续阶段处理

- `profile_privacy_preferences` 已接入 detail 读取链路；它只作为默认权限之上的半敏感字段隐藏层。
- private introduction room / messages 已有基础结构，read receipts 仍待后续阶段处理。
- account center 已完成 Phase 5 只读重写；Phase 5.5 需要补齐 profile、半敏感字段隐藏偏好、account basics、preferences、membership 的写操作。

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
| `profile_prompts` | `ProfilePromptRecord[]` | self detail 使用的资料问答独立集合。 | 后续接入问答编辑与审核。 |
| `profile_internal_records` | `ProfileInternalRecord[]` | 后台 / 顾问可见的敏感运营资料。 | 后续进入顾问后台，不直接返回前端 detail。 |
| `profile_verifications` | `ProfileVerificationRecord[]` | 实名、学历、顾问审核等认证资料。 | detail 的 `isVerified` 由该集合派生。 |
| `profile_contact_methods` | `ProfileContactMethodRecord[]` | phone / email / wechat 等受控联系方式。 | 仅 private introduction 成功后的受控流程可使用。 |
| `profile_visibility_settings` | `ProfileVisibilitySettingRecord[]` | profile 字段可见性配置；detail 链路会优先读取该集合，空集合时使用默认常量表。 | 后续与 account safety / membership 权限联动。 |
| `events` | `EventRecord[]` | 活动资料，当前仍嵌套 `agenda`。 | Phase 4 拆出 `event_agenda_items` 并完善 events 链路。 |
| `users` | `UserRecord[]` | 登录账户主体，只保存账户身份、头像、默认语言和状态。 | Phase 5 与 account 页面重写继续扩展 preferences。 |
| `auth_identities` | `AuthIdentityRecord[]` | 登录身份，使用 `provider + identifier + passwordHash`。 | 后续接入真实哈希和第三方 provider。 |
| `user_onboarding_states` | `UserOnboardingStateRecord[]` | 注册入口路径和 onboarding 进度。 | 后续 profile 创建链路更新 `profileId` / `completedAt`。 |
| `user_memberships` | `UserMembershipRecord[]` | 当前用户会员等级与状态。 | Phase 5 拆为 plan、entitlement、balance。 |
| `profile_ownerships` | `ProfileOwnershipRecord[]` | user 与 profile 的拥有关系。 | 后续扩展多 profile 管理和 advisor 权限。 |
| `user_registrations` | `UserRegistrationRecord[]` | 当前活动报名关系。 | Phase 4 改名并迁移到 events 最终链路。 |
| `favorite_profiles` | `FavoriteProfileRecord[]` | 收藏关系。 | 后续统一时间字段。 |
| `message_threads` | `MessageThreadRecord[]` | 旧会话摘要。 | 后续被 private introduction room / messages 替代。 |
| `private_introduction_requests` | `PrivateIntroductionRequestRecord[]` | 私人介绍申请。 | 后续补齐 room、messages、quota source of truth。 |
| `privacy_settings` | `PrivacySettingRecord[]` | 旧隐私设置。 | 后续迁移到 user preferences / profile visibility。 |

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
    role: 'self' | 'parent' | 'guardian' | 'advisor'
    relationshipToProfile?: 'self' | 'father' | 'mother' | 'relative' | 'advisor'
    permission: 'owner' | 'manager' | 'viewer'
    isPrimary: boolean
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

## Profile 派生字段

这些字段可以出现在 API DTO，但不保存在 `profiles` 主表：

| DTO 字段 | 派生来源 |
| --- | --- |
| `displayName` | `mock-server/src/utils/profile-derived.ts` 根据 `profile.id` 生成匿名展示名。 |
| `avatarUrl` | `profile_photos` 中 `isPrimary` 的照片。 |
| `age` | `profiles.birthYear`。 |
| `isVerified` | `profile_verifications` 中任一认证状态为 `verified`。 |
| `datingIntentionLabel` | `profiles.datingIntentionCode` 后端字典派生。 |
| `photos` | `profile_photos` 按 `sortOrder` 返回。 |
| `prompts` | `profile_prompts` 按 `sortOrder` 返回，当前只用于 self detail。 |

## 仍待后续阶段处理

- events 仍使用嵌套 `agenda` 和 `user_registrations`，Phase 4 处理。
- `profile_visibility_settings` 已接入 detail 链路，但 account safety 页面还未提供写入入口。
- private introduction 还未拆出 room / messages / read receipts。
- account 页面仍是 Phase 1 冻结后的壳，Phase 5 重写。

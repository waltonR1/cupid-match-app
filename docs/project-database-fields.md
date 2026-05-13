# 项目数据库字段（当前实现）

本文记录当前 `mock-server` 与 `mock-server/db.json` 的实际字段状态。它是当前实现快照，不是最终目标说明。

最终目标仍以这些文件为准：

- `docs/final-database-schema.md`
- `docs/final-api-contract.md`
- `docs/final-page-fields.md`
- `docs/final-data-flow-contract.md`
- `docs/implementation-roadmap.md`

最近核对时间：2026-05-13。

## 核对来源

- `mock-server/src/types/database.ts`
- `mock-server/src/types/profile.ts`
- `mock-server/src/constants/profile-access.ts`
- `mock-server/src/services/profile.service.ts`
- `src/api/profiles/profiles.types.ts`
- `mock-server/db.json`

读取 `mock-server/db.json` 时需要按 UTF-8 解析，否则 PowerShell 默认编码可能把中文内容显示成乱码。

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
| `events` | `EventRecord[]` | 活动资料，当前仍嵌套 `agenda`。 | 后续拆出 `event_agenda_items` 并完善 events 链路。 |
| `users` | `UserRecord[]` | 当前登录用户主体。 | Phase 5 会重写 account / auth 用户模型。 |
| `auth_identities` | `AuthIdentityRecord[]` | 登录身份。 | 后续改 `passwordHash`，补齐多 provider。 |
| `memberships` | `MembershipRecord[]` | 当前用户会员等级。 | 后续拆为 plan、entitlement、balance。 |
| `profile_ownerships` | `ProfileOwnershipRecord[]` | user 与 profile 的拥有关系。 | 后续扩展 guardian / advisor / permission。 |
| `user_registrations` | `UserRegistrationRecord[]` | 当前活动报名关系。 | 后续改名并迁移到 events 最终链路。 |
| `favorite_profiles` | `FavoriteProfileRecord[]` | 收藏关系。 | 后续统一时间字段。 |
| `message_threads` | `MessageThreadRecord[]` | 旧会话摘要。 | 后续被 private introduction room / messages 替代。 |
| `private_introduction_requests` | `PrivateIntroductionRequestRecord[]` | 私人介绍申请。 | 后续补齐 room、messages、quota source of truth。 |
| `privacy_settings` | `PrivacySettingRecord[]` | 旧隐私设置。 | 后续迁移到 user preferences / profile visibility。 |

## 当前 enum

```ts
type MembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
type AuthProvider = 'email' | 'phone' | 'wechat'
type UserStatus = 'active' | 'paused' | 'banned'
type OnboardingPath = 'self' | 'family'
type OnboardingStep = 'create_profile' | 'review_profile' | 'browse'
type RegisterRole = 'self' | 'parent'
type ProfileStatus = 'open' | 'vip' | 'review' | 'draft' | 'paused' | 'hidden'
type GenderCode = 'male' | 'female'
type DegreeLevel = 'bachelor' | 'master' | 'phd'
type MaritalStatus = 'never_married' | 'divorced' | 'widowed'
type ChildrenPlan = 'wants' | 'open_to_discuss' | 'does_not_want'
type DatingIntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
type HabitCode = 'never' | 'social' | 'often'
type PrivateIntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cooldown'
```

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

### profile_photos

```ts
interface ProfilePhotoRecord {
    id: string
    profileId: string
    url: string
    caption: LocalizedText
    isPrimary: boolean
    sortOrder: number
    status: 'approved' | 'review' | 'hidden'
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

### profile_internal_records

```ts
interface ProfileInternalRecord {
    id: string
    profileId: string
    employer?: LocalizedText
    incomeRange?: LocalizedText
    religion?: LocalizedText
    politicalViews?: LocalizedText
    hometown?: LocalizedText
    livingSituation?: LocalizedText
    funFacts?: LocalizedText[]
    notes?: LocalizedText
    createdAt: string
    updatedAt: string
}
```

### profile_verifications

```ts
interface ProfileVerificationRecord {
    id: string
    profileId: string
    legalName?: string
    dateOfBirth?: string
    identityStatus: 'pending' | 'verified' | 'rejected'
    educationStatus: 'pending' | 'verified' | 'rejected'
    advisorStatus: 'pending' | 'verified' | 'rejected'
    createdAt: string
    updatedAt: string
}
```

### profile_contact_methods

```ts
interface ProfileContactMethodRecord {
    id: string
    profileId: string
    type: 'phone' | 'email' | 'wechat'
    value: string
    visibleAfterIntroduction: boolean
    createdAt: string
    updatedAt: string
}
```

### profile_visibility_settings

```ts
interface ProfileVisibilitySettingRecord {
    id: string
    profileId: string
    fieldCode: string
    visibility: 'public' | 'registered' | 'member' | 'private'
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

## Profile 权限控制

当前 detail API 仍通过 `mock-server/src/constants/profile-access.ts` 的常量表进行字段遮罩：

- guest 看到 `__LOGIN_REQUIRED__`
- free 看到 `__MEMBER_ONLY__`
- member 看到真实值

当前权限字段已经从 `wantsChildren` 改为 `childrenPlan`。`profile_visibility_settings` 为空时沿用默认常量表；一旦存在同 profile 的字段配置，detail API 会优先按配置遮罩字段。

## 已从 profiles 主表移出的字段

| 旧字段 | 当前位置 |
| --- | --- |
| `displayName` | 后端派生 DTO。 |
| `avatarUrl` | `profile_photos.isPrimary` 派生 DTO。 |
| `age` | `birthYear` 派生 DTO。 |
| `datingIntentionLabel` | `datingIntentionCode` 派生 DTO。 |
| `photos` | `profile_photos`。 |
| `prompts` | `profile_prompts`。 |
| `legalName` | `profile_verifications`。 |
| `phone` / `email` / `wechat` | `profile_contact_methods`。 |
| `employer` / `incomeRange` | `profile_internal_records`。 |
| `religion` / `politicalViews` | `profile_internal_records`。 |
| `hometown` / `livingSituation` / `funFacts` | `profile_internal_records`。 |
| `pronouns` / `sexuality` / `interestedIn` / `zodiac` | 已从当前 mock 数据移除。 |
| `conversationStarters` / `dateIdeas` / `compatibilityDimensions` | 已从当前 mock 数据移除。 |
| `joinedAt` | 改为 `createdAt`。 |
| `wantsChildren` | 改为 `childrenPlan`。 |

## 当前 API 形态提醒

- self 和 family API 仍是分开的：
  - `GET /api/profiles/self`
  - `GET /api/profiles/self/:id`
  - `POST /api/profiles/self/:id/private-introduction`
  - `GET /api/profiles/family`
  - `GET /api/profiles/family/:id`
  - `POST /api/profiles/family/:id/private-introduction`
- 前端 API DTO 仍允许 `displayName`、`avatarUrl`、`age`、`photos`、`datingIntentionLabel`，这些都是后端聚合后的前端展示字段。
- `FamilyProfileDetailDTO` 当前不返回 `prompts`；`SelfProfileDetailDTO` 返回 `prompts` 并受会员权限控制。

## 仍待后续阶段处理

- account / auth 仍是 Phase 1 冻结后的临时结构，后续按 `implementation-roadmap.md` Phase 5 重写。
- events 仍使用嵌套 `agenda`，后续按 events 最终字段链路拆分。
- `profile_visibility_settings` 已接入 detail 链路，但 account safety 页面还未提供写入入口。
- private introduction 还未拆出 room / messages / read receipts。

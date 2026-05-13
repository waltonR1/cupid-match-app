# 项目数据库字段（当前实现）

本文记录当前 `mock-server` 和 `mock-server/db.json` 的实际字段状态。它是当前实现快照，不是最终目标结构。

最终目标结构以这些文件为准：

- `docs/final-database-schema.md`
- `docs/final-api-contract.md`
- `docs/final-page-fields.md`
- `docs/final-data-flow-contract.md`
- `docs/implementation-roadmap.md`

本文件最近核对时间：2026-05-13。

## 核对来源

- `mock-server/src/types/database.ts`
- `mock-server/src/types/profile.ts`
- `mock-server/src/constants/profile-access.ts`
- `mock-server/src/services/profile.service.ts`
- `src/api/profiles/profiles.types.ts`
- `mock-server/db.json`

读取 `mock-server/db.json` 时需要按 UTF-8 解析，否则 PowerShell 默认编码可能把中文内容显示成乱码。

## 顶层集合

| Collection                      | Type                                 | 当前职责                                                   | 最终计划                                                           |
|---------------------------------|--------------------------------------|--------------------------------------------------------|----------------------------------------------------------------|
| `profiles`                      | `ProfileRecord[]`                    | 相亲资料主表，目前同时承载展示字段、敏感字段、照片、问答和部分后台字段。                   | 收紧为结构化 profile 主表，照片、问答、联系方式、审核、内部资料拆出。                        |
| `events`                        | `EventRecord[]`                      | 活动资料，目前嵌套 `agenda`，并直接保存 `seats` / `registered`。       | 增加活动字段，拆出 `event_agenda_items`，报名改为 `event_registrations`。     |
| `users`                         | `UserRecord[]`                       | 登录用户主体，目前仍包含 `city`、`onboardingPath`、`onboardingStep`。 | 只保留账号身份字段；onboarding 拆到 `user_onboarding_states`。              |
| `auth_identities`               | `AuthIdentityRecord[]`               | 登录身份，目前保存 `password`。                                  | 使用 `passwordHash`，支持多 provider。                                |
| `memberships`                   | `MembershipRecord[]`                 | 当前用户会员等级。                                              | 拆为 plan、membership、entitlement、balance。                        |
| `profile_ownerships`            | `ProfileOwnershipRecord[]`           | 用户与 profile 的拥有关系。                                     | 扩展 role、relationship、permission 和时间字段。                         |
| `user_registrations`            | `UserRegistrationRecord[]`           | 当前活动报名关系。                                              | 改名并迁移为 `event_registrations`。                                  |
| `favorite_profiles`             | `FavoriteProfileRecord[]`            | 收藏关系。                                                  | 保留关系表，字段改为 `createdAt` / `updatedAt`。                          |
| `message_threads`               | `MessageThreadRecord[]`              | 旧会话摘要。                                                 | 后续由 private introduction room / messages 替代或暂停。                |
| `private_introduction_requests` | `PrivateIntroductionRequestRecord[]` | 私人介绍申请。                                                | 扩展 requesterProfile、targetProfile、quota、advisor 和时间字段。         |
| `privacy_settings`              | `PrivacySettingRecord[]`             | 当前隐私设置，仍保存页面文案。                                        | 改为 `user_preferences` 或 profile visibility code/value，不保存页面文案。 |

## 通用类型

```ts
interface LocalizedText {
    zh: string
    fr: string
    en: string
}
```

当前 enum：

```ts
type MembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
type AuthProvider = 'email' | 'phone' | 'wechat'
type UserStatus = 'active' | 'paused' | 'banned'
type OnboardingPath = 'self' | 'family'
type OnboardingStep = 'create_profile' | 'review_profile' | 'browse'
type RegisterRole = 'self' | 'parent'
type ProfileStatus = 'open' | 'vip' | 'review'
type GenderCode = 'male' | 'female'
type DegreeLevel = 'bachelor' | 'master' | 'phd'
type MaritalStatus = 'single' | 'divorced' | 'widowed'
type DatingIntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
type HabitCode = 'never' | 'social' | 'often'
type PrivateIntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cooldown'
```

## Account / Auth 当前字段

### users

```ts
interface UserRecord {
    id: string
    accountName: string
    avatarUrl: string
    city: LocalizedText
    preferredLocale: 'zh' | 'fr' | 'en'
    status: UserStatus
    onboardingPath: OnboardingPath
    onboardingStep: OnboardingStep
    createdAt: string
    updatedAt: string
}
```

当前问题：

- `city` 不应长期留在 `users`，应进入 profile、event 或 user preference。
- `onboardingPath` / `onboardingStep` 不应长期留在 `users`，应拆到 `user_onboarding_states`。
- `avatarUrl` 当前可用于账号头像；profile 的头像不应从 `users` 读取。

### auth_identities

```ts
interface AuthIdentityRecord {
    id: string
    userId: string
    provider: AuthProvider
    identifier: string
    password: string
    verifiedAt?: string
    createdAt: string
}
```

当前问题：

- 当前仍使用 `password`，最终计划应使用 `passwordHash`。
- 当前 provider 没有 `google`，最终 schema 预留 `google`。

### memberships

```ts
interface MembershipRecord {
    id: string
    userId: string
    tier: MembershipLevel
    startedAt: string
    expiresAt?: string
}
```

当前问题：

- 当前只有用户会员等级，没有套餐、权益、额度余额表。
- 私人介绍额度目前由服务层根据 tier 推导，不是独立 entitlement source of truth。

### profile_ownerships

```ts
interface ProfileOwnershipRecord {
    id: string
    profileId: string
    userId: string
    role: RegisterRole
    isPrimary: boolean
}
```

当前问题：

- 当前 role 只有 `self` / `parent`。
- 最终需要支持 `guardian` / `advisor`、`relationshipToProfile`、`permission`、`createdAt`、`updatedAt`。

## Profile 当前数据库字段

### profiles

当前 `ProfileRecord` 是一个过大的主表：

```ts
interface ProfileRecord {
    id: string
    legalName: string
    nickname: string
    displayName: string
    avatarUrl: string
    photos: ProfilePhotoRecord[]
    gender: GenderCode
    pronouns: string
    sexuality: string
    interestedIn: GenderCode[]
    age: number
    height: number
    city: LocalizedText
    country: LocalizedText
    nationality: LocalizedText
    hometown: LocalizedText
    languages: string[]
    livingSituation: LocalizedText
    zodiac: LocalizedText
    profileStatus: ProfileStatus
    isVerified: boolean
    lastActiveAt: string
    joinedAt: string
    familyVisible: boolean
    allowFamilyContact: boolean
    familyPriority: boolean
    degreeLevel: DegreeLevel
    education: LocalizedText
    occupation: LocalizedText
    industry: LocalizedText
    employer: LocalizedText
    incomeRange: LocalizedText
    maritalStatus: MaritalStatus
    hasChildren: boolean
    wantsChildren: boolean
    acceptsLongDistance: boolean
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: LocalizedText
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
    religion: LocalizedText
    politicalViews: LocalizedText
    personalityTraits: LocalizedText[]
    interests: LocalizedText[]
    communicationStyle: LocalizedText
    funFacts: LocalizedText[]
    summary: LocalizedText
    highlights: LocalizedText[]
    tags: LocalizedText[]
    conversationStarters: LocalizedText[]
    dateIdeas: LocalizedText[]
    prompts: ProfilePromptRecord[]
    compatibilityDimensions: CompatibilityDimensionRecord[]
    phone: string
    email: string
    wechat: string
}
```

当前字段分组：

| 分组    | 当前字段                                                                                                                                                                                          | 备注                                                                              |
|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| 身份与展示 | `legalName`, `nickname`, `displayName`, `avatarUrl`, `gender`, `age`, `height`                                                                                                                | `displayName`、`avatarUrl`、`age` 最终应由后端派生；`legalName` 进入 verification。           |
| 照片    | `photos[]`                                                                                                                                                                                    | 当前嵌套在 profile；最终拆为 `profile_photos`。                                            |
| 社交身份  | `pronouns`, `sexuality`, `interestedIn`                                                                                                                                                       | 与当前高端中介式产品定位不匹配，计划移除。                                                           |
| 地理与语言 | `city`, `country`, `nationality`, `hometown`, `languages`, `livingSituation`, `zodiac`                                                                                                        | `city`、`country`、`nationality`、`languages` 保留；其余倾向移除。                           |
| 状态    | `profileStatus`, `isVerified`, `lastActiveAt`, `joinedAt`                                                                                                                                     | `joinedAt` 最终改为 `createdAt`；验证状态后续进入 verification。                              |
| 家庭视图  | `familyVisible`, `allowFamilyContact`, `familyPriority`                                                                                                                                       | 当前 family 链路仍使用。                                                                |
| 教育职业  | `degreeLevel`, `education`, `occupation`, `industry`, `employer`, `incomeRange`                                                                                                               | `occupation` 改为 `careerDirection` 或移除；`employer` / `incomeRange` 进入 internal。   |
| 关系意向  | `maritalStatus`, `hasChildren`, `wantsChildren`, `acceptsLongDistance`, `datingIntentionCode`, `datingIntentionLabel`, `relationshipPlan`, `residencePlan`, `relocationWillingness`, `values` | `wantsChildren` 最终改为 `childrenPlan`；`datingIntentionLabel` 由 code 派生。           |
| 择偶偏好  | `preferredAgeMin`, `preferredAgeMax`, `locationScope`, `preferredEducation`, `familyPlan`, `dealBreakers`                                                                                     | 当前 detail 仍使用。                                                                  |
| 生活方式  | `smoking`, `drinking`, `exercise`, `activityLevel`, `weekendStyle`, `pets`                                                                                                                    | 当前 detail 仍使用。                                                                  |
| 敏感背景  | `religion`, `politicalViews`                                                                                                                                                                  | 当前 API 不返回，最终迁移到 internal 或问卷。                                                  |
| 内容表达  | `personalityTraits`, `interests`, `communicationStyle`, `funFacts`, `summary`, `highlights`, `tags`, `conversationStarters`, `dateIdeas`, `prompts`                                           | `conversationStarters` / `dateIdeas` 已从 detail 链路移除；`prompts` 当前仍在 self detail。 |
| 匹配判断  | `compatibilityDimensions`                                                                                                                                                                     | 当前 API 类型仍存在，但主 detail DTO 不返回；最终不使用百分比分数。                                      |
| 联系方式  | `phone`, `email`, `wechat`                                                                                                                                                                    | 当前 detail 不直接返回；最终拆为 `profile_contact_methods`。                                 |

### photos[]

当前嵌套结构：

```ts
interface ProfilePhotoRecord {
    id: string
    url: string
    caption: LocalizedText
    isPrimary: boolean
}
```

最终计划：

- 拆为顶层集合 `profile_photos`。
- 增加 `profileId`、`sortOrder`、`status`、`createdAt`、`updatedAt`。
- `avatarUrl` 由主图派生，不再保存到 `profiles.avatarUrl`。

### prompts[]

当前嵌套结构：

```ts
interface ProfilePromptRecord {
    id: string
    promptCode: string
    prompt: LocalizedText
    answer: LocalizedText
}
```

当前链路：

- `mock-server/src/services/profile.service.ts` 在 `toSelfProfileDetail()` 中把 `profile.prompts` 本地化后返回。
- `SelfProfileDetailDTO.prompts` 是 `Restricted<LocalizedProfilePromptDTO[]>`。
- `FAMILY_PROFILE_MEMBER_ONLY_FIELDS` 没有 `prompts`。
- `FamilyProfileDetailDTO` 当前不返回 `prompts`。
- 前端 `src/api/profiles/profiles.types.ts` 仍声明 `ProfilePrompt` 和 `SelfProfileDetail.prompts`。

最终计划：

- `prompts` 不再嵌套在 `profiles` 主表。
- 拆为顶层集合 `profile_prompts`。
- 增加 `profileId`、`sortOrder`、`status`、`createdAt`、`updatedAt`。
- 写入走独立 API；按当前 self/family 路由边界，self prompt 使用 `/api/profiles/self/:id/prompts` 这类 self 入口，不挂到泛化 detail 接口。
- 如果 family detail 不展示 prompts，最终 API 文档应明确 self/family detail 的字段差异，避免一个泛化 `ProfileDetailDTO` 暗示
  family 也必然返回 prompts。

### compatibilityDimensions[]

当前嵌套结构：

```ts
interface CompatibilityDimensionRecord {
    code: string
    label: LocalizedText
    score: number
}
```

当前状态：

- `ProfileRecord` 和前端 API 类型仍有 compatibility 类型。
- 当前 self/family detail DTO 不返回 `compatibilityDimensions`。
- 页面重构后不再展示百分比匹配分数。

最终计划：

- 从 profile 主表移除。
- 若后续恢复，应改为定性标签或顾问判断，不使用百分比分数作为前台展示核心。

## Profile 当前 API DTO

### SelfProfileListItemDTO

```ts
interface SelfProfileListItemDTO {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    city: string
    profileStatus: ProfileStatus
    education: string
    industry: string
    datingIntentionCode: DatingIntentionCode
    summary: string
    languages: string[]
    tags: string[]
}
```

### FamilyProfileListItemDTO

```ts
interface FamilyProfileListItemDTO {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    city: string
    profileStatus: ProfileStatus
    education: string
    industry: string
    maritalStatus: MaritalStatus
    hasChildren: boolean
    acceptsLongDistance: boolean
    relationshipPlan: string
    residencePlan: string
    tags: string[]
    allowFamilyContact: boolean
    familyPriority: boolean
}
```

### SelfProfileDetailDTO

当前 self detail 返回扁平字段，并通过特殊值做权限遮罩：

```ts
type Restricted<T> = T | '__LOGIN_REQUIRED__' | '__MEMBER_ONLY__'

interface SelfProfileDetailDTO {
    id: string
    displayName: string
    avatarUrl: string
    photos: LocalizedProfilePhotoDTO[]
    gender: GenderCode
    age: Restricted<number>
    height: number
    city: string
    country: Restricted<string>
    languages: Restricted<string[]>
    profileStatus: ProfileStatus
    isVerified: boolean
    education: string
    industry: Restricted<string>
    maritalStatus: Restricted<MaritalStatus>
    hasChildren: Restricted<boolean>
    wantsChildren: Restricted<boolean>
    acceptsLongDistance: Restricted<boolean>
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: string
    relationshipPlan: Restricted<string>
    residencePlan: Restricted<string>
    relocationWillingness: Restricted<string>
    values: Restricted<string[]>
    preferredAgeMin: Restricted<number>
    preferredAgeMax: Restricted<number>
    locationScope: Restricted<string>
    preferredEducation: Restricted<string>
    familyPlan: Restricted<string>
    dealBreakers: Restricted<string[]>
    smoking: Restricted<HabitCode>
    drinking: Restricted<HabitCode>
    exercise: Restricted<string>
    activityLevel: Restricted<string>
    weekendStyle: Restricted<string>
    pets: Restricted<string>
    personalityTraits: Restricted<string[]>
    interests: Restricted<string[]>
    communicationStyle: Restricted<string>
    summary: string
    tags: string[]
    prompts: Restricted<LocalizedProfilePromptDTO[]>
    privateIntroduction: PrivateIntroductionDTO
}
```

### FamilyProfileDetailDTO

Family detail 当前不返回 `prompts`，但返回 family 相关控制字段：

```ts
interface FamilyProfileDetailDTO {
    id: string
    displayName: string
    avatarUrl: string
    photos: LocalizedProfilePhotoDTO[]
    gender: GenderCode
    age: number
    height: number
    city: string
    country: Restricted<string>
    nationality: Restricted<string>
    languages: Restricted<string[]>
    profileStatus: ProfileStatus
    isVerified: boolean
    familyVisible: boolean
    allowFamilyContact: boolean
    familyPriority: boolean
    education: string
    industry: string
    maritalStatus: Restricted<MaritalStatus>
    hasChildren: Restricted<boolean>
    wantsChildren: Restricted<boolean>
    acceptsLongDistance: Restricted<boolean>
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: string
    relationshipPlan: Restricted<string>
    residencePlan: Restricted<string>
    relocationWillingness: Restricted<string>
    values: Restricted<string[]>
    preferredAgeMin: Restricted<number>
    preferredAgeMax: Restricted<number>
    locationScope: Restricted<string>
    preferredEducation: Restricted<string>
    familyPlan: Restricted<string>
    dealBreakers: Restricted<string[]>
    smoking: Restricted<HabitCode>
    drinking: Restricted<HabitCode>
    exercise: Restricted<string>
    activityLevel: Restricted<string>
    weekendStyle: Restricted<string>
    pets: Restricted<string>
    personalityTraits: Restricted<string[]>
    communicationStyle: Restricted<string>
    summary: string
    tags: string[]
    privateIntroduction: PrivateIntroductionDTO
}
```

## Profile 当前权限字段

当前字段遮罩由 `mock-server/src/constants/profile-access.ts` 控制。

### Self detail

登录后可见、游客遮罩：

```ts
const SELF_PROFILE_LOGIN_REQUIRED_FIELDS = [
    'country',
    'languages',
    'maritalStatus',
    'acceptsLongDistance',
    'relationshipPlan',
    'values',
    'smoking',
    'drinking',
    'exercise',
    'activityLevel',
    'weekendStyle',
    'pets',
    'interests',
]
```

会员可见、免费用户遮罩：

```ts
const SELF_PROFILE_MEMBER_ONLY_FIELDS = [
    'hasChildren',
    'wantsChildren',
    'residencePlan',
    'relocationWillingness',
    'preferredAgeMin',
    'preferredAgeMax',
    'locationScope',
    'preferredEducation',
    'familyPlan',
    'dealBreakers',
    'personalityTraits',
    'communicationStyle',
    'prompts',
]
```

### Family detail

登录后可见、游客遮罩：

```ts
const FAMILY_PROFILE_LOGIN_REQUIRED_FIELDS = [
    'country',
    'nationality',
    'languages',
    'maritalStatus',
    'relationshipPlan',
    'acceptsLongDistance',
    'smoking',
    'drinking',
    'exercise',
    'activityLevel',
    'weekendStyle',
    'pets',
]
```

会员可见、免费用户遮罩：

```ts
const FAMILY_PROFILE_MEMBER_ONLY_FIELDS = [
    'hasChildren',
    'wantsChildren',
    'residencePlan',
    'relocationWillingness',
    'values',
    'preferredAgeMin',
    'preferredAgeMax',
    'locationScope',
    'preferredEducation',
    'familyPlan',
    'dealBreakers',
    'personalityTraits',
    'communicationStyle',
]
```

当前注意点：

- 权限结果当前通过字段值替换为 `__LOGIN_REQUIRED__` 或 `__MEMBER_ONLY__` 表达。
- 当前还没有独立的 `access` / `lockedFields` DTO。
- 当前还没有 `profile_visibility_settings` 集合。

## Event 当前字段

### events

```ts
interface EventRecord {
    id: string
    date: string
    city: LocalizedText
    venue: LocalizedText
    status: string
    title: LocalizedText
    format: LocalizedText
    audience: LocalizedText
    summary: LocalizedText
    seats: number
    registered: number
    agenda: EventAgendaItem[]
}
```

### agenda[]

```ts
interface EventAgendaItem {
    time: string
    title: LocalizedText
    desc: LocalizedText
}
```

当前问题：

- `agenda` 仍嵌套在 `events`。
- `registered` 仍直接存在 event 主表。
- 还没有 `slug`、`visibility`、`address`、`addressVisibility`、`startTime`、`endTime`、`relationshipFocus`、`languageCodes`、
  `capacity`、`advisorNote`、`coverImageUrl`。

## 关系集合当前字段

### user_registrations

```ts
interface UserRegistrationRecord {
    id: string
    userId: string
    eventId: string
    status: string
    note: LocalizedText
}
```

最终计划：改为 `event_registrations`，并增加 `requestedAt`、`confirmedAt`、`cancelledAt`、`createdAt`、`updatedAt`。

### favorite_profiles

```ts
interface FavoriteProfileRecord {
    id: string
    userId: string
    profileId: string
    savedAt: string
    note: LocalizedText
}
```

最终计划：保留收藏关系，但统一时间字段为 `createdAt` / `updatedAt`。

### message_threads

```ts
interface MessageThreadRecord {
    id: string
    userId: string
    profileId: string
    updatedAt: string
    unread: number
    lastMessage: LocalizedText
}
```

最终计划：如果要保留沟通能力，应进入 private introduction room / message 模型，不再让 `message_threads` 作为最终 source of
truth。

### private_introduction_requests

```ts
interface PrivateIntroductionRequestRecord {
    id: string
    requesterUserId: string
    profileId: string
    status: PrivateIntroductionStatus
    requestedAt: string
    respondedAt?: string
    cooldownUntil?: string
}
```

当前问题：

- 当前字段名是 `profileId`，最终计划应改成 `targetProfileId`。
- 当前没有 `requesterProfileId`、`message`、`entitlementBalanceId`、`advisorId`、`createdAt`、`updatedAt`。

### privacy_settings

```ts
interface PrivacySettingRecord {
    id: string
    userId: string
    enabled: boolean
    title: LocalizedText
    desc: LocalizedText
}
```

当前问题：

- 当前在数据库保存页面文案 `title` / `desc`。
- 最终应改为 code/value，不保存页面文案。

## Profile 字段与修改计划专项核对

### 当前已经符合方向的点

- Profile detail API 到前端基本是扁平结构，没有把页面 section 分组返回给前端。
- 后端不返回前端 i18n key；返回 code 或已本地化文案。
- `phone` / `email` / `wechat` 当前没有直接出现在 self/family detail DTO。
- `conversationStarters` / `dateIdeas` 已经不在 self/family detail DTO。
- 权限相关信息当前由 mock-server 统一替换为特殊值，前端不自行决定原始字段是否可见。

### 当前仍未收敛的字段

| 当前字段                                      | 当前位置                            | 问题                                 | 计划                                                         |
|-------------------------------------------|---------------------------------|------------------------------------|------------------------------------------------------------|
| `displayName`                             | `profiles`, DTO                 | 数据库仍保存展示名。                         | 从 DB 移除，由后端根据 profile id 派生 DTO。                           |
| `avatarUrl`                               | `profiles`, DTO                 | 数据库仍保存头像，同时又有 `photos`。            | 从 DB 移除，由 `profile_photos.isPrimary` 派生。                   |
| `age`                                     | `profiles`, DTO                 | 年龄会随时间失真。                          | 改为 `birthYear` 或 verification 生日派生。                        |
| `legalName`                               | `profiles`                      | 敏感实名不应在 profile 主表。                | 迁移到 `profile_verifications`。                               |
| `nickname`                                | `profiles`                      | 与展示名边界不清。                          | 删除，或改为需审核的 `publicAlias`。                                  |
| `datingIntentionLabel`                    | `profiles`, DTO                 | label 是派生值，不应入库。                   | 只保存 `datingIntentionCode`，DTO 派生本地化 label。                 |
| `wantsChildren`                           | `profiles`, DTO                 | boolean 太窄，不能表达开放、未决定、不想要。         | 改为 `childrenPlan` enum。                                    |
| `maritalStatus: single`                   | enum / DB / DTO                 | 与最终语义不一致。                          | 改为 `never_married`。                                        |
| `occupation`                              | `profiles`, account summary     | 精确职位不适合作为公开字段。                     | 删除或改为 `careerDirection`。                                   |
| `employer` / `incomeRange`                | `profiles`                      | 敏感职业/收入信息。                         | 迁移到 `profile_internal_records`。                            |
| `religion` / `politicalViews`             | `profiles`                      | 不在当前前台主链路，且敏感。                     | 迁移到 internal 或问卷，不进前台 DTO。                                 |
| `pronouns` / `sexuality` / `interestedIn` | `profiles`                      | 更像开放社交 App 字段。                     | 从当前产品主链路移除。                                                |
| `hometown` / `livingSituation` / `zodiac` | `profiles`                      | 当前页面价值低，增加 dossier 感。              | 移除或移到后台问卷。                                                 |
| `funFacts` / `highlights`                 | `profiles`                      | 当前 detail 不消费，语义与 tags/summary 重叠。 | 移除或重新定义 narrative source。                                  |
| `conversationStarters` / `dateIdeas`      | `profiles`                      | 已从页面移除但 DB 仍保留。                    | 清理出主表。                                                     |
| `compatibilityDimensions`                 | `profiles`, API type            | 百分比匹配不符合当前产品定位。                    | 移除；如保留，改为定性顾问判断。                                           |
| `photos`                                  | `profiles` nested               | 嵌套结构不贴近结构化数据库。                     | 拆为 `profile_photos`。                                       |
| `prompts`                                 | `profiles` nested / self detail | 嵌套结构与最终写入、排序、状态管理冲突。               | 拆为 `profile_prompts`；明确 self/family 是否都消费。                 |
| `phone` / `email` / `wechat`              | `profiles`                      | 联系方式不应在 profile 主表。                | 拆为 `profile_contact_methods`，仅 private introduction 成功后开放。 |
| `joinedAt`                                | `profiles`                      | 与通用时间字段重复。                         | 改为 `createdAt` / `updatedAt`。                              |

### prompts 当前最需要修正的文档点

当前实现和最终计划之间的差异很明确：

- 当前数据库：`profiles[].prompts[]` 嵌套保存。
- 当前 self detail API：返回 `prompts`，并作为会员字段遮罩。
- 当前 family detail API：不返回 `prompts`。
- 最终数据库：应为独立 `profile_prompts` 集合。
- 最终 API：如果继续使用泛化 `ProfileDetailDTO`，会暗示 self/family 都返回 `prompts`；这和当前 family 产品链路不一致。

建议收敛方式：

1. 数据库最终形态坚持 `profile_prompts` 独立集合。
2. API 文档不要用一个完全泛化的 detail DTO 掩盖 self/family 差异。
3. 可以定义 `ProfileDetailBaseDTO`，再拆 `SelfProfileDetailDTO` 和 `FamilyProfileDetailDTO`。
4. `SelfProfileDetailDTO` 可以包含 `prompts`。
5. `FamilyProfileDetailDTO` 只有在产品确认家长视角也需要问答时才加入 `prompts`，否则保持不返回。
6. 前端页面字段文档只记录页面实际消费的 ViewModel，不把 DB 的 `prompts` 嵌套结构带到页面。

## 下一步清理优先级

建议按照 `docs/implementation-roadmap.md` 继续：

1. 先冻结 / 收敛 account，避免 account 继续依赖 profile 旧字段。
2. 再清理 profile 主表，先处理 `displayName`、`avatarUrl`、`age`、`datingIntentionLabel`、`wantsChildren`、`occupation`、
   `photos`、`prompts`。
3. 同步 mock-server service mapper、前端 API type、hook mapper 和页面字段。
4. 最后再清理 DB 中已不被页面和 API 消费的旧字段。

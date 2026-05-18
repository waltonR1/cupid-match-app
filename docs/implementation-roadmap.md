# Implementation Roadmap

## 背景判断

当前项目已经完成了 self detail、family detail、profile directory 的一轮收紧。`38de9b60e69afa5f5dc959e6a816a81f1d082110` 提交完成了第一轮 auth/login/register onboarding 改造，但这不是最终态。

重新评估后，最大阻塞不是 profile 旧字段本身，而是 `account` 仍在以页面聚合数据的方式借用 profile 旧字段。只要 account 继续作为兼容层存在，profile 清理、auth 修正、events 重做都会被旧字段牵制。

因此新的策略是：先让 account 从核心数据链路中退场，保留登录态和占位壳；再按最终态清理 profile 字段；之后修 auth、events；最后按最终模型重写 account / membership / entitlement。

后续以本文作为执行顺序入口，以 `docs/final-database-schema.md` 作为最终数据库形态入口，以 `docs/final-api-contract.md` 作为最终 API 接口入口，以 `docs/final-page-fields.md` 作为最终页面字段入口，以 `docs/final-data-flow-contract.md` 作为链路边界约束入口。

推荐执行顺序：

```text
Phase 1: 冻结 account，移除它对 profile 旧字段的依赖
Phase 2: 清理 profile 主表旧字段，直接对齐最终 profile schema
Phase 3: 修正当前 auth / registration / onboarding 模型
Phase 4: 完成 events 页面与 API 字段链路
Phase 4.5: 升级 agreement / legal documents 链路
Phase 5: 按最终态重写 account / membership / entitlement
Phase 5.4: 引入 profile 归档生命周期
Phase 5.5: 补齐 account center 写操作
Phase 5.6: 设计独立消息中心
Phase 6: 完成 profile / event / account / private introduction 联动
```

每一阶段都应保持项目现有调用链：

```text
page -> hook -> api -> mock-server
```

## Mock Server Positioning

当前 `mock-server` 是 Node.js + TypeScript 写的 high-fidelity business mock / 领域模型验证层，用于验证前端数据链路、API DTO 边界、source of truth、ownership、visibility、onboarding、entitlement、registration 等业务规则，并支撑前端页面完整闭环。

它不是 production backend。未来正式后端将由 Java 实现；当前 `mock-server` 的输出应成为 Java 后端复刻领域模型和接口 contract 的参考。

当前执行优先级：

1. 前端页面闭环。
2. API DTO 稳定。
3. mock 数据链路跑通。
4. 权限 / 可见性结果由 `mock-server` 统一给出。
5. 为 Java 后端保留清晰 contract。

当前阶段不要把 JWT / refresh token、真实权限安全体系、真实数据库事务、Redis / MQ、审计系统、上传存储、部署 / monitoring、migration、限流、完整 security hardening 做成重点。

但 domain boundary、DTO boundary、source of truth、ownership、visibility / masking、onboarding state、entitlement / quota 语义、event registration source of truth 必须认真实现。

## 全局约束

- 不引入新依赖，除非有明确必要。
- 前端页面不直接调用 `@/api/shared/http.ts`。
- API 到前端尽量保持扁平结构。
- 后端不返回 i18n key，后端只返回 code 或本地化后的文案。
- 数据库 `mock-server/db.json` 用扁平结构模拟未来结构化数据库，不在 profile 内部做页面分组。
- API endpoint 和 DTO 字段以 `docs/final-api-contract.md` 为准。
- 页面 ViewModel 字段以 `docs/final-page-fields.md` 为准。
- 文档描述目标状态和当前差距，不写临时过程日志。
- account 字段、profile 字段、membership 字段不要互相代偿。
- 不为了 account 临时展示保留 profile 旧字段。
- 最终字段结构以 `docs/final-database-schema.md` 为准；`docs/project-database-fields.md` 只记录当前实现。
- 每个阶段完成后至少运行：

```bash
npm run type-check
npm run mock:build
```

涉及 i18n 时额外运行：

```bash
npm run check:i18n
```

涉及页面结构或 H5 展示时额外运行：

```bash
npm run build:h5
```

## 当前代码承接能力核对

本轮按实际代码逐项核对后的结论是：文档方向可以承接，但当前代码仍大量停留在旧模型，不能把文档当成已完成实现。

1. `datingIntentionLabel` 当前仍在 `mock-server/db.json`、profile service、event related profiles、前端 DTO 中使用。最终态应从 `profiles` 移除，只保留 `datingIntentionCode`，由后端字典 / i18n 派生 DTO label。
2. 活动报名人数当前没有 `event_registrations` 作为真实来源，仍依赖 event 主记录上的容量 / 已报名字段和 `user_registrations`。最终态以 `event_registrations` 为 source of truth，event 主表只允许可重建 count cache。
3. 当前已有 Record / DTO / ViewModel 的雏形，但 mock-server profile types 和 service mapper 仍和数据库字段强耦合；后续必须拆清 database record、API DTO、frontend view model。
4. `displayName` 当前仍从数据库 profile 字段读取，并被 account/profile 前端链路消费。最终态从数据库移除，由后端根据 profile id 生成。
5. `avatarUrl` 当前仍是 profile / user 字段，同时 profile photos 已存在嵌套主图概念。最终态由 `profile_photos.isPrimary` 派生 DTO avatarUrl。
6. `age` 当前仍保存在 profile 中，并被筛选 / 排序依赖。最终态由 `birthYear` 或认证生日派生；ageRange filter 迁移到后端计算。
7. `occupation` 当前主要被 account summary / account 页面继续读取。profile 公开层最终只保留 `industry` / `careerDirection`，account 先冻结，避免继续反向决定 profile schema。
8. `profile_visibility_settings` 当前代码不存在；现有 masking 由 profile access 常量和 service 统一处理。Phase 2 先把 detail 链路接入 visibility settings，默认值可沿用当前常量。
9. account 当前仍读取旧 profile 字段、用户 onboarding 字段和联系方式相关聚合，是 profile 清理的最大阻塞点。Phase 1 必须先冻结 account。
10. auth 当前仍把 `users.city / onboardingPath / onboardingStep` 作为注册和 session 的一部分，注册仍要求 city。最终态迁移到 `user_onboarding_states`，注册不写 city。
11. 当前 `photos / prompts / agenda` 仍嵌套在主记录中。最终态不再为 mock 便利保留嵌套结构，统一使用 `profile_photos / profile_prompts / event_agenda_items`。
12. 面向浏览者的 public profile detail 不直接返回 phone / email / wechat，这是正确方向；受控联系方式进入 `profile_contact_methods`。账户中心中的 owner-side profile detail 可以读取并维护本人管理档案的联系方式。
13. 权限结果目前主要由后端 masking 给出，前端消费 locked placeholder；这是可承接方向，但应继续收敛为 DTO access/privacy 空间。
14. 当前 `ProfileRecord` 实际承担数据库、筛选、account 聚合和 DTO 来源等多重职责。Phase 2 必须避免继续扩大这个万能对象。
15. 总结：当前代码仍是 `Record -> service mapper -> page` 的旧方向，文档应作为下一轮重构目标，而不是描述当前实现。

## Phase 1：冻结 account，移除它对 profile 旧字段的依赖

### 目标

先把 account 从当前核心数据链路中摘出来，避免它继续阻塞 profile 字段清理和 auth/events 重构。

这不是最终重写 account，而是让 account 临时退场：

- Header 登录态继续可用。
- auth store 继续可用。
- `X-User-Id` mock request context 继续可用。
- `/pages/account/*` 统一降级为空状态或占位体验。
- `useAccountOverview()` 不再成为 profile schema 的阻塞条件。
- `/account/overview` 可保留最小空态或只服务占位页。

### 当前问题

当前 account 链路仍会借用这些 profile 旧字段或临时聚合字段：

```text
legalName
nickname
occupation
highlights
phone
email
wechat
profile completion
privacy_settings.title/desc
message_threads
```

这些字段不应继续决定 profile schema。

### 修改范围

- `src/pages/account/*`
- `src/components/account/*`
- `src/hooks/account/use-account-overview.ts`
- `src/api/account/*`
- `mock-server/src/services/account.service.ts`
- `mock-server/src/routes/account.routes.ts`
- `src/components/layout/AppHeader.vue`
- `src/constants/nav.ts`
- `src/i18n/messages/*/account-center.ts`

### 推荐做法

account 页面先统一成稳定占位：

- index：展示登录账户名和“账户中心重建中”的空态。
- relationship / profiles / events / settings：展示对应模块占位。
- 不读取 profile detail 字段来拼 account 摘要。
- 不为了 account 页保留任何 profile 旧字段。

`useAccountOverview()` 可以先退化为：

- 未登录：空态。
- 已登录：只返回最小账户壳，例如 `user.id`、`accountName`。
- 不返回 profile summary、favorites、threads、privacy setting 等临时聚合。

### 验收标准

- account 页面不再依赖 profile 旧字段。
- 删除 profile 旧字段不会导致 account 页面类型错误。
- Header 登录/登出正常。
- 登录态持久化正常。
- `requestJson` 仍能从 auth store 或缓存取 `X-User-Id`。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- 涉及页面时 `npm run build:h5` 通过。

## Phase 2：清理 profile 主表旧字段，直接对齐最终 profile schema

### 目标

在 account 退场后，直接清理 profile 主表旧字段。不再为了兼容 account 摘要保留旧字段。

此阶段只保留 profile directory、self detail、family detail 真正需要的公开资料字段；后台工作人员需要看的字段迁到独立 internal / verification / contact 结构，不再混在 `profiles` 主表。

重要原则：

- `profiles` 是被撮合资料主体，不是后台审核表。
- 前台展示名不再保存为 `profiles.displayName`，由后端根据 profile id 生成。
- 前台年龄不再保存为 `profiles.age`，由 `birthYear` 或认证生日派生。
- `createdAt` 和 `updatedAt` 必须保留。
- 后台字段可以保留，但应迁移到后台专用结构，避免被 detail / directory 默认暴露。
- profile 链路先预留字段可见性配置，支持“不展示/会员可见/介绍后可见”等隐私场景；等 account 做好后再联调用户侧设置。

### 第一批删除或迁移

这些字段当前已经不在主要 API / 页面链路中展示，或不符合当前产品定位。执行时按三类处理，避免误删顾问仍可能需要的信息。

确认删除，不做替代：

```text
pronouns
sexuality
interestedIn
zodiac
```

迁移给后台或顾问使用：

```text
hometown -> profile_internal_records
livingSituation -> profile_internal_records
funFacts -> profile_internal_records 或 advisor note
```

暂存或重新定义，后续如恢复必须换新模型：

```text
conversationStarters
dateIdeas
compatibilityDimensions
```

理由：

- `pronouns / sexuality / interestedIn` 更接近社交约会 App，不符合当前高端中介式资料表达。
- `zodiac` 信息价值低，容易把 detail 拉回 dossier。
- `hometown / livingSituation / funFacts` 如果顾问仍需要，可作为后台判断或破冰素材，不进入公开 profile DTO。
- `conversationStarters / dateIdeas` 已从 self detail 链路移除，未来若恢复应由顾问流程重新定义。
- `compatibilityDimensions` 不应使用百分比分数，若未来恢复，应改为定性判断模型。

以下字段不再留在 `profiles` 主表，但可以迁移给后台或顾问使用：

```text
employer -> profile_internal_records
incomeRange -> profile_internal_records
religion -> profile_internal_records 或 profile_review_answers
politicalViews -> profile_internal_records 或 profile_review_answers
```

理由：

- `employer / incomeRange` 过度敏感，前台只应展示职业方向与经济稳定度，不展示精确雇主或收入。
- `religion / politicalViews` 可能是顾问判断或深度问卷信息，不适合作为公开 profile 主字段。
- 这些字段若给后台工作人员使用，应进入受控 internal 结构，由后台接口读取，不进入 profile directory/detail DTO。

### 第二批迁移

```text
legalName -> profile_verifications
phone/email/wechat -> profile_contact_methods
profile field privacy -> profile_visibility_settings
```

联系方式建议结构：

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

理由：

- 联系方式不是 profile 展示字段。
- 只有私人介绍成功后才可能开放。
- 独立表更容易做权限、审计、脱敏和顾问确认。
- `profile_visibility_settings` 先由 profile detail 链路读取，后续再和 account preferences / membership entitlements 联调。

### 第三批重定义

```text
displayName
nickname
avatarUrl
age
occupation
highlights
joinedAt
```

建议：

- `displayName` 从数据库移除，由后端根据 profile id 生成，例如 `CM-${stableHash(profile.id).slice(0, 6).toUpperCase()}` 或本地化规则生成的匿名展示名；不依赖自增数字、真实姓名、昵称或账户名。
- `nickname` 需要单独评估。若是用户自定义公开称呼，可迁移为 `publicAlias`；若只是旧 displayName 的重复字段，应删除。
- `legalName` 不留在 `profiles` 主表，迁移到 `profile_verifications` 或后台审核资料。
- `avatarUrl` 由 `photos[].isPrimary` 派生；若当前组件还需要头像字段，可先由 mapper 派生，不保留数据库字段。
- `age` 由 `birthYear` 或认证生日派生，不作为数据库字段直接保存。
- `occupation` 删除或改为 `careerDirection`，不要作为精确职位公开展示。
- `highlights` 若 detail 不需要，可删除；若需要，应重新定义为 profile narrative 字段。
- `joinedAt` 改为 `createdAt`。
- 所有 profile 记录必须有 `createdAt` 和 `updatedAt`。

### 清理后的目标结构

最终数据库结构以 `docs/final-database-schema.md` 为准。本节只摘录 Phase 2 需要优先落地的 profile 相关结构。

`profiles` 主表目标结构：

```ts
interface ProfileRecord {
  id: string
  gender: 'male' | 'female'
  birthYear: number
  height: number
  city: LocalizedText
  country: LocalizedText
  nationality: LocalizedText
  languages: string[]
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  isPriorityProfile: boolean
  lastActiveAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  degreeLevel: 'bachelor' | 'master' | 'phd'
  education: LocalizedText
  industry: LocalizedText
  careerDirection?: LocalizedText
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  childrenPlan: 'wants' | 'open_to_discuss' | 'does_not_want'
  acceptsLongDistance: boolean
  datingIntentionCode: 'serious' | 'marriage' | 'exclusive' | 'cross_border'
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
  smoking: 'never' | 'social' | 'often'
  drinking: 'never' | 'social' | 'often'
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

注意：

- `displayName` 不在数据库保存，后端 DTO 里可返回派生值。
- `avatarUrl` 不在数据库保存，后端 DTO 里可由主图派生。
- `age` 不在数据库保存，后端 DTO 里可由 `birthYear` 或认证生日派生。
- `datingIntentionLabel` 不在数据库保存，后端 DTO 里由 `datingIntentionCode` 通过字典 / i18n 派生。
- `legalName`、`phone`、`email`、`wechat` 不在 `profiles` 主表。
- `occupation` 不作为精确职位公开字段，优先使用 `industry` / `careerDirection`。
- `photos`、`prompts` 不嵌套在 `profiles` 主表，使用独立集合 `profile_photos`、`profile_prompts`。

profile 照片、问答、可见性配置：

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

interface ProfileVisibilitySettingRecord {
  id: string
  profileId: string
  fieldCode: ProfileFieldCode
  visibility: 'public' | 'member' | 'introduced' | 'owner_only' | 'hidden'
  lockedByAdvisor: boolean
  reason?: string
  createdAt: string
  updatedAt: string
}
```

前台 Profile DTO 可以包含派生字段：

```ts
interface ProfilePublicIdentityDTO {
  id: string
  displayName: string
  avatarUrl: string
  age: number
}
```

`displayName` 生成规则：

```text
profiles.id -> backend display name generator -> DTO.displayName
```

规则要求：

- 不读 `profiles.displayName`。
- 不暴露真实姓名。
- 同一 profile id 生成稳定结果。
- 生成逻辑放在 mock-server mapper/service，不放前端。
- `age` 由后端派生，不读 `profiles.age`。

后台资料结构：

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

认证结构：

```ts
interface ProfileVerificationRecord {
  id: string
  profileId: string
  legalName?: string
  dateOfBirth?: string
  identityStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  educationStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  incomeStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  maritalStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  advisorStatus: 'unreviewed' | 'pending' | 'approved' | 'rejected'
  verifiedAt?: string
  verifiedBy?: string
  createdAt: string
  updatedAt: string
}
```

### 修改范围

- `mock-server/db.json`
- `mock-server/src/types/profile.ts`
- `mock-server/src/services/profile.service.ts`
- `mock-server/src/types/database.ts`
- `mock-server/src/utils` 或 mapper 中新增 displayName 派生工具
- `src/api/profiles/*`
- `src/types/profiles/*`
- `src/mappers/*profile*`
- `src/pages/profiles/**/*`
- `src/components/profiles/**/*`
- `docs/project-database-fields.md`

### 验收标准

- `mock-server/db.json` 的 `profiles` 主表中无旧字段。
- `mock-server/src/types/profile.ts` 的 `ProfileRecord` 中无旧字段。
- `profile_photos`、`profile_prompts`、`profile_visibility_settings` 使用独立集合，不嵌套在 `profiles` 主表。
- `profiles.displayName` 已移除，DTO 中的 `displayName` 由后端按 id 派生。
- `profiles.createdAt`、`profiles.updatedAt` 存在。
- 后台工作人员字段迁移到 internal / verification / contact 结构，不进入前台 profile 主表。
- profile detail API 预留可见性配置读取点；没有配置时使用默认字段权限常量。
- `docs/project-database-fields.md` 与实际一致。
- profile directory、self detail、family detail 全部通过验证。
- account 占位页不阻塞 profile 清理。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run build:h5` 通过。

## Phase 3：修正当前 auth / registration / onboarding 模型

### 基线对比

Phase 3 的 auth 基线参考：

```text
38de9b60e69afa5f5dc959e6a816a81f1d082110
refactor(auth): align login register onboarding flow
```

该提交已经完成：

- 注册表单从 profile 式表单收缩为账户入口。
- 新增或使用 `users`、`auth_identities`、`memberships`、`profile_ownerships`。
- 登录通过 `auth_identities.identifier + password` 查找用户。
- 注册后写入 `users`、`auth_identities`、`memberships`。
- 前端 `authStore.user.id` 可被 `requestJson` 转为 `X-User-Id`。
- 登录 / 注册后按 onboarding path 跳转 self 或 family directory。

因此，当前需要审视的是第一轮 auth 改造后留下的模型问题，而不是把 auth 当作完成态。

### 当前问题

- `users` 同时承担登录账户、城市、onboarding 路径等职责，容易继续膨胀。
- `onboardingPath` 是注册入口状态，不应长期成为用户主体身份。
- `self / family / parent` 这类关系应进入 `profile_ownerships`，而不是固定在 user 主体上。
- `memberships` 只有 `tier / startedAt / expiresAt`，无法表达权益、额度、状态、续费和赠送。
- 注册成功后没有创建 profile 是正确方向，但也没有建立清晰的 onboarding 记录或 profile creation intent。
- `AuthSession.token` 当前返回但前端不保存、不使用；实际鉴权依赖 mock 的 `X-User-Id`。
- `accountName` 是账户展示名；profile 对外展示名应由后端按 profile id 派生，不应从数据库读取 `profiles.displayName`。
- 当前注册要求 `city`，但账户创建不需要城市；城市应在 profile 创建或偏好设置中填写。

### 目标

- 注册只创建登录账户和初始账户状态，不创建 profile。
- `users` 只描述登录账户主体，不表达永久角色、会员等级、profile 完成度。
- 登录身份由 `auth_identities` 表达。
- 注册入口路径只作为 onboarding 状态或 profile 创建意图，不作为长期用户身份。
- 可以保留 mock 鉴权的 `X-User-Id`，但必须在文档和代码边界上承认它是 mock context，不是正式 token 鉴权。
- 为 Phase 5 的 membership entitlement、profile ownership、多 profile 管理预留结构。

### 推荐产品流程

```text
1. 选择使用入口
   - 我为自己使用
   - 我为家人了解

2. 创建账户
   - email 或 phone
   - password
   - accountName
   - preferredLocale 由当前页面语言自动写入，不在注册表单中手动选择

3. 创建默认会员状态
   - 写入 active free `user_memberships`
   - Phase 5 再完整拆出 membership plan / entitlement / balance

4. 建立 onboarding 状态
   - path = self 或 family
   - step = create_profile
   - profileId = null

5. 注册成功后进入 profile creation / directory 的临时落地页
```

### 数据库目标

最低目标集合：

```text
users
auth_identities
user_onboarding_states
user_memberships
profile_ownerships
```

推荐目标：

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

onboarding 独立结构：

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

说明：

- `onboardingPath`、`onboardingStep` 不再写入 `users`，由 `user_onboarding_states` 表达。
- 注册阶段不写入 `city`。
- 注册阶段写入 `preferredLocale`，但该值来自当前前端 locale，不作为注册页手动字段。
- 不新增 `role`。
- 不新增 `profileCompletion`。
- 不在 `users` 中保存会员 tier。
- 不在 `users` 中保存 profile 展示名。

认证表：

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

资料所有权：

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

### Auth API 目标

注册接口：

```text
POST /api/auth/register
```

payload：

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

说明：`wechat`、`google` 是 `auth_identities` 的最终预留登录方式，当前注册表单只开放 email / phone；第三方登录或绑定身份后续单独设计。`preferredLocale` 不作为注册页手动字段，前端从当前页面语言自动填充。

response：

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

登录接口：

```text
POST /api/auth/login
```

payload：

```ts
interface LoginPayload {
  identifier: string
  password: string
}
```

### 修改范围

后端：

- `mock-server/src/types/database.ts`
- `mock-server/src/services/auth.service.ts`
- `mock-server/src/routes/auth.routes.ts`
- `mock-server/db.json`
- `docs/project-database-fields.md`
- `docs/mock-server-guide.md`

前端：

- `src/api/auth/auth.types.ts`
- `src/api/auth/auth.ts`
- `src/stores/modules/auth.ts`
- `src/api/shared/http.ts`
- `src/pages/auth/register.vue`
- `src/pages/auth/login.vue`
- `src/i18n/messages/*/register.ts`
- `src/i18n/messages/*/login.ts`
- `src/utils/navigation.ts`
- `src/utils/validate.ts`

### 验收标准

- 注册仍不创建 profile，也不写 profile 字段。
- 新用户注册后写入账户主体、认证身份、onboarding 状态、默认会员状态。
- 默认会员状态在 Phase 3 至少写入 active free `user_memberships`；quota 和 entitlement 余额在 Phase 5 完整落地。
- `users` 不出现 `role`、`profileCompletion`、会员 tier、profile 展示字段。
- `users` 不出现 `city`、`onboardingPath`、`onboardingStep`。
- `self / family / parent` 不作为永久 user 身份。
- `accountName` 明确是账户展示名；profile 展示名由后端根据 profile id 派生。
- 注册 payload 不包含 `city`，注册服务不写入账户城市。
- 若继续使用 `X-User-Id`，必须限定为 mock request context。
- 登录后 `authStore.user.id` 正常存在，HTTP 自动带 `X-User-Id`。
- 登录 / 注册返回的 onboarding 信息来自 `user_onboarding_states`，不来自 `users`。
- 登录 / 注册返回 `user.preferredLocale`，前端据此同步 locale store。
- `AuthSession.token` 的使用策略明确：要么进入 store 并作为未来 Authorization 预留，要么文档标注当前 token 仅为 mock 占位。
- 未登录访问 detail 仍走 guest 权限。
- 已登录 free 用户访问 detail 能走 free 权限。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run check:i18n` 通过。

## Phase 4：完成 events 页面与 API 字段链路

### 目标

把 events 从简单活动列表，升级为平台中介撮合的重要入口。

events 应表达：

- 活动定位。
- 适合人群。
- 顾问筛选感。
- 报名状态。
- 席位节奏。
- 和 profile / membership 的关系。

### 数据库建议

当前 `events` 字段偏少，可扩展但保持扁平。

建议 `EventRecord`：

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

`event_registrations` 是报名人数的真实来源。`registeredCountCache` / `waitlistCountCache` 只允许作为可重建缓存；Event DTO 可以继续返回 `registeredCount` / `waitlistCount`。

活动流程使用独立集合，不嵌套在 `events` 主表：

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

活动报名使用 `event_registrations`：

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

不再保留 `user_registrations` 作为最终命名。

### API 设计

目录：

```text
GET /api/events
```

query：

```ts
interface EventDirectoryQuery {
  page: number
  pageSize: number
  city?: string
  status?: string
  visibility?: 'public' | 'registered' | 'member'
  month?: string
}
```

response：

```ts
interface EventDirectoryResponse {
  items: EventListItem[]
  pagination: Pagination
  facets: EventDirectoryFacets
}
```

详情：

```text
GET /api/events/:id
```

response：

```ts
interface EventDetail {
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
  advisorNote: string
  coverImageUrl: string
  agendaItems: EventAgendaItem[]
  registration: EventRegistrationState
}
```

报名：

```text
POST /api/events/:id/register
POST /api/events/:id/cancel
```

### 前端修改范围

- `src/api/events/events.types.ts`
- `src/api/events/events.ts`
- `src/hooks/events/use-events-directory.ts`
- `src/hooks/events/use-event-detail.ts`
- `src/pages/events/index.vue`
- `src/pages/events/detail.vue`
- `src/mappers` 下可新增 event directory/detail mapper。
- `src/i18n/messages/*/events.ts`

### 页面建议

events index：

- 顶部展示 curated events 语气。
- 筛选：城市、月份、开放状态、会员专属。
- 列表卡片展示 title、date/time、city/venue、format、audience、remaining seats / waitlist、memberOnly badge；`memberOnly` 由 `visibility === 'member'` 派生，不作为 event 主表的第二个事实字段。
- 列表不展示精确地址。

event detail：

- 活动基本信息。
- `venue` 可直接展示，精确 `address` 只展示 detail API 返回的可见值；未登录或未满足报名规则时展示锁定提示。
- 顾问说明。
- 适合人群。
- 活动流程。
- 报名状态。
- 登录/会员限制 CTA。

### 验收标准

- events index 不再只展示简单 mock 字段。
- `events` 不嵌套 `agenda`，活动流程来自 `event_agenda_items`。
- 活动报名写入 `event_registrations`，不继续使用 `user_registrations`。
- event detail 能根据登录状态返回报名状态。
- 已登录用户先提交活动申请，写入 `requested`；平台确认后再进入 `confirmed` 或 `waitlist`，不合适则进入 `declined`。
- Phase 5 重写 account 后可读取用户报名记录。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run build:h5` 通过。

## Phase 4.5：升级 agreement / legal documents 链路

### 目标

在 account 重写前，先把平台服务条款和隐私说明从前端 i18n 正文中迁出，建立独立 legal documents API，并让登录 / 注册成功自动记录用户当前确认的协议版本。

本阶段不重写 account，不做协议版本拦截页，不让前端传协议版本。产品语义固定为：

> 成功登录或成功注册本身即表示用户接受当前 active 服务条款与隐私说明。

正常 UI 仍必须勾选同意后才允许提交登录 / 注册；若有人绕过前端直接调用 API，只要认证成功，也视为接受当前 active 协议。

### 数据库目标

新增集合：

```text
legal_documents
user_agreement_acceptances
```

`legal_documents`：

```ts
interface LegalDocumentRecord {
  id: string
  type: 'terms' | 'privacy'
  version: string
  locale: 'zh' | 'fr' | 'en'
  title: string
  sections: Array<{
    heading: string
    clauses: Array<{
      number: string
      body: string
    }>
    sortOrder: number
  }>
  status: 'draft' | 'active' | 'archived'
  effectiveAt: string
  createdAt: string
  updatedAt: string
}
```

`attended` 是活动完成后的用户可见终态。当前保留该状态并允许前端展示；后续由自动结算或顾问到场确认将 `confirmed` 推进为 `attended`，不由用户侧直接写入。

`user_agreement_acceptances`：

```ts
interface UserAgreementAcceptanceRecord {
  id: string
  userId: string
  documentType: 'terms' | 'privacy'
  documentVersion: string
  locale: 'zh' | 'fr' | 'en'
  acceptedAt: string
  createdAt: string
}
```

规则：

- `legal_documents` 每个 `type + locale` 只能有一个 active 文档。
- `user_agreement_acceptances` 每个 `userId + documentType` 只保留最新确认版本。
- 成功登录 / 注册后，后端读取当前 locale 下 active `terms` 和 `privacy`，upsert 用户确认记录；版本不变则跳过。
- `sections` 是协议正文结构；前端按 section heading 与 clauses 渲染，不解析 Markdown。
- mock 可在目标语言缺失时回退到 `zh` active 文档；正式库应补齐三语言协议版本。

### API 目标

```text
GET /api/legal/documents/:type
```

`type` 为 `terms` 或 `privacy`，`lang` 仍走现有 query 规则。

```ts
interface LegalDocumentDTO {
  type: 'terms' | 'privacy'
  version: string
  locale: 'zh' | 'fr' | 'en'
  title: string
  sections: Array<{
    heading: string
    clauses: Array<{
      number: string
      body: string
    }>
  }>
  effectiveAt: string
}
```

不新增：

- `POST /api/legal/acceptances`
- `RegisterPayload.agreementAcceptances`
- `LoginPayload.agreementAccepted`
- `AuthSession.legal.requiresAgreementUpdate`

### 前端修改范围

- `src/api/legal/*`（新增）
- `src/components/common/AgreementDialog.vue`
- `src/pages/auth/login.vue`
- `src/pages/auth/register.vue`
- `src/hooks/auth/*`
- `src/i18n/messages/*/agreements.ts`
- `mock-server/src/services/legal.service.ts`（新增）
- `mock-server/src/services/auth.service.ts`
- `mock-server/src/routes/legal.routes.ts`（新增）
- `mock-server/src/types/database.ts`
- `mock-server/db.json`

### 页面规则

- 登录 / 注册页继续用 checkbox 控制提交；未勾选不调用登录 / 注册 API。
- `AgreementDialog` 打开时按需调用 `GET /api/legal/documents/:type`，不预加载。
- `agreements.ts` 只保留弹窗标题、关闭按钮、加载态、错误态等 UI 文案，不存正式协议正文。
- 若 legal API 暂时失败，弹窗显示错误态；不影响未打开弹窗时的页面首屏。

### 验收标准

- `legal_documents` 和 `user_agreement_acceptances` 已加入 mock db 和类型。
- 登录 / 注册成功后，mock 后端会 upsert 当前 active `terms` / `privacy` 确认记录。
- `AgreementDialog` 正文来自 legal API，不再从 i18n 拼三段协议正文。
- 前端不传协议版本，也不处理协议更新拦截。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run build:h5` 通过。

## Phase 5：按最终态重写 account / membership / entitlement

### 目标

在 profile schema、auth、events 稳定后，按最终态重写 account。此阶段不再围绕旧 account 页面字段妥协。

目标是固定四个边界：

- `users`：登录账户主体。
- `profiles`：被撮合的相亲资料主体。
- `memberships`：会员订阅与权益。
- `private_introduction_requests`：建立私人连接的受控申请。

### 推荐数据库结构

完整最终结构见 `docs/final-database-schema.md`。

目标集合：

```text
users
auth_identities
user_preferences
user_onboarding_states
membership_plans
user_memberships
membership_entitlements
user_entitlement_balances
profiles
profile_photos
profile_prompts
profile_ownerships
profile_internal_records
profile_verifications
profile_contact_methods
profile_visibility_settings
favorite_profiles
events
event_agenda_items
event_registrations
private_introduction_requests
private_introduction_rooms
private_introduction_room_messages
advisor_follow_ups
```

职责划分：

| Collection | 职责 |
| --- | --- |
| `users` | 登录账户主体，只描述账户身份。 |
| `auth_identities` | 登录方式，例如 email、phone、wechat、google。 |
| `user_preferences` | 账户偏好与开关，使用 code/value 存储。 |
| `user_onboarding_states` | 注册后的引导状态。 |
| `membership_plans` | 平台可售卖或可配置的会员套餐定义。 |
| `user_memberships` | 用户当前或历史会员订阅记录。 |
| `membership_entitlements` | 套餐权益定义，例如私人介绍额度。 |
| `user_entitlement_balances` | 用户权益余额，例如本月剩余介绍次数。 |
| `profiles` | 被撮合的相亲资料主体。 |
| `profile_photos` | 资料照片。 |
| `profile_prompts` | 资料问答。 |
| `profile_ownerships` | 用户与资料的关系，例如本人、父母、顾问。 |
| `profile_internal_records` | 后台和顾问可见的敏感运营资料。 |
| `profile_verifications` | 实名、学历、身份、顾问审核等认证状态。 |
| `profile_contact_methods` | 受控联系方式。 |
| `profile_visibility_settings` | profile 字段可见性配置。 |
| `favorite_profiles` | 用户收藏关系。 |
| `events` | 活动主体。 |
| `event_agenda_items` | 活动流程项。 |
| `event_registrations` | 用户活动报名关系。 |
| `private_introduction_requests` | 私人介绍申请。 |
| `private_introduction_rooms` | 双方确认后的平台内私密沟通空间。 |
| `private_introduction_room_messages` | 私人介绍 room 消息；若暂不做聊天可延后实现。 |
| `advisor_follow_ups` | 顾问跟进记录。 |

### 关键表

`users`：

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

`auth_identities`：

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

`user_preferences`：

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

`profile_ownerships`：

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

`membership_plans`：

```ts
interface MembershipPlanRecord {
  id: string
  tier: 'free' | 'silver' | 'gold' | 'diamond'
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

`membership_entitlements`：

```ts
interface MembershipEntitlementRecord {
  id: string
  planId: string
  code: 'private_introduction' | 'event_priority' | 'advisor_review' | 'profile_detail_access'
  quota: number
  period: 'none' | 'monthly' | 'quarterly' | 'yearly'
  createdAt: string
  updatedAt: string
}
```

`user_memberships`：

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

`user_entitlement_balances`：

```ts
interface UserEntitlementBalanceRecord {
  id: string
  userId: string
  entitlementCode: 'private_introduction' | 'event_priority' | 'advisor_review' | 'profile_detail_access'
  period: string
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  resetAt: string
  createdAt: string
  updatedAt: string
}
```

`advisor_follow_ups`：

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

### 应删除或替换的旧结构

- `users.role`：迁移到 `profile_ownerships.role`。
- `users.profileCompletion`：迁移到 profile 完成度计算或 `profile_completion_snapshots`。
- `users.displayName`：统一为 `accountName`，不要新增 `users.displayName`。
- `profiles.displayName`：从数据库移除，profile 展示名由后端根据 profile id 派生并返回 DTO。
- `memberships`：替换为 `membership_plans` + `user_memberships` + `membership_entitlements` + `user_entitlement_balances`。
- `privacy_settings.title/desc`：不要在数据库存页面文案，改为 `user_preferences.code/value`。
- `message_threads`：如果没有正式 mediated room 设计，先删除或暂停。
- account API 中 `realName / nickName` 这类临时字段应重命名。

### Account API 目标

建议拆分，不再用一个过大的 overview 承载全部页面：

```text
GET /api/account/me
GET /api/account/membership
GET /api/account/profiles
GET /api/account/favorites
GET /api/account/events
GET /api/account/private-introductions
GET /api/account/private-introduction-rooms
GET /api/account/settings
```

如果仍需聚合接口，可以作为页面优化层：

```text
GET /api/account/dashboard
```

但 dashboard 不应成为数据库结构的来源。

Contract 对齐要求：

| Endpoint / Page | Source of truth | API DTO | PageData / ViewModel |
| --- | --- | --- | --- |
| `GET /api/account/me` | `users`, `user_onboarding_states` | `AccountMeDTO` | `AccountShellPageData` |
| `GET /api/account/dashboard` | `users`, `user_onboarding_states`, `profile_ownerships`, `user_memberships`, `user_entitlement_balances`, `favorite_profiles` count, `event_registrations`, `private_introduction_requests`, user-visible `advisor_follow_ups` | `AccountDashboardDTO` | `AccountHomePageData` |
| `GET /api/account/profiles` | `profile_ownerships`, `profile_verifications`, derived profile identity | `AccountProfilesDTO` | `AccountProfilesPageData` |
| `GET /api/account/profiles/:profileId` | `profiles`, `profile_photos`, `profile_prompts`, `profile_visibility_settings`, `profile_verifications`, `profile_ownerships` | `AccountProfileDetailDTO` | `AccountProfileDetailPageData` |
| `GET /api/account/membership` | `membership_plans`, `user_memberships`, `membership_entitlements`, `user_entitlement_balances` | `AccountMembershipDTO`, `AccountEntitlementBalanceDTO[]`, `MembershipPlanDTO[]` | `AccountMembershipPageData` |
| `GET /api/account/favorites` | `favorite_profiles`, derived profile identity | `FavoriteProfileSummaryDTO[]` | `AccountRelationshipPageData` |
| `GET /api/account/events` | `event_registrations`, derived event summary | `AccountEventRegistrationDTO[]` | `AccountEventsPageData` |
| `GET /api/account/private-introductions` | `private_introduction_requests`, derived profile identity | `AccountIntroductionSummaryDTO[]` | `AccountRelationshipPageData` |
| `GET /api/account/private-introduction-rooms` | `private_introduction_rooms`, latest `private_introduction_room_messages`, derived profile identity | `AccountPrivateIntroductionRoomDTO[]` | Phase 5.6 独立消息中心 |
| `GET /api/account/settings` | `users`, `auth_identities`, `user_preferences` | `AccountSettingsDTO` | `AccountSettingsPageData` |

补充规则：

- `profile_detail_access` entitlement 表示付费 viewer 查看他人 profile detail 的字段开放层级，不表示提升自己 profile 曝光。
- `favorite_profiles` 只保存收藏关系和时间戳；当前阶段不做私密备注，避免为 `note` 增加额外写接口。
- `AccountPrivateIntroductionRoomDTO` 不返回 `unreadCount`，直到引入 read receipt source of truth；前端如需提示可先使用本地派生状态。
- agreement acceptance remains backend/audit data; account settings may expose current legal-document entry points, but does not display acceptance history by default.
- dashboard 只返回 `favoriteCount`，不返回完整 favorites 列表；收藏明细归 relationship。
- dashboard 只返回摘要切片：`upcomingEvents` 与 `recentIntroductions`；完整列表分别归 events 与 relationship。
- events 页面当前只负责“我的报名”；可参加活动入口保留在公开 events 链路。
- settings 页面组合 preferences 与 legal document API；协议确认历史仍只作为后端审计数据保存。
- `advisor_follow_ups` 默认是内部记录；只有 `visibility = 'user_visible'` 的记录可进入用户端 dashboard。

### 前端修改范围

- `src/api/account/*`
- `src/hooks/account/*`
- `src/pages/account/*`
- `src/components/account/*`
- `src/mappers/account-*`
- `src/i18n/messages/*/account-center.ts`
- `mock-server/src/services/account.service.ts`
- `mock-server/src/routes/account.routes.ts`
- `mock-server/src/types/database.ts`
- `mock-server/db.json`

### Account 页面建议

account center 应按用户任务收敛为 6 个稳定页面：

- `/pages/account/index`：首页，按 onboarding 阶段展示下一步引导、关系动态、资料状态、剩余额度和近期活动。
- `/pages/account/relationship`：关系进展，内部以 tab 串联收藏和私人介绍；受控沟通不再挂在 account relationship 下。
- `/pages/account/profiles`：资料，展示 self/family 管理关系和认证摘要；字段可见性进入单份资料详情页。
- `/pages/account/events`：活动，展示我的报名、候补和历史活动。
- `/pages/account/membership`：会员，展示当前套餐、权益、额度、套餐比较和升级入口。
- `/pages/account/settings`：设置，展示账户基础信息、登录与安全、通知、服务偏好、隐私授权、协议入口和账户操作。

### 验收标准

- account 不再依赖旧的 profile 临时字段。
- membership 权益从独立表或常量映射读取。
- private introduction quota 不再临时从 membership tier 即时推导，至少有清晰余额模型。
- profile ownership 支持一个用户管理多个 profile。
- privacy/preferences 不在 DB 保存页面文案。
- account dashboard 不把页面 view model 当成数据库模型。
- account settings 不展示协议确认摘要；agreement acceptance 仅保留为后端审计数据。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run build:h5` 通过。

## Phase 5.4：引入 profile 归档生命周期

### 目标

在补齐账户中心写操作之前，先把 profile 退出业务流的全局语义定清楚，避免“删除资料”只在 account 页面局部实现，却让目录、详情、推荐、收藏和私人介绍各自猜测规则。

### 明确范围

本阶段要做：

- `profiles` 增加仅供后端使用的 `archivedAt?: string`。
- 统一 archived profile 在 public directory、public detail、推荐和私人介绍创建中的过滤规则。
- 统一历史链路对 archived profile 的保留规则。
- 明确 archived profile 在普通 owner-side account 页面也不再返回；历史保留只属于后端审计与既有历史链路。
- 定义 account 侧 archive API 与 archive 前置条件。

本阶段不做：

- 不做 account 页面主字段编辑 UI。
- 不做 profile 主字段、联系方式、照片、prompts 的写入。
- 不把 archive 误做成物理删除。

### 生命周期规则

- `archivedAt = null`：正常业务 profile。
- `archivedAt != null`：已退出正常业务流。
- `archivedAt` 是单独的后端生命周期标记，不并入 `profileStatus`；`profileStatus` 继续描述业务展示状态，archive 负责表示该资料是否还参与正常业务。
- archived profile 不再参与：
  - self / family directory
  - 新推荐
  - 新 private introduction 申请
  - 其他新增业务动作
- archived profile 仍保留：
  - 历史 favorite
  - 历史 private introduction
  - 已存在 room
  - verification / audit / ownership 等历史记录
- public detail 对 archived profile 不再作为普通可浏览资料返回。
- 普通 account profiles / profile detail 不再返回 archived profile；用户侧“删除资料”后，该资料应从正常管理入口消失。
- 若未来需要“已删除资料”历史，必须提供单独、显式的历史入口；不能混入正常资料列表。

### API 目标

```text
POST /api/account/profiles/:profileId/archive
```

| Endpoint | Source of truth | Payload | Response |
| --- | --- | --- | --- |
| `POST /api/account/profiles/:profileId/archive` | `profiles`, `profile_ownerships`, active relation checks | - | `AccountProfileArchiveResultDTO` |

### 归档规则

- 只有 `owner` 可以归档；`manager` / `viewer` 不可归档。
- 有进行中的正式关系链路时不允许归档；至少包括未终结的 private introduction / room，后续若 event 或顾问流程需要阻塞，也应在这里统一扩展。
- 归档只写 `profiles.archivedAt`，不物理删除任何历史集合。
- 前端可以显示 `删除资料`，但确认文案必须说明：资料将退出匹配和公开展示，历史记录仍保留。

### 验收标准

- archived profile 不再出现在 public directory、推荐或新的 private introduction 可选目标中。
- archived profile 的历史 favorite / introduction / room 仍可追溯。
- 普通 owner-side account 页面不再返回已归档资料。
- active formal flow 存在时 archive 被明确拒绝。
- 不产生孤儿记录，不通过物理删除破坏历史链路。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run build:h5` 通过。

## Phase 5.5：补齐 account center 写操作

### 目标

在 Phase 5 已完成的只读账户中心上补齐第一批真实写操作，让页面职责和用户心智真正闭环：

- 用户可以在统一资料详情页维护自己有权限管理的 profile。
- 用户可以在资料列表页新建一份由自己管理的 profile。
- 用户可以在统一资料详情页将自己有权限管理且允许归档的 profile 退出正常业务流。
- 用户可以在同一页调整该 profile 的字段可见性。
- 用户可以在设置页维护账户基础信息和账户级偏好。
- 用户可以在会员页发起会员等级变更，并让当前会员与权益余额同步刷新。

这一阶段只补齐 **account center 内已经出现的操作入口**，不扩展为新的产品线。

### 明确范围

本阶段要做：

- profile 创建。
- profile main fields 更新。
- profile contact methods 更新。
- profile photos 更新。
- profile prompts 更新。
- profile archive 入口接入。
- profile visibility settings 更新。
- account basic fields 更新。
- account preferences 更新。
- membership upgrade mock flow。

本阶段不做：

- auth identities 管理，例如改邮箱、改手机号、改密码。
- 正式支付、订单、退款、续费账单。
- 顾问后台审批流。
- 私人介绍 room 发消息。
- event 报名流程重写。
- profile verification 的用户侧提交和审核。

### 页面职责

- `/pages/account/profile-detail`
  - 仍是 self / family 共用的统一资料详情页。
  - 从只读档案升级为“可编辑档案”。
  - 每个 section 对应一组可编辑字段。
  - 字段是否可编辑由 `ownership.permission` 决定；`viewer` 不可编辑。
  - 联系方式 section 在同页维护，但写入 `profile_contact_methods`，不回填 `profiles` 主表。
  - 照片与 prompts 在同页维护，但分别写入 `profile_photos` / `profile_prompts`。
  - profile visibility 在同页维护，不再散落到 settings。
  - detail 页提供 `编辑资料` 与面向用户的 `删除资料` 入口；后端执行 Phase 5.4 已定义的 archive 流程，属于危险操作，必须二次确认。

- `/pages/account/profiles`
  - 是用户管理资料集合的入口。
  - 提供 `新建资料` 主操作。
  - 新建时用户主动选择“这份资料属于谁”；注册时 onboarding 选择只能作为默认值，不直接替代本次 ownership 选择。
  - 列表项进入统一 profile detail 继续维护。

- `/pages/account/settings`
  - 只维护账户级信息和偏好。
  - 本阶段支持更新 `accountName`、`avatarUrl` 与 `user_preferences`。
  - `preferredLocale` 继续由语言链路维护，不在 settings 里提供手动写入口。

- `/pages/account/membership`
  - 展示当前套餐、额度和下一可升级套餐。
  - 支持对更高套餐发起升级动作。
  - mock 阶段可直接完成等级切换；正式产品以后替换为支付 / 顾问流程，不改变页面 contract。

### API 目标

```text
POST  /api/account/profiles
POST /api/account/profiles/:profileId
POST /api/account/profiles/:profileId/contact-methods
POST  /api/account/profiles/:profileId/photos
POST /api/account/profiles/:profileId/photos/:photoId
DELETE /api/account/profiles/:profileId/photos/:photoId
POST  /api/account/profiles/:profileId/prompts
POST /api/account/profiles/:profileId/prompts/:promptId
DELETE /api/account/profiles/:profileId/prompts/:promptId
POST  /api/account/profiles/:profileId/archive
POST /api/account/profiles/:profileId/visibility
POST /api/account/me
POST /api/account/settings/preferences
POST  /api/account/membership/upgrade
```

| Endpoint | Source of truth | Payload | Response |
| --- | --- | --- | --- |
| `POST /api/account/profiles` | `profiles`, `profile_ownerships` | `AccountManagedProfileCreatePayload` | `AccountProfileDetailDTO` |
| `POST /api/account/profiles/:profileId` | `profiles`, `profile_ownerships` | `AccountProfileUpdatePayload` | `AccountProfileDetailDTO` |
| `POST /api/account/profiles/:profileId/contact-methods` | `profile_contact_methods`, `profile_ownerships` | `AccountProfileContactMethodsUpdatePayload` | `AccountProfileDetailDTO` |
| photo endpoints | `profile_photos`, `profile_ownerships` | `ProfilePhotoMutationPayload` | `AccountProfileDetailDTO` |
| prompt endpoints | `profile_prompts`, `profile_ownerships` | `ProfilePromptMutationPayload` | `AccountProfileDetailDTO` |
| `POST /api/account/profiles/:profileId/archive` | `profiles`, `profile_ownerships` | - | `AccountProfileArchiveResultDTO` |
| `POST /api/account/profiles/:profileId/visibility` | `profile_visibility_settings`, `profile_ownerships` | `AccountProfileVisibilityUpdatePayload` | `AccountProfileVisibilityDTO[]` |
| `POST /api/account/me` | `users` | `AccountMeUpdatePayload` | `AccountMeDTO` |
| `POST /api/account/settings/preferences` | `user_preferences` | `AccountPreferenceUpdatePayload` | `AccountSettingsDTO` |
| `POST /api/account/membership/upgrade` | `membership_plans`, `user_memberships`, `membership_entitlements`, `user_entitlement_balances` | `AccountMembershipUpgradePayload` | `AccountMembershipUpgradeResultDTO` |

### 写入规则

profile：

- 新建时必须显式选择 ownership 类型；注册时 onboarding 选择仅可作为默认项，不可静默决定后续新建资料的归属。
- 新建后自动创建当前用户的 `owner` ownership，并返回统一 detail DTO。
- 只允许 `owner` / `manager` 修改；`viewer` 只能读。
- archive 权限和阻塞条件沿用 Phase 5.4；5.5 只接入页面动作，不重新定义生命周期规则。
- `POST /api/account/profiles/:profileId` 只允许更新 profile 主表字段，不允许顺手写 contact / internal / verification。
- 联系方式由独立接口更新 `profile_contact_methods`；同页展示不代表同表写入。
- 照片与 prompts 由独立接口更新 `profile_photos` / `profile_prompts`；同页展示不代表同表写入。
- 普通 owner-side profile DTO 不返回 archived profile；archive 不混入 `profileStatus`。
- localized 字段仍遵守当前 locale slot 写入规则。
- `profileStatus` 生命周期字段不可由普通用户直接改成 `open` 或 `review`；若需状态流转，留给顾问审核或后续独立流程。
- `isPriorityProfile` 不是用户可写字段。

visibility：

- 只允许编辑未被 `lockedByAdvisor` 锁定的字段。
- `fieldCode` 必须来自 `ProfileFieldCode`。
- 只更新传入项；未传字段保持原值。
- profile detail 返回的 visibility 必须是最新结果，避免页面刷新后回退。

preferences：

- `code` 必须来自 `AccountPreferenceCode`。
- 本阶段支持服务偏好、通知与隐私授权相关的稳定设置项：`preferred_city`、`preferred_contact_channel`、`advisor_contact_enabled`、`family_assist_enabled`、`introduction_updates_enabled`、`event_reminders_enabled`、`service_announcements_enabled`、`marketing_emails_enabled`、`analytics_consent_enabled`。
- 设置页不保存文案，只保存 code/value。

account me：

- 本阶段只允许更新 `accountName` 和 `avatarUrl`。
- `preferredLocale` 由语言切换链路维护，不在 settings form 里手动提交。
- 不通过该接口修改 `status`、onboarding 或 auth identity。

membership：

- 只允许升级到比当前套餐更高的 active plan。
- mock 阶段升级成功后：
  - 关闭旧 active `user_memberships`
  - 创建新 active `user_memberships`
  - 按目标套餐重建 `user_entitlement_balances`
- 不在 `users` 上写 tier。
- 正式支付未接入前，接口语义仍保留为“升级申请 / 升级结果”，避免未来换实现时前端 contract 再改一次。

### 前端改动建议

- `src/api/account/*`
- `src/hooks/account/use-account-profile-detail.ts`
- `src/hooks/account/use-account-profiles.ts`
- `src/hooks/account/use-account-settings.ts`
- `src/hooks/account/use-account-membership.ts`
- `src/pages/account/profile-detail.vue`
- `src/pages/account/profiles.vue`
- `src/pages/account/settings.vue`
- `src/pages/account/membership.vue`
- `src/mappers/account-profile-detail.ts`
- `src/mappers/account-settings.ts`
- `src/mappers/account-membership.ts`
- `src/i18n/messages/*/account-center.ts`

### 验收标准

- 用户可以从资料列表页新建 profile，并进入统一 detail 页继续维护。
- 用户新建 profile 时必须明确选择资料归属；onboarding 默认值不会覆盖本次选择。
- 用户在拥有 `owner` / `manager` 权限时，可以修改统一 profile detail 页的可编辑字段并在刷新后保持。
- 用户在拥有 `owner` / `manager` 权限时，可以维护联系方式 section，且写入后刷新仍保持。
- 用户在拥有 `owner` / `manager` 权限时，可以维护照片和 prompts，且写入后刷新仍保持。
- 用户在拥有 `owner` 权限且 profile 满足 archive 规则时，可以在 detail 页执行删除入口；profile 退出正常业务流但历史链路保留。
- `viewer` 无法提交 profile 更新。
- visibility 仅在该 profile 下生效，且 advisor 锁定字段不可改。
- settings 页修改偏好后刷新仍保持。
- settings 页修改 `accountName` / `avatarUrl` 后刷新仍保持。
- membership 升级后当前套餐与 entitlement balances 同步变化。
- 写接口都返回更新后的 DTO，前端不需要本地猜测新状态。
- 不新增 account 页面专属数据库字段。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run check:i18n` 通过。
- `npm run build:h5` 通过。

## Phase 5.6：设计独立消息中心

### 目标

把消息从 account relationship 中彻底拆出，形成独立产品模块，用于承接：

- 平台通知。
- 私人介绍进展通知。
- 双方确认后的受控沟通。

Phase 5 只保留独立占位页和入口，不提前把消息链路重新塞回 account center。

### 明确范围

本阶段要做：

- 设计 `/pages/messages/index` 与后续 room detail 页面职责。
- 明确通知流和受控沟通流是否同页分区、同页 tab，或拆成不同页面。
- 读取 `GET /api/account/private-introduction-rooms` 与 room message DTO，建立消息中心自己的 PageData。
- 设计消息未读、已读 source of truth；在引入正式 read receipt 前，不返回伪造 `unreadCount`。
- 保留 room messages 的 cursor 分页。

本阶段不做：

- 不把 room 列表重新挂回 `/pages/account/relationship`。
- 不提前把 profile 跨模块跳转闭环塞进消息中心；这部分留到 Phase 6 一起收口。

### 验收标准

- 消息中心是独立入口，不再依赖 relationship 页面承载 room。
- 平台通知与受控沟通的边界明确。
- room list、room detail、message page model 与 API DTO 对齐。
- 未读状态有明确 source of truth 或明确延期，不使用无来源的展示字段。
- `npm run type-check` 通过。
- `npm run check:i18n` 通过。
- `npm run build:h5` 通过。

## Phase 6：完成 profile / event / account / private introduction 联动

### 目标

把平台中介撮合闭环串起来。

核心闭环：

```text
注册登录
-> 创建或管理 profile
-> 浏览 profile
-> 收藏或参加 event
-> 申请 private introduction
-> 对方接受或拒绝
-> 进入 platform-mediated room 或 advisor follow-up
-> account 中展示状态
```

### 需要补齐的联动

profile 与 account：

- profile ownership 决定用户是否拥有资料。
- account profiles 页面展示用户管理的资料。
- detail 不应该允许用户对自己的 profile 申请 private introduction。

event 与 account：

- account events 展示报名状态。
- event detail 根据用户报名状态展示 CTA。
- 会员等级可影响活动报名优先级。

profile 与 event：

- event 推荐相关 profile。
- profile detail 展示可线下了解的活动入口。
- event detail 展示适合的 profile 标签或参与条件。

private introduction 与 account：

- account private introductions 展示 requested、accepted、declined、cooldown、quota exhausted。
- debug 页面保留接受/拒绝工具，但生产页面不暴露。

### 后端建议

新增或完善：

```text
GET /api/account/private-introductions
POST /api/profiles/self/:id/private-introduction
POST /api/profiles/family/:id/private-introduction
GET /api/debug/private-introductions
POST /api/debug/private-introductions/:id/accept
POST /api/debug/private-introductions/:id/decline
```

说明：当前 profile API 已按 self/family 拆分，私人介绍申请也沿用 detail 所在入口；`:id` 就是 target profile id，不在 body 里重复传 `targetProfileId`。

后续 room：

```text
GET /api/account/private-introduction-rooms
GET /api/private-introduction-rooms/:id?before=&limit=
POST /api/private-introduction-rooms/:id/messages
```

room messages 使用 cursor 分页，可用于顾问代发说明、系统通知和受控沟通记录；即使不开放自由聊天，也保留该集合的最终形态。

### 验收标准

- 申请私人介绍后，account 能看到对应状态。
- debug 接受/拒绝后，detail 和 account 状态同步。
- quota 正确扣减。
- 同一 profile 不能重复申请。
- 拒绝后 cooldown 生效。
- 未登录不能申请。
- free/silver/gold/diamond 权益差异明确。

## 建议提交拆分

### Phase 1

```text
refactor(account): freeze account overview dependencies
refactor(account): render account placeholder states
```

### Phase 2

```text
refactor(profiles): remove legacy profile fields
refactor(profiles): move contact methods out of profiles
docs(database): sync final profile schema
```

### Phase 3

```text
refactor(auth): clarify session and mock user context
refactor(auth): separate onboarding from user identity
refactor(mock-server): tighten account identity fields
```

### Phase 4

```text
refactor(events): expand event api fields
refactor(events): rebuild event directory view
feat(events): add event registration flow
```

### Phase 4.5

```text
feat(legal): add agreement documents api
refactor(auth): record agreement acceptance on auth success
refactor(common): load agreement dialog content from api
```

### Phase 5

```text
refactor(account): split account api modules
refactor(account): rebuild membership model
refactor(account): use profile ownerships
```

### Phase 5.5

```text
feat(account): add managed profile creation
feat(account): add managed profile editing
feat(account): add managed profile media editing
feat(account): add profile visibility controls
feat(account): add account basics updates
feat(account): add preference updates
feat(account): add membership upgrade flow
```

### Phase 5.6

```text
feat(messages): add standalone message center
feat(messages): connect mediated rooms
```

### Phase 6

```text
feat(profiles): sync private introductions with account
feat(events): connect registrations to account
feat(debug): support introduction state testing
```

## 给接力 AI 的执行提示

```text
你正在维护 Vue3 + uni-app 项目 cupid-match。
请严格遵守 page -> hook -> api -> mock-server 调用链。
当前优先执行 docs/implementation-roadmap.md。
先冻结 account 页面和 overview 依赖，让它不再阻塞 profile schema 清理。
不要为了 account 临时展示保留 profile 旧字段。
清理 profile 字段后，再修正 auth / registration / onboarding 模型。
auth 基线是 38de9b60e69afa5f5dc959e6a816a81f1d082110，但该提交不是 auth 完成态。
不要把 self / family / parent 作为 users 的永久身份。
不要在 users 中保存 role、profileCompletion、会员 tier、profile 展示字段。
API 到前端尽量返回扁平结构。
mock-server/db.json 用扁平结构模拟未来结构化数据库，不要在 profile 内做页面分组。
每个阶段结束后运行 npm run type-check、npm run mock:build；涉及 i18n 运行 npm run check:i18n；涉及 H5 页面运行 npm run build:h5。
不要为了兼容保留旧字段，除非当前阶段明确要求延后处理。
```

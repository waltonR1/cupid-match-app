# Implementation Roadmap

## 背景判断

当前项目已经完成了 self detail、family detail、profile directory 的一轮收紧，`account-profile-data-model-proposal.md` 也明确了未来账户、资料、会员、私人介绍之间的边界。

现阶段不建议继续优先清理 `profiles` 主表旧字段。原因是：

- `account` 还没有稳定重写，部分旧 profile 字段仍被 account 摘要临时使用。
- 登录和注册仍是入口链路，但当前注册模型明显偏临时，继续往后做会放大返工。
- `events` 页面和 API 字段链路尚未完整整理，活动是平台中介撮合的重要入口。
- profile、event、account、private introduction 的联动需要等 account 与 events 稳定后再做。

因此推荐执行顺序：

```text
Phase 1: 重做登录与注册
Phase 2: 完成 events 页面与 API 字段链路
Phase 3: 完全重写 account / membership / user 数据模型
Phase 4: 完成 profile / event / account / private introduction 联动
Phase 5: 最后清理 profile 主表旧字段
```

每一阶段都应保持项目现有调用链：

```text
page -> hook -> api -> mock-server
```

## 全局约束

- 不引入新依赖，除非有明确必要。
- 前端页面不直接调用 `@/api/shared/http.ts`。
- API 到前端尽量保持扁平结构。
- 后端不返回 i18n key，后端只返回 code 或本地化后的文案。
- 数据库 `mock-server/db.json` 用扁平结构模拟未来结构化数据库，不在 profile 内部做页面分组。
- 文档描述当前状态，不写临时注释或过程日志。
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

## Phase 1：重做登录与注册

### 目标

把登录、注册从“临时 mock 表单”调整为可长期承载账户体系的入口。

当前注册问题很大，优先级最高。注册不应一次性要求大量 profile 信息，也不应直接把 `self / parent` 作为用户主体固定属性。

### 推荐产品流程

注册只完成账户创建，不完成 profile 创建。

推荐流程：

```text
1. 选择身份路径
   - 我为自己使用
   - 我为家人了解

2. 创建账户
   - email 或 phone 或 wechat
   - password
   - accountName
   - city
   - preferredLocale

3. 创建默认权益
   - free membership
   - private introduction quota = 0 或 1

4. 建立初始 onboarding 状态
   - nextStep = create_profile
   - profileId 可为空

5. 注册成功后进入对应 onboarding 页面
```

### 数据库建议

先不要一步到位实现所有 account proposal 中的表，但 Phase 1 应至少调整方向：

```text
users
auth_identities
memberships
profile_ownerships
```

建议字段：

```ts
interface UserRecord {
  id: string
  accountName: string
  avatarUrl: string
  city: LocalizedText
  preferredLocale: 'zh' | 'fr' | 'en'
  status: 'active' | 'paused' | 'banned'
  onboardingPath: 'self' | 'family'
  onboardingStep: 'create_profile' | 'review_profile' | 'browse'
  createdAt: string
  updatedAt: string
}
```

说明：

- `onboardingPath` 可以临时保留，用于注册后跳转。
- 不要再把 `role` 作为用户永久身份。
- 不要在 `users` 放 `profileCompletion`。

认证表建议：

```ts
interface AuthIdentityRecord {
  id: string
  userId: string
  provider: 'email' | 'phone' | 'wechat'
  identifier: string
  password: string
  verifiedAt?: string
  createdAt: string
}
```

mock 阶段可继续明文 `password`，但字段名与结构要为未来 `passwordHash` 留空间。

### 后端修改范围

- `mock-server/src/types/database.ts`
- `mock-server/src/services/auth.service.ts`
- `mock-server/src/routes/auth.routes.ts`
- `mock-server/db.json`
- `docs/project-database-fields.md`
- `docs/mock-server-guide.md`

注册接口建议：

```text
POST /api/auth/register
```

payload：

```ts
interface RegisterPayload {
  path: 'self' | 'family'
  provider: 'email' | 'phone' | 'wechat'
  identifier: string
  password: string
  accountName: string
  city: string
  preferredLocale: 'zh' | 'fr' | 'en'
}
```

response：

```ts
interface AuthSession {
  token: string
  user: {
    id: string
    accountName: string
    avatarUrl: string
    onboardingPath: 'self' | 'family'
    onboardingStep: 'create_profile' | 'review_profile' | 'browse'
  }
}
```

登录接口建议：

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

### 前端修改范围

- `src/api/auth/auth.types.ts`
- `src/api/auth/auth.ts`
- `src/stores/modules/auth.ts`
- `src/pages/auth/register.vue`
- `src/pages/auth/login.vue`
- `src/i18n/messages/*/register.ts`
- `src/i18n/messages/*/login.ts`

注册页应简化为账户入口，不要像资料表单：

- 账号名
- 登录方式
- 登录标识
- 密码
- 城市
- 语言偏好
- 使用路径

登录后根据 session 内的 onboarding 信息跳转。

### 验收标准

- 新用户注册后写入 `users`、`auth_identities`、`memberships`。
- 注册不再创建 profile，也不写 profile 字段。
- 登录后 `authStore.user.id` 正常存在，HTTP 自动带 `X-User-Id`。
- 未登录访问 detail 仍走 guest 权限。
- 已登录 free 用户访问 detail 能走 free 权限。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run check:i18n` 通过。

## Phase 2：完成 events 页面与 API 字段链路

### 目标

把 events 从简单活动列表，升级为平台中介撮合的重要入口。

events 应表达：

- 活动定位
- 适合人群
- 顾问筛选感
- 报名状态
- 席位节奏
- 和 profile / membership 的关系

### 数据库建议

当前 `events` 字段偏少，可扩展但保持扁平。

建议 `EventRecord`：

```ts
interface EventRecord {
  id: string
  slug: string
  status: 'open' | 'waitlist' | 'closed' | 'completed'
  visibility: 'public' | 'registered' | 'member'
  title: LocalizedText
  summary: LocalizedText
  city: LocalizedText
  venue: LocalizedText
  addressVisibility: 'public' | 'registered_only'
  date: string
  startTime: string
  endTime: string
  format: LocalizedText
  audience: LocalizedText
  relationshipFocus: LocalizedText[]
  languageCodes: string[]
  capacity: number
  registeredCount: number
  waitlistCount: number
  memberOnly: boolean
  advisorNote: LocalizedText
  coverImageUrl: string
  agenda: EventAgendaItem[]
  createdAt: string
  updatedAt: string
}
```

保留 `user_registrations`，但建议字段增强：

```ts
interface UserRegistrationRecord {
  id: string
  userId: string
  eventId: string
  status: 'confirmed' | 'waitlist' | 'cancelled' | 'attended'
  requestedAt: string
  confirmedAt?: string
  note: LocalizedText
}
```

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
  memberOnly?: string
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
  agenda: EventAgendaItem[]
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
- `src/mappers` 下可新增 event directory/detail mapper
- `src/i18n/messages/*/events.ts`

### 页面建议

events index：

- 顶部展示 curated events 语气
- 筛选：城市、月份、开放状态、会员专属
- 列表卡片展示：
  - title
  - date/time
  - city/venue
  - format
  - audience
  - remaining seats / waitlist
  - memberOnly badge

event detail：

- 活动基本信息
- 顾问说明
- 适合人群
- 活动流程
- 报名状态
- 登录/会员限制 CTA

### 验收标准

- events index 不再只展示简单 mock 字段。
- event detail 能根据登录状态返回报名状态。
- 已登录用户可以报名或进入 waitlist。
- account 后续可读取用户报名记录。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run build:h5` 通过。

## Phase 3：完全重写 account / membership

### 目标

在登录注册和 events 稳定后，重写 account。此时可以正式完善数据库，不再围绕旧 account 页面妥协。

### 推荐数据库结构

参考 `docs/account-profile-data-model-proposal.md`，最终目标：

```text
users
auth_identities
user_preferences
membership_plans
user_memberships
membership_entitlements
user_entitlement_balances
profiles
profile_ownerships
profile_verifications
favorite_profiles
event_registrations
private_introduction_requests
private_introduction_rooms
advisor_follow_ups
```

### 应删除或替换的旧结构

- `users.role`：迁移到 `profile_ownerships.role`。
- `users.profileCompletion`：迁移到 profile 完成度计算或 `profile_completion_snapshots`。
- `privacy_settings.title/desc`：不要在数据库存页面文案。
- `message_threads`：如果没有正式 internal room 设计，先删除或暂停。
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
GET /api/account/preferences
```

如果仍需聚合接口，可以作为页面优化层：

```text
GET /api/account/dashboard
```

但 dashboard 不应成为数据库结构的来源。

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

account 应拆成稳定模块：

- 账户资料：账户名、城市、语言、头像。
- 我的资料：self/family 管理关系。
- 我的会员：当前套餐、额度、权益。
- 我的活动：报名、候补、历史活动。
- 我的私人介绍：申请状态、额度、冷却。
- 顾问跟进：后续可做。

### 验收标准

- account 不再依赖旧的 profile 临时字段。
- membership 权益从独立表或常量映射读取。
- private introduction quota 不再临时从 membership tier 即时推导，至少有清晰余额模型。
- profile ownership 支持一个用户管理多个 profile。
- `npm run type-check` 通过。
- `npm run mock:build` 通过。
- `npm run build:h5` 通过。

## Phase 4：完成 profile / event / account / private introduction 联动

### 目标

把平台中介撮合闭环串起来。

核心闭环：

```text
注册登录
-> 浏览 profile
-> 收藏或参加 event
-> 申请 private introduction
-> 对方接受或拒绝
-> 进入 platform-mediated room 或 advisor follow-up
-> account 中展示状态
```

### 需要补齐的联动

#### profile 与 account

- profile ownership 决定用户是否拥有资料。
- account profiles 页面展示用户管理的资料。
- detail 不应该允许用户对自己的 profile 申请 private introduction。

#### event 与 account

- account events 展示报名状态。
- event detail 根据用户报名状态展示 CTA。
- 会员等级可影响活动报名优先级。

#### profile 与 event

可后续加入：

- event 推荐相关 profile。
- profile detail 展示可线下了解的活动入口。
- event detail 展示适合的 profile 标签或参与条件。

#### private introduction 与 account

- account private introductions 展示：
  - requested
  - accepted
  - declined
  - cooldown
  - quota exhausted
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

后续 room：

```text
GET /api/account/private-introduction-rooms
GET /api/private-introduction-rooms/:id
POST /api/private-introduction-rooms/:id/messages
```

如果暂时不做聊天，不要实现 messages，只保留 room 状态。

### 验收标准

- 申请私人介绍后，account 能看到对应状态。
- debug 接受/拒绝后，detail 和 account 状态同步。
- quota 正确扣减。
- 同一 profile 不能重复申请。
- 拒绝后 cooldown 生效。
- 未登录不能申请。
- free/silver/gold/diamond 权益差异明确。

## Phase 5：最后清理 profile 主表旧字段

### 目标

等 account、events、private introduction 全部稳定后，再做 profile 主表精简。

此时可以删除旧字段，而不是为了兼容保留。

### 第一批删除

```text
pronouns
sexuality
interestedIn
hometown
livingSituation
zodiac
employer
incomeRange
religion
politicalViews
funFacts
conversationStarters
dateIdeas
compatibilityDimensions
```

### 第二批迁移

```text
legalName -> profile_verifications
phone/email/wechat -> profile_contact_methods
```

### 第三批重定义

```text
nickname
avatarUrl
occupation
highlights
joinedAt
```

建议：

- `nickname` 删除，保留 `displayName`。
- `avatarUrl` 由 `photos[].isPrimary` 派生。
- `occupation` 删除或改为 `careerDirection`，不要作为精确职位公开展示。
- `highlights` 若 account 不再用，可删除。
- `joinedAt` 若保留，改为 `createdAt`。

### 验收标准

- `mock-server/db.json` 中无旧字段。
- `mock-server/src/types/profile.ts` 中无旧字段。
- `docs/project-database-fields.md` 与实际一致。
- profile directory、self detail、family detail、account、events 全部通过验证。

## 建议提交拆分

### Phase 1

```text
refactor(auth): redesign registration payload
refactor(mock-server): align user identity schema
refactor(auth): simplify register onboarding
```

### Phase 2

```text
refactor(events): expand event api fields
refactor(events): rebuild event directory view
feat(events): add event registration flow
```

### Phase 3

```text
refactor(account): split account api modules
refactor(account): rebuild membership model
refactor(account): use profile ownerships
```

### Phase 4

```text
feat(profiles): sync private introductions with account
feat(events): connect registrations to account
feat(debug): support introduction state testing
```

### Phase 5

```text
refactor(profiles): remove legacy profile fields
refactor(profiles): move contact methods out of profiles
docs(database): sync final profile schema
```

## 给接力 AI 的执行提示

```text
你正在维护 Vue3 + uni-app 项目 cupid-match。
请严格遵守 page -> hook -> api -> mock-server 调用链。
当前优先执行 docs/implementation-roadmap.md。
不要优先清理 profile 旧字段；先完成 Phase 1 登录注册重构。
API 到前端尽量返回扁平结构。
mock-server/db.json 用扁平结构模拟未来结构化数据库，不要在 profile 内做页面分组。
每个阶段结束后运行 npm run type-check、npm run mock:build；涉及 i18n 运行 npm run check:i18n；涉及 H5 页面运行 npm run build:h5。
不要为了兼容保留旧字段，除非当前阶段明确要求延后处理。
```

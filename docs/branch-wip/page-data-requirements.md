# 页面数据需求

本文档用于回答一个问题：重构后，每个页面最终需要什么数据，而不是当前项目现在怎么拿到这些数据。

目标：

- 以页面为中心定义最终需要的数据结构。
- 为后续 `Rust API -> mock async -> hooks -> page` 链路提供输入。
- 不再沿用当前 `composables/api/utils` 的历史边界。

相关补充：

- 字段级盘点见 [api-vue-field-map.md](./api-vue-field-map.md)
- 本文档只描述页面最终消费的数据，不描述旧实现细节

## 总体原则

- 页面只依赖页面级数据模型，不直接消费后端原始 DTO。
- 页面不负责做筛选项生成、排序、统计、状态推导、卡片拼装。
- 页面子组件只接收已经整理好的 props view model。
- `i18n` 保持现状，只负责文案和枚举标签，不负责数据装配。

## 页面分组

### 静态页面

以下页面没有真实 API 数据需求，继续保留静态/i18n 驱动即可：

- `src/pages/public/about.vue`
- `src/pages/public/contact.vue`
- `src/pages/public/membership.vue`
- `src/pages/not-found.vue`

### 数据页面

以下页面需要新链路支持：

- 首页：`src/pages/index.vue`
- 资料库：
  - `src/pages/profiles/self/index.vue`
  - `src/pages/profiles/self/detail.vue`
  - `src/pages/profiles/family/index.vue`
  - `src/pages/profiles/family/detail.vue`
- 活动：
  - `src/pages/events/index.vue`
  - `src/pages/events/detail.vue`
- 账号中心：
  - `src/pages/account/profile.vue`
  - `src/pages/account/activity.vue`
  - `src/pages/account/connections.vue`
  - `src/pages/account/messages.vue`
  - `src/pages/account/membership.vue`
  - `src/pages/account/safety.vue`
  - `src/pages/account/verification.vue`
- 认证：
  - `src/pages/auth/login.vue`
  - `src/pages/auth/register.vue`

## 首页

### `src/pages/index.vue`

页面只需要两个块的数据：

- 精选资料
- 精选活动

建议页面级数据模型：

```ts
interface HomePageData {
  featuredProfiles: ProfileCardVM[]
  featuredEvents: EventCardVM[]
}
```

来源建议：

- `GET /profiles?scene=home&limit=3`
- `GET /events?scene=home&limit=3`

页面不再负责：

- 从目录列表里截前 3 条
- 自己把 `Profile` 转成卡片
- 自己把 `Event` 转成卡片

## 自主相亲资料库

### `src/pages/profiles/self/index.vue`

页面需要：

- 筛选项配置
- 当前筛选状态
- 排序选项
- 分页信息
- 列表卡片
- 结果统计

建议页面级数据模型：

```ts
interface SelfProfileDirectoryPageData {
  filters: DirectoryFilterGroupVM[]
  activeFilters: ActiveFilterVM[]
  sortOptions: SortOptionVM[]
  selectedSort: string
  pagination: PaginationVM
  resultSummary: ResultSummaryVM
  items: ProfileCardVM[]
}
```

页面动作：

- 更新筛选
- 删除单个筛选
- 重置筛选
- 切换排序
- 翻页

来源建议：

- `GET /profiles/self-directory`

备注：

- 后端接口或 mock 可以直接返回筛选项，也可以返回原始聚合字段后由 hook 组装。
- 页面层不再自己从 `sourceItems` 扫描生成 `cityOptions / occupationOptions / languageOptions`。

### `src/pages/profiles/self/detail.vue`

页面需要：

- Hero 区块
- 档案索引信息
- 概览事实块
- 关系信息块
- 生活方式块
- 高亮
- 标签

建议页面级数据模型：

```ts
interface SelfProfileDetailPageData {
  hero: ProfileDetailHeroVM
  overviewFacts: FactItemVM[]
  relationshipFacts: FactItemVM[]
  lifestyleFacts: FactItemVM[]
  spotlightFacts: FactItemVM[]
  intentText: string
  maritalPlanText: string
  highlights: string[]
  tags: string[]
}
```

来源建议：

- `GET /profiles/{id}`

页面不再负责：

- 从原始 `Profile` 上逐个取字段
- 自己决定 badge 文案和 archive facts 结构

## 家长协同资料库

### `src/pages/profiles/family/index.vue`

页面结构与 `self/index` 一致，但语义不同：

- family mode 筛选
- 家庭视角卡片
- 家庭优先排序

建议页面级数据模型：

```ts
interface FamilyProfileDirectoryPageData {
  filters: DirectoryFilterGroupVM[]
  activeFilters: ActiveFilterVM[]
  sortOptions: SortOptionVM[]
  selectedSort: string
  pagination: PaginationVM
  resultSummary: ResultSummaryVM
  items: ProfileCardVM[]
}
```

来源建议：

- `GET /profiles/family-directory`

### `src/pages/profiles/family/detail.vue`

页面结构与 `self/detail` 接近，但展示重点不同：

- 强调家庭可见性
- 强调婚恋计划与家庭协同模式
- Hero 摘要不一定等于本人 summary

建议页面级数据模型：

```ts
interface FamilyProfileDetailPageData {
  hero: ProfileDetailHeroVM
  overviewFacts: FactItemVM[]
  relationshipFacts: FactItemVM[]
  lifestyleFacts: FactItemVM[]
  spotlightFacts: FactItemVM[]
  intentText: string
  maritalPlanText: string
  highlights: string[]
  tags: string[]
}
```

来源建议：

- `GET /profiles/{id}?view=family`

## 活动

### `src/pages/events/index.vue`

页面需要：

- Hero 的下一场活动
- 精选活动列表
- 排期列表
- 活动统计卡片

建议页面级数据模型：

```ts
interface EventsPageData {
  nextEvent: EventCardVM | null
  featuredEvents: EventCardVM[]
  scheduleEvents: EventCardVM[]
  stats: StatCardVM[]
}
```

来源建议：

- `GET /events`

页面不再负责：

- 对活动按日期排序
- 用 `status` 自己筛 featured
- 自己统计 open/waitlist/cityCount

### `src/pages/events/detail.vue`

页面需要：

- Hero 活动详情
- 报名 action 状态
- agenda
- 注意事项
- 相关资料推荐

建议页面级数据模型：

```ts
interface EventDetailPageData {
  hero: EventDetailHeroVM
  action: EventActionVM
  agenda: EventAgendaItemVM[]
  notes: EventNoteItemVM[]
  relatedProfiles: EventRelatedProfileVM[]
}
```

来源建议：

- `GET /events/{id}`

页面不再负责：

- 根据 `status` 生成按钮状态
- 把相关资料从原始 profile 自己拼 meta/reason

## 账号中心

账号中心建议有一个统一入口模型：

```ts
interface AccountShellData {
  topSummary: AccountTopSummaryVM
  nav: AccountPrimaryNavVM
}
```

每个子页再拿自己的页面数据。

### `src/pages/account/profile.vue`

页面需要：

- 当前账号摘要
- 基础资料 rows
- 可见性 rows
- 资料预览

建议页面级数据模型：

```ts
interface AccountProfilePageData {
  summaryCards: StatCardVM[]
  baseRows: InfoRowVM[]
  visibilityRows: InfoRowVM[]
  previewSummary: string
  previewHighlights: string[]
  previewTags: string[]
  membershipLabel: string
}
```

### `src/pages/account/activity.vue`

页面需要：

- 活动记录筛选统计
- 报名记录列表
- 支持说明块

建议页面级数据模型：

```ts
interface AccountActivityPageData {
  filterChips: CountChipVM[]
  items: AccountActivityItemVM[]
  supportPoints: string[]
  familyPoints: string[]
}
```

### `src/pages/account/connections.vue`

页面需要：

- 收藏/连接计数
- 资料列表
- 汇总统计

建议页面级数据模型：

```ts
interface AccountConnectionsPageData {
  filterChips: CountChipVM[]
  items: AccountConnectionItemVM[]
  summaryCards: StatCardVM[]
  reasonPoints: string[]
}
```

### `src/pages/account/messages.vue`

页面需要：

- 消息计数
- 线程列表
- 安全提示

建议页面级数据模型：

```ts
interface AccountMessagesPageData {
  filterChips: CountChipVM[]
  items: AccountMessageThreadVM[]
  supportPoints: string[]
  boundaryPoints: string[]
}
```

### `src/pages/account/membership.vue`

页面需要：

- 当前会员摘要
- 会员套餐卡
- 服务入口按钮

建议页面级数据模型：

```ts
interface AccountMembershipPageData {
  currentCards: StatCardVM[]
  currentMembershipLabel: string
  plans: MembershipPlanCardVM[]
}
```

### `src/pages/account/safety.vue`

页面需要：

- 可见性 rows
- 隐私设置列表
- 家长协助说明
- 风险说明

建议页面级数据模型：

```ts
interface AccountSafetyPageData {
  visibilityRows: InfoRowVM[]
  privacyItems: PrivacySettingVM[]
  familyPoints: string[]
  notePoints: string[]
}
```

### `src/pages/account/verification.vue`

页面需要：

- 验证进度摘要
- 验证项网格
- 风险控制信息

建议页面级数据模型：

```ts
interface AccountVerificationPageData {
  overviewCards: StatCardVM[]
  verificationItems: VerificationItemVM[]
  controlRows: InfoRowVM[]
  inviteSummary: string
}
```

## 认证

### `src/pages/auth/login.vue`

页面需要：

- 静态文案
- 提交状态
- 错误状态

请求模型：

```ts
interface LoginFormInput {
  identity: string
  password: string
  agreed: boolean
}
```

返回对页面最关键的数据：

- 是否成功
- 当前用户会话

页面不应直接依赖 token 细节。

### `src/pages/auth/register.vue`

页面需要：

- 角色选择
- 表单状态
- 提交状态

请求模型：

```ts
interface RegisterFormInput {
  role: 'self' | 'parent'
  email: string
  password: string
  confirmPassword: string
  nickName: string
  city: string
  agreed: boolean
}
```

返回对页面最关键的数据：

- 注册是否成功
- 是否需要跳转登录
- 是否需要自动建 session

## 页面级通用 View Model

建议统一抽一组页面 view model，避免每页自己发明结构：

```ts
interface StatCardVM {
  label: string
  value: string
}

interface InfoRowVM {
  label: string
  value: string
}

interface CountChipVM {
  label: string
  value: string
}

interface PaginationVM {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface ResultSummaryVM {
  total: number
  start: number
  end: number
}
```

## 本文档在重构中的用途

重构时顺序应为：

1. 先从这里确认页面最终要什么
2. 再设计 Rust API contract
3. 再设计 hooks 输出什么页面模型
4. 最后落 mock async 和页面替换

如果某个字段没有在本文档或 [api-vue-field-map.md](./api-vue-field-map.md) 中出现，默认不应该进入新链路。

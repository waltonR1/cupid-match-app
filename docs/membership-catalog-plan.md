# Membership Catalog 统一计划

## 目标

统一 `cupid-match-app` 前端页面与 `mock-server` 的会员套餐数据源，消除套餐价格、有效期、额度和权益在 mock DB 与静态 i18n 中重复定义的问题。

本计划仅覆盖：

- `cupid-match-app` 前端
- `cupid-match-app/mock-server`
- app 内相关契约文档
- `cupid-match-server/doc/reference-from-app` 本地参考副本

Java 后端暂不实现，留到后端 Phase 6。

## 数据归属

### Mock DB 负责业务事实

- 套餐等级和标准名称
- 欧元价格与人民币价格
- 购买方式与有效期
- 私人介绍额度与重置周期
- 活动额度与活动优先权
- 资料访问等级
- 顾问服务等级
- 套餐排序与推荐状态

### 前端 i18n 负责界面表达

- 页面标题、字段标签和按钮文案
- 加载、错误与空状态
- 结构化业务值的格式化模板
- 页面上下文相关的套餐描述和适用人群
- 不包含具体价格、额度和有效期

## 需要统一的字段

### 套餐基本信息

| 字段 | 直白含义 | 样例 | 统一后用途 |
| --- | --- | --- | --- |
| `id` | 套餐记录的稳定 ID，不展示给用户 | `plan-gold` | API、升级请求和数据关联 |
| `tier` | 套餐等级编码 | `gold` | 样式、排序、权限判断和升级流程 |
| `name` | 用户看到的套餐名称，按 locale 返回 | `金卡会员` | 首页、公共会员页、账户页 |
| `description` | 套餐的标准后台说明 | `专属顾问和更多可见性` | 账户和管理场景使用 |

`name` 使用静态会员页的标准名称：免费会员、白银会员、黄金会员、钻石会员。首页或公共页的“适合什么人”“页面宣传语”等上下文描述仍保留在 i18n。

### 价格与有效期

| 字段 | 直白含义 | 样例 | 说明 |
| --- | --- | --- | --- |
| `priceCents` | 最小货币单位表示的价格 | `10000` 表示 `€100.00` | 避免使用浮点数保存金额 |
| `currency` | 价格币种 | `EUR` | 与 `priceCents` 一起格式化 |
| `cnyPriceCents` | 单独保存的人民币价格 | `77000` 表示 `¥770.00` | 与欧元价格并列展示，不做实时汇率换算 |
| `billingType` | 这是免费、一次性购买还是自动续费 | `one_time` | 新增字段 |
| `billingPeriod` | 自动续费时多久扣一次款 | `monthly` | 仅 `recurring` 时有意义 |
| `validityMonths` | 一次购买可以使用几个月 | `6` | 新增字段，表示“半年有效” |

`billingPeriod` 与 `validityMonths` 不能混用：

```text
一次支付 €100，使用 6 个月
-> billingType = one_time
-> billingPeriod = undefined
-> validityMonths = 6

每月自动支付 €29.99
-> billingType = recurring
-> billingPeriod = monthly
-> validityMonths = undefined
```

### 私人介绍权益

| 字段 | 直白含义 | 样例 | 页面文案示例 |
| --- | --- | --- | --- |
| `privateIntroductionQuota` | 每个额度周期最多可发起多少次私人介绍 | `15` | `每月 15 次私人介绍` |
| `privateIntroductionPeriod` | 私人介绍额度多久重置一次 | `monthly` | 与 quota 组合生成文案 |

当前四档套餐都使用明确的数字额度，Diamond 固定为每月 30 次。若未来新增真正的无限额度，可再将字段调整为：

```ts
privateIntroductionQuota: number | null
```

其中 `null` 明确表示无限，不能使用任意大数字模拟。当前统一不启用该语义，字段仍保持 `number`。

### 活动权益

| 字段 | 直白含义 | 样例 | 说明 |
| --- | --- | --- | --- |
| `eventQuota` | 套餐有效期内最多可参加多少次受额度控制的活动 | `20` | 新增字段，值采用静态会员页 |
| `eventPriorityEnabled` | 是否拥有会员活动或候补排序的优先权 | `true` | 布尔权限，不等于活动次数 |

`eventQuota` 与 `eventPriorityEnabled` 是两件事：

- `eventQuota = 20`：最多参加 20 次。
- `eventPriorityEnabled = true`：报名或候补有优先权。

统一后 Silver 为 12 次、Gold 为 20 次、Diamond 为 24 次；Free 为 0 次套餐活动额度。

### 用户活动余额

套餐的 `eventQuota` 是用户开通会员时的额度来源，实际可用次数保存在现有 `user_entitlement_balances` 中，不由前端根据活动报名记录临时统计。

活动记录增加 `consumesMembershipQuota: boolean`。只有该值为 `true` 的活动才校验和消耗活动余额；公开说明会、线上介绍等不占套餐名额的活动设为 `false`。

| 字段 | 直白含义 | Gold 用户样例 |
| --- | --- | --- |
| `entitlementCode` | 权益类型 | `event_registration` |
| `quotaTotal` | 本会员有效期内的活动总额度 | `20` |
| `quotaUsed` | 已确认并占用额度的活动次数 | `3` |
| `quotaRemaining` | 当前仍可使用的活动次数 | `17` |
| `periodStartedAt` | 本次活动额度开始时间 | 与会员 `startedAt` 一致 |
| `periodEndsAt` | 本次活动额度结束时间 | 与会员 `expiresAt` 一致 |

活动额度不按月重置，而是覆盖本次会员有效期。用户开通或升级会员时，根据套餐的 `eventQuota` 创建或重建 `event_registration` 余额；免费档总额度为 `0`。

扣减与返还规则：

- 提交报名进入 `requested` 时不扣额度。
- 后台确认受额度控制的报名进入 `confirmed` 时，原子校验并扣减 1 次；余额为 0 时不能确认。
- `waitlist` 和 `declined` 不占用额度。
- 已扣额度的报名在参加活动前取消时返还 1 次。
- 进入 `attended` 后不再返还。
- 同一报名必须记录是否已经扣减和返还，避免重复审核或重复取消造成重复变更。

为保证余额变更可追踪，在 `event_registrations` 增加：

```ts
eventQuotaConsumedAt?: string
eventQuotaReleasedAt?: string
```

`eventQuotaConsumedAt` 存在且 `eventQuotaReleasedAt` 不存在，表示该报名当前占用 1 次活动额度。

活动记录增加：

```ts
interface EventRecord {
  // 现有字段省略
  consumesMembershipQuota: boolean
}
```

### 资料与服务权益

| 字段 | 直白含义 | 样例 | 程序行为 |
| --- | --- | --- | --- |
| `staffReviewEnabled` | 是否提供工作人员资料审核服务 | `true` | 生成权益说明，未来可用于流程门控 |
| `profileDetailAccessLevel` | 可查看哪一级资料详情 | `premium` | `registered` 只能看注册层字段，`premium` 可看会员层字段 |
| `conciergePriority` | 是否获得顾问优先处理 | `true` | 当前账户会员页直接展示“是/否” |
| `staffSupportLevel` | 顾问支持等级 | `priority` | `none` / `standard` / `priority` / `concierge` |

`conciergePriority` 是是否优先的布尔值，`staffSupportLevel` 是服务深度，两者含义不同。

### 展示与管理字段

| 字段 | 直白含义 | 样例 | 是否给用户展示 |
| --- | --- | --- | --- |
| `sortOrder` | 套餐显示顺序 | `3` | 不直接展示 |
| `featured` | 是否作为推荐套餐突出显示 | `true` | 控制卡片视觉强调 |
| `isActive` | 套餐当前是否可售或可展示 | `true` | `false` 时不进入 catalog |
| `createdAt` | 套餐记录创建时间 | `2026-01-01T00:00:00Z` | 不进入 catalog DTO |
| `updatedAt` | 套餐记录更新时间 | `2026-01-01T00:00:00Z` | 不进入 catalog DTO |

## 不需要统一为数据库字段的内容

以下内容继续放在 i18n，因为它们是页面表达，不是套餐业务事实：

- 页面 eyebrow、主标题、副标题
- CTA，例如“咨询专属顾问”“选择此方案”
- badge，例如 `GOLD SELECTION`
- “适合刚开始认真筛选的人”等人群定位
- 卡片辅助说明和规则区标题
- loading、error、empty、toast
- 权益格式化模板，例如“每月 {count} 次私人介绍”

判断标准：

```text
改动后会影响收费、期限、额度或权限
-> 业务事实，必须来自 catalog

只影响页面如何介绍或呈现同一套餐
-> 展示文案，保留在 i18n
```

## 统一后的套餐事实

以当前静态会员页为基准，统一后的 mock DB 目标值如下：

| tier | 标准名称 | 欧元价格 | 人民币价格 | 购买方式 | 有效期 | 私人介绍 | 活动额度 | 活动优先 | 资料访问 | 顾问支持 |
| --- | --- | ---: | ---: | --- | ---: | --- | ---: | --- | --- | --- |
| `free` | 免费会员 | €0 | ¥0 | free | 无固定期限 | 0 次 | 0 次 | 否 | registered | none |
| `silver` | 白银会员 | €65 | ¥499 | one_time | 12 个月 | 每月 5 次 | 12 次 | 否 | registered | standard |
| `gold` | 黄金会员 | €100 | ¥770 | one_time | 6 个月 | 每月 15 次 | 20 次 | 是 | premium | priority |
| `diamond` | 钻石会员 | €150 | ¥1155 | one_time | 12 个月 | 每月 30 次 | 24 次 | 是 | premium | concierge |

说明：

- Diamond 采用静态页的“每月 30 次”，不采用旧 DB description 中的“无限介绍额度”。
- Silver 静态页没有承诺活动优先，因此 `eventPriorityEnabled = false`。
- `staffReviewEnabled`：Free 为 `false`，三档 VIP 为 `true`。
- 免费用户仍可浏览活动信息；`eventQuota = 0` 只表示套餐不承诺受额度控制的线下活动次数。
- 欧元和人民币是分别保存的确定展示价格，不由前端按汇率换算。实际支付币种和金额由后续支付流程明确选择。

## 统一后的页面字段分发

### 首页会员区 `HomeMembership.vue`

| 页面内容 | 来源 | 中文值或生成结果 |
| --- | --- | --- |
| 区块标题 | i18n | `专属会员`、`路径与礼遇` |
| 区块副标题 | i18n | `从基础体验到更深度的顾问协助...` |
| 套餐标准名称 | DB catalog | `免费会员`、`白银会员`、`黄金会员`、`钻石会员` |
| badge | i18n | `基础体验`、`SILVER ACCESS`、`GOLD SELECTION`、`PRIVATE DIAMOND` |
| 首页场景描述 | i18n | `适合希望提升推荐效率与线下相遇机会的会员。` 等 |
| 主价格 | DB catalog | `€0`、`€65`、`€100`、`€150` |
| 人民币价格 | DB catalog | `¥499`、`¥770`、`¥1155` |
| 有效期 | DB catalog + i18n 模板 | `一年有效`、`半年有效`、`一年有效` |
| 私人介绍权益 | DB catalog + i18n 模板 | `每月 5 / 15 / 30 次私人介绍` |
| 活动权益 | DB catalog + i18n 模板 | `12 / 20 / 24 次线下活动` |
| 服务定位补充 | i18n | `适合稳步建立第一轮判断` 等 |
| CTA | i18n | `开启体验`、`咨询专属顾问` |

### 公共会员页 Hero `MembershipHero.vue`

| 页面内容 | 来源 | 中文值或生成结果 |
| --- | --- | --- |
| Hero 标题和说明 | i18n | `会员体系`、页面介绍和补充说明 |
| 三档预览名称 | DB catalog | `白银会员`、`黄金会员`、`钻石会员` |
| 三档预览价格 | DB catalog | `€65`、`€100`、`€150` |
| 三档预览有效期 | DB catalog + i18n 模板 | `一年有效`、`半年有效`、`一年有效` |
| 推荐标签 | DB `featured` + i18n | Gold 显示 `Popular` |
| CTA | i18n | `免费注册`、`查看方案对比` |

### 公共会员方案区 `MembershipTiersSection.vue`

| 页面内容 | 来源 | 中文值或生成结果 |
| --- | --- | --- |
| 区块标题、副标题 | i18n | `三档 VIP 方案`及说明 |
| 套餐名称 | DB catalog | `免费会员`、`白银会员`、`黄金会员`、`钻石会员` |
| 套餐价格 | DB catalog | `€0 / €65 / €100 / €150` |
| 人民币价格 | DB catalog | `¥499 / ¥770 / ¥1155` |
| 有效期 | DB catalog + i18n 模板 | Free `无固定期限`，VIP 为 `12 / 6 / 12 个月` |
| 私人介绍额度 | DB catalog + i18n 模板 | `无私人介绍额度`、`每月 5 / 15 / 30 次` |
| 活动额度 | DB catalog + i18n 模板 | `无套餐活动额度`、`12 / 20 / 24 次线下活动` |
| 资料访问权益 | DB catalog + i18n 模板 | `注册用户资料访问`或`完整会员资料访问` |
| 顾问支持 | DB catalog + i18n 模板 | `无顾问支持`、`基础顾问支持`、`优先顾问支持`、`专属顾问支持` |
| 适合人群 | i18n | `适合刚开始认真筛选...`等 |
| badge 和 CTA | i18n | `Silver VIP`、`选择此方案`等 |

### 公共会员规则区 `MembershipRulesSection.vue`

| 页面内容 | 来源 | 中文值 |
| --- | --- | --- |
| 规则标题和说明 | i18n | `规则说明与升级方式` |
| 实名验证规则 | i18n | `所有 VIP 会员均需完成实名验证` |
| 双向同意规则 | i18n | `拒绝不占用本月名额` |
| 顾问确认规则 | i18n | `升级前先明确服务承接方式` |
| 升级流程 | i18n | 沟通需求、确认档位、支付开通 |

这些是全局政策说明，不是某个套餐的价格、时效或额度字段，因此本阶段不进入 catalog。

### 账户首页 `pages/account/index.vue`

| 页面内容 | 来源 | 中文值或样例 |
| --- | --- | --- |
| 字段标签 | i18n | `当前会员` |
| 当前套餐名称 | DB `/account/dashboard` | `免费会员`、`白银会员`、`黄金会员`、`钻石会员` |
| 无会员 fallback | i18n | `暂无会员` |

### 账户外壳 `AccountShell.vue`

| 页面内容 | 来源 | 中文值 |
| --- | --- | --- |
| 当前等级短标签 | auth session tier + i18n | `免费会员`、`银卡会员`、`金卡会员`、`钻石会员` |

这里不额外请求 catalog。为避免名称不一致，应把短标签 i18n 同步为 `免费会员`、`白银会员`、`黄金会员`、`钻石会员`。

### 账户会员页 `pages/account/membership.vue`

| 页面内容 | 来源 | 中文值或样例 |
| --- | --- | --- |
| 页面标题和字段标签 | i18n | `会员`、`当前套餐`、`开始时间`、`到期时间` |
| 当前套餐名称 | DB `/account/membership.membership` | `白银会员`等 |
| 当前状态 | DB 状态 + i18n | `active -> 生效中` |
| 开始和到期时间 | DB membership | 按 locale 格式化日期 |
| 顾问优先级 | DB membership + i18n | `是` / `否` |
| 私人介绍余额 | DB entitlements | `剩余 12 / 总计 15` |
| 活动余额 | DB entitlements | `剩余 17 / 总计 20` |
| 权益名称 | DB code + i18n | `private_introduction -> 私人介绍额度`、`event_registration -> 活动额度` |
| 下一级套餐名称 | DB availablePlans | `黄金会员` |
| 升级区说明和按钮 | i18n | `升级会员`、`查看会员体系` |

该页面当前不展示套餐价格、有效期和完整权益；`availablePlans` 只用于寻找下一级套餐。

### Self / Family Profile 详情页

| 页面内容 | 来源 | 中文值或样例 |
| --- | --- | --- |
| 私人介绍总额度和剩余额度 | DB entitlement 计算 | `本月私人介绍名额 12/15` |
| 申请状态 | DB 计算状态 + i18n | `quota_exhausted -> 本月名额已用完` |
| 按钮和步骤说明 | i18n | `申请建立私人连接`、状态步骤文案 |
| 资料字段访问结果 | DB membership tier + access 规则 | Free 返回会员锁定标记，Gold/Diamond 返回完整值 |

这些页面不直接消费 catalog 的价格和有效期，只消费会员等级产生的权限结果和 entitlement 余额。

### 活动详情页 `pages/events/detail.vue`

| 页面内容 | 来源 | 中文值或样例 |
| --- | --- | --- |
| 是否需要付费会员 | DB membership + event visibility 计算 | `member_required` |
| 活动额度状态 | DB `event_registration` entitlement | `剩余 17 / 总计 20`、`event_quota_exhausted` |
| 操作按钮 | i18n | `查看会员方案` |
| 活动额度提示 | DB 余额 + i18n 模板 | `本会员有效期内还可参加 17 次活动` |

活动详情接口返回活动余额摘要和计算后的报名状态。前端只展示后端结果，不自行用 `eventQuota - 报名数` 计算余额。

## 套餐模型调整

当前 `billingPeriod: monthly` 与页面中的“半年有效”“一年有效”表达了不同概念，需要拆分。

建议模型：

```ts
interface MembershipPlanDTO {
  id: string
  tier: 'free' | 'silver' | 'gold' | 'diamond'
  name: string
  description: string
  priceCents: number
  currency: string
  cnyPriceCents: number
  billingType: 'free' | 'one_time' | 'recurring'
  billingPeriod?: 'monthly' | 'quarterly' | 'yearly'
  validityMonths?: number
  privateIntroductionQuota: number
  privateIntroductionPeriod: 'monthly' | 'quarterly' | 'yearly'
  eventQuota: number
  eventPriorityEnabled: boolean
  staffReviewEnabled: boolean
  profileDetailAccessLevel: 'registered' | 'premium'
  conciergePriority: boolean
  staffSupportLevel: 'none' | 'standard' | 'priority' | 'concierge'
  sortOrder: number
  featured: boolean
}
```

四档套餐按本文“统一后的套餐事实”落库，不再从各页面 i18n 反向推断。`priceCents + currency` 保存欧元价格，`cnyPriceCents` 单独保存人民币价格；两组金额都是确定展示值。

Diamond 私人介绍额度统一为每月 30 次，不使用“无限”语义；免费档的 `eventQuota` 和 `privateIntroductionQuota` 均显式保存为 `0`，避免以缺失字段表达无权益。

用户权益类型同步扩展为：

```ts
type EntitlementCode =
  | 'private_introduction'
  | 'event_registration'
  | 'event_priority'
  | 'staff_review'
  | 'profile_detail_access'
```

活动余额继续使用现有结构：

```ts
interface UserEntitlementBalanceRecord {
  id: string
  userId: string
  membershipId: string
  entitlementCode: EntitlementCode
  periodStartedAt: string
  periodEndsAt: string
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  createdAt: string
  updatedAt: string
}
```

活动报名记录增加幂等标记：

```ts
interface EventRegistrationRecord {
  // 现有字段省略
  eventQuotaConsumedAt?: string
  eventQuotaReleasedAt?: string
}
```

## 公共套餐接口

新增无需登录的公共接口：

```text
GET /api/membership/catalog
```

响应：

```ts
interface MembershipCatalogDTO {
  plans: MembershipPlanDTO[]
}
```

`GET /api/account/membership` 继续返回：

```ts
interface AccountMembershipPayload {
  membership: AccountMembershipDTO | null
  entitlements: AccountEntitlementBalanceDTO[]
  availablePlans: MembershipPlanDTO[]
}
```

`entitlements` 同时返回 `private_introduction` 和 `event_registration`。没有活动额度记录时，mock service 对外归一为 `quotaTotal = 0`、`quotaUsed = 0`、`quotaRemaining = 0`。

活动详情响应增加：

```ts
interface EventEntitlementSummaryDTO {
  code: 'event_registration'
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  periodStartedAt?: string
  periodEndsAt?: string
}

interface EventDetailDTO {
  // 现有字段省略
  consumesMembershipQuota: boolean
  eventEntitlement: EventEntitlementSummaryDTO
}
```

对 `consumesMembershipQuota = true` 的活动，当余额耗尽时，活动详情和报名接口返回计算状态 `event_quota_exhausted`；该状态是 API 状态，不写入 `event_registrations.status`。不消耗额度的活动仍按原有会员可见性和席位规则处理。

公共 catalog 与账户接口必须复用同一个 mock service mapper，不能分别组装套餐数据。

## Mock Server 改造

1. 扩展 `membership_plans` 数据结构。
2. 按本文统一值修正套餐价格、有效期和额度。
3. 抽取统一的 membership plan DTO mapper。
4. 新增 `/membership/catalog` 路由。
5. 让 `/account/membership.availablePlans` 复用同一 mapper。
6. 扩展 `EntitlementCode`，为现有 Gold mock 用户增加 `event_registration` 余额：总计 20、已用 0、剩余 20。
7. 会员开通或升级时，根据新套餐 `eventQuota` 创建活动余额，余额周期与该次会员有效期一致。
8. 为活动数据补充 `consumesMembershipQuota`，仅对受额度控制的活动执行余额逻辑。
9. 活动后台确认时扣减余额；取消未参加的已确认报名时返还余额。
10. 在确认、取消和重复请求中使用报名记录的扣减标记保证幂等。
11. 账户会员接口和活动详情接口返回活动余额。
12. 保留并验证现有独立业务链：
   - Profile 字段访问权限
   - Private Introduction entitlement quota
   - Event 付费会员报名门控
   - Event Registration entitlement quota

## 前端 API 与 Hook

新增：

```text
src/api/membership/
  membership.ts
  membership.types.ts
  index.ts

src/hooks/membership/
  use-membership-catalog.ts
  index.ts
```

`use-membership-catalog` 负责：

- 获取公共套餐
- 管理 loading、error 和 refresh
- 使用 `useLatestRequest`
- locale 变化后重新加载本地化套餐内容

账户会员页面继续通过 `useAccountMembership` 调用 `/account/membership`。

活动详情继续通过现有 events API 与 hook 获取数据，并增加：

- `eventEntitlement` 余额展示
- `event_quota_exhausted` 状态映射
- 余额耗尽时禁用报名并引导查看会员方案
- 报名确认、取消后刷新详情，使用服务端返回的最新余额

## Mapper 与 ViewModel

新增 catalog mapper，将结构化 DTO 转换为营销页面 ViewModel：

- 格式化价格与币种
- 格式化计费周期和有效期
- 根据结构化权益生成 feature 列表
- 统一套餐排序
- 统一 featured 套餐展示

i18n 只提供模板，例如：

```text
每月 {count} 次私人介绍
有效期 {months} 个月
最多参加 {count} 次活动
本会员有效期内还可参加 {count} 次活动
本次会员的活动名额已用完
```

## 页面改造

以下页面统一消费 membership catalog：

- `src/components/home/HomeMembership.vue`
- `src/pages/public/membership.vue`
- `src/components/membership/MembershipTiersSection.vue`

从 i18n 中删除或停止使用：

- 固定套餐价格
- 固定价格备注
- 固定有效期
- 固定私人介绍额度
- 固定活动次数
- 可以从结构化权益推导的 feature 文案

纯营销定位文案可以保留，但不得作为套餐规则或程序判断依据。

## 最终 Membership 数据链

1. Auth session：全局会员身份和账户外壳展示。
2. Dashboard：账户首页会员摘要。
3. Account Membership：当前会员、entitlement 余额和升级入口。
4. Membership Catalog：首页和公共会员页的套餐展示。
5. Profile Access：根据会员等级控制资料字段可见性。
6. Private Introduction：根据 entitlement quota 和申请历史计算状态。
7. Event Registration：根据会员门控和 `event_registration` 余额控制报名确认、扣减与返还。

这些链路共享会员业务事实，但各自返回符合页面需要的数据，不由前端跨接口拼装状态。

## 文档同步

实现时同步更新：

- `docs/final-api-contract.md`
- `docs/final-data-flow-contract.md`
- `docs/final-database-schema.md`
- `docs/final-page-fields.md`
- `docs/mock-server-guide.md`
- `cupid-match-server/doc/reference-from-app`

server 参考目录只同步本地副本，不修改 Phase 6 之前的 Java 实现。

## 实施顺序

### 阶段 1：固化业务事实

- 将本文四档套餐统一值写入 mock DB。
- 将一次性购买与有效期拆成独立字段。
- 将私人介绍额度与活动额度作为正式结构化权益。
- 将欧元和人民币价格作为两组确定金额保存，不在前端换算。

### 阶段 2：统一模型与 Mock

- 修改数据库和 DTO 类型。
- 抽取统一 plan mapper。
- 新增 catalog endpoint。
- 让 account membership 复用 catalog mapper。
- 增加用户活动余额及活动报名扣减、返还闭环。

### 阶段 3：接入前端

- 新增 membership API 与 hook。
- 新增 catalog mapper 和 ViewModel。
- 改造首页与公共会员页。
- 在账户会员页和活动详情页展示活动余额与耗尽状态。
- 清理 i18n 中重复的业务事实。

### 阶段 4：契约与回归

- 同步 final 文档与 server 参考副本。
- 验证三种语言。
- 验证首页、公共会员页和账户会员页数据一致。
- 验证活动确认扣减、取消返还以及重复操作幂等。

## 建议提交拆分

```text
refactor(membership): define unified membership catalog
refactor(mock-server): serve membership catalog from plan data
feat(events): enforce membership event quota
refactor(membership): render public plans from catalog
```

## 验证命令

```bash
npm run type-check
npm run mock:build
npm run check:i18n
npm run build:h5
```

还应手动验证：

- 首页与公共会员页套餐价格、有效期和权益一致。
- locale 切换后套餐名称与描述正确刷新。
- Account Membership 的下一级套餐与公共 catalog 一致。
- Profile Access 和 Private Introduction 行为不受 catalog 改造影响。
- 受额度控制的活动确认后余额减 1，未参加前取消后返还 1。
- 重复确认或重复取消不会再次扣减或返还。
- 不消耗会员额度的活动不受活动余额限制。

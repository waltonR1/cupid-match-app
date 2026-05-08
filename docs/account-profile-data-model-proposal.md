# Account and Profile Data Model Proposal

## 目标

本文件记录 account 域与 profile 字段的后续重构方向。

当前产品定位是高端、严肃关系导向、平台中介撮合。数据模型需要强化四个边界：

- `users`：登录账户主体。
- `profiles`：被撮合的相亲资料主体。
- `memberships`：会员权益与额度。
- `private_introduction_requests`：建立私人连接的受控申请。

## Account 当前问题

当前 account 链路已经从旧的 `accounts / auth_users` 迁移到 `users / auth_identities / memberships`，但整体仍更像页面聚合数据，而不是完整账户域模型。

主要问题：

- `users.role` 不够稳定。`self / parent` 更像用户与 profile 的关系，而不是用户主体属性。
- `users.profileCompletion` 更像 profile 完成度，不应长期放在 `users`。
- `users.displayName` 与 `profiles.displayName` 容易混淆，需要明确账户展示名与资料展示名。
- `memberships` 只包含 `tier / startedAt / expiresAt`，难以表达权益、额度、状态、续费和赠送。
- `privacy_settings` 当前带多语言文案，更像页面 mock 数据；长期应改成设置 code/value。
- `message_threads` 容易把产品拉向自由聊天。若后续需要沟通，应优先设计为平台中介控制下的 introduction room。

## 推荐 Account 结构

建议后续目标结构：

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
private_introduction_requests
private_introduction_rooms
advisor_follow_ups
```

职责划分：

| Collection | 职责 |
| --- | --- |
| `users` | 登录账户主体，只描述账户身份。 |
| `auth_identities` | 登录方式，例如 email、phone、wechat、google。 |
| `user_preferences` | 账户偏好与开关，使用 code/value 存储。 |
| `membership_plans` | 平台可售卖或可配置的会员套餐定义。 |
| `user_memberships` | 用户当前或历史会员订阅记录。 |
| `membership_entitlements` | 套餐权益定义，例如私人介绍额度。 |
| `user_entitlement_balances` | 用户权益余额，例如本月剩余介绍次数。 |
| `profiles` | 被撮合的相亲资料主体。 |
| `profile_ownerships` | 用户与资料的关系，例如本人、父母、顾问。 |
| `profile_verifications` | 实名、学历、身份、顾问审核等认证状态。 |
| `favorite_profiles` | 用户收藏关系。 |
| `private_introduction_requests` | 私人介绍申请。 |
| `private_introduction_rooms` | 双方确认后的平台内私密沟通空间。 |
| `advisor_follow_ups` | 顾问跟进记录。 |

## 关键表建议

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

说明：

- 不放 `role`。
- 不放 `profileCompletion`。
- 不直接表达会员等级。

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
}
```

说明：

- `email` 不需要单独重复为字段，可由 `provider + identifier` 表达。
- mock 阶段可以继续明文 password，但结构上预留 `passwordHash`。

### profile_ownerships

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
}
```

说明：

- `self / parent` 应该在这里表达。
- 一个 user 可以管理多个 profile。
- 一个 profile 也可以被本人、父母、顾问共同关联。

### membership_plans

```ts
interface MembershipPlanRecord {
  id: string
  tier: 'free' | 'silver' | 'gold' | 'diamond'
  name: LocalizedText
  monthlyPrivateIntroductionQuota: number
  conciergePriority: boolean
  isActive: boolean
}
```

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
}
```

### user_entitlement_balances

```ts
interface UserEntitlementBalanceRecord {
  id: string
  userId: string
  entitlementCode: 'private_introduction'
  period: string
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  resetAt: string
}
```

## Profile 字段清理评估

### 第一批：建议移除

这些字段当前已经不在主要 API / 页面链路中展示，或不符合当前产品定位。

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
conversationStarters
dateIdeas
compatibilityDimensions
```

理由：

- `pronouns / sexuality / interestedIn` 更接近社交约会 App，不符合当前高端中介式资料表达。
- `hometown / livingSituation / zodiac` 信息价值低，容易把 detail 拉回 dossier。
- `employer / incomeRange` 过度敏感，且当前策略倾向职业方向与经济稳定度，而不是精确雇主或收入。
- `religion / politicalViews` 可以未来作为深度问卷或顾问审核信息，不适合作为当前公开 profile 主字段。
- `conversationStarters / dateIdeas` 已从 self detail 链路移除。
- `compatibilityDimensions` 不应使用百分比分数，若未来恢复，应改为定性判断模型。

### 第二批：需要重定义

```text
legalName
nickname
displayName
```

建议：

- `displayName` 保留为 profile 对外展示名。
- `nickname` 若与 `displayName` 重复，可删除。
- `legalName` 不应留在 `profiles` 主表，建议迁移到 `profile_verifications` 或后台审核资料。

### 第三批：迁移而不是直接删除

```text
phone
email
wechat
```

建议迁移到独立联系方式表：

```ts
interface ProfileContactMethodRecord {
  id: string
  profileId: string
  type: 'phone' | 'email' | 'wechat'
  value: string
  verifiedAt?: string
  visibleAfterIntroduction: boolean
}
```

理由：

- 联系方式不是 profile 展示字段。
- 只有私人介绍成功后才可能开放。
- 独立表更容易做权限、审计、脱敏和顾问确认。

## 推荐执行顺序

### Step 1：收紧 profile 主表

先移除明显旧字段：

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
conversationStarters
dateIdeas
compatibilityDimensions
```

同步修改：

- `mock-server/db.json`
- `mock-server/src/types/profile.ts`
- `docs/project-database-fields.md`

### Step 2：重定义名字体系

目标：

- profile 对外展示只保留一个稳定名称字段。
- 真实姓名进入认证或审核表。

推荐结果：

```text
profiles.displayName
profile_verifications.legalName
```

### Step 3：迁移联系方式

目标：

- 从 `profiles` 移除 `phone / email / wechat`。
- 新增 `profile_contact_methods`。
- 私人介绍成功后再通过受控接口或 introduction room 暴露。

### Step 4：重做 account / membership

目标：

- 删除 `users.role`。
- 删除或迁移 `users.profileCompletion`。
- 增强 membership 结构。
- 将用户与 profile 的身份关系完全交给 `profile_ownerships`。

### Step 5：重做 account overview API

目标：

- account overview 不再直接绑定临时页面字段。
- 后端返回更贴近账户中心的稳定结构。
- 前端 mapper 再转成页面 view model。

## 当前结论

account 可以推倒重做，而且值得重做。

profile 当前也已经进入可以清理旧 dossier 字段的阶段。下一步重点不是继续增加字段，而是把账户身份、资料主体、会员权益、私人连接四个域边界固定下来。

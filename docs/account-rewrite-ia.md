# Account 重写 IA 与页面模块拆分

## 目标

- `account` 不再沿用当前 `overview` 仪表盘结构
- 参考中国严肃婚恋产品，重写为 `资料 + 认证 + 缘分 + 消息 + 安全 + 服务`
- 先定 IA 和模块，再做 token 和页面实现

关联基线：

- [design-token-account-benchmark-rewrite.md](/D:/uniapp/cupid-match/docs/design-token-account-benchmark-rewrite.md)

## 一版定稿 IA

### 入口规则

- `/pages/account/index` 不再是独立总览页
- `/pages/account/index` 直接重定向到 `/pages/account/profile`

### 一级导航

1. `我的资料` `profile`
2. `认证中心` `verification`
3. `我的缘分` `connections`
4. `消息` `messages`
5. `隐私与安全` `safety`
6. `会员与服务` `membership`

### 二级/辅助路由

- `我的活动` `activity`
- `认证详情` `verification-detail`
- `黑名单与举报记录` `safety-records`

## 推荐路由结构

```txt
/pages/account/index                -> redirect /pages/account/profile
/pages/account/profile              我的资料
/pages/account/verification         认证中心
/pages/account/connections          我的缘分
/pages/account/messages             消息
/pages/account/safety               隐私与安全
/pages/account/membership           会员与服务
/pages/account/activity             我的活动
/pages/account/verification-detail  认证详情
/pages/account/safety-records       黑名单/举报记录
```

## 旧页到新页映射

| 旧页面 | 新归属 | 处理方式 |
| --- | --- | --- |
| `account/index` | `account/profile` + `account/membership` | 删除旧总览，拆散内容 |
| `account/profile` | `account/profile` | 保留主题，但改结构 |
| `account/favorites` | `account/connections` | 合并为“我的缘分” |
| `account/messages` | `account/messages` | 保留，但改成更强运营流 |
| `account/privacy` | `account/safety` | 升级为独立安全页 |
| `account/events` | `account/activity` | 降为二级页，不做一级主入口 |

## 导航模型

### 顶部结构

不要再使用大 Hero。

统一改为：

1. `AccountShell`
2. `AccountTopSummary`
3. `AccountPrimaryNav`
4. 当前页面内容

### `AccountTopSummary` 结构

- 用户头像 / 昵称 / 当前身份
- 资料完整度
- 当前认证数
- 当前会员等级
- 快捷入口：
  - 去完善资料
  - 去认证
  - 去升级服务

这个模块是账户区唯一跨页常驻摘要，不再使用营销型大背景。

## 页面模块拆分

## 1. `我的资料` `/pages/account/profile`

### 页面职责

- 这是账户主入口
- 负责资料质量、择偶表达、公开展示质量
- 替代现在的 `overview`

### 页面模块

1. `ProfileSummaryCard`
   - 昵称、年龄、城市、身份标签
   - 资料完整度
   - 公开状态
   - 预览入口

2. `ProfileMediaManager`
   - 头像
   - 相册
   - 视频/形象视频
   - 排序与删除

3. `ProfileBaseInfoForm`
   - 基础资料
   - 教育、职业、居住、婚恋意向

4. `ProfilePromptSection`
   - 自我介绍
   - 问答题
   - 价值观/生活方式标签

5. `ProfileIntentSection`
   - 择偶方向
   - 关系目标
   - 家庭参与边界

6. `ProfileVisibilityCard`
   - 谁能看到我
   - 是否允许家庭协助可见
   - 是否对推荐池开放

7. `ProfileCompletionTasks`
   - 缺失字段列表
   - 完善后收益提示

8. `ProfilePreviewCard`
   - 当前公开资料预览
   - 跳转个人资料详情预览

### 组件拆分

```txt
src/components/account/profile/AccountProfileSummaryCard.vue
src/components/account/profile/AccountProfileMediaManager.vue
src/components/account/profile/AccountProfileBaseInfoForm.vue
src/components/account/profile/AccountProfilePromptSection.vue
src/components/account/profile/AccountProfileIntentSection.vue
src/components/account/profile/AccountProfileVisibilityCard.vue
src/components/account/profile/AccountProfileCompletionTasks.vue
src/components/account/profile/AccountProfilePreviewCard.vue
```

## 2. `认证中心` `/pages/account/verification`

### 页面职责

- 独立承接中国婚恋产品最核心的信任能力
- 不再埋在资料页或设置页里

### 页面模块

1. `VerificationOverview`
   - 已完成认证数
   - 认证等级
   - 认证收益说明

2. `VerificationGrid`
   - 实名认证
   - 学历认证
   - 婚况认证
   - 职业认证
   - 资产认证
   - 视频认证

3. `RiskCheckPanel`
   - 自身风险核查
   - 对方风险核查入口

4. `VerificationInvitePanel`
   - 邀请对方完成婚况/学历认证

5. `VerificationFAQ`
   - 审核时长
   - 资料用途
   - 隐私说明

### 组件拆分

```txt
src/components/account/verification/AccountVerificationOverview.vue
src/components/account/verification/AccountVerificationGrid.vue
src/components/account/verification/AccountRiskCheckPanel.vue
src/components/account/verification/AccountVerificationInvitePanel.vue
src/components/account/verification/AccountVerificationFAQ.vue
```

## 3. `我的缘分` `/pages/account/connections`

### 页面职责

- 合并当前收藏、互相喜欢、推荐对象、可共享对象
- 从“收藏管理”升级成“关系机会池”

### 页面模块

1. `ConnectionsFilterTabs`
   - 喜欢我的
   - 我喜欢的
   - 互相喜欢
   - 推荐对象
   - 家庭可见

2. `ConnectionsToolbar`
   - 城市筛选
   - 认证筛选
   - 在线状态筛选

3. `ConnectionList`
   - 列表卡
   - 认证状态
   - 家庭可见状态
   - 快捷动作：查看资料 / 发消息 / 申请交换方式

4. `ConnectionReasonPanel`
   - 为什么推荐
   - 匹配标签

5. `ConnectionEmptyState`
   - 空状态引导
   - 去完善资料 / 去认证 / 去活动

### 组件拆分

```txt
src/components/account/connections/AccountConnectionsFilterTabs.vue
src/components/account/connections/AccountConnectionsToolbar.vue
src/components/account/connections/AccountConnectionList.vue
src/components/account/connections/AccountConnectionCard.vue
src/components/account/connections/AccountConnectionReasonPanel.vue
src/components/account/connections/AccountConnectionEmptyState.vue
```

## 4. `消息` `/pages/account/messages`

### 页面职责

- 承接会话，不再混入大量说明卡
- 重点是沟通状态与信任状态

### 页面模块

1. `MessagesFilterTabs`
   - 全部
   - 未读
   - 已互相喜欢
   - 家庭协助

2. `MessageThreadList`
   - 会话头像
   - 最后一条消息
   - 未读
   - 认证标识
   - 是否可视频/可进一步联系

3. `MessageSafetyStrip`
   - 防骗提示
   - 风险核查快捷入口

4. `MessageEmptyState`
   - 去我的缘分
   - 去活动

### 组件拆分

```txt
src/components/account/messages/AccountMessagesFilterTabs.vue
src/components/account/messages/AccountMessageThreadList.vue
src/components/account/messages/AccountMessageThreadCard.vue
src/components/account/messages/AccountMessageSafetyStrip.vue
src/components/account/messages/AccountMessageEmptyState.vue
```

## 5. `隐私与安全` `/pages/account/safety`

### 页面职责

- 从“隐私设置”升级成“安全控制台”
- 这是中国婚恋产品必须单独强化的页

### 页面模块

1. `SafetyVisibilitySection`
   - 资料公开范围
   - 是否出现在推荐中
   - 是否允许家庭查看

2. `SafetyContactRules`
   - 谁可以联系我
   - 交换联系方式条件
   - 陌生人沟通边界

3. `SafetyFamilyAssistCard`
   - 家庭协助权限
   - 家庭代看边界

4. `SafetyRiskPanel`
   - 风险核查
   - 反诈提示
   - 可疑用户处理

5. `SafetyRecordsEntry`
   - 黑名单
   - 举报记录
   - 屏蔽记录

### 组件拆分

```txt
src/components/account/safety/AccountSafetyVisibilitySection.vue
src/components/account/safety/AccountSafetyContactRules.vue
src/components/account/safety/AccountSafetyFamilyAssistCard.vue
src/components/account/safety/AccountSafetyRiskPanel.vue
src/components/account/safety/AccountSafetyRecordsEntry.vue
```

## 6. `会员与服务` `/pages/account/membership`

### 页面职责

- 会员权益
- 红娘/人工服务
- 服务承诺

### 页面模块

1. `MembershipCurrentTierCard`
   - 当前会员
   - 到期时间
   - 已解锁能力

2. `MembershipBenefitsMatrix`
   - 免费 / 银 / 金 / 钻
   - 可联系人数
   - 可见权限
   - 认证加权

3. `MembershipServiceEntry`
   - 红娘服务
   - 人工牵线
   - 一对一咨询

4. `MembershipUpgradePlans`
   - 升级方案
   - 价格
   - 推荐档位

5. `MembershipTrustNotice`
   - 服务说明
   - 退款/权益说明

### 组件拆分

```txt
src/components/account/membership/AccountMembershipCurrentTierCard.vue
src/components/account/membership/AccountMembershipBenefitsMatrix.vue
src/components/account/membership/AccountMembershipServiceEntry.vue
src/components/account/membership/AccountMembershipUpgradePlans.vue
src/components/account/membership/AccountMembershipTrustNotice.vue
```

## 7. `我的活动` `/pages/account/activity`

### 页面职责

- 保留活动链路，但降级为二级页
- 不占一级导航主心智

### 页面模块

1. `ActivityStatusTabs`
   - 已报名
   - 待确认
   - 已完成

2. `ActivityList`
   - 活动卡片
   - 时间地点
   - 报名状态

3. `ActivityAftercarePanel`
   - 活动后跟进
   - 相关推荐对象

### 组件拆分

```txt
src/components/account/activity/AccountActivityStatusTabs.vue
src/components/account/activity/AccountActivityList.vue
src/components/account/activity/AccountActivityCard.vue
src/components/account/activity/AccountActivityAftercarePanel.vue
```

## 共享壳层模块

```txt
src/components/account/shell/AccountShell.vue
src/components/account/shell/AccountTopSummary.vue
src/components/account/shell/AccountPrimaryNav.vue
src/components/account/shell/AccountPageHeader.vue
src/components/account/shell/AccountSectionHeader.vue
```

## 账号页统一布局规则

### 页面骨架

```txt
AccountShell
  AccountTopSummary
  AccountPrimaryNav
  AccountPageHeader
  Main Content
```

### 布局原则

- 不再使用大 Hero
- 页面顶部第一屏必须可操作
- 主内容以纵向 section stack 为主
- 卡片只承担信息分组，不承担首页营销视觉

## Token 落点

### 直接复用 `next.semantic`

- `page`
- `surface`
- `text`
- `border`
- `action`
- `state`

### 建议新增 `next.component.account`

```json
{
  "account": {
    "completion": {},
    "verification": {},
    "service": {},
    "visibility": {},
    "risk": {},
    "connection": {}
  }
}
```

拆分原则：

- `completion`: 资料完整度、缺失引导、奖励提示
- `verification`: 认证状态、认证徽章、审核反馈
- `service`: 红娘/人工服务卡
- `visibility`: 公开、家庭可见、隐藏状态
- `risk`: 风险核查、反诈提示、警告模块
- `connection`: 匹配理由、关系状态、共享可见标签

## 一期实现顺序

1. `AccountShell` + `AccountTopSummary` + `AccountPrimaryNav`
2. `我的资料`
3. `认证中心`
4. `我的缘分`
5. `消息`
6. `隐私与安全`
7. `会员与服务`
8. `我的活动`

## 一期最小可上线版本

如果要先压缩范围，先上这五页：

1. `我的资料`
2. `认证中心`
3. `我的缘分`
4. `消息`
5. `隐私与安全`

暂缓：

- `会员与服务`
- `我的活动`

但即使暂缓，也不要恢复旧 `overview`。

# 页面关系说明

## 文档目的

这份文档说明当前项目里的真实页面、主导航关系和演示跳转关系。它面向主分支长期维护，不记录设计 token 迁移过程。

依据文件：

- [src/pages.json](../src/pages.json)
- [src/constants/nav.ts](../src/constants/nav.ts)
- [src/utils/navigation.ts](../src/utils/navigation.ts)
- [src/utils/demo-navigation.ts](../src/utils/demo-navigation.ts)

## 页面清单

### 公共品牌页

- `/pages/index`
  首页。站点主入口，承接品牌说明、核心能力、资料发现、活动和会员转化。
- `/pages/public/about`
  关于我们。说明平台定位、目标人群、服务边界和信任基础。
- `/pages/public/contact`
  联系我们。承接咨询、服务分流和联络信息。
- `/pages/public/membership`
  会员体系。展示会员权益、服务分层和注册/升级入口。

### 认证与注册页

- `/pages/auth/login`
  登录页。当前用于演示登录入口。
- `/pages/auth/register`
  注册页。承接免费注册、会员方案和 CTA 转化，支持 `?plan=` 参数。

### 发现页

- `/pages/discovery/self/index`
  本人视角资料列表。面向本人筛选候选资料。
- `/pages/discovery/self/detail`
  本人视角资料详情。通过 `?id=` 参数进入指定资料。
- `/pages/discovery/family/index`
  家庭视角资料列表。展示允许家庭辅助了解的资料。
- `/pages/discovery/family/detail`
  家庭视角资料详情。通过 `?id=` 参数进入指定资料。

### 账户页

- `/pages/account/profile`
  我的资料。当前账户入口，`openAccountPage()` 也落到这里。
- `/pages/account/verification`
  认证中心。承接实名、学历、婚况、职业等信任能力。
- `/pages/account/connections`
  我的缘分。承接收藏、推荐、互相喜欢和关系机会。
- `/pages/account/messages`
  消息。承接会话、未读状态和沟通入口。
- `/pages/account/safety`
  隐私与安全。承接资料可见性、联系规则、风险提示和安全控制。
- `/pages/account/membership`
  会员与服务。承接当前会员、权益、人工服务和升级入口。
- `/pages/account/activity`
  我的活动。承接报名、候补、已完成活动和活动后跟进。

### 活动页

- `/pages/events/index`
  活动列表。展示活动卡片和活动详情入口。
- `/pages/events/detail`
  活动详情。通过 `?id=` 参数进入指定活动。

### 辅助页

- `/pages/not-found`
  404 / 找不到页面。

## 全局导航

主导航由 `NAV_LIST` 统一配置，跳转逻辑走 `navigateByNavKey()`。

- `common.nav.about` -> `/pages/public/about`
- `common.nav.self` -> `/pages/discovery/self/index`
- `common.nav.family` -> `/pages/discovery/family/index`
- `common.nav.events` -> `/pages/events/index`
- `common.nav.membership` -> `/pages/public/membership`
- `common.nav.contact` -> `/pages/public/contact`

## 演示跳转入口

这些函数集中在 `src/utils/demo-navigation.ts`，用于页面 CTA、卡片和演示流程跳转。

- `openLoginPage()` -> `/pages/auth/login`
- `openRegisterPage(plan?)` -> `/pages/auth/register?plan=...`
- `openSelfDetail(id)` -> `/pages/discovery/self/detail?id=...`
- `openFamilyProfileDetail(id)` -> `/pages/discovery/family/detail?id=...`
- `openEventDetail(id)` -> `/pages/events/detail?id=...`
- `openAccountPage()` -> `/pages/account/profile`
- `openMyProfilePage()` -> `/pages/account/profile`
- `openActivityPage()` -> `/pages/account/activity`
- `openMessagesPage()` -> `/pages/account/messages`
- `openVerificationPage()` -> `/pages/account/verification`
- `openConnectionsPage()` -> `/pages/account/connections`
- `openSafetyPage()` -> `/pages/account/safety`
- `openMembershipPage()` -> `/pages/account/membership`

## 核心路径

### 访客了解平台

1. 进入首页。
2. 浏览关于我们、会员体系、家庭参与、活动或联系方式。
3. 从 CTA 进入注册页。

### 本人筛选对象

1. 从首页或主导航进入 `/pages/discovery/self/index`。
2. 浏览本人视角资料列表。
3. 进入 `/pages/discovery/self/detail?id=...`。
4. 根据资料信息进入注册、活动或后续账户流程。

### 家庭辅助了解

1. 从首页或主导航进入 `/pages/discovery/family/index`。
2. 浏览家庭可见资料。
3. 进入 `/pages/discovery/family/detail?id=...`。
4. 在授权边界内辅助理解候选人背景和关系节奏。

### 活动推进

1. 从首页或主导航进入 `/pages/events/index`。
2. 浏览活动列表。
3. 进入 `/pages/events/detail?id=...`。
4. 从活动详情进入注册或后续报名动作。

### 账户维护

1. 从注册、会员或其它账户 CTA 进入 `/pages/account/profile`。
2. 按需进入认证中心、我的缘分、消息、隐私与安全、会员与服务或我的活动。
3. 账户区以资料质量、信任认证、关系机会、沟通和安全边界为核心。

## 路由一致性要求

- 账户入口统一落到 `/pages/account/profile`。
- 账户活动页统一使用 `/pages/account/activity`。
- 账户关系机会页统一使用 `/pages/account/connections`。
- 账户隐私与安全页统一使用 `/pages/account/safety`。
- 新增页面时必须先更新 `src/pages.json`，再补充导航或演示跳转函数，最后同步更新本文档。

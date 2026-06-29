# 页面关系说明

本文档说明项目里的真实页面、主导航关系和页面跳转入口。

依据文件：

- [src/pages.json](../src/pages.json)
- [src/constants/nav.ts](../src/constants/nav.ts)
- [src/utils/navigation.ts](../src/utils/navigation.ts)

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

### 认证页

- `/pages/auth/login`
  登录页。
- `/pages/auth/register`
  注册页。

### 资料页

- `/pages/profiles/self/index`
  本人视角资料列表。
- `/pages/profiles/self/detail`
  本人视角资料详情，通过 `?id=` 进入指定资料。
- `/pages/profiles/family/index`
  家庭视角资料列表。
- `/pages/profiles/family/detail`
  家庭视角资料详情，通过 `?id=` 进入指定资料。

### 账户页

- `/pages/account/index`
  账户首页，聚合下一步动作、资料、活动、关系机会和账户摘要。
- `/pages/account/profiles`
  我的资料列表，管理本人或亲属资料。
- `/pages/account/profile-detail`
  账户中心统一档案详情与编辑页，通过 `?id=` 或 `?mode=create` 进入。
- `/pages/account/relationship`
  关系进展，承接收藏和私人介绍申请。
- `/pages/account/membership`
  会员与权益。
- `/pages/account/settings`
  账户设置、安全、身份绑定和服务偏好。
- `/pages/account/events`
  我的活动。

### 消息页

- `/pages/messages/index`
  消息中心，承接系统通知与通知详情。

### 活动页

- `/pages/events/index`
  活动列表。
- `/pages/events/detail`
  活动详情，通过 `?id=` 进入指定活动。

### 辅助页

- `/pages/not-found`
  404 页面。

### 调试页

- `/pages/debug/index`
  调试工具入口。
- `/pages/debug/*`
  只用于开发和测试环境。生产环境通过 route guard 禁用。

## 全局导航

主导航由 `NAV_LIST` 统一配置，跳转逻辑走 `navigateByNavKey()`：

- `common.nav.about` -> `/pages/public/about`
- `common.nav.self` -> `/pages/profiles/self/index`
- `common.nav.family` -> `/pages/profiles/family/index`
- `common.nav.events` -> `/pages/events/index`
- `common.nav.membership` -> `/pages/public/membership`
- `common.nav.contact` -> `/pages/public/contact`

## 页面跳转入口

这些函数集中在 `src/utils/navigation.ts`：

- `openLoginPage()` -> `/pages/auth/login`
- `openRegisterPage()` -> `/pages/auth/register`
- `openSelfDetail(id)` -> `/pages/profiles/self/detail?id=...`
- `openFamilyProfileDetail(id)` -> `/pages/profiles/family/detail?id=...`
- `openEventDetail(id)` -> `/pages/events/detail?id=...`
- `openAccountPage()` -> `/pages/account/index`
- `openMyProfilePage()` -> `/pages/account/profiles`
- `openAccountProfileDetail(id)` -> `/pages/account/profile-detail?id=...`
- `openAccountProfileCreate()` -> `/pages/account/profile-detail?mode=create`
- `openAccountEventsPage()` -> `/pages/account/events`
- `openMessagesPage()` -> `/pages/messages/index`
- `openInboxAction()` -> 根据受控 action code 进入账户资料、活动详情、私人介绍或会员页
- `openVerificationPage()` -> `/pages/account/profiles`
- `openConnectionsPage()` -> `/pages/account/relationship`
- `openAccountSettingsPage()` -> `/pages/account/settings`
- `openMembershipPage()` -> `/pages/account/membership`

## 核心路径

### 访客了解平台

1. 进入首页
2. 浏览关于我们、会员体系、活动和联系方式
3. 从 CTA 进入注册页

### 本人筛选对象

1. 进入 `/pages/profiles/self/index`
2. 浏览本人视角资料列表
3. 进入 `/pages/profiles/self/detail?id=...`
4. 根据资料信息进入注册、活动或后续账户流程

### 家庭主导推进

1. 进入 `/pages/profiles/family/index`
2. 浏览家庭可见资料
3. 进入 `/pages/profiles/family/detail?id=...`
4. 在授权边界内进行前期筛选与判断，并推动后续接触

### 活动推进

1. 进入 `/pages/events/index`
2. 浏览活动列表
3. 进入 `/pages/events/detail?id=...`
4. 从活动详情进入报名或后续动作

### 账户维护

1. 进入 `/pages/account/index`
2. 按需进入我的资料、关系、我的活动、会员或设置页面
3. 围绕资料质量、信任认证、关系机会、活动参与、会员权益和安全边界完成维护

### 消息查看

1. 进入 `/pages/messages/index`
2. 浏览通知线程
3. 查看线程详情并标记已读

## 路由一致性要求

- 账户入口统一使用 `/pages/account/index`
- 账户资料页统一使用 `/pages/account/profiles`
- 账户活动页统一使用 `/pages/account/events`
- 账户关系机会页统一使用 `/pages/account/relationship`
- 账户设置页统一使用 `/pages/account/settings`
- 消息中心统一使用 `/pages/messages/index`
- debug 页面只允许开发或测试环境访问
- 新增页面时先更新 `src/pages.json`，再补导航或跳转函数，最后同步本文档

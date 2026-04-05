# 页面关系说明

## 文档目的

这份文档只回答两件事：

- 当前项目里实际有哪些页面
- 这些页面之间现在是怎么跳转和串联的

它基于当前仓库里的真实路由、导航配置和演示跳转逻辑整理，不再沿用旧版页面命名。

## 当前页面结构

### 1. 公共品牌页

- `/pages/index`
  首页。站点主入口，承担品牌说明、核心能力展示、发现入口、会员入口和活动入口。
- `/pages/public/about`
  项目介绍页。说明这个相亲平台的定位、目标人群、差异点和价值观。
- `/pages/public/membership`
  会员体系页。展示免费会员、银卡、金卡、钻石会员和对应支持深度。
- `/pages/public/contact`
  联系页。承接咨询、服务分流和联络信息。

### 2. 发现与详情页

- `/pages/discovery/self/index`
  本人视角资料列表。面向普通用户浏览候选资料。
- `/pages/discovery/self/detail`
  本人视角资料详情。强调本人判断、匹配信息和关系推进线索。
- `/pages/discovery/family/index`
  家长视角资料列表。只展示允许家庭辅助了解的资料。
- `/pages/discovery/family/detail`
  家长视角资料详情。强调家庭可见边界、关系计划和协助信息。
- `/pages/events/index`
  活动列表页。展示活动卡片和报名入口。
- `/pages/events/detail`
  活动详情页。展示活动内容、报名状态和后续动作。

### 3. 认证与注册页

- `/pages/auth/login`
  登录页。当前属于演示流程入口之一。
- `/pages/auth/register`
  注册与选套餐页。承接免费注册、会员升级和部分 CTA 转化。

### 4. 用户账户页

- `/pages/account/index`
  账户总览。当前账号的总控页，强调“本人主导 + 家长协同边界”。
- `/pages/account/profile`
  我的资料。管理资料质量、可见范围和资料边界。
- `/pages/account/events`
  我的报名。查看已确认、候补和已完成的活动记录。
- `/pages/account/favorites`
  我的收藏。区分仅本人可见和可与家长共享的收藏资料。
- `/pages/account/messages`
  消息沟通。查看会话、未读状态和沟通边界。
- `/pages/account/privacy`
  隐私授权。管理顾问联系、家庭辅助和资料字段开放权限。

### 5. 辅助页

- `/pages/not-found`
  404 / 找不到页面。

## 全局导航关系

顶部和底部主导航统一来自 [nav.ts](/D:/uniapp/cupid-match/src/constants/nav.ts)。

当前主导航只覆盖公共品牌层：

- `common.nav.about` -> `/pages/public/about`
- `common.nav.profiles` -> `/pages/discovery/self/index`
- `common.nav.family` -> `/pages/discovery/family/index`
- `common.nav.events` -> `/pages/events/index`
- `common.nav.membership` -> `/pages/public/membership`
- `common.nav.contact` -> `/pages/public/contact`

主导航跳转统一走 [navigation.ts](/D:/uniapp/cupid-match/src/utils/navigation.ts) 的 `navigateByNavKey()`。

## 账户页内部关系

账户页之间的跳转统一走 [demo-navigation.ts](/D:/uniapp/cupid-match/src/utils/demo-navigation.ts)。

- 账户总览 -> 我的资料
- 账户总览 -> 我的报名
- 账户总览 -> 我的收藏
- 账户总览 -> 消息沟通
- 账户总览 -> 隐私授权
- 账户总览 -> 注册 / 升级

账户子页之间通过二级导航互跳：

- 账户总览
- 我的资料
- 我的报名
- 我的收藏
- 消息沟通
- 隐私授权

## 核心浏览路径

### 路径 1：普通访客先了解平台

1. 进入首页
2. 浏览项目介绍、会员资料、家庭参与、活动或会员体系
3. 进入资料详情或活动详情
4. 从 CTA 进入注册页

### 路径 2：普通用户本人筛选对象

1. 从首页或导航进入本人视角资料列表
2. 浏览资料卡片
3. 进入本人视角详情页
4. 根据资料质量和匹配方向决定收藏、活动或注册

### 路径 3：家长辅助了解资料

1. 从首页或导航进入家庭参与页
2. 浏览允许家长查看的资料
3. 进入家长视角详情页
4. 在授权边界内理解背景、节奏和家庭可参与部分

### 路径 4：活动推进

1. 从首页或导航进入活动列表
2. 浏览活动卡片
3. 进入活动详情
4. 从活动详情进入注册或后续报名动作

### 路径 5：用户进入账户流程

1. 从首页、会员页或其它 CTA 进入注册页
2. 从注册进入账户总览
3. 再进入资料、报名、收藏、消息或隐私子页

## 页面之间的实际跳转

### 首页相关

- 首页 CTA -> 注册页
- 首页模块入口 -> 项目介绍页 / 本人视角资料页 / 家长视角资料页 / 活动页 / 会员页

### 资料相关

- 本人视角资料列表 -> 本人视角资料详情
- 家长视角资料列表 -> 家长视角资料详情
- 收藏页中的普通收藏 -> 本人视角资料详情
- 收藏页中的家庭共享收藏 -> 家长视角资料详情
- 消息页 -> 本人视角资料详情

### 活动相关

- 活动列表 -> 活动详情
- 我的报名 -> 活动详情

### 注册与会员相关

- 会员页 CTA -> 注册页
- 首页 CTA -> 注册页
- Header / Footer Register CTA -> 注册页

### 账户相关

- 注册页 -> 账户总览
- 账户总览 -> 全部账户子页
- 账户子页二级导航 -> 其它账户子页

## 当前项目的页面语义

当前站点不是通用社交产品，而是一个带有明确婚恋意图的相亲平台前台演示站。

因此页面关系也遵循下面这套语义：

- 公共页负责建立平台定位和信任感
- 本人视角页负责筛选、判断和关系推进
- 家长视角页负责“有限辅助”，而不是替代本人
- 活动页负责把线上兴趣和关系判断带到线下
- 账户页负责把资料、收藏、活动、消息和隐私边界收口到同一套用户流程里

## 目前不在主链路，但后面可能补的页面

这些页面当前不是必需项，但未来若进入更完整业务阶段，可能需要：

- 搜索结果页
- 高级筛选页
- 单独聊天会话详情页
- 支付确认页
- 举报 / 拉黑页
- 审核后台页
- 顾问跟进记录页

## 相关文件

- [pages.json](/D:/uniapp/cupid-match/src/pages.json)
- [nav.ts](/D:/uniapp/cupid-match/src/constants/nav.ts)
- [navigation.ts](/D:/uniapp/cupid-match/src/utils/navigation.ts)
- [demo-navigation.ts](/D:/uniapp/cupid-match/src/utils/demo-navigation.ts)

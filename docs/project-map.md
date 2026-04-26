# 项目地图（产品 / 技术总览）

## 1. 项目一句话

`cupid-match` 是一个面向长期关系与真实相亲流程的婚恋平台前台原型，强调“筛选 -> 判断 -> 线下接触 -> 关系推进”，而不是泛社交或高频即时互动。

---

## 2. 项目要解决什么问题

这个项目不是在做一个普通的“在线聊天配对”产品，而是在解决婚恋流程里几个更现实的问题：

- 线上资料和聊天很难代表真实匹配度
- 传统相亲里家庭往往是前期筛选、判断与推进主力，但大多数产品没有支持这条路径
- 现有婚恋产品往往停留在浏览和沟通，缺少明确的关系推进机制

因此，这个项目把“家庭主导推进路径”和“线下活动路径”都纳入了产品主结构。

---

## 3. 产品定位

### 核心定位

- 目标是长期关系，不是泛社交
- 追求真实匹配，不追求高频即时互动
- 让线上筛选自然过渡到线下接触

### 目标区域

- 当前设计起点是巴黎和欧洲
- 结构上保留向更广泛用户群扩展的能力

### 核心角色

- 本人用户：自己浏览资料、做判断、参加活动、推进关系
- 家庭用户：由父母或家庭成员主导前期筛选、判断与推进，决定是否推动子女接触

---

## 4. 产品主结构

整个产品围绕三条主路径展开。

### 4.1 个人路径

适用于本人主动寻找对象的使用场景，核心动作包括：

- 浏览资料
- 筛选候选人
- 收藏与判断
- 参加活动
- 后续沟通与关系推进

### 4.2 家庭路径

适用于传统相亲里由家庭主导推进的场景，核心动作包括：

- 从家庭视角浏览资料
- 评估家庭背景与条件匹配，并主导推进节奏
- 判断并推动双方进一步接触

这条路径的特点是：家庭先判断并推动，再进入双方接触。

### 4.3 活动路径

活动是项目里非常关键的桥梁层，用来把线上筛选引导到真实接触。核心动作包括：

- 浏览活动
- 进入活动详情
- 报名与参与
- 活动后的关系延续

---

## 5. 当前页面地图

### 公共品牌页

- `/pages/index`：首页，承接品牌说明、核心能力、发现入口、活动入口、会员转化
- `/pages/public/about`：关于我们
- `/pages/public/contact`：联系我们
- `/pages/public/membership`：会员体系

### 认证页

- `/pages/auth/login`：登录
- `/pages/auth/register`：注册

### 发现页

- `/pages/profiles/self/index`：本人视角资料列表
- `/pages/profiles/self/detail`：本人视角资料详情
- `/pages/profiles/family/index`：家庭视角资料列表
- `/pages/profiles/family/detail`：家庭视角资料详情

### 活动页

- `/pages/events/index`：活动列表
- `/pages/events/detail`：活动详情

### 账户页

- `/pages/account/profile`：我的资料 / 账户主入口
- `/pages/account/verification`：认证中心
- `/pages/account/connections`：我的缘分
- `/pages/account/messages`：消息
- `/pages/account/safety`：隐私与安全
- `/pages/account/membership`：会员与服务
- `/pages/account/activity`：我的活动

### 辅助页

- `/pages/not-found`：404

---

## 6. 典型用户流

### 6.1 访客了解平台

首页 -> 关于 / 会员 / 联系 / 活动 -> 注册

### 6.2 本人主动筛选

首页或导航 -> 本人资料列表 -> 本人资料详情 -> 注册 / 活动 / 后续账户流程

### 6.3 家庭主导推进

首页或导航 -> 家庭资料列表 -> 家庭资料详情 -> 在授权边界内主导前期判断并推动后续接触

### 6.4 通过活动推进关系

首页或导航 -> 活动列表 -> 活动详情 -> 注册 / 后续报名动作

### 6.5 账户维护

账户主页 -> 认证 / 缘分 / 消息 / 安全 / 会员 / 活动

---

## 7. 当前实现状态

### 已完成

- 多语言前台页面
- 品牌与介绍体系
- 本人 / 家庭双视角资料浏览
- 活动展示结构
- 登录与注册基础流程
- 账户模块基础结构
- 页面数据链路重构为 `hooks + mappers + api/http`
- 本地 `json-server` mock server 接入

### 未完成

- 家庭之间的交互与决策机制
- 活动报名闭环
- 消息与撮合系统
- 权限控制与审核机制
- Rust 后端接入

当前阶段仍然是“结构验证完成的前台原型”，但前端数据边界已经收敛到正式的 HTTP API 形式。

---

## 8. 技术架构地图

### 技术栈

- `uni-app`
- `Vue 3`
- `TypeScript`
- `Pinia`
- `vue-i18n`
- `Tailwind CSS`
- `weapp-tailwindcss`
- `Vite`
- `json-server`

### 当前数据方式

项目当前没有真实业务后端，运行时统一通过本地 HTTP mock server 取数：

```txt
page -> hook -> mapper -> api client -> http -> mock-server
```

其中：

- 页面只消费 page VM
- hooks 负责异步状态和页面动作
- mappers 负责 DTO -> VM 转换
- `src/api/*/http.ts` 负责访问 `/api/...`
- `mock-server/server.js` 负责聚合、筛选、排序、分页和响应整形

已经不再存在运行中的 `src/composables`、`src/api/modules`、`src/mock` 数据链路。

---

## 9. 代码分层规则

### 页面层 `src/pages`

- 负责页面组合、事件绑定、表单状态、导航
- 不直接发起 HTTP 请求
- 不直接写复杂业务聚合逻辑

### hook 层 `src/hooks`

- 承接页面与 API 之间的业务逻辑
- 管理 `loading`、`error`、`refresh`
- 管理筛选、分页、提交等页面动作

### 接口层 `src/api`

- 定义 DTO、query、payload 和 client contract
- `http.ts` 负责 HTTP 调用
- `client.ts` 作为域入口暴露稳定接口

### 映射层 `src/mappers`

- 负责 DTO -> VM / page model 转换
- 不依赖页面组件
- 不直接发请求

### 展示层 `src/components`

- 只放 `.vue` 展示组件
- 不直接承载接口请求逻辑
- 不直接知道后端 schema

### 类型层 `src/types`

- 放跨组件、跨页面复用的展示类型和 view model 类型

### 全局状态 `src/stores`

- 存放跨页面共享状态，如登录状态、语言、主题
- 一般不直接承载接口请求

### mock server `mock-server`

- `db.json`：HTTP mock 的事实数据源
- `server.js`：聚合和接口整形逻辑
- `config.js`：服务配置

---

## 10. 关键开发约束

### 页面和数据约束

- 页面不要直接 import `@/api/*/http`
- 页面优先走 `types/vm -> mappers -> hooks -> page -> component`
- `src/api` 不依赖 `src/i18n`
- `i18n` 只负责界面文案和当前语言状态

### 组件约束

- `src/components` 下只放 Vue SFC
- 共享类型从 `src/types` 或 `src/types/vm` 引入

### 路由约束

- 新增页面时先更新 `src/pages.json`
- 再更新导航或演示跳转函数
- 最后同步更新 `docs/page-relationships.md`

### 设计 token 约束

业务代码只允许使用：

- `semantic-*`
- `component-*`
- `bg-gradient-*`
- `shadow-*`

禁止直接写颜色值、`text-*`、`palette-*` 或 token opacity 后缀。

### 提交规范

提交格式统一为：

`type(scope): description`

例如：

- `feat(home): 添加首页模块`
- `fix(api): 修正 profiles 列表请求参数`

---

## 11. 这个项目当前最重要的价值

从产品角度看，这个项目最特别的地方不在“页面多”，而在于它试图把婚恋流程结构化：

- 不是只做资料展示
- 不是只做消息沟通
- 而是在设计一条更接近现实相亲过程的推进链路

这条链路的核心支点有两个：

- 家庭路径
- 线下活动路径

如果后续继续演进，这两个部分会决定项目是否真正形成差异化。

---

## 12. 建议的后续优先级

如果按当前代码继续往前推进，建议优先顺序是：

1. 先补齐活动报名闭环，让“线上到线下”真正成立
2. 再明确家庭交互与决策机制，让家庭路径从浏览走向可执行推进
3. 然后补消息 / 撮合 / 权限审核
4. 最后把本地 `json-server` 契约逐步替换为真实 Rust 后端

这样可以先把产品核心机制跑通，再进入完整业务系统阶段。

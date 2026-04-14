# 项目结构说明

本文档记录当前前端项目的目录职责、代码分层和新增文件约定。项目目前没有真实后端，前端通过 `api -> mock` 的方式模拟接口，页面仍按正式接口调用链开发。

## 总体分层

当前推荐调用链：

```txt
Vue 页面
  -> composable / hook
    -> api module
      -> mock 数据
```

对应规则：

- 页面只负责页面组合、表单状态、事件绑定和导航。
- `src/composables` 负责业务状态、异步加载、筛选分页、页面 view-model。
- `src/api/modules` 负责接口形状、mock 适配和后续真实接口替换点。
- `src/mock` 只作为临时数据源，不应被页面、组件或 composable 直接引用。
- `src/components` 只放 `.vue` 展示组件，不再放业务 hook 或 `.types.ts`。
- 跨组件或跨页面复用的类型统一放在 `src/types`。

## 根目录

```txt
cupid-match/
  docs/                 项目文档
  scripts/              项目脚本，例如 i18n 检查、token 文档生成
  src/                  前端源码
  package.json          npm 脚本和依赖
  vite.config.ts        Vite + uni-app 配置
  tailwind.config.js    Tailwind / 设计 token 配置
  tsconfig.json         TypeScript 配置
```

## src 目录

```txt
src/
  api/                  接口层；当前内部读取 mock，后续替换真实后端
  components/           展示组件；只保留 .vue
  composables/          业务 hook / view-model
  constants/            全局常量
  i18n/                 多语言初始化、语言包和 i18n hook
  mock/                 临时 mock 数据源
  pages/                uni-app 页面
  static/               静态资源
  stores/               Pinia 状态管理
  types/                全局和跨模块类型
  utils/                通用工具函数
  App.vue               应用入口组件
  main.ts               uni-app 应用初始化
  manifest.json         uni-app manifest
  pages.json            页面路由配置
  uni.scss              全局样式变量
```

## api

```txt
src/api/
  mock-request.ts       mock 请求封装，模拟 ApiResult<T>
  types.ts              通用 API 类型
  modules/
    account.ts          账号中心接口
    auth.ts             登录/注册接口
    events.ts           活动接口
    profiles.ts         资料浏览与详情接口
```

当前 `api/modules/*` 可以引用 `src/mock`。后续接真实后端时，优先替换这里的实现，保持页面和 composable 的调用方式不变。

## composables

```txt
src/composables/
  account/
    use-account-data.ts
  auth/
    use-login.ts
    use-register.ts
  events/
    use-event-detail.ts
    use-events.ts
    use-home-preview-events.ts
  profiles/
    use-family-detail-view-model.ts
    use-family-directory.ts
    use-home-preview-profiles.ts
    use-profile-detail.ts
    use-self-detail-view-model.ts
    use-self-directory.ts
```

`composables` 是页面与 API 之间的业务层。这里可以维护 `loading`、`error`、`refresh`、筛选条件、分页状态和页面展示模型。

## components

```txt
src/components/
  about/
  account/
  common/
  contact/
  profile/
  events/
  home/
  layout/
  membership/
```

组件目录只放 Vue SFC。组件可以接收 view-model 类型的数据，但不直接访问 mock，也不直接承载接口请求逻辑。组件需要的共享类型从 `src/types` 引入。

## types

```txt
src/types/
  account-shell.ts
  contact.ts
  directory-card.ts
  events.ts
  family-directory.ts
  pinia-persist.d.ts
  profile-detail.ts
  self-directory.ts
```

放置跨组件、跨页面或跨 composable 使用的类型。新增类型时优先按业务域命名，例如 `events.ts`、`profile-detail.ts`；只有单个组件私有且不会复用的类型才考虑内联在 `.vue` 中。

## pages

```txt
src/pages/
  account/              账号中心页面
  auth/                 登录与注册页面
  profile/
    family/             家庭视角资料列表和详情
    self/               本人视角资料列表和详情
  events/               活动列表和详情
  public/               关于、联系、会员介绍等公开页面
  index.vue             首页
  not-found.vue         404 页面
```

页面应优先调用 `src/composables` 中的 hook，不直接读取 `src/mock`，也不把复杂筛选、数据聚合逻辑写在页面里。

## stores

```txt
src/stores/
  modules/
    auth.ts
    locale.ts
    theme.ts
  plugins/
    persisted-state.ts
```

`stores` 用于跨页面共享状态，例如登录状态、语言和主题。接口请求不要直接写在 store 里，除非它明确属于全局状态变更；一般仍通过 `api/modules` 和 `composables` 完成。

## mock

```txt
src/mock/
  business.ts
  events.ts
  shared.ts
```

mock 是无后端阶段的临时数据源。除 `src/api/modules/*` 外，不要新增对 `src/mock` 的直接引用。

## 新增功能流程

1. 先定义或复用 `src/types` 中的类型。
2. 在 `src/api/modules` 新增接口方法，当前可通过 `mockRequest()` 返回 mock 数据。
3. 在 `src/composables` 新增业务 hook，处理加载状态、错误状态和 view-model。
4. 页面调用 composable，组件只接收 props 和 emit 事件。
5. 如果新增页面，更新 `src/pages.json` 和 `docs/page-relationships.md`。
6. 完成后运行 `npm.cmd run type-check`。

## 当前结构检查点

- `src/components` 下不应存在 `.ts` 文件。
- 非 `src/api/modules` 文件不应直接 import `@/mock/...`。
- 页面不应直接调用 `mockRequest()`。
- API 返回结构优先使用 `ApiResult<T>`。
- 业务 hook 返回值优先保持 `loading`、`error`、`refresh` 这类一致命名。

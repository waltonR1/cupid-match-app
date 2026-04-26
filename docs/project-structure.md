# 项目结构说明

本文档记录当前前端项目的目录职责、代码分层和新增文件约定。当前项目没有真实业务后端，前端统一通过本地 `json-server` 暴露的 HTTP API 访问 mock 数据。

## 总体分层

当前推荐调用链：

```txt
page -> hook -> mapper -> api client -> http -> mock-server
```

对应规则：

- 页面负责页面组合、表单状态、事件绑定、导航和 i18n 展示文案。
- `src/hooks` 负责异步状态、页面动作、筛选分页和页面级数据组织。
- `src/mappers` 负责把 DTO 转成页面消费的 VM。
- `src/api/*` 负责接口 contract、HTTP 调用和域入口封装。
- `mock-server/*` 是唯一 mock 数据入口。
- `src/components` 只放 `.vue` 展示组件。
- `i18n` 只负责界面文案和当前语言状态；`api` / `mappers` / `utils` 不反向依赖 `i18n`。

## 根目录

```txt
cupid-match/
  docs/                 项目文档
  mock-server/          本地 HTTP mock server
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
  api/                  接口层；通过 HTTP 调用 mock-server
  components/           展示组件；只保留 .vue
  constants/            全局常量
  hooks/                页面 / 业务 hook
  i18n/                 多语言初始化、语言包和 i18n hook
  mappers/              DTO -> VM 转换
  pages/                uni-app 页面
  static/               静态资源
  stores/               Pinia 状态管理
  types/                类型定义；含 view model 等展示契约
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
  account/
    account.client.ts
    account.contract.ts
    account.http.ts
    account.types.ts
  auth/
    auth.client.ts
    auth.contract.ts
    auth.http.ts
    auth.types.ts
  events/
    events.client.ts
    events.contract.ts
    events.http.ts
    events.types.ts
  profiles/
    profiles.client.ts
    profiles.contract.ts
    profiles.http.ts
    profiles.types.ts
  shared/
    http.ts
```

约定：

- `*.types.ts` 放 DTO、query、payload、response 类型
- `*.contract.ts` 放域 API 接口
- `*.http.ts` 只负责访问 `/api/...`
- `*.client.ts` 作为外部稳定入口

`src/api` 不再包含 `mock.ts`、`provider.ts` 或 `api/modules/*` 旧链路文件。

## hooks

```txt
src/hooks/
  account/
  auth/
  events/
  profiles/
```

`hooks` 是页面与 API 之间的业务层。这里维护：

- `loading`
- `error`
- `refresh`
- 筛选 / 排序 / 分页动作
- 页面级数据组合

`hooks` 按业务资源目录聚合，页面优先从目录入口导入，例如 `@/hooks/profiles`。

## mappers

```txt
src/mappers/
  account/
  events/
  profiles/
```

`mappers` 负责把 API DTO 转成页面和组件消费的 view model。

规则：

- 只做结构映射和轻量业务格式整理
- 不直接访问 `uni.request`
- 不直接操作页面状态
- 不依赖 `src/i18n`

## utils

```txt
src/utils/
  account-format.ts
  display-name.ts
  locale-format.ts
  navigation.ts
  profile-format.ts
```

`utils` 放跨页面复用的纯工具函数，例如日期格式化、展示名处理、导航和部分通用格式化。

`utils` 不直接依赖 `src/i18n`；若需要 locale，仅接收 `'zh' | 'fr' | 'en'` 这类中性参数。

## components

```txt
src/components/
  about/
  account/
  common/
  contact/
  events/
  home/
  layout/
  membership/
  profiles/
```

组件目录只放 Vue SFC。组件可以接收页面组装后的展示数据，但不直接访问 HTTP 层，也不直接知道后端 schema。

## types

```txt
src/types/
  account/
    navigation.ts
  contact/
    view.ts
  declarations/
    pinia-persist.d.ts
  events/
    view.ts
  home/
    view.ts
  profiles/
    card.ts
    detail.ts
    directory.ts
  vm/
    account.ts
    events.ts
    profiles.ts
```

`types` 是类型根目录，按 feature 分组。`vm/*` 负责承接页面级 view model 契约。

## pages

```txt
src/pages/
  account/              账号中心页面
  auth/                 登录与注册页面
  profiles/
    family/             家庭视角资料列表和详情
    self/               本人视角资料列表和详情
  events/               活动列表和详情
  public/               关于、联系、会员介绍等公开页面
  index.vue             首页
  not-found.vue         404 页面
```

页面应优先调用 `src/hooks` 中的 hook，不直接调用 `src/api/*/http.ts`，也不把复杂筛选、数据聚合逻辑写在页面里。

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

`stores` 用于跨页面共享状态，例如登录状态、语言和主题。接口请求一般仍通过 `hooks + api` 完成，不直接堆进 store。

## mock-server

```txt
mock-server/
  db.json
  config.js
  server.js
```

`mock-server` 是当前唯一 mock 数据源。

- `db.json` 放事实数据
- `config.js` 放端口、前缀和默认账户等配置
- `server.js` 负责聚合逻辑、筛选、排序、分页和响应整形

前端禁止新增 `src/mock/*` 形式的数据直读文件。

## 新增功能流程

1. 先定义或复用 `src/types` / `src/types/vm` 中的类型。
2. 在 `src/api/<domain>` 新增或扩展接口类型和 HTTP 方法。
3. 在 `src/mappers/<domain>` 里补 DTO -> VM 转换。
4. 在 `src/hooks/<domain>` 里补页面级数据和动作。
5. 页面消费 hook，并在页面或展示组件中处理 i18n 文案。
6. 如果新增页面，更新 `src/pages.json` 和 `docs/page-relationships.md`。
7. 完成后运行 `npm.cmd run type-check`。

## 当前结构检查点

- `src/components` 下不应存在 `.ts` 文件。
- 页面不应直接 import `@/api/*/http`。
- 全项目不应再 import `@/mock/...`。
- 全项目不应再 import `@/composables/...` 或 `@/api/modules/...`。
- `api` / `mappers` / `utils` 不应直接 import `@/i18n/...`。
- 业务 hook 返回值优先保持 `loading`、`error`、`refresh` 这类一致命名。

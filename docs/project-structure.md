# 项目结构说明

本文档记录当前代码结构、目录职责和工程约定。

## 总体调用链

```text
page -> hook -> api -> mock-server
hook -> mapper
```

规则：

- 页面不直接发 HTTP 请求
- hook 负责请求状态和页面动作，可以调用 mapper 组装展示模型
- mapper 负责将接口响应转换为页面或组件可直接消费的展示模型
- API 只负责 HTTP 边界和类型
- mock-server 提供本地 `/api/...` HTTP 接口

## 根目录

```text
cupid-match-app/
  docs/
  mock-server/
  scripts/
  src/
  package.json
  tsconfig.json
  vite.config.ts
```

## src 目录

```text
src/
  api/
  config/
  components/
  constants/
  hooks/
  i18n/
  mappers/
  pages/
  static/
  stores/
  types/
  utils/
```

## api

```text
src/api/
  account/
    account.ts
    account.types.ts
    index.ts
  auth/
    auth.ts
    auth.types.ts
    index.ts
  debug/
  events/
    events.ts
    events.types.ts
    index.ts
  legal/
  messages/
  profiles/
    profiles.ts
    profiles.types.ts
    index.ts
  shared/
    http.ts
  upload/
```

约定：

- `*.types.ts` 放 payload、query、response 类型
- `*.ts` 放域请求方法
- `index.ts` 放模块统一出口，外部优先从 `@/api/<domain>` 导入
- `shared/http.ts` 放统一请求行为
- `src/config/app.ts` 放前端运行环境、API 地址、日志和 debug 开关

## hooks

```text
src/hooks/
  account/
  auth/
  common/
  events/
  legal/
  membership/
  messages/
  profiles/
```

职责：

- 管理 `loading`、`error`、`refresh`
- 发起 API 请求
- 维护筛选、排序、分页、详情加载等页面动作
- 调用 mapper 组装页面直接消费的数据结构

## mappers

`src/mappers` 放接口响应到展示模型的转换逻辑。

规则：

- 可以依赖 `src/api/*` 的 response 类型
- 可以依赖 `src/types/*` 的展示类型
- 可以接收 `t` 和 `locale` 处理前端 i18n 与展示格式
- 不发起请求
- 不持有 `ref`、`reactive` 或请求状态

### 通用请求状态

当 hook 存在“最新请求覆盖旧请求”的场景时，统一使用：

```text
src/hooks/common/useLatestRequest.ts
```

职责：

- 管理 `loading`
- 管理 `error`
- 管理 request token
- 忽略 stale request 的结果、错误和 finally

业务 hook 自己决定失败时是否清空列表、详情或保留旧数据。

## components

`src/components` 只放展示组件。

规则：

- 不直接发请求
- 不依赖后端 schema
- 只消费页面或 hook 提供的数据

## pages

`src/pages` 存放 uni-app 页面。

规则：

- 负责布局、绑定和跳转
- 负责读取 i18n 文案
- 可以在页面内用少量 `computed` 做展示级组装
- 不直接访问 `src/api/shared/http.ts`

## stores

`src/stores` 放跨页面共享状态，例如：

- 认证状态
- 语言
- 主题

## types

`src/types` 放跨页面复用的展示类型和声明文件，例如：

- `src/types/events/view.ts`
- `src/types/home/view.ts`
- `src/types/profiles/*`

## utils

`src/utils` 放无状态纯函数，例如：

- 本地化时间格式化
- profile 展示字段格式化
- account 文本格式化
- 导航函数

规则：

- 不直接依赖页面
- 不直接依赖 HTTP
- 不直接依赖 `@/i18n/...`
- 不持有 `ref`、`reactive` 或请求状态

## mock-server

```text
mock-server/
  db.json
  src/
    server.ts
    config.ts
    db.ts
    routes/
    services/
    types/
    utils/
```

职责：

- 提供 `/api/...` HTTP 接口
- 负责聚合、筛选、排序、分页和响应整形
- 为前端模拟接近真实后端的边界

## 新功能开发顺序

1. 先补 `src/api/<domain>/<domain>.types.ts`
2. 再补 `src/api/<domain>/<domain>.ts`
3. 如接口响应需要转换为展示模型，补 `src/mappers/*`
4. 然后在 `src/hooks/<domain>` 接入请求、页面状态和 mapper
5. 最后由页面消费 hook
6. 如涉及 mock 数据，同步更新 `mock-server/src/*` 和 `mock-server/db.json`

## 校验基线

- 页面不直接 import `@/api/shared/http.ts`
- 页面不直接发请求
- hook 负责页面级异步状态
- mapper 负责 response 到 view model 的转换
- `utils` 保持无状态纯函数
- `npm run type-check` 通过

# 项目地图

## 一句话

`cupid-match` 是一个面向长期关系与真实相亲流程的前端原型，重点不是高频聊天，而是“筛选 -> 判断 -> 线下接触 -> 关系推进”。

## 产品主路径

- 本人视角：浏览资料、筛选候选人、查看详情、参与活动。
- 家庭视角：从家庭立场筛选和判断，推动后续接触。
- 活动视角：用线下活动把线上资料浏览转成真实接触。
- 账户中心：维护资料、认证、消息、活动、会员与安全设置。

## 当前页面范围

- 公共页：`/pages/index`、`/pages/public/about`、`/pages/public/contact`、`/pages/public/membership`
- 认证页：`/pages/auth/login`、`/pages/auth/register`
- 资料页：`/pages/profiles/self/*`、`/pages/profiles/family/*`
- 活动页：`/pages/events/*`
- 账户页：`/pages/account/*`
- 兜底页：`/pages/not-found`

## 当前技术链路

当前前端已经收敛成单一链路：

```txt
page -> hook -> api -> mock-server
```

说明：

- 页面负责布局、交互绑定和展示。
- `src/hooks/*` 负责异步状态、分页筛选、少量页面数据组装。
- `src/api/*` 负责 DTO、请求方法和稳定 HTTP 边界。
- `mock-server/*` 负责 `/api/...` 路由、聚合、筛选、排序和分页。

## 当前目录事实

当前已经存在并在运行中的目录：

- `src/api`
- `src/hooks`
- `src/pages`
- `src/components`
- `src/stores`
- `src/utils`
- `mock-server`

已经退出运行链路的目录或层：

- `src/composables`
- `src/api/modules`
- `src/mock`
- `src/mappers`
- `src/types/vm`
- `api client / contract / provider` 额外分层

## API 结构

当前每个域只保留两类文件：

```txt
src/api/
  account/
    account.ts
    account.types.ts
  auth/
    auth.ts
    auth.types.ts
  events/
    events.ts
    events.types.ts
  profiles/
    profiles.ts
    profiles.types.ts
  shared/
    http.ts
    config.ts
```

约定：

- `*.types.ts` 放 DTO、query、payload、response 类型。
- `*.ts` 放域 API 方法。
- `src/api/shared/http.ts` 负责统一请求、错误处理和日志。

## Mock Server 事实

当前 mock 层不是内存 mock，也不是纯静态 JSON 直出，而是：

- `json-server` 作为底层数据访问与中间件能力
- `mock-server/server.js` 负责自定义 `/api/...` 路由
- `mock-server/db.json` 作为事实数据源
- `mock-server/config.js` 负责 host、port、前缀与日志开关

当前前端只通过 HTTP 访问：

- `GET /api/health`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `POST /api/auth/login`
- `POST /api/auth/register`

## 当前完成度

前端主链路重构已经完成：

- 旧 `composables / api modules / mock` 链路已退出
- 页面已切到 `hooks`
- API 已收敛到 `src/api/*/{domain}.ts`
- `mappers` 和 `types/vm` 已移除
- mock 运行时已统一走 `mock-server`

## 当前最小回归结果

最近一次最小回归已验证：

- `npm.cmd run type-check` 通过
- `GET /api/health` 正常
- `GET /api/profiles/self` 正常
- `GET /api/profiles/family` 正常
- `GET /api/profiles/:id` 正常
- `GET /api/events` 正常
- `GET /api/events/:id` 正常
- `GET /api/account/overview` 正常
- `POST /api/auth/login` 使用 mock 账号可正常返回 session

## 后续优先级

下一步不再是继续拆架构，而是：

1. 做页面级回归。
2. 整理并提交当前工作区。
3. 保持文档与当前结构同步。
4. 逐步用真实后端替换 `mock-server`。

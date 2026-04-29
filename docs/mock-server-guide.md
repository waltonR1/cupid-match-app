# Mock Server 说明

## 作用

当前前端运行链路是：

```txt
page -> hook -> api -> mock-server
```

`mock-server` 是当前唯一的 mock 数据入口。

## 当前实现方式

当前方案已经迁移为：

- `Fastify + LowDB mock-server`
- `mock-server/src/server.ts` 提供统一的 `/api/...` 自定义路由
- `mock-server/db.json` 提供事实数据

这意味着当前不是“纯资源表直出”，而是保留了一层轻量 BFF 风格的 mock server。

## 目录结构

```txt
mock-server/
  db.json
  src/
    server.ts
    config.ts
    db.ts
    types/
    routes/
    services/
    utils/
```

说明：

- `src/config.ts`：host、port、前缀、默认账户、请求日志和 dbPath
- `src/db.ts`：LowDB 初始化与访问
- `src/routes/*`：HTTP 路由层
- `src/services/*`：业务逻辑与聚合逻辑
- `src/utils/*`：分页、本地化、ID、字符串工具

## 默认配置

当前默认值：

```txt
apiPrefix = /api
host = 127.0.0.1
port = 52173
defaultAccountId = u-001
```

支持环境变量覆盖：

- `HOST`
- `PORT`
- `ENABLE_REQUEST_LOGGING`

## 启动方式

在项目根目录执行：

```bash
npm run mock:dev
```

一次性启动：

```bash
npm run mock:start
```

构建检查：

```bash
npm run mock:build
```

## 前端如何连接

前端默认 API 基地址在 [src/api/shared/config.ts](/D:/uniapp/cupid-match/src/api/shared/config.ts)：

- 默认值：`http://127.0.0.1:52173/api`
- 可通过 `VITE_API_BASE_URL` 覆盖

## 当前提供的接口

- `GET /api/ping`
- `GET /api/profiles/featured`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `POST /api/auth/login`
- `POST /api/auth/register`

其中：

- `profiles` 目录接口支持筛选、排序、分页和 facets
- `events/:id` 返回 `event + relatedProfiles`
- `account/overview` 是聚合接口
- `auth/register` 会写回 `mock-server/db.json`

## 最小回归

最近一次最小回归应至少覆盖：

- `GET /api/ping`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `POST /api/auth/login`

当前可用 mock 登录账号：

- `identity: lin@example.com`
- `password: password123`

## 和静态托管的关系

`mock-server` 仍然需要独立的 Node 进程。

原因：

- 前端静态托管只提供构建产物
- `mock-server` 依然需要单独启动
- 静态托管平台不会自动执行 `npm run mock:start`

因此：

- 本地开发和联调可以直接使用当前 `mock-server`
- 线上环境应改为独立部署后端，或直接接真实后端

# Mock Server 说明

## 作用

前端运行链路：

```text
page -> hook -> api -> mock-server
```

`mock-server` 是本地 `/api/...` HTTP 接口的提供方。

## 实现方式

mock 服务由以下部分组成：

- `Fastify + LowDB`
- `mock-server/src/server.ts` 提供统一的 `/api/...` 路由
- `mock-server/db.json` 提供事实数据

## 目录结构

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

说明：

- `src/config.ts`：host、port、前缀、默认账户、请求日志和 dbPath
- `src/db.ts`：LowDB 初始化与访问
- `src/routes/*`：HTTP 路由
- `src/services/*`：业务逻辑与聚合逻辑
- `src/utils/*`：分页、本地化、ID、字符串工具

## 默认配置

```text
apiPrefix = /api
host = 127.0.0.1
port = 52173
```

支持环境变量覆盖：

- `HOST`
- `PORT`
- `ENABLE_REQUEST_LOGGING`

## 启动方式

开发模式：

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

## 前端连接方式

前端默认 API 基地址位于 [src/api/shared/config.ts](/D:/uniapp/cupid-match/src/api/shared/config.ts)：

- 默认值：`http://127.0.0.1:52173/api`
- 可通过 `VITE_API_BASE_URL` 覆盖

## 提供的接口

- `GET /api/ping`
- `GET /api/profiles/featured`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/self/:id`
- `POST /api/profiles/self/:id/private-introduction`
- `POST /api/profiles/family/:id/private-introduction`
- `GET /api/debug/profile-access-preview/:profileType/:id`
- `GET /api/debug/private-introductions`
- `POST /api/debug/private-introductions/:id/accept`
- `POST /api/debug/private-introductions/:id/decline`
- `GET /api/profiles/family/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview?accountId=...`
- `POST /api/auth/login`
- `POST /api/auth/register`

说明：

- `profiles` 目录接口支持筛选、排序、分页和 facets
- `events/:id` 返回 `event + relatedProfiles`
- `account/overview` 是聚合接口
- `auth/register` 和私人介绍申请会写回 `mock-server/db.json`

## 最小回归范围

- `GET /api/ping`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/self/:id`
- `POST /api/profiles/self/:id/private-introduction`
- `POST /api/profiles/family/:id/private-introduction`
- `GET /api/debug/profile-access-preview/:profileType/:id`
- `GET /api/debug/private-introductions`
- `GET /api/profiles/family/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview?accountId=...`
- `POST /api/auth/login`

## 调试页面

- `/pages/debug/index`：调试工具总入口。
- `/pages/debug/private-introductions`：模拟私人介绍请求的接受与拒绝。
- `/pages/debug/profile-access-preview`：预览 self / family detail 在 Backend、Guest、Free、Member 下的字段展示差异。

可用 mock 登录账号：

- `identity: lin@example.com`
- `password: password123`

## 与静态托管的关系

`mock-server` 需要独立的 Node 进程。

原因：

- 前端静态托管只提供构建产物
- `mock-server` 负责 HTTP 路由和数据读写
- 静态托管平台不执行 `npm run mock:start`

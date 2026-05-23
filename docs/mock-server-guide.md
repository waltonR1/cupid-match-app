# Mock Server 说明

## 作用

前端运行链路：

```text
page -> hook -> api -> mock-server
```

`mock-server` 是本地 `/api/...` HTTP 接口的提供方，用于验证前端数据链路、API DTO 边界和当前业务规则。

## 实现方式

- `Fastify + LowDB`
- `mock-server/src/server.ts` 提供统一 `/api/...` 路由
- `mock-server/db.json` 提供事实数据

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

前端默认 API 基地址位于 [config.ts](/D:/uniapp/cupid-match/src/api/shared/config.ts)：

- 默认值：`http://127.0.0.1:52173/api`
- 可通过 `VITE_API_BASE_URL` 覆盖

## 接口

- `GET /api/ping`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/profiles/featured`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/self/:id`
- `GET /api/profiles/family/:id`
- `POST /api/profiles/self/:id/private-introduction`
- `POST /api/profiles/family/:id/private-introduction`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `GET /api/debug/profile-access-preview/:profileType/:id`
- `GET /api/debug/private-introductions`
- `POST /api/debug/private-introductions/:id/accept`
- `POST /api/debug/private-introductions/:id/decline`

## Auth 行为

可用 mock 登录账号：

- `identifier: lin@example.com`
- `password: password123`

`POST /api/auth/register` 只写入：

- `users`
- `auth_identities`
- `user_memberships`

注册不会创建 profile，不写 profile 字段，也不写 account city。`preferredLocale` 由前端当前语言自动传入，不是注册页手动字段。

当前 mock 请求上下文仍使用 `X-User-Id`。`AuthSession.token` 会返回并由前端保存，但暂时只是为后续 Authorization 预留的 mock placeholder。

## Profile 行为

- `profiles` 只保存结构化主表字段。
- `displayName`、`avatarUrl`、`age`、`isVerified`、`datingIntentionLabel` 由 mock-server 派生后进入 DTO。
- detail 权限遮罩默认来自 `mock-server/src/constants/profile-access.ts`，`profile_privacy_preferences` 只在默认规则之上继续隐藏半敏感字段。

## 调试页面

- `/pages/debug/index`：调试工具总入口。
- `/pages/debug/private-introductions`：模拟私人介绍请求的接受与拒绝。
- `/pages/debug/profile-access-preview`：预览 self / family detail 在 Backend、Guest、Free、Member 下的字段展示差异。

## 最小回归范围

- `GET /api/ping`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/self/:id`
- `GET /api/profiles/family/:id`
- `POST /api/profiles/self/:id/private-introduction`
- `POST /api/profiles/family/:id/private-introduction`
- `GET /api/debug/profile-access-preview/:profileType/:id`
- `GET /api/debug/private-introductions`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`

## 与静态托管的关系

`mock-server` 需要独立的 Node 进程。

原因：

- 前端静态托管只提供构建产物。
- `mock-server` 负责 HTTP 路由和数据读写。
- 静态托管平台不执行 `npm run mock:start`。

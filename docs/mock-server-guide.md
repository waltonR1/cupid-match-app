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

Render 演示后端可使用 `--render` 启动参数切换到 `0.0.0.0` 监听，并默认关闭 request logging。

## 启动方式

开发模式：

```bash
npm run mock:dev
```

一次性启动：

```bash
npm run mock:start
```

Render Node Web Service 启动：

```bash
npm run start:render
```

Render 配置时使用：

- Root Directory: `mock-server`
- Build Command: `npm install`
- Start Command: `npm run start:render`

构建检查：

```bash
npm run mock:build
```

## 前端连接方式

前端默认 API 基地址位于 [app.ts](/D:/uniapp/cupid-match/src/config/app.ts)：

- 默认值：`http://127.0.0.1:52173/api`
- 可通过 `VITE_API_BASE_URL` 覆盖

## 接口范围

接口契约以 [final-api-contract.md](./final-api-contract.md) 为准。当前 mock-server 已覆盖这些业务域：

- `ping`
- `auth`
- `legal`
- `profiles`
- `events`
- `account`
- `membership`
- `favorites`
- `private introductions`
- `inbox`
- `upload`
- `debug`

## Auth 行为

可用 mock 登录账号：

- `identifier: lin@example.com`
- `password: password123`

`POST /api/auth/register` 只写入：

- `users`
- `auth_identities`
- `user_memberships`
- `user_preferences`
- `user_agreement_acceptances`

注册不会创建 profile，不写 profile 字段，也不写 account city。`preferredLocale` 由前端当前语言自动传入，不是注册页手动字段。

development / staging mock 请求上下文仍可使用 `X-User-Id`。production 前端会把 `AuthSession.token` 作为 `Authorization: Bearer <token>` 发送。当前 mock token 不是安全 JWT；RuoYi 后端应替换为可校验 JWT 或同等 Bearer token，并实现过期、刷新和权限解析。

## Profile 行为

- `profiles` 只保存结构化主表字段。
- `displayName`、`avatarUrl`、`age`、`isVerified`、`datingIntentionLabel` 由 mock-server 派生后进入 DTO。
- detail 权限遮罩默认来自 `mock-server/src/constants/profile-access.ts`，`profile_privacy_preferences` 只在默认规则之上继续隐藏半敏感字段。

## 调试页面

- `/pages/debug/index`：调试工具总入口。
- `/pages/debug/events`：活动数据和报名状态调试。
- `/pages/debug/inbox`：消息中心数据调试。
- `/pages/debug/private-introductions`：模拟私人介绍请求的接受与拒绝。
- `/pages/debug/profile-access-preview`：预览 self / family detail 在 Backend、Guest、Free、Member 下的字段展示差异。
- `/pages/debug/profile-photos`：profile 照片审核状态调试。
- `/pages/debug/profile-verifications`：profile 认证审核调试。

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
- `GET /api/account/dashboard`
- `GET /api/account/settings`
- `POST /api/account/security/challenge-code`
- `POST /api/account/security/challenge`
- `GET /api/inbox/threads`

## 与静态托管的关系

`mock-server` 需要独立的 Node 进程。

原因：

- 前端静态托管只提供构建产物。
- `mock-server` 负责 HTTP 路由和数据读写。
- 静态托管平台不执行 `npm run mock:start`。

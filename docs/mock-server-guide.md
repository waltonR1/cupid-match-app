# Mock Server 说明

## 作用

当前前端运行链路是：

```txt
page -> hook -> api -> mock-server
```

`mock-server` 是当前唯一 mock 数据入口。

## 当前实现方式

当前方案是：

- `json-server` 提供底层数据访问和中间件能力
- `mock-server/server.js` 提供统一的 `/api/...` 自定义路由
- `mock-server/db.json` 提供事实数据

这意味着当前不是“纯资源表直出”，而是带一层轻量 BFF 的 mock server。

## 目录结构

```txt
mock-server/
  config.js
  db.json
  profiles.js
  server.js
  utils.js
```

说明：

- `config.js`：host、port、前缀、默认账户、请求日志开关
- `db.json`：mock 数据源
- `profiles.js`：profiles 目录筛选、排序和 facets 逻辑
- `server.js`：统一 `/api/...` 路由与聚合接口
- `utils.js`：mock-server 内部通用工具

## 默认配置

当前默认值：

```js
const apiPrefix = '/api'
const defaultHost = '127.0.0.1'
const defaultPort = 52173
const defaultAccountId = 'u-001'
const enableRequestLogging = true
```

支持环境变量覆盖：

- `HOST`
- `PORT`

## 启动方式

在项目根目录执行：

```powershell
node mock-server/server.js
```

监听模式：

```powershell
node --watch mock-server/server.js
```

## 前端如何连接

前端默认 API 基址在 [src/api/shared/config.ts](/D:/uniapp/cupid-match/src/api/shared/config.ts)：

- 默认值：`http://127.0.0.1:52173/api`
- 可通过 `VITE_API_BASE_URL` 覆盖

## 当前提供的接口

- `GET /api/health`
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
- `events/:id` 会返回 `event + relatedProfiles`
- `account/overview` 是聚合接口
- `auth` 接口负责 session 返回和注册落库

## 已验证的最小回归

最近一次最小回归已验证：

- `GET /api/health`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `POST /api/auth/login`

当前可用的 mock 登录账号：

- `identity: lin@example.com`
- `password: password123`

## 和静态托管的关系

`mock-server` 不能只靠前端静态托管生效。

原因：

- 前端静态托管只会提供构建产物
- `mock-server` 仍然需要一个 Node 进程
- 静态托管平台不会自动执行 `node mock-server/server.js`

因此：

- 本地开发和联调可以直接使用当前 `mock-server`
- 线上环境应改为单独部署后端，或直接接真实后端

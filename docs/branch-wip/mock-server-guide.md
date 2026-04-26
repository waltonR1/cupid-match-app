# Mock Server 说明

本文档说明当前分支里的 `mock-server/` 是什么、怎么启动、它提供哪些接口，以及它和静态托管的关系。

## 作用

当前前端已经不再直接依赖 `src/mock/*`。

现在的本地开发链路是：

`page -> hook -> mapper -> api client -> http -> mock-server`

这里的 `mock-server` 现在不是纯手写 Node `http` 服务，而是：

- `json-server` 负责 `db.json` 读写和基础中间件
- 自定义路由负责当前项目的 BFF / 聚合接口

这样做的目的有两个：

- 保留 `json-server` 的轻量数据存取能力
- 继续让前端只面对稳定的 `/api/...` 接口，而不是把聚合逻辑塞回页面

## 文件结构

`mock-server/` 目录当前包含：

- `server.js`
  启动入口，也是所有自定义接口路由的统一入口。
- `config.js`
  导出 `apiPrefix`、`host`、`port`、`defaultAccountId`、`enableRequestLogging` 等配置。
- `db.json`
  mock 数据源。
- `profiles.js`
  `profiles` 目录页相关的筛选、排序、分页、facets 逻辑。
- `utils.js`
  展示名、会话结构、关联资料等通用小工具。

## 当前实现结构

当前 `server.js` 的结构是：

1. `jsonServer.create()`
2. `jsonServer.router(dbPath)`
3. `jsonServer.defaults()`
4. `jsonServer.bodyParser`
5. 自定义 `/api/...` 路由

这里虽然用了 `json-server`，但当前业务接口不是直接暴露资源表，而是全部走自定义路由统一输出。

换句话说：

- `router.db` 只作为数据访问层
- 对外接口形状仍然由我们自己控制

## 当前配置

当前 `config.js` 默认配置是：

```js
const apiPrefix = '/api'
const defaultHost = '127.0.0.1'
const defaultPort = 52173
const defaultAccountId = 'u-001'
const enableRequestLogging = true
```

说明：

- `apiPrefix`
  当前所有接口前缀，默认 `/api`
- `port`
  本地监听端口，当前是 `52173`
- `defaultAccountId`
  `GET /api/account/overview` 未传 `accountId` 时的默认账户
- `enableRequestLogging`
  是否在启动 `mock-server` 的终端里打印请求日志

其中：

- `HOST`
  可以覆盖默认监听地址
- `PORT`
  可以覆盖默认监听端口

## 启动方法

在项目根目录执行：

```powershell
npm.cmd run mock:server
```

监听文件变更模式：

```powershell
npm.cmd run mock:server:watch
```

当前 `package.json` 对应的是：

- `mock:server`: `node mock-server/server.js`
- `mock:server:watch`: `node --watch mock-server/server.js`

正常启动后，终端会打印：

```text
Mock server started on http://127.0.0.1:52173
Health: http://127.0.0.1:52173/api/health
```

## 前端如何连到它

前端默认请求基址在 [src/api/shared/config.ts](../../src/api/shared/config.ts)：

- 默认值：`http://127.0.0.1:52173/api`
- 也可以用 `VITE_API_BASE_URL` 覆盖

当前前端请求日志开关也在这个文件里。

## 当前提供的接口

### 健康检查

- `GET /api/health`

### Profiles

- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`

其中：

- `self` / `family` 目录接口支持筛选、排序、分页
- 返回结构包含 `items`、`pagination`、`facets`

### Events

- `GET /api/events`
- `GET /api/events/:id`

其中 `events/:id` 会返回：

- `event`
- `relatedProfiles`

### Account

- `GET /api/account/overview`

这是聚合接口，会把这些内容拼成一个响应：

- `account`
- `profile`
- `userEvents`
- `favorites`
- `threads`
- `privacySettings`

### Auth

- `POST /api/auth/login`
- `POST /api/auth/register`

其中：

- `login` 返回 `token + user`
- `register` 当前会把 `role/email/password/nickName/city` 写入 `db.json`
- `register.role` 目前只用于注册落库，暂时不继续进入登录响应、账户展示或权限逻辑

## 为什么这样比纯手写 server 更合适

当前这套 `json-server + 自定义路由` 比纯手写 server 更适合这个阶段，原因是：

- `db.json` 的读写和持久化交给 `json-server`
- 中间件和 body parser 不需要自己维护
- 业务接口仍然可以自由聚合
- 前端接口契约不需要跟着资源表形状变化

这意味着它比纯 `json-server` 直出更干净，也比全手写 mock server 更省维护成本。

## 能不能直接部署到纯静态托管

不能直接指望它生效。

原因很简单：

- 前端静态托管只能托管打包后的 HTML / JS / CSS / 静态资源
- `mock-server` 仍然是 Node 进程
- 静态托管平台不会帮你运行 `node mock-server/server.js`

所以：

- 只上传前端静态文件：页面可以打开，但 `/api/...` 请求会失败
- 想让当前 mock 链路生效：还需要一个能运行 Node 的服务环境

## 如果要部署，有哪几种方式

### 方式 1：前后分开部署

- 前端部署到静态托管
- `mock-server` 部署到一台能跑 Node 的服务上
- 前端用 `VITE_API_BASE_URL` 指向那台服务

这是最直接的方式。

### 方式 2：把 mock-server 改成平台支持的 Serverless / Functions

适合部署到带函数能力的平台，但这已经不是“直接静态托管”了。

### 方式 3：直接换真实后端

如果后续要接 Rust API，生产环境更合理的做法是：

- 前端静态托管
- 后端单独部署
- 不再把 `mock-server` 当线上依赖

## 当前建议

当前 `mock-server` 更适合：

- 本地开发
- 联调前的稳定前端数据源
- 在真实后端未接入前维持接口边界

不建议把它当成长期线上方案。

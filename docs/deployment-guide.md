# Deployment Guide

本文用于部署前检查和本地部署演练。当前仓库包含 H5 前端和本地 mock-server 两个运行单元；mock-server 只用于验证业务链路和 API contract，不是生产后端。

## 运行单元

| 单元 | 用途 | 部署方式 |
| --- | --- | --- |
| H5 前端 | uni-app / Vue 页面 | 静态构建产物 |
| mock-server | 本地 API、DTO、权限、账户安全流程验证 | 独立 Node 服务，仅用于开发和演示 |

生产后端需要复刻当前 API contract 和领域规则，并替换 mock 鉴权、LowDB、验证码、上传、支付、审计等能力。

## 环境文件

根目录提供三套环境文件：

| 文件 | 用途 |
| --- | --- |
| `.env.development` | 本地开发，默认连接本地 mock-server，允许 debug。 |
| `.env.staging` | 测试部署，默认关闭 API 日志，允许 debug。 |
| `.env.production` | 商用部署，关闭 API 日志并禁用 debug。 |

需要本机私有覆盖时使用 `.env.local` 或对应 mode 的 local 文件；`*.local` 已被 `.gitignore` 忽略。

## 前端配置

统一入口：[src/config/app.ts](/D:/uniapp/cupid-match/src/config/app.ts)

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `VITE_APP_ENV` | dev 为 `development`，build 为 `production` | 应用运行环境：`development` / `staging` / `production`。 |
| `VITE_API_BASE_URL` | `http://127.0.0.1:52173/api` | 前端 API 基地址。 |
| `VITE_API_ENABLE_LOGGING` | `false` | 是否在前端 console 输出 API 日志。 |
| `VITE_ENABLE_DEBUG` | 非 production 默认开启 | 是否允许访问 `/pages/debug/*`。商用环境必须为 `false`。 |

生产示例：

```env
VITE_APP_ENV=production
VITE_API_BASE_URL=https://api.example.com/api
VITE_API_ENABLE_LOGGING=false
VITE_ENABLE_DEBUG=false
```

测试示例：

```env
VITE_APP_ENV=staging
VITE_API_BASE_URL=http://127.0.0.1:52173/api
VITE_API_ENABLE_LOGGING=false
VITE_ENABLE_DEBUG=true
```

## mock-server 配置

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | mock-server 监听地址。 |
| `PORT` | `52173` | mock-server 监听端口。 |
| `ENABLE_REQUEST_LOGGING` | `true` | 是否输出请求日志。 |

Render 演示后端使用启动参数切换监听策略：

```bash
npm run start:render
```

`start:render` 会通过 `--render` 让 `mock-server/src/config.ts` 使用 `0.0.0.0`，并默认关闭 request logging。Render 会注入 `PORT`，不需要手动写死端口。

默认健康检查：

```text
GET http://127.0.0.1:52173/api/ping
```

## Render 演示后端

当前 `mock-server` 可以部署为 Render Node Web Service，用于演示和前端联调。

Render 配置：

| 配置项 | 值 |
| --- | --- |
| Root Directory | `mock-server` |
| Build Command | `npm install` |
| Start Command | `npm run start:render` |

注意：Start Command 必须是 `npm run start:render`，不是 `npm start:render`。

Render 演示后端仍然属于 mock 边界：LowDB、mock token、本地上传、验证码、支付占位都不能视为生产后端能力。

## 本地开发

安装依赖：

```bash
npm install
```

启动 mock-server：

```bash
npm run mock:start
```

启动 H5 开发环境：

```bash
npm run dev:h5
```

默认访问：

```text
http://localhost:5173
```

## 构建

本地默认 H5 构建：

```bash
npm run build:h5
```

测试部署构建：

```bash
npm run build:h5:staging
```

商用部署构建：

```bash
npm run build:h5:production
```

构建产物：

```text
dist/build/h5
```

## 部署前检查

每次部署前至少运行：

```bash
npm run type-check
npm run check:i18n
npm run build:h5:production
```

如果改动 mock-server：

```bash
npm run mock:build
```

如果改动 token 定义或生成逻辑：

```bash
npm run generate:token-docs
```

## 商用发布清单

发布前逐项确认：

- `.env.production` 中的 `VITE_API_BASE_URL` 已替换为真实生产 API 域名，不是 `https://api.example.com/api`。
- `.env.production` 中 `VITE_ENABLE_DEBUG=false`。
- `.env.production` 中 `VITE_API_ENABLE_LOGGING=false`。
- `npm run build:h5:production` 构建成功。
- 构建产物中不应包含本地 mock API 地址 `http://127.0.0.1:52173/api`。
- 生产环境访问 `/pages/debug/*` 会进入 not-found。
- 生产环境浏览器 console 不输出 `[API]` 请求日志。
- 生产后端已实现当前前端调用的 API contract。

说明：

- Debug 页面代码可能仍以异步 chunk 形式存在于 H5 构建产物中；生产环境依赖 route guard 阻止访问。
- API 日志代码字符串可能仍存在于构建产物中；生产环境依赖 `VITE_API_ENABLE_LOGGING=false` 阻止执行输出。
- `src/config/app.ts` 会在 production 环境阻止缺失或仍使用 `api.example.com` 占位的 API 地址。

## Debug 页面

`/pages/debug/*` 可以保留在 `pages.json`。商用环境通过 `VITE_ENABLE_DEBUG=false` 禁用，route guard 会将 debug 路由拦截到 not-found。

禁止在生产环境打开：

```env
VITE_ENABLE_DEBUG=true
```

## 当前非生产能力

以下能力仍属于 prototype / mock 边界，不能视为生产实现：

- development / staging 可继续使用 `X-User-Id` 作为 mock request context；production 前端发送 `Authorization: Bearer <token>`。
- mock `AuthSession.token` 不是生产 JWT；RuoYi 后端应返回可校验 JWT 或同等 Bearer token。
- password hash 是 mock hash，不是生产密码哈希方案。
- 验证码只用于本地链路验证，不接真实邮件、短信或微信。
- 上传文件由 mock-server 本地目录托管，不是对象存储。
- 会员升级是流程占位，不接真实支付。
- LowDB 不提供生产级事务、并发控制、审计、备份和权限隔离。

## 最小冒烟路径

部署演示环境至少检查：

1. 登录：`lin@example.com / password123`
2. 导航、主题、语言切换。
3. self profile 列表和详情。
4. family profile 列表和详情。
5. events 列表、详情、报名、取消。
6. account 首页、资料、关系、活动、会员、设置。
7. account settings 中身份绑定、MFA、敏感操作验证码弹窗。
8. messages / inbox 通知列表与详情。
9. production 环境访问 `/pages/debug/*` 会进入 not-found。

## 相关文档

- [README.md](./README.md)
- [project-map.md](./project-map.md)
- [project-structure.md](./project-structure.md)
- [mock-server-guide.md](./mock-server-guide.md)
- [final-database-schema.md](./final-database-schema.md)
- [final-api-contract.md](./final-api-contract.md)
- [final-page-fields.md](./final-page-fields.md)
- [final-data-flow-contract.md](./final-data-flow-contract.md)

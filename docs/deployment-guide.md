# Deployment Guide

本文用于部署前检查和本地部署演练。它描述当前项目如何构建、如何连接本地 mock API、哪些能力仍属于 prototype 边界。

## 部署边界

当前仓库包含两个运行单元：

| 单元 | 作用 | 部署方式 |
| --- | --- | --- |
| H5 前端 | uni-app / Vue 页面 | 静态构建产物 |
| mock-server | 本地 API、领域规则验证、LowDB 数据读写 | 独立 Node 服务 |

`mock-server` 是 high-fidelity business mock，不是生产后端。它用于验证 API contract、DTO、权限遮罩、账户安全流程和页面链路。正式生产后端应复刻当前 API contract 和领域规则，并替换 mock 鉴权、存储、安全、审计和支付能力。

## 环境变量

前端：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://127.0.0.1:52173/api` | 前端 API 基地址。 |
| `VITE_API_ENABLE_LOGGING` | `true` | 是否在前端 console 输出 API 日志。部署演示环境建议设为 `false`。 |

mock-server：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | mock-server 监听地址。 |
| `PORT` | `52173` | mock-server 监听端口。 |
| `ENABLE_REQUEST_LOGGING` | 默认开启 | 是否输出请求日志。 |

## 本地部署演练

安装依赖：

```bash
npm install
```

启动 mock-server：

```bash
npm run mock:start
```

另一个终端启动 H5 开发环境：

```bash
npm run dev:h5
```

默认访问：

```text
http://localhost:5173
```

默认 mock API：

```text
http://127.0.0.1:52173/api
```

健康检查：

```text
GET http://127.0.0.1:52173/api/ping
```

## 构建

前端 H5 构建：

```bash
npm run build:h5
```

构建产物：

```text
dist/build/h5
```

mock-server TypeScript 构建检查：

```bash
npm run mock:build
```

## 部署前检查

每次部署前至少运行：

```bash
npm run type-check
npm run mock:build
npm run check:i18n
npm run build:h5
```

如果改动了 token 文档或 token 生成逻辑，再运行：

```bash
npm run generate:token-docs
```

## 最小冒烟路径

部署演示环境至少检查：

1. 登录：`lin@example.com / password123`
2. 首页导航与语言切换。
3. self profile 列表、detail、收藏、私人介绍申请。
4. family profile 列表、detail。
5. events 列表、detail、报名与取消。
6. account 首页、资料、关系、活动、会员、设置。
7. account settings 中身份绑定、MFA、敏感操作验证码弹窗。
8. messages / inbox 通知列表与详情。
9. debug 入口仅在演示或开发环境使用。

## 当前非生产能力

以下能力不应被误认为生产实现：

- `X-User-Id` 是 mock request context，不是正式鉴权。
- `AuthSession.token` 当前为占位 token，不是生产 Authorization 策略。
- password hash 是 mock hash，不是正式密码哈希方案。
- 验证码只用于本地验证链路，不接真实邮件、短信或微信。
- 上传文件由 mock-server 本地目录托管，不是对象存储。
- 会员升级是流程占位，不接真实支付。
- LowDB 不提供生产级事务、并发控制、审计、备份和权限隔离。

## 文档入口

部署和验收时优先阅读：

1. [README.md](./README.md)：文档索引。
2. [project-map.md](./project-map.md)：当前产品路径和页面范围。
3. [project-structure.md](./project-structure.md)：代码分层和工程边界。
4. [mock-server-guide.md](./mock-server-guide.md)：mock-server 使用方式。
5. [final-database-schema.md](./final-database-schema.md)：目标数据库契约。
6. [final-api-contract.md](./final-api-contract.md)：目标 API 契约。
7. [final-page-fields.md](./final-page-fields.md)：目标页面字段契约。
8. [final-data-flow-contract.md](./final-data-flow-contract.md)：跨层数据流契约。

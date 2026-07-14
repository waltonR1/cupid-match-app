# cupid-match-app

一个面向长期关系与真实相亲流程的婚恋平台前台原型。

## 关联仓库

| 仓库 | 职责 | 生产平台 |
| --- | --- | --- |
| [cupid-match-server](https://github.com/waltonR1/cupid-match-server) | Java API、认证、支付、存储与后台任务 | Render |
| [cupid-match](https://github.com/waltonR1/cupid-match) | 当前仓库，C 端 uni-app / Vue H5 | Cloudflare Pages |
| [cupid-match-admin](https://github.com/waltonR1/cupid-match-admin) | Vue 3 运营后台 | Cloudflare Pages |

三仓统一部署说明见 [cupid-match-server/doc/cm-production-deployment.md](https://github.com/waltonR1/cupid-match-server/blob/master/doc/cm-production-deployment.md)。

## 技术栈

- `uni-app`
- `Vue 3`
- `TypeScript`
- `Pinia`
- `vue-i18n`
- `Tailwind CSS`
- `weapp-tailwindcss`
- `Vite`

## 调用链

项目采用以下调用链：

```text
page -> hook -> api -> Java backend
```

## 目录概览

```text
docs/         项目文档
mock-server/  本地 mock 服务
scripts/      工程脚本
src/          前端源码
```

`src/` 主要分层：

```text
src/api         接口适配层
src/components  展示组件
src/constants   常量
src/hooks       有状态业务逻辑
src/i18n        多语言文案与语言状态
src/mappers     接口响应到展示模型的转换
src/pages       页面层
src/stores      全局状态
src/types       共享类型
src/utils       无状态纯函数
```

边界约束：

- 页面和组件不直接发 HTTP 请求
- `hooks` 负责页面级异步状态、筛选、分页和数据组装
- `mappers` 负责接口响应到页面或组件展示模型的转换
- `api` 负责请求边界、DTO 和错误透传
- `utils` 只放无状态纯函数
- `mock-server` 仅提供本地 `/api/...` HTTP 模拟接口；部署环境连接 `cupid-match-server`
- `i18n` 只负责界面文案和当前语言状态

## 快速开始

安装依赖：

```bash
npm install
```

启动 H5 开发：

```bash
npm run dev:h5
```

启动本地 mock 服务：

```bash
npm run mock:dev
```

默认真实后端 API 地址：

```text
http://127.0.0.1:8080/api
```

如果只做前端页面或 mock 联调，可以把 `VITE_API_BASE_URL` 改为 mock server 地址；真实后端联调时保持指向 `http://127.0.0.1:8080/api`。

健康检查入口：

```text
GET /api/ping
```

## 部署前检查

```bash
npm run type-check
npm run mock:build
npm run check:i18n
npm run build:h5
```

前端构建细节见 [docs/deployment-guide.md](./docs/deployment-guide.md)；完整生产发布流程以 [三仓生产部署](https://github.com/waltonR1/cupid-match-server/blob/master/doc/cm-production-deployment.md) 为准。

## 常用脚本

```bash
npm run type-check
npm run mock:dev
npm run mock:build
npm run check:i18n
npm run generate:token-docs
npm run build:h5
```

## 文档入口

1. [docs/README.md](./docs/README.md)
2. [docs/deployment-guide.md](./docs/deployment-guide.md)
3. [docs/project-map.md](./docs/project-map.md)
4. [docs/project-introduction.md](./docs/project-introduction.md)
5. [docs/project-structure.md](./docs/project-structure.md)
6. [docs/page-relationships.md](./docs/page-relationships.md)
7. [docs/mock-server-guide.md](./docs/mock-server-guide.md)
8. [docs/token-usage-guide.md](./docs/token-usage-guide.md)
9. [docs/git-commit-convention.md](./docs/git-commit-convention.md)

后端数据库、账号、支付、验证码和上传配置见 [cupid-match-server/doc](https://github.com/waltonR1/cupid-match-server/tree/master/doc)。

## 协作入口

- [CONTRIBUTING.md](./CONTRIBUTING.md)

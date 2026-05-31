# cupid-match

一个面向长期关系与真实相亲流程的婚恋平台前台原型。

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
page -> hook -> api -> mock-server
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
- `mock-server` 提供本地 `/api/...` HTTP 接口
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

默认 API 地址：

```text
http://127.0.0.1:52173/api
```

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

部署说明见 [docs/deployment-guide.md](./docs/deployment-guide.md)。

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

## 协作入口

- [CONTRIBUTING.md](./CONTRIBUTING.md)

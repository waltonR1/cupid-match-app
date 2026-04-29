# cupid-match

一个面向长期关系与真实相亲流程的婚恋平台前台原型。

项目总览、产品路径和当前阶段见 [docs/project-map.md](./docs/project-map.md)。

## 技术栈

- `uni-app`
- `Vue 3`
- `TypeScript`
- `Pinia`
- `vue-i18n`
- `Tailwind CSS`
- `weapp-tailwindcss`
- `Vite`

## 代码结构

当前项目采用以下调用链：

```text
page -> composable -> api module -> mock
```

当前 `api/modules/*` 是同步接口适配层，不再使用 `mockRequest()` 或 `ApiResult<T>` 包装；`mock` 作为本地数据源，由 `api` 统一读取。

目录职责概览：

```text
docs/        项目文档
scripts/     项目脚本
src/         前端源码
```

`src/` 主要分层：

```text
src/pages         页面层
src/composables   业务逻辑层
src/api/modules   接口适配层
src/mock          临时 mock 数据
src/components    展示组件
src/stores        全局状态
src/types         共享类型
```

`src/mock` 当前统一为：

```text
src/mock
  data        原始 mock 数据
  gateways    mock 统一出口
  types       mock 类型
  shared.ts   mock 本地化小工具
```

边界约束：

- 页面、组件、composable 不直接读取 `src/mock`
- `api` / `mock` / `utils` 不依赖 `src/i18n`
- `i18n` 只负责界面文案和当前语言状态

详细结构规则见 [docs/project-structure.md](./docs/project-structure.md)。

## 快速开始

安装依赖：

```bash
npm install
```

启动 H5 开发：

```bash
npm run dev:h5
```

常用脚本：

```bash
npm run type-check
npm run mock:dev
npm run mock:build
npm run check:i18n
npm run generate:token-docs
npm run build:h5
```

本地 mock 接口服务使用根目录脚本启动：

```bash
npm run mock:dev
```

默认地址为 `http://127.0.0.1:52173/api`，健康检查入口为 `GET /api/ping`。

1. [docs/project-map.md](./docs/project-map.md)：产品 / 技术总览
2. [docs/project-introduction.md](./docs/project-introduction.md)：项目介绍
3. [docs/project-structure.md](./docs/project-structure.md)：代码分层与新增功能约束
4. [docs/page-relationships.md](./docs/page-relationships.md)：页面结构与跳转关系
5. [docs/token-usage-guide.md](./docs/token-usage-guide.md)：设计 token 使用规范
6. [docs/git-commit-convention.md](./docs/git-commit-convention.md)：Git 提交规范

## 协作

协作约定、开发流程和提交规范入口：

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [docs/project-structure.md](./docs/project-structure.md)
- [docs/token-usage-guide.md](./docs/token-usage-guide.md)
- [docs/git-commit-convention.md](./docs/git-commit-convention.md)

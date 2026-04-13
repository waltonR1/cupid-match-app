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

详细架构规则见 [docs/project-structure.md](./docs/project-structure.md)。

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
npm run check:i18n
npm run generate:token-docs
npm run build:h5
```

## 文档

建议阅读顺序：

1. [docs/project-map.md](./docs/project-map.md)：产品 / 技术总览
2. [docs/README.md](./docs/README.md)：文档索引
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

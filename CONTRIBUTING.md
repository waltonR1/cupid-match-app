# Contributing

本文档用于说明在 `cupid-match` 仓库中继续开发时需要遵守的基本约定。

## 先读哪些文档

开始开发前，至少先阅读：

1. [README.md](./README.md)
2. [docs/project-map.md](./docs/project-map.md)
3. [docs/project-structure.md](./docs/project-structure.md)
4. [docs/page-relationships.md](./docs/page-relationships.md)
5. [docs/token-usage-guide.md](./docs/token-usage-guide.md)
6. [docs/git-commit-convention.md](./docs/git-commit-convention.md)

## 开发原则

- 先对齐产品路径，再开始实现
- 先遵循现有分层，不要把逻辑写散
- 入口文档只做引用，规则细节以专题文档为准

架构和分层细则以 [docs/project-structure.md](./docs/project-structure.md) 为准。产品总览以 [docs/project-map.md](./docs/project-map.md) 为准。

## 新功能开发流程

推荐顺序：

1. 明确需求属于哪条产品路径
2. 参照 [docs/project-structure.md](./docs/project-structure.md) 完成 `types -> api -> composable -> page -> component`
3. 如涉及新页面，更新 `src/pages.json`
4. 同步更新相关文档
5. 运行必要检查

## 文档更新要求

以下改动需要同步更新文档：

- 新增页面：更新 `docs/page-relationships.md`
- 新增产品主流程：更新 `docs/project-map.md` 或 `docs/project-introduction.md`
- 调整目录职责：更新 `docs/project-structure.md`
- 新增或修改 token：更新 token 相关说明和生成文档

## 样式与设计 token

设计 token 的使用范围、命名规则和校验要求，以 [docs/token-usage-guide.md](./docs/token-usage-guide.md) 为准。

修改 token 后，至少运行：

```bash
npm run generate:token-docs
npm run type-check
```

交付前建议运行：

```bash
npm run build:h5
```

## 提交规范

提交信息统一使用 `type(scope): description`，详细规则见 [docs/git-commit-convention.md](./docs/git-commit-convention.md)。

## 分支建议

推荐使用：

- `feature/*`
- `fix/*`
- `refactor/*`

避免在一次提交里混入多个不相关改动。

## 合并前检查

提交前至少确认：

- 功能归属路径清晰
- 文档已同步
- `npm run type-check` 通过
- 如有 token 变更，已运行 `npm run generate:token-docs`

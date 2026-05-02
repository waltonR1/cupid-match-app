# Contributing

本文档说明 `cupid-match` 仓库的协作约定、开发顺序和交付检查项。

## 先读哪些文档

开始开发前，先阅读：

1. [README.md](./README.md)
2. [docs/project-map.md](./docs/project-map.md)
3. [docs/project-structure.md](./docs/project-structure.md)
4. [docs/page-relationships.md](./docs/page-relationships.md)
5. [docs/mock-server-guide.md](./docs/mock-server-guide.md)
6. [docs/token-usage-guide.md](./docs/token-usage-guide.md)
7. [docs/git-commit-convention.md](./docs/git-commit-convention.md)

## 开发原则

- 先确认需求属于哪条产品路径，再开始实现
- 先遵守现有分层，再补充功能
- 文档只描述当前状态，避免记录过程性说明和阶段性备注
- 入口文档只做索引，具体规则以专题文档为准

## 新功能开发顺序

推荐顺序：

1. 明确需求所在页面和产品路径
2. 补充 `src/api/<domain>/<domain>.types.ts`
3. 补充 `src/api/<domain>/<domain>.ts`
4. 在 `src/hooks/<domain>` 接入请求、状态和页面级数据组装
5. 由页面消费 hook
6. 如涉及 mock 数据，同步更新 `mock-server`
7. 同步更新相关文档

## Hooks 约定

### 分层边界

- `src/hooks/*` 放有状态逻辑，例如 `ref`、`reactive`、`computed`、`watch`
- `src/utils/*` 放无状态纯函数
- 请求状态控制属于 hooks，不属于 utils

### latest request wins 模式

只要 hook 里存在“watch 触发异步请求，且新请求应覆盖旧请求”的场景，就使用：

```text
src/hooks/common/useLatestRequest.ts
```

使用方式：

```ts
const latest = useLatestRequest()
const response = await latest.run(() => api())

if (!response) return
```

约定：

- `useLatestRequest` 负责 `loading`、`error`、请求 token 和 stale request ignore
- 业务 hook 自己决定失败时是否清空列表、详情或保留旧数据
- 页面和组件只消费 hook 暴露出的状态

## 文档维护

以下变更需要同步更新文档：

- 新增页面：更新 [docs/page-relationships.md](./docs/page-relationships.md)
- 调整目录职责或分层：更新 [docs/project-structure.md](./docs/project-structure.md)
- 调整产品路径或页面范围：更新 [docs/project-map.md](./docs/project-map.md) 或 [docs/project-introduction.md](./docs/project-introduction.md)
- 调整 mock-server 结构或接口边界：更新 [docs/mock-server-guide.md](./docs/mock-server-guide.md)
- 调整 token 规则：更新 [docs/token-usage-guide.md](./docs/token-usage-guide.md)
- 调整提交规则：更新 [docs/git-commit-convention.md](./docs/git-commit-convention.md)

## 设计 token

设计 token 的命名、分层和校验要求，以 [docs/token-usage-guide.md](./docs/token-usage-guide.md) 为准。

涉及 token 改动时，至少运行：

```bash
npm run generate:token-docs
npm run type-check
```

## 提交前检查

提交前至少确认：

- 功能路径清晰
- 目录分层符合当前约定
- 文档与当前代码一致
- `npm run type-check` 通过
- 如涉及 token，已运行 `npm run generate:token-docs`

## 分支建议

- `feature/*`
- `fix/*`
- `refactor/*`

## 提交规范

提交信息统一使用：

```text
type(scope): description
```

详细规则见 [docs/git-commit-convention.md](./docs/git-commit-convention.md)。

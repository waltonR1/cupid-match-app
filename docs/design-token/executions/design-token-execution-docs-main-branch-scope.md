# Design Token 文档边界整理记录

## 日期

2026-04-11

## 目标

按文档生命周期重新整理 `docs/`：

- 推到主分支后仍需要长期维护的文档保留在 `docs/` 根层。
- 仅服务本设计 token 迁移分支的分析、执行和生成资料保留在 `docs/design-token/`。

## 实际调整

- 将 `docs/account-rewrite-ia.md` 移动到 `docs/design-token/mappings/account-rewrite-ia.md`。
- 重写 `docs/page-relationships.md`，让它只描述当前真实页面、导航和演示跳转关系。
- 在 `docs/page-relationships.md` 中移除已不存在的 account 路由描述：
  - `/pages/account/index`
  - `/pages/account/events`
  - `/pages/account/favorites`
  - `/pages/account/privacy`

## 当前根层文档边界

以下文件属于主分支长期文档：

- `docs/git-commit-convention.md`
- `docs/page-relationships.md`
- `docs/project-introduction.md`
- `docs/token-usage-guide.md`

## 当前 design-token 文档边界

以下目录属于本分支迁移资料：

- `docs/design-token/audits/`
- `docs/design-token/executions/`
- `docs/design-token/generated/`
- `docs/design-token/mappings/`

## 校验项

- `docs/account-rewrite-ia.md` 不应再存在。
- `docs/design-token/mappings/account-rewrite-ia.md` 应存在。
- `docs/page-relationships.md` 不应再引用已不存在的 account 旧路由。

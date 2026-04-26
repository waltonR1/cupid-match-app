# 前端架构重构记录

本文档记录这轮前端重构的最终落地结果，而不是保留中间态设计。

## 重构目标

- 移除旧的 `composables + api modules + src/mock` 数据链路
- 让前端统一通过 HTTP 边界取数
- 让页面结构更简单，减少跳层
- 为后续真实后端替换保留稳定接口

## 最终结果

当前正式链路已经收敛为：

```txt
page -> hook -> api -> mock-server
```

相比早期方案，最终没有保留这些额外层：

- `client.ts`
- `contract.ts`
- provider 切换
- `mappers`
- `types/vm`

## 为什么继续收敛

最初的重构曾引入更多层，是为了：

- 隔离 DTO 与页面模型
- 预留多 provider 和 mock 切换
- 让未来 Rust API 替换更平滑

但在当前项目体量下，这些层没有形成真实收益，反而增加阅读成本。因此最终保留：

- `hooks` 负责页面状态与少量页面数据组装
- `api` 负责请求与类型
- 页面本地 `computed` 负责少量展示拼装

## 当前目录事实

已保留：

- `src/api`
- `src/hooks`
- `src/pages`
- `src/utils`
- `mock-server`

已移除：

- `src/composables`
- `src/api/modules`
- `src/mock`
- `src/mappers`
- `src/types/vm`

## 当前 API 结构

```txt
src/api/
  account/account.ts
  account/account.types.ts
  auth/auth.ts
  auth/auth.types.ts
  events/events.ts
  events/events.types.ts
  profiles/profiles.ts
  profiles/profiles.types.ts
  shared/http.ts
  shared/config.ts
```

说明：

- 域文件直接用域名命名，不再保留 `.http` 后缀。
- `shared/http.ts` 仍保留这个名字，因为它是共享请求层，不是业务域文件。

## 当前页面数据组织方式

- `events` 与 `profiles` 的主要页面组装逻辑在各自 hook 内。
- `account` 页面的展示组装逻辑收回到页面本地 `computed`。
- 通用格式化逻辑保留在 `src/utils/*`。

## 当前完成定义

这轮“前后端逻辑分离 + mock 切换 + API 收敛”已经完成，剩余工作不再属于架构重构本身，而属于：

1. 页面级回归
2. 文档同步
3. 提交整理
4. 真实后端替换准备

# JSON Server 迁移记录

## 目标

把旧的内存 mock 与前端直连假数据方案，替换成真正的 HTTP mock 边界，同时保持未来切换真实后端时的前端稳定性。

## 当前状态

这轮迁移已经完成，当前事实是：

- 旧 `src/mock/*` 已退出运行
- 旧 `src/composables/*` 和 `src/api/modules/*` 已退出运行
- 前端只通过 `src/api/*/{domain}.ts` 发 HTTP 请求
- `mock-server/*` 是当前唯一 mock 数据源

## 当前结构

```txt
src/
  api/
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
  hooks/
mock-server/
  config.js
  db.json
  server.js
```

## 当前技术方案

当前 mock 层不是“前端读本地 TS mock”，也不是“纯 json-server 资源直出”，而是：

- `json-server` 提供底层数据访问与中间件能力
- `mock-server/server.js` 提供统一的 `/api/...` 自定义路由
- `db.json` 只作为事实数据源

## 当前约束

前端不能依赖：

- `?_expand=`
- `?_embed=`
- `?_like=`
- 资源表名直接暴露给页面
- json-server 默认分页格式作为正式契约

前端只依赖这些接口：

- `GET /api/health`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `POST /api/auth/login`
- `POST /api/auth/register`

## 当前回归结果

最近一次最小回归已验证：

- `type-check` 通过
- `health` 正常
- `profiles` 列表与详情正常
- `events` 列表与详情正常
- `account overview` 正常
- `auth login` 使用 mock 账号可正常返回 session

当前使用过的有效 mock 登录账号：

- `identity: lin@example.com`
- `password: password123`

## 剩余工作

这份文档现在更多是历史记录。后续工作不再是“完成 json-server 迁移”，而是：

1. 保持 `db.json` 与 UI 数据需求一致
2. 为关键接口补回归脚本或测试
3. 逐步用真实后端替换 `mock-server`

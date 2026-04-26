# 重构执行清单

本文档记录这轮前端数据链路重构已经完成的事项，以及当前收尾状态。

## 已完成

### 1. 旧链路移除

已退出当前运行链路：

- `src/composables/*`
- `src/api/modules/*`
- `src/mock/*`

### 2. HTTP 边界统一

当前前端只通过以下域 API 取数：

- `src/api/account/account.ts`
- `src/api/auth/auth.ts`
- `src/api/events/events.ts`
- `src/api/profiles/profiles.ts`

### 3. 额外抽象层移除

以下层已经移除：

- `*.client.ts`
- `*.contract.ts`
- `*.mock.ts`
- provider 切换
- `src/mappers/*`
- `src/types/vm/*`

### 4. 页面取数方式统一

当前页面统一通过 `hooks` 或页面本地 `computed` 消费数据：

- `events` 与 `profiles` 主要在 hook 中组装
- `account` 页面在本地 `computed` 中组装

### 5. mock-server 单通道

当前运行时只保留：

- `mock-server/config.js`
- `mock-server/db.json`
- `mock-server/server.js`

### 6. API 文件命名收敛

域 API 文件已统一去掉 `.http` 后缀：

- `account.ts`
- `auth.ts`
- `events.ts`
- `profiles.ts`

## 当前校验状态

### 类型校验

- `npm.cmd run type-check` 通过

### 最小回归

已验证：

- `GET /api/health`
- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `POST /api/auth/login`

登录冒烟使用的 mock 账号：

- `identity: lin@example.com`
- `password: password123`

## 当前链路

当前正确链路为：

```txt
page -> hook -> api -> mock-server
```

## 剩余收尾

这轮重构本身已经完成，剩余工作是：

1. 页面级人工回归
2. 整理并提交当前工作区
3. 保持 docs 与当前结构同步
4. 为真实后端替换准备接口对照

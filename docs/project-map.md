# 项目地图

## 一句话

`cupid-match-app` 是一个面向长期关系与真实相亲流程的婚恋平台前台原型，重点是“筛选 -> 判断 -> 线下接触 -> 关系推进”。

## 产品路径

- 本人视角：浏览资料、筛选候选人、查看详情、参与活动
- 家庭视角：从家庭立场筛选和判断，推动后续接触
- 活动视角：用线下活动把线上浏览转成真实接触
- 账户中心：维护资料、认证、消息、活动、会员与安全设置

## 页面范围

- 公共页：`/pages/index`、`/pages/public/about`、`/pages/public/contact`、`/pages/public/membership`
- 认证页：`/pages/auth/login`、`/pages/auth/register`
- 资料页：`/pages/profiles/self/*`、`/pages/profiles/family/*`
- 活动页：`/pages/events/*`
- 账户页：`/pages/account/*`
- 兜底页：`/pages/not-found`

## 技术链路

前端采用以下调用链：

```text
page -> hook -> api -> mock-server
```

职责：

- 页面负责布局、交互绑定和展示
- `src/hooks/*` 负责页面级异步状态、筛选、分页和数据组装
- `src/mappers/*` 负责接口响应到展示模型的转换
- `src/api/*` 负责 HTTP 边界和类型
- `mock-server/src/*` 负责 `/api/...` 路由、聚合、筛选、排序和分页

## 目录事实

主目录：

- `src/api`
- `src/hooks`
- `src/mappers`
- `src/pages`
- `src/components`
- `src/stores`
- `src/utils`
- `mock-server`

## API 结构

```text
src/api/
  account/
    account.ts
    account.types.ts
    index.ts
  auth/
    auth.ts
    auth.types.ts
    index.ts
  events/
    events.ts
    events.types.ts
    index.ts
  contact/
    contact.ts
    contact.types.ts
    index.ts
  legal/
  messages/
  profiles/
    profiles.ts
    profiles.types.ts
    index.ts
  shared/
    http.ts
  upload/
```

约定：

- `*.types.ts` 放 DTO、query、payload、response 类型
- `*.ts` 放域 API 方法
- `index.ts` 放模块统一出口
- `src/api/shared/http.ts` 负责统一请求、错误处理和日志
- `src/config/app.ts` 负责前端环境变量、API 地址、日志和 debug 开关

## Mock Server 事实

mock 层通过独立的 HTTP 服务提供接口：

- `Fastify + LowDB`
- `mock-server/src/server.ts` 提供 `/api/...` 路由
- `mock-server/db.json` 提供事实数据

前端通过 HTTP 访问 mock-server。接口契约以 [final-api-contract.md](./final-api-contract.md) 为准；mock-server 运行方式以 [mock-server-guide.md](./mock-server-guide.md) 为准。

当前主要业务域：

- auth / legal
- profiles / favorites / private introductions
- events / event registrations
- account / membership / settings
- contact
- messages / inbox
- upload
- debug

# 前端架构重构方案

本文档描述本次前端重构的目标结构、边界划分以及当前落地结果。它不再讨论旧 `composables / api modules / mock data` 方案，而是以当前代码为准。

## 重构目标

- 保留现有 `i18n` 和页面视觉结构
- 把页面的数据链路统一收敛到 `hooks + mappers + api/http`
- 让前端依赖稳定 HTTP contract，而不是内存 mock
- 用本地 `json-server` 模拟真实后端边界
- 为后续 Rust API 替换保留接口兼容面

## 当前正式链路

```txt
page -> hook -> mapper -> api client -> http -> mock-server
```

细化后为：

```txt
page
  -> page hook
  -> mapper
  -> service api client
  -> http adapter
  -> mock-server
```

## 分层职责

### 1. pages

页面只负责：

- 页面布局组合
- 事件绑定
- 读取 hook 返回的页面模型
- 把页面模型传给子组件

页面不负责：

- HTTP 请求
- DTO 字段拼装
- 筛选 / 排序 / 分页聚合
- DTO -> VM 映射

### 2. hooks

`hooks` 按业务域组织：

- `account`
- `auth`
- `events`
- `profiles`

职责：

- 调用 API client
- 管理异步状态：`loading / error / data`
- 暴露页面动作：查询、刷新、筛选、翻页、提交
- 输出页面最终消费的数据结构

不负责：

- 直接操作 DOM
- 直接调用 `uni.request`
- 写死页面文案

### 3. api

`src/api` 是前端和后端的正式边界。

职责：

- 定义 DTO / query / payload / response
- 定义 client contract
- 定义 HTTP 实现
- 暴露稳定的 `client.ts` 域入口

不负责：

- 页面状态管理
- VM 结构映射
- i18n 文案生成

### 4. mappers

`mappers` 负责 DTO -> VM / page model 转换。

职责：

- DTO -> domain-like display structure
- domain-like display structure -> page VM
- 统一卡片、详情、列表、统计等视图结构

不负责：

- 发请求
- 保存状态
- 直接决定页面交互行为

### 5. mock-server

`mock-server` 是当前唯一 mock 数据来源。

职责：

- 提供 `/api/...` HTTP 接口
- 负责筛选、排序、分页和聚合
- 负责活动详情关联资料、账号中心概览、登录注册响应整形

不负责：

- 生成页面 VM
- 依赖前端 i18n 逻辑

## 当前目录结构

```txt
src/
  api/
    account/
    auth/
    events/
    profiles/
    shared/
  hooks/
    account/
    auth/
    events/
    profiles/
  mappers/
    account/
    events/
    profiles/
  types/
    vm/
  pages/
  components/
  i18n/
  stores/
  utils/
mock-server/
  db.json
  routes.json
  server.js
```

## 已完成的重构结果

- `src/composables/*` 已从主链路移除
- `src/api/modules/*` 已移除
- `src/mock/*` 内存 mock 已移除
- 页面已切换到 `src/hooks/*`
- API 已切换到 `src/api/*/http.ts`
- 运行时只通过 `mock-server` 取数

## 成功标准

当前版本应满足：

- 页面不直接读取原始 DTO 字段做复杂拼装
- 页面不自己做列表筛选、排序和统计聚合
- 所有异步请求都走 `src/api/*/http.ts`
- 前端运行时只有一条数据通路：HTTP -> `mock-server`
- 子组件只消费 props VM，不知道 API schema
- `i18n` 保持可用，但不主导数据链路

## 后续建议

下一阶段不再继续做前端链路重构，而是：

1. 补测试和回归检查
2. 完善 `mock-server` 数据与接口契约
3. 明确 Rust 后端替换顺序
4. 逐步把 `mock-server` 契约替换为真实后端实现

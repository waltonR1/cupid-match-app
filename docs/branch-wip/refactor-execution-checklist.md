# 重构执行清单

本文档记录这次前端数据链路重构的执行结果、当前验收状态以及后续收尾事项。它不再作为“待开始的计划”，而是作为当前重构结果的落地说明。

相关文档：

- [page-data-requirements.md](./page-data-requirements.md)
- [frontend-architecture-redesign.md](./frontend-architecture-redesign.md)
- [rust-api-contract.md](./rust-api-contract.md)
- [api-vue-field-map.md](./api-vue-field-map.md)

## 已完成的执行项

### 1. 新骨架已建立

已完成目录：

- `src/hooks/*`
- `src/api/*`
- `src/mappers/*`
- `src/types/vm/*`
- `mock-server/*`

当前不再使用：

- `src/composables/*`
- `src/api/modules/*`
- `src/mock/*`

### 2. service contract 类型已建立

已完成：

- `profiles.types.ts`
- `events.types.ts`
- `account.types.ts`
- `auth.types.ts`
- 各域 `*.contract.ts`

状态：

- 页面不再直接依赖旧 `src/api/modules/*` 类型
- `http.ts` 与 `client.ts` 已通过 contract 解耦

### 3. mock async provider 方案已废弃

该阶段原本用于过渡，现在已经被单一 HTTP mock server 取代。

当前事实：

- 不再存在运行时 `mock provider`
- 不再存在 `src/mock/data/*` 事实数据源
- 运行时只走 `mock-server/server.js`

### 4. mappers 已建立

当前已落地：

- `src/mappers/profiles/*`
- `src/mappers/events/*`
- `src/mappers/account/*`

状态：

- 页面不再自己拼资料卡片和详情结构
- 页面不再自己从 DTO 逐字段构造页面 fact rows

### 5. hooks 已建立

当前已落地：

- `src/hooks/profiles/*`
- `src/hooks/events/*`
- `src/hooks/account/*`
- `src/hooks/auth/*`

状态：

- hook 返回页面消费所需数据和动作
- 页面不再直接依赖 HTTP 实现细节

### 6. 页面替换已完成

已切换页面包括：

- `profiles/self/index.vue`
- `profiles/self/detail.vue`
- `profiles/family/index.vue`
- `profiles/family/detail.vue`
- `events/index.vue`
- `events/detail.vue`
- `account/*`
- `auth/*`
- `index.vue`

状态：

- 页面已改为依赖 `src/hooks/*`
- 页面已脱离旧 `composables`
- 页面保留原路由和视觉结构

### 7. 旧链路删除已完成

已删除或已退出运行时：

- `src/composables/*`
- `src/api/modules/*`
- `src/mock/*`
- `src/api/*/*.mock.ts`
- provider 切换逻辑

## 当前验收结果

以下条件当前已满足：

- 所有数据页面不再依赖 `src/composables/*`
- 所有数据页面不再依赖 `src/api/modules/*`
- 运行时只有一条数据通路：`http -> mock-server`
- DTO、hook、VM 三层已分离
- 页面只消费页面模型
- 子组件不知道后端 schema
- `i18n` 保持可用

## 当前链路核对表

当前正确链路应为：

```txt
page -> hook -> mapper -> api client -> http -> mock-server
```

检查点：

- 页面是否只从新 `hooks` 取数据
- 页面是否仍在直接访问原始 DTO 字段做复杂组装
- 页面是否仍在自己做筛选、排序、统计
- 页面子组件是否只吃 props VM
- 页面 loading / empty / error 是否可工作
- API 是否只通过 `/api/...` 访问 `mock-server`

## 剩余收尾项

这轮重构剩余工作不再是架构切换，而是收尾：

1. 同步所有文档到当前结构
2. 为关键 HTTP 路径补测试或回归检查
3. 检查 `mock-server/db.json` 与页面需求的一致性
4. 为后续 Rust API 替换确定分域顺序

## 风险点

### 风险 1：文档与代码再次偏离

表现：

- 文档仍写旧链路，代码已经是新链路

处理：

- 每次调整 `src/api`、`src/hooks`、`mock-server` 时同步更新 `docs`

### 风险 2：`mock-server` 契约与未来 Rust 契约偏离

表现：

- `server.js` 为了前端方便返回过度定制结构

处理：

- 保持 DTO 面向正式 API 设计
- 页面定制结构仍放在 `mappers`

### 风险 3：hook 再次变成大杂烩

表现：

- hook 内部既有请求，又有文案，又有 UI 特例处理

处理：

- 文案仍留给页面 / i18n
- 结构映射放到 mappers
- hook 只组合数据和动作

## 完成定义

从前端重构角度看，这次重构已经完成。接下来的工作属于：

- 文档同步
- 测试补齐
- mock server 数据维护
- 真后端替换

不再属于“前端主链路重构”本身。

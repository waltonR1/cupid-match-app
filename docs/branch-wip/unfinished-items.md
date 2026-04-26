# 未完成项

本文档记录当前分支还没有收尾的工程项和后续事项，方便后续整理并推送到 `main`。

## 当前结论

- 前后端逻辑分离重构：已完成
- mock 切换重构：已完成
- 旧链路删除：已完成
- 当前剩余工作：提交整理、真实本地启动验证、少量文档与接口收尾

换句话说，重构本身已经做完，剩下的是分支收口，不是主链路继续改造。

## 工程收尾

1. 整理并提交当前工作区改动。
2. 在真实本地环境中启动 `mock-server`，验证 `http://127.0.0.1:52173/api/health` 和核心接口。
3. 继续核对辅助文档是否全部贴合当前 HTTP 单通道结构。

## 接口与数据

1. `mock-server/db.json` 与注册默认文案已再次核对，当前多语言文本编码正常。
2. `account` 和 `auth` 域的 DTO / `mock-server` 返回结构已再次核对，当前主链路未发现新的字段错配。
3. `register.role` 暂时只在注册落库；登录响应、账户展示和权限逻辑的接入，等注册页与字段稳定后再决定。

## 产品功能

1. 活动报名闭环尚未完成。
2. 家庭交互 / 家庭决策机制尚未完成。
3. 消息 / 撮合系统尚未完成。
4. 权限控制与审核机制尚未完成。
5. 真实 Rust 后端尚未替换当前 `mock-server`。

## 当前分支专用文档

以下文件目前仅属于当前分支，暂时不直接放在 `docs/` 根目录：

- `api-vue-field-map.md`
- `frontend-architecture-redesign.md`
- `json-server-migration-plan.md`
- `page-data-requirements.md`
- `refactor-execution-checklist.md`
- `rust-api-contract.md`

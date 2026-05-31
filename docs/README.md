# 文档索引

`docs/` 目录存放项目的产品、结构、页面关系和协作说明。

## 推荐阅读顺序

### 部署与验收

1. [deployment-guide.md](./deployment-guide.md)
   部署边界、环境变量、构建命令、部署前检查和冒烟路径。
2. [project-map.md](./project-map.md)
   产品路径、页面范围、技术链路和项目事实。
3. [project-introduction.md](./project-introduction.md)
   项目背景、产品定位和核心判断。
4. [project-structure.md](./project-structure.md)
   代码分层、目录职责和工程约定。
5. [page-relationships.md](./page-relationships.md)
   页面清单、导航关系和跳转入口。
6. [mock-server-guide.md](./mock-server-guide.md)
   mock-server 的结构、启动方式和接口边界。
7. [token-usage-guide.md](./token-usage-guide.md)
   设计 token 使用规则。
8. [git-commit-convention.md](./git-commit-convention.md)
   Git 提交规范。

### 数据与接口契约

1. [final-database-schema.md](./final-database-schema.md)
   目标数据库字段和 source of truth。
2. [final-api-contract.md](./final-api-contract.md)
   目标 API endpoint、payload、query 和 DTO。
3. [final-page-fields.md](./final-page-fields.md)
   目标页面 ViewModel 字段。
4. [final-data-flow-contract.md](./final-data-flow-contract.md)
   数据库、API、mapper、页面之间的数据流动。
5. [project-database-fields.md](./project-database-fields.md)
   当前 mock 数据库字段快照。

## 按问题查找

### 想知道项目是什么

- [project-map.md](./project-map.md)
- [project-introduction.md](./project-introduction.md)

### 想知道代码应该写在哪一层

- [project-structure.md](./project-structure.md)

### 想知道页面有哪些、怎么跳

- [page-relationships.md](./page-relationships.md)

### 想知道 mock-server 怎么启动、提供哪些接口

- [mock-server-guide.md](./mock-server-guide.md)

### 想知道怎么部署或验收

- [deployment-guide.md](./deployment-guide.md)

### 想知道 token 怎么使用

- [token-usage-guide.md](./token-usage-guide.md)

### 想知道 commit 怎么写

- [git-commit-convention.md](./git-commit-convention.md)

### 想知道数据库字段怎么定义

- [project-database-fields.md](./project-database-fields.md)

### 想知道目标数据库 / API / 页面字段怎么定义

- [final-database-schema.md](./final-database-schema.md)
- [final-api-contract.md](./final-api-contract.md)
- [final-page-fields.md](./final-page-fields.md)
- [final-data-flow-contract.md](./final-data-flow-contract.md)

## 文档维护约定

- `project-*` 文档描述当前状态
- `final-*` 文档描述目标契约
- 不记录过程性说明和阶段性备注
- 新增页面时同步更新 `page-relationships.md`
- 调整结构时同步更新 `project-structure.md`
- 调整 mock-server 时同步更新 `mock-server-guide.md`
- 调整 token 规则时同步更新 `token-usage-guide.md`

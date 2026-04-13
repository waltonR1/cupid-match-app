# 文档索引

这个目录存放 `cupid-match` 项目的产品、架构和协作说明文档。

如果你是第一次接触这个项目，建议按下面顺序阅读。

## 推荐阅读顺序

1. [project-map.md](./project-map.md)
   产品 / 技术总览，适合先建立全局认知。
2. [project-introduction.md](./project-introduction.md)
   项目背景、产品定位、核心问题、用户角色和当前状态。
3. [project-structure.md](./project-structure.md)
   代码分层、目录职责、架构约束和新增功能流程。
4. [page-relationships.md](./page-relationships.md)
   页面清单、导航关系、演示跳转和典型用户流。
5. [token-usage-guide.md](./token-usage-guide.md)
   设计 token 的使用规则和校验要求。
6. [git-commit-convention.md](./git-commit-convention.md)
   Git 提交格式与协作规范。

## 按问题查找

### 想知道“这个项目到底是什么”

看：

- [project-map.md](./project-map.md)
- [project-introduction.md](./project-introduction.md)

### 想知道“页面有哪些、怎么跳”

看：

- [page-relationships.md](./page-relationships.md)

### 想知道“代码应该写在哪一层”

看：

- [project-structure.md](./project-structure.md)

### 想知道“样式 token 怎么用”

看：

- [token-usage-guide.md](./token-usage-guide.md)

### 想知道“commit 怎么写”

看：

- [git-commit-convention.md](./git-commit-convention.md)

## 文档维护约定

- 新增页面时，同步更新 `page-relationships.md`
- 调整项目结构时，同步更新 `project-structure.md`
- 补充全局产品认知时，优先更新 `project-map.md`
- 修改设计 token 规范时，同步更新 `token-usage-guide.md`

## 文档分工

- `project-map.md`：只负责全局认知
- `project-introduction.md`：只负责产品背景与定位说明
- `project-structure.md`：只负责代码架构与分层规则
- `page-relationships.md`：只负责页面与跳转关系
- `token-usage-guide.md`：只负责 token 规则
- `git-commit-convention.md`：只负责提交规范

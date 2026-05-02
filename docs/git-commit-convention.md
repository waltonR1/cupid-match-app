# Git 提交规范

## 目标

统一仓库提交格式，保证：

- 提交历史清晰可读
- 问题定位方便
- 协作边界明确

## 提交格式

所有提交使用：

```text
type(scope): description
```

示例：

```text
feat(home): 添加首页 Hero 区块
fix(vite): 修复 H5 构建配置
refactor(hooks): 统一 latest request 处理
docs(project): 更新结构文档
```

## type

| type     | 说明                 |
| -------- | -------------------- |
| feat     | 新功能               |
| fix      | 修复 bug             |
| refactor | 重构，不改变对外行为 |
| style    | 样式或 UI 调整       |
| chore    | 构建、配置、依赖     |
| perf     | 性能优化             |
| docs     | 文档更新             |

## scope

scope 必填。

常用 scope：

```text
home
auth
profiles
events
account
api
hooks
i18n
tailwind
vite
build
mock-server
docs
```

## description

要求：

- 简洁明确
- 尽量使用动词开头
- 可以使用中文或英文，但单个提交内保持一致

正确示例：

```text
fix(vite): 修复 H5 构建配置
feat(events): 添加活动详情页
refactor(profiles): 抽离目录页请求状态
```

错误示例：

```text
update
fix bug
改了一下
```

## 多行提交

复杂改动可以使用多行提交说明：

```text
refactor(hooks): 统一 latest request 处理

- 抽离 useLatestRequest
- 替换目录页和详情页中的 requestToken 模板代码
- 保持业务层的数据清空策略不变
```

## 粒度要求

避免在一次提交中混入多个不相关改动。

推荐拆分：

```text
fix(vite): 修复构建配置
style(home): 调整首页布局
docs(project): 更新结构文档
```

## 分支建议

```text
feature/*
fix/*
refactor/*
```

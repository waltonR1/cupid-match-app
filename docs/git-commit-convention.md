# Git 提交规范（cupid-match）

## 1. 目的

本规范用于统一项目的 Git 提交方式，确保：

* 提交历史清晰可读
* 方便问题定位与回滚
* 提高代码可维护性
* 支持后续自动化（CI / changelog）

---

## 2. 提交格式

所有提交必须遵循如下格式：

```
type(scope): description
```

示例：

```
feat(home): 添加首页 Hero 区块
fix(vite): 禁用 weapp-tailwindcss 在 H5 环境
refactor(i18n): 统一翻译函数逻辑
```

---

## 3. 提交类型（type）

| 类型       | 说明        |
| -------- | --------- |
| feat     | 新功能       |
| fix      | 修复 bug    |
| refactor | 重构（不改变功能） |
| style    | 样式/UI 调整  |
| chore    | 构建/配置/依赖  |
| perf     | 性能优化      |
| docs     | 文档更新      |

---

## 4. 作用范围（scope）

必须填写 scope（本项目强制要求）

### 4.1 页面模块

```
home
order
cart
user
auth
contact
membership
```

### 4.2 系统层

```
vite
build
env
api
store
i18n
tailwind
router
```

### 4.3 平台

```
h5
mp
app
```

---

## 5. 描述规范（description）

要求：

* 使用中文或英文（建议统一）
* 简洁明确
* 使用动词开头

正确示例：

```
fix(vite): 禁用 weapp-tailwindcss 在 H5
feat(order): 新增订单列表页
refactor(store): 拆分购物车逻辑
```

错误示例：

```
update
改了一下
test
fix bug
```

---

## 6. 多行提交（推荐）

用于较复杂或重要改动：

```
fix(vite): 禁用 weapp-tailwindcss 在 H5

- 根据 UNI_PLATFORM 判断平台
- 仅在小程序/App 启用插件
- 修复 H5 构建时样式解析问题
```

---

## 7. 常见场景示例

### 7.1 多端兼容

```
fix(h5): 修复 Tailwind 类名解析问题
fix(mp): 修复图片 lazy-load 警告
```

### 7.2 构建问题

```
fix(build): 避免插件影响 H5 构建
chore(vite): 更新插件配置
```

### 7.3 Tailwind 样式

```
style(tailwind): 调整颜色变量
fix(tailwind): 修复 [] 语法解析问题
```

### 7.4 i18n

```
refactor(i18n): 简化 namespace 结构
feat(i18n): 增加默认语言兜底
```

### 7.5 API / Mock

```
feat(api): 新增订单接口
chore(mock): 更新 json-server 路由
```

### 7.6 页面开发

```
feat(home): 添加首页模块
feat(contact): 实现联系页面
```

### 7.7 架构优化

```
refactor(store): 拆分状态逻辑
refactor(env): 分离运行环境配置
```

---

## 8. 提交粒度要求

禁止：

```
一次提交多个不相关改动
```

推荐：

```
fix(vite): 禁用 weapp-tailwindcss
style(header): 调整导航布局
feat(home): 添加首页模块
```

---

## 9. 分支策略（推荐）

| 分支            | 用途      |
| ------------- | ------- |
| master / main | 主分支（稳定） |
| dev           | 开发分支    |
| feature/*     | 新功能     |
| fix/*         | bug 修复  |
| refactor/*    | 重构      |

示例：

```
feature/home-hero
fix/h5-tailwind
refactor/i18n-structure
```

---

## 10. 核心原则

* commit 是给未来的自己看的
* 必须表达清楚“做了什么 + 为什么做”
* 保持提交粒度清晰

本项目特点：

* 多端（H5 / 小程序 / App）
* Tailwind + weapp-tailwindcss
* i18n 多语言
* mock + API 切换

不规范的提交将导致后期维护困难

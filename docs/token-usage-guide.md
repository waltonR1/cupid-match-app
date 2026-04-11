# Token 使用指南

本文档面向页面和组件开发者，用于说明在业务代码里如何选择和使用设计 token。

## 基本原则

业务代码只允许使用这几类 token utility：

```text
semantic-*
component-*
bg-gradient-*
shadow-*
```

禁止使用：

```text
palette-*
next-*
legacy token utility
直接写色值，例如 #d8b67a
token utility opacity 后缀，例如 bg-semantic-surface-card/80
```

## Token 分层

`semantic` 是全局语义，用于跨页面复用的 UI 角色。

常见例子：

```text
semantic.page.default
semantic.surface.card
semantic.text.primary
semantic.border.default
semantic.accent.primary
semantic.action.primary
semantic.state.event.open.background
```

`component` 是组件或业务模块语义，只用于明确属于某个模块的局部角色。

常见例子：

```text
component.header.background
component.footer.background
component.directory-control.selected.text
component.event-card.background
component.membership-tier.gold.fill
```

`effect` 只用于效果 token，目前包括渐变和阴影。

常见例子：

```text
effect.gradient.home-hero
effect.gradient.discovery-hero
effect.shadow.panel
effect.shadow.hero
effect.shadow.dropdown
```

`palette` 只用于 token 内部取值，不允许页面或组件直接使用，也不会生成 Tailwind utility。

## Class 生成规则

颜色 token 按 token 路径生成 utility：

```text
semantic.page.default -> bg-semantic-page-default
semantic.text.primary -> text-semantic-text-primary
semantic.border.default -> border-semantic-border-default
component.header.background -> bg-component-header-background
component.directory-control.selected.text -> text-component-directory-control-selected-text
```

渐变 token 使用 `bg-gradient-*`：

```text
effect.gradient.home-hero -> bg-gradient-home-hero
effect.gradient.events-hero -> bg-gradient-events-hero
effect.gradient.discovery-hero -> bg-gradient-discovery-hero
effect.gradient.auth-hero -> bg-gradient-auth-hero
```

阴影 token 使用 `shadow-*`：

```text
effect.shadow.panel -> shadow-panel
effect.shadow.hero -> shadow-hero
effect.shadow.dropdown -> shadow-dropdown
effect.shadow.luxe -> shadow-luxe
```

不要写：

```text
shadow-shadow-panel
shadow-next-panel
shadow-next-shadow-panel
```

## 选择顺序

1. 优先使用 `semantic`，前提是该 UI 角色是跨页面通用语义。
2. 如果语义只属于某个模块或组件，使用 `component`。
3. 渐变和阴影只使用 `effect` 对应生成的 utility。
4. 不确定是否应该沉淀为全局语义时，先放在 `component`。
5. 只有当同一角色稳定跨页面复用时，才考虑提升到 `semantic`。

不要因为两个颜色值相同就复用同一个 token。语义准确优先，值相同但语义不同也应该拆开。

## 常用语义

页面背景：

```text
bg-semantic-page-default
bg-semantic-page-subtle
```

内容表面：

```text
bg-semantic-surface-card
bg-semantic-surface-panel
bg-semantic-surface-soft
bg-semantic-surface-emphasis
bg-semantic-surface-hero-panel
```

文本：

```text
text-semantic-text-primary
text-semantic-text-secondary
text-semantic-text-muted
text-semantic-text-subtle
text-semantic-text-eyebrow
text-semantic-text-link
text-semantic-text-inverse
```

边框：

```text
border-semantic-border-default
border-semantic-border-soft
border-semantic-border-divider
border-semantic-border-card-hover
border-semantic-border-interactive-hover
border-semantic-border-hero
```

强调与操作：

```text
text-semantic-accent-primary
text-semantic-accent-secondary
bg-semantic-action-primary
bg-semantic-action-primary-hover
text-semantic-action-primary-contrast
```

## 常见写法

页面根容器：

```vue
<view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
```

次级页面背景：

```vue
<view class="min-h-screen bg-semantic-page-subtle text-semantic-text-primary">
```

标准卡片：

```vue
<view class="border border-semantic-border-default bg-semantic-surface-card shadow-panel">
```

面板或工具栏：

```vue
<view class="border border-semantic-border-default bg-semantic-surface-panel">
```

交互控件：

```vue
<view class="border border-semantic-border-default bg-semantic-surface-soft hover:border-semantic-border-interactive-hover">
```

Hero 面板：

```vue
<view class="border border-semantic-border-hero bg-semantic-surface-hero-panel shadow-hero">
```

局部业务控件，例如 discovery 筛选选中态：

```vue
<view class="border border-component-directory-control-selected-border bg-component-directory-control-selected-background text-component-directory-control-selected-text">
```

## 新增 Token 规则

命名只表达语义，不表达 CSS 属性或具体颜色。

推荐：

```text
semantic.surface.card
semantic.border.interactive-hover
component.event-card.title-hover
component.directory-control.selected.background
```

禁止：

```text
card-bg
gold-text
blue-border
page-bg 用在卡片内部
```

同一 UI 语义如果包含多个属性，必须拆层：

```text
component.directory-control.selected.background
component.directory-control.selected.text
component.directory-control.selected.border
```

不要写成：

```text
component.directory-control.selected-color
```

## 修改后的校验

改 token 定义或 token class 后，至少运行：

```bash
npm run generate:token-docs
npm run type-check
```

交付前运行：

```bash
npm run build:h5
```

生成的 token audit 必须保持以下三项为 `0`：

```text
unknown token utility references
residual next-prefixed token references
token opacity suffix references
```

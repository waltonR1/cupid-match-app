# 样式 Token 使用规范

## 1. 目的

这份文档用于统一项目里的颜色、阴影、渐变和主题使用方式，避免继续出现以下问题：

- 写页面时忘记现有 token 名称
- 新样式直接写 `#xxxxxx`，导致主题切换失效
- 同一个视觉语义在不同页面里用了不同颜色
- 加了 token 但 Tailwind utility 没生成出来

本文档以当前代码为准，不是理想化规范。

## 2. Source of Truth

样式 token 的真实来源只有这几处：

- `src/constants/theme-tokens.json`
- `tailwind.config.js`
- `src/stores/modules/theme.ts`
- `src/App.vue`

其中：

- `theme-tokens.json` 定义 token 内容
- `tailwind.config.js` 负责把 token 映射成 Tailwind utility
- `theme.ts` 管理当前主题状态
- `App.vue` 通过 `data-theme` 把主题挂到根节点

## 3. 主题机制

当前项目有两个主题：

- `dark`
- `light`

运行时通过 `document.documentElement.setAttribute('data-theme', themeStore.theme)` 切换主题。

也就是说：

- 同一个类名，例如 `bg-page-base`
- 在深色主题和浅色主题下会映射到不同变量值
- 页面里不应该关心当前具体色值，只应该关心语义

## 4. Token 到 Utility 的映射规则

### 4.1 颜色类 token

`page`、`surface`、`text`、`brand`、`border`、`button` 会被生成为 Tailwind 颜色 utility。

例如：

- `page.base` -> `bg-page-base`
- `surface.card` -> `bg-surface-card`
- `text.heading` -> `text-text-heading`
- `border.soft` -> `border-border-soft`
- `brand.highlight-strong` -> `text-brand-highlight-strong`
- `button.highlight` -> `bg-button-highlight`

这些 utility 支持透明度后缀，因为底层是 `rgb(var(--color-...)/<alpha-value>)`：

- `bg-page-base/92`
- `border-brand-highlight/35`
- `bg-brand-highlight/8`

### 4.2 渐变 token

`gradient` 会映射到 `backgroundImage`：

- `gradient.home-hero` -> `bg-home-hero`
- `gradient.about-hero` -> `bg-about-hero`
- `gradient.events-hero` -> `bg-events-hero`
- `gradient.membership-hero` -> `bg-membership-hero`

### 4.3 阴影 token

`shadow` 会映射到 `boxShadow`：

- `shadow.panel` -> `shadow-panel`
- `shadow.card` -> `shadow-card`
- `shadow.feature` -> `shadow-feature`
- `shadow.hero` -> `shadow-hero`
- `shadow.emphasis` -> `shadow-emphasis`
- `shadow.dropdown` -> `shadow-dropdown`
- `shadow.luxe` -> `shadow-luxe`
- `shadow.soft-luxe` -> `shadow-soft-luxe`

### 4.4 原始 CSS 变量 token

`hero` 属于原始变量，不会自动生成 utility class。

这类 token 只能通过 CSS 变量使用，例如：

```vue
<view
  class="[background-color:var(--hero-secondary-cta-bg)] [border-color:var(--hero-secondary-cta-border)]"
/>
```

当前已有：

- `--hero-secondary-cta-border`
- `--hero-secondary-cta-bg`
- `--hero-secondary-cta-bg-hover`
- `--hero-ornament-line`
- `--hero-ornament-fill`

## 5. 当前 Token 清单

下面列的是当前项目里最重要、最常用的一组 token 名称。

### 5.1 `page`

- `page.base`
- `page.soft`
- `page.inverse`

推荐用途：

- 页面根容器：`bg-page-base`
- 柔和背景分区：`bg-page-soft`
- 深色整屏背景：`bg-page-inverse`

### 5.2 `surface`

- `surface.base`
- `surface.panel`
- `surface.card`
- `surface.card-soft`
- `surface.elevated`
- `surface.elevated-soft`
- `surface.hero-float`
- `surface.hero-float-strong`
- `surface.inverse`
- `surface.inverse-card`
- `surface.inverse-panel`
- `surface.glass`
- `surface.glass-strong`
- `surface.membership-silver`
- `surface.membership-gold`
- `surface.membership-diamond`

推荐用途：

- 常规卡片：`bg-surface-card`
- 柔和卡片：`bg-surface-card-soft`
- 表单或浮层：`bg-surface-panel`
- 更强层级卡片：`bg-surface-elevated`
- 深色区块内部面板：`bg-surface-inverse-panel`

### 5.3 `text`

- `text.heading`
- `text.heading-strong`
- `text.body`
- `text.body-soft`
- `text.muted`
- `text.warm`
- `text.subtle`
- `text.luxe`
- `text.inverse`
- `text.inverse-soft`
- `text.inverse-muted`
- `text.inverse-subtle`
- `text.inverse-faint`

推荐用途：

- 一级标题：`text-text-heading`
- 普通正文：`text-text-body`
- 次级正文：`text-text-body-soft`
- 弱提示：`text-text-muted`
- 标签/辅助信息：`text-text-subtle`
- 深色底文字：`text-text-inverse`

### 5.4 `brand`

共享和主题扩展后的常用 token：

- `brand.primary`
- `brand.primary-soft`
- `brand.highlight`
- `brand.highlight-strong`
- `brand.highlight-soft`
- `brand.highlight-warm`
- `brand.rose`
- `brand.rose-line`
- `brand.luxury`
- `brand.luxury-soft`
- `brand.brown`
- `brand.warm`
- `brand.rose-deep`

推荐用途：

- 品牌强调：`text-brand-highlight-strong`
- 品牌辅助线：`bg-brand-highlight-soft`
- 暖色强调文字：`text-brand-brown`
- 柔和品牌底：`bg-brand-highlight/10`

### 5.5 `border`

- `border.base`
- `border.soft`
- `border.subtle`
- `border.muted`
- `border.light`
- `border.inverse`
- `border.inverse-soft`
- `border.inverse-hover`
- `border.highlight`
- `border.highlight-soft`
- `border.elevated`
- `border.hero-float`
- `border.membership-silver`
- `border.membership-gold`
- `border.membership-diamond`

推荐用途：

- 常规边框：`border-border-base`
- 输入/卡片次级边框：`border-border-soft`
- 分割线：`border-border-light`
- hover 高亮边框：`hover:border-border-highlight/50`

### 5.6 `button`

- `button.primary`
- `button.primary-hover`
- `button.highlight`
- `button.highlight-hover`
- `button.neutral`
- `button.neutral-ink`
- `button.neutral-contrast`
- `button.membership-silver`
- `button.membership-silver-hover`
- `button.membership-gold`
- `button.membership-gold-hover`
- `button.membership-diamond`
- `button.membership-diamond-hover`

推荐用途：

- 主 CTA：`bg-button-highlight text-button-neutral-ink`
- 深色文字按钮：`bg-button-primary text-button-neutral-contrast`
- hover：`hover:bg-button-highlight-hover`

## 6. 推荐写法

### 6.1 页面根容器

```vue
<view class="min-h-screen bg-page-base text-text-heading">
```

### 6.2 常规卡片

```vue
<view class="border border-border-base bg-surface-card shadow-card">
```

### 6.3 轻量表单/面板

```vue
<view class="border border-border-soft bg-surface-card-soft">
```

### 6.4 主要按钮

```vue
<view class="bg-button-highlight text-button-neutral-ink hover:bg-button-highlight-hover">
```

### 6.5 深色 Hero 区域

```vue
<view class="bg-home-hero text-text-heading">
```

### 6.6 Hero 特殊变量

```vue
<view
  class="border [background-color:var(--hero-secondary-cta-bg)] [border-color:var(--hero-secondary-cta-border)]"
>
```

## 7. 选择规则

写新样式时，按下面顺序选 token：

1. 先判断语义，不要先想色值。
2. 页面背景优先看 `page.*`。
3. 卡片、面板、浮层优先看 `surface.*`。
4. 文案优先看 `text.*`。
5. 强调色、点缀色优先看 `brand.*`。
6. 按钮优先看 `button.*`。
7. 边框优先看 `border.*`。
8. 整块 hero 背景优先看 `gradient.*`。
9. 特殊 hero 局部效果优先看 `hero.*` 原始变量。

一个简单判断：

- “这是页面/卡片/文字/边框/按钮中的哪一种” 比 “这是一种什么颜色” 更重要。

## 8. 明确禁止

除非是一次性原型或布局实验，新代码禁止：

- 直接新增 `bg-[#xxxxxx]`
- 直接新增 `text-[#xxxxxx]`
- 直接新增 `border-[#xxxxxx]`
- 直接新增 `shadow-[0_...]` 作为长期方案
- 用组件名或页面名命名普通颜色 token，例如 `login-red`、`profile-gold-bg`

允许继续使用 arbitrary value 的场景：

- 宽高、间距、圆角、位移等布局值
- `var(--hero-...)` 这种原始主题变量
- 暂时没有抽象价值的特殊路径/装饰

## 9. 什么时候应该新增 Token

满足以下任一条件，就不要继续写硬编码：

- 同一个颜色或阴影出现 2 次以上
- 这个值需要在 `light` / `dark` 间切换
- 这个值会成为一类可复用组件的标准样式
- 这个值是品牌语义的一部分

## 10. 新增 Token 的步骤

### 10.1 新增颜色类 token

1. 在 `src/constants/theme-tokens.json` 中增加 key
2. 如果是跨主题共用，优先放到 `shared`
3. 如果是主题差异值，必须同时补齐 `themes.dark` 和 `themes.light`
4. 直接在模板里使用对应 utility

例如：

- `surface.notice`
- `text.notice`
- `border.notice`

### 10.2 新增渐变或阴影 token

分别放到：

- `gradient.*`
- `shadow.*`

然后直接使用：

- `bg-your-gradient-name`
- `shadow-your-shadow-name`

### 10.3 新增原始变量 token

如果是 `hero` 这种不适合映射成颜色 utility 的变量：

1. 放到 `theme-tokens.json` 对应 raw root 下
2. 在模板中使用 `var(--...)`

## 11. 一个容易踩坑的限制

Tailwind utility 的 key 是根据 `tailwind.config.js` 里的 `DEFAULT_THEME = 'dark'` 生成的。

这意味着：

- 新 token key 如果只写在 `light`，对应 class 不会生成
- 新 token key 至少要在 `dark` 里存在
- 最安全的做法是：主题相关 token 在 `dark` 和 `light` 都补齐

这条尤其重要。

## 12. 当前项目里的例外和技术债

当前仓库并没有完全遵守上面的规范，主要例外有：

- `src/pages/user/*.vue` 里仍有较多 `bg-[#...]`、`text-[#...]`、`border-[#...]`
- `src/pages/auth/*.vue` 目前也还是硬编码颜色为主
- `src/components/home/HomeMembership.vue` 里有一部分特殊色值

这意味着现阶段应该这样理解规范：

- 新代码优先按 token 写
- 旧代码允许逐步迁移
- 不要继续扩大硬编码颜色的范围

## 13. 推荐的落地原则

以后做样式时，默认执行下面这条规则：

- 先查 token 文档和 `theme-tokens.json`
- 能用 token 就不用十六进制
- 真的需要新增视觉语义时，先补 token，再写页面

## 14. 可参考的现有实现

这几个文件已经比较接近规范写法，可以当作参考：

- `src/components/layout/AppHeader.vue`
- `src/components/home/HomeHero.vue`
- `src/components/common/directory/DirectoryCardFrame.vue`
- `src/components/common/detail/DetailHeroPanel.vue`

## 15. 后续建议

如果后面你还想继续把规范落地，建议按这个顺序做：

1. 先把 `auth` 页面改成 token 写法
2. 再整理 `user` 页面组
3. 最后再处理零散组件里的遗留硬编码


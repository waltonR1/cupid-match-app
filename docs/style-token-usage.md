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
- `brand.accent-strong` -> `text-brand-accent-strong`
- `button.accent` -> `bg-button-accent`

这些 utility 支持透明度后缀，因为底层是 `rgb(var(--color-...)/<alpha-value>)`：

- `bg-page-base/92`
- `border-brand-accent/35`
- `bg-brand-accent/8`

### 4.2 渐变 token

`gradient` 会映射到 `backgroundImage`，使用方式统一为 `bg-*`。

### 4.3 阴影 token

`shadow` 会映射到 `boxShadow`，使用方式统一为 `shadow-*`。

### 4.4 原始 CSS 变量 token

`hero` 属于原始变量，不会自动生成 utility class，只能通过 CSS 变量使用。

例如：

```vue
<view
  class="[background-color:var(--hero-secondary-cta-bg)] [border-color:var(--hero-secondary-cta-border)]"
/>
```

## 5. 当前 Token 清单

下面按根分类列出当前全部 token，并为每个 token 用中文写明用途。

### 5.1 `page`

- `page.base`：页面主背景色，用于页面最外层容器和整页底色。 常见 utility：`bg-page-base`
- `page.soft`：页面次级背景色，用于交替 section、浅层内容区和过渡背景。 常见 utility：`bg-page-soft`

### 5.2 `surface`

- `surface.base`：基础内容底板，用于普通内容区或默认容器底色。 常见 utility：`bg-surface-base`
- `surface.card`：标准卡片底色，用于通用信息卡片和列表项容器。 常见 utility：`bg-surface-card`
- `surface.card-soft`：柔和卡片底色，用于层级较轻的说明卡片或辅助内容块。 常见 utility：`bg-surface-card-soft`
- `surface.hero-float-strong`：Hero 区悬浮块底色，用于深色 hero 上的漂浮信息面板。 常见 utility：`bg-surface-hero-float-strong`
- `surface.inverse-card`：反相卡片底色，用于深色区域内部的深色卡片。 常见 utility：`bg-surface-inverse-card`
- `surface.inverse-panel`：反相面板底色，用于深色 hero 或深色 section 内的面板容器。 常见 utility：`bg-surface-inverse-panel`
- `surface.membership-diamond`：Diamond 会员等级卡片底色，用于最高等级会员档位。 常见 utility：`bg-surface-membership-diamond`
- `surface.membership-gold`：Gold 会员等级卡片底色，用于主推或推荐会员档位。 常见 utility：`bg-surface-membership-gold`
- `surface.membership-silver`：Silver 会员等级卡片底色，用于入门会员档位。 常见 utility：`bg-surface-membership-silver`
- `surface.panel`：面板底色，用于表单区、筛选条、工具条和浮层内容区。 常见 utility：`bg-surface-panel`

### 5.3 `text`

- `text.body`：标准正文文字色，用于大部分正文和描述文案。 常见 utility：`text-text-body`
- `text.body-soft`：次级正文文字色，用于补充说明和较轻正文。 常见 utility：`text-text-body-soft`
- `text.heading`：主标题文字色，用于页面和模块的主要标题。 常见 utility：`text-text-heading`
- `text.inverse`：深色背景上的主文字色，用于深底高对比文案。 常见 utility：`text-text-inverse`
- `text.inverse-muted`：深色背景上的弱提示文字色，用于深底辅助信息。 常见 utility：`text-text-inverse-muted`
- `text.inverse-soft`：深色背景上的次级正文色，用于深底说明文案。 常见 utility：`text-text-inverse-soft`
- `text.inverse-subtle`：深色背景上的轻辅助文字色，用于标签和非核心提示。 常见 utility：`text-text-inverse-subtle`
- `text.lead`：导语文字色，用于段首引导、短句强调和说明型副标题。 常见 utility：`text-text-lead`
- `text.muted`：弱提示文字色，用于时间、状态补充和低优先级说明。 常见 utility：`text-text-muted` / `bg-text-muted`
- `text.subtle`：最轻辅助文字色，用于标签、注释和非核心补充信息。 常见 utility：`text-text-subtle`

### 5.4 `brand`

- `brand.accent`：通用品牌强调色，用于强调描边、图标和局部点缀。 常见 utility：`bg-brand-accent` / `text-brand-accent`
- `brand.accent-foreground`：强调底或深色底上的高可读前景色，用于文字和图标前景。 常见 utility：`text-brand-accent-foreground`
- `brand.accent-soft`：柔和品牌强调色，用于浅层装饰、弱光效和柔和点缀。 常见 utility：`text-brand-accent-soft` / `border-brand-accent-soft`
- `brand.accent-strong`：更强的品牌强调色，用于标题高光、关键数字和核心强调。 常见 utility：`text-brand-accent-strong` / `bg-brand-accent-strong`
- `brand.primary`：主品牌强调色，用于高识别主动作、品牌标记和强提示。 常见 utility：`bg-brand-primary` / `border-brand-primary`
- `brand.primary-soft`：主品牌柔和版本，用于轻量提示底色或弱化品牌点缀。 常见 utility：`bg-brand-primary-soft`
- `brand.secondary`：次级品牌强调色，用于与主强调线区分开的补充点缀或状态提示。 常见 utility：`text-brand-secondary` / `bg-brand-secondary`
- `brand.secondary-soft`：次级品牌强调的柔和版本，用于轻提示和补充状态。 常见 utility：`border-brand-secondary-soft`
- `brand.support`：辅助品牌强调色，用于 eyebrow、索引文字和辅助强调文案。 常见 utility：`text-brand-support` / `bg-brand-support`
- `brand.support-soft`：更轻的辅助品牌色，用于深色区副标题和柔和强调文本。 常见 utility：`text-brand-support-soft`

### 5.5 `border`

- `border.accent`：品牌强调边框色，用于强调态、交互态和视觉高亮轮廓。 常见 utility：`border-border-accent` / `bg-border-accent`
- `border.accent-soft`：柔和品牌强调边框色，用于弱强调分组和轻高亮边界。 常见 utility：`bg-border-accent-soft` / `border-border-accent-soft`
- `border.base`：标准结构边框色，用于默认卡片、面板和内容分隔。 常见 utility：`border-border-base` / `bg-border-base`
- `border.hero-float`：Hero 悬浮块边框色，用于 hero 上漂浮信息块的轮廓。 常见 utility：`border-border-hero-float`
- `border.inverse`：深色背景上的主边框色，用于反相卡片和深色模块轮廓。 常见 utility：`border-border-inverse` / `bg-border-inverse`
- `border.inverse-hover`：深色背景上的 hover 或 focus 边框色。 常见 utility：`border-border-inverse-hover`
- `border.inverse-soft`：深色背景上的次级边框色，用于柔和轮廓和内部分隔。 常见 utility：`border-border-inverse-soft`
- `border.light`：最轻分割线颜色，用于列表分隔和轻边界。 常见 utility：`border-border-light` / `bg-border-light`
- `border.membership-diamond`：Diamond 会员等级卡片边框色。 常见 utility：`border-border-membership-diamond`
- `border.membership-gold`：Gold 会员等级卡片边框色。 常见 utility：`border-border-membership-gold` / `bg-border-membership-gold`
- `border.membership-silver`：Silver 会员等级卡片边框色。 常见 utility：`border-border-membership-silver` / `bg-border-membership-silver`
- `border.muted`：中等存在感边框色，用于需要看见但不抢视觉的分隔。 常见 utility：`border-border-muted`
- `border.soft`：柔和边框色，用于次级卡片、输入框和弱边界。 常见 utility：`border-border-soft` / `bg-border-soft`

### 5.6 `button`

- `button.accent`：通用强调按钮底色，用于首页和营销场景主 CTA。 常见 utility：`bg-button-accent` / `border-button-accent`
- `button.accent-hover`：通用强调按钮 hover 底色。 常见 utility：`bg-button-accent-hover` / `border-button-accent-hover`
- `button.membership-diamond`：Diamond 会员等级卡片 CTA 按钮底色。 常见 utility：`bg-button-membership-diamond` / `border-button-membership-diamond`
- `button.membership-diamond-hover`：Diamond 会员等级卡片 CTA hover 底色。 常见 utility：`bg-button-membership-diamond-hover` / `border-button-membership-diamond-hover`
- `button.membership-gold`：Gold 会员等级卡片 CTA 按钮底色。 常见 utility：`bg-button-membership-gold` / `border-button-membership-gold`
- `button.membership-gold-hover`：Gold 会员等级卡片 CTA hover 底色。 常见 utility：`bg-button-membership-gold-hover` / `border-button-membership-gold-hover`
- `button.neutral`：中性色按钮底色，用于反相场景或次级按钮底板。 常见 utility：`border-button-neutral` / `text-button-neutral`
- `button.neutral-contrast`：高对比按钮前景色，用于深色主按钮上的浅色文字。 常见 utility：`text-button-neutral-contrast`
- `button.neutral-ink`：中性色按钮上的文字和图标前景色。 常见 utility：`text-button-neutral-ink` / `bg-button-neutral-ink`
- `button.primary`：主操作按钮底色，用于高识别主动作按钮。 常见 utility：`bg-button-primary` / `border-button-primary`
- `button.primary-hover`：主操作按钮 hover 底色。 常见 utility：`bg-button-primary-hover` / `border-button-primary-hover`

### 5.7 `gradient`

- `gradient.auth-hero`：登录注册等认证场景 Hero 主背景渐变。 常见 utility：`bg-auth-hero`
- `gradient.decor-ambient`：大面积环境氛围渐变，用于 section 外层铺底和背景气氛。 常见 utility：`bg-decor-ambient`
- `gradient.decor-glow`：局部光晕渐变，用于制造聚焦点和局部高光。 常见 utility：`bg-decor-glow`
- `gradient.decor-haze`：柔和雾化渐变，用于弱化边缘和增加空气感。 常见 utility：`bg-decor-haze`
- `gradient.events-hero`：活动相关 Hero 主背景渐变。 常见 utility：`bg-events-hero`
- `gradient.home-hero`：首页 Hero 主背景渐变。 常见 utility：`bg-home-hero`
- `gradient.membership-diamond-card`：Diamond 会员卡片主体渐变背景。 常见 utility：`bg-membership-diamond-card`
- `gradient.membership-diamond-card-glow`：Diamond 会员卡片局部高光渐变。 常见 utility：`bg-membership-diamond-card-glow`
- `gradient.membership-gold-card`：Gold 会员卡片主体渐变背景。 常见 utility：`bg-membership-gold-card`
- `gradient.membership-gold-card-glow`：Gold 会员卡片局部高光渐变。 常见 utility：`bg-membership-gold-card-glow`
- `gradient.membership-hero`：会员页 Hero 主背景渐变。 常见 utility：`bg-membership-hero`

### 5.8 `shadow`

- `shadow.card`：标准卡片阴影，用于通用内容卡片。 常见 utility：`shadow-card`
- `shadow.dropdown`：下拉层阴影，用于菜单、选择器和悬浮列表。 常见 utility：`shadow-dropdown`
- `shadow.emphasis`：强调模块阴影，用于重点 section 和需要额外层次的容器。 常见 utility：`shadow-emphasis`
- `shadow.feature`：特色模块阴影，用于功能亮点卡片和重点功能块。 常见 utility：`shadow-feature`
- `shadow.hero`：Hero 区大体量阴影，用于大幅视觉模块。 常见 utility：`shadow-hero`
- `shadow.luxe`：高等级会员或重点营销卡片的厚重阴影。 常见 utility：`shadow-luxe`
- `shadow.panel`：轻量面板阴影，用于工具条、筛选条和轻浮层。 常见 utility：`shadow-panel`
- `shadow.soft-luxe`：高等级卡片的柔和阴影版本，用于保留质感但降低压迫感。 常见 utility：`shadow-soft-luxe`

### 5.9 `hero`

- `hero.ornament.fill`：Hero 装饰填充变量。 使用方式：`var(--hero-ornament-fill)`
- `hero.ornament.line`：Hero 装饰线条变量。 使用方式：`var(--hero-ornament-line)`
- `hero.secondary-cta.bg`：Hero 区次级 CTA 的背景变量。 使用方式：`var(--hero-secondary-cta-bg)`
- `hero.secondary-cta.bg-hover`：Hero 区次级 CTA 的 hover 背景变量。 使用方式：`var(--hero-secondary-cta-bg-hover)`
- `hero.secondary-cta.border`：Hero 区次级 CTA 的边框变量。 使用方式：`var(--hero-secondary-cta-border)`

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
<view class="bg-button-accent text-button-neutral-ink hover:bg-button-accent-hover">
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
- 暂时没有抽象价值的特殊路径或装饰

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

- `src/pages/account/*.vue` 里仍有较多 `bg-[#...]`、`text-[#...]`、`border-[#...]`

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
- `src/components/home/HomeMembership.vue`
- `src/components/common/directory/DirectoryCardFrame.vue`
- `src/components/common/detail/DetailHeroPanel.vue`

## 15. 后续建议

如果后面还要继续收口命名，优先看这两类：

1. `shadow.luxe`、`shadow.soft-luxe` 这种还带气质语义的 token
2. `account` 页面里的硬编码样式

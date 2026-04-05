# 颜色 Token 整改方案

- 日期：2026-04-05
- 适用范围：`src/constants/theme-tokens.json`、`tailwind.config.js`、`scripts/generate-token-docs.js`、`src/**/*.vue`
- 当前结论：先出方案，不改运行时代码；本文件是后续重构的唯一基线

## 1. 背景

当前仓库已经把大量颜色从硬编码十六进制迁移到了 token，但结果并没有达到“语义统一”的目标，反而形成了新的问题：

1. 页面在消费“调色板”，而不是消费“语义”。
2. `bg-token/NN`、`border-token/NN`、`text-token/NN` 被大面积当成日常写法，页面继续在自己拼颜色。
3. token 树内存在明显的重复色和近似色，导致同一种视觉角色有多个名称。
4. 一些局部视觉需求被塞进全局 token，污染了全局命名边界。
5. 工具链本身在鼓励这种坏模式继续增长。

## 2. 现状证据

### 2.1 透明度拼色已经系统化

- 源码中存在 `41` 种不同的 `颜色/数字` 透明度写法。
- 高频模式：
  - `brand-accent/NN`：`92` 次
  - `border-accent/NN`：`39` 次
  - `surface-inverse-panel/NN`：`31` 次
  - `border-inverse/NN`：`24` 次
- 高频透明度：
  - `/10`：`33` 次
  - `/35`：`21` 次
  - `/34`：`19` 次
  - `/70`：`22` 次
  - `/80`：`14` 次

### 2.2 脏页集中，适合分批收口

- `src/components/membership/MembershipTiersSection.vue`：`23` 处
- `src/components/events/EventDetailHero.vue`：`17` 处
- `src/components/events/EventsHero.vue`：`17` 处
- `src/pages/auth/login.vue`：`17` 处
- `src/pages/auth/register.vue`：`15` 处
- `src/components/membership/MembershipHero.vue`：`14` 处

### 2.3 token 内部存在重复和近似色

明确重复：

| 值 | 当前 token |
| --- | --- |
| `#d7b86e` | `shared.brand.accent` / `shared.border.accent` / `shared.button.accent` / `themes.light.border.membership-gold` |
| `#fffaf3` | `shared.text.inverse` / `themes.light.button.neutral-contrast` |
| `#4b6279` | `themes.dark.border.light` / `themes.dark.border.hero-float` |
| `#10263b` | `themes.dark.button.neutral-ink` / `themes.dark.button.neutral-contrast` |

高相似度近色：

| 颜色组 | 当前值 |
| --- | --- |
| 深蓝组 | `#102336` / `#10263b` / `#10263d` / `#152b40` / `#162b40` |
| 浅米白组 | `#fff8ef` / `#fffaf3` / `#faf7f1` / `#fbf7ef` / `#f6ecdf` / `#f3ede3` / `#f3ede4` |
| 金色组 | `#d7b86e` / `#d8b67a` / `#d8b879` / `#d9bb74` / `#d4af37` / `#ecd5aa` / `#e6cb92` |
| 粉色组 | `#e1a4ad` / `#d08e92` / `#B84C5C` |

### 2.4 工具链在鼓励错误用法

当前错误不是单纯“页面作者乱写”，而是机制设计使然：

- `tailwind.config.js` 当前把普通颜色 token 映射为：

```js
rgb(var(--color-... ) / <alpha-value>)
```

这等于把 `/NN` 透明度拼接声明为正式能力。

- `scripts/generate-token-docs.js` 当前文档示例里也直接展示：

```txt
bg-brand-accent/8
```

也就是说，文档和工具都在告诉开发者：“页面可以继续自己拼色”。

## 3. 根因定位

### 3.1 token 分层错了

当前系统把“设计原色”“语义颜色”“组件私有颜色”混在一起暴露给页面。

页面最终看到的是：

- `brand.accent`
- `border.accent`
- `button.accent`
- `surface.membership-gold`
- `border.hero-float`

这些命名看似语义化，实际上仍然是半调色板、半组件实现细节。

### 3.2 Tailwind 暴露层过低

当前是“整个 token 树几乎都能变成 utility”。这会导致：

1. 页面直接拿低层 token 拼装视觉。
2. 同一个语义在不同文件里通过不同 token 组合出来。
3. 设计规范失去约束力。

### 3.3 一些 token 被错误复用

有些 token 名称看起来合理，实际上承担了多个不同场景：

- `button.neutral-ink`
- `button.neutral-contrast`
- `brand.primary-soft`
- `brand.secondary`

这类 token 后续不能简单重命名，必须按使用场景拆分。

## 4. 整改目标

本次整改要达成的不是“全部替换成新的名字”，而是以下五个目标：

1. 页面只能消费语义 token，不能继续拼颜色。
2. 基础色板与语义层完全解耦。
3. 全局 token 与组件私有 token 边界清晰。
4. 近似色先合并，再命名。
5. 工具链默认阻止坏写法，而不是默许坏写法。

## 5. 目标结构草案

### 5.1 新的分层模型

新的结构分为四层：

1. `palette.*`
   - 设计内部色板。
   - 只服务于 token 定义。
   - 不允许在模板里直接使用。
   - 不生成 Tailwind utility。
2. `semantic.*`
   - 允许页面直接消费的全局语义 token。
   - 仅这一层生成 `bg-*`、`text-*`、`border-*` utility。
3. `component.*`
   - 组件或场景私有 token。
   - 例如 hero、membership-tier、status-badge。
   - 不生成通用颜色 utility，只暴露为 CSS 变量。
4. `effect.*`
   - 渐变、阴影、光晕等效果 token。
   - 保留 `gradient.*`、`shadow.*` 方向，但与颜色层分离。

### 5.2 允许暴露给页面的语义根

后续只允许以下根直接生成 Tailwind utility：

- `page`
- `surface`
- `text`
- `border`
- `accent`
- `action`
- `state`

不再直接暴露：

- `palette`
- `hero`
- `membership`
- `badge`
- 任何组件名或页面名

### 5.3 推荐的目标命名

#### 全局语义层

| 根 | 目标职责 |
| --- | --- |
| `page.*` | 页面级背景 |
| `surface.*` | 面板、卡片、浮层、反相面板 |
| `text.*` | 文本层级和文本强调 |
| `border.*` | 分隔、轮廓、强调边界 |
| `accent.*` | 品牌强调、品牌辅助强调 |
| `action.*` | 交互组件的背景/前景/hover |
| `state.*` | 状态型色彩，如 badge、notice、featured |

#### 组件私有层

| 根 | 目标职责 |
| --- | --- |
| `component.hero.*` | Hero ornament、secondary CTA、悬浮面板 |
| `component.tier.*` | Silver / Gold / Diamond 卡片与按钮 |
| `component.badge.*` | 状态 badge 的前景、背景、边框 |
| `component.auth.*` | 登录注册页局部覆盖层和装饰面板 |

### 5.4 建议的目标 JSON 草案

下面是目标结构草案，不是可直接执行的最终 JSON，只用于定义重构方向：

```jsonc
{
  "palette": {
    "navy": {
      "950": "#10263b",
      "900": "#152b40",
      "850": "#1a3249",
      "800": "#223b55",
      "700": "#37516c",
      "600": "#4b6279"
    },
    "cream": {
      "0": "#fffaf3",
      "50": "#faf7f1",
      "100": "#f6ecdf",
      "200": "#e6dac8",
      "300": "#d6c8b5",
      "400": "#beab91"
    },
    "gold": {
      "600": "#b07d45",
      "500": "#d7b86e",
      "400": "#ecd5aa",
      "300": "#f0dfc1"
    },
    "rose": {
      "500": "#b84c5c",
      "300": "#d08e92"
    },
    "red": {
      "600": "#d71934",
      "500": "#ef233c"
    }
  },
  "themes": {
    "dark": {
      "page": {
        "canvas": "{palette.navy.950}",
        "canvas-subtle": "{palette.navy.900}"
      },
      "surface": {
        "default": "{palette.navy.900}",
        "raised": "{palette.navy.850}",
        "soft": "{palette.navy.800}",
        "inverse-default": "{palette.navy.850}",
        "inverse-raised": "{palette.navy.800}"
      },
      "text": {
        "primary": "{palette.cream.0}",
        "secondary": "{palette.cream.200}",
        "tertiary": "{palette.cream.300}",
        "muted": "{palette.cream.400}",
        "accent": "{palette.gold.400}",
        "inverse-primary": "{palette.cream.0}",
        "inverse-secondary": "{palette.cream.200}",
        "inverse-muted": "{palette.cream.300}"
      },
      "border": {
        "default": "{palette.navy.700}",
        "soft": "{palette.navy.600}",
        "faint": "{palette.navy.600}",
        "inverse": "{palette.navy.700}",
        "inverse-strong": "{palette.navy.600}",
        "accent": "{palette.gold.500}"
      },
      "accent": {
        "brand": "{palette.gold.500}",
        "brand-strong": "{palette.gold.500}",
        "brand-muted": "{palette.gold.400}",
        "support": "{palette.gold.500}",
        "secondary": "{palette.rose.300}",
        "critical": "{palette.red.600}"
      },
      "action": {
        "accent-bg": "{palette.gold.500}",
        "accent-bg-hover": "{palette.gold.400}",
        "accent-fg": "{palette.navy.950}",
        "critical-bg": "{palette.red.600}",
        "critical-bg-hover": "{palette.red.500}",
        "critical-fg": "{palette.cream.0}",
        "inverse-bg": "{palette.cream.200}",
        "inverse-fg": "{palette.navy.950}"
      },
      "state": {
        "featured-bg": "{palette.gold.400}",
        "featured-fg": "{palette.navy.950}",
        "secondary-bg": "{palette.rose.300}",
        "secondary-fg": "{palette.cream.0}"
      },
      "component": {
        "hero": {},
        "tier": {},
        "badge": {},
        "auth": {}
      }
    }
  }
}
```

## 6. 收口规则

### 6.1 页面禁用规则

新结构确定后，页面层禁止继续新增以下写法：

- `bg-token/NN`
- `text-token/NN`
- `border-token/NN`
- `bg-[#xxxxxx]`
- `text-[#xxxxxx]`
- `border-[#xxxxxx]`
- 任意以页面名、业务模块名直接命名的全局颜色 token

### 6.2 允许保留的例外

以下场景可以继续使用原始变量，但必须进入 `component.*`：

- Hero 装饰线、装饰面填充、特殊 CTA 背景
- Membership tier 卡片局部高光
- Badge 的局部底色与边框
- 无法抽象为全局语义的局部装饰

### 6.3 不再依赖 `/NN`

常见透明效果不再由页面决定数值，而是沉淀为明确 token，例如：

| 当前写法族 | 目标写法 |
| --- | --- |
| `bg-brand-accent/8`、`/10`、`/12` | `bg-accent-brand-tint-soft` |
| `bg-brand-accent/16`、`/18`、`/20` | `bg-accent-brand-tint` |
| `bg-brand-accent/30`、`/35`、`/40` | `bg-accent-brand-tint-strong` |
| `border-border-accent/25`、`/30`、`/35` | `border-border-accent-soft` |
| `border-border-accent/50`、`/55`、`/60` | `border-border-accent-strong` |
| `bg-surface-inverse-panel/16`、`/24`、`/34` | `bg-surface-inverse-soft` |
| `bg-surface-inverse-panel/50`、`/70`、`/88` | `bg-surface-inverse-elevated` |

说明：

- 上表不是机械替换表，而是“替代思路”。
- 真正迁移时应按语义落位，不应继续把 `34`、`35`、`36` 这类数字当作设计资产。

## 7. 色板合并映射表

### 7.1 目标基础色板

| 目标 palette | 建议值 | 合并来源 |
| --- | --- | --- |
| `palette.navy.950` | `#10263b` | `themes.dark.page.base`、`themes.dark.button.neutral-ink`、`themes.dark.button.neutral-contrast`、接近 `#10263d` |
| `palette.navy.900` | `#152b40` | `themes.dark.surface.base`、接近 `themes.light.surface.membership-diamond` |
| `palette.navy.850` | `#1a3249` | `themes.dark.surface.panel`、接近 `themes.dark.surface.card`、`themes.dark.surface.card-soft` |
| `palette.navy.800` | `#223b55` | `themes.dark.surface.hero-float-strong`、接近 `shared.surface.inverse-card` |
| `palette.navy.700` | `#37516c` | `themes.dark.border.soft`、接近 `themes.dark.border.base`、`themes.dark.border.muted` |
| `palette.navy.600` | `#4b6279` | `themes.dark.border.light`、`themes.dark.border.hero-float` |
| `palette.cream.0` | `#fffaf3` | `shared.text.inverse`、`themes.light.button.neutral-contrast`、接近 `themes.dark.text.heading` |
| `palette.cream.50` | `#faf7f1` | `themes.light.surface.card`、`themes.light.surface.card-soft` |
| `palette.cream.100` | `#f6ecdf` | `themes.light.surface.panel`、接近 `themes.light.page.soft` |
| `palette.cream.200` | `#e6dac8` | `themes.dark.text.body`、接近 `shared.text.inverse-muted` |
| `palette.cream.300` | `#d6c8b5` | `themes.dark.text.body-soft` |
| `palette.cream.400` | `#beab91` | `themes.dark.text.muted`、接近 `themes.light.text.subtle` |
| `palette.gold.600` | `#b07d45` | `themes.light.brand.support` |
| `palette.gold.500` | `#d7b86e` | `shared.brand.accent`、`shared.border.accent`、`shared.button.accent`、`themes.light.border.membership-gold` |
| `palette.gold.400` | `#ecd5aa` | `themes.dark.brand.support-soft`、接近 `themes.light.surface.membership-gold` |
| `palette.gold.300` | `#f0dfc1` | `themes.dark.button.membership-diamond`、接近 `themes.light.button.membership-diamond` |
| `palette.rose.500` | `#b84c5c` | `themes.light.brand.secondary` |
| `palette.rose.300` | `#d08e92` | `shared.brand.secondary-soft`、接近 `themes.dark.brand.secondary` |
| `palette.red.600` | `#d71934` | `shared.brand.primary`、接近 `shared.button.primary` |
| `palette.red.500` | `#ef233c` | `shared.button.primary-hover` |

### 7.2 需要从全局层移出的颜色

以下 token 不适合继续留在全局色板语义层，应迁移到 `component.*`：

| 当前 token |
| --- |
| `surface.membership-silver` |
| `surface.membership-gold` |
| `surface.membership-diamond` |
| `surface.hero-float-strong` |
| `border.membership-silver` |
| `border.membership-gold` |
| `border.membership-diamond` |
| `border.hero-float` |
| `button.membership-gold` |
| `button.membership-gold-hover` |
| `button.membership-diamond` |
| `button.membership-diamond-hover` |

## 8. 旧 token 到新 token 映射表

### 8.1 直接重命名或直接合并

| 旧 token | 新 token | 处理方式 |
| --- | --- | --- |
| `page.base` | `page.canvas` | 直接重命名 |
| `page.soft` | `page.canvas-subtle` | 直接重命名 |
| `surface.base` | `surface.default` | 直接重命名 |
| `surface.panel` | `surface.soft` | 直接重命名 |
| `surface.card` | `surface.raised` | 直接重命名 |
| `surface.card-soft` | `surface.subtle` | 直接重命名 |
| `shared.surface.inverse-panel` | `surface.inverse-default` | 直接重命名 |
| `shared.surface.inverse-card` | `surface.inverse-raised` | 直接重命名 |
| `text.heading` | `text.primary` | 直接重命名 |
| `text.body` | `text.secondary` | 直接重命名 |
| `text.body-soft` | `text.tertiary` | 直接重命名 |
| `text.muted` | `text.muted` | 保留语义，底层值收口 |
| `text.subtle` | `text.subtle` | 保留语义，底层值收口 |
| `text.lead` | `text.accent` | 直接重命名 |
| `shared.text.inverse` | `text.inverse-primary` | 直接重命名 |
| `shared.text.inverse-soft` | `text.inverse-secondary` | 直接重命名 |
| `shared.text.inverse-muted` | `text.inverse-muted` | 直接重命名 |
| `shared.text.inverse-subtle` | `text.inverse-subtle` | 直接重命名 |
| `border.base` | `border.default` | 直接重命名 |
| `border.soft` | `border.soft` | 保留语义，底层值收口 |
| `border.muted` | `border.muted` | 保留语义，底层值收口 |
| `border.light` | `border.faint` | 直接重命名 |
| `shared.border.inverse` | `border.inverse` | 直接重命名 |
| `shared.border.inverse-soft` | `border.inverse-soft` | 直接重命名 |
| `shared.border.inverse-hover` | `border.inverse-strong` | 直接重命名 |
| `shared.brand.accent` | `accent.brand` | 直接重命名 |
| `shared.brand.accent-strong` | `accent.brand-strong` | 直接重命名 |
| `shared.brand.accent-soft` | `accent.brand-muted` | 直接重命名 |
| `themes.dark.brand.support` / `themes.light.brand.support` | `accent.support` | 合并 |
| `themes.dark.brand.support-soft` / `themes.light.brand.support-soft` | `accent.support-muted` | 合并 |
| `themes.dark.brand.secondary` / `themes.light.brand.secondary` | `accent.secondary` | 合并 |
| `shared.brand.secondary-soft` | `accent.secondary-muted` | 直接重命名 |
| `shared.brand.primary` | `accent.critical` | 直接重命名 |
| `shared.button.accent` | `action.accent-bg` | 直接重命名 |
| `shared.button.accent-hover` | `action.accent-bg-hover` | 直接重命名 |
| `shared.button.primary` | `action.critical-bg` | 直接重命名 |
| `shared.button.primary-hover` | `action.critical-bg-hover` | 直接重命名 |

### 8.2 必须拆分，不能机械重命名

以下 token 已经承担多个语义，必须按组件实际用途拆分：

| 旧 token | 建议去向 | 原因 |
| --- | --- | --- |
| `button.neutral` | `action.inverse-bg` 或 `component.hero.secondary-cta.bg` | 当前同时服务于全局按钮和局部 Hero 场景 |
| `button.neutral-ink` | `action.accent-fg`、`component.tier.gold.cta.fg`、`component.tier.diamond.cta.fg` | 当前是明显的“通用深色前景”，不是单一按钮语义 |
| `button.neutral-contrast` | `action.inverse-fg` 或 `component.event.hero.cta.fg` | 当前在深色按钮、Hero 卡片等场景混用 |
| `brand.primary-soft` | `state.featured-bg`、`component.badge.featured.bg` | 当前主要像 badge 或突出状态底色，不是品牌主色本体 |
| `brand.accent-foreground` | `text.on-accent` 或 `component.tier.*.fg` | 当前更像前景角色，不应继续挂在 brand 下 |

### 8.3 迁移到组件私有层

| 旧 token | 新 token | 处理方式 |
| --- | --- | --- |
| `surface.hero-float-strong` | `component.hero.float.surface` | 从全局移到组件 |
| `border.hero-float` | `component.hero.float.border` | 从全局移到组件 |
| `hero.secondary-cta.border` | `component.hero.secondary-cta.border` | 统一组件前缀 |
| `hero.secondary-cta.bg` | `component.hero.secondary-cta.bg` | 统一组件前缀 |
| `hero.secondary-cta.bg-hover` | `component.hero.secondary-cta.bg-hover` | 统一组件前缀 |
| `hero.ornament.line` | `component.hero.ornament.line` | 统一组件前缀 |
| `hero.ornament.fill` | `component.hero.ornament.fill` | 统一组件前缀 |
| `surface.membership-silver` | `component.tier.silver.surface` | 从全局移到组件 |
| `surface.membership-gold` | `component.tier.gold.surface` | 从全局移到组件 |
| `surface.membership-diamond` | `component.tier.diamond.surface` | 从全局移到组件 |
| `border.membership-silver` | `component.tier.silver.border` | 从全局移到组件 |
| `border.membership-gold` | `component.tier.gold.border` | 从全局移到组件 |
| `border.membership-diamond` | `component.tier.diamond.border` | 从全局移到组件 |
| `button.membership-gold` | `component.tier.gold.cta.bg` | 从全局移到组件 |
| `button.membership-gold-hover` | `component.tier.gold.cta.bg-hover` | 从全局移到组件 |
| `button.membership-diamond` | `component.tier.diamond.cta.bg` | 从全局移到组件 |
| `button.membership-diamond-hover` | `component.tier.diamond.cta.bg-hover` | 从全局移到组件 |

## 9. 工具链改造建议

### 9.1 Tailwind 生成规则改成白名单

当前是排除 `gradient`、`shadow`、`hero` 等少数根，其余几乎都生成 utility。后续应改为白名单：

```js
const UTILITY_TOKEN_ROOTS = new Set([
  'page',
  'surface',
  'text',
  'border',
  'accent',
  'action',
  'state',
])
```

结论：

- 只有白名单根生成颜色 utility。
- `palette.*`、`component.*` 只生成 CSS 变量，不生成 `bg-*`、`text-*`、`border-*`。

### 9.2 取消默认 `/NN` 能力

当前：

```js
rgb(var(--color-xxx) / <alpha-value>)
```

建议改为：

```js
rgb(var(--color-xxx))
```

需要半透明效果时：

1. 新增明确语义 token。
2. 或进入 `component.*` raw variable。

### 9.3 文档生成脚本停止宣传拼色

`scripts/generate-token-docs.js` 后续应删除此类示例：

- `bg-brand-accent/8`
- `border-brand-accent/35`
- `bg-surface-inverse-panel/70`

替换为：

- `bg-accent-brand-tint-soft`
- `border-border-accent-soft`
- `bg-surface-inverse-elevated`

### 9.4 增加静态检查

建议新增以下规则：

| 规则 | 目标 |
| --- | --- |
| 禁止 `(?:bg|text|border)-[a-z0-9-]+/[0-9]{1,3}` | 阻止新增透明度拼色 |
| 禁止 `bg-\\[#`、`text-\\[#`、`border-\\[#` | 阻止新增硬编码十六进制 |
| 禁止在模板里引用 `palette-` | 阻止页面直接消费色板 |
| 检查新 token 是否出现在 `component.<name>` 或语义白名单根 | 防止命名继续漂移 |

## 10. 迁移顺序

### 第 0 批：冻结坏写法

先上规则，不再接受新增：

- `颜色/数字`
- 新十六进制
- 新“页面名颜色 token”

### 第 1 批：先改工具链，再改 token

顺序必须是：

1. 明确新的 token 分层
2. 修改 Tailwind 白名单生成逻辑
3. 修改文档生成逻辑
4. 建立 lint/扫描规则

如果不先改工具链，页面会继续长出新的坏写法。

### 第 2 批：优先清理最高频页面

建议顺序：

1. `src/components/membership/MembershipTiersSection.vue`
2. `src/components/events/EventDetailHero.vue`
3. `src/components/events/EventsHero.vue`
4. `src/pages/auth/login.vue`
5. `src/pages/auth/register.vue`
6. `src/components/membership/MembershipHero.vue`

### 第 3 批：全仓替换重复模式

优先替换这些高频模式：

1. `bg-brand-accent/8|10|12`
2. `border-border-accent/25|30|35`
3. `bg-surface-inverse-panel/16|24|34`
4. `bg-surface-inverse-panel/50|70|88`
5. `bg-white/5`

其中 `bg-white/5` 不允许继续保留，应转入语义或组件 token。

### 第 4 批：删除死 token

迁移完成后删除：

- 重复 token
- 已被组件化替代的全局 token
- 文档里不再允许暴露的低层 token

## 11. 完成标准

整改完成时，应满足以下标准：

1. 页面层不再出现 `bg-token/NN`、`text-token/NN`、`border-token/NN`。
2. 页面层不再直接使用 `palette.*`。
3. membership、hero、badge 等局部颜色已转入 `component.*`。
4. 重复色和明显近色已经按色板收口。
5. `tailwind.config.js` 只对白名单语义根生成 utility。
6. 文档与脚本示例不再鼓励颜色拼接。

## 12. 执行时的注意事项

1. 这不是一次“纯重命名”，而是分层重构。
2. `button.neutral-ink`、`button.neutral-contrast` 这类 token 不能直接搜索替换，必须逐个场景审计。
3. 先统一层级，再统一色值；不要先调色再想命名。
4. 若某个颜色只服务于单个组件，不要再放回全局层。

## 13. 推荐的第一步落地输出

正式执行时，建议先产出三份内容，再开始改代码：

1. 新版 `theme-tokens.json` 结构草案
2. 透明度拼色替代 token 清单
3. 旧 token 到新 token 的逐文件迁移清单

本文件已经覆盖了方向和映射基线，后续实现应严格以本文件为准，不再新增平行命名体系。

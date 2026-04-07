# App Shell Design Token Mapping

本文档记录当前已迁移的 app shell 与首页核心 section 的设计 token 迁移结果，作为后续逐页迁移时的参照基线。

## Scope

- `src/components/layout/AppHeader.vue`
- `src/components/layout/AppFooter.vue`
- `src/components/common/AppButton.vue`
- `src/components/home/HomeHero.vue`
- `src/components/home/HomeVision.vue`
- `src/components/home/HomeProfilesPreview.vue`
- `src/components/common/directory/DirectoryCardFrame.vue`
- `src/components/home/HomeFamily.vue`
- `src/components/home/HomeEventsPreview.vue`
- `src/components/home/HomeFeatures.vue`
- `src/components/home/HomeAudience.vue`
- `src/components/home/HomeMembership.vue`
- `src/constants/theme-tokens.json`

## Token Semantics

### next.semantic

#### page

- `next-semantic-page-default`: 页面主背景。用于页面级背景，不用于悬浮容器或应用壳层。
- `next-semantic-page-subtle`: 页面次级背景。用于 footer、弱分区、页面收口区。

#### surface

- `next-semantic-surface-panel`: 常规承载容器。用于 header 已登录触发器、按钮容器这类明确的交互面。
- `next-semantic-surface-card`: 常规卡片表层。用于目录卡、活动卡、功能卡等独立信息卡片。
- `next-semantic-surface-soft`: 更轻的承载容器。用于 dropdown、语言切换、主题按钮等弱层级表面。

#### text

- `next-semantic-text-primary`: 最高优先级文本。用于 header 主文本、hover 后导航文本。
- `next-semantic-text-secondary`: 默认正文。用于 footer 正文、dropdown 默认文案。
- `next-semantic-text-lead`: 导语文本。用于首页 section 副标题、较长的说明性 lead copy。
- `next-semantic-text-muted`: 弱化正文。用于 footer 导航默认态、header 未激活导航。
- `next-semantic-text-subtle`: 提示或收尾文本。用于版权、箭头、细节信息。

#### border

- `next-semantic-border-default`: 默认边框。用于 header/footer 主边界、按钮默认边框。
- `next-semantic-border-soft`: 更轻的边框。用于浮层边界、收口分隔。
- `next-semantic-border-divider`: 分割线。用于 dropdown 条目之间的细分隔。

#### accent

- `next-semantic-accent-primary`: 核心强调。用于品牌名、激活导航、当前语言选项。
- `next-semantic-accent-secondary`: 次级强调。用于栏目标题、导航下划线、ghost 按钮文案。
- `next-semantic-accent-muted`: 弱强调。用于品牌副标题。

#### action

- `next-semantic-action-primary`: 主 CTA 背景与边框。
- `next-semantic-action-primary-hover`: 主 CTA hover 态。比默认态更亮，用于制造明确的按钮反馈。
- `next-semantic-action-primary-contrast`: 主 CTA 文字颜色。

### next.component

#### header

- `next-component-header-background`: header 容器专用背景。属于 app shell，不沉淀到 page。
- `next-component-header-ghost`: header 登录按钮默认底色。
- `next-component-header-ghost-hover`: header 登录按钮 hover 底色。相比默认态更亮，避免交互反馈过弱。
- `next-component-header-ghost-border`: header 登录按钮默认边框。
- `next-component-header-ghost-border-hover`: header 登录按钮 hover 边框。用于加强 hover 的视觉边界。
- `next-component-header-menu-hover`: header dropdown/locale 选项 hover 背景。
- `next-component-header-menu-selected`: header locale 当前选中背景。

### next.effect

- `shadow-next-shadow-panel`: 轻强调阴影。用于 ghost 按钮 hover，强化浮起感。
- `shadow-next-shadow-emphasis`: 主 CTA hover 阴影。用于让主按钮 hover 更明显。
- `shadow-next-shadow-dropdown`: dropdown 阴影。

## Background Classification

### AppHeader

- `bg-next-component-header-background`: app shell 背景，不属于 `page`
- `bg-next-semantic-surface-panel`: panel
- `bg-next-semantic-surface-soft`: soft surface
- `bg-next-component-header-ghost`: header local ghost surface
- `bg-next-component-header-menu-hover`: header local hover surface
- `bg-next-component-header-menu-selected`: header local selected surface

### AppFooter

- `bg-next-semantic-page-subtle`: page subtle / footer section background

## Text Classification

### AppHeader

- `text-next-semantic-text-primary`: primary
- `text-next-semantic-text-secondary`: secondary
- `text-next-semantic-text-muted`: muted
- `text-next-semantic-text-subtle`: subtle
- `text-next-semantic-accent-primary`: accent primary
- `text-next-semantic-accent-secondary`: accent secondary
- `text-next-semantic-accent-muted`: accent muted

### AppFooter

- `text-next-semantic-text-primary`: primary
- `text-next-semantic-text-secondary`: secondary
- `text-next-semantic-text-muted`: muted
- `text-next-semantic-text-subtle`: subtle
- `text-next-semantic-accent-primary`: accent primary
- `text-next-semantic-accent-secondary`: accent secondary
- `text-next-semantic-accent-muted`: accent muted

## Border Classification

### AppHeader

- `border-next-semantic-border-default`: default
- `border-next-semantic-border-soft`: soft
- `bg-next-semantic-border-divider`: divider
- `border-next-component-header-ghost-border`: header local accent border
- `border-next-component-header-ghost-border-hover`: header local accent border hover

### AppFooter

- `border-next-semantic-border-default`: default
- `border-next-semantic-border-soft`: soft

## Issues Identified

### AppHeader

- 存在 opacity 用法:
  - `bg-page-base/92`
  - `border-brand-accent/35`
  - `bg-brand-accent/8`
  - `hover:border-brand-accent/80`
  - `hover:bg-brand-accent/16`
  - `hover:bg-brand-accent/10`
  - `bg-brand-accent/12`
- 存在语义错位:
  - `page-base` 被用于 header app shell 背景
- 同一语义分散:
  - 品牌强调同时散落在 `brand-accent-strong`、`brand-support`、`brand-support-soft`
  - hover/selected 背景通过 opacity 临时拼色，未沉淀为固定 token

### AppFooter

- 无 opacity
- 语义整体比 header 简单，但仍混用了 legacy 的 `page/text/brand/border` 命名体系

## Class Mapping

### AppHeader

| Legacy class | Next class |
| --- | --- |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-page-base/92` | `bg-next-component-header-background` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-brand-support-soft` | `text-next-semantic-accent-muted` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `bg-brand-support` | `bg-next-semantic-accent-secondary` |
| `border-brand-accent/35` | `border-next-component-header-ghost-border` |
| `bg-brand-accent/8` | `bg-next-component-header-ghost` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `hover:border-brand-accent/80` | `hover:border-next-component-header-ghost-border-hover` |
| `hover:bg-brand-accent/16` | `hover:bg-next-component-header-ghost-hover` |
| `hover:text-brand-accent-strong` | `hover:text-next-semantic-accent-primary` |
| `hover:shadow-panel` | `hover:shadow-next-shadow-panel` |
| `border-button-accent` | `border-next-semantic-action-primary` |
| `bg-button-accent` | `bg-next-semantic-action-primary` |
| `text-button-neutral-ink` | `text-next-semantic-action-primary-contrast` |
| `hover:border-button-accent-hover` | `hover:border-next-semantic-action-primary-hover` |
| `hover:bg-button-accent-hover` | `hover:bg-next-semantic-action-primary-hover` |
| `hover:shadow-emphasis` | `hover:shadow-next-shadow-emphasis` |
| `bg-surface-panel` | `bg-next-semantic-surface-panel` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `bg-surface-card-soft` | `bg-next-semantic-surface-soft` |
| `text-text-subtle` | `text-next-semantic-text-subtle` |
| `shadow-dropdown` | `shadow-next-shadow-dropdown` |
| `hover:bg-brand-accent/10` | `hover:bg-next-component-header-menu-hover` |
| `bg-border-light` | `bg-next-semantic-border-divider` |
| `bg-brand-accent/12` | `bg-next-component-header-menu-selected` |

### AppFooter

| Legacy class | Next class |
| --- | --- |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-page-soft` | `bg-next-semantic-page-subtle` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-brand-support-soft` | `text-next-semantic-accent-muted` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `group-hover:text-text-heading` | `group-hover:text-next-semantic-text-primary` |
| `bg-brand-support` | `bg-next-semantic-accent-secondary` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `text-text-subtle` | `text-next-semantic-text-subtle` |

## Usage Rules For Follow-up Pages

- 页面层禁止使用 `palette`
- 页面层只允许使用 `next.semantic`、`next.component`、`next.effect`
- 不确定语义先放 `next.component`
- 复用次数达到 3 次及以上再评估沉淀到 `next.semantic`
- 禁止继续使用 opacity class
- 禁止将 `page` 语义用于 card、panel、header 这类局部容器

## AppButton

### Purpose

- 封装按钮必须的基础样式，减少后续重复拼接 utility
- 统一按钮 hover 位移、scale、阴影强度
- 用 `variant` 和 `context` 区分按钮语义与局部场景

### Props

- `variant`: `primary | secondary`
- `context`: `default | header | home-hero | section | membership-silver | membership-gold | membership-diamond | membership-free`
- `size`: `sm | md | lg | icon`
- `width`: `auto | cta | full`
- `rounded`: `none | button | xl`
- `disabled`: 是否禁用

### Current Usage

- `AppHeader` 登录按钮: `secondary + header + sm + xl`
- `AppHeader` 注册按钮: `primary + sm + xl`
- `HomeHero` 主按钮: `primary + lg + cta + none`
- `HomeHero` 次按钮: `secondary + home-hero + lg + cta + none`
- `HomeProfilesPreview` / `HomeEventsPreview` CTA: `secondary + section`
- `HomeMembership` 银卡按钮: `secondary + membership-silver + sm + full + none`
- `HomeMembership` 金卡按钮: `secondary + membership-gold + sm + full + none`
- `HomeMembership` 钻石卡按钮: `secondary + membership-diamond + sm + full + none`
- `HomeMembership` 免费入口按钮: `secondary + membership-free + sm + full + none`

## Home Hero And Vision

### Added Tokens

- `next-effect-gradient-home-hero`: Home hero 专用渐变背景
- `next-component-home-hero-secondary-action-background`: Hero 次按钮默认底色
- `next-component-home-hero-secondary-action-background-hover`: Hero 次按钮 hover 底色
- `next-component-home-hero-secondary-action-border`: Hero 次按钮边框
- `next-component-hero-ornament-line`: Hero 右侧装饰线。独立于 `home-hero`，为后续可能复用保留。
- `next-component-hero-ornament-fill`: Hero 右侧装饰填充。独立于 `home-hero`，为后续可能复用保留。
- `next-component-home-hero-divider`: Hero 数据区分隔线
- `next-component-home-vision-point-background`: Vision point 卡默认背景
- `next-component-home-vision-point-background-hover`: Vision point 卡 hover 背景
- `next-component-home-vision-point-border-hover`: Vision point 卡 hover 边框

### Background Classification

- `HomeHero`: `effect.gradient.home-hero`
- `HomeVision`: `semantic.page.default`
- `HomeVision` 主标题区: `semantic.surface.panel`
- `HomeVision` 主说明卡: `semantic.surface.soft`
- `HomeVision` point 卡: `component.home-vision.point`

### Mapping Summary

#### HomeHero

| Legacy class | Next class |
| --- | --- |
| `bg-home-hero` | `bg-next-gradient-home-hero` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `bg-border-accent-soft` | `bg-next-semantic-accent-muted` |
| `text-brand-accent-soft` | `text-next-semantic-accent-muted` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-text-muted` | `text-next-semantic-text-muted` |
| `bg-button-accent` | `bg-next-semantic-action-primary` |
| `text-button-neutral-ink` | `text-next-semantic-action-primary-contrast` |
| `hover:bg-button-accent-hover` | `hover:bg-next-semantic-action-primary-hover` |
| `hover:shadow-card` | `hover:shadow-next-shadow-emphasis` |
| `shadow-panel` | `shadow-next-shadow-panel` |
| `border-border-accent` | `border-next-semantic-accent-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `border-border-light/45` | `border-next-component-home-hero-divider` |
| `var(--hero-ornament-line)` | `next-component-hero-ornament-line` |
| `var(--hero-ornament-fill)` | `next-component-hero-ornament-fill` |

#### HomeVision

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-panel` | `bg-next-semantic-surface-panel` |
| `bg-brand-accent` | `bg-next-semantic-accent-primary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `bg-surface-base` | `bg-next-semantic-surface-soft` |
| `text-brand-support-soft` | `text-next-semantic-accent-muted` |
| `bg-surface-card-soft` | `bg-next-semantic-page-subtle` |

## Home Profiles Preview / Family / Directory Card

### Added Tokens

- `next-semantic-surface-card`: 全局 card 表层
- `next-semantic-text-lead`: 跨页面导语文本
- `next-component-directory-card-hover-border`: 目录卡 hover 边框
- `next-component-directory-card-badge-background`: 目录卡 badge 背景
- `next-component-directory-card-badge-border`: 目录卡 badge 边框
- `next-component-directory-card-tag-background`: 目录卡 tag 背景
- `next-component-directory-card-tag-border`: 目录卡 tag 边框

### Background Classification

- `HomeProfilesPreview`: `semantic.page.subtle`
- `DirectoryCardFrame`: `semantic.surface.card`
- `HomeFamily`: `semantic.page.default`
- `HomeFamily` 左侧说明区: `semantic.surface.panel`
- `HomeFamily` 三个要点卡: `semantic.surface.card`
- `HomeFamily` 原则卡: `component.principle-card`
- `HomeFamily` 强调卡: `component.home-family.highlight`

### Mapping Summary

#### HomeProfilesPreview

| Legacy class | Next class |
| --- | --- |
| `bg-page-soft` | `bg-next-semantic-page-subtle` |
| `bg-brand-accent` | `bg-next-semantic-accent-primary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-lead` | `text-next-semantic-text-lead` |
| preview ghost cta | `AppButton secondary + section` |

#### HomeFamily

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-panel` | `bg-next-semantic-surface-panel` |
| `bg-surface-base` | `bg-next-semantic-surface-card` |
| `bg-surface-card` | `bg-next-semantic-surface-card` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `text-text-muted` | `text-next-semantic-text-muted` |
| `text-brand-accent` | `text-next-semantic-accent-primary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `border-border-accent/55` | `border-next-semantic-accent-secondary` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |

#### DirectoryCardFrame

| Legacy class | Next class |
| --- | --- |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-card` | `bg-next-semantic-surface-card` |
| `hover:shadow-card` | `hover:shadow-next-shadow-panel` |
| `border-border-muted` | `border-next-semantic-border-soft` |
| `bg-surface-panel` | `bg-next-semantic-surface-panel` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `bg-surface-base` | `bg-next-semantic-page-subtle` |
| `text-text-muted` | `text-next-semantic-text-muted` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| badge `border-border-soft` | `border-next-component-directory-card-badge-border` |
| badge `bg-surface-panel` | `bg-next-component-directory-card-badge-background` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `border-border-light` | `border-next-semantic-border-divider` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| tags `border-border-soft` | `border-next-component-directory-card-tag-border` |
| tags `bg-surface-base` | `bg-next-component-directory-card-tag-background` |
| `hover:border-border-accent/50` | `hover:border-next-component-directory-card-hover-border` |

### Current Local Tokens

- `next-component-home-family-point-*`
- `next-component-home-family-highlight-*`
- `next-component-principle-card-*`
- `next-component-directory-card-*`

## Home Events / Features / Audience

### Added Tokens

- `next-component-home-events-card-background`: Events preview 卡默认背景
- `next-component-home-events-card-background-hover`: Events preview 卡 hover 背景
- `next-component-section-card-hover-border`: Events / Features 共用 hover 边框
- `next-component-home-audience-tag-background`: Audience 标签卡默认背景
- `next-component-home-audience-tag-background-hover`: Audience 标签卡 hover 背景
- `next-component-home-audience-tag-border-hover`: Audience 标签卡 hover 边框
- `next-component-principle-card-background`: Family / Audience 共用原则卡背景
- `next-component-principle-card-border`: Family / Audience 共用原则卡边框
- `next-component-home-audience-highlight-background`: Audience 强调卡背景
- `next-component-home-audience-highlight-border`: Audience 强调卡边框

### Background Classification

- `HomeEventsPreview`: `semantic.page.subtle`
- `HomeEventsPreview` event 卡: `component.home-events.card`
- `HomeFeatures`: `semantic.page.default`
- `HomeFeatures` service 卡: `semantic.surface.card`
- `HomeAudience`: `semantic.page.subtle`
- `HomeAudience` 左侧说明区: `semantic.surface.panel`
- `HomeAudience` 标签卡: `component.home-audience.tag`
- `HomeAudience` 核心卡 1: `component.principle-card`
- `HomeAudience` 核心卡 2: `component.home-audience.highlight`

### Mapping Summary

#### HomeEventsPreview

| Legacy class | Next class |
| --- | --- |
| `bg-page-soft` | `bg-next-semantic-page-subtle` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `bg-brand-accent` | `bg-next-semantic-accent-primary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-card` | `bg-next-component-home-events-card-background` |
| `hover:border-border-accent/50` | `hover:border-next-component-section-card-hover-border` |
| `hover:bg-surface-panel` | `hover:bg-next-component-home-events-card-background-hover` |
| `hover:shadow-card` | `hover:shadow-next-shadow-panel` |
| CTA ghost button | `AppButton secondary + section` |

#### HomeFeatures

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `bg-brand-accent` | `bg-next-semantic-accent-primary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-card` | `bg-next-semantic-surface-card` |
| `hover:border-border-accent/50` | `hover:border-next-component-section-card-hover-border` |
| `hover:bg-surface-panel` | `hover:bg-next-semantic-surface-soft` |
| `hover:shadow-feature` | `hover:shadow-next-shadow-panel` |

#### HomeAudience

| Legacy class | Next class |
| --- | --- |
| `bg-page-soft` | `bg-next-semantic-page-subtle` |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-panel` | `bg-next-semantic-surface-panel` |
| `bg-brand-accent` | `bg-next-semantic-accent-primary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-text-muted` | `text-next-semantic-text-muted` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| tag card `bg-surface-base` | `bg-next-component-home-audience-tag-background` |
| tag card `hover:bg-surface-panel` | `hover:bg-next-component-home-audience-tag-background-hover` |
| tag card `hover:border-border-accent/50` | `hover:border-next-component-home-audience-tag-border-hover` |
| top tag title `text-brand-accent-strong` | `text-next-semantic-text-primary` |
| core card 1 | `next-component-principle-card-*` |
| highlighted core card | `next-component-home-audience-highlight-*` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |

## Home Membership

### Added Tokens

- `next-semantic-text-inverse`: 深底卡片主文本
- `next-semantic-text-inverse-muted`: 深底卡片正文
- `next-semantic-text-inverse-subtle`: 深底卡片弱文本
- `next-component-home-membership-silver-*`: 银卡局部背景、边框、分隔线、按钮边框与 hover
- `next-component-home-membership-gold-*`: 金卡分隔线与按钮语义
- `next-component-home-membership-diamond-*`: 钻石卡边框、ring、badge、分隔线、access label、按钮语义
- `next-component-home-membership-free-*`: 免费入口面板与按钮语义
- `next-effect-gradient-home-membership-ambient`: Membership section 环境背景
- `next-effect-gradient-home-membership-silver-card`: 银卡渐变背景
- `next-effect-gradient-home-membership-silver-glow`: 银卡冷银高光
- `next-effect-gradient-home-membership-gold-card`: 金卡渐变背景
- `next-effect-gradient-home-membership-gold-glow`: 金卡装饰光
- `next-effect-gradient-home-membership-diamond-card`: 钻石卡渐变背景
- `next-effect-gradient-home-membership-diamond-glow`: 钻石卡装饰光
- `next-shadow-luxe`: 高级强调阴影
- `next-shadow-soft-luxe`: 轻奢柔阴影

### Background Classification

- `HomeMembership`: `semantic.page.default`
- `HomeMembership` ambient 背景: `effect.gradient.home-membership-ambient`
- `HomeMembership` 银卡: `effect.gradient.home-membership-silver-card`
- `HomeMembership` 金卡: `effect.gradient.home-membership-gold-card`
- `HomeMembership` 钻石卡: `effect.gradient.home-membership-diamond-card`
- `HomeMembership` 免费入口: `component.home-membership.free`

### Text Classification

- 普通区块标题/说明: `text.primary / text.secondary / text.subtle`
- 银卡正文: `text.primary / text.secondary / text.muted`
- 金卡 / 钻石卡正文: `text.inverse / text.inverse-muted / text.inverse-subtle`
- 业务强调: `accent.primary / accent.muted`

### Border Classification

- 银卡: `component.home-membership.silver.border`
- 金卡: `semantic.accent.secondary`
- 钻石卡: `component.home-membership.diamond.border`
- 免费入口: `component.home-membership.free.panel-border`

### Issues Identified

- 旧实现高度依赖 membership 私有 legacy token，且按钮样式重复
- 存在 opacity 用法:
  - `bg-brand-accent/10`
  - `border-brand-accent/35`
  - `bg-brand-accent/70`
  - `bg-brand-accent/22`
  - `ring-brand-accent/18`
  - `text-brand-accent/80`
- 金卡 / 钻石卡的深底文本原先依赖 legacy inverse 文本，现已收敛到 `next.semantic.text.inverse*`

### Mapping Summary

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `bg-decor-ambient` | `bg-next-gradient-home-membership-ambient` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-text-muted` | `text-next-semantic-text-muted` |
| `text-text-subtle` | `text-next-semantic-text-subtle` |
| `text-text-inverse` | `text-next-semantic-text-inverse` |
| `text-text-inverse-soft` | `text-next-semantic-text-inverse-muted` |
| `text-text-inverse-subtle` | `text-next-semantic-text-inverse-subtle` |
| `text-brand-accent` | `text-next-semantic-accent-primary` |
| `text-brand-accent-foreground` | `text-next-semantic-text-inverse` |
| silver `border-border-membership-silver` | `border-next-component-home-membership-silver-border` |
| silver `bg-surface-membership-silver` | `bg-next-gradient-home-membership-silver-card` |
| silver top line | `bg-next-component-home-membership-silver-line` |
| silver glow | `bg-next-gradient-home-membership-silver-glow` |
| gold `bg-membership-gold-card` | `bg-next-gradient-home-membership-gold-card` |
| gold `bg-membership-gold-card-glow` | `bg-next-gradient-home-membership-gold-glow` |
| diamond `bg-membership-diamond-card` | `bg-next-gradient-home-membership-diamond-card` |
| diamond `bg-membership-diamond-card-glow` | `bg-next-gradient-home-membership-diamond-glow` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |
| `shadow-luxe` | `shadow-next-shadow-luxe` |
| silver CTA | `AppButton secondary + membership-silver` |
| gold CTA | `AppButton secondary + membership-gold` |
| diamond CTA | `AppButton secondary + membership-diamond` |
| free CTA | `AppButton secondary + membership-free` |

## Maintenance Note

- 本文档只记录已迁移页面与组件的 token 决策。
- 若代码与本文档冲突，以 `src/constants/theme-tokens.json` 和组件当前 class 为准，并应立即同步更新本文档。

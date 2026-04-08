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
- `src/pages/public/about.vue`
- `src/components/about/AboutHero.vue`
- `src/components/about/AboutOrigin.vue`
- `src/components/about/AboutAudience.vue`
- `src/components/about/AboutDifference.vue`
- `src/components/about/AboutValues.vue`
- `src/pages/public/contact.vue`
- `src/components/contact/ContactHero.vue`
- `src/pages/public/membership.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipTiersSection.vue`
- `src/components/membership/MembershipRulesSection.vue`
- `src/constants/theme-tokens.json`

## Token Semantics

### next.semantic

#### page

- `next-semantic-page-default`: 页面主背景。用于页面级背景，不用于悬浮容器或应用壳层。
- `next-semantic-page-subtle`: 页面次级背景。用于普通弱分区，不再建议继续承担 footer 专用背景。

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

#### footer

- `next-component-footer-background`: footer 容器专用背景。用于页面收口，不再复用 `page.subtle`。
- `next-component-footer-divider`: footer 底部收口分隔线。

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

- `bg-next-component-footer-background`: footer background

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
- `border-next-component-footer-divider`: footer divider

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
- footer 背景与底部分隔线已独立到 `component.footer`

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
| `bg-page-soft` | `bg-next-component-footer-background` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-brand-support-soft` | `text-next-semantic-accent-muted` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `group-hover:text-text-heading` | `group-hover:text-next-semantic-text-primary` |
| `bg-brand-support` | `bg-next-semantic-accent-secondary` |
| `border-border-soft` | `border-next-component-footer-divider` |
| `text-text-subtle` | `text-next-semantic-text-subtle` |

## Usage Rules For Follow-up Pages

- 页面层禁止使用 `palette`
- 页面层只允许使用 `next.semantic`、`next.component`、`next.effect`
- 不确定语义先放 `next.component`
- 复用次数达到 3 次及以上再评估沉淀到 `next.semantic`
- 禁止继续使用 opacity class
- 禁止将 `page` 语义用于 card、panel、header 这类局部容器
- `next.semantic` / `next.component` 现在同时支持两类颜色值：
- `hex` 值会生成支持透明度后缀的 utility，例如 `bg-next-.../40`
- `rgba(...)` 等原始颜色值会原样输出为 utility，不再叠加透明度后缀

## AppButton

### Purpose

- 封装按钮必须的基础样式，减少后续重复拼接 utility
- 统一按钮 hover 位移、scale、阴影强度
- 用 `variant` 和 `context` 区分按钮语义与局部场景

### Props

- `variant`: `primary | secondary`
- `context`: `default | header | hero | section | membership-silver | membership-gold | membership-diamond | membership-free`
- `size`: `sm | md | lg | icon`
- `width`: `auto | cta | full`
- `rounded`: `none | button | xl`
- `disabled`: 是否禁用

### Current Usage

- `AppHeader` 登录按钮: `secondary + header + sm + xl`
- `AppHeader` 注册按钮: `primary + sm + xl`
- `HomeHero` 主按钮: `primary + lg + cta + none`
- `HomeHero` 次按钮: `secondary + hero + lg + cta + none`
- `HomeProfilesPreview` / `HomeEventsPreview` CTA: `secondary + section`
- `MembershipTiersSection` 入口按钮: `primary + lg + cta + none`
- `MembershipTiersSection` 免费卡按钮: `secondary + membership-free + sm + full + none`
- `HomeMembership` 银卡按钮: `secondary + membership-silver + sm + full + none`
- `HomeMembership` 金卡按钮: `secondary + membership-gold + sm + full + none`
- `HomeMembership` 钻石卡按钮: `secondary + membership-diamond + sm + full + none`
- `HomeMembership` 免费入口按钮: `secondary + membership-free + sm + full + none`
- `MembershipTiersSection` 三档卡按钮: 继续复用 `membership-silver / membership-gold / membership-diamond`
- `MembershipRulesSection` 结尾按钮: `primary + lg + cta + none`

## Home Hero And Vision

### Added Tokens

- `next-effect-gradient-home-hero`: Home hero 专用渐变背景
- `next-component-hero-secondary-action-background`: Hero 次按钮默认底色
- `next-component-hero-secondary-action-background-hover`: Hero 次按钮 hover 底色
- `next-component-hero-secondary-action-border`: Hero 次按钮边框
- `next-component-hero-ornament-line`: Hero 右侧装饰线。独立于 `home-hero`，为后续可能复用保留。
- `next-component-hero-ornament-fill`: Hero 右侧装饰填充。独立于 `home-hero`，为后续可能复用保留。
- `next-component-home-hero-divider`: Hero 数据区分隔线
- `next-semantic-surface-info-card`: Home / About / Contact 共享信息卡默认背景
- `next-semantic-surface-info-card-hover`: Home / About / Contact 共享信息卡 hover 背景
- `next-semantic-border-info-card-hover`: Home / About / Contact 共享信息卡 hover 边框
- `next-component-info-card-line`: Home / About / Contact 常规信息卡顶部线

### Background Classification

- `HomeHero`: `effect.gradient.home-hero`
- `HomeVision`: `semantic.page.default`
- `HomeVision` 主标题区: `semantic.surface.panel`
- `HomeVision` 主说明卡: `semantic.surface.soft`
- `HomeVision` point 卡: `semantic.surface.info-card`

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
  - 现已复用 `EventOverviewCard`
  - 卡片内容来自 `mock/events`
- `HomeFeatures`: `semantic.page.default`
- `HomeFeatures` service 卡: `semantic.surface.card`
- `HomeAudience`: `semantic.page.subtle`
- `HomeAudience` 左侧说明区: `semantic.surface.panel`
- `HomeAudience` 标签卡: `component.home-audience.tag`
- `HomeAudience` 核心卡 1: `component.principle-card`
- `HomeAudience` 核心卡 2: `component.home-audience.highlight`

### Mapping Summary

#### HomeEventsPreview

Current structure note:
- `HomeEventsPreview` 当前不再维护首页私有的简化 event card
- 首页活动卡与 `events/index` 统一复用 `EventOverviewCard`
- 卡片内容由 `mock/events` 组装，不再沿用旧的 `tag / desc / meta` 结构

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
- `next-component-membership-tier-silver-*`: 银卡局部背景、边框、分隔线、按钮边框与 hover
- `next-component-membership-tier-gold-accent`: 金卡顶部线 / 短分隔线 / 按钮主色
- `next-component-membership-tier-gold-accent-hover`: 金卡按钮 hover 主色
- `next-component-membership-tier-gold-divider`: 金卡内容分隔线
- `next-component-membership-tier-diamond-*`: 钻石卡边框、ring、badge、分隔线、access label、按钮语义
- `next-component-membership-tier-free-*`: 免费入口面板与按钮语义
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
- `HomeMembership` 免费入口: `component.membership-tier.free`

### Text Classification

- 普通区块标题/说明: `text.primary / text.secondary / text.subtle`
- 银卡正文: `text.primary / text.secondary / text.muted`
- 金卡 / 钻石卡正文: `text.inverse / text.inverse-muted / text.inverse-subtle`
- 业务强调: `accent.primary / accent.muted`

### Current Local Token Consolidation

- `home-membership.gold.line / button-border / button-background` 已合并为 `home-membership.gold.accent`
- `home-membership.gold.button-border-hover / button-background-hover` 已合并为 `home-membership.gold.accent-hover`
- `home-membership.diamond.button-border / button-background` 已合并为 `home-membership.diamond.button`
- `home-membership.diamond.button-border-hover / button-background-hover` 已合并为 `home-membership.diamond.button-hover`

### Border Classification

- 银卡: `component.membership-tier.silver.border`
- 金卡: `semantic.accent.secondary`
- 钻石卡: `component.membership-tier.diamond.border`

## About Page / AboutHero

### Added Tokens

- `next-effect-gradient-about-hero`: AboutHero 专用背景渐变
- `next-component-hero-border`: Hero 共享边框
- `next-component-hero-overlay-background-soft`: Hero 共享弱透明背景
- `next-component-hero-overlay-background-panel`: Hero 共享主浮层背景
- `next-component-section-line`: section 头部装饰线色。用于 AboutHero、ContactHero 与 Membership 各 section。
- `next-component-section-label`: section / hero 的 eyebrow、标签与卡片小标题共享文本色
- `next-component-hero-title-accent`: Hero 共享标题强调色
- `next-component-hero-description`: Hero 共享主说明文字色
- `next-component-hero-secondary-description`: Hero 共享副说明文字色
- `next-component-about-hero-ghost-title`: AboutHero 背景大字
- `next-shadow-about-hero-panel`: AboutHero 主卡阴影
- `next-shadow-about-hero-feature`: AboutHero 强调卡阴影

### Background Classification

- `about.vue`: `semantic.page.default`
- `AboutHero`: `effect.gradient.about-hero`
- `AboutHero` eyebrow / audience card / positioning card: `component.hero.overlay`
- `AboutHero` approach card: `component.hero.overlay`

### Text Classification

- `AboutHero` 主标题 / 右侧正文: `text.inverse`
- `AboutHero` 标题强调: `component.hero.title-accent`
- `AboutHero` 主说明: `component.hero.description`
- `AboutHero` 副说明: `component.hero.secondary-description`
- `AboutHero` eyebrow / audience / positioning / approach: `component.section-label`
- `AboutHero` 装饰线: `component.section-line`
- `AboutHero` 背景大字: `component.about-hero.ghost-title`

### Border Classification

- `AboutHero` 当前 3 处边框已统一：`component.hero.border`

### Mapping Summary

#### about.vue

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `text-text-heading` | `text-next-semantic-text-primary` |

#### AboutHero

| Legacy class | Next class |
| --- | --- |
| `bg-events-hero` | `bg-next-gradient-about-hero` |
| `text-text-inverse` | `text-next-semantic-text-inverse` |
| `border-border-inverse/34` | `border-next-component-hero-border` |
| `bg-surface-inverse-panel/34` | `bg-next-component-hero-overlay-background-soft` |
| `bg-brand-accent` | `bg-next-component-section-line` |
| `text-brand-accent-soft` | `text-next-component-section-label` |
| `text-brand-accent-strong` | `text-next-component-hero-title-accent` |
| `text-text-inverse-soft` | `text-next-component-hero-description` |
| `text-text-inverse-muted` | `text-next-component-hero-secondary-description` |
| `border-border-inverse/32` | `border-next-component-hero-border` |
| `text-text-inverse/5` | `text-next-component-about-hero-ghost-title` |
| `bg-surface-inverse-panel/76` | `bg-next-component-hero-overlay-background-panel` |
| `shadow-card` | `shadow-next-shadow-about-hero-panel` |
| `text-brand-accent` | `text-next-component-section-label` |
| `border-brand-accent/32` | `border-next-component-hero-border` |
| `bg-surface-inverse-card/72` | `bg-next-component-hero-overlay-background-panel` |
| `shadow-hero` | `shadow-next-shadow-about-hero-feature` |

## About Sections

### Added Tokens

- `next-component-emphasis-card-background`: About / Contact 强调卡背景
- `next-component-emphasis-card-border`: About / Contact 强调卡边框
- `next-component-emphasis-card-line`: About / Contact 强调卡顶部线

### Background Classification

- `AboutOrigin`: `semantic.page.default`
- `AboutAudience`: `semantic.page.subtle`
- `AboutDifference`: `semantic.page.default`
- `AboutValues`: `semantic.page.subtle`
- `AboutOrigin` 左侧说明卡: `semantic.surface.soft`
- `AboutOrigin` / `AboutAudience` / `AboutDifference` / `AboutValues` 常规信息卡: `semantic.surface.info-card`
- `AboutAudience` 第四张卡、`AboutValues` 右侧第一张卡: `component.emphasis-card`

### Mapping Summary

#### AboutOrigin

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `bg-surface-card-soft` | `bg-next-semantic-surface-soft` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-lead` | `text-next-semantic-text-lead` |
| `border-border-base` | `border-next-semantic-border-soft` |
| `bg-surface-panel` | `bg-next-semantic-surface-info-card` |
| `bg-brand-accent/45` | `bg-next-component-info-card-line` |
| `bg-surface-card` | `bg-next-semantic-surface-info-card` |
| `bg-brand-accent/55` | `bg-next-component-info-card-line` |

#### AboutAudience

| Legacy class | Next class |
| --- | --- |
| `bg-page-soft` | `bg-next-semantic-page-subtle` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-lead` | `text-next-semantic-text-lead` |
| `border-border-base` | `border-next-semantic-border-soft` |
| `bg-surface-panel` | `bg-next-semantic-surface-info-card` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `bg-surface-base` | `bg-next-semantic-surface-info-card` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `border-border-accent/25` | `border-next-component-emphasis-card-border` |
| `bg-brand-accent/10` | `bg-next-component-emphasis-card-background` |
| `bg-brand-accent/55` | `bg-next-component-info-card-line` |
| `bg-brand-accent/65` | `bg-next-component-emphasis-card-line` |
| `bg-border-light/80` | `bg-next-component-info-card-line` |

#### AboutDifference

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-lead` | `text-next-semantic-text-lead` |
| `border-border-base` | `border-next-semantic-border-soft` |
| `bg-surface-panel` | `bg-next-semantic-surface-info-card` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |
| `bg-brand-accent/55` | `bg-next-component-info-card-line` |
| `bg-surface-base` | `bg-next-semantic-surface-info-card` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `bg-border-light/80` | `bg-next-component-info-card-line` |
| `border-border-accent/30` | `border-next-semantic-border-soft` |
| `bg-brand-accent/10` | `bg-next-semantic-surface-info-card` |
| `bg-brand-accent/60` | `bg-next-component-info-card-line` |

Current code note:
- `AboutDifference` 当前三张内容卡都已收敛到 `semantic.surface.info-card`
- 左侧标题区保留为 section 主引导，不再额外保留第三张强调卡

#### AboutValues

| Legacy class | Next class |
| --- | --- |
| `bg-page-soft` | `bg-next-semantic-page-subtle` |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-panel` | `bg-next-semantic-surface-panel` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |
| `bg-brand-accent/55` | `bg-next-component-info-card-line` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `bg-surface-card` | `bg-next-semantic-surface-info-card` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `border-brand-primary/18` | `border-next-component-emphasis-card-border` |
| `bg-brand-primary/8` | `bg-next-component-emphasis-card-background` |
| `bg-brand-secondary/45` | `bg-next-component-emphasis-card-line` |
| `border-border-accent/35` | `border-next-semantic-border-soft` |
| `bg-brand-accent/18` | `bg-next-semantic-surface-info-card` |
| `bg-brand-accent/70` | `bg-next-component-info-card-line` |

Current code note:
- `AboutValues` 右侧仅保留第一张为 `component.emphasis-card`
- 右侧第二张已回收到 `semantic.surface.info-card`

## Contact Page / ContactHero

### Added Tokens

- `next-effect-gradient-contact-hero`: ContactHero 专用背景渐变
- `next-component-section-label`: ContactHero 与 Contact section 复用的小标题文本色

### Reused Tokens

- `about-hero.border`
- `about-hero.overlay.background-soft`
- `section-line`
- `section-label`
- `about-hero.title-accent`
- `about-hero.description`
- `about-hero.secondary-description`
- `shadow.about-hero-panel`

### Background Classification

- `contact.vue`: `semantic.page.default`
- `ContactHero`: `effect.gradient.contact-hero`
- `ContactHero` eyebrow 与右侧联系卡: `component.hero.overlay`
- `ContactInfo`: `semantic.page.default`
- `ContactCases`: `semantic.page.subtle`
- `ContactGuide`: `semantic.page.default`
- `ContactInfo` / `ContactCases` 常规卡 / `ContactGuide` 常规卡: `semantic.surface.info-card`
- `ContactCases` 强调卡 / `ContactGuide` 第二张流程卡: `component.emphasis-card`
- `ContactCases` 左侧 desk card / `ContactGuide` 右侧说明卡: `semantic.surface.soft`

### Text Classification

- Contact 各 section eyebrow: `semantic.accent.secondary`
- Contact 各 section 标题强调: `semantic.accent.primary`
- Contact 常规卡标题: `semantic.text.primary`
- Contact 常规卡正文: `semantic.text.secondary`
- Contact 辅助说明: `semantic.text.lead` / `semantic.text.muted`

### Border Classification

- Contact 常规卡: `semantic.border.soft`
- Contact 强调卡: `component.emphasis-card.border`
- Contact 说明卡: `semantic.border.soft`

### Mapping Summary

#### contact.vue

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `text-text-heading` | `text-next-semantic-text-primary` |

#### ContactHero

| Legacy class | Next class |
| --- | --- |
| `bg-events-hero` | `bg-next-gradient-contact-hero` |
| `text-text-inverse` | `text-next-semantic-text-inverse` |
| `border-border-inverse/34` | `border-next-component-hero-border` |
| `bg-surface-inverse-panel/34` | `bg-next-component-hero-overlay-background-soft` |
| `bg-brand-accent` | `bg-next-component-section-line` |
| `text-brand-accent-soft` | `text-next-component-section-label` |
| `text-brand-accent-strong` | `text-next-component-hero-title-accent` |
| `text-text-inverse-soft` | `text-next-component-hero-description` |
| `text-text-inverse-muted` | `text-next-component-hero-secondary-description` |
| primary CTA legacy button | `AppButton primary + lg + cta` |
| `border-border-inverse/32` | `border-next-component-hero-border` |
| `shadow-card` | `shadow-next-shadow-about-hero-panel` |
| card `text-brand-accent` | `text-next-component-section-label` |

#### ContactInfo.vue

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-lead` | `text-next-semantic-text-lead` |
| `border-border-base` | `border-next-semantic-border-soft` |
| `bg-surface-base` | `bg-next-semantic-surface-info-card` |
| `bg-border-light/80` | `bg-next-component-info-card-line` |
| `text-brand-support` card label | `text-next-component-section-label` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `shadow-card` | `shadow-next-shadow-panel` |

#### ContactCases.vue

| Legacy class | Next class |
| --- | --- |
| `bg-page-soft` | `bg-next-semantic-page-subtle` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `text-text-lead` | `text-next-semantic-text-lead` |
| `border-border-soft` | `border-next-semantic-border-soft` |
| `bg-surface-card-soft` | `bg-next-semantic-surface-soft` |
| `bg-surface-base` / `bg-surface-panel` | `bg-next-semantic-surface-info-card` |
| `bg-border-light/80` | `bg-next-component-info-card-line` |
| `border-border-accent/25` | `border-next-component-emphasis-card-border` |
| `bg-brand-accent/10` | `bg-next-component-emphasis-card-background` |
| `bg-brand-accent/65` | `bg-next-component-emphasis-card-line` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |

#### ContactGuide.vue

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `bg-brand-accent` | `bg-next-semantic-accent-secondary` |
| `text-brand-support` | `text-next-semantic-accent-secondary` |
| `text-brand-accent-strong` | `text-next-semantic-accent-primary` |
| `border-border-base` / `bg-surface-panel` | `border-next-semantic-border-soft` / `bg-next-semantic-surface-info-card` |
| `bg-brand-accent/60` | `bg-next-component-info-card-line` |
| `bg-brand-accent/72` | `bg-next-component-emphasis-card-line` |
| `bg-surface-card-soft` | `bg-next-semantic-surface-soft` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `text-text-lead` | `text-next-semantic-text-lead` |
| `shadow-card` | `shadow-next-shadow-panel` |
| `shadow-emphasis` | `shadow-next-shadow-emphasis` |

### Current Code Note

- `src/pages/public/contact.vue` 里仍保留 `ContactInfoSection` / `ContactGuideSection` 作为模板标签别名，但实际导入文件已切到 [ContactInfo.vue](/Users/wang/WebstormProjects/cupid-match/src/components/contact/ContactInfo.vue) 和 [ContactGuide.vue](/Users/wang/WebstormProjects/cupid-match/src/components/contact/ContactGuide.vue)。

## Membership Page / MembershipHero

### Added Tokens

- `next-effect-gradient-membership-hero`: MembershipHero 专用背景渐变

### Reused Tokens

- `hero.border`
- `hero.overlay.background-soft`
- `hero.overlay.background-panel`
- `section-line`
- `hero.title-accent`
- `hero.description`
- `hero.secondary-description`
- `section-label`
- `hero-ornament.line`
- `membership-tier.free.feature-*`
- `membership-tier.silver.*`
- `membership-tier.silver.feature-*`
- `membership-tier.gold.feature-*`
- `membership-tier.diamond.*`
- `membership-tier.diamond.feature-*`
- `gradient.home-membership-gold-card`
- `gradient.home-membership-silver-card`
- `gradient.home-membership-diamond-card`
- `emphasis-card.*`
- `shadow.soft-luxe`
- `shadow.luxe`

### Membership Tier Note

- `membership-tier.silver` 当前已补完整按钮层：
  - `border`
  - `line`
  - `feature-background`
  - `feature-border`
  - `button-background`
  - `button-border`
  - `button-hover`
- `membership-tier.free` 当前保留：
  - `panel-background`
  - `panel-border`
  - `feature-background`
  - `feature-border`
  - `button-border`
  - `button-hover`
- `light` 下 `free` 维持更浅的辅助入口层，`silver` 维持更暖的银香槟层，并通过独立按钮底色与 `free` 拉开。
- 当前只有 `MembershipTiersSection` 使用 `free / silver / gold / diamond` 的块状 `feature-*`。
- `HomeMembership` 已回滚为线性特性列表，未接入这套块状 `feature-*` 表现。

### Background Classification

- `membership.vue`: `semantic.page.default`
- `MembershipHero`: `effect.gradient.membership-hero`
- `MembershipHero` eyebrow: `component.hero.overlay`
- `MembershipHero` 右上装饰圆环: `component.hero-ornament`
- `MembershipHero` 右侧主浮层: `component.hero.overlay`
- `MembershipHero` 价格预览卡:
  - silver: `effect.gradient.home-membership-silver-card`
  - gold: `effect.gradient.home-membership-gold-card`
  - diamond: `effect.gradient.home-membership-diamond-card`
- `MembershipHero` 底部说明卡: `component.hero.overlay`

### Text Classification

- `MembershipHero` 主标题: `semantic.text.inverse`
- `MembershipHero` 标题强调: `component.hero.title-accent`
- `MembershipHero` 主说明: `component.hero.description`
- `MembershipHero` 副说明: `component.hero.secondary-description`
- `MembershipHero` eyebrow / overview title: `component.section-label`

### Border Classification

- `MembershipHero` eyebrow: `component.hero.border`
- `MembershipHero` 主浮层: `component.hero.border`
- `MembershipHero` 底部说明卡: `component.hero.border`

### Mapping Summary

#### membership.vue

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `text-text-heading` | `text-next-semantic-text-primary` |

#### MembershipHero.vue

| Legacy class | Next class |
| --- | --- |
| `bg-membership-hero` | `bg-next-gradient-membership-hero` |
| `text-text-inverse` | `text-next-semantic-text-inverse` |
| `border-border-inverse/28` | `border-next-component-hero-ornament-line` |
| `border-border-inverse/34` | `border-next-component-hero-border` |
| `bg-surface-inverse-panel/34` | `bg-next-component-hero-overlay-background-soft` |
| `bg-brand-accent` | `bg-next-component-section-line` |
| `text-brand-accent-soft` | `text-next-component-section-label` |
| `text-brand-accent-strong` | `text-next-component-hero-title-accent` |
| `text-text-inverse-soft` | `text-next-component-hero-description` |
| `text-text-inverse-muted` | `text-next-component-hero-secondary-description` |
| primary CTA legacy button | `AppButton primary + lg + cta` |
| secondary CTA legacy ghost button | `AppButton secondary + hero + lg + cta` |
| `border-border-hero-float/70` | `border-next-component-hero-border` |
| `bg-surface-hero-float-strong/78` | `bg-next-component-hero-overlay-background-panel` |
| `shadow-soft-luxe` | `shadow-next-shadow-soft-luxe` |
| silver preview `border-border-membership-silver/55` | `border-next-component-membership-tier-silver-border` |
| silver preview `bg-surface-membership-silver` | `bg-next-gradient-home-membership-silver-card` |
| gold preview `border-border-membership-gold/70` | `border-next-semantic-accent-secondary` |
| gold preview `bg-surface-membership-gold` | `bg-next-gradient-home-membership-gold-card` |
| diamond preview `border-border-membership-diamond/60` | `border-next-component-membership-tier-diamond-border` |
| diamond preview `bg-surface-membership-diamond` | `bg-next-gradient-home-membership-diamond-card` |
| `shadow-luxe` | `shadow-next-shadow-luxe` |
| `border-border-inverse/20` | `border-next-component-hero-border` |
| `bg-surface-inverse-panel/26` | `bg-next-component-hero-overlay-background-soft` |

Current code note:
- `MembershipHero` 主按钮现在是“免费注册”，仍走注册流。
- `MembershipHero` 次按钮现在是“查看方案对比”，使用页内滚动跳到 `#membership-compare`。
- `MembershipCompareSection` 已移除，对比区能力并入 `MembershipTiersSection`。
- `MembershipTiersSection` 现在同时承载：左侧档位说明、右侧 `free` 小卡，以及 `silver / gold / diamond` 三档主卡。
- `membership-silver` 按钮现在不是透明按钮，而是使用 `button-background` 的实体底色。

## Maintenance Note

- 本文档只记录已迁移页面与组件的 token 决策。
- 若代码与本文档冲突，以 `src/constants/theme-tokens.json` 和组件当前 class 为准，并应立即同步更新本文档。

## Pending Convergence Notes

- `component.home-events.card.background-hover` 与 `semantic.surface.info-card-hover` 在 dark 目前同值，暂不合并。后续等真实 events 页面替换后再判断。
- `component.directory-card.hover-border` 与 `semantic.border.info-card-hover` 在 dark 目前同值，先记录，后续视目录卡是否需要独立 hover 语义再决定。
- `semantic.surface.card` 与 `semantic.state.info` 在 dark 目前同值。当前未造成使用层冲突，但状态色长期不宜与普通 surface 共值。
- `component.principle-card.background` 与 `semantic.surface.panel` 在 light 目前同值。后续依据 principle-card 的复用范围决定是回收还是继续保留独立调色空间。
- `component.section-card.hover-border` 与 `component.home-audience.tag.border-hover` 在 light 目前同值。若更多卡片继续复用，可考虑再上提。
- `component.home-audience.tag.background-hover` 与 `component.home-family.point.background-hover` 在 light 目前同值。当前先记录，不主动合并。

# Events Index / Hero

## Background Classification

- `events/index.vue`: `semantic.page.default`
- `EventsFeaturedGrid`: `semantic.page.subtle`
- `EventsFeaturedGrid` stats cards: `semantic.surface.card`
- `EventsScheduleList`: `semantic.page.default`
- `EventsHero`: `effect.gradient.events-hero`
- `EventsHero` eyebrow: `component.hero.overlay.background-soft`
- `EventsHero` next-event card: `component.hero.overlay.background-panel`
- `EventsHero` 右侧三圈装饰: `component.hero-ornament.line`

## Text Classification

- `EventsHero` 主标题: `semantic.text.inverse`
- `EventsHero` 主说明: `component.hero.description`
- `EventsHero` next-event label: `component.section-label`
- `EventsHero` next-event fields: `component.hero.secondary-description`
- `EventsHero` next-event summary: `semantic.text.inverse-muted`
- `EventsFeaturedGrid` stats label: `semantic.accent.secondary`
- `EventsFeaturedGrid` stats value: `semantic.text.primary`

## Border Classification

- `EventsHero` eyebrow: `component.hero.border`
- `EventsHero` next-event card: `component.hero.border`
- `EventStatusBadge` waitlist / closed: `component.hero.border`
- `EventsFeaturedGrid` stats cards: `semantic.border.default`

## Mapping Summary

#### events/index.vue

| Legacy class | Next class |
| --- | --- |
| `bg-page-base` | `bg-next-semantic-page-default` |
| `text-text-heading` | `text-next-semantic-text-primary` |

#### EventsHero.vue

| Legacy class | Next class |
| --- | --- |
| `bg-events-hero` | `bg-next-gradient-events-hero` |
| right-side orbit decoration | `border-next-component-hero-ornament-line` |
| `border-border-inverse/34` | `border-next-component-hero-border` |
| `bg-surface-inverse-panel/34` | `bg-next-component-hero-overlay-background-soft` |
| `bg-brand-accent` | `bg-next-component-section-line` |
| `text-brand-accent-soft` | `text-next-component-section-label` |
| `text-text-inverse-soft` | `text-next-component-hero-description` |
| `bg-surface-inverse-panel/76` | `bg-next-component-hero-overlay-background-panel` |
| `text-brand-accent` | `text-next-component-section-label` |
| `text-text-inverse-muted` | `text-next-semantic-text-inverse-muted` |

#### EventStatusBadge.vue

| Legacy class | Next class |
| --- | --- |
| open badge | `semantic.state.open.background/border/text/dot` |
| waitlist badge | `semantic.state.waitlist.background/border/text/dot` |
| closed badge | `semantic.state.closed.background/border/text/dot` |

#### EventsFeaturedGrid.vue

Current structure note:
- `EventsFeaturedGrid` 当前内部顺序是：
  - header / intro
  - stats cards
  - featured event cards
- featured event cards 已抽成共享 `EventOverviewCard`
- section wrapper: `bg-next-semantic-page-subtle`

| Legacy class | Next class |
| --- | --- |
| `text-brand-support` | `text-next-component-section-label` / `text-next-semantic-accent-secondary` |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `text-text-body` | `text-next-semantic-text-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `text-text-muted` | `text-next-semantic-text-subtle` |
| `border-border-base` | `border-next-semantic-border-default` |
| `border-border-light` | `border-next-semantic-border-soft` |
| `bg-surface-base` | `bg-next-component-home-events-card-background` |
| `shadow-panel` | `shadow-next-panel` |
| `hover:border-border-accent/50` | `hover:border-next-component-section-card-hover-border` |
| `hover:bg-surface-panel` | `hover:bg-next-component-home-events-card-background-hover` |
| `hover:shadow-card` | `hover:shadow-next-about-hero-panel` |
| stats `border-border-base` | `border-next-semantic-border-default` |
| stats `bg-surface-card` | `bg-next-semantic-surface-card` |
| stats `shadow-panel` | `shadow-next-panel` |
| stats `text-brand-support` | `text-next-semantic-accent-secondary` |
| stats `text-text-heading` | `text-next-semantic-text-primary` |

#### EventsScheduleList.vue

| Legacy class | Next class |
| --- | --- |
| `text-text-heading` | `text-next-semantic-text-primary` |
| `bg-border-base/55` | `bg-next-component-section-line opacity-45` |
| `text-brand-support` | `text-next-component-section-label` / `text-next-semantic-accent-secondary` |
| `text-text-body-soft` | `text-next-semantic-text-muted` |
| `border-border-base` | `border-next-semantic-border-default` |
| `bg-surface-card` | `bg-next-component-home-events-card-background` |
| `shadow-panel` | `shadow-next-panel` |
| `hover:border-brand-accent/24` | `hover:border-next-component-section-card-hover-border` |
| `hover:bg-surface-base` | `hover:bg-next-component-home-events-card-background-hover` |
| `hover:shadow-card` | `hover:shadow-next-about-hero-panel` |
| `bg-brand-accent/18` | `bg-next-component-section-line opacity-*` |
| `text-text-muted` | `text-next-semantic-text-subtle` |
| `border-border-light` | `border-next-semantic-border-soft` |

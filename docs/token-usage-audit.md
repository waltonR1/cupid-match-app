# Token Usage Audit

- 审计范围：`src/**/*.{vue,js,ts,jsx,tsx}`，排除 `src/constants/theme-tokens.json`
- 检查日期：`2026-04-05`
- 扫描文件数：114
- 实际使用 token 的文件数：54
- 扫描到的 token 定义数：80
- 未使用 token 数：0
- 未知 token 引用数：0

## 结论

- 当前未发现未使用 token。
- 当前未发现错误 token 引用。
- `account` 页面虽然仍有大量硬编码样式，但本次扫描没有发现错误 token 引用。

## 中文说明

- 这份文档同时回答两个问题：哪个文件用了哪些 token，以及每个 token 目前被哪些文件使用。
- 这里的 token 以 `theme-tokens.json` 当前定义为准，包含颜色 token、渐变 token、阴影 token 和 `hero` 原始变量。
- “错误使用”在这里指引用了不存在的 token，或者写了当前主题系统无法解析的 token utility。
- “未使用 token”表示定义存在，但在当前源码中没有任何命中。

## 语义复核备注

- 当前没有发现“引用不存在 token”这一类硬错误。
- `src/components/events/EventStatusBadge.vue` 使用了 `button.accent`、`button.neutral-ink` 和 `bg-button-neutral-ink` 来表达 badge 和状态点。它们都能正常解析，但从语义上看更像 badge 或状态色，而不是按钮专用 token，后续值得重审。
- 多个文件会用 `bg-border-*` 来绘制 1px 线条或分隔条。这种写法当前有效，也和“线条颜色”语义基本一致，所以这次不视为错误，但如果后面要更严格约束 token 领域边界，可以再评估是否需要独立的 line token。

## 未使用 Token

- 无

## 错误引用 - 颜色 Utility

- 无

## 错误引用 - 渐变 Utility

- 无

## 错误引用 - 阴影 Utility

- 无

## 错误引用 - Hero 变量

- 无

## Token Usage

> 中文注释：下面按 token 逐个记录用途、常见 utility 和命中的源码文件。

### `border.accent`

- 用途：品牌强调边框色，用于强调态、交互态和视觉高亮轮廓。
- 常见 utility：`border-border-accent` / `bg-border-accent`
- 使用文件数：23
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryActiveFilterChips.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/common/feedback/EmptyStatePanel.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeHero.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`

### `border.accent-soft`

- 用途：柔和品牌强调边框色，用于弱强调分组和轻高亮边界。
- 常见 utility：`bg-border-accent-soft` / `border-border-accent-soft`
- 使用文件数：3
- 使用文件：`src/components/home/HomeHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/pages/auth/login.vue`

### `border.base`

- 用途：标准结构边框色，用于默认卡片、面板和内容分隔。
- 常见 utility：`border-border-base` / `bg-border-base`
- 使用文件数：37
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/common/feedback/EmptyStatePanel.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventStatusBadge.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeMembership.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`、`src/pages/events/index.vue`

### `border.hero-float`

- 用途：Hero 悬浮块边框色，用于 hero 上漂浮信息块的轮廓。
- 常见 utility：`border-border-hero-float`
- 使用文件数：1
- 使用文件：`src/components/membership/MembershipHero.vue`

### `border.inverse`

- 用途：深色背景上的主边框色，用于反相卡片和深色模块轮廓。
- 常见 utility：`border-border-inverse` / `bg-border-inverse`
- 使用文件数：8
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/pages/auth/register.vue`

### `border.inverse-hover`

- 用途：深色背景上的 hover 或 focus 边框色。
- 常见 utility：`border-border-inverse-hover`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `border.inverse-soft`

- 用途：深色背景上的次级边框色，用于柔和轮廓和内部分隔。
- 常见 utility：`border-border-inverse-soft`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `border.light`

- 用途：最轻分割线颜色，用于列表分隔和轻边界。
- 常见 utility：`border-border-light` / `bg-border-light`
- 使用文件数：19
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/home/HomeHero.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/pages/auth/login.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`

### `border.membership-diamond`

- 用途：Diamond 会员等级卡片边框色。
- 常见 utility：`border-border-membership-diamond`
- 使用文件数：2
- 使用文件：`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`

### `border.membership-gold`

- 用途：Gold 会员等级卡片边框色。
- 常见 utility：`border-border-membership-gold` / `bg-border-membership-gold`
- 使用文件数：5
- 使用文件：`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`

### `border.membership-silver`

- 用途：Silver 会员等级卡片边框色。
- 常见 utility：`border-border-membership-silver` / `bg-border-membership-silver`
- 使用文件数：3
- 使用文件：`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`

### `border.muted`

- 用途：中等存在感边框色，用于需要看见但不抢视觉的分隔。
- 常见 utility：`border-border-muted`
- 使用文件数：1
- 使用文件：`src/components/common/directory/DirectoryCardFrame.vue`

### `border.soft`

- 用途：柔和边框色，用于次级卡片、输入框和弱边界。
- 常见 utility：`border-border-soft` / `bg-border-soft`
- 使用文件数：12
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutOrigin.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/home/HomeMembership.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/pages/auth/register.vue`

### `brand.accent`

- 用途：通用品牌强调色，用于强调描边、图标和局部点缀。
- 常见 utility：`bg-brand-accent` / `text-brand-accent`
- 使用文件数：32
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutHero.vue`、`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactHero.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventStatusBadge.vue`、`src/components/events/EventsHero.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeMembership.vue`、`src/components/home/HomeProfilesPreview.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`

### `brand.accent-foreground`

- 用途：强调底或深色底上的高可读前景色，用于文字和图标前景。
- 常见 utility：`text-brand-accent-foreground`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `brand.accent-soft`

- 用途：柔和品牌强调色，用于浅层装饰、弱光效和柔和点缀。
- 常见 utility：`text-brand-accent-soft` / `border-brand-accent-soft`
- 使用文件数：9
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/components/home/HomeHero.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/register.vue`

### `brand.accent-strong`

- 用途：更强的品牌强调色，用于标题高光、关键数字和核心强调。
- 常见 utility：`text-brand-accent-strong` / `bg-brand-accent-strong`
- 使用文件数：24
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutHero.vue`、`src/components/about/AboutOrigin.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactHero.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailHero.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeProfilesPreview.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`

### `brand.primary`

- 用途：主品牌强调色，用于高识别主动作、品牌标记和强提示。
- 常见 utility：`bg-brand-primary` / `border-brand-primary`
- 使用文件数：2
- 使用文件：`src/components/about/AboutValues.vue`、`src/components/common/feedback/EmptyStatePanel.vue`

### `brand.primary-soft`

- 用途：主品牌柔和版本，用于轻量提示底色或弱化品牌点缀。
- 常见 utility：`bg-brand-primary-soft`
- 使用文件数：1
- 使用文件：`src/components/events/EventStatusBadge.vue`

### `brand.secondary`

- 用途：次级品牌强调色，用于与主强调线区分开的补充点缀或状态提示。
- 常见 utility：`text-brand-secondary` / `bg-brand-secondary`
- 使用文件数：4
- 使用文件：`src/components/about/AboutValues.vue`、`src/components/events/EventStatusBadge.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`

### `brand.secondary-soft`

- 用途：次级品牌强调的柔和版本，用于轻提示和补充状态。
- 常见 utility：`border-brand-secondary-soft`
- 使用文件数：1
- 使用文件：`src/components/events/EventStatusBadge.vue`

### `brand.support`

- 用途：辅助品牌强调色，用于 eyebrow、索引文字和辅助强调文案。
- 常见 utility：`text-brand-support` / `bg-brand-support`
- 使用文件数：39
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryActiveFilterChips.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeProfilesPreview.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`、`src/pages/events/index.vue`

### `brand.support-soft`

- 用途：更轻的辅助品牌色，用于深色区副标题和柔和强调文本。
- 常见 utility：`text-brand-support-soft`
- 使用文件数：4
- 使用文件：`src/components/home/HomeMembership.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`

### `button.accent`

- 用途：通用强调按钮底色，用于首页和营销场景主 CTA。
- 常见 utility：`bg-button-accent` / `border-button-accent`
- 使用文件数：6
- 使用文件：`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventStatusBadge.vue`、`src/components/home/HomeHero.vue`、`src/components/layout/AppHeader.vue`、`src/pages/auth/login.vue`

### `button.accent-hover`

- 用途：通用强调按钮 hover 底色。
- 常见 utility：`bg-button-accent-hover` / `border-button-accent-hover`
- 使用文件数：5
- 使用文件：`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/home/HomeHero.vue`、`src/components/layout/AppHeader.vue`、`src/pages/auth/login.vue`

### `button.membership-diamond`

- 用途：Diamond 会员等级卡片 CTA 按钮底色。
- 常见 utility：`bg-button-membership-diamond` / `border-button-membership-diamond`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `button.membership-diamond-hover`

- 用途：Diamond 会员等级卡片 CTA hover 底色。
- 常见 utility：`bg-button-membership-diamond-hover` / `border-button-membership-diamond-hover`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `button.membership-gold`

- 用途：Gold 会员等级卡片 CTA 按钮底色。
- 常见 utility：`bg-button-membership-gold` / `border-button-membership-gold`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `button.membership-gold-hover`

- 用途：Gold 会员等级卡片 CTA hover 底色。
- 常见 utility：`bg-button-membership-gold-hover` / `border-button-membership-gold-hover`
- 使用文件数：2
- 使用文件：`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipHero.vue`

### `button.neutral`

- 用途：中性色按钮底色，用于反相场景或次级按钮底板。
- 常见 utility：`border-button-neutral` / `text-button-neutral`
- 使用文件数：3
- 使用文件：`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`

### `button.neutral-contrast`

- 用途：高对比按钮前景色，用于深色主按钮上的浅色文字。
- 常见 utility：`text-button-neutral-contrast`
- 使用文件数：1
- 使用文件：`src/pages/auth/register.vue`

### `button.neutral-ink`

- 用途：中性色按钮上的文字和图标前景色。
- 常见 utility：`text-button-neutral-ink` / `bg-button-neutral-ink`
- 使用文件数：8
- 使用文件：`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventStatusBadge.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipHero.vue`、`src/pages/auth/login.vue`

### `button.primary`

- 用途：主操作按钮底色，用于高识别主动作按钮。
- 常见 utility：`bg-button-primary` / `border-button-primary`
- 使用文件数：2
- 使用文件：`src/components/common/feedback/EmptyStatePanel.vue`、`src/pages/auth/register.vue`

### `button.primary-hover`

- 用途：主操作按钮 hover 底色。
- 常见 utility：`bg-button-primary-hover` / `border-button-primary-hover`
- 使用文件数：2
- 使用文件：`src/components/common/feedback/EmptyStatePanel.vue`、`src/pages/auth/register.vue`

### `gradient.auth-hero`

- 用途：登录注册等认证场景 Hero 主背景渐变。
- 常见 utility：`bg-auth-hero`
- 使用文件数：1
- 使用文件：`src/pages/auth/login.vue`

### `gradient.decor-ambient`

- 用途：大面积环境氛围渐变，用于 section 外层铺底和背景气氛。
- 常见 utility：`bg-decor-ambient`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `gradient.decor-glow`

- 用途：局部光晕渐变，用于制造聚焦点和局部高光。
- 常见 utility：`bg-decor-glow`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `gradient.decor-haze`

- 用途：柔和雾化渐变，用于弱化边缘和增加空气感。
- 常见 utility：`bg-decor-haze`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `gradient.events-hero`

- 用途：活动相关 Hero 主背景渐变。
- 常见 utility：`bg-events-hero`
- 使用文件数：4
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`

### `gradient.home-hero`

- 用途：首页 Hero 主背景渐变。
- 常见 utility：`bg-home-hero`
- 使用文件数：2
- 使用文件：`src/components/common/detail/DetailHeroPanel.vue`、`src/components/home/HomeHero.vue`

### `gradient.membership-diamond-card`

- 用途：Diamond 会员卡片主体渐变背景。
- 常见 utility：`bg-membership-diamond-card`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `gradient.membership-diamond-card-glow`

- 用途：Diamond 会员卡片局部高光渐变。
- 常见 utility：`bg-membership-diamond-card-glow`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `gradient.membership-gold-card`

- 用途：Gold 会员卡片主体渐变背景。
- 常见 utility：`bg-membership-gold-card`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `gradient.membership-gold-card-glow`

- 用途：Gold 会员卡片局部高光渐变。
- 常见 utility：`bg-membership-gold-card-glow`
- 使用文件数：1
- 使用文件：`src/components/home/HomeMembership.vue`

### `gradient.membership-hero`

- 用途：会员页 Hero 主背景渐变。
- 常见 utility：`bg-membership-hero`
- 使用文件数：2
- 使用文件：`src/components/membership/MembershipHero.vue`、`src/pages/auth/register.vue`

### `hero.ornament.fill`

- 用途：Hero 装饰填充变量。
- 使用方式：`var(--hero-ornament-fill)`
- 使用文件数：1
- 使用文件：`src/components/home/HomeHero.vue`

### `hero.ornament.line`

- 用途：Hero 装饰线条变量。
- 使用方式：`var(--hero-ornament-line)`
- 使用文件数：1
- 使用文件：`src/components/home/HomeHero.vue`

### `hero.secondary-cta.bg`

- 用途：Hero 区次级 CTA 的背景变量。
- 使用方式：`var(--hero-secondary-cta-bg)`
- 使用文件数：1
- 使用文件：`src/components/home/HomeHero.vue`

### `hero.secondary-cta.bg-hover`

- 用途：Hero 区次级 CTA 的 hover 背景变量。
- 使用方式：`var(--hero-secondary-cta-bg-hover)`
- 使用文件数：1
- 使用文件：`src/components/home/HomeHero.vue`

### `hero.secondary-cta.border`

- 用途：Hero 区次级 CTA 的边框变量。
- 使用方式：`var(--hero-secondary-cta-border)`
- 使用文件数：1
- 使用文件：`src/components/home/HomeHero.vue`

### `page.base`

- 用途：页面主背景色，用于页面最外层容器和整页底色。
- 常见 utility：`bg-page-base`
- 使用文件数：22
- 使用文件：`src/components/about/AboutDifference.vue`、`src/components/about/AboutOrigin.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeMembership.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`、`src/pages/discovery/family/index.vue`、`src/pages/discovery/self/index.vue`、`src/pages/events/detail.vue`、`src/pages/events/index.vue`、`src/pages/index.vue`、`src/pages/not-found.vue`、`src/pages/public/about.vue`、`src/pages/public/contact.vue`、`src/pages/public/membership.vue`

### `page.soft`

- 用途：页面次级背景色，用于交替 section、浅层内容区和过渡背景。
- 常见 utility：`bg-page-soft`
- 使用文件数：12
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutValues.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeProfilesPreview.vue`、`src/components/layout/AppFooter.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/login.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`

### `shadow.card`

- 用途：标准卡片阴影，用于通用内容卡片。
- 常见 utility：`shadow-card`
- 使用文件数：24
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutHero.vue`、`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactHero.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsHero.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`

### `shadow.dropdown`

- 用途：下拉层阴影，用于菜单、选择器和悬浮列表。
- 常见 utility：`shadow-dropdown`
- 使用文件数：2
- 使用文件：`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/layout/AppHeader.vue`

### `shadow.emphasis`

- 用途：强调模块阴影，用于重点 section 和需要额外层次的容器。
- 常见 utility：`shadow-emphasis`
- 使用文件数：10
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutValues.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeMembership.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/pages/auth/register.vue`

### `shadow.feature`

- 用途：特色模块阴影，用于功能亮点卡片和重点功能块。
- 常见 utility：`shadow-feature`
- 使用文件数：2
- 使用文件：`src/components/home/HomeFeatures.vue`、`src/components/membership/MembershipTiersSection.vue`

### `shadow.hero`

- 用途：Hero 区大体量阴影，用于大幅视觉模块。
- 常见 utility：`shadow-hero`
- 使用文件数：5
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/pages/auth/login.vue`

### `shadow.luxe`

- 用途：高等级会员或重点营销卡片的厚重阴影。
- 常见 utility：`shadow-luxe`
- 使用文件数：3
- 使用文件：`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`

### `shadow.panel`

- 用途：轻量面板阴影，用于工具条、筛选条和轻浮层。
- 常见 utility：`shadow-panel`
- 使用文件数：19
- 使用文件：`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventStatusBadge.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/home/HomeProfilesPreview.vue`、`src/components/layout/AppHeader.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`、`src/pages/events/index.vue`

### `shadow.soft-luxe`

- 用途：高等级卡片的柔和阴影版本，用于保留质感但降低压迫感。
- 常见 utility：`shadow-soft-luxe`
- 使用文件数：1
- 使用文件：`src/components/membership/MembershipHero.vue`

### `surface.base`

- 用途：基础内容底板，用于普通内容区或默认容器底色。
- 常见 utility：`bg-surface-base`
- 使用文件数：17
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/common/feedback/EmptyStatePanel.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeVision.vue`

### `surface.card`

- 用途：标准卡片底色，用于通用信息卡片和列表项容器。
- 常见 utility：`bg-surface-card`
- 使用文件数：29
- 使用文件：`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/common/feedback/EmptyStatePanel.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`、`src/pages/events/index.vue`

### `surface.card-soft`

- 用途：柔和卡片底色，用于层级较轻的说明卡片或辅助内容块。
- 常见 utility：`bg-surface-card-soft`
- 使用文件数：15
- 使用文件：`src/components/about/AboutOrigin.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`

### `surface.hero-float-strong`

- 用途：Hero 区悬浮块底色，用于深色 hero 上的漂浮信息面板。
- 常见 utility：`bg-surface-hero-float-strong`
- 使用文件数：1
- 使用文件：`src/components/membership/MembershipHero.vue`

### `surface.inverse-card`

- 用途：反相卡片底色，用于深色区域内部的深色卡片。
- 常见 utility：`bg-surface-inverse-card`
- 使用文件数：5
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/pages/auth/register.vue`

### `surface.inverse-panel`

- 用途：反相面板底色，用于深色 hero 或深色 section 内的面板容器。
- 常见 utility：`bg-surface-inverse-panel`
- 使用文件数：9
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/register.vue`

### `surface.membership-diamond`

- 用途：Diamond 会员等级卡片底色，用于最高等级会员档位。
- 常见 utility：`bg-surface-membership-diamond`
- 使用文件数：2
- 使用文件：`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`

### `surface.membership-gold`

- 用途：Gold 会员等级卡片底色，用于主推或推荐会员档位。
- 常见 utility：`bg-surface-membership-gold`
- 使用文件数：2
- 使用文件：`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`

### `surface.membership-silver`

- 用途：Silver 会员等级卡片底色，用于入门会员档位。
- 常见 utility：`bg-surface-membership-silver`
- 使用文件数：3
- 使用文件：`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`

### `surface.panel`

- 用途：面板底色，用于表单区、筛选条、工具条和浮层内容区。
- 常见 utility：`bg-surface-panel`
- 使用文件数：26
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/directory/DirectoryActiveFilterChips.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/common/feedback/EmptyStatePanel.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventStatusBadge.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`

### `text.body`

- 用途：标准正文文字色，用于大部分正文和描述文案。
- 常见 utility：`text-text-body`
- 使用文件数：24
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`

### `text.body-soft`

- 用途：次级正文文字色，用于补充说明和较轻正文。
- 常见 utility：`text-text-body-soft`
- 使用文件数：30
- 使用文件：`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryActiveFilterChips.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/common/feedback/EmptyStatePanel.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`

### `text.heading`

- 用途：主标题文字色，用于页面和模块的主要标题。
- 常见 utility：`text-text-heading`
- 使用文件数：47
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutOrigin.vue`、`src/components/about/AboutValues.vue`、`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/common/feedback/EmptyStatePanel.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/events/EventDetailAgenda.vue`、`src/components/events/EventDetailNotes.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/home/HomeProfilesPreview.vue`、`src/components/home/HomeVision.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/auth/login.vue`、`src/pages/auth/register.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/family/index.vue`、`src/pages/discovery/self/detail.vue`、`src/pages/discovery/self/index.vue`、`src/pages/events/detail.vue`、`src/pages/events/index.vue`、`src/pages/index.vue`、`src/pages/not-found.vue`、`src/pages/public/about.vue`、`src/pages/public/contact.vue`、`src/pages/public/membership.vue`

### `text.inverse`

- 用途：深色背景上的主文字色，用于深底高对比文案。
- 常见 utility：`text-text-inverse`
- 使用文件数：9
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/register.vue`

### `text.inverse-muted`

- 用途：深色背景上的弱提示文字色，用于深底辅助信息。
- 常见 utility：`text-text-inverse-muted`
- 使用文件数：7
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/pages/auth/register.vue`

### `text.inverse-soft`

- 用途：深色背景上的次级正文色，用于深底说明文案。
- 常见 utility：`text-text-inverse-soft`
- 使用文件数：9
- 使用文件：`src/components/about/AboutHero.vue`、`src/components/contact/ContactHero.vue`、`src/components/events/EventDetailHero.vue`、`src/components/events/EventsHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipHero.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/pages/auth/register.vue`

### `text.inverse-subtle`

- 用途：深色背景上的轻辅助文字色，用于标签和非核心提示。
- 常见 utility：`text-text-inverse-subtle`
- 使用文件数：2
- 使用文件：`src/components/events/EventDetailHero.vue`、`src/components/home/HomeMembership.vue`

### `text.lead`

- 用途：导语文字色，用于段首引导、短句强调和说明型副标题。
- 常见 utility：`text-text-lead`
- 使用文件数：10
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/about/AboutDifference.vue`、`src/components/about/AboutOrigin.vue`、`src/components/contact/ContactCasesSection.vue`、`src/components/contact/ContactGuideSection.vue`、`src/components/contact/ContactInfoSection.vue`、`src/components/home/HomeProfilesPreview.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipRulesSection.vue`、`src/components/membership/MembershipTiersSection.vue`

### `text.muted`

- 用途：弱提示文字色，用于时间、状态补充和低优先级说明。
- 常见 utility：`text-text-muted` / `bg-text-muted`
- 使用文件数：19
- 使用文件：`src/components/common/detail/DetailHeroPanel.vue`、`src/components/common/directory/DirectoryCardFrame.vue`、`src/components/common/directory/DirectoryFilterSelectCard.vue`、`src/components/common/directory/DirectoryIntro.vue`、`src/components/common/directory/DirectoryResultToolbar.vue`、`src/components/events/EventDetailRelatedProfiles.vue`、`src/components/events/EventStatusBadge.vue`、`src/components/events/EventsFeaturedGrid.vue`、`src/components/events/EventsScheduleList.vue`、`src/components/family/FamilyFilterToolbar.vue`、`src/components/home/HomeAudience.vue`、`src/components/home/HomeFamily.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/components/membership/MembershipTiersSection.vue`、`src/components/profiles/ProfilesFilterToolbar.vue`、`src/pages/discovery/family/detail.vue`、`src/pages/discovery/self/detail.vue`

### `text.subtle`

- 用途：最轻辅助文字色，用于标签、注释和非核心补充信息。
- 常见 utility：`text-text-subtle`
- 使用文件数：10
- 使用文件：`src/components/about/AboutAudience.vue`、`src/components/common/directory/DirectoryPagination.vue`、`src/components/home/HomeEventsPreview.vue`、`src/components/home/HomeFeatures.vue`、`src/components/home/HomeHero.vue`、`src/components/home/HomeMembership.vue`、`src/components/layout/AppFooter.vue`、`src/components/layout/AppHeader.vue`、`src/components/membership/MembershipCompareSection.vue`、`src/pages/auth/register.vue`

## File Usage

> 中文注释：下面按文件记录“这个文件里至少出现过一次的 token”。

### `src/components/about/AboutAudience.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`border.soft`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.soft`、`shadow.card`、`shadow.emphasis`、`surface.base`、`surface.panel`、`text.body`、`text.heading`、`text.lead`、`text.subtle`

### `src/components/about/AboutDifference.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.base`、`shadow.card`、`shadow.emphasis`、`surface.base`、`surface.panel`、`text.body`、`text.heading`、`text.lead`

### `src/components/about/AboutHero.vue`

- 使用 token：`border.inverse`、`brand.accent`、`brand.accent-soft`、`brand.accent-strong`、`gradient.events-hero`、`shadow.card`、`shadow.hero`、`surface.inverse-card`、`surface.inverse-panel`、`text.inverse`、`text.inverse-muted`、`text.inverse-soft`

### `src/components/about/AboutOrigin.vue`

- 使用 token：`border.base`、`border.soft`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.base`、`shadow.card`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body`、`text.heading`、`text.lead`

### `src/components/about/AboutValues.vue`

- 使用 token：`border.accent`、`border.base`、`brand.accent`、`brand.primary`、`brand.secondary`、`brand.support`、`page.soft`、`shadow.card`、`shadow.emphasis`、`surface.card`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`

### `src/components/common/detail/DetailHeroPanel.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`brand.accent`、`brand.accent-strong`、`brand.support`、`gradient.home-hero`、`shadow.hero`、`surface.base`、`surface.card`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/common/directory/DirectoryActiveFilterChips.vue`

- 使用 token：`border.accent`、`brand.support`、`surface.panel`、`text.body-soft`

### `src/components/common/directory/DirectoryCardFrame.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`border.muted`、`border.soft`、`brand.accent-strong`、`brand.support`、`shadow.card`、`surface.base`、`surface.card`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/common/directory/DirectoryFilterSelectCard.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`border.soft`、`brand.support`、`shadow.dropdown`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body`、`text.body-soft`、`text.muted`

### `src/components/common/directory/DirectoryIntro.vue`

- 使用 token：`border.base`、`brand.accent`、`brand.support`、`shadow.panel`、`surface.base`、`surface.card`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/common/directory/DirectoryPagination.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`brand.accent`、`brand.support`、`shadow.panel`、`surface.base`、`surface.card`、`surface.panel`、`text.body-soft`、`text.heading`、`text.subtle`

### `src/components/common/directory/DirectoryResultToolbar.vue`

- 使用 token：`border.accent`、`border.base`、`brand.accent`、`brand.support`、`shadow.panel`、`surface.base`、`surface.card`、`surface.panel`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/common/feedback/EmptyStatePanel.vue`

- 使用 token：`border.accent`、`border.base`、`brand.primary`、`button.primary`、`button.primary-hover`、`surface.base`、`surface.card`、`surface.panel`、`text.body-soft`、`text.heading`

### `src/components/contact/ContactCasesSection.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`border.soft`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.soft`、`shadow.card`、`surface.base`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body`、`text.heading`、`text.lead`

### `src/components/contact/ContactGuideSection.vue`

- 使用 token：`border.accent`、`border.base`、`border.soft`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.base`、`shadow.card`、`shadow.emphasis`、`surface.card-soft`、`surface.panel`、`text.body-soft`、`text.heading`、`text.lead`

### `src/components/contact/ContactHero.vue`

- 使用 token：`border.inverse`、`brand.accent`、`brand.accent-soft`、`brand.accent-strong`、`button.accent`、`button.accent-hover`、`button.neutral-ink`、`gradient.events-hero`、`shadow.card`、`surface.inverse-panel`、`text.inverse`、`text.inverse-muted`、`text.inverse-soft`

### `src/components/contact/ContactInfoSection.vue`

- 使用 token：`border.base`、`border.light`、`border.soft`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.base`、`shadow.card`、`surface.base`、`text.body`、`text.heading`、`text.lead`

### `src/components/events/EventDetailAgenda.vue`

- 使用 token：`border.accent`、`border.base`、`border.light`、`brand.support`、`shadow.panel`、`surface.base`、`surface.card`、`text.body-soft`、`text.heading`

### `src/components/events/EventDetailHero.vue`

- 使用 token：`border.inverse`、`brand.accent`、`brand.accent-soft`、`brand.accent-strong`、`button.accent`、`button.accent-hover`、`button.neutral-ink`、`gradient.events-hero`、`shadow.card`、`shadow.hero`、`surface.inverse-card`、`surface.inverse-panel`、`text.inverse`、`text.inverse-muted`、`text.inverse-soft`、`text.inverse-subtle`

### `src/components/events/EventDetailNotes.vue`

- 使用 token：`border.base`、`border.light`、`brand.accent`、`brand.support`、`shadow.panel`、`surface.card`、`surface.panel`、`text.body-soft`、`text.heading`

### `src/components/events/EventDetailRelatedProfiles.vue`

- 使用 token：`border.accent`、`border.base`、`brand.support`、`shadow.card`、`shadow.panel`、`surface.base`、`surface.card`、`surface.panel`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/events/EventsFeaturedGrid.vue`

- 使用 token：`border.base`、`border.light`、`brand.support`、`shadow.card`、`shadow.panel`、`surface.base`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/events/EventsHero.vue`

- 使用 token：`border.inverse`、`brand.accent`、`brand.accent-soft`、`gradient.events-hero`、`shadow.card`、`shadow.hero`、`surface.inverse-card`、`surface.inverse-panel`、`text.inverse`、`text.inverse-muted`、`text.inverse-soft`

### `src/components/events/EventsScheduleList.vue`

- 使用 token：`border.base`、`border.light`、`brand.accent`、`brand.support`、`page.soft`、`shadow.card`、`shadow.panel`、`surface.base`、`surface.card`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/events/EventStatusBadge.vue`

- 使用 token：`border.base`、`brand.accent`、`brand.primary-soft`、`brand.secondary`、`brand.secondary-soft`、`button.accent`、`button.neutral-ink`、`shadow.panel`、`surface.panel`、`text.muted`

### `src/components/family/FamilyFilterToolbar.vue`

- 使用 token：`border.accent`、`border.base`、`brand.support`、`shadow.panel`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/home/HomeAudience.vue`

- 使用 token：`border.accent`、`border.base`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.soft`、`shadow.emphasis`、`surface.base`、`surface.card`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/home/HomeEventsPreview.vue`

- 使用 token：`border.accent`、`border.base`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.soft`、`shadow.card`、`shadow.panel`、`surface.card`、`surface.panel`、`text.body-soft`、`text.heading`、`text.subtle`

### `src/components/home/HomeFamily.vue`

- 使用 token：`border.accent`、`border.base`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.base`、`shadow.emphasis`、`surface.base`、`surface.card`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`

### `src/components/home/HomeFeatures.vue`

- 使用 token：`border.accent`、`border.base`、`brand.accent`、`brand.accent-strong`、`brand.support`、`page.base`、`shadow.feature`、`surface.card`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.subtle`

### `src/components/home/HomeHero.vue`

- 使用 token：`border.accent`、`border.accent-soft`、`border.light`、`brand.accent-soft`、`brand.accent-strong`、`brand.support`、`button.accent`、`button.accent-hover`、`button.neutral-ink`、`gradient.home-hero`、`hero.ornament.fill`、`hero.ornament.line`、`hero.secondary-cta.bg`、`hero.secondary-cta.bg-hover`、`hero.secondary-cta.border`、`shadow.card`、`shadow.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`、`text.subtle`

### `src/components/home/HomeMembership.vue`

- 使用 token：`border.base`、`border.inverse`、`border.inverse-hover`、`border.inverse-soft`、`border.membership-gold`、`border.membership-silver`、`border.soft`、`brand.accent`、`brand.accent-foreground`、`brand.support-soft`、`button.membership-diamond`、`button.membership-diamond-hover`、`button.membership-gold`、`button.membership-gold-hover`、`button.neutral-ink`、`gradient.decor-ambient`、`gradient.decor-glow`、`gradient.decor-haze`、`gradient.membership-diamond-card`、`gradient.membership-diamond-card-glow`、`gradient.membership-gold-card`、`gradient.membership-gold-card-glow`、`page.base`、`shadow.card`、`shadow.emphasis`、`shadow.luxe`、`shadow.panel`、`surface.card`、`surface.inverse-panel`、`surface.membership-silver`、`text.body`、`text.heading`、`text.inverse`、`text.inverse-soft`、`text.inverse-subtle`、`text.muted`、`text.subtle`

### `src/components/home/HomeProfilesPreview.vue`

- 使用 token：`brand.accent`、`brand.accent-strong`、`brand.support`、`page.soft`、`shadow.panel`、`text.heading`、`text.lead`

### `src/components/home/HomeVision.vue`

- 使用 token：`border.base`、`border.soft`、`brand.accent`、`brand.accent-strong`、`brand.support`、`brand.support-soft`、`page.base`、`surface.base`、`surface.card-soft`、`surface.panel`、`text.body-soft`、`text.heading`

### `src/components/layout/AppFooter.vue`

- 使用 token：`border.base`、`border.soft`、`brand.accent-strong`、`brand.support`、`brand.support-soft`、`page.soft`、`text.body`、`text.body-soft`、`text.heading`、`text.subtle`

### `src/components/layout/AppHeader.vue`

- 使用 token：`border.base`、`border.light`、`border.soft`、`brand.accent`、`brand.accent-strong`、`brand.support`、`brand.support-soft`、`button.accent`、`button.accent-hover`、`button.neutral-ink`、`page.base`、`shadow.dropdown`、`shadow.emphasis`、`shadow.panel`、`surface.card-soft`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.subtle`

### `src/components/membership/MembershipCompareSection.vue`

- 使用 token：`border.base`、`border.inverse`、`border.light`、`border.membership-gold`、`brand.accent`、`brand.accent-soft`、`brand.accent-strong`、`brand.support`、`button.neutral`、`page.base`、`shadow.card`、`shadow.emphasis`、`surface.card`、`surface.card-soft`、`surface.inverse-card`、`surface.inverse-panel`、`text.body`、`text.heading`、`text.inverse`、`text.inverse-muted`、`text.inverse-soft`、`text.lead`、`text.muted`、`text.subtle`

### `src/components/membership/MembershipHero.vue`

- 使用 token：`border.hero-float`、`border.inverse`、`border.membership-diamond`、`border.membership-gold`、`border.membership-silver`、`brand.accent`、`brand.accent-soft`、`brand.accent-strong`、`brand.support`、`button.membership-gold-hover`、`button.neutral-ink`、`gradient.membership-hero`、`shadow.card`、`shadow.luxe`、`shadow.soft-luxe`、`surface.hero-float-strong`、`surface.inverse-panel`、`surface.membership-diamond`、`surface.membership-gold`、`surface.membership-silver`、`text.body-soft`、`text.heading`、`text.inverse`、`text.inverse-muted`、`text.inverse-soft`

### `src/components/membership/MembershipRulesSection.vue`

- 使用 token：`border.accent-soft`、`border.base`、`border.light`、`border.membership-gold`、`brand.accent`、`brand.accent-strong`、`brand.support`、`button.neutral`、`page.base`、`shadow.card`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.lead`

### `src/components/membership/MembershipTiersSection.vue`

- 使用 token：`border.membership-diamond`、`border.membership-gold`、`border.membership-silver`、`brand.accent`、`brand.accent-soft`、`brand.accent-strong`、`brand.support`、`button.neutral`、`page.soft`、`shadow.card`、`shadow.feature`、`shadow.luxe`、`surface.card`、`surface.card-soft`、`surface.inverse-panel`、`surface.membership-diamond`、`surface.membership-gold`、`surface.membership-silver`、`text.body`、`text.body-soft`、`text.heading`、`text.inverse`、`text.inverse-soft`、`text.lead`、`text.muted`

### `src/components/profiles/ProfilesFilterToolbar.vue`

- 使用 token：`border.accent`、`border.base`、`brand.support`、`shadow.panel`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body-soft`、`text.heading`、`text.muted`

### `src/pages/auth/login.vue`

- 使用 token：`border.accent`、`border.accent-soft`、`border.base`、`border.light`、`brand.accent`、`brand.secondary`、`brand.support`、`button.accent`、`button.accent-hover`、`button.neutral-ink`、`gradient.auth-hero`、`page.base`、`page.soft`、`shadow.card`、`shadow.hero`、`surface.card`、`surface.card-soft`、`text.body`、`text.heading`

### `src/pages/auth/register.vue`

- 使用 token：`border.accent`、`border.base`、`border.inverse`、`border.soft`、`brand.accent`、`brand.accent-soft`、`brand.secondary`、`brand.support`、`button.neutral-contrast`、`button.primary`、`button.primary-hover`、`gradient.membership-hero`、`page.base`、`shadow.card`、`shadow.emphasis`、`surface.card`、`surface.card-soft`、`surface.inverse-card`、`surface.inverse-panel`、`text.body`、`text.heading`、`text.inverse`、`text.inverse-muted`、`text.inverse-soft`、`text.subtle`

### `src/pages/discovery/family/detail.vue`

- 使用 token：`border.base`、`border.light`、`brand.support`、`page.soft`、`shadow.panel`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`

### `src/pages/discovery/family/index.vue`

- 使用 token：`page.base`、`text.heading`

### `src/pages/discovery/self/detail.vue`

- 使用 token：`border.base`、`border.light`、`brand.support`、`page.soft`、`shadow.panel`、`surface.card`、`surface.card-soft`、`surface.panel`、`text.body`、`text.body-soft`、`text.heading`、`text.muted`

### `src/pages/discovery/self/index.vue`

- 使用 token：`page.base`、`text.heading`

### `src/pages/events/detail.vue`

- 使用 token：`page.base`、`text.heading`

### `src/pages/events/index.vue`

- 使用 token：`border.base`、`brand.support`、`page.base`、`shadow.panel`、`surface.card`、`text.heading`

### `src/pages/index.vue`

- 使用 token：`page.base`、`text.heading`

### `src/pages/not-found.vue`

- 使用 token：`page.base`、`text.heading`

### `src/pages/public/about.vue`

- 使用 token：`page.base`、`text.heading`

### `src/pages/public/contact.vue`

- 使用 token：`page.base`、`text.heading`

### `src/pages/public/membership.vue`

- 使用 token：`page.base`、`text.heading`

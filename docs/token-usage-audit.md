# Token Usage Audit

- 审计范围：`src/**/*`，排除 `src/pages/account/**` 和 `src/constants/theme-tokens.json`
- 检查日期：`2026-04-05`
- 扫描文件数：112
- 实际使用 token 的文件数：54
- 扫描到的 token 定义数：85
- 未使用 token 数：0
- 未知 token 引用数：0

## 中文说明

- 这份文档用于回答“哪个文件用了哪些 token”，不统计出现次数，只统计“是否使用过”。
- 这里的 token 以 `theme-tokens.json` 当前定义为准，包含颜色 token、渐变 token、阴影 token 和 `hero` 原始变量。
- 文件清单只记录命中过的 token，不代表这些 token 的命名已经合理，只代表“引用存在且可解析”。
- 当前审计结果表示：在本次扫描范围内，没有发现未使用 token，也没有发现写错的 token 引用。

## File Usage

> 中文注释：下面每个文件后的清单表示“这个文件里至少出现过一次的 token”。

### `src/components/about/AboutAudience.vue`

`border.base`, `border.highlight`, `border.light`, `border.soft`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.soft`, `shadow.card`, `shadow.emphasis`, `surface.base`, `surface.panel`, `text.body`, `text.heading`, `text.subtle`, `text.warm`

### `src/components/about/AboutDifference.vue`

`border.base`, `border.highlight`, `border.light`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.base`, `shadow.card`, `shadow.emphasis`, `surface.base`, `surface.panel`, `text.body`, `text.heading`, `text.warm`

### `src/components/about/AboutHero.vue`

`border.inverse`, `brand.highlight`, `brand.highlight-soft`, `brand.highlight-strong`, `gradient.events-hero`, `shadow.card`, `shadow.hero`, `surface.inverse-card`, `surface.inverse-panel`, `text.inverse`, `text.inverse-muted`, `text.inverse-soft`

### `src/components/about/AboutOrigin.vue`

`border.base`, `border.soft`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.base`, `shadow.card`, `surface.card`, `surface.card-soft`, `surface.panel`, `text.body`, `text.heading`, `text.warm`

### `src/components/about/AboutValues.vue`

`border.base`, `border.highlight`, `brand.brown`, `brand.highlight`, `brand.primary`, `brand.rose-deep`, `page.soft`, `shadow.card`, `shadow.emphasis`, `surface.card`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`

### `src/components/common/detail/DetailHeroPanel.vue`

`border.base`, `border.highlight`, `border.light`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `gradient.home-hero`, `shadow.hero`, `surface.base`, `surface.card`, `text.body`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/common/directory/DirectoryActiveFilterChips.vue`

`border.highlight`, `brand.brown`, `surface.panel`, `text.body-soft`

### `src/components/common/directory/DirectoryCardFrame.vue`

`border.base`, `border.highlight`, `border.light`, `border.muted`, `border.soft`, `brand.brown`, `brand.highlight-strong`, `shadow.card`, `surface.base`, `surface.card`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/common/directory/DirectoryFilterSelectCard.vue`

`border.base`, `border.highlight`, `border.light`, `border.soft`, `brand.brown`, `shadow.dropdown`, `surface.card`, `surface.card-soft`, `surface.panel`, `text.body`, `text.body-soft`, `text.muted`

### `src/components/common/directory/DirectoryIntro.vue`

`border.base`, `brand.brown`, `brand.highlight`, `shadow.panel`, `surface.base`, `surface.card`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/common/directory/DirectoryPagination.vue`

`border.base`, `border.highlight`, `border.light`, `brand.brown`, `brand.highlight`, `shadow.panel`, `surface.base`, `surface.card`, `surface.panel`, `text.body-soft`, `text.heading`, `text.subtle`

### `src/components/common/directory/DirectoryResultToolbar.vue`

`border.base`, `border.highlight`, `brand.brown`, `brand.highlight`, `shadow.panel`, `surface.base`, `surface.card`, `surface.panel`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/common/feedback/EmptyStatePanel.vue`

`border.base`, `border.highlight`, `brand.primary`, `button.primary`, `button.primary-hover`, `surface.base`, `surface.card`, `surface.panel`, `text.body-soft`, `text.heading`

### `src/components/contact/ContactCasesSection.vue`

`border.base`, `border.highlight`, `border.light`, `border.soft`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.soft`, `shadow.card`, `surface.base`, `surface.card`, `surface.card-soft`, `surface.panel`, `text.body`, `text.heading`, `text.warm`

### `src/components/contact/ContactGuideSection.vue`

`border.base`, `border.highlight`, `border.soft`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.base`, `shadow.card`, `shadow.emphasis`, `surface.card-soft`, `surface.panel`, `text.body-soft`, `text.heading`, `text.warm`

### `src/components/contact/ContactHero.vue`

`border.inverse`, `brand.highlight`, `brand.highlight-soft`, `brand.highlight-strong`, `button.highlight`, `button.highlight-hover`, `button.neutral-ink`, `gradient.events-hero`, `shadow.card`, `surface.inverse-panel`, `text.inverse`, `text.inverse-muted`, `text.inverse-soft`

### `src/components/contact/ContactInfoSection.vue`

`border.base`, `border.light`, `border.soft`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.base`, `shadow.card`, `surface.base`, `text.body`, `text.heading`, `text.warm`

### `src/components/events/EventDetailAgenda.vue`

`border.base`, `border.highlight`, `border.light`, `brand.brown`, `shadow.panel`, `surface.base`, `surface.card`, `text.body-soft`, `text.heading`

### `src/components/events/EventDetailHero.vue`

`border.inverse`, `brand.highlight`, `brand.highlight-soft`, `brand.highlight-strong`, `button.highlight`, `button.highlight-hover`, `button.neutral-ink`, `gradient.events-hero`, `shadow.card`, `shadow.hero`, `surface.inverse-card`, `surface.inverse-panel`, `text.inverse`, `text.inverse-muted`, `text.inverse-soft`, `text.inverse-subtle`

### `src/components/events/EventDetailNotes.vue`

`border.base`, `border.light`, `brand.brown`, `brand.highlight`, `shadow.panel`, `surface.card`, `surface.panel`, `text.body-soft`, `text.heading`

### `src/components/events/EventDetailRelatedProfiles.vue`

`border.base`, `border.highlight`, `brand.brown`, `shadow.card`, `shadow.panel`, `surface.base`, `surface.card`, `surface.panel`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/events/EventsFeaturedGrid.vue`

`border.base`, `border.light`, `brand.brown`, `shadow.card`, `shadow.panel`, `surface.base`, `text.body`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/events/EventsHero.vue`

`border.inverse`, `brand.highlight`, `brand.highlight-soft`, `gradient.events-hero`, `shadow.card`, `shadow.hero`, `surface.inverse-card`, `surface.inverse-panel`, `text.inverse`, `text.inverse-faint`, `text.inverse-muted`, `text.inverse-soft`

### `src/components/events/EventsScheduleList.vue`

`border.base`, `border.light`, `brand.brown`, `brand.highlight`, `page.soft`, `shadow.card`, `shadow.panel`, `surface.base`, `surface.card`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/events/EventStatusBadge.vue`

`border.base`, `brand.highlight`, `brand.primary-soft`, `brand.rose-deep`, `brand.rose-line`, `button.highlight`, `button.neutral-ink`, `shadow.panel`, `surface.panel`, `text.muted`

### `src/components/family/FamilyFilterToolbar.vue`

`border.base`, `border.highlight`, `brand.brown`, `shadow.panel`, `surface.card`, `surface.card-soft`, `surface.panel`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/home/HomeAudience.vue`

`border.base`, `border.highlight`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.soft`, `shadow.emphasis`, `surface.base`, `surface.card`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.heading-strong`, `text.muted`

### `src/components/home/HomeEventsPreview.vue`

`border.base`, `border.highlight`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.soft`, `shadow.card`, `shadow.panel`, `surface.card`, `surface.panel`, `text.body-soft`, `text.heading`, `text.subtle`

### `src/components/home/HomeFamily.vue`

`border.base`, `border.highlight`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.base`, `shadow.emphasis`, `surface.base`, `surface.card`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.muted`

### `src/components/home/HomeFeatures.vue`

`border.base`, `border.highlight`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.base`, `shadow.feature`, `surface.card`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.subtle`

### `src/components/home/HomeHero.vue`

`border.highlight`, `border.highlight-soft`, `border.light`, `brand.brown`, `brand.highlight-soft`, `brand.highlight-strong`, `button.highlight`, `button.highlight-hover`, `button.neutral-ink`, `gradient.home-hero`, `hero.ornament.fill`, `hero.ornament.line`, `hero.secondary-cta.bg`, `hero.secondary-cta.bg-hover`, `hero.secondary-cta.border`, `shadow.card`, `shadow.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.muted`, `text.subtle`

### `src/components/home/HomeMembership.vue`

`border.base`, `border.inverse`, `border.inverse-hover`, `border.inverse-soft`, `border.membership-gold`, `border.membership-silver`, `border.soft`, `brand.highlight`, `brand.highlight-warm`, `brand.warm`, `button.membership-diamond`, `button.membership-diamond-hover`, `button.membership-gold`, `button.membership-gold-hover`, `button.neutral-ink`, `gradient.membership-diamond-card`, `gradient.membership-diamond-card-glow`, `gradient.membership-gold-card`, `gradient.membership-gold-card-glow`, `gradient.membership-section-ambient`, `gradient.membership-section-haze`, `gradient.membership-section-orb`, `page.base`, `shadow.card`, `shadow.emphasis`, `shadow.luxe`, `shadow.panel`, `surface.card`, `surface.inverse-panel`, `surface.membership-silver`, `text.body`, `text.heading`, `text.inverse`, `text.inverse-soft`, `text.inverse-subtle`, `text.muted`, `text.subtle`

### `src/components/home/HomeProfilesPreview.vue`

`brand.brown`, `brand.highlight`, `brand.highlight-strong`, `page.soft`, `shadow.panel`, `text.heading`, `text.warm`

### `src/components/home/HomeVision.vue`

`border.base`, `border.soft`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `brand.warm`, `page.base`, `surface.base`, `surface.card-soft`, `surface.panel`, `text.body-soft`, `text.heading`

### `src/components/layout/AppFooter.vue`

`border.base`, `border.soft`, `brand.brown`, `brand.highlight-strong`, `brand.warm`, `page.soft`, `text.body`, `text.body-soft`, `text.heading`, `text.subtle`

### `src/components/layout/AppHeader.vue`

`border.base`, `border.light`, `border.soft`, `border.subtle`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `brand.warm`, `button.highlight`, `button.highlight-hover`, `button.neutral-ink`, `page.base`, `shadow.dropdown`, `shadow.emphasis`, `shadow.panel`, `surface.card-soft`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.subtle`

### `src/components/membership/MembershipCompareSection.vue`

`border.inverse`, `border.light`, `border.membership-gold`, `border.subtle`, `brand.brown`, `brand.highlight`, `brand.highlight-soft`, `brand.highlight-strong`, `button.neutral`, `page.base`, `shadow.card`, `shadow.emphasis`, `surface.card`, `surface.card-soft`, `surface.inverse-card`, `surface.inverse-panel`, `text.body`, `text.heading`, `text.inverse`, `text.inverse-muted`, `text.inverse-soft`, `text.muted`, `text.subtle`, `text.warm`

### `src/components/membership/MembershipHero.vue`

`border.hero-float`, `border.inverse`, `border.membership-diamond`, `border.membership-gold`, `border.membership-silver`, `brand.brown`, `brand.highlight`, `brand.highlight-soft`, `brand.highlight-strong`, `button.membership-gold-hover`, `button.neutral-ink`, `gradient.membership-hero`, `shadow.card`, `shadow.luxe`, `shadow.soft-luxe`, `surface.hero-float-strong`, `surface.inverse-panel`, `surface.membership-diamond`, `surface.membership-gold`, `surface.membership-silver`, `text.body-soft`, `text.heading`, `text.inverse`, `text.inverse-muted`, `text.inverse-soft`

### `src/components/membership/MembershipRulesSection.vue`

`border.base`, `border.highlight-soft`, `border.light`, `border.membership-gold`, `border.subtle`, `brand.brown`, `brand.highlight`, `brand.highlight-strong`, `button.neutral`, `page.base`, `shadow.card`, `surface.card`, `surface.card-soft`, `surface.elevated-soft`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.warm`

### `src/components/membership/MembershipTiersSection.vue`

`border.membership-diamond`, `border.membership-gold`, `border.membership-silver`, `brand.brown`, `brand.highlight`, `brand.highlight-soft`, `brand.highlight-strong`, `button.neutral`, `page.soft`, `shadow.card`, `shadow.feature`, `shadow.luxe`, `surface.card`, `surface.elevated`, `surface.elevated-soft`, `surface.inverse-panel`, `surface.membership-diamond`, `surface.membership-gold`, `surface.membership-silver`, `text.body`, `text.body-soft`, `text.heading`, `text.inverse`, `text.inverse-soft`, `text.muted`, `text.warm`

### `src/components/profiles/ProfilesFilterToolbar.vue`

`border.base`, `border.highlight`, `brand.brown`, `shadow.panel`, `surface.card`, `surface.card-soft`, `surface.panel`, `text.body-soft`, `text.heading`, `text.muted`

### `src/pages/auth/login.vue`

`border.base`, `border.highlight`, `border.highlight-soft`, `border.light`, `brand.brown`, `brand.highlight`, `brand.rose-deep`, `button.highlight`, `button.highlight-hover`, `button.neutral-ink`, `gradient.auth-hero`, `page.base`, `page.soft`, `shadow.card`, `shadow.hero`, `surface.card`, `surface.elevated`, `text.body`, `text.heading`

### `src/pages/auth/register.vue`

`border.base`, `border.highlight`, `border.inverse`, `border.soft`, `brand.brown`, `brand.highlight`, `brand.highlight-soft`, `brand.rose-deep`, `button.neutral-contrast`, `button.primary`, `button.primary-hover`, `gradient.membership-hero`, `page.base`, `shadow.card`, `shadow.emphasis`, `surface.card`, `surface.card-soft`, `surface.elevated`, `surface.inverse-card`, `surface.inverse-panel`, `text.body`, `text.heading`, `text.inverse`, `text.inverse-muted`, `text.inverse-soft`, `text.subtle`

### `src/pages/discovery/family/detail.vue`

`border.base`, `border.light`, `brand.brown`, `page.soft`, `shadow.panel`, `surface.card`, `surface.card-soft`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.muted`

### `src/pages/discovery/family/index.vue`

`page.base`, `text.heading`

### `src/pages/discovery/self/detail.vue`

`border.base`, `border.light`, `brand.brown`, `page.soft`, `shadow.panel`, `surface.card`, `surface.card-soft`, `surface.panel`, `text.body`, `text.body-soft`, `text.heading`, `text.muted`

### `src/pages/discovery/self/index.vue`

`page.base`, `text.heading`

### `src/pages/events/detail.vue`

`page.base`, `text.heading`

### `src/pages/events/index.vue`

`border.base`, `brand.brown`, `page.base`, `shadow.panel`, `surface.card`, `text.heading`

### `src/pages/index.vue`

`page.base`, `text.heading`

### `src/pages/not-found.vue`

`page.base`, `text.heading`

### `src/pages/public/about.vue`

`page.base`, `text.heading`

### `src/pages/public/contact.vue`

`page.base`, `text.heading`

### `src/pages/public/membership.vue`

`page.base`, `text.heading`

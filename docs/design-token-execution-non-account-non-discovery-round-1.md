# 非 Account / Discovery 页面 Next Token 执行记录 Round 1

- 日期：`2026-04-10`
- 关联审计：
  - `docs/design-token-audit-non-account-non-discovery.md`
  - `docs/design-token-replacement-list-non-account-non-discovery.md`
- 范围：排除 `account`、`discovery`
- 本轮策略：只执行“可直接替换为现有更准确 token”的项

## 本轮实际操作

- 将 section 标题线条从 `next-semantic-accent-*` 收敛到 `next-component-section-line`
- 将 section eyebrow 文本从 `next-semantic-accent-*` 收敛到 `next-component-section-eyebrow`
- 将首页 hero eyebrow 文本从 `next-semantic-accent-muted` 收敛到 `next-component-hero-eyebrow`
- 将首页 hero 标题强调从 `next-semantic-accent-primary` 收敛到 `next-component-hero-title-accent`
- 将卡片日期 / 编号 / meta label 从 `next-semantic-accent-*` 收敛到 `next-component-card-label`
- 将 membership gold 卡片边框从 `next-semantic-accent-secondary` 收敛到 `next-component-membership-tier-gold-accent`
- 将 membership gold badge 文本从 `next-semantic-accent-muted` 收敛到 `next-component-membership-tier-gold-accent`
- 未处理 `opacity`
- 未处理 `accent` 拆义
- 未新增 token

## 涉及文件

- `src/components/about/AboutAudience.vue`
- `src/components/about/AboutDifference.vue`
- `src/components/about/AboutOrigin.vue`
- `src/components/about/AboutValues.vue`
- `src/components/contact/ContactCases.vue`
- `src/components/contact/ContactGuide.vue`
- `src/components/contact/ContactInfo.vue`
- `src/components/events/EventOverviewCard.vue`
- `src/components/events/EventsFeaturedGrid.vue`
- `src/components/events/EventsScheduleList.vue`
- `src/components/home/HomeAudience.vue`
- `src/components/home/HomeEventsPreview.vue`
- `src/components/home/HomeFamily.vue`
- `src/components/home/HomeFeatures.vue`
- `src/components/home/HomeHero.vue`
- `src/components/home/HomeMembership.vue`
- `src/components/home/HomeProfilesPreview.vue`
- `src/components/home/HomeVision.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipTiersSection.vue`

## 本轮替换规则

### 1. Section 线条与 Eyebrow

- `bg-next-semantic-accent-primary` -> `bg-next-component-section-line`
- `bg-next-semantic-accent-secondary` -> `bg-next-component-section-line`
- `bg-next-semantic-accent-muted` -> `bg-next-component-section-line`
- `text-next-semantic-accent-primary` -> `text-next-component-section-eyebrow`
- `text-next-semantic-accent-secondary` -> `text-next-component-section-eyebrow`
- `text-next-semantic-accent-muted` -> `text-next-component-hero-eyebrow`（仅 `HomeHero`）

### 2. Card Label

- `text-next-semantic-accent-primary` -> `text-next-component-card-label`
- `text-next-semantic-accent-secondary` -> `text-next-component-card-label`

说明：

- 本轮只替换那些明确承担“日期 / 编号 / meta label / 小标签”的位置
- 没有把所有 `accent` 一刀切改掉

### 3. Hero Title Accent

- `text-next-semantic-accent-primary` -> `text-next-component-hero-title-accent`（仅 `HomeHero`）

### 4. Membership Gold Accent

- `border-next-semantic-accent-secondary` -> `border-next-component-membership-tier-gold-accent`
- `text-next-semantic-accent-muted` -> `text-next-component-membership-tier-gold-accent`（仅 gold badge 文本）

## 变更规模

- 变更文件数：`20`
- diff 统计：`54` 处插入，`54` 处删除
- 变更性质：全部为现有 token 之间的 class 替换

## 验证

- `npm.cmd run type-check`：通过
- `npm.cmd run build:h5`：通过

## 本轮未处理内容

- `opacity-*` 违规
- `text-next-component-section-line` 属性错位
- `surface-info-card` 在事件相关推荐卡中的语义错位
- `next-semantic-accent-*` 在品牌、链接、交互态、选中态中的拆义
- `next-gradient-home-membership-*` 的 effect 命名修正

## 本轮结论

- 可直接收敛的部分已经先落地
- 当前代码比审计前更接近“section / label / hero / membership”各自独立的语义边界
- 后续优先级仍然是：
  1. 清理 `opacity`
  2. 处理属性错位
  3. 拆 `accent`

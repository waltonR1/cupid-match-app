# 非 Account / Discovery 页面 Next Token 逐文件替换清单

- 日期：`2026-04-10`
- 范围：排除 `src/pages/account/**`、`src/components/account/**`、`src/pages/discovery/**`、`src/components/discovery/**`
- 目标：列出语义使用有问题的地方，区分“可直接替换”为现有更准确 token 与“必须拆义”
- 说明：本轮仅审计，不改运行时代码

## 本轮实际操作

- 复扫范围内 `44` 个 `.vue` 文件
- 确认其中 `41` 个已使用 `next-*`
- 抽取 `accent`、`opacity`、`surface-info-card`、`section-line`、`card-label`、`membership` effect 的实际落点
- 整理逐文件替换清单
- 未修改任何页面 class
- 未修改 `src/constants/theme-tokens.json`

## 范围状态

- 范围内 `.vue` 文件总数：`44`
- 已使用 `next-*` 的文件数：`41`
- 发现明确语义问题或分层问题的文件数：`31`
- 暂未发现明显问题的 `next` 文件数：`10`

未使用 `next-*` 的文件：

- `src/components/common/feedback/EmptyStatePanel.vue`
- `src/pages/not-found.vue`
- `src/App.vue`（无 token class）

## A. 可直接替换为现有更准确 token

### 1. Section 线条与 Eyebrow

这些位置当前在用 `next-semantic-accent-*` 表达“section line / section eyebrow”，已有更准确 token，可直接替换。

| 文件 | 位置 | 当前 | 建议替换 |
| --- | --- | --- | --- |
| `src/components/about/AboutAudience.vue` | `L6` | `bg-next-semantic-accent-secondary` | `bg-next-component-section-line` |
| `src/components/about/AboutAudience.vue` | `L7` | `text-next-semantic-accent-secondary` | `text-next-component-section-eyebrow` |
| `src/components/about/AboutDifference.vue` | `L7-L8` | `bg/text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/about/AboutOrigin.vue` | `L7-L8` | `bg/text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/about/AboutValues.vue` | `L9-L10` | `bg/text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/contact/ContactCases.vue` | `L7-L8` | `bg/text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/contact/ContactGuide.vue` | `L8-L9` | `bg/text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/contact/ContactInfo.vue` | `L7-L8` | `bg/text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/home/HomeAudience.vue` | `L8-L9` | `bg-next-semantic-accent-primary` / `text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/home/HomeEventsPreview.vue` | `L7-L8` | `bg-next-semantic-accent-primary` / `text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/home/HomeFamily.vue` | `L9-L10` | `bg/text-next-semantic-accent-primary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/home/HomeFeatures.vue` | `L7-L8` | `bg-next-semantic-accent-primary` / `text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/home/HomeHero.vue` | `L8-L9` | `bg/text-next-semantic-accent-muted` | `bg-next-component-section-line` / `text-next-component-hero-eyebrow` |
| `src/components/home/HomeMembership.vue` | `L13` | `bg-next-semantic-accent-primary` | `bg-next-component-section-line` |
| `src/components/home/HomeProfilesPreview.vue` | `L7-L8` | `bg-next-semantic-accent-primary` / `text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |
| `src/components/home/HomeVision.vue` | `L9-L10` | `bg-next-semantic-accent-primary` / `text-next-semantic-accent-secondary` | `bg-next-component-section-line` / `text-next-component-section-eyebrow` |

### 2. Card Meta / Date / 小标签

这些位置当前在用 `next-semantic-accent-*` 表达“卡片小标签 / 日期 / 编号 / meta”，已有更准确 token，可直接收敛到 `next-component-card-label`。

| 文件 | 位置 | 当前 | 建议替换 |
| --- | --- | --- | --- |
| `src/components/about/AboutAudience.vue` | `L32` | `item.emphasis ? text-next-semantic-accent-primary : text-next-semantic-accent-secondary` | 统一为 `text-next-component-card-label` |
| `src/components/about/AboutDifference.vue` | `L26` `L40` `L53` | `text-next-semantic-accent-primary/secondary` | 统一为 `text-next-component-card-label` |
| `src/components/about/AboutOrigin.vue` | `L30` `L41` | `text-next-semantic-accent-secondary/primary` | 统一为 `text-next-component-card-label` |
| `src/components/about/AboutValues.vue` | `L32` `L48` `L61` | `text-next-semantic-accent-secondary` | `text-next-component-card-label` |
| `src/components/contact/ContactCases.vue` | `L25` | `text-next-semantic-accent-secondary` | `text-next-component-card-label` |
| `src/components/contact/ContactGuide.vue` | `L55` | `text-next-semantic-accent-secondary` | `text-next-component-card-label` |
| `src/components/events/EventOverviewCard.vue` | `L8` | `text-next-semantic-accent-secondary` | `text-next-component-card-label` |
| `src/components/events/EventsFeaturedGrid.vue` | `L23` | `text-next-semantic-accent-secondary` | `text-next-component-card-label` |
| `src/components/events/EventsScheduleList.vue` | `L30` | `text-next-semantic-accent-secondary` | `text-next-component-card-label` |
| `src/components/home/HomeAudience.vue` | `L52` `L66` | `text-next-semantic-accent-primary/secondary` | 统一为 `text-next-component-card-label` |
| `src/components/home/HomeFamily.vue` | `L54` `L64` | `text-next-semantic-accent-primary/secondary` | 统一为 `text-next-component-card-label` |
| `src/components/home/HomeVision.vue` | `L46` | `text-next-semantic-accent-secondary` | `text-next-component-card-label` |

### 3. Hero Title Accent 与 Gold Tier Accent

这些位置已经存在更准确的组件语义，不必继续挂在通用 `accent` 下。

| 文件 | 位置 | 当前 | 建议替换 |
| --- | --- | --- | --- |
| `src/components/home/HomeHero.vue` | `L18` | `text-next-semantic-accent-primary` | `text-next-component-hero-title-accent` |
| `src/components/home/HomeMembership.vue` | `L99` | `border-next-semantic-accent-secondary` | `border-next-component-membership-tier-gold-accent` |
| `src/components/membership/MembershipHero.vue` | `L73` | `border-next-semantic-accent-secondary` | `border-next-component-membership-tier-gold-accent` |
| `src/components/membership/MembershipHero.vue` | `L78` | `border-next-semantic-accent-secondary` | `border-next-component-membership-tier-gold-accent` |
| `src/components/membership/MembershipTiersSection.vue` | `L116` | `border-next-semantic-accent-secondary` | `border-next-component-membership-tier-gold-accent` |
| `src/components/membership/MembershipTiersSection.vue` | `L126` | `border-next-semantic-accent-secondary` | `border-next-component-membership-tier-gold-accent` |
| `src/components/membership/MembershipTiersSection.vue` | `L126` | `text-next-semantic-accent-muted` | `text-next-component-membership-tier-gold-accent` |

## B. 必须拆义，不能继续复用现有 token

### 1. Section / 页面标题里的 Accent

以下文件把 `accent` 用作“标题强调词”或“章节标题强调”，当前没有足够准确的现成 token，必须拆成更明确的标题语义。

- `src/components/about/AboutAudience.vue` `L14`
- `src/components/about/AboutDifference.vue` `L15`
- `src/components/about/AboutOrigin.vue` `L15`
- `src/components/about/AboutValues.vue` `L17`
- `src/components/contact/ContactCases.vue` `L16`
- `src/components/contact/ContactGuide.vue` `L17`
- `src/components/contact/ContactInfo.vue` `L16`
- `src/components/home/HomeAudience.vue` `L16`
- `src/components/home/HomeEventsPreview.vue` `L15`
- `src/components/home/HomeFamily.vue` `L17`
- `src/components/home/HomeFeatures.vue` `L15`
- `src/components/home/HomeMembership.vue` `L22`
- `src/components/home/HomeProfilesPreview.vue` `L15`
- `src/components/home/HomeVision.vue` `L17`
- `src/components/membership/MembershipRulesSection.vue` `L15`
- `src/components/membership/MembershipTiersSection.vue` `L15`

审计判断：

- 这些都不是“通用 accent”
- 需要拆成更明确的 `section title accent` 或对应模块语义

### 2. 导航、品牌字标、链接文字不应继续用 `accent`

以下位置当前把 `accent` 当作品牌字标、导航激活态、悬停下划线或协议链接颜色使用，必须拆义。

- `src/components/layout/AppHeader.vue`
  - `L9` 品牌字标
  - `L12` 品牌副标题
  - `L28` 顶部导航激活文字
  - `L35` 顶部导航激活/hover 下划线
  - `L135` 语言选中态文字
- `src/components/layout/AppFooter.vue`
  - `L8` 品牌字标
  - `L11` 品牌副标题
  - `L21` `L43` `L55` footer 分组标题
  - `L36` footer 导航 hover 下划线
- `src/pages/auth/login.vue`
  - `L121` `L125` 协议链接文字
- `src/pages/auth/register.vue`
  - `L172` `L176` 协议链接文字
- `src/components/common/AppButton.vue`
  - `L105` header 次按钮文字和 hover 文字
  - `L109` hero 次按钮 hover 边框和 hover 文字
  - `L113` section 次按钮文字与 hover 边框

审计判断：

- 这里需要的是 `brand`、`nav active`、`link text`、`secondary action text` 等更具体语义
- 不能继续借 `next-semantic-accent-*`

### 3. 选中态、交互态与 Hover 态被错误挂在 `accent`

- `src/pages/auth/register.vue`
  - `L38` 角色卡选中边框
  - `L39` 未选中卡的 hover 边框
  - `L58` 单选圆点的选中边框与背景
- `src/components/events/EventsScheduleList.vue`
  - `L35` 事件标题 hover 颜色
- `src/components/events/EventDetailRelatedProfiles.vue`
  - `L16` 相关推荐对象卡标题 hover 颜色
- `src/components/events/EventsHero.vue`
  - `L35` next event label 的 group-hover 颜色
  - `L56` 箭头 affordance 的 hover 颜色

审计判断：

- 这里需要的是 `selected / hover / interactive title / hero affordance` 语义
- 不应继续复用 `accent`

### 4. Membership 场景仍在混用通用 Accent

以下位置虽然在会员体系里，但仍然挂在通用 `accent`，需要拆到 `membership tier` 自己的语义。

- `src/components/home/HomeMembership.vue`
  - `L41` silver badge 文字
  - `L71` `L75` `L79` silver 列表 bullet
  - `L134` `L138` `L142` gold 列表 bullet
  - `L199` `L203` `L207` diamond 列表 bullet
  - `L262` `L266` `L270` free 列表 bullet
- `src/components/membership/MembershipHero.vue`
  - `L66` silver label
  - `L87` diamond label
- `src/components/membership/MembershipTiersSection.vue`
  - `L79` silver badge
  - `L163` diamond badge

审计判断：

- 这里要么拆 `membership-tier.*.badge-label / bullet`
- 要么在 membership 私有层内补齐对应 token
- 不能继续借通用 `accent`

### 5. `surface-info-card` 在事件相关推荐卡中语义不准

- `src/components/events/EventDetailRelatedProfiles.vue`
  - `L10` `bg-next-semantic-surface-info-card`
  - `L10` `hover:border-next-semantic-border-info-card-hover`
  - `L10` `hover:bg-next-semantic-surface-info-card-hover`

审计判断：

- 该卡片是事件域的相关推荐对象卡，不是通用说明卡
- 后续应拆成 `event related card` 语义

### 6. Hero / 首页私有语义仍有空洞

- `src/components/home/HomeHero.vue`
  - `L53` quote 左边框使用 `border-next-semantic-accent-secondary`
  - `L59` hero 统计数字使用 `text-next-semantic-accent-primary`
- `src/components/home/HomeFeatures.vue`
  - `L35` 服务卡标题使用 `text-next-semantic-accent-primary`
  - `L45` 卡片底部品牌标签使用 `text-next-semantic-accent-secondary`
- `src/components/home/HomeVision.vue`
  - `L33` secondary description 使用 `text-next-semantic-accent-muted`
  - `L50` point 标题使用 `text-next-semantic-accent-secondary`

审计判断：

- 这些都不是全局通用 accent
- 后续需要补充 `home hero quote / stat emphasis / service card title / home point title` 之类更准确语义

## C. 硬规则违规：必须清理 `opacity`

以下位置违反“next 不使用 opacity 机制”：

| 文件 | 位置 | 当前 |
| --- | --- | --- |
| `src/components/common/AppButton.vue` | `L97` | `opacity-60` |
| `src/components/events/EventDetailHero.vue` | `L5` `L6` | `opacity-70` / `opacity-55` |
| `src/components/events/EventDetailHero.vue` | `L119` | `opacity-90` |
| `src/components/events/EventDetailNotes.vue` | `L3` | `opacity-70` |
| `src/components/events/EventsScheduleList.vue` | `L4` | `opacity-45` |
| `src/components/events/EventsScheduleList.vue` | `L26-L27` | `opacity-30` / `group-hover:opacity-70` / `group-hover:opacity-55` |

审计判断：

- disabled、ornament、divider、hover line 强弱都必须改成显式 token
- 不能继续靠 `opacity-*`

## D. 明确属性错位

- `src/components/events/EventsHero.vue`
  - `L56`
  - 当前：`text-next-component-section-line`

审计判断：

- `section-line` 是线条语义，不应作为 text 颜色使用
- 这里必须拆出独立的 affordance / icon token

## E. 分层复审，不建议马上改 class，但不能忽略

以下 token 在非 `account`、非 `discovery` 范围内已经跨页面复用，分层需要重审：

- `next-component-section-line`：`16`
- `next-component-section-eyebrow`：`9`
- `next-component-card-label`：`15`
- `next-component-emphasis-card-*`：`12`
- `next-component-section-card-hover-border`：`4`

审计判断：

- 它们不一定是“错误 class”
- 但它们已经明显不是局部单组件私有 token
- 后续要决定：
  - 上提为更稳定的共享语义
  - 或继续拆掉内部混用场景

## F. Effect 命名错误，后续必须改名

以下 effect 已经跨 `home` 和 `membership` 复用，`home-` 前缀不再成立：

- `next-gradient-home-membership-ambient`
- `next-gradient-home-membership-silver-card`
- `next-gradient-home-membership-silver-glow`
- `next-gradient-home-membership-gold-card`
- `next-gradient-home-membership-gold-glow`
- `next-gradient-home-membership-diamond-card`
- `next-gradient-home-membership-diamond-glow`

涉及文件：

- `src/components/home/HomeMembership.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipTiersSection.vue`

审计判断：

- 这是 effect 命名错误，不是页面级语义
- 后续应改为共享的 membership effect 命名

## 本轮结论

- 这 `41` 个已迁到 `next` 的文件里，问题核心不是“缺 token”，而是“语义挂错层”
- 当前最优先要处理的顺序：
  1. 先做可直接替换项
  2. 清掉全部 `opacity`
  3. 拆 `accent`
  4. 重审 `surface-info-card`
  5. 重审跨页复用的 `component` token

## 下一步建议

- 下一轮按本文件直接输出“逐文件替换执行单”
- 执行单只包含：
  - 哪些地方可以直接改
  - 哪些地方要先新增 token 再改

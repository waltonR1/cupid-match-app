# 非 Account / Discovery 页面 Next Token 语义审计

- 日期：`2026-04-10`
- 范围：排除 `src/pages/account/**`、`src/components/account/**`、`src/pages/discovery/**`、`src/components/discovery/**`
- 目标：仅审计 `next-*` token 的语义使用是否准确，不修改运行时代码
- 结论口径：语义准确优先，不因为“当前值相同”而共用 token

## 本轮实际操作

- 扫描非 `account`、非 `discovery` 的 `.vue` 文件
- 统计 `next-*` token 使用覆盖面
- 抽查高频 token 的实际语义落点
- 记录可直接替换项与必须拆义项
- 未修改任何 token class、未修改 `theme-tokens.json`

## 覆盖面统计

- 范围内 `.vue` 文件总数：`44`
- 已使用 `next-*` 的文件数：`41`
- 未使用 `next-*` 的文件数：`3`

未使用 `next-*` 的文件：

- `src/components/common/feedback/EmptyStatePanel.vue`
- `src/pages/not-found.vue`
- `src/App.vue`（无 token class，可忽略）

## 重点结论

### 1. `accent` 已经被用成“万能强调色”

当前 `next-semantic-accent-*` 同时承担了以下语义：

- section eyebrow
- card meta / 日期 / 小标签
- 链接或按钮文字
- 选中态
- hero 标题强调
- membership 档位强调

代表文件：

- `src/components/about/AboutAudience.vue`
- `src/components/common/AppButton.vue`
- `src/pages/auth/register.vue`
- `src/components/home/HomeHero.vue`
- `src/components/home/HomeMembership.vue`
- `src/components/membership/MembershipTiersSection.vue`

审计判断：

- 这一层已经不是稳定语义，后续必须拆义
- 后续不能再以“同值复用”为理由继续保留 `accent` 伞形语义

### 2. 存在可直接替换为现有更准确语义的点

以下场景已经有更准确的现成 token，可在后续直接替换：

- section eyebrow 文本：
  - 当前常见写法：`text-next-semantic-accent-secondary`
  - 更准确语义：`text-next-component-section-eyebrow`
  - 代表文件：
    - `src/components/about/AboutAudience.vue`
    - `src/components/contact/ContactGuide.vue`

- card meta / 日期 / 小标签：
  - 当前常见写法：`text-next-semantic-accent-secondary`
  - 更准确语义：`text-next-component-card-label`
  - 代表文件：
    - `src/components/events/EventOverviewCard.vue`
    - `src/components/events/EventsScheduleList.vue`

说明：

- 这里只表示“已有更准确语义存在”，不是因为值相同而允许共用
- 后续仍需复审这些 component token 是否应继续上提到 semantic

### 3. 存在 `opacity`，违反当前规则

发现位置：

- `src/components/common/AppButton.vue`
- `src/components/events/EventDetailHero.vue`
- `src/components/events/EventDetailNotes.vue`
- `src/components/events/EventsScheduleList.vue`

具体问题：

- disabled 态仍依赖 `opacity-60`
- 装饰圆点和线条仍依赖 `opacity-55`、`opacity-70`
- 关闭态按钮仍依赖 `opacity-90`

审计判断：

- 这些都不应继续保留
- 后续应拆成显式语义 token，例如 disabled、ornament-soft、line-soft、line-strong

### 4. 存在属性错位

明确问题：

- `src/components/events/EventsHero.vue`
  - 使用了 `text-next-component-section-line`

审计判断：

- `section-line` 是线条/分割语义，不应作为 text 使用
- 这是明确的语义错位，不属于“可接受偏差”

### 5. `surface-info-card` 语义过宽

当前 `next-semantic-surface-info-card` 用在两类不同场景：

- 合理或基本合理：
  - about / contact / membership 里的说明性信息卡
  - 代表文件：
    - `src/components/about/AboutDifference.vue`
    - `src/components/contact/ContactGuide.vue`
    - `src/components/membership/MembershipRulesSection.vue`

- 语义可疑：
  - event 详情页中的相关推荐对象卡
  - 代表文件：
    - `src/components/events/EventDetailRelatedProfiles.vue`

审计判断：

- 说明性信息卡仍可暂归于 `info-card`
- 相关推荐对象卡不应继续挂在通用 `info-card`
- 后续应拆出事件域自己的 related-card 语义

### 6. 部分 `component` token 已经跨页面复用，分层需要重审

当前统计结果：

- `next-component-section-line`：`16`
- `next-component-section-eyebrow`：`9`
- `next-component-card-label`：`15`
- `next-component-emphasis-card-*`：`12`
- `next-component-section-card-hover-border`：`4`

审计判断：

- 这些 token 不一定“使用错误”
- 但它们已经明显不是局部组件私有语义
- 后续要逐项判断：
  - 如果是稳定跨页面语义，则应考虑上提
  - 如果内部混了多种用途，则应继续拆分

### 7. `home-membership-*` effect 命名不成立

发现位置：

- `src/components/home/HomeMembership.vue`
- `src/components/membership/MembershipHero.vue`
- `src/components/membership/MembershipTiersSection.vue`

审计判断：

- 该 effect 已经不是 `home` 私有
- 即使效果值暂时不改，命名也已经不准确
- 后续应改成共享的 membership effect 命名

### 8. `HomeHero` 的 hero 语义不够准确

现状：

- `src/components/home/HomeHero.vue` 仍主要使用通用 `next-semantic-accent-*`

对比：

- `src/components/about/AboutHero.vue`
- `src/components/contact/ContactHero.vue`
- `src/components/membership/MembershipHero.vue`

这些 hero 已经使用了更明确的 `next-component-hero-*` 语义。

审计判断：

- `HomeHero` 当前语义精度落后于其他 hero
- 后续应统一重审 hero 体系，而不是继续让首页 hero 依赖通用 accent

## 审计分类

### A. 可优先直接替换为现有更准确语义

- `text-next-semantic-accent-secondary` -> `text-next-component-section-eyebrow`
- `text-next-semantic-accent-secondary` -> `text-next-component-card-label`

### B. 必须拆义，不能继续复用

- `next-semantic-accent-*`
- 任何依赖 `opacity-*` 的写法
- `text-next-component-section-line`
- `next-semantic-surface-info-card` 在相关推荐对象卡中的使用
- `next-gradient-home-membership-*` 命名

### C. 需要后续重审分层

- `next-component-section-line`
- `next-component-section-eyebrow`
- `next-component-card-label`
- `next-component-emphasis-card-*`
- `next-component-section-card-hover-border`

## 本轮结论

- 非 `account`、非 `discovery` 范围内，`next` 的主要问题不是“缺 token”，而是“语义边界失控”
- 优先级最高的问题依次是：
  1. `accent` 伞形语义
  2. `opacity` 违规
  3. 属性错位
  4. `surface-info-card` 语义过宽
  5. `component` 与 `semantic` 分层漂移

## 后续建议

- 下一轮输出一份“逐文件替换清单”
- 清单只分两类：
  - 可直接换成现有更准确 token 的位置
  - 必须新增或拆分 token 语义的位置

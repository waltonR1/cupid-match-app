# 非 Account / Discovery 页面 Next Token 执行记录 Round 2

- 日期：`2026-04-10`
- 关联审计：
  - `docs/design-token/audits/design-token-audit-non-account-non-discovery.md`
  - `docs/design-token/mappings/design-token-replacement-list-non-account-non-discovery.md`
  - `docs/design-token/executions/design-token-execution-non-account-non-discovery-round-1.md`
- 范围：排除 `account`、`discovery`
- 本轮策略：先清理硬问题，只处理 `opacity` 违规和 `section-line` 属性错位

## 本轮实际操作

- 为 `events` 模块补充显式 token，替代 `opacity-*`
- 将 `AppButton` 的 disabled 态改为显式 disabled token，不再依赖 `opacity`
- 将 `EventDetailHero` 的装饰圆环改为显式 hero ornament 分层 token
- 将 `EventDetailNotes` / `EventsScheduleList` 的分割线改为显式 divider token
- 将 `EventsScheduleList` 卡片边缘装饰线改为显式 event-card edge token
- 将 `EventsHero` 的箭头 affordance 从 `section-line` 改为专用 `hero affordance` token

## 新增 Token

本轮新增的都是 `next.component` 层 token：

### `component.hero`

- `affordance`
- `affordance-hover`

用途：

- hero 卡片右侧箭头或进入提示，不再借用 `section-line`

### `component.section`

- `section-divider`
- `section-divider-subtle`

用途：

- 长分割线或弱分割线，不再依赖 `section-line + opacity`

### `component.event-card`

- `edge`
- `edge-hover`

用途：

- event card 左边/顶部装饰边，不再依赖 `section-line + opacity`

### `component.hero-ornament`

- `line-secondary`
- `line-tertiary`

用途：

- hero 装饰圆环的第二层、第三层，不再依赖 `hero-ornament-line + opacity`

## 涉及文件

- `src/constants/theme-tokens.json`
- `src/components/common/AppButton.vue`
- `src/components/events/EventDetailHero.vue`
- `src/components/events/EventDetailNotes.vue`
- `src/components/events/EventsHero.vue`
- `src/components/events/EventsScheduleList.vue`

## 具体变更

### 1. `AppButton`

变更点：

- disabled 不再使用 `opacity-60`
- disabled 时直接切换到 `next-semantic-action-disabled*`
- disabled 光标改为 `cursor-not-allowed`

结论：

- 全局按钮的 disabled 态已经不依赖 opacity
- 这是全局组件，因此会影响 `account` 等其他页面的 disabled 按钮表现

### 2. `EventDetailHero`

变更点：

- 装饰圆环：
  - `border-next-component-hero-ornament-line opacity-70`
  - `border-next-component-hero-ornament-line opacity-55`
  - 改为：
    - `border-next-component-hero-ornament-line-secondary`
    - `border-next-component-hero-ornament-line-tertiary`
- closed 按钮去掉 `opacity-90`
- disabled 光标改为 `cursor-not-allowed`

### 3. `EventDetailNotes`

变更点：

- `bg-next-component-section-line opacity-70`
- 改为 `bg-next-component-section-divider`

### 4. `EventsScheduleList`

变更点：

- 顶部分割线：
  - `bg-next-component-section-line opacity-45`
  - 改为 `bg-next-component-section-divider-subtle`
- 卡片左边/顶部装饰线：
  - `bg-next-component-section-line opacity-30`
  - `group-hover:opacity-70` / `group-hover:opacity-55`
  - 改为：
    - `bg-next-component-event-card-edge`
    - `group-hover:bg-next-component-event-card-edge-hover`

结论：

- 事件列表装饰线已经脱离 opacity 机制
- 同时收敛到了 event card 自己的语义

### 5. `EventsHero`

变更点：

- `text-next-component-section-line`
- `group-hover:text-next-semantic-accent-muted`
- 改为：
  - `text-next-component-hero-affordance`
  - `group-hover:text-next-component-hero-affordance-hover`

结论：

- `section-line` 被拿去做 text 的属性错位已清理
- hero affordance 有了专用语义

## 变更规模

- 变更文件数：`6`
- diff 统计：`37` 处插入，`17` 处删除
- 其中 `theme-tokens.json` 新增 token，其他文件为 class 收敛与 disabled 逻辑调整

## 验证

- 非 `account`、非 `discovery` 范围内：
  - `opacity-[0-9]+` 搜索结果：`0`
  - `text-next-component-section-line` 搜索结果：`0`
- `npm.cmd run type-check`：通过
- `npm.cmd run build:h5`：通过

## 本轮未处理内容

- `accent` 在品牌、链接、选中态、标题强调中的拆义
- `surface-info-card` 在事件相关推荐卡中的语义错位
- `next-gradient-home-membership-*` 的 effect 重命名
- 跨页面复用的 `component` token 分层重审

## 本轮结论

- 审计范围内的 `opacity` 硬违规已经清零
- `section-line` 作为 text 的明确错位已经清零
- 当前剩余问题从“硬违规”进入“语义拆分和分层重审”阶段

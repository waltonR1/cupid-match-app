# 项目结构说明

本文档记录当前代码目录职责，只描述已经落地的结构，不保留历史方案。

## 总体调用链

```txt
page -> hook -> api -> mock-server
```

规则：

- 页面不直接发 HTTP 请求。
- hook 不再额外依赖 mapper 层。
- API 只负责 HTTP 边界与类型。
- mock-server 是当前唯一 mock 数据入口。

## 根目录

```txt
cupid-match/
  docs/
  mock-server/
  scripts/
  src/
  package.json
  tsconfig.json
  vite.config.ts
```

## src 目录

```txt
src/
  api/
  components/
  constants/
  hooks/
  i18n/
  pages/
  static/
  stores/
  types/
  utils/
  App.vue
  main.ts
  manifest.json
  pages.json
  uni.scss
```

## api

```txt
src/api/
  account/
    account.ts
    account.types.ts
  auth/
    auth.ts
    auth.types.ts
  events/
    events.ts
    events.types.ts
  profiles/
    profiles.ts
    profiles.types.ts
  shared/
    config.ts
    http.ts
```

约定：

- `*.types.ts` 放 DTO、payload、query、response 类型。
- `*.ts` 放域请求方法。
- `shared/http.ts` 负责统一请求行为。
- `shared/config.ts` 负责 API 基础配置。

当前已删除的旧层：

- `*.client.ts`
- `*.contract.ts`
- `*.mock.ts`
- provider 切换逻辑

## hooks

```txt
src/hooks/
  account/
  auth/
  events/
  profiles/
```

职责：

- 管理 `loading / error / refresh`
- 发起 API 请求
- 维护筛选、排序、分页、详情加载等页面动作
- 组装当前页面直接消费的数据结构

页面应该优先从 `src/hooks/<domain>` 取数。

## components

`src/components` 只放展示组件。

规则：

- 不直接发请求
- 不依赖后端 schema
- 只消费页面或 hook 提供的数据

## pages

`src/pages` 存放 uni-app 页面。

规则：

- 负责布局、绑定和跳转
- 负责读取 i18n 文案
- 可以在页面本地 `computed` 中做少量展示组装
- 不直接访问 `src/api/shared/http.ts`

## stores

`src/stores` 只放跨页面共享状态，例如：

- 认证状态
- 语言
- 主题

## types

当前 `src/types` 保留跨页面复用的展示类型和声明文件，例如：

- `src/types/events/view.ts`
- `src/types/home/view.ts`
- `src/types/profiles/*`

当前已删除：

- `src/types/vm/*`

## utils

`src/utils` 放纯工具函数，例如：

- 本地化时间格式化
- profile 展示字段格式化
- account 文本格式化
- 导航函数

规则：

- 不直接依赖页面
- 不直接依赖 HTTP
- 不直接 import `@/i18n/...`

## mock-server

```txt
mock-server/
  db.json
  src/
    server.ts
    config.ts
    db.ts
    routes/
    services/
    types/
    utils/
```

职责：

- 提供 `/api/...` HTTP 接口
- 负责聚合、筛选、排序、分页和响应整形
- 为前端模拟接近真实后端的边界

## 明确不再使用的结构

以下结构已经退出当前代码主链路：

- `src/composables`
- `src/api/modules`
- `src/mock`
- `src/mappers`
- `src/types/vm`

## 新增功能时的顺序

1. 先补 `src/api/<domain>/<domain>.types.ts`
2. 再补 `src/api/<domain>/<domain>.ts`
3. 然后在 `src/hooks/<domain>` 接入请求与页面状态
4. 最后由页面消费 hook
5. 若涉及 mock 数据，同步更新 `mock-server/src/*` 和 `mock-server/db.json`

## 当前校验基线

当前结构应满足：

- 页面不再 import `@/api/...*.http`
- 页面不再 import `@/mappers/...`
- 运行时不再 import `@/mock/...`
- `type-check` 通过
- 主 GET 链路和登录链路可通过 mock-server 冒烟

```txt
src/
  api/
    shared/
      config.ts
      http.ts
    account/
      account.ts
      account.types.ts
    auth/
      auth.ts
      auth.types.ts
    events/
      events.ts
      events.types.ts
    profiles/
      profiles.ts
      profiles.types.ts
  components/
    about/
      AboutAudience.vue
      AboutDifference.vue
      AboutHero.vue
      AboutOrigin.vue
      AboutValues.vue
    account/
      AccountPrimaryNav.vue
      AccountSectionHeader.vue
      AccountShell.vue
      AccountTopSummary.vue
    common/
      AgreementDialog.vue
      AppAvatar.vue                ✔
      AppButton.vue                ✔
      AppGenderBadge.vue           ✔
      feedback/EmptyStatePanel.vue
    contact/
      ContactCases.vue
      ContactGuide.vue
      ContactHero.vue
      ContactInfo.vue
    events/
      EventDetailAgenda.vue
      EventDetailHero.vue
      EventDetailNotes.vue
      EventDetailRelatedProfiles.vue
      EventOverviewCard.vue
      EventsFeaturedGrid.vue
      EventsHero.vue
      EventsScheduleList.vue
      EventStatusBadge.vue
    home/
      HomeAudience.vue             ✔
      HomeEvents.vue
      HomeFamily.vue               ✔
      HomeFeatures.vue             ✔ 具体功能后期再评估
      HomeHero.vue                 ✔
      HomeMembership.vue           ✔
      HomeProfiles.vue
      HomeVision.vue               ✔
    layout/
      AppFooter.vue
      AppHeader.vue
      AppPageLayout.vue
    membership/
      MembershipHero.vue
      MembershipPlanButton.vue
      MembershipRulesSection.vue
      MembershipTiersSection.vue
    profiles/
      directory/
        ProfileActiveFilterChips.vue
        ProfileCardFrame.vue                    ✔
        ProfileDirectoryIntro.vue
        ProfileDirectoryPagination.vue
        ProfileFilterSelectCard.vue
        ProfileFilterToolbar.vue
        ProfileResultToolbar.vue
        ProfileResultsGrid.vue
      detail/
        ProfileDetailFactGrid.vue
        ProfileDetailFactSection.vue
        ProfileDetailHero.vue
  constants/
    nav.ts
    theme-tokens.json
  hooks/
    account/
      index.ts
      use-account-overview.ts
    auth/
      index.ts
      use-login-action.ts
      use-register-action.ts
    events/
      index.ts
      use-event-detail-page.ts
      use-events-index-page.ts
      use-home-events-preview.ts
    profiles/
      index.ts
      use-family-profile-detail-page.ts
      use-family-profile-directory-page.ts
      use-home-self-profiles-preview.ts
      use-self-profile-detail-page.ts
      use-self-profile-directory-page.ts
  i18n/
    index.ts
    locale.ts
    types.ts
    composables/
      use-app-i18n.ts
      use-locale-bridge.ts
      use-page-i18n.ts
    messages/
  pages/
    auth/
      login.vue
      register.vue
    public/
      about.vue
      contact.vue
      membership.vue
    profiles/
      family/
        detail.vue
        index.vue
      self/
        detail.vue
        index.vue
    events/
      detail.vue
      index.vue
    account/
      activity.vue
      connections.vue
      membership.vue
      messages.vue
      profile.vue
      safety.vue
      verification.vue
    index.vue
    not-found.vue
  stores/
    modules/
      auth.ts
      locale.ts
      theme.ts
    plugins/
      persisted-state.ts
  types/
    account/
      navigation.ts
    contact/
      view.ts
    declarations/
      pinia-persist.d.ts
    events/
      view.ts
    home/
      view.ts
    profiles/
      card.ts
      detail.ts
      directory.ts
  utils/
    account-format.ts
    display-name.ts
    locale-format.ts
    navigation.ts
    profile-format.ts
```


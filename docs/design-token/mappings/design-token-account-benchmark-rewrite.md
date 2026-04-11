# Account Benchmark Rewrite

## Status

- Date: 2026-04-10
- Scope: `account` area
- Decision: stop using current `account` code structure as the main reference
- New baseline: China market, serious matchmaking products first

配套 IA：

- [account-rewrite-ia.md](account-rewrite-ia.md)

## Market Baseline

For this project, `account` should benchmark against Chinese `相亲/婚恋` products, not泛社交/泛约会 products.

Verified reference set on 2026-04-10:

- `珍爱`
- `世纪佳缘`
- `伊对`

Secondary reference set:

- `MarryU`
- `一伴`

## Why This Set

### Core products

`珍爱`

- official positioning on App Store: `专业婚恋平台`
- strongest `红娘 + 认证 + 结婚导向` signal
- account model is trust-heavy and service-heavy

`世纪佳缘`

- official positioning on App Store: `严肃婚恋相亲交友平台`
- profile completeness, matching, certification, risk checks are all visible product primitives
- suitable for defining serious matchmaking account structure

`伊对`

- official positioning on App Store: `视频聊天平台`, but still explicitly oriented to `找对象`
- account is more operational around `真人、视频、主持人破冰、同城`
- useful when the product needs stronger `真实感` and faster social activation

### Secondary products

`MarryU`

- stronger `高质量 / 高净值 / 多认证` framing
- good reference if the project wants a more curated, cleaner, premium account experience

`一伴`

- closer to modern mobile婚恋 app interaction
- useful for profile matching, tag matching, lightweight feed/presence patterns

## Verified Product Signals

### 珍爱

Observed from App Store listing crawled 4 weeks before 2026-04-10:

- `实名认证`
- `严格资料审核`
- `大数据匹配 + 人工筛选`
- `红娘牵线`
- `附近缘分`
- `情感学院`

Inference:

- account is not just self-service settings
- it is a trust + profile + service hub

### 世纪佳缘

Observed from App Store listing/version notes:

- listing says `实名制严肃婚恋相亲交友平台`
- version `10.0.2` dated `2026-01-21` mentions:
  - `资料完善赢奖励`
  - `风险核查功能`
  - `认证邀请功能`
- version `10.0.1` dated `2026-01-06` mentions:
  - `互相喜欢就能聊天`
  - `双重认证后可开启聊天`
  - `趣味问答 + 自定义标签`
  - `精选模块`

Inference:

- profile completion, verification, and chat eligibility are tightly linked
- account should expose completion, trust, and matchmaking quality together

### 伊对

Observed from App Store listing crawled 4 weeks before 2026-04-10:

- `音视频恋爱社区`
- `真人在线视频交友`
- `主持人破冰`
- `实名认证`
- `多人在线聚会交友`
- `同城`

Inference:

- account should support fast media-based trust
- `真人认证 / 视频感 / 在线状态 / 快速进入互动` matter more than dashboard metrics

### MarryU

Observed from App Store listing crawled 3 months before 2026-04-10:

- `高净值`
- `学历认证 / 身份认证 / 形象视频认证 / 资产认证`
- `没有广告`
- `纯洁的相亲婚恋交友环境`

Inference:

- if the project wants premium seriousness, account should surface proof and quality filters cleanly

## Rewrite Direction

### 1. Do not keep the current `overview` dashboard

The current account page is too close to a landing page:

- large hero
- promo cards
- summary cards
- marketing-style section rhythm

This is not the dominant pattern in Chinese serious matchmaking products.

Target direction:

- make `Profile` or `My` the real entry
- make the first screen actionable, not decorative
- reduce large hero dependency inside authenticated areas

### 2. Rebuild around Chinese matchmaking jobs

Recommended IA:

1. `我的资料`
2. `认证中心`
3. `我的缘分`
4. `消息`
5. `隐私与安全`
6. `会员与服务`

Optional:

- `线下活动`
- `红娘服务`

### 3. Make profile quality the center

`我的资料` should include:

- completion progress
- base profile facts
- photo/video
- question/answer or prompt blocks
- tags and择偶意向
- family visibility if your business keeps that model
- quick preview of public profile

This should be the primary account surface, not a card dashboard.

### 4. Split trust from general settings

`认证中心` should be independent, not buried in `settings`.

Recommended modules:

- 实名认证
- 学历认证
- 婚况认证
- 职业认证
- 形象/视频认证
- 风险核查
- 邀请对方认证

This is directly aligned with what current Chinese婚恋 products are emphasizing.

### 5. Keep connections and communication operational

`我的缘分` should include:

- 喜欢我
- 我喜欢的
- 互相喜欢
- 推荐对象
- 同城/附近
- family-visible or assisted connections if business requires it

`消息` should include:

- recent chats
- chat eligibility or trust state
- unread
- quick jump to profile or video interaction

### 6. Safety needs a first-class page

`隐私与安全` should include:

- profile visibility
- family visibility / assisted contact boundary
- who can contact me
- blacklists / reports
- risk check
- anti-fraud education
- pause / hide mode if needed

This is more important in China serious matchmaking than a Western-style lightweight settings page.

### 7. Membership should live as service, not decoration

`会员与服务` should include:

- current tier
- unlocked abilities
- red娘/人工服务 entry
- boosts or recommendation privileges
- trust/service explanation

Do not let membership dominate the whole account shell visually.

## Design Implications

### Layout

- prefer compact section stacks
- prefer lists, forms, chips, status rows, and trust cards
- reduce decorative hero blocks
- reduce landing-page gradients in authenticated pages
- make top-of-page immediately useful

### Visual tone

- more `可信 / 清晰 / 高效率`
- less `营销 / 展示型 / 首页化`

### Interaction

- stronger status exposure
- stronger completion prompts
- more direct edit entry
- more certification CTA
- more contact boundary controls

## Token Implications

### Reuse first

- `next.semantic.page.*`
- `next.semantic.surface.*`
- `next.semantic.text.*`
- `next.semantic.border.*`
- `next.semantic.action.*`
- `next.semantic.state.*`

### Recommended new component groups

Only add these if the rewritten structure really needs them:

```json
{
  "account": {
    "completion": {},
    "verification": {},
    "service": {},
    "visibility": {},
    "risk": {}
  }
}
```

Guideline:

- `completion.*`: progress card, reward hint, missing-field prompt
- `verification.*`: verification chips, verified/unverified callouts
- `service.*`: red娘/service entry, consultant callout
- `visibility.*`: family-visible / public-visible / hidden states
- `risk.*`: anti-fraud / risk-check / warning modules

Do not create new account-only decorative backgrounds unless the new IA proves they are necessary.

## What To Avoid

- re-skinning the current `overview` dashboard
- using marketing hero gradients as the main logged-in shell
- deriving token names from current account card colors
- copying Tinder/Hinge profile-first patterns too literally without the Chinese `认证/红娘/风险` layer
- mixing `会员营销` and `隐私安全` into one visual block

## Implementation Sequence

1. define China-market account IA
2. define page/module responsibilities
3. sketch the rewritten hierarchy
4. map semantics onto the new hierarchy
5. add only minimum `next.component.account.*`
6. then implement

Do not:

1. read old page
2. rename old class
3. keep old section structure
4. call it migration

## Sources

- 珍爱 App Store: https://apps.apple.com/cn/app/%E7%8F%8D%E7%88%B1-%E6%88%90%E5%B0%B1%E5%A4%A9%E4%B8%8B%E5%A7%BB%E7%BC%98/id575846819
- 世纪佳缘 App Store: https://apps.apple.com/cn/app/id435057236
- 伊对 App Store: https://apps.apple.com/cn/app/%E4%BC%8A%E5%AF%B9-%E4%BA%A4%E5%8F%8B%E8%81%8A%E5%A4%A9%E9%AB%98%E6%95%88%E8%84%B1%E5%8D%95/id1363039920
- 百合网 App Store: https://apps.apple.com/cn/app/id500975133
- MarryU App Store: https://apps.apple.com/cn/app/marryu%E7%9B%B8%E4%BA%B2%E4%BA%A4%E5%8F%8B/id1446851714
- 艾媒咨询《2024-2025年中国婚恋社交服务市场研究报告》: https://www.iimedia.cn/c400/100883.html

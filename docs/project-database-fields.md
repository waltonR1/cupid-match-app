# 项目数据库字段规范

本文记录 `mock-server/db.json` 的字段结构。

约定：
- `profiles` 使用扁平字段模拟关系型数据库主表，不保存前端页面分组
- 字段可见性不存入 profile 数据，由 mock 后端常量表和账号会员等级在接口返回前决定（见[可见性规则](#可见性规则)）

## 通用结构

### LocalizedText

| Field | Type | Description |
| --- | --- | --- |
| `zh` | `string` | 中文内容。 |
| `fr` | `string` | 法文内容。 |
| `en` | `string` | 英文内容。 |

### 顶层集合

| Collection | Type | Description |
| --- | --- | --- |
| `profiles` | `ProfileRecord[]` | 相亲资料。 |
| `events` | `EventRecord[]` | 活动资料。 |
| `accounts` | `AccountRecord[]` | 业务账号。 |
| `user_registrations` | `UserRegistrationRecord[]` | 活动报名关系。 |
| `favorite_profiles` | `FavoriteProfileRecord[]` | 收藏关系。 |
| `message_threads` | `MessageThreadRecord[]` | 会话摘要。 |
| `privacy_settings` | `PrivacySettingRecord[]` | 隐私设置。 |
| `auth_users` | `AuthUserRecord[]` | mock 登录用户。 |

## profiles

扁平字段模拟关系型数据库主表，共 71 个字段。不保存前端页面分组或字段权限配置，可见性规则见下方。

### 身份与基本资料

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 资料 ID。 |
| `legalName` | `string` | 真实姓名。 |
| `nickname` | `string` | 昵称。 |
| `displayName` | `string` | 前台展示名。 |
| `gender` | `'male' \| 'female'` | 性别。 |
| `pronouns` | `string` | 代词。 |
| `sexuality` | `string` | 性取向。 |
| `interestedIn` | `GenderCode[]` | 感兴趣的对象。 |
| `avatarUrl` | `string` | 头像 URL。 |
| `photos[].id` | `string` | 照片 ID。 |
| `photos[].url` | `string` | 照片 URL。 |
| `photos[].caption` | `LocalizedText` | 照片说明。 |
| `photos[].isPrimary` | `boolean` | 是否主图。 |
| `age` | `number` | 年龄。 |
| `height` | `number` | 身高，单位 cm。 |
| `city` | `LocalizedText` | 当前城市。 |
| `country` | `LocalizedText` | 当前国家。 |
| `nationality` | `LocalizedText` | 国籍。 |
| `hometown` | `LocalizedText` | 家乡。 |
| `languages` | `string[]` | 语言 code。 |
| `bodyType` | `LocalizedText` | 体型。 |
| `livingSituation` | `LocalizedText` | 居住状态。 |
| `zodiac` | `LocalizedText` | 星座。 |

### 状态与可见性

| Field | Type | Description |
| --- | --- | --- |
| `profileStatus` | `'open' \| 'vip' \| 'review'` | 资料状态。 |
| `isVerified` | `boolean` | 是否认证。 |
| `lastActiveAt` | `string` | 最近活跃时间。 |
| `joinedAt` | `string` | 加入时间。 |
| `familyVisible` | `boolean` | 是否对 family 入口可见。 |
| `allowFamilyContact` | `boolean` | 是否允许家庭协助联系。 |
| `familyPriority` | `boolean` | 是否家庭优先展示。 |

### 学历与职业

| Field | Type | Description |
| --- | --- | --- |
| `degreeLevel` | `'bachelor' \| 'master' \| 'phd'` | 学历等级 code。 |
| `education` | `LocalizedText` | 学历展示内容。 |
| `occupation` | `LocalizedText` | 职业。 |
| `industry` | `LocalizedText` | 行业。 |
| `employer` | `LocalizedText` | 雇主或职业身份。 |
| `incomeRange` | `LocalizedText` | 收入区间。 |

### 婚恋与择偶

| Field | Type | Description |
| --- | --- | --- |
| `maritalStatus` | `'single' \| 'divorced' \| 'widowed'` | 婚姻状态。 |
| `hasChildren` | `boolean` | 是否已有子女。 |
| `wantsChildren` | `boolean` | 是否想要子女。 |
| `acceptsLongDistance` | `boolean` | 是否接受异地。 |
| `datingIntentionCode` | `DatingIntentionCode` | 关系目标 code。 |
| `datingIntentionLabel` | `LocalizedText` | 关系目标展示内容。 |
| `relationshipPlan` | `LocalizedText` | 关系推进计划。 |
| `residencePlan` | `LocalizedText` | 居住计划。 |
| `relocationWillingness` | `LocalizedText` | 搬迁或双城意愿。 |
| `values` | `LocalizedText[]` | 关系价值观。 |
| `preferredAgeMin` | `number` | 期待最小年龄。 |
| `preferredAgeMax` | `number` | 期待最大年龄。 |
| `locationScope` | `LocalizedText` | 期待城市或距离范围。 |
| `preferredEducation` | `LocalizedText` | 期待学历。 |
| `familyPlan` | `LocalizedText` | 家庭规划偏好。 |
| `dealBreakers` | `LocalizedText[]` | 不可接受项。 |

### 生活、性格与内容

| Field | Type | Description |
| --- | --- | --- |
| `smoking` | `HabitCode` | 吸烟习惯。 |
| `drinking` | `HabitCode` | 饮酒习惯。 |
| `exercise` | `LocalizedText` | 运动习惯。 |
| `activityLevel` | `LocalizedText` | 活跃程度。 |
| `weekendStyle` | `LocalizedText` | 周末生活方式。 |
| `pets` | `LocalizedText` | 宠物态度。 |
| `religion` | `LocalizedText` | 信仰。 |
| `politicalViews` | `LocalizedText` | 公共议题态度。 |
| `personalityTraits` | `LocalizedText[]` | 性格特征。 |
| `interests` | `LocalizedText[]` | 兴趣爱好。 |
| `communicationStyle` | `LocalizedText` | 沟通方式。 |
| `funFacts` | `LocalizedText[]` | 有记忆点的小事。 |
| `summary` | `LocalizedText` | 个人简介。 |
| `highlights` | `LocalizedText[]` | 资料亮点。 |
| `tags` | `LocalizedText[]` | 标签。 |
| `conversationStarters` | `LocalizedText[]` | 对话开场建议。 |
| `dateIdeas` | `LocalizedText[]` | 约会建议。 |
| `prompts[].id` | `string` | prompt ID。 |
| `prompts[].promptCode` | `string` | prompt code。 |
| `prompts[].prompt` | `LocalizedText` | prompt 问题。 |
| `prompts[].answer` | `LocalizedText` | 用户回答。 |
| `compatibilityDimensions[].code` | `string` | 兼容性维度 code。 |
| `compatibilityDimensions[].label` | `LocalizedText` | 兼容性维度名称。 |
| `compatibilityDimensions[].score` | `number` | mock 兼容性分数。 |
| `phone` | `string` | 手机号。 |
| `email` | `string` | 邮箱。 |
| `wechat` | `string` | 微信号。 |

### 可见性规则

profile 字段权限由 `mock-server/src/constants/profile-access.ts` 维护：

| Rule | Description |
| --- | --- |
| `SELF_PROFILE_LOGIN_REQUIRED_FIELDS` | 登录后可见字段。 |
| `SELF_PROFILE_MEMBER_ONLY_FIELDS` | 会员可见字段。 |
| `SELF_PROFILE_GUEST_REQUIRED_FIELDS` | 游客查看 self detail 时统一替换为 `__LOGIN_REQUIRED__` 的受限字段集合。 |

游客查看受限字段时统一引导登录；免费登录用户查看会员字段时引导开通会员。`phone`、`email`、`wechat` 作为原始数据库字段暂时保留，但 self detail API 不返回私人联系方式；页面通过 Private Introduction 模块发起平台撮合请求。前端 API 仍接收扁平对象，通过字段值是否等于特殊值决定显示锁定态或真实内容。

## events

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 活动 ID。 |
| `date` | `string` | 活动日期。 |
| `city` | `LocalizedText` | 活动城市。 |
| `venue` | `LocalizedText` | 活动地点。 |
| `status` | `'open' \| 'waitlist' \| 'closed'` | 活动状态。 |
| `title` | `LocalizedText` | 活动标题。 |
| `format` | `LocalizedText` | 活动形式。 |
| `audience` | `LocalizedText` | 适合人群。 |
| `summary` | `LocalizedText` | 活动简介。 |
| `seats` | `number` | 总席位。 |
| `registered` | `number` | 已报名人数。 |
| `agenda[].time` | `string` | 议程时间段。 |
| `agenda[].title` | `LocalizedText` | 议程标题。 |
| `agenda[].desc` | `LocalizedText` | 议程说明。 |

## accounts

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 账号 ID。 |
| `role` | `'self' \| 'parent'` | 注册角色。 |
| `realName` | `string` | 真实姓名。 |
| `nickName` | `string` | 昵称。 |
| `avatarUrl` | `string` | 头像 URL。 |
| `city` | `LocalizedText` | 当前城市。 |
| `joinedAt` | `string` | 加入时间。 |
| `profileId` | `string` | 绑定资料 ID。 |
| `completion` | `number` | 资料完成度。 |
| `membership` | `'free' \| 'silver' \| 'gold' \| 'diamond'` | 会员等级。 |
| `bio` | `LocalizedText` | 账号简介。 |

## user_registrations

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 报名记录 ID。 |
| `accountId` | `string` | 账号 ID。 |
| `eventId` | `string` | 活动 ID。 |
| `status` | `'confirmed' \| 'waitlist' \| 'completed'` | 报名状态。 |
| `note` | `LocalizedText` | 报名备注。 |

## favorite_profiles

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 收藏记录 ID。 |
| `accountId` | `string` | 账号 ID。 |
| `profileId` | `string` | 资料 ID。 |
| `savedAt` | `string` | 收藏日期。 |
| `note` | `LocalizedText` | 收藏备注。 |

## message_threads

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 会话摘要 ID。 |
| `accountId` | `string` | 账号 ID。 |
| `profileId` | `string` | 资料 ID。 |
| `updatedAt` | `string` | 最近更新时间。 |
| `unread` | `number` | 未读数。 |
| `lastMessage` | `LocalizedText` | 最近消息摘要。 |

## private_introduction_requests

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 私人介绍请求 ID。 |
| `accountId` | `string` | 发起账号 ID。 |
| `profileId` | `string` | 被申请资料 ID。 |
| `status` | `'requested' \| 'accepted' \| 'declined' \| 'cooldown'` | 私人介绍状态。 |
| `requestedAt` | `string` | 发起时间。 |
| `respondedAt` | `string?` | 对方响应时间。 |
| `cooldownUntil` | `string?` | 冷静期结束时间。 |

## privacy_settings

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 隐私设置 ID。 |
| `accountId` | `string` | 账号 ID。 |
| `enabled` | `boolean` | 是否开启。 |
| `title` | `LocalizedText` | 设置标题。 |
| `desc` | `LocalizedText` | 设置说明。 |

## auth_users

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 登录用户 ID。 |
| `accountId` | `string` | 业务账号 ID。 |
| `role` | `'self' \| 'parent'` | 登录角色。 |
| `identity` | `string` | 登录标识。 |
| `email` | `string` | 邮箱。 |
| `password` | `string` | mock 密码。正式后端不应明文保存。 |
| `displayName` | `string` | 登录态展示名。 |
| `avatarUrl` | `string` | 登录态头像。 |

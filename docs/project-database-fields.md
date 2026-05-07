# 项目数据库字段规范

本文档描述当前 `mock-server/db.json` 的字段结构。`profiles` 已按成熟婚恋产品常见的信息架构重组；本文档只记录当前状态，不再保留待办式建议。

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

`profiles` 采用扁平字段结构，模拟关系型数据库的列存储。

### 基础信息

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 资料 ID。 |
| `legalName` | `string` | 真实姓名。 |
| `nickname` | `string` | 昵称。 |
| `displayName` | `string` | 前台展示名。 |

### 媒体

| Field | Type | Description |
| --- | --- | --- |
| `avatarUrl` | `string` | 头像 URL。 |
| `photos[].id` | `string` | 照片 ID。 |
| `photos[].url` | `string` | 照片 URL。 |
| `photos[].caption` | `LocalizedText` | 照片说明。 |
| `photos[].isPrimary` | `boolean` | 是否主图。 |

### 身份

| Field | Type | Description |
| --- | --- | --- |
| `gender` | `'male' \| 'female'` | 性别。 |
| `pronouns` | `string` | 代词。 |
| `sexuality` | `string` | 性取向。 |
| `interestedIn` | `GenderCode[]` | 感兴趣的对象。 |

### 基本信息

| Field | Type | Description |
| --- | --- | --- |
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

### 资料状态

| Field | Type | Description |
| --- | --- | --- |
| `profileStatus` | `'open' \| 'vip' \| 'review'` | 资料状态。 |
| `isVerified` | `boolean` | 是否认证。 |
| `lastActiveAt` | `string` | 最近活跃时间。 |
| `joinedAt` | `string` | 加入日期。 |

### 访问控制

| Field | Type | Description |
| --- | --- | --- |
| `familyVisible` | `boolean` | 是否家庭可见。 |
| `allowFamilyContact` | `boolean` | 是否允许家庭联系。 |
| `familyPriority` | `boolean` | 是否家庭优先。 |
| `memberOnlyFields` | `string[]` | 会员可见字段名列表。 |
| `contactFields` | `string[]` | 需请求可见字段名列表。 |

### 学历与职业

| Field | Type | Description |
| --- | --- | --- |
| `degreeLevel` | `'bachelor' \| 'master' \| 'phd'` | 学历等级 code。 |
| `education` | `LocalizedText` | 学历展示内容。 |
| `occupation` | `LocalizedText` | 职业。 |
| `industry` | `LocalizedText` | 行业。 |
| `employer` | `LocalizedText` | 雇主或职业身份。 |
| `incomeRange` | `LocalizedText` | 收入区间。 |

### 婚恋关系

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

### 择偶偏好

| Field | Type | Description |
| --- | --- | --- |
| `preferredAgeMin` | `number` | 期待最小年龄。 |
| `preferredAgeMax` | `number` | 期待最大年龄。 |
| `locationScope` | `LocalizedText` | 期待城市或距离范围。 |
| `preferredEducation` | `LocalizedText` | 期待学历。 |
| `familyPlan` | `LocalizedText` | 家庭规划偏好。 |
| `dealBreakers` | `LocalizedText[]` | 不可接受项。 |

### 生活方式

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

### 性格与兴趣

| Field | Type | Description |
| --- | --- | --- |
| `personalityTraits` | `LocalizedText[]` | 性格特征。 |
| `interests` | `LocalizedText[]` | 兴趣爱好。 |
| `communicationStyle` | `LocalizedText` | 沟通方式。 |
| `funFacts` | `LocalizedText[]` | 有记忆点的小事。 |

### 内容

| Field | Type | Description |
| --- | --- | --- |
| `summary` | `LocalizedText` | 个人简介。 |
| `highlights` | `LocalizedText[]` | 资料亮点。 |
| `tags` | `LocalizedText[]` | 标签。 |
| `conversationStarters` | `LocalizedText[]` | 对话开场建议。 |
| `dateIdeas` | `LocalizedText[]` | 约会建议。 |
| `prompts[].id` | `string` | prompt ID。 |
| `prompts[].promptCode` | `string` | prompt code。 |
| `prompts[].prompt` | `LocalizedText` | prompt 问题。 |
| `prompts[].answer` | `LocalizedText` | 用户回答。 |

### 兼容性

| Field | Type | Description |
| --- | --- | --- |
| `compatibilityDimensions[].code` | `string` | 兼容性维度 code。 |
| `compatibilityDimensions[].label` | `LocalizedText` | 兼容性维度名称。 |
| `compatibilityDimensions[].score` | `number` | mock 兼容性分数。 |

### 联系方式

| Field | Type | Description |
| --- | --- | --- |
| `phone` | `string` | 手机号。 |
| `email` | `string` | 邮箱。 |
| `wechat` | `string` | 微信号。 |

## 可见性分层

profiles 字段按三级可见性组织：

- **公开**：未列入 `memberOnlyFields` 和 `contactFields` 的字段，所有人可见
- **会员**：列入 `memberOnlyFields` 的字段，付费会员自动可见
- **请求**：列入 `contactFields` 的字段（`legalName`、`phone`、`email`、`wechat`），会员需点击请求按钮后可见，不同会员等级有不同请求次数限制

## events

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 活动 ID。 |
| `date` | `string` | 活动日期。 |
| `city` | `LocalizedText` | 活动城市。 |
| `venue` | `LocalizedText` | 活动地点。 |
| `status` | `string` | 活动状态。 |
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
| `joinedAt` | `string` | 加入日期。 |
| `profileId` | `string` | 绑定资料 ID。 |
| `completion` | `number` | 资料完成度。 |
| `membership` | `string` | 会员等级。 |
| `bio` | `LocalizedText` | 账号简介。 |

## user_registrations

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | 报名记录 ID。 |
| `accountId` | `string` | 账号 ID。 |
| `eventId` | `string` | 活动 ID。 |
| `status` | `string` | 报名状态。 |
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

## 字段来源参考

当前 `profiles` schema 已吸收公开成熟产品的常见字段方向：

- Hinge: prompts、identity、vitals、virtues、vices。
- Bumble: basic info、interest badges、profile prompts。
- Match: personality、values、interests、lifestyle、relationships。
- eharmony: compatibility dimensions、communication style、relationship attitude。

参考来源：

- [Hinge - How do I edit my profile?](https://help.hinge.co/hc/en-us/articles/360011053094-Wie-bearbeite-ich-mein-Profil)
- [Bumble - Basic Info and Interest Badges](https://bumble.com/the-buzz/bumble-badges)
- [Bumble Support - Adding your interests](https://support.bumble.com/hc/en-us/articles/28530297182365-Adding-your-interests)
- [Bumble Support - Adding profile prompts](https://support.bumble.com/hc/en-us/articles/31602664871453-Adding-profile-prompts)
- [Match - Profile Tips](https://help.match.com/hc/en-us/articles/36843891242523-Profile-Tips)
- [eharmony - Compatibility Quiz questions](https://www.eharmony.com/tour/what-is-the-compatibility-quiz/)
- [eharmony - Compatibility Score](https://www.eharmony.com/tour/what-is-compatibility-system/)

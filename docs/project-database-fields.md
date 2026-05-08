# 项目数据库字段规范

本文记录 `mock-server/db.json` 的当前字段结构。`db.json` 用扁平字段模拟未来结构化数据库，不保存前端页面分组，也不保存字段权限配置。

约定：

- `LocalizedText` 表示多语言文本：`{ zh: string, fr: string, en: string }`。
- `profiles` 是资料主表，当前保留部分历史字段，后续数据库精简时再统一删除。
- 字段可见性不写入 `profiles`。详情接口返回前，由 `mock-server/src/constants/profile-access.ts` 根据登录态和会员等级替换受限字段值。
- 私人联系方式 `phone`、`email`、`wechat` 仍是原始数据库字段，但 detail API 不直接返回；页面通过 Private Introduction
  流程申请平台撮合。

## 顶层集合

| Collection                      | Type                                 | Description |
|---------------------------------|--------------------------------------|-------------|
| `profiles`                      | `ProfileRecord[]`                    | 相亲资料主表。     |
| `events`                        | `EventRecord[]`                      | 活动资料。       |
| `users`                         | `UserRecord[]`                       | 平台用户主体。     |
| `auth_identities`               | `AuthIdentityRecord[]`               | 认证身份。       |
| `memberships`                   | `MembershipRecord[]`                 | 会员权益与额度。    |
| `profile_ownerships`            | `ProfileOwnershipRecord[]`           | 用户与资料的关系。   |
| `user_registrations`            | `UserRegistrationRecord[]`           | 活动报名关系。     |
| `favorite_profiles`             | `FavoriteProfileRecord[]`            | 收藏关系。       |
| `message_threads`               | `MessageThreadRecord[]`              | 会话摘要。       |
| `private_introduction_requests` | `PrivateIntroductionRequestRecord[]` | 私人介绍申请。     |
| `privacy_settings`              | `PrivacySettingRecord[]`             | 隐私设置。       |

## 通用类型

### LocalizedText

| Field | Type     | Description |
|-------|----------|-------------|
| `zh`  | `string` | 中文内容。       |
| `fr`  | `string` | 法文内容。       |
| `en`  | `string` | 英文内容。       |

### Enum

| Type                        | Values                                                       |
|-----------------------------|--------------------------------------------------------------|
| `GenderCode`                | `'male' \| 'female'`                                         |
| `ProfileStatus`             | `'open' \| 'vip' \| 'review'`                                |
| `DegreeLevel`               | `'bachelor' \| 'master' \| 'phd'`                            |
| `MaritalStatus`             | `'single' \| 'divorced' \| 'widowed'`                        |
| `DatingIntentionCode`       | `'serious' \| 'marriage' \| 'exclusive' \| 'cross_border'`   |
| `HabitCode`                 | `'never' \| 'social' \| 'often'`                             |
| `DirectorySort`             | `'recentActive' \| 'priorityFirst' \| 'ageAsc' \| 'ageDesc'` |
| `RegisterRole`              | `'self' \| 'parent'`                                         |
| `MembershipLevel`           | `'free' \| 'silver' \| 'gold' \| 'diamond'`                  |
| `PrivateIntroductionStatus` | `'requested' \| 'accepted' \| 'declined' \| 'cooldown'`      |

## profiles

`profiles` 使用 `ProfileRecord`。当前字段如下。

### 身份与基础资料

| Field                | Type            | Description                      |
|----------------------|-----------------|----------------------------------|
| `id`                 | `string`        | 资料 ID。                           |
| `legalName`          | `string`        | 真实姓名。                            |
| `nickname`           | `string`        | 昵称。                              |
| `displayName`        | `string`        | 当前 mock 数据中的展示名。后续可改为后端由姓名/昵称生成。 |
| `avatarUrl`          | `string`        | 头像 URL。                          |
| `photos[].id`        | `string`        | 照片 ID。                           |
| `photos[].url`       | `string`        | 照片 URL。                          |
| `photos[].caption`   | `LocalizedText` | 照片说明。                            |
| `photos[].isPrimary` | `boolean`       | 是否主图。                            |
| `gender`             | `GenderCode`    | 性别。                              |
| `pronouns`           | `string`        | 代词。当前详情链路不展示。                    |
| `sexuality`          | `string`        | 性取向。当前详情链路不展示。                   |
| `interestedIn`       | `GenderCode[]`  | 感兴趣对象。当前详情链路不展示。                 |
| `age`                | `number`        | 年龄。                              |
| `height`             | `number`        | 身高，单位 cm。                        |
| `city`               | `LocalizedText` | 当前城市。                            |
| `country`            | `LocalizedText` | 当前国家。                            |
| `nationality`        | `LocalizedText` | 国籍。                              |
| `hometown`           | `LocalizedText` | 家乡。当前详情链路不展示。                    |
| `languages`          | `string[]`      | 语言 code。                         |
| `livingSituation`    | `LocalizedText` | 居住状态。当前详情链路不展示。                  |
| `zodiac`             | `LocalizedText` | 星座。当前详情链路不展示。                    |

### 状态与 family 入口

| Field                | Type            | Description                    |
|----------------------|-----------------|--------------------------------|
| `profileStatus`      | `ProfileStatus` | 资料状态。                          |
| `isVerified`         | `boolean`       | 是否认证。                          |
| `lastActiveAt`       | `string`        | 最近活跃时间。目录排序仍使用，detail API 不返回。 |
| `joinedAt`           | `string`        | 加入时间。当前 detail API 不返回。        |
| `familyVisible`      | `boolean`       | 是否对 family 入口可见。               |
| `allowFamilyContact` | `boolean`       | 是否允许家庭协助沟通。                    |
| `familyPriority`     | `boolean`       | 是否家庭优先展示。                      |

### 学历与职业

| Field         | Type            | Description                       |
|---------------|-----------------|-----------------------------------|
| `degreeLevel` | `DegreeLevel`   | 学历等级 code，用于筛选。                   |
| `education`   | `LocalizedText` | 学历展示文本。                           |
| `occupation`  | `LocalizedText` | 精确职业/职位。当前 profile directory 与 detail API 均不返回；account 摘要仍可用于资料管理展示。 |
| `industry`    | `LocalizedText` | 行业/职业方向。detail 使用该字段替代精确职位。       |
| `employer`    | `LocalizedText` | 雇主或职业身份。当前 detail API 不返回。        |
| `incomeRange` | `LocalizedText` | 收入区间。当前 detail API 不返回。           |

### 婚恋与择偶

| Field                   | Type                  | Description  |
|-------------------------|-----------------------|--------------|
| `maritalStatus`         | `MaritalStatus`       | 婚姻状态。        |
| `hasChildren`           | `boolean`             | 是否已有子女。      |
| `wantsChildren`         | `boolean`             | 家庭计划倾向。      |
| `acceptsLongDistance`   | `boolean`             | 是否接受跨城/异地安排。 |
| `datingIntentionCode`   | `DatingIntentionCode` | 关系目标 code。   |
| `datingIntentionLabel`  | `LocalizedText`       | 关系目标展示文本。    |
| `relationshipPlan`      | `LocalizedText`       | 关系推进规划。      |
| `residencePlan`         | `LocalizedText`       | 定居计划。        |
| `relocationWillingness` | `LocalizedText`       | 城市与迁居意愿。     |
| `values`                | `LocalizedText[]`     | 关系价值观。       |
| `preferredAgeMin`       | `number`              | 期望最小年龄。      |
| `preferredAgeMax`       | `number`              | 期望最大年龄。      |
| `locationScope`         | `LocalizedText`       | 期望城市或距离范围。   |
| `preferredEducation`    | `LocalizedText`       | 期望学历。        |
| `familyPlan`            | `LocalizedText`       | 家庭计划偏好。      |
| `dealBreakers`          | `LocalizedText[]`     | 重要边界。        |

### 生活方式、性格与内容

| Field                             | Type              | Description                            |
|-----------------------------------|-------------------|----------------------------------------|
| `smoking`                         | `HabitCode`       | 吸烟习惯。                                  |
| `drinking`                        | `HabitCode`       | 饮酒习惯。                                  |
| `exercise`                        | `LocalizedText`   | 运动习惯。                                  |
| `activityLevel`                   | `LocalizedText`   | 活动程度。                                  |
| `weekendStyle`                    | `LocalizedText`   | 周末节奏。                                  |
| `pets`                            | `LocalizedText`   | 宠物态度。                                  |
| `religion`                        | `LocalizedText`   | 信仰。当前 detail API 不返回。                  |
| `politicalViews`                  | `LocalizedText`   | 公共议题态度。当前 detail API 不返回。              |
| `personalityTraits`               | `LocalizedText[]` | 性格关键词。                                 |
| `interests`                       | `LocalizedText[]` | 兴趣爱好。self detail 使用，family detail 不返回。 |
| `communicationStyle`              | `LocalizedText`   | 沟通方式。                                  |
| `funFacts`                        | `LocalizedText[]` | 有记忆点的小事。当前 detail API 不返回。             |
| `summary`                         | `LocalizedText`   | 简介。                                    |
| `highlights`                      | `LocalizedText[]` | 资料亮点。当前 detail API 不返回。                |
| `tags`                            | `LocalizedText[]` | 标签。                                    |
| `conversationStarters`            | `LocalizedText[]` | 对话建议。当前 detail API 不返回。                |
| `dateIdeas`                       | `LocalizedText[]` | 初次见面建议。当前 detail API 不返回。              |
| `prompts[].id`                    | `string`          | prompt ID。                             |
| `prompts[].promptCode`            | `string`          | prompt code。                           |
| `prompts[].prompt`                | `LocalizedText`   | prompt 问题。                             |
| `prompts[].answer`                | `LocalizedText`   | 用户回答。                                  |
| `compatibilityDimensions[].code`  | `string`          | 兼容维度 code。当前 detail API 不返回。           |
| `compatibilityDimensions[].label` | `LocalizedText`   | 兼容维度名称。当前 detail API 不返回。              |
| `compatibilityDimensions[].score` | `number`          | mock 兼容分数。当前 detail API 不返回。           |
| `phone`                           | `string`          | 私人手机号。detail API 不返回。                  |
| `email`                           | `string`          | 私人邮箱。detail API 不返回。                   |
| `wechat`                          | `string`          | 私人微信。detail API 不返回。                   |

## Detail API 字段说明

Detail API 返回扁平结构，并在返回前应用字段权限。

### SelfProfileDetailDTO

| Field                   | Type                                      |
|-------------------------|-------------------------------------------|
| `id`                    | `string`                                  |
| `displayName`           | `string`                                  |
| `avatarUrl`             | `string`                                  |
| `photos`                | `LocalizedProfilePhotoDTO[]`              |
| `gender`                | `GenderCode`                              |
| `age`                   | `Restricted<number>`                      |
| `height`                | `number`                                  |
| `city`                  | `string`                                  |
| `country`               | `Restricted<string>`                      |
| `languages`             | `Restricted<string[]>`                    |
| `profileStatus`         | `ProfileStatus`                           |
| `isVerified`            | `boolean`                                 |
| `education`             | `string`                                  |
| `industry`              | `Restricted<string>`                      |
| `maritalStatus`         | `Restricted<MaritalStatus>`               |
| `hasChildren`           | `Restricted<boolean>`                     |
| `wantsChildren`         | `Restricted<boolean>`                     |
| `acceptsLongDistance`   | `Restricted<boolean>`                     |
| `datingIntentionCode`   | `DatingIntentionCode`                     |
| `datingIntentionLabel`  | `string`                                  |
| `relationshipPlan`      | `Restricted<string>`                      |
| `residencePlan`         | `Restricted<string>`                      |
| `relocationWillingness` | `Restricted<string>`                      |
| `values`                | `Restricted<string[]>`                    |
| `preferredAgeMin`       | `Restricted<number>`                      |
| `preferredAgeMax`       | `Restricted<number>`                      |
| `locationScope`         | `Restricted<string>`                      |
| `preferredEducation`    | `Restricted<string>`                      |
| `familyPlan`            | `Restricted<string>`                      |
| `dealBreakers`          | `Restricted<string[]>`                    |
| `smoking`               | `Restricted<HabitCode>`                   |
| `drinking`              | `Restricted<HabitCode>`                   |
| `exercise`              | `Restricted<string>`                      |
| `activityLevel`         | `Restricted<string>`                      |
| `weekendStyle`          | `Restricted<string>`                      |
| `pets`                  | `Restricted<string>`                      |
| `personalityTraits`     | `Restricted<string[]>`                    |
| `interests`             | `Restricted<string[]>`                    |
| `communicationStyle`    | `Restricted<string>`                      |
| `summary`               | `string`                                  |
| `tags`                  | `string[]`                                |
| `prompts`               | `Restricted<LocalizedProfilePromptDTO[]>` |
| `privateIntroduction`   | `PrivateIntroductionDTO`                  |

### FamilyProfileDetailDTO

| Field                   | Type                         |
|-------------------------|------------------------------|
| `id`                    | `string`                     |
| `displayName`           | `string`                     |
| `avatarUrl`             | `string`                     |
| `photos`                | `LocalizedProfilePhotoDTO[]` |
| `gender`                | `GenderCode`                 |
| `age`                   | `number`                     |
| `height`                | `number`                     |
| `city`                  | `string`                     |
| `country`               | `Restricted<string>`         |
| `nationality`           | `Restricted<string>`         |
| `languages`             | `Restricted<string[]>`       |
| `profileStatus`         | `ProfileStatus`              |
| `isVerified`            | `boolean`                    |
| `familyVisible`         | `boolean`                    |
| `allowFamilyContact`    | `boolean`                    |
| `familyPriority`        | `boolean`                    |
| `education`             | `string`                     |
| `industry`              | `string`                     |
| `maritalStatus`         | `Restricted<MaritalStatus>`  |
| `hasChildren`           | `Restricted<boolean>`        |
| `wantsChildren`         | `Restricted<boolean>`        |
| `acceptsLongDistance`   | `Restricted<boolean>`        |
| `datingIntentionCode`   | `DatingIntentionCode`        |
| `datingIntentionLabel`  | `string`                     |
| `relationshipPlan`      | `Restricted<string>`         |
| `residencePlan`         | `Restricted<string>`         |
| `relocationWillingness` | `Restricted<string>`         |
| `values`                | `Restricted<string[]>`       |
| `preferredAgeMin`       | `Restricted<number>`         |
| `preferredAgeMax`       | `Restricted<number>`         |
| `locationScope`         | `Restricted<string>`         |
| `preferredEducation`    | `Restricted<string>`         |
| `familyPlan`            | `Restricted<string>`         |
| `dealBreakers`          | `Restricted<string[]>`       |
| `smoking`               | `Restricted<HabitCode>`      |
| `drinking`              | `Restricted<HabitCode>`      |
| `exercise`              | `Restricted<string>`         |
| `activityLevel`         | `Restricted<string>`         |
| `weekendStyle`          | `Restricted<string>`         |
| `pets`                  | `Restricted<string>`         |
| `personalityTraits`     | `Restricted<string[]>`       |
| `communicationStyle`    | `Restricted<string>`         |
| `summary`               | `string`                     |
| `tags`                  | `string[]`                   |
| `privateIntroduction`   | `PrivateIntroductionDTO`     |

## 可见性规则

受限字段值使用：

| Value                | Meaning |
|----------------------|---------|
| `__LOGIN_REQUIRED__` | 登录后可见。  |
| `__MEMBER_ONLY__`    | 会员可见。   |

### self detail

| Rule                                 | Fields                                                                                                                                                                                                                                    |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SELF_PROFILE_LOGIN_REQUIRED_FIELDS` | `country`, `languages`, `maritalStatus`, `acceptsLongDistance`, `relationshipPlan`, `values`, `smoking`, `drinking`, `exercise`, `activityLevel`, `weekendStyle`, `pets`, `interests`                                                     |
| `SELF_PROFILE_MEMBER_ONLY_FIELDS`    | `hasChildren`, `wantsChildren`, `residencePlan`, `relocationWillingness`, `preferredAgeMin`, `preferredAgeMax`, `locationScope`, `preferredEducation`, `familyPlan`, `dealBreakers`, `personalityTraits`, `communicationStyle`, `prompts` |
| `SELF_PROFILE_GUEST_REQUIRED_FIELDS` | login-required 与 member-only 字段合集，访客统一返回 `__LOGIN_REQUIRED__`。                                                                                                                                                                            |

### family detail

| Rule                                   | Fields                                                                                                                                                                                                                                   |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `FAMILY_PROFILE_LOGIN_REQUIRED_FIELDS` | `country`, `nationality`, `languages`, `maritalStatus`, `relationshipPlan`, `acceptsLongDistance`, `smoking`, `drinking`, `exercise`, `activityLevel`, `weekendStyle`, `pets`                                                            |
| `FAMILY_PROFILE_MEMBER_ONLY_FIELDS`    | `hasChildren`, `wantsChildren`, `residencePlan`, `relocationWillingness`, `values`, `preferredAgeMin`, `preferredAgeMax`, `locationScope`, `preferredEducation`, `familyPlan`, `dealBreakers`, `personalityTraits`, `communicationStyle` |
| `FAMILY_PROFILE_GUEST_REQUIRED_FIELDS` | login-required 与 member-only 字段合集，访客统一返回 `__LOGIN_REQUIRED__`。                                                                                                                                                                           |

说明：

- 同名字段在 self/family 中尽量保持同一访问层级；差异主要体现在页面信息架构，而不是字段权限互相冲突。
- `free` 会员等级表示已登录但非付费会员：可看登录后字段，会员字段返回 `__MEMBER_ONLY__`。
- `silver`、`gold`、`diamond` 都视为 member，可看 member-only 字段。
- debug 预览接口 `GET /api/debug/profile-access-preview/:profileType/:id?mode=backend|guest|free|member`
  由后端按同一套常量生成结果，前端不复制权限常量。

## events

| Field            | Type            | Description |
|------------------|-----------------|-------------|
| `id`             | `string`        | 活动 ID。      |
| `date`           | `string`        | 活动日期。       |
| `city`           | `LocalizedText` | 活动城市。       |
| `venue`          | `LocalizedText` | 活动地点。       |
| `status`         | `string`        | 活动状态。       |
| `title`          | `LocalizedText` | 活动标题。       |
| `format`         | `LocalizedText` | 活动形式。       |
| `audience`       | `LocalizedText` | 适合人群。       |
| `summary`        | `LocalizedText` | 活动简介。       |
| `seats`          | `number`        | 总席位。        |
| `registered`     | `number`        | 已报名人数。      |
| `agenda[].time`  | `string`        | 议程时间段。      |
| `agenda[].title` | `LocalizedText` | 议程标题。       |
| `agenda[].desc`  | `LocalizedText` | 议程说明。       |

## users

| Field              | Type            | Description |
|--------------------|-----------------|-------------|
| `id`               | `string`        | 用户 ID。      |
| `role`             | `RegisterRole`  | 注册角色。       |
| `displayName`      | `string`        | 展示名。        |
| `avatarUrl`        | `string`        | 头像 URL。     |
| `city`             | `LocalizedText` | 当前城市。       |
| `createdAt`        | `string`        | 创建时间。       |
| `bio`              | `LocalizedText` | 账号简介。       |
| `profileCompletion`| `number`        | 资料完成度。      |
| `language`         | `string`        | 语言偏好。       |

## auth_identities

| Field      | Type       | Description |
|------------|------------|-------------|
| `id`       | `string`   | 认证身份 ID。    |
| `userId`   | `string`   | 用户 ID。      |
| `authType` | `AuthType` | 认证方式。       |
| `identity` | `string`   | 登录标识。       |
| `email`    | `string`   | 邮箱。         |
| `password` | `string`   | mock 密码。     |
| `createdAt`| `string`   | 创建时间。       |

## memberships

| Field       | Type              | Description |
|-------------|-------------------|-------------|
| `id`        | `string`          | 会员记录 ID。    |
| `userId`    | `string`          | 用户 ID。      |
| `tier`      | `MembershipLevel` | 会员等级。       |
| `startedAt` | `string`          | 开始时间。       |
| `expiresAt` | `string?`         | 过期时间。       |

## profile_ownerships

| Field       | Type           | Description |
|-------------|----------------|-------------|
| `id`        | `string`       | 所有权记录 ID。   |
| `profileId` | `string`       | 资料 ID。      |
| `userId`    | `string`       | 用户 ID。      |
| `role`      | `RegisterRole` | 管理角色。       |
| `isPrimary` | `boolean`      | 是否主所有权。     |

## user_registrations

| Field       | Type            | Description |
|-------------|-----------------|-------------|
| `id`        | `string`        | 报名记录 ID。    |
| `userId`    | `string`        | 用户 ID。      |
| `eventId`   | `string`        | 活动 ID。      |
| `status`    | `string`        | 报名状态。       |
| `note`      | `LocalizedText` | 报名备注。       |

## favorite_profiles

| Field       | Type            | Description |
|-------------|-----------------|-------------|
| `id`        | `string`        | 收藏记录 ID。    |
| `userId`    | `string`        | 用户 ID。      |
| `profileId` | `string`        | 资料 ID。      |
| `savedAt`   | `string`        | 收藏时间。       |
| `note`      | `LocalizedText` | 收藏备注。       |

## message_threads

| Field         | Type            | Description |
|---------------|-----------------|-------------|
| `id`          | `string`        | 会话摘要 ID。    |
| `userId`      | `string`        | 用户 ID。      |
| `profileId`   | `string`        | 资料 ID。      |
| `updatedAt`   | `string`        | 最近更新时间。     |
| `unread`      | `number`        | 未读数。        |
| `lastMessage` | `LocalizedText` | 最近消息摘要。     |

## private_introduction_requests

| Field             | Type                        | Description |
|-------------------|-----------------------------|-------------|
| `id`              | `string`                    | 私人介绍申请 ID。  |
| `requesterUserId` | `string`                    | 发起用户 ID。    |
| `profileId`       | `string`                    | 被申请资料 ID。   |
| `status`          | `PrivateIntroductionStatus` | 申请状态。       |
| `requestedAt`     | `string`                    | 发起时间。       |
| `respondedAt`     | `string?`                   | 对方响应时间。     |
| `cooldownUntil`   | `string?`                   | 冷静期结束时间。    |

## privacy_settings

| Field       | Type            | Description |
|-------------|-----------------|-------------|
| `id`        | `string`        | 隐私设置 ID。    |
| `userId`    | `string`        | 用户 ID。      |
| `enabled`   | `boolean`       | 是否开启。       |
| `title`     | `LocalizedText` | 设置标题。       |
| `desc`      | `LocalizedText` | 设置说明。       |

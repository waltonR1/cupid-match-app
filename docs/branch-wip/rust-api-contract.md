# Rust API Contract 草案

本文档定义重构后前端预期的 Rust API contract。当前仍可由 mock async 实现，但字段、接口形状和分页筛选规则按真实后端思路设计。

原则：

- 先定 contract，再写前端 hooks。
- mock 必须严格遵守 contract。
- 前端页面不直接依赖 mock 数据结构。

## 通用规范

## 基础约定

- 返回 JSON
- 时间统一 ISO 8601 或 `YYYY-MM-DD`
- 列表接口统一支持分页
- 枚举值稳定，由后端返回 code，前端用 i18n 翻译 label

## 通用响应

建议统一外层格式：

```ts
interface ApiSuccess<T> {
  data: T
  meta?: {
    requestId?: string
    page?: number
    pageSize?: number
    total?: number
    totalPages?: number
  }
}
```

错误格式：

```ts
interface ApiError {
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}
```

## 领域一：Auth

## `POST /auth/login`

请求：

```ts
interface LoginRequest {
  identity: string
  password: string
}
```

响应：

```ts
interface AuthSessionDTO {
  token: string
  refreshToken?: string
  expiresAt: string
  user: {
    id: string
    displayName: string
    avatarUrl: string | null
    role: 'self' | 'parent' | 'admin'
  }
}
```

## `POST /auth/register`

请求：

```ts
interface RegisterRequest {
  role: 'self' | 'parent'
  email: string
  password: string
  nickName: string
  city: string
}
```

响应建议二选一：

- 返回 session，注册后直接登录
- 返回注册结果，前端跳登录

当前建议：

```ts
interface RegisterResponse {
  userId: string
  nextAction: 'login'
}
```

## `GET /auth/session`

用途：

- 页面初始化恢复当前会话
- 刷新头部登录状态

响应：

```ts
type SessionResponse = AuthSessionDTO | null
```

## 领域二：Profiles

## 基础 DTO

```ts
type GenderCode = 'male' | 'female'
type ProfileStatusCode = 'open' | 'review' | 'vip'
type MaritalStatusCode = 'single' | 'divorced' | 'widowed'
type DegreeLevelCode = 'bachelor' | 'master' | 'phd'
type IntentCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
type HabitCode = 'never' | 'social' | 'often'

interface LocalizedTextDTO {
  zh: string
  fr: string
  en: string
}

interface ProfileDTO {
  id: string
  displayName: string
  avatarUrl: string | null
  gender: GenderCode
  age: number
  height: number
  city: LocalizedTextDTO
  country: LocalizedTextDTO
  nationality: LocalizedTextDTO
  status: ProfileStatusCode
  isVerified: boolean
  lastActiveAt: string
  joinedAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  degreeLevel: DegreeLevelCode
  education: LocalizedTextDTO
  occupation: LocalizedTextDTO
  industry: LocalizedTextDTO
  employer: LocalizedTextDTO
  incomeRange: LocalizedTextDTO
  maritalStatus: MaritalStatusCode
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean
  intentCode: IntentCode
  intent: LocalizedTextDTO
  maritalPlan: LocalizedTextDTO
  languages: string[]
  smoke: HabitCode
  drink: HabitCode
  exercise: LocalizedTextDTO
  residencePlan: LocalizedTextDTO
  summary: LocalizedTextDTO
  highlights: LocalizedTextDTO[]
  tags: LocalizedTextDTO[]
}
```

## 自主资料目录

### `GET /profiles/self-directory`

查询参数：

```ts
interface SelfDirectoryQuery {
  page: number
  pageSize: number
  sort: 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'
  gender?: 'male' | 'female'
  ageRange?: 'under25' | '25to29' | '30to34' | '35to39' | '40plus'
  city?: string
  heightRange?: 'under165' | '165to169' | '170to174' | '175to179' | '180plus'
  education?: 'bachelor' | 'master' | 'phd'
  intentCode?: IntentCode
  industry?: string
  occupation?: string
  language?: string
  verified?: 'verified' | 'unverified'
  maritalStatus?: MaritalStatusCode
  hasChildren?: 'yes' | 'no'
  acceptLongDistance?: 'yes' | 'no'
}
```

响应：

```ts
interface DirectoryOptionDTO {
  label: string
  value: string
}

interface DirectoryFilterDTO {
  key: string
  label: string
  options: DirectoryOptionDTO[]
  value: string
  group: 'primary' | 'secondary'
}

interface SelfDirectoryResponse {
  items: ProfileDTO[]
  filters: DirectoryFilterDTO[]
  sortOptions: DirectoryOptionDTO[]
  selectedSort: string
}
```

说明：

- 可以由后端直接返回 `filters`，减少前端二次聚合。
- 如果后端暂时不想返回 `filters`，则需要单独的 facets 接口。

### 可选拆分方案

如果希望资源更纯，可拆为：

- `GET /profiles/self-directory/items`
- `GET /profiles/self-directory/facets`

但前端复杂度会提高。当前建议先用一个聚合接口。

## 家长资料目录

### `GET /profiles/family-directory`

查询参数：

```ts
interface FamilyDirectoryQuery {
  page: number
  pageSize: number
  sort: 'priorityFirst' | 'recentActive' | 'ageAsc' | 'ageDesc'
  gender?: 'male' | 'female'
  ageRange?: 'under25' | '25to29' | '30to34' | '35to39' | '40plus'
  city?: string
  education?: 'bachelor' | 'master' | 'phd'
  intentCode?: IntentCode
  familyMode?: 'context_only' | 'contact_ready' | 'priority'
  occupation?: string
  industry?: string
  maritalStatus?: MaritalStatusCode
  hasChildren?: 'yes' | 'no'
  acceptLongDistance?: 'yes' | 'no'
}
```

响应：

```ts
interface FamilyDirectoryResponse {
  items: ProfileDTO[]
  filters: DirectoryFilterDTO[]
  sortOptions: DirectoryOptionDTO[]
  selectedSort: string
}
```

## 资料详情

### `GET /profiles/{id}`

查询参数：

- `view=self | family`

响应：

```ts
type ProfileDetailResponse = ProfileDTO
```

备注：

- 同一份原始资源允许不同 view 版本，但不建议后端直接返回 UI VM。
- `view=family` 主要影响可见字段和权限，不改变基础资源 schema。

## 首页精选资料

### `GET /profiles/home-featured`

查询参数：

- `limit`

响应：

```ts
interface HomeFeaturedProfilesResponse {
  items: ProfileDTO[]
}
```

## 领域三：Events

## 基础 DTO

```ts
type EventStatusCode = 'open' | 'waitlist' | 'closed'

interface EventAgendaItemDTO {
  time: string
  title: LocalizedTextDTO
  desc: LocalizedTextDTO
}

interface EventDTO {
  id: string
  date: string
  city: LocalizedTextDTO
  venue: LocalizedTextDTO
  status: EventStatusCode
  title: LocalizedTextDTO
  format: LocalizedTextDTO
  audience: LocalizedTextDTO
  summary: LocalizedTextDTO
  seats: number
  registered: number
  agenda: EventAgendaItemDTO[]
}
```

## 活动列表

### `GET /events`

查询参数：

```ts
interface ListEventsQuery {
  page?: number
  pageSize?: number
  status?: EventStatusCode
  city?: string
  fromDate?: string
  toDate?: string
}
```

响应：

```ts
interface ListEventsResponse {
  items: EventDTO[]
}
```

说明：

- 默认按日期升序返回
- 首页精选可由单独接口处理

## 首页精选活动

### `GET /events/home-featured`

查询参数：

- `limit`

响应：

```ts
interface HomeFeaturedEventsResponse {
  items: EventDTO[]
}
```

## 活动详情

### `GET /events/{id}`

响应：

```ts
interface EventDetailResponse {
  event: EventDTO
  relatedProfiles: Array<Pick<
    ProfileDTO,
    'id' | 'displayName' | 'summary' | 'age' | 'city' | 'intent' | 'status' | 'isVerified'
  >>
}
```

说明：

- 相关资料推荐可以由后端直接返回，前端不再基于当前活动自己做 same-city / vip / verified 优先排序。

## 领域四：Account

## 基础 DTO

```ts
type MembershipCode = 'free' | 'silver' | 'gold' | 'diamond'
type RegistrationStatusCode = 'confirmed' | 'waitlist' | 'completed'

interface AccountDTO {
  id: string
  displayName: string
  avatarUrl: string | null
  city: LocalizedTextDTO
  joinedAt: string
  profileId: string
  completion: number
  membership: MembershipCode
  bio: LocalizedTextDTO
}

interface AccountRegistrationDTO {
  id: string
  eventId: string
  status: RegistrationStatusCode
  note: LocalizedTextDTO
}

interface AccountUserEventDTO {
  registration: AccountRegistrationDTO
  event: EventDTO
}

interface AccountFavoriteDTO {
  favorite: {
    profileId: string
    savedAt: string
    note: LocalizedTextDTO
  }
  profile: ProfileDTO
}

interface AccountThreadDTO {
  thread: {
    id: string
    profileId: string
    updatedAt: string
    unread: number
    lastMessage: LocalizedTextDTO
  }
  profile: ProfileDTO
}

interface PrivacySettingDTO {
  id: string
  enabled: boolean
  title: LocalizedTextDTO
  desc: LocalizedTextDTO
}
```

## 账号总览

### `GET /account/overview`

响应：

```ts
interface AccountOverviewResponse {
  account: AccountDTO
  profile: ProfileDTO | null
  userEvents: AccountUserEventDTO[]
  favorites: AccountFavoriteDTO[]
  threads: AccountThreadDTO[]
  privacySettings: PrivacySettingDTO[]
}
```

说明：

- 当前账号中心所有页面都可先共享这一接口。
- 后期如果性能需要，再拆分子接口。

## 可选的未来拆分接口

后期可以拆成：

- `GET /account/profile`
- `GET /account/activity`
- `GET /account/connections`
- `GET /account/messages`
- `GET /account/privacy`

但第一阶段不建议过度拆分。

## mock async 实现约束

mock provider 必须遵守以下约束：

- 所有接口返回 Promise
- 模拟网络延迟
- 保持与 contract 一致的字段结构
- 支持分页和筛选参数
- 支持错误注入

建议基础工具：

```ts
delay(minMs, maxMs)
paginate(items, page, pageSize)
failWhen(condition, code, message)
```

## 前端对 contract 的使用方式

前端不直接在页面中使用上述 DTO。

正确链路：

```txt
Rust DTO / Mock DTO
  -> service client
  -> hook
  -> mapper
  -> page VM
  -> component props
```

如果某个页面需要新增字段，应先改本文档，再改 mock 和前端实现。

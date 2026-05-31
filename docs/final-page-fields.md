# Final Page Fields

本文定义最终目标下前端页面和组件消费的 ViewModel 字段。它描述页面需要什么，不描述数据库怎么存，也不描述 API 原始 DTO 怎么返回。

配套文档：

- `docs/final-database-schema.md`：最终数据库字段。
- `docs/final-api-contract.md`：最终 API endpoint 和 DTO。
- `docs/final-data-flow-contract.md`：数据库、API、mapper、页面之间的数据流动。
- `docs/deployment-guide.md`：部署前检查和运行边界。

## Global Rules

- 页面只消费 hook / mapper 输出的 ViewModel。
- 页面不直接消费数据库 Record。
- 页面不直接调用 `@/api/shared/http.ts`。
- API DTO 的业务字段尽量扁平；页面 section、card、toolbar、empty state 由前端 mapper 组装。
- 页面展示文案来自前端 i18n 或后端已本地化内容，不消费后端 i18n key。
- account 页面字段不能反向决定 profile schema。
- 联系方式值不进入 profile detail 页面字段；页面只消费 `privateIntroductionData` 状态。
- locked / hidden / member-only 展示由后端 DTO 的 access 结果和受限字段特殊值驱动，页面不散落会员判断。

## Common Page Types

```ts
type ProfileFieldCode =
  | 'photos'
  | 'country'
  | 'nationality'
  | 'languages'
  | 'industry'
  | 'careerDirection'
  | 'maritalStatus'
  | 'hasChildren'
  | 'childrenPlan'
  | 'acceptsLongDistance'
  | 'relationshipGoal'
  | 'residencePlan'
  | 'relocation'
  | 'relationshipValues'
  | 'preferredAgeMin'
  | 'preferredAgeMax'
  | 'preferredLocation'
  | 'preferredEducation'
  | 'familyLife'
  | 'dealBreakers'
  | 'smoking'
  | 'drinking'
  | 'exercise'
  | 'activityLevel'
  | 'weekendStyle'
  | 'pets'
  | 'personalityTraits'
  | 'interests'
  | 'communicationStyle'
  | 'contact'
type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
type ProfileReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
type AccountNavKey = 'home' | 'relationship' | 'profiles' | 'events' | 'membership' | 'settings'
type AccountPreferenceCode =
  | 'preferred_city'
  | 'preferred_contact_channel'
  | 'staff_contact_enabled'
  | 'family_assist_enabled'
  | 'introduction_updates_enabled'
  | 'event_reminders_enabled'
  | 'service_announcements_enabled'
  | 'marketing_emails_enabled'
  | 'analytics_consent_enabled'

interface PageAsyncState {
  loading: boolean
  error: unknown | null
}

interface PageEmptyState {
  title: string
  description: string
  actionLabel?: string
}

interface DisplayFieldViewModel {
  key: string
  label: string
  value: string
  locked?: boolean
  hidden?: boolean
}

interface PageActionViewModel {
  key: string
  label: string
  disabled: boolean
  loading?: boolean
  reason?: string
}

interface PaginationViewModel {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface SelectOptionViewModel {
  value: string
  label: string
  count?: number
}

interface ToolbarItemViewModel {
  key: string
  label: string
  value: string
  options: SelectOptionViewModel[]
}

interface FilterChipViewModel {
  key: string
  label: string
  value: string
}
```

## Auth Pages

### Login Page

```ts
interface LoginPageFields {
  identifier: string
  password: string
  agreed: boolean
  errorMessage: string
  submitAction: PageActionViewModel
}
```

### Register Page

```ts
interface RegisterPageFields {
  path: 'self' | 'family'
  provider: 'email' | 'phone'
  identifier: string
  password: string
  confirmPassword: string
  accountName: string
  agreed: boolean
  errorMessage: string
  submitAction: PageActionViewModel
}
```

注册页不采集 profile 字段，例如 `city`、身高、学历、职业、婚恋偏好等。城市进入 profile 创建或账户偏好，不进入账户注册字段。

注册页也不展示 `preferredLocale` 手动选择器。注册 payload 中的 `preferredLocale` 由当前前端 `locale` 自动填充；账户设置页可以维护登录后的默认语言偏好。顶部语言切换只影响当前浏览会话，保存后的 `preferredLocale` 用于下次登录或跨设备登录时的默认语言。

account profile detail 的编辑语言通过接口 `?lang=` 独立读取和保存。该编辑页展示当前语言槽位的真实值，不使用 fallback；同时消费 `localizedMeta` 了解当前编辑语言槽位的 source / provider / status / updatedAt / hasValue。public profile、directory、event 和 account summary 页面继续使用后端 fallback 后的展示 string。

`agreed` 勾选后才允许提交。成功注册 / 成功登录即表示用户接受当前 active 服务条款与隐私说明；后端自动写入 `user_agreement_acceptances`（版本不变则跳过）。

### Agreement Dialog

```ts
interface AgreementDocumentViewModel {
  type: 'terms' | 'privacy'
  version: string
  title: string
  sections: AgreementDocumentSectionViewModel[]
  effectiveDateText: string
}

interface AgreementDocumentSectionViewModel {
  heading: string
  clauses: AgreementDocumentClauseViewModel[]
}

interface AgreementDocumentClauseViewModel {
  number: string
  body: string
}

interface AgreementDialogViewModel {
  open: boolean
  document: AgreementDocumentViewModel | null
  closeAction: PageActionViewModel
}
```

规则：

- `AgreementDialog` 打开时调 `GET /api/legal/documents/:type?lang=` 按需拉取正文，不做预加载。
- `AgreementDocumentViewModel.sections` 来自 legal API，前端按 heading 与 clauses 渲染，不解析 Markdown。
- i18n 只提供按钮和标题辅助文案，不存正式协议正文。

## Profile Directory Pages

Self directory 和 family directory 可以使用同一套目录 ViewModel，通过页面参数或 hook 配置区分展示语气。

```ts
interface ProfileDirectoryPageData {
  items: ProfileCardListItem[]
  filters: ProfileFilterToolbarItem[]
  activeFilters: ProfileFilterChipViewModel[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface ProfileCardListItem {
  id: string
  card: ProfileCardViewModel
}

interface ProfileCardViewModel {
  avatarUrl: string
  displayName: string
  gender?: 'male' | 'female'
  meta: string
  badge: string
  summary: string
  facts: ProfileCardFactViewModel[]
  tags: string[]
  footer: string
}

type ProfileFilterToolbarItem = ToolbarItemViewModel
type ProfileFilterChipViewModel = FilterChipViewModel

interface ProfileCardFactViewModel {
  label: string
  value: string
}
```

说明：

- `displayName`、`avatarUrl`、`age` 是后端 DTO 派生字段，再由前端 mapper 格式化。
- 筛选项 label 由前端 i18n 生成；筛选值 code 来自 API facets 或前端常量。
- 不展示也不依赖 `occupation`、`phone`、`email`、`wechat`、`legalName`。

## Profile Detail Pages

Self detail 和 family detail 共享基础 detail ViewModel。页面可以根据 view context 选择展示不同 section，但字段来源一致。

```ts
type ProfileDetailAccessLevel = 'visitor' | 'registered' | 'premium' | 'owner' | 'staff'
type ProfileDetailAccessState = 'visible' | 'masked' | 'hidden'
type ProfileDetailLockReason = 'login' | 'member' | 'introduction' | 'staff'

interface ProfileDetailFactItem {
  label: string
  value: string
  access?: ProfileDetailAccessState
  lockReason?: ProfileDetailLockReason
  maskText?: string
}

interface ProfileDetailBadgeItem {
  label: string
  tone?: 'highlight' | 'muted'
}

interface ProfileDetailGalleryHeroData {
  avatarUrl: string
  photos: string[]
  displayName: string
  gender?: 'male' | 'female'
  meta: string
  location: string
  summary: string
  badges: ProfileDetailBadgeItem[]
  tags: string[]
  quickFacts: ProfileDetailFactItem[]
  hasMemberAccess: boolean
  accessLabel: string
  galleryLockedText: string
}

interface PrivateIntroductionSectionData {
  status: 'available' | 'login_required' | 'membership_required' | 'quota_exhausted' | 'requested' | 'accepted' | 'declined' | 'expired' | 'cooldown'
  quotaTotal: number
  quotaRemaining: number
  canRequest: boolean
  alreadyRequested: boolean
  expiresAtText?: string
  showInboxThread: boolean
}

interface SelfProfileDetailPageData {
  accessLevel: ProfileDetailAccessLevel
  heroData: ProfileDetailGalleryHeroData | null
  snapshotFacts: ProfileDetailFactItem[]
  relationshipFacts: ProfileDetailFactItem[]
  personalityFacts: ProfileDetailFactItem[]
  preferenceFacts: ProfileDetailFactItem[]
  valueFacts: ProfileDetailFactItem[]
  lifestyleFacts: ProfileDetailFactItem[]
  privateIntroductionData: PrivateIntroductionSectionData | null
}

interface FamilyIntroductionSectionData {
  mode: 'priority' | 'contact_ready' | 'context_only'
  title: string
  subtitle: string
  facts: ProfileDetailFactItem[]
}

interface FamilyProfileDetailPageData {
  accessLevel: ProfileDetailAccessLevel
  heroData: ProfileDetailGalleryHeroData | null
  snapshotFacts: ProfileDetailFactItem[]
  familyReviewFacts: ProfileDetailFactItem[]
  relationshipFacts: ProfileDetailFactItem[]
  lifestyleFacts: ProfileDetailFactItem[]
  preferenceFacts: ProfileDetailFactItem[]
  valueFacts: ProfileDetailFactItem[]
  familyIntroductionData: FamilyIntroductionSectionData | null
  privateIntroductionData: PrivateIntroductionSectionData | null
}
```

说明：

- 页面 section 是前端 ViewModel，不是后端 DTO 结构。
- `relationshipFacts`、`preferenceFacts` 等数组只保存页面展示行，不能反向决定数据库字段。
- `privateIntroductionData` 不包含 phone / email / wechat 值。
- guest/registered/premium 的差异来自后端 access 结果和受限字段特殊值。

## Events Pages

### Event Directory

```ts
interface EventDirectoryPageData {
  items: EventCardViewModel[]
  filters: EventFilterViewModel[]
  activeFilterChips: EventFilterChipViewModel[]
  pagination: PaginationViewModel
  emptyState?: PageEmptyState
}

interface EventCardViewModel {
  id: string
  title: string
  summary: string
  coverImageUrl: string
  city: string
  venue: string
  dateText: string
  timeText: string
  format: string
  audience: string
  relationshipFocus: string[]
  remainingSeatsText: string
  waitlistText?: string
  memberOnly: boolean
  status: 'open' | 'waitlist' | 'closed' | 'completed' | 'member'
  statusBadge: string
}

type EventFilterViewModel = ToolbarItemViewModel
type EventFilterChipViewModel = FilterChipViewModel
```

### Event Detail

```ts
interface EventDetailPageData {
  hero: EventDetailHeroViewModel
  facts: DisplayFieldViewModel[]
  agendaItems: EventAgendaItemViewModel[]
  registration: EventRegistrationViewModel
}

interface EventDetailHeroViewModel {
  id: string
  title: string
  summary: string
  coverImageUrl: string
  city: string
  venue: string
  addressText?: string
  addressLocked: boolean
  addressLockHint?: string
  dateText: string
  timeText: string
  memberOnly: boolean
}

// addressText 只来自 detail API 返回的 address；未满足活动地址规则时展示 addressLockHint。

interface EventAgendaItemViewModel {
  id: string
  time: string
  title: string
  description: string
}

interface EventRegistrationViewModel {
  status: 'guest' | 'available' | 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'closed' | 'member_required'
  title: string
  description: string
  action?: PageActionViewModel
}
```

## Account Pages

Account 的最终页面字段提前定义，用于后续重写时避免继续借用旧 profile 字段。

### Account Shell

```ts
interface AccountShellPageData {
  user: AccountUserSummaryViewModel
  membershipTier: 'free' | 'silver' | 'gold' | 'diamond'
  navItems: AccountNavItemViewModel[]
  notices: AccountNoticeViewModel[]
}

interface AccountNavItemViewModel {
  key: AccountNavKey
  label: string
  active: boolean
  disabled?: boolean
}

interface AccountNoticeViewModel {
  key: string
  title: string
  description: string
  action?: PageActionViewModel
}

interface AccountUserSummaryViewModel {
  userId: string
  accountName: string
  avatarUrl: string
  preferredLocale: 'zh' | 'fr' | 'en'
  status: 'active' | 'deactivated' | 'suspended'
}
```

Account shell reads the authenticated user and lightweight membership tier from the auth store. It must not call a separate account overview API only to render the sidebar.

### Account Home

`/pages/account/index` 作为账户入口时，按用户阶段展示下一步引导与最近动态，不再只是平铺后端集合摘要。

```ts
interface AccountHomePageData {
  accountItems: Array<{ key: string; label: string; value: string }>
  summaryItems: Array<{ key: string; label: string; value: string | number }>
  quotaSummary: { label: string; value: string; description: string } | null
  attentionItems: Array<{ key: string; label: string; value: string; description: string }>
  upcomingItems: Array<{ key: string; title: string; meta: string; status: string }>
  profileItems: Array<{ key: string; title: string; meta: string; status: string }>
  primaryAction?: PageActionViewModel
}

interface AccountOnboardingViewModel {
  path: 'self' | 'family'
  step: 'create_profile' | 'review_profile' | 'browse'
  profileId?: string
  title: string
  description: string
}
```

### Profiles

```ts
interface ManagedProfileSummaryViewModel {
  profileId: string
  profileType: 'self' | 'family'
  profileName: string
  profileTitle: string
  avatarUrl: string
  age: string
  city: string
  archived: boolean
  archivedAtText?: string
  relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
  permission: 'owner' | 'manager'
  ownershipStatus: 'pending' | 'active' | 'revoked'
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  verification: ProfileVerificationSummaryViewModel
  action: PageActionViewModel
}

interface AccountProfilesPageData {
  profiles: ManagedProfileSummaryViewModel[]
  createAction?: PageActionViewModel
  emptyState?: PageEmptyState
}

interface AccountManagedProfileCreateViewModel {
  ownershipOptions: Array<{
    profileType: 'self' | 'family'
    relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
    label: string
  }>
  defaultOwnership?: {
    profileType: 'self' | 'family'
    relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
  }
  submitAction: PageActionViewModel
}

interface AccountProfileDetailPageData {
  profileId: string
  profileName: string
  profileTitle: string
  avatarUrl: string
  ownershipBadges: string[]
  profileSections: AccountProfileDetailSectionViewModel[]
  contactSection: AccountProfileDetailSectionViewModel
  photos: AccountProfilePhotoViewModel[]
  statusItems: AccountProfileDetailFieldViewModel[]
  verification: ProfileVerificationSummaryViewModel
  privacyPreferenceItems: ProfilePrivacyPreferenceViewModel[]
  editState: AccountProfileEditStateViewModel
  archiveAction?: PageActionViewModel
}

interface AccountProfileDetailSectionViewModel {
  key: string
  title: string
  items: AccountProfileDetailFieldViewModel[]
}

interface AccountProfileDetailFieldViewModel {
  key: string
  label: string
  value: string
  editable: boolean
  inputType?: 'text' | 'number' | 'boolean' | 'select' | 'multi_select'
  options?: Array<{ label: string; value: string }>
}

interface AccountProfileEditStateViewModel {
  canEdit: boolean
  dirty: boolean
  saving: boolean
  saveAction?: PageActionViewModel
}

interface AccountProfilePhotoViewModel {
  id: string
  url: string
  isPrimary: boolean
  sortOrder: number
  status: 'review' | 'approved' | 'hidden'
  statusLabel: string
  editable: boolean
  updateAction?: PageActionViewModel
  deleteAction?: PageActionViewModel
}


interface ProfileVerificationSummaryViewModel {
  legalName?: string
  dateOfBirth?: string
  identityStatus: ProfileVerificationStatus
  educationStatus: ProfileVerificationStatus
  incomeStatus: ProfileVerificationStatus
  maritalStatus: ProfileVerificationStatus
  reviewStatus: ProfileReviewStatus
}
```

`displayName`、`avatarUrl`、`age` 来自 profile DTO 派生结果，不从 account 数据库字段读取。

`profileName` 是账户中心用于管理资料的内部称呼，页面可编辑并可作为 `profileTitle` 的优先展示值；公开 profile 仍使用后端派生 `displayName`。

### Membership

```ts
interface AccountMembershipPageData {
  currentPlan: AccountMembershipSummaryViewModel | null
  entitlementBalances: AccountEntitlementBalanceViewModel[]
  nextPlan: MembershipPlanViewModel | null
}

interface MembershipPlanViewModel {
  tier: 'free' | 'silver' | 'gold' | 'diamond'
  name: string
  description: string
  priceText?: string
  conciergePriority: boolean
  entitlements: string[]
  action?: PageActionViewModel
}

interface AccountMembershipSummaryViewModel {
  tier: 'free' | 'silver' | 'gold' | 'diamond'
  name: string
  status: 'active' | 'expired' | 'cancelled' | 'paused'
  startedAtText: string
  expiresAtText?: string
  conciergePriority: boolean
}

interface AccountEntitlementBalanceViewModel {
  code: 'private_introduction' | 'event_priority' | 'staff_review' | 'profile_detail_access'
  label: string
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  displayValue: string
  resetAtText?: string
}
```

### Events

```ts
interface AccountEventsPageData {
  attentionRegistrations: AccountEventRegistrationViewModel[]
  historyRegistrations: AccountEventRegistrationViewModel[]
  emptyState?: PageEmptyState
}

interface AccountEventRegistrationViewModel {
  registrationId: string
  eventId: string
  title: string
  coverImageUrl: string
  city: string
  venue: string
  dateText: string
  timeText: string
  status: 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
  badgeStatus: 'open' | 'waitlist' | 'closed'
  action?: PageActionViewModel
}
```

### Relationship

```ts
interface AccountRelationshipPageData {
  tabs: AccountRelationshipTabViewModel[]
  overview: AccountRelationshipOverviewItemViewModel[]
  favorites: FavoriteProfileSummaryViewModel[]
  introductions: AccountIntroductionSummaryViewModel[]
  attentionIntroductions: AccountIntroductionSummaryViewModel[]
  historyIntroductions: AccountIntroductionSummaryViewModel[]
}

interface AccountRelationshipTabViewModel {
  key: 'favorites' | 'introductions'
  label: string
  count?: number
}

interface AccountRelationshipOverviewItemViewModel {
  key: 'favorites' | 'introductions'
  label: string
  description: string
  value: number
}

interface FavoriteProfileSummaryViewModel {
  favoriteId: string
  profileId: string
  profileType: 'self' | 'family'
  displayName: string
  avatarUrl: string
  age: string
  city: string
  education: string
  industry: string
  summary: string
  tags: string[]
  savedAtText: string
}

interface AccountIntroductionSummaryViewModel {
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired' | 'cooldown'
  requestedAtText: string
  expiresAtText?: string
  respondedAtText?: string
  cooldownUntilText?: string
  contact?: AccountIntroductionContactViewModel
  action?: PageActionViewModel
}

interface AccountIntroductionContactViewModel {
  preferredChannel?: 'phone' | 'email' | 'wechat'
  phone?: string
  email?: string
  wechat?: string
  unavailableText?: string
}

### Messages

`/pages/account/relationship` 只承接收藏与私人介绍申请。私人介绍 accepted 后，relationship 通过独立 contact reveal API 展示对方联系方式，不开启聊天 room。消息中心是独立产品模块，承接系统通知的线程列表和消息详情分页。后续受控沟通再进入 inbox。

```ts
interface InboxThreadViewModel {
  threadId: string
  category: 'system' | 'chat'
  title: string
  preview: string
  status: 'open' | 'closed' | 'archived'
  unread: boolean
  updatedAtText: string
}

interface InboxThreadPageData {
  thread: InboxThreadViewModel
  messages: InboxMessageViewModel[]
  messagePage: InboxMessagePageViewModel
  composer?: InboxComposerViewModel
}

interface InboxMessageViewModel {
  messageId: string
  senderType: 'user' | 'staff' | 'system'
  senderName: string
  messageType: 'text' | 'system_notice' | 'status_update' | 'action_prompt'
  body: string
  createdAtText: string
  action?: PageActionViewModel
}

interface InboxComposerViewModel {
  disabled: boolean
  placeholder: string
  submitAction: PageActionViewModel
}

interface InboxMessagePageViewModel {
  hasMore: boolean
  nextBefore?: string
  loadMoreAction?: PageActionViewModel
}
```

消息中心承接系统通知的线程列表和消息详情分页。当前不开放发送消息；私人介绍受控沟通留到后续产品能力。

### Settings

```ts
interface AccountSettingsPageData {
  account: AccountSettingsIdentityViewModel | null
  security: AccountSecurityIdentityViewModel[]
  password: AccountPasswordSecurityViewModel | null
  mfa: AccountMfaSecurityViewModel | null
  notificationPreferences: AccountPreferenceViewModel[]
  servicePreferences: AccountPreferenceViewModel[]
  privacyPreferences: AccountPreferenceViewModel[]
  legalDocuments: LegalDocumentLinkViewModel[]
  accountActions: AccountActionViewModel[]
}

interface AccountSettingsIdentityViewModel {
  avatarUrl: string
  status: string
  items: AccountSettingsIdentityItemViewModel[]
}

interface AccountSettingsIdentityItemViewModel {
  key: 'accountName' | 'accountId' | 'status' | 'preferredLocale'
  label: string
  value: string
}

interface AccountPreferenceViewModel {
  code: AccountPreferenceCode
  label: string
  displayValue: string
}

interface AccountSecurityIdentityViewModel {
  id: string
  providerLabel: string
  identifier: string
  verifiedText: string
  bindAction?: PageActionViewModel
  unbindAction?: PageActionViewModel
}

interface AccountPasswordSecurityViewModel {
  isSetText: string
  lastChangedText: string
  canResetText: string
  requiresMfaText: string
  changePasswordAction?: PageActionViewModel
}

interface AccountMfaSecurityViewModel {
  title: string
  description: string
  enabled: boolean
  enabledText: string
  methodText: string
  availableMethods: AccountMfaMethodOptionViewModel[]
  enableAction?: PageActionViewModel
  disableAction?: PageActionViewModel
  changeMethodAction?: PageActionViewModel
}

interface AccountMfaMethodOptionViewModel {
  method: 'email' | 'phone'
  identityId: string
  label: string
  maskedIdentifier: string
  selected: boolean
}

interface AccountSecurityChallengeDialogViewModel {
  action: 'change_password' | 'deactivate_account' | 'export_data' | 'unbind_identity'
  title: string
  description: string
  methodText: string
  sendCodeAction: PageActionViewModel
  verifyAction: PageActionViewModel
  cancelAction: PageActionViewModel
}

interface AccountActionViewModel {
  key: 'exportData' | 'deactivateAccount'
  label: string
  hint: string
  confirmTitle?: string
  confirmDescription?: string
}

interface LegalDocumentLinkViewModel {
  type: 'terms' | 'privacy'
  label: string
}

interface ProfilePrivacyPreferenceViewModel {
  key:
    | 'hideMaritalStatus'
    | 'hideHasChildren'
    | 'hideChildrenPlan'
    | 'hideAcceptsLongDistance'
    | 'hideSmoking'
    | 'hideDrinking'
  label: string
  hidden: boolean
  statusText: string
}

```

## Forbidden Page Fields

页面 ViewModel 不应继续使用这些旧字段作为稳定输入：

```text
account.realName
account.nickName
account.role
account.completion
profile.displayName from DB
profile.avatarUrl from DB
profile.age from DB
profile.wantsChildren
profile.occupation
profile.phone
profile.email
profile.wechat
profile.pronouns
profile.sexuality
profile.interestedIn
profile.hometown
profile.livingSituation
profile.zodiac
profile.funFacts
profile.highlights
profile.conversationStarters
profile.dateIdeas
profile.compatibilityDimensions
profile.photos as embedded DB field
privacy_settings.title
privacy_settings.desc
message_threads as final account messages source; use inbox threads/messages instead
```

如页面确实需要对应展示，应从最终 source of truth 派生：

- profile 展示名、头像、年龄来自 profile DTO 派生字段。
- 会员、额度、权益来自 membership / entitlement DTO。
- 活动报名来自 event registration DTO。
- 私人介绍和消息来自 private introduction request / inbox DTO。
- 页面 label、标题、说明来自前端 i18n。

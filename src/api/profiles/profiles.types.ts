/** 格式化语言 */
export type FormatLocale = 'zh' | 'fr' | 'en'

/** 性别编码 */
export type GenderCode = 'male' | 'female'

/** 资料状态编码 */
export type ProfileStatusCode = 'open' | 'review' | 'vip'

/** 婚姻状态编码 */
export type MaritalStatusCode = 'single' | 'divorced' | 'widowed'

/** 交友意向编码 */
export type DatingIntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'

/** 生活习惯编码 */
export type HabitCode = 'never' | 'social' | 'often'

/** 会员等级 */
export type MembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'

/** 私人介绍状态 */
export type PrivateIntroductionStatus =
    | 'available'
    | 'login_required'
    | 'membership_required'
    | 'quota_exhausted'
    | 'requested'
    | 'accepted'
    | 'declined'
    | 'cooldown'

/** 仅会员可见 */
export const PROFILE_FIELD_MEMBER_ONLY = '__MEMBER_ONLY__'

/** 仅登录可见*/
export const PROFILE_FIELD_LOGIN_REQUIRED = '__LOGIN_REQUIRED__'

/** 受限字段占位值 */
export type ProfileRestrictedFieldValue =
    | typeof PROFILE_FIELD_MEMBER_ONLY
    | typeof PROFILE_FIELD_LOGIN_REQUIRED

/** 支持权限控制的资料字段 */
export type RestrictedProfileField<T> = T | ProfileRestrictedFieldValue

/** 本人资料排序 */
export type SelfProfileSortKey = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'

/** 家庭资料排序 */
export type FamilyProfileSortKey = 'priorityFirst' | 'recentActive' | 'ageAsc' | 'ageDesc'

/** 家庭模式编码 */
export type FamilyModeCode = 'priority' | 'contact_ready' | 'context_only'

/** 资料照片 */
export interface ProfilePhoto {
    id: string
    url: string
    caption: string
    isPrimary: boolean
}

/** 问答题 */
export interface ProfilePrompt {
    id: string
    promptCode: string
    prompt: string
    answer: string
}

/** 匹配维度 */
export interface CompatibilityDimension {
    code: string
    label: string
    score: number
}

/** 私人介绍状态 */
export interface PrivateIntroduction {
    status: PrivateIntroductionStatus
    membership: MembershipLevel | 'guest'
    quotaTotal: number
    quotaRemaining: number
    alreadyRequested: boolean
    canRequest: boolean
    cooldownUntil?: string
}

/** 本人资料列表项 */
export interface SelfProfileListItem {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    city: string
    profileStatus: ProfileStatusCode
    education: string
    occupation: string
    datingIntentionCode: DatingIntentionCode
    summary: string
    languages: string[]
    tags: string[]
}

/** 家庭资料列表项 */
export interface FamilyProfileListItem {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    city: string
    profileStatus: ProfileStatusCode
    education: string
    occupation: string
    maritalStatus: MaritalStatusCode
    hasChildren: boolean
    acceptsLongDistance: boolean
    relationshipPlan: string
    residencePlan: string
    tags: string[]
    allowFamilyContact: boolean
    familyPriority: boolean
}

/** 本人资料详情 */
export interface SelfProfileDetail {
    id: string
    displayName: string
    avatarUrl: string
    photos: ProfilePhoto[]
    gender: GenderCode
    age: RestrictedProfileField<number>
    height: number
    city: string
    country: string
    languages: string[]
    profileStatus: ProfileStatusCode
    isVerified: boolean
    lastActiveAt: string
    education: string
    industry: RestrictedProfileField<string>
    maritalStatus: MaritalStatusCode
    hasChildren: RestrictedProfileField<boolean>
    wantsChildren: RestrictedProfileField<boolean>
    acceptsLongDistance: RestrictedProfileField<boolean>
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: string
    relationshipPlan: RestrictedProfileField<string>
    residencePlan: RestrictedProfileField<string>
    relocationWillingness: RestrictedProfileField<string>
    values: RestrictedProfileField<string[]>
    preferredAgeMin: RestrictedProfileField<number>
    preferredAgeMax: RestrictedProfileField<number>
    locationScope: RestrictedProfileField<string>
    preferredEducation: RestrictedProfileField<string>
    familyPlan: RestrictedProfileField<string>
    dealBreakers: RestrictedProfileField<string[]>
    smoking: RestrictedProfileField<HabitCode>
    drinking: RestrictedProfileField<HabitCode>
    exercise: RestrictedProfileField<string>
    activityLevel: RestrictedProfileField<string>
    weekendStyle: RestrictedProfileField<string>
    pets: RestrictedProfileField<string>
    personalityTraits: RestrictedProfileField<string[]>
    interests: RestrictedProfileField<string[]>
    communicationStyle: RestrictedProfileField<string>
    funFacts: RestrictedProfileField<string[]>
    summary: string
    tags: string[]
    prompts: RestrictedProfileField<ProfilePrompt[]>
    privateIntroduction: PrivateIntroduction
}

/** 家庭资料详情 */
export interface FamilyProfileDetail {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    city: string
    country: string
    nationality: string
    languages: string[]
    isVerified: boolean
    lastActiveAt: string
    joinedAt: string
    familyVisible: boolean
    allowFamilyContact: boolean
    familyPriority: boolean
    education: string
    occupation: string
    industry: string
    incomeRange: string
    maritalStatus: MaritalStatusCode
    hasChildren: boolean
    wantsChildren: boolean
    acceptsLongDistance: boolean
    datingIntentionLabel: string
    relationshipPlan: string
    residencePlan: string
    smoking: HabitCode
    drinking: HabitCode
    exercise: string
    summary: string
    tags: string[]
}

/** 分页信息 */
export interface Pagination {
    page: number
    pageSize: number
    total: number
    totalPages: number
}

/** 目录筛选项 */
export interface DirectoryFacetOption {
    value: string
    label: string
}

/** 意向筛选项 */
export interface IntentFacet {
    code: DatingIntentionCode
    label: string
}

/** 本人资料筛选面板 */
export interface SelfProfileDirectoryFacets {
    cities: DirectoryFacetOption[]
    intents: IntentFacet[]
    industries: DirectoryFacetOption[]
    occupations: DirectoryFacetOption[]
    languages: string[]
}

/** 家庭资料筛选面板 */
export interface FamilyProfileDirectoryFacets {
    cities: DirectoryFacetOption[]
    intents: IntentFacet[]
    industries: DirectoryFacetOption[]
    occupations: DirectoryFacetOption[]
}

/** 本人资料目录查询参数 */
export interface SelfProfileDirectoryQuery {
    page: number
    pageSize: number
    sort: SelfProfileSortKey
    gender?: string
    ageRange?: string
    city?: string
    heightRange?: string
    education?: string
    datingIntentionCode?: string
    industry?: string
    occupation?: string
    language?: string
    verified?: string
    maritalStatus?: string
    hasChildren?: string
    acceptsLongDistance?: string
}

/** 家庭资料目录查询参数 */
export interface FamilyProfileDirectoryQuery {
    page: number
    pageSize: number
    sort: FamilyProfileSortKey
    gender?: string
    ageRange?: string
    city?: string
    education?: string
    datingIntentionCode?: string
    familyMode?: string
    occupation?: string
    industry?: string
    maritalStatus?: string
    hasChildren?: string
    acceptsLongDistance?: string
}

/** 首页精选资料响应 */
export interface FeaturedSelfProfilesResponse {
    items: SelfProfileListItem[]
}

/** 本人资料目录响应 */
export interface SelfProfileDirectoryResponse {
    items: SelfProfileListItem[]
    pagination: Pagination
    facets: SelfProfileDirectoryFacets
}

/** 家庭资料目录响应 */
export interface FamilyProfileDirectoryResponse {
    items: FamilyProfileListItem[]
    pagination: Pagination
    facets: FamilyProfileDirectoryFacets
}

/** 格式化语言 */
export type FormatLocale = 'zh' | 'fr' | 'en'

/** 性别编码 */
export type GenderCode = 'male' | 'female'

/** 资料状态编码 */
export type ProfileStatusCode = 'open' | 'review' | 'vip'

/** 婚姻状态编码 */
export type MaritalStatusCode = 'single' | 'divorced' | 'widowed'

/** 交友意向编码 */
export type IntentCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'

/** 生活习惯编码 */
export type HabitCode = 'never' | 'social' | 'often'

/** 个人资料排序 */
export type SelfProfileSortKey = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'

/** 家庭资料排序 */
export type FamilyProfileSortKey = 'priorityFirst' | 'recentActive' | 'ageAsc' | 'ageDesc'

/** 资料字段编码 */
export type ProfileFactCode = 'city' | 'education' | 'languages' | 'residencePlan'

/** 家庭模式编码 */
export type FamilyModeCode = 'priority' | 'contact_ready' | 'context_only'

/** 卡片徽章编码 */
export type ProfileBadgeCode = IntentCode | FamilyModeCode

/** 卡片底部状态编码 */
export type ProfileFooterCode = ProfileStatusCode | 'priority' | 'contact_ready' | 'observe'

/** 卡片标签编码 */
export type ProfileTagCode =
    | 'marital_single'
    | 'marital_divorced'
    | 'marital_widowed'
    | 'accept_long_distance'
    | 'has_children'
    | 'no_children'

/** 卡片字段响应 */
export interface ProfileCardFactResponse {
    code: ProfileFactCode
    value: string
}

/** 资料卡片响应 */
export interface ProfileCardResponse {
    avatarUrl: string
    displayName: string
    gender: GenderCode
    meta: string
    badgeCode: ProfileBadgeCode
    summary: string
    facts: ProfileCardFactResponse[]
    tags: string[]
    tagCodes: ProfileTagCode[]
    footerCode: ProfileFooterCode
}

/** 资料卡片列表项 */
export interface ProfileCardResponseItem {
    id: string
    card: ProfileCardResponse
}

/** 个人资料详情 */
export interface SelfProfileDetail {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    height: number
    city: string
    country: string
    nationality: string
    status: ProfileStatusCode
    isVerified: boolean
    lastActiveAt: string
    joinedAt: string
    familyVisible: boolean
    allowFamilyContact: boolean
    familyPriority: boolean
    education: string
    occupation: string
    industry: string
    employer: string
    incomeRange: string
    maritalStatus: MaritalStatusCode
    hasChildren: boolean
    wantChildren: boolean
    acceptLongDistance: boolean
    intent: string
    maritalPlan: string
    languages: string[]
    smoke: HabitCode
    drink: HabitCode
    exercise: string
    residencePlan: string
    summary: string
    highlights: string[]
    tags: string[]
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
    wantChildren: boolean
    acceptLongDistance: boolean
    intent: string
    maritalPlan: string
    languages: string[]
    smoke: HabitCode
    drink: HabitCode
    exercise: string
    residencePlan: string
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
    code: IntentCode
    label: string
}

/** 个人资料筛选面板 */
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

/** 个人资料目录查询参数 */
export interface SelfProfileDirectoryQuery {
    page: number
    pageSize: number
    sort: SelfProfileSortKey
    gender?: string
    ageRange?: string
    city?: string
    heightRange?: string
    education?: string
    intentCode?: string
    industry?: string
    occupation?: string
    language?: string
    verified?: string
    maritalStatus?: string
    hasChildren?: string
    acceptLongDistance?: string
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
    intentCode?: string
    familyMode?: string
    occupation?: string
    industry?: string
    maritalStatus?: string
    hasChildren?: string
    acceptLongDistance?: string
}

/** 首页精选资料响应 */
export interface FeaturedSelfProfilesResponse {
    items: ProfileCardResponseItem[]
}

/** 个人资料目录响应 */
export interface SelfProfileDirectoryResponse {
    items: ProfileCardResponseItem[]
    pagination: Pagination
    facets: SelfProfileDirectoryFacets
}

/** 家庭资料目录响应 */
export interface FamilyProfileDirectoryResponse {
    items: ProfileCardResponseItem[]
    pagination: Pagination
    facets: FamilyProfileDirectoryFacets
}
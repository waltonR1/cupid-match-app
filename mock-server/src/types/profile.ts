import type {LocalizedText} from './common.js'

/** 资料状态 */
export type ProfileStatus = 'open' | 'vip' | 'review'

/** 学历等级 */
export type DegreeLevel = 'bachelor' | 'master' | 'phd'

/** 婚姻状态 */
export type MaritalStatus = 'single' | 'divorced'

/** 目录排序方式 */
export type DirectorySort = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'

/** 注册角色 */
export type RegisterRole = 'self' | 'parent'

/** 原始资料记录 */
export interface ProfileRecord {
    id: string
    realName: string
    nickName: string
    avatarUrl: string
    gender: string
    age: number
    height: number
    city: LocalizedText
    country: LocalizedText
    nationality: LocalizedText
    status: ProfileStatus
    isVerified: boolean
    lastActiveAt: string
    joinedAt: string
    familyVisible: boolean
    allowFamilyContact: boolean
    familyPriority: boolean
    degreeLevel: DegreeLevel
    education: LocalizedText
    occupation: LocalizedText
    industry: LocalizedText
    employer: LocalizedText
    incomeRange: LocalizedText
    maritalStatus: MaritalStatus
    hasChildren: boolean
    wantChildren: boolean
    acceptLongDistance: boolean
    intentCode: string
    intent: LocalizedText
    maritalPlan: LocalizedText
    languages: string[]
    smoke: string
    drink: string
    exercise: LocalizedText
    residencePlan: LocalizedText
    summary: LocalizedText
    highlights: LocalizedText[]
    tags: LocalizedText[]
}

/** 带展示名称的资料记录 */
export interface ProfileWithDisplayName extends ProfileRecord {
    displayName: string
}

/** 资料卡片字段 */
export interface ProfileCardFactDTO {
    code: string
    value: string
}

/** 资料卡片 */
export interface ProfileCardDTO {
    avatarUrl: string
    displayName: string
    gender: string
    meta: string
    badgeCode: string
    summary: string
    facts: ProfileCardFactDTO[]
    tags: string[]
    tagCodes: string[]
    footerCode: string
}

/** 资料卡片列表项 */
export interface ProfileCardListItemDTO {
    id: string
    card: ProfileCardDTO
}

/** 个人资料详情 */
export interface SelfProfileDetailDTO {
    id: string
    displayName: string
    avatarUrl: string
    gender: string
    age: number
    height: number
    city: string
    country: string
    nationality: string
    status: ProfileStatus
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
    maritalStatus: MaritalStatus
    hasChildren: boolean
    wantChildren: boolean
    acceptLongDistance: boolean
    intent: string
    maritalPlan: string
    languages: string[]
    smoke: string
    drink: string
    exercise: string
    residencePlan: string
    summary: string
    highlights: string[]
    tags: string[]
}

/** 家庭资料详情 */
export interface FamilyProfileDetailDTO {
    id: string
    displayName: string
    avatarUrl: string
    gender: string
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
    maritalStatus: MaritalStatus
    hasChildren: boolean
    wantChildren: boolean
    acceptLongDistance: boolean
    intent: string
    maritalPlan: string
    languages: string[]
    smoke: string
    drink: string
    exercise: string
    residencePlan: string
    summary: string
    tags: string[]
}

/** 账户资料摘要 */
export interface AccountProfileSummaryDTO {
    id: string
    displayName: string
    city: string
    education: string
    occupation: string
    maritalStatus: MaritalStatus
    languages: string[]
    familyVisible: boolean
    summary: string
    highlights: string[]
    tags: string[]
}

/** 收藏资料卡片 */
export interface AccountFavoriteProfileCardDTO {
    id: string
    displayName: string
    age: number
    city: string
    familyVisible: boolean
    tags: string[]
}

/** 会话资料卡片 */
export interface AccountThreadProfileCardDTO {
    id: string
    displayName: string
    age: number
    city: string
    familyVisible: boolean
}

/** 目录筛选选项 */
export interface DirectoryFacetOptionDTO {
    value: string
    label: string
}

/** 意向筛选选项 */
export interface IntentFacetDTO {
    code: string
    label: string
}

/** 个人资料目录筛选项 */
export interface SelfProfileDirectoryFacetsDTO {
    cities: DirectoryFacetOptionDTO[]
    intents: IntentFacetDTO[]
    industries: DirectoryFacetOptionDTO[]
    occupations: DirectoryFacetOptionDTO[]
    languages: string[]
}

/** 家庭资料目录筛选项 */
export interface FamilyProfileDirectoryFacetsDTO {
    cities: DirectoryFacetOptionDTO[]
    intents: IntentFacetDTO[]
    industries: DirectoryFacetOptionDTO[]
    occupations: DirectoryFacetOptionDTO[]
}

/** 标准化资料查询参数 */
export interface NormalizedProfileQuery {
    page: number
    pageSize: number
    sort: DirectorySort
    gender: string
    ageRange: string
    city: string
    heightRange: string
    education: string
    intentCode: string
    industry: string
    occupation: string
    language: string
    verified: string
    maritalStatus: string
    hasChildren: string
    acceptLongDistance: string
    familyMode: string
}

/** 目录筛选数据 */
export interface DirectoryFacets {
    cities: LocalizedText[]
    intents: Array<{ code: string; label: LocalizedText }>
    industries: LocalizedText[]
    occupations: LocalizedText[]
    languages?: string[]
}
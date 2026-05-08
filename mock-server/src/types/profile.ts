import type {LocalizedText} from './common.js'
import type {ProfileRestrictedFieldValue} from '../constants/profile-access.js'
import type {MembershipLevel, PrivateIntroductionStatus} from './database.js'

/** 资料状态 */
export type ProfileStatus = 'open' | 'vip' | 'review'

/** 性别编码 */
export type GenderCode = 'male' | 'female'

/** 学历等级 */
export type DegreeLevel = 'bachelor' | 'master' | 'phd'

/** 婚姻状态 */
export type MaritalStatus = 'single' | 'divorced' | 'widowed'

/** 交友意向 */
export type DatingIntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'

/** 生活习惯 */
export type HabitCode = 'never' | 'social' | 'often'

/** 目录排序方式 */
export type DirectorySort = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'

/** 注册角色 */
export type RegisterRole = 'self' | 'parent'

/** 资料照片 */
export interface ProfilePhotoRecord {
    id: string
    url: string
    caption: LocalizedText
    isPrimary: boolean
}

/** 问答题 */
export interface ProfilePromptRecord {
    id: string
    promptCode: string
    prompt: LocalizedText
    answer: LocalizedText
}

/** 匹配维度 */
export interface CompatibilityDimensionRecord {
    code: string
    label: LocalizedText
    score: number
}

/** 原始资料记录 */
export interface ProfileRecord {
    id: string
    legalName: string
    nickname: string
    displayName: string
    avatarUrl: string
    photos: ProfilePhotoRecord[]
    gender: GenderCode
    pronouns: string
    sexuality: string
    interestedIn: GenderCode[]
    age: number
    height: number
    city: LocalizedText
    country: LocalizedText
    nationality: LocalizedText
    hometown: LocalizedText
    languages: string[]
    livingSituation: LocalizedText
    zodiac: LocalizedText
    profileStatus: ProfileStatus
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
    wantsChildren: boolean
    acceptsLongDistance: boolean
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: LocalizedText
    relationshipPlan: LocalizedText
    residencePlan: LocalizedText
    relocationWillingness: LocalizedText
    values: LocalizedText[]
    preferredAgeMin: number
    preferredAgeMax: number
    locationScope: LocalizedText
    preferredEducation: LocalizedText
    familyPlan: LocalizedText
    dealBreakers: LocalizedText[]
    smoking: HabitCode
    drinking: HabitCode
    exercise: LocalizedText
    activityLevel: LocalizedText
    weekendStyle: LocalizedText
    pets: LocalizedText
    religion: LocalizedText
    politicalViews: LocalizedText
    personalityTraits: LocalizedText[]
    interests: LocalizedText[]
    communicationStyle: LocalizedText
    funFacts: LocalizedText[]
    summary: LocalizedText
    highlights: LocalizedText[]
    tags: LocalizedText[]
    conversationStarters: LocalizedText[]
    dateIdeas: LocalizedText[]
    prompts: ProfilePromptRecord[]
    compatibilityDimensions: CompatibilityDimensionRecord[]
    phone: string
    email: string
    wechat: string
}

/** 带展示名称的资料记录 */
export interface ProfileWithDisplayName extends ProfileRecord {
    displayName: string
}

/** 本地化照片 DTO */
export interface LocalizedProfilePhotoDTO {
    id: string
    url: string
    caption: string
    isPrimary: boolean
}

/** 本地化问答 DTO */
export interface LocalizedProfilePromptDTO {
    id: string
    promptCode: string
    prompt: string
    answer: string
}

/** 匹配维度 DTO */
export interface CompatibilityDimensionDTO {
    code: string
    label: string
    score: number
}

/** 私人介绍状态 */
export interface PrivateIntroductionDTO {
    status: PrivateIntroductionStatus | 'available' | 'login_required' | 'membership_required' | 'quota_exhausted'
    membership: MembershipLevel | 'guest'
    quotaTotal: number
    quotaRemaining: number
    alreadyRequested: boolean
    canRequest: boolean
    cooldownUntil?: string
}

/** 受限字段 */
type Restricted<T> = T | ProfileRestrictedFieldValue

/** 本人资料列表项 */
export interface SelfProfileListItemDTO {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    city: string
    profileStatus: ProfileStatus
    education: string
    occupation: string
    industry: string
    datingIntentionCode: DatingIntentionCode
    summary: string
    languages: string[]
    tags: string[]
}

/** 家庭资料列表项 */
export interface FamilyProfileListItemDTO {
    id: string
    displayName: string
    avatarUrl: string
    gender: GenderCode
    age: number
    city: string
    profileStatus: ProfileStatus
    education: string
    occupation: string
    industry: string
    maritalStatus: MaritalStatus
    hasChildren: boolean
    acceptsLongDistance: boolean
    relationshipPlan: string
    residencePlan: string
    tags: string[]
    allowFamilyContact: boolean
    familyPriority: boolean
}

/** 本人资料详情 */
export interface SelfProfileDetailDTO {
    id: string
    displayName: string
    avatarUrl: string
    photos: LocalizedProfilePhotoDTO[]
    gender: GenderCode
    age: Restricted<number>
    height: number
    city: string
    country: string
    languages: string[]
    profileStatus: ProfileStatus
    isVerified: boolean
    education: string
    industry: Restricted<string>
    maritalStatus: MaritalStatus
    hasChildren: Restricted<boolean>
    wantsChildren: Restricted<boolean>
    acceptsLongDistance: Restricted<boolean>
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: string
    relationshipPlan: Restricted<string>
    residencePlan: Restricted<string>
    relocationWillingness: Restricted<string>
    values: Restricted<string[]>
    preferredAgeMin: Restricted<number>
    preferredAgeMax: Restricted<number>
    locationScope: Restricted<string>
    preferredEducation: Restricted<string>
    familyPlan: Restricted<string>
    dealBreakers: Restricted<string[]>
    smoking: Restricted<HabitCode>
    drinking: Restricted<HabitCode>
    exercise: Restricted<string>
    activityLevel: Restricted<string>
    weekendStyle: Restricted<string>
    pets: Restricted<string>
    personalityTraits: Restricted<string[]>
    interests: Restricted<string[]>
    communicationStyle: Restricted<string>
    summary: string
    tags: string[]
    prompts: Restricted<LocalizedProfilePromptDTO[]>
    privateIntroduction: PrivateIntroductionDTO
}

/** 家庭资料详情 */
export interface FamilyProfileDetailDTO {
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
    maritalStatus: MaritalStatus
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

/** 账号资料摘要 */
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
    code: DatingIntentionCode
    label: string
}

/** 本人资料目录筛选项 */
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
    datingIntentionCode: string
    industry: string
    occupation: string
    language: string
    verified: string
    maritalStatus: string
    hasChildren: string
    acceptsLongDistance: string
    familyMode: string
}

/** 意向筛选数据 */
export interface DirectoryIntentFacet {
    code: DatingIntentionCode
    label: LocalizedText
}

/** 目录筛选数据 */
export interface DirectoryFacets {
    cities: LocalizedText[]
    intents: DirectoryIntentFacet[]
    industries: LocalizedText[]
    occupations: LocalizedText[]
    languages?: string[]
}

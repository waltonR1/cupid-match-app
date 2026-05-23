import type {LocalizedText} from './common.js'
import type {ProfileRestrictedFieldValue} from '../constants/profile-access.js'
import type {MembershipLevel, PrivateIntroductionStatus} from './database.js'

export type ProfileStatus = 'draft' | 'review' | 'open' | 'paused' | 'hidden'

export type ProfileType = 'self' | 'family'
export type GenderCode = 'male' | 'female'

export type DegreeLevel = 'bachelor' | 'master' | 'phd'

export type MaritalStatus = 'never_married' | 'divorced' | 'widowed'

export type ChildrenPlan = 'wants' | 'open_to_discuss' | 'does_not_want'

export type DatingIntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'

export type HabitCode = 'never' | 'social' | 'often'

export type DirectorySort = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'

export type RegisterRole = 'self' | 'parent'

export interface ProfilePhotoRecord {
    id: string
    profileId: string
    url: string
    isPrimary: boolean
    sortOrder: number
    status: 'approved' | 'review' | 'hidden'
    createdAt: string
    updatedAt: string
}

export interface ProfileInternalRecord {
    id: string
    profileId: string
    employer?: LocalizedText
    incomeRange?: LocalizedText
    staffNotes?: LocalizedText
    riskFlags?: string[]
    source?: string
    updatedByUserId?: string
    createdAt: string
    updatedAt: string
}

export interface ProfileVerificationRecord {
    id: string
    profileId: string
    legalName?: string
    dateOfBirth?: string
    identityStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
    educationStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
    incomeStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
    maritalStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
    reviewStatus: 'unreviewed' | 'pending' | 'approved' | 'rejected'
    verifiedAt?: string
    verifiedByUserId?: string
    createdAt: string
    updatedAt: string
}

export type ProfileContactVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
export type ProfileContactVisibility = 'after_introduction' | 'owner_only' | 'disabled'
export type ProfileContactChannel = 'phone' | 'email' | 'wechat'

export interface ProfileContactRecord {
    id: string
    profileId: string
    phone?: string
    phoneVerificationStatus: ProfileContactVerificationStatus
    email?: string
    emailVerificationStatus: ProfileContactVerificationStatus
    wechat?: string
    wechatVerificationStatus: ProfileContactVerificationStatus
    preferredChannel?: ProfileContactChannel
    visibility: ProfileContactVisibility
    createdAt: string
    updatedAt: string
}

export interface ProfilePrivacyPreferenceRecord {
    id: string
    profileId: string
    hideMaritalStatus: boolean
    hideHasChildren: boolean
    hideChildrenPlan: boolean
    hideAcceptsLongDistance: boolean
    hideSmoking: boolean
    hideDrinking: boolean
    createdAt: string
    updatedAt: string
}

/** 原始资料记录 */
export interface ProfileRecord {
    id: string
    profileType: ProfileType
    gender: GenderCode
    birthYear: number
    height: number
    city: LocalizedText
    country: LocalizedText
    nationality: LocalizedText
    languages: string[]
    profileStatus: ProfileStatus
    isPriorityProfile: boolean
    lastActiveAt: string
    familyVisible: boolean
    allowFamilyContact: boolean
    familyPriority: boolean
    degreeLevel: DegreeLevel
    education: LocalizedText
    industry: LocalizedText
    careerDirection?: LocalizedText
    maritalStatus: MaritalStatus
    hasChildren: boolean
    childrenPlan: ChildrenPlan
    acceptsLongDistance: boolean
    datingIntentionCode: DatingIntentionCode
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
    personalityTraits: LocalizedText[]
    interests: LocalizedText[]
    communicationStyle: LocalizedText
    summary: LocalizedText
    tags: LocalizedText[]
    archivedAt?: string
    createdAt: string
    updatedAt: string
}

/** 带展示名称的资料记录 */
export interface ProfileWithDisplayName extends ProfileRecord {
    displayName: string
    avatarUrl: string
    photos: ProfilePhotoRecord[]
    age: number
    isVerified: boolean
    datingIntentionLabel: LocalizedText
}

/** 本地化照片 DTO */
export interface LocalizedProfilePhotoDTO {
    id: string
    url: string
    isPrimary: boolean
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
    isPriorityProfile: boolean
    education: string
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
    isPriorityProfile: boolean
    education: string
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
    country: Restricted<string>
    languages: Restricted<string[]>
    profileStatus: ProfileStatus
    isPriorityProfile: boolean
    isVerified: boolean
    education: string
    industry: Restricted<string>
    maritalStatus: Restricted<MaritalStatus>
    hasChildren: Restricted<boolean>
    childrenPlan: Restricted<ChildrenPlan>
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
    privateIntroduction: PrivateIntroductionDTO
}

/** 家庭资料详情 */
export interface FamilyProfileDetailDTO {
    id: string
    displayName: string
    avatarUrl: string
    photos: LocalizedProfilePhotoDTO[]
    gender: GenderCode
    age: number
    height: number
    city: string
    country: Restricted<string>
    nationality: Restricted<string>
    languages: Restricted<string[]>
    profileStatus: ProfileStatus
    isPriorityProfile: boolean
    isVerified: boolean
    familyVisible: boolean
    allowFamilyContact: boolean
    familyPriority: boolean
    education: string
    industry: string
    maritalStatus: Restricted<MaritalStatus>
    hasChildren: Restricted<boolean>
    childrenPlan: Restricted<ChildrenPlan>
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
    communicationStyle: Restricted<string>
    summary: string
    tags: string[]
    privateIntroduction: PrivateIntroductionDTO
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
    languages: string[]
}

/** 家庭资料目录筛选项 */
export interface FamilyProfileDirectoryFacetsDTO {
    cities: DirectoryFacetOptionDTO[]
    intents: IntentFacetDTO[]
    industries: DirectoryFacetOptionDTO[]
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
    languages?: string[]
}

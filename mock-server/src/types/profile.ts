import type {LocalizedText} from './common.js'
import type {ProfileRestrictedFieldValue} from '../constants/profile-access.js'
import type {MembershipLevel} from './database.js'

export type ProfileStatus = 'draft' | 'review' | 'open' | 'paused' | 'hidden'

export type ProfileType = 'self' | 'family'
export type GenderCode = 'male' | 'female'

export type DegreeLevel = 'bachelor' | 'master' | 'phd'

export type MaritalStatus = 'never_married' | 'divorced' | 'widowed'

export type ChildrenPlan = 'wants' | 'open_to_discuss' | 'does_not_want'

export type DatingIntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'

export type HabitCode = 'never' | 'social' | 'often'

export type RelocationCode = 'willing' | 'unwilling' | 'open_to_discuss'

export type LocationScopeCode = 'local' | 'regional' | 'national' | 'international'

export type RelationshipValueCode =
    | 'honesty'
    | 'trust'
    | 'communication'
    | 'respect'
    | 'loyalty'
    | 'family'
    | 'growth'
    | 'support'
    | 'humor'
    | 'ambition'
    | 'kindness'
    | 'independence'
    | 'romance'
    | 'stability'

export type ActivityLevelCode = 'low' | 'moderate' | 'high'

export type PetCode = 'has' | 'none' | 'likes'

export type WeekendStyleCode = 'outdoors' | 'indoors' | 'social' | 'flexible'

export type CommunicationStyleCode = 'direct' | 'indirect' | 'balanced'

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
    isFeatured: boolean
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

export type ProfileContactVisibility = 'after_introduction' | 'owner_only' | 'disabled'
export type ProfileContactChannel = 'phone' | 'email' | 'wechat'

export interface ProfileContactRecord {
    id: string
    profileId: string
    phone?: string
    email?: string
    wechat?: string
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
    profileName: LocalizedText
    gender: GenderCode
    birthYear: number
    height: number
    city: LocalizedText
    country: LocalizedText
    nationality: LocalizedText
    languages: string[]
    profileStatus: ProfileStatus
    lastActiveAt: string
    familyVisible: boolean
    degreeLevel: DegreeLevel
    education: LocalizedText
    industry: LocalizedText
    careerDirection?: LocalizedText
    maritalStatus: MaritalStatus
    hasChildren: boolean
    childrenPlan: ChildrenPlan
    acceptsLongDistance: boolean
    datingIntentionCode: DatingIntentionCode
    relationshipGoal: LocalizedText
    residencePlan: LocalizedText
    relocation: RelocationCode
    relationshipValues: RelationshipValueCode[]
    preferredAgeMin: number
    preferredAgeMax: number
    preferredLocation: LocationScopeCode
    preferredEducation: LocalizedText
    familyLife: LocalizedText
    dealBreakers: LocalizedText[]
    smoking: HabitCode
    drinking: HabitCode
    exercise: LocalizedText
    activityLevel: ActivityLevelCode
    weekendStyle: WeekendStyleCode
    pets: PetCode
    personalityTraits: LocalizedText[]
    interests: LocalizedText[]
    communicationStyle: CommunicationStyleCode
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
    isFeatured: boolean
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
    status:
        | 'available'
        | 'login_required'
        | 'membership_required'
        | 'quota_exhausted'
        | 'requested'
        | 'accepted'
        | 'declined'
        | 'expired'
        | 'cooldown'
    membership: MembershipLevel | 'guest'
    quotaTotal: number
    quotaRemaining: number
    alreadyRequested: boolean
    canRequest: boolean
    cooldownUntil?: string
}

/** 受限字段 */
type Restricted<T> = T | ProfileRestrictedFieldValue

export interface ProfileFavoriteStateDTO {
    isFavorite: boolean
    favoriteId?: string
    canFavorite: boolean
    unavailableReason?: 'visitor' | 'own_profile'
}

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
    industry: string
    maritalStatus: MaritalStatus
    hasChildren: boolean
    acceptsLongDistance: boolean
    relationshipGoal: string
    residencePlan: string
    tags: string[]
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
    isVerified: boolean
    education: string
    industry: Restricted<string>
    maritalStatus: Restricted<MaritalStatus>
    hasChildren: Restricted<boolean>
    childrenPlan: Restricted<ChildrenPlan>
    acceptsLongDistance: Restricted<boolean>
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: string
    relationshipGoal: Restricted<string>
    residencePlan: Restricted<string>
    relocation: Restricted<RelocationCode>
    relationshipValues: Restricted<RelationshipValueCode[]>
    preferredAgeMin: Restricted<number>
    preferredAgeMax: Restricted<number>
    preferredLocation: Restricted<LocationScopeCode>
    preferredEducation: Restricted<string>
    familyLife: Restricted<string>
    dealBreakers: Restricted<string[]>
    smoking: Restricted<HabitCode>
    drinking: Restricted<HabitCode>
    exercise: Restricted<string>
    activityLevel: Restricted<ActivityLevelCode>
    weekendStyle: Restricted<WeekendStyleCode>
    pets: Restricted<PetCode>
    personalityTraits: Restricted<string[]>
    interests: Restricted<string[]>
    communicationStyle: Restricted<CommunicationStyleCode>
    summary: string
    tags: string[]
    privateIntroduction: PrivateIntroductionDTO
    favorite: ProfileFavoriteStateDTO
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
    isVerified: boolean
    familyVisible: boolean
    education: string
    industry: string
    maritalStatus: Restricted<MaritalStatus>
    hasChildren: Restricted<boolean>
    childrenPlan: Restricted<ChildrenPlan>
    acceptsLongDistance: Restricted<boolean>
    datingIntentionCode: DatingIntentionCode
    datingIntentionLabel: string
    relationshipGoal: Restricted<string>
    residencePlan: Restricted<string>
    relocation: Restricted<RelocationCode>
    relationshipValues: Restricted<RelationshipValueCode[]>
    preferredAgeMin: Restricted<number>
    preferredAgeMax: Restricted<number>
    preferredLocation: Restricted<LocationScopeCode>
    preferredEducation: Restricted<string>
    familyLife: Restricted<string>
    dealBreakers: Restricted<string[]>
    smoking: Restricted<HabitCode>
    drinking: Restricted<HabitCode>
    exercise: Restricted<string>
    activityLevel: Restricted<ActivityLevelCode>
    weekendStyle: Restricted<WeekendStyleCode>
    pets: Restricted<PetCode>
    personalityTraits: Restricted<string[]>
    communicationStyle: Restricted<CommunicationStyleCode>
    summary: string
    tags: string[]
    privateIntroduction: PrivateIntroductionDTO
    favorite: ProfileFavoriteStateDTO
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

/** 性别 */
import type {PrivateIntroduction} from '@/api/profiles'

export type Gender = 'male' | 'female'

/** 字段访问状态 */
export type ProfileDetailAccessState = 'visible' | 'masked' | 'hidden'
export type ProfileDetailLockReason = 'login' | 'member'

/** 详情字段 */
export interface ProfileDetailFactItem {
    label: string
    value: string
    access?: ProfileDetailAccessState
    lockReason?: ProfileDetailLockReason
    maskText?: string
}

/** 详情徽章 */
export interface ProfileDetailBadgeItem {
    label: string
    tone?: 'highlight' | 'muted'
}

/** 个人详情访问层级 */
export type SelfProfileDetailAccessLevel = 'visitor' | 'registered' | 'premium'

/** 渐进展示步骤 */
/** 详情页头部数据 */
export interface ProfileDetailHeroData {
    eyebrow: string
    recordId: string
    avatarUrl: string
    displayName: string
    gender?: Gender
    meta: string
    summary: string
    badges: ProfileDetailBadgeItem[]
    indexTitle: string
    indexFacts: ProfileDetailFactItem[]
}

/** 个人详情页头部资料 */
export interface ProfileDetailGalleryHeroData {
    avatarUrl: string
    photos: string[]
    displayName: string
    gender?: Gender
    meta: string
    location: string
    summary: string
    badges: ProfileDetailBadgeItem[]
    tags: string[]
    quickFacts: ProfileDetailFactItem[]
    lastActiveText: string
    hasMemberAccess: boolean
    accessLabel: string
    galleryLockedText: string
}

/** 私人介绍请求数据 */
export interface PrivateIntroductionSectionData {
    status: PrivateIntroduction['status']
    quotaTotal: number
    quotaRemaining: number
    canRequest: boolean
    alreadyRequested: boolean
    showPrivateRoom: boolean
}

export interface PrivateIntroductionPanelText {
    title: string
    subtitle: string
    quota: string
    status: string
    requestButton: string
    disabledButton: string
    roomTitle: string
    roomSubtitle: string
    roomAction: string
    steps: string[]
}

/** 个人详情页展示数据 */
export interface SelfProfileDetailPageData {
    accessLevel: SelfProfileDetailAccessLevel
    heroData: ProfileDetailGalleryHeroData | null
    snapshotFacts: ProfileDetailFactItem[]
    relationshipFacts: ProfileDetailFactItem[]
    personalityFacts: ProfileDetailFactItem[]
    preferenceFacts: ProfileDetailFactItem[]
    valueFacts: ProfileDetailFactItem[]
    lifestyleFacts: ProfileDetailFactItem[]
    privateIntroductionData: PrivateIntroductionSectionData | null
}

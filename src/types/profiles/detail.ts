/** 性别 */
export type Gender = 'male' | 'female'

/** 字段访问状态 */
export type ProfileDetailAccessState = 'visible' | 'masked' | 'hidden'

/** 详情字段 */
export interface ProfileDetailFactItem {
    label: string
    value: string
    access?: ProfileDetailAccessState
    maskText?: string
}

/** 详情徽章 */
export interface ProfileDetailBadgeItem {
    label: string
    tone?: 'highlight' | 'muted'
}

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
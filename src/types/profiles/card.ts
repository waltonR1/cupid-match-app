/** 卡片信息 */
export interface ProfileCardFact {
    label: string
    value: string
}

/** 卡片性别 */
export type Gender = 'male' | 'female'

/** 资料卡片 */
export interface ProfileCardViewModel {
    avatarUrl: string
    displayName: string
    gender?: Gender
    meta: string
    badge: string
    summary: string
    facts: ProfileCardFact[]
    tags: string[]
    footer: string
}

/** 卡片列表项 */
export interface ProfileCardListItem {
    id: string
    card: ProfileCardViewModel
}
export interface ProfileCardFact {
    label: string
    value: string
}

export type ProfileCardGender = 'male' | 'female'

export interface ProfileCardViewModel {
    avatarUrl: string
    avatarFallback: string
    displayName: string
    gender?: ProfileCardGender
    meta: string
    badge: string
    summary: string
    facts: ProfileCardFact[]
    tags: string[]
    footer: string
}

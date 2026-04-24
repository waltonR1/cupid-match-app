export type Gender = 'male' | 'female'
export type ProfileDetailAccessState = 'visible' | 'masked' | 'hidden'

export interface ProfileDetailFactItem {
  label: string
  value: string
  access?: ProfileDetailAccessState
  maskText?: string
}

export interface ProfileDetailBadgeItem {
  label: string
  tone?: 'highlight' | 'muted'
}

export interface ProfileDetailHeroData {
  eyebrow: string
  recordId: string
  avatarUrl: string
  avatarFallback: string
  displayName: string
  gender?: Gender
  meta: string
  summary: string
  badges: ProfileDetailBadgeItem[]
  indexTitle: string
  indexFacts: ProfileDetailFactItem[]
}

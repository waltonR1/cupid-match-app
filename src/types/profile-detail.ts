export type Gender = 'male' | 'female'

export interface DetailFactItem {
  label: string
  value: string
}

export interface DetailBadgeItem {
  label: string
  tone?: 'highlight' | 'muted'
}

export interface DetailHeroData {
  eyebrow: string
  recordId: string
  avatar: string
  name: string
  gender?: Gender
  meta: string
  summary: string
  badges: DetailBadgeItem[]
  indexTitle: string
  indexFacts: DetailFactItem[]
}

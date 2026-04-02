export interface DirectoryCardFact {
  label: string
  value: string
}

export type DirectoryCardGender = 'male' | 'female'

export interface DirectoryCardViewModel {
  avatar: string
  name: string
  gender?: DirectoryCardGender
  meta: string
  badge: string
  summary: string
  facts: DirectoryCardFact[]
  tags: string[]
  footer: string
}

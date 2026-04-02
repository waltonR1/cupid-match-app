export interface DirectoryCardFact {
  label: string
  value: string
}

export interface DirectoryCardViewModel {
  avatar: string
  name: string
  meta: string
  badge: string
  summary: string
  facts: DirectoryCardFact[]
  tags: string[]
  footer: string
}

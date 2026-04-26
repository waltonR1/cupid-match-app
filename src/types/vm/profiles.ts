import type { ProfileCardViewModel } from '@/types/profiles/card'
import type { ProfileDetailFactItem, ProfileDetailHeroData } from '@/types/profiles/detail'
import type { ActiveDirectoryFilterChip, DirectoryOption } from '@/types/profiles/directory'

export interface ProfileDirectoryFilterItemVM {
  key: string
  label: string
  options: DirectoryOption[]
  value: string
  widthClass: string
  group?: 'primary' | 'secondary'
}

export interface ProfileDirectorySummaryVM {
  prefix: string
  suffix: string
  pageText: string
  total: number
  start: number
  end: number
}

export interface ProfileDirectorySortVM {
  label: string
  key: string
  options: DirectoryOption[]
}

export interface ProfileDirectoryCardItemVM {
  id: string
  card: ProfileCardViewModel
}

export interface ProfileDirectoryPageVM {
  items: ProfileDirectoryCardItemVM[]
  filters: ProfileDirectoryFilterItemVM[]
  activeFilters: ActiveDirectoryFilterChip[]
  resultSummary: ProfileDirectorySummaryVM
  resultSort: ProfileDirectorySortVM
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ProfileDetailPageVM {
  heroData: ProfileDetailHeroData | null
  overviewFacts: ProfileDetailFactItem[]
  relationshipFacts: ProfileDetailFactItem[]
  lifestyleFacts: ProfileDetailFactItem[]
  spotlightFacts: ProfileDetailFactItem[]
  intentText: string
  maritalPlanText: string
  highlightTexts: string[]
  tagTexts: string[]
}

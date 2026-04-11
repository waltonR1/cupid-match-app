import type { ComputedRef, Ref } from 'vue'

export interface DirectoryOption {
  label: string
  value: string
}

export interface ActiveDirectoryFilterChip {
  key: keyof FamilyDirectoryFilters
  label: string
  value: string
}

export interface FamilyDirectoryFilters {
  gender: string
  ageRange: string
  city: string
  education: string
  intentCode: string
  familyMode: string
  occupation: string
  industry: string
  maritalStatus: string
  hasChildren: string
  acceptLongDistance: string
}

export type FamilySortKey =
  | 'priorityFirst'
  | 'recentActive'
  | 'ageAsc'
  | 'ageDesc'

export interface UseFamilyDirectoryResult<TProfile> {
  filters: Ref<FamilyDirectoryFilters>
  sortKey: Ref<FamilySortKey>
  page: Ref<number>
  pageSize: Ref<number>

  total: ComputedRef<number>
  totalPages: ComputedRef<number>
  filteredItems: ComputedRef<TProfile[]>
  sortedItems: ComputedRef<TProfile[]>
  pagedItems: ComputedRef<TProfile[]>
  pageStart: ComputedRef<number>
  pageEnd: ComputedRef<number>
  activeFilterChips: ComputedRef<ActiveDirectoryFilterChip[]>

  ageOptions: ComputedRef<DirectoryOption[]>
  genderOptions: ComputedRef<DirectoryOption[]>
  cityOptions: ComputedRef<DirectoryOption[]>
  educationOptions: ComputedRef<DirectoryOption[]>
  intentOptions: ComputedRef<DirectoryOption[]>
  familyModeOptions: ComputedRef<DirectoryOption[]>
  occupationOptions: ComputedRef<DirectoryOption[]>
  industryOptions: ComputedRef<DirectoryOption[]>
  maritalStatusOptions: ComputedRef<DirectoryOption[]>
  childrenOptions: ComputedRef<DirectoryOption[]>
  longDistanceOptions: ComputedRef<DirectoryOption[]>
  sortOptions: ComputedRef<DirectoryOption[]>

  updateFilters: (nextFilters: Partial<FamilyDirectoryFilters>) => void
  removeFilter: (key: keyof FamilyDirectoryFilters) => void
  resetFilters: () => void
  updateSort: (nextSortKey: string) => void
  changePage: (nextPage: number) => void
}

import type { ComputedRef, Ref } from 'vue'

export interface DirectoryOption {
  label: string
  value: string
}

export interface ActiveDirectoryFilterChip<TKey extends PropertyKey = string> {
  key: TKey
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

export interface SelfDirectoryFilters {
  gender: string
  ageRange: string
  city: string
  heightRange: string
  education: string
  intentCode: string
  industry: string
  occupation: string
  language: string
  verified: string
  maritalStatus: string
  hasChildren: string
  acceptLongDistance: string
}

export type FamilySortKey =
  | 'priorityFirst'
  | 'recentActive'
  | 'ageAsc'
  | 'ageDesc'

export type SelfSortKey =
  | 'recentActive'
  | 'priorityFirst'
  | 'ageAsc'
  | 'ageDesc'

export interface UseProfileDirectoryResult<TProfile, TFilters extends object, TSortKey extends string> {
  filters: Ref<TFilters>
  sortKey: Ref<TSortKey>
  page: Ref<number>
  pageSize: Ref<number>
  sourceItems: Ref<TProfile[]>

  total: ComputedRef<number>
  totalPages: ComputedRef<number>
  filteredItems: ComputedRef<TProfile[]>
  sortedItems: ComputedRef<TProfile[]>
  pagedItems: ComputedRef<TProfile[]>
  pageStart: ComputedRef<number>
  pageEnd: ComputedRef<number>

  updateFilters: (nextFilters: Partial<TFilters>) => void
  removeFilter: (key: keyof TFilters) => void
  resetFilters: () => void
  updateSort: (nextSortKey: string) => void
  changePage: (nextPage: number) => void
}

export type UseFamilyDirectoryResult<TProfile> = UseProfileDirectoryResult<
  TProfile,
  FamilyDirectoryFilters,
  FamilySortKey
>

export type UseSelfDirectoryResult<TProfile> = UseProfileDirectoryResult<
  TProfile,
  SelfDirectoryFilters,
  SelfSortKey
> & {
  featuredProfiles: ComputedRef<TProfile[]>
}

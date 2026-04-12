import type { ComputedRef, Ref } from 'vue'

export interface DirectoryOption {
    label: string
    value: string
}

export interface ActiveDirectoryFilterChip {
    key: keyof SelfDirectoryFilters
    label: string
    value: string
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

export type SelfSortKey =
    | 'recentActive'
    | 'priorityFirst'
    | 'ageAsc'
    | 'ageDesc'

export interface UseSelfDirectoryResult<TProfile> {
    filters: Ref<SelfDirectoryFilters>
    sortKey: Ref<SelfSortKey>
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
    heightOptions: ComputedRef<DirectoryOption[]>
    educationOptions: ComputedRef<DirectoryOption[]>
    intentOptions: ComputedRef<DirectoryOption[]>
    industryOptions: ComputedRef<DirectoryOption[]>
    occupationOptions: ComputedRef<DirectoryOption[]>
    languageOptions: ComputedRef<DirectoryOption[]>
    verifiedOptions: ComputedRef<DirectoryOption[]>
    maritalStatusOptions: ComputedRef<DirectoryOption[]>
    childrenOptions: ComputedRef<DirectoryOption[]>
    longDistanceOptions: ComputedRef<DirectoryOption[]>
    sortOptions: ComputedRef<DirectoryOption[]>

    updateFilters: (nextFilters: Partial<SelfDirectoryFilters>) => void
    removeFilter: (key: keyof SelfDirectoryFilters) => void
    resetFilters: () => void
    updateSort: (nextSortKey: string) => void
    changePage: (nextPage: number) => void
}

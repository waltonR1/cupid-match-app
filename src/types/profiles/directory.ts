import type {ComputedRef, Ref} from 'vue'
import type {ProfileCardListItem} from './card'
import type {ProfileActiveFilterChip, ProfileFilterToolbarItem} from './view'

/** 筛选选项 */
export interface DirectoryOption {
    label: string
    value: string
}

/** 已选筛选标签 */
export interface ActiveDirectoryFilterChip<TKey extends PropertyKey = string> {
    key: TKey
    label: string
    value: string
}

/** 家庭资料筛选条件 */
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

/** 个人资料筛选条件 */
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

/** 家庭资料排序方式 */
export type FamilySortKey =
    | 'priorityFirst'
    | 'recentActive'
    | 'ageAsc'
    | 'ageDesc'

/** 个人资料排序方式 */
export type SelfSortKey =
    | 'recentActive'
    | 'priorityFirst'
    | 'ageAsc'
    | 'ageDesc'

/** 资料目录基础状态 */
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

/** 家庭资料目录状态 */
export type UseFamilyDirectoryResult<TProfile> = UseProfileDirectoryResult<
    TProfile,
    FamilyDirectoryFilters,
    FamilySortKey
>

/** 个人资料目录状态 */
export type UseSelfDirectoryResult<TProfile> = UseProfileDirectoryResult<
    TProfile,
    SelfDirectoryFilters,
    SelfSortKey
> & {
    featuredProfiles: ComputedRef<TProfile[]>
}

/** 家庭资料筛选字段 */
export type FamilyDirectoryFilterKey = keyof FamilyDirectoryFilters

/** 家庭资料筛选项 */
export type FamilyDirectoryFilterItem = ProfileFilterToolbarItem<FamilyDirectoryFilterKey>

/** 家庭资料目录页面数据 */
export interface FamilyProfileDirectoryPageData {
    items: ProfileCardListItem[]
    filters: FamilyDirectoryFilterItem[]
    activeFilters: ProfileActiveFilterChip<FamilyDirectoryFilterKey>[]
    page: number
    pageSize: number
    total: number
    totalPages: number
}

/** 个人资料筛选字段 */
export type SelfDirectoryFilterKey = keyof SelfDirectoryFilters

/** 个人资料筛选项 */
export type SelfDirectoryFilterItem = ProfileFilterToolbarItem<SelfDirectoryFilterKey>

/** 个人资料目录页面数据 */
export interface SelfProfileDirectoryPageData {
    items: ProfileCardListItem[]
    filters: SelfDirectoryFilterItem[]
    activeFilters: ProfileActiveFilterChip<SelfDirectoryFilterKey>[]
    page: number
    pageSize: number
    total: number
    totalPages: number
}

import type {ActiveDirectoryFilterChip, DirectoryOption} from './directory'

/** 目录结果统计 */
export interface DirectoryResultSummary {
    prefix: string
    suffix: string
    pageText: string
    total: number
    start: number
    end: number
}

/** 排序选项 */
export interface DirectorySortOption<TSortKey extends string = string> {
    label: string
    value: TSortKey
}

/** 排序控制配置 */
export interface DirectorySortControl<TSortKey extends string = string> {
    label: string
    key: TSortKey
    options: DirectorySortOption<TSortKey>[]
}

/** 筛选工具栏项 */
export interface ProfileFilterToolbarItem<TKey extends string = string> {
    key: TKey
    label: string
    options: DirectoryOption[]
    value: string
    widthClass: string
    group?: 'primary' | 'secondary'
}

/** 当前已选筛选项 */
export type ProfileActiveFilterChip<TKey extends string = string> = ActiveDirectoryFilterChip<TKey>
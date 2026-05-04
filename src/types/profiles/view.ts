import type { ActiveDirectoryFilterChip, DirectoryOption } from './directory'

export interface DirectoryResultSummary {
  prefix: string
  suffix: string
  pageText: string
  total: number
  start: number
  end: number
}

export interface DirectorySortOption<TSortKey extends string = string> {
  label: string
  value: TSortKey
}

export interface DirectorySortControl<TSortKey extends string = string> {
  label: string
  key: TSortKey
  options: DirectorySortOption<TSortKey>[]
}

export interface ProfileFilterToolbarItem<TKey extends string = string> {
  key: TKey
  label: string
  options: DirectoryOption[]
  value: string
  widthClass: string
  group?: 'primary' | 'secondary'
}

export type ProfileActiveFilterChip<TKey extends string = string> = ActiveDirectoryFilterChip<TKey>

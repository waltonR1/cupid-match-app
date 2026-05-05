import type {FamilyProfileSortKey, SelfProfileSortKey} from '@/api/profiles/profiles'

/** 资料目录统一分页大小 */
export const PROFILE_DIRECTORY_PAGE_SIZE = 6

/** 资料筛选项宽度样式 */
export const PROFILE_FILTER_WIDTH_CLASS = {
    compact: 'w-[86px] sm:w-[90px] lg:w-[94px] xl:w-[98px]',
    regular: 'w-[98px] sm:w-[104px] lg:w-[110px] xl:w-[116px]',
    wide: 'w-[114px] sm:w-[122px] lg:w-[130px] xl:w-[136px]',
} as const

/** 个人资料目录排序 key */
export const SELF_PROFILE_SORT_KEYS = [
    'recentActive',
    'priorityFirst',
    'ageAsc',
    'ageDesc',
] as const satisfies readonly SelfProfileSortKey[]

/** 家庭资料目录排序 key */
export const FAMILY_PROFILE_SORT_KEYS = [
    'priorityFirst',
    'recentActive',
    'ageAsc',
    'ageDesc',
] as const satisfies readonly FamilyProfileSortKey[]

/** 校验个人资料排序 key */
export function isSelfProfileSortKey(value: string): value is SelfProfileSortKey {
    return SELF_PROFILE_SORT_KEYS.includes(value as SelfProfileSortKey)
}

/** 校验家庭资料排序 key */
export function isFamilyProfileSortKey(value: string): value is FamilyProfileSortKey {
    return FAMILY_PROFILE_SORT_KEYS.includes(value as FamilyProfileSortKey)
}
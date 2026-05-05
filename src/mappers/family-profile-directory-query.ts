import type {FamilyProfileDirectoryQuery, FamilyProfileSortKey} from '@/api/profiles'
import {DEFAULT_FAMILY_DIRECTORY_FILTERS, DEFAULT_FAMILY_PROFILE_SORT} from '@/constants/profiles'
import type {FamilyDirectoryFilters} from '@/types/profiles/directory'

export {DEFAULT_FAMILY_DIRECTORY_FILTERS, DEFAULT_FAMILY_PROFILE_SORT}

/** 构建家庭资料目录查询参数 */
export function buildFamilyProfileDirectoryQuery(params: {
    page: number
    pageSize: number
    sortKey: FamilyProfileSortKey
    filters: FamilyDirectoryFilters
}): FamilyProfileDirectoryQuery {
    return {
        page: params.page,
        pageSize: params.pageSize,
        sort: params.sortKey,
        ...params.filters,
    }
}

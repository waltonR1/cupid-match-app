import type {SelfProfileDirectoryQuery, SelfProfileSortKey} from '@/api/profiles'
import {DEFAULT_SELF_DIRECTORY_FILTERS, DEFAULT_SELF_PROFILE_SORT} from '@/constants/profiles'
import type {SelfDirectoryFilters} from '@/types/profiles/directory'

export {DEFAULT_SELF_DIRECTORY_FILTERS, DEFAULT_SELF_PROFILE_SORT}

/** 构建个人资料目录查询参数 */
export function buildSelfProfileDirectoryQuery(params: {
    page: number
    pageSize: number
    sortKey: SelfProfileSortKey
    filters: SelfDirectoryFilters
}): SelfProfileDirectoryQuery {
    return {
        page: params.page,
        pageSize: params.pageSize,
        sort: params.sortKey,
        ...params.filters,
    }
}

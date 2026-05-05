import type {SelfProfileDirectoryQuery, SelfProfileSortKey} from '@/api/profiles'
import type {SelfDirectoryFilters} from '@/types/profiles/directory'

/** 默认个人资料筛选条件 */
export const DEFAULT_SELF_DIRECTORY_FILTERS: SelfDirectoryFilters = {
    gender: '',
    ageRange: '',
    city: '',
    heightRange: '',
    education: '',
    intentCode: '',
    industry: '',
    occupation: '',
    language: '',
    verified: '',
    maritalStatus: '',
    hasChildren: '',
    acceptLongDistance: '',
}

/** 默认个人资料排序方式 */
export const DEFAULT_SELF_PROFILE_SORT: SelfProfileSortKey = 'recentActive'

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

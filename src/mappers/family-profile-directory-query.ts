import type {FamilyProfileDirectoryQuery, FamilyProfileSortKey} from '@/api/profiles'
import type {FamilyDirectoryFilters} from '@/types/profiles/directory'

/** 默认家庭资料筛选条件 */
export const DEFAULT_FAMILY_DIRECTORY_FILTERS: FamilyDirectoryFilters = {
    gender: '',
    ageRange: '',
    city: '',
    education: '',
    intentCode: '',
    familyMode: '',
    occupation: '',
    industry: '',
    maritalStatus: '',
    hasChildren: '',
    acceptLongDistance: '',
}

/** 默认家庭资料排序方式 */
export const DEFAULT_FAMILY_PROFILE_SORT: FamilyProfileSortKey = 'priorityFirst'

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

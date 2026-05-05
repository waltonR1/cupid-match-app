import type {FormatLocale, SelfProfileDirectoryResponse} from '@/api/profiles'
import {PROFILE_DIRECTORY_PAGE_SIZE} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import {toSelfProfileCardViewModel} from '@/mappers/profile-card'
import {buildSelfDirectoryFilterItems} from '@/mappers/self-profile-directory-filter'
import type {SelfDirectoryFilters, SelfProfileDirectoryPageData} from '@/types/profiles/directory'
import {buildActiveDirectoryFilterChips} from '@/utils/profile-format'

/** 转换个人资料目录页面数据 */
export function toSelfProfileDirectoryPageData(params: {
    response: SelfProfileDirectoryResponse | null
    filters: SelfDirectoryFilters
    locale: FormatLocale
    t: Translate
}): SelfProfileDirectoryPageData {
    const filterItems = buildSelfDirectoryFilterItems(
        params.response?.facets ?? null,
        params.filters,
        params.locale,
        params.t,
    )
    const pagination = params.response?.pagination ?? {
        page: 1,
        pageSize: PROFILE_DIRECTORY_PAGE_SIZE,
        total: 0,
        totalPages: 1,
    }

    return {
        items: (params.response?.items ?? []).map(item => ({
            id: item.id,
            card: toSelfProfileCardViewModel(item, params.locale, params.t),
        })),
        filters: filterItems,
        activeFilters: buildActiveDirectoryFilterChips(filterItems, params.filters),
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        totalPages: pagination.totalPages,
    }
}

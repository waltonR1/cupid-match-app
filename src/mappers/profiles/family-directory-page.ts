import type {FamilyProfileDirectoryResponse, FormatLocale} from '@/api/profiles'
import {PROFILE_DIRECTORY_PAGE_SIZE} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import {toFamilyProfileCardViewModel} from '@/mappers/profiles/card'
import {buildFamilyDirectoryFilterItems} from '@/mappers/profiles/family-directory-filter'
import type {FamilyDirectoryFilters, FamilyProfileDirectoryPageData} from '@/types/profiles/directory'
import {buildActiveDirectoryFilterChips} from '@/utils/profile-format'
import type {OptionLabel} from '@/mappers/profiles/directory-filter'

/** 转换家庭资料目录页面数据 */
export function toFamilyProfileDirectoryPageData(params: {
    response: FamilyProfileDirectoryResponse | null
    filters: FamilyDirectoryFilters
    locale: FormatLocale
    t: Translate
    optionLabel?: OptionLabel
}): FamilyProfileDirectoryPageData {
    const optionLabel = params.optionLabel ?? fallbackOptionLabel
    const filterItems = buildFamilyDirectoryFilterItems(
        params.response?.facets ?? null,
        params.filters,
        params.t,
        optionLabel,
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
            card: toFamilyProfileCardViewModel(item, params.locale, params.t, optionLabel),
        })),
        filters: filterItems,
        activeFilters: buildActiveDirectoryFilterChips(filterItems, params.filters),
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        totalPages: pagination.totalPages,
    }
}

function fallbackOptionLabel(_fieldKey: string, value: string): string {
    return value
}

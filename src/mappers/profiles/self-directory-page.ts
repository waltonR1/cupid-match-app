import type {FormatLocale, SelfProfileDirectoryResponse} from '@/api/profiles'
import {PROFILE_DIRECTORY_PAGE_SIZE} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import {toSelfProfileCardViewModel} from '@/mappers/profiles/card'
import {buildSelfDirectoryFilterItems} from '@/mappers/profiles/self-directory-filter'
import type {SelfDirectoryFilters, SelfProfileDirectoryPageData} from '@/types/profiles/directory'
import {buildActiveDirectoryFilterChips} from '@/utils/profile-format'
import type {OptionLabel} from '@/mappers/profiles/directory-filter'

export function toSelfProfileDirectoryPageData(params: {
    response: SelfProfileDirectoryResponse | null
    filters: SelfDirectoryFilters
    locale: FormatLocale
    t: Translate
    optionLabel?: OptionLabel
}): SelfProfileDirectoryPageData {
    const optionLabel = params.optionLabel ?? fallbackOptionLabel
    const filterItems = buildSelfDirectoryFilterItems(
        params.response?.facets ?? null,
        params.filters,
        params.locale,
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
            card: toSelfProfileCardViewModel(item, params.locale, params.t, optionLabel),
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

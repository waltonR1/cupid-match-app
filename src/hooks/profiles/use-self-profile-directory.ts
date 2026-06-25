import {computed, ref, watch, type Ref} from 'vue'
import {
    getSelfProfileDirectory,
    type FormatLocale,
    type SelfProfileDirectoryResponse,
    type SelfProfileSortKey,
} from '@/api/profiles'
import {PROFILE_DIRECTORY_PAGE_SIZE, isSelfProfileSortKey} from '@/constants/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import {toSelfProfileDirectoryPageData} from '@/mappers/profiles/self-directory-page'
import {
    buildSelfProfileDirectoryQuery,
    DEFAULT_SELF_DIRECTORY_FILTERS,
    DEFAULT_SELF_PROFILE_SORT,
} from '@/mappers/profiles/self-directory-query'
import {useOptionsStore} from '@/stores/modules/options'
import type {DirectoryFilterUpdatePayload, SelfDirectoryFilters} from '@/types/profiles/directory'

export function useSelfProfileDirectory(t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const optionsStore = useOptionsStore()
    const filters = ref<SelfDirectoryFilters>({...DEFAULT_SELF_DIRECTORY_FILTERS})
    const sortKey = ref<SelfProfileSortKey>(DEFAULT_SELF_PROFILE_SORT)
    const page = ref(1)
    const response = ref<SelfProfileDirectoryResponse | null>(null)

    watch(locale, value => {
        void optionsStore.ensureOptions(value)
    }, {immediate: true})

    watch([filters, sortKey, page, locale], () => {
        void load()
    }, {deep: true, immediate: true})

    const pageData = computed(() => toSelfProfileDirectoryPageData({
        response: response.value,
        filters: filters.value,
        locale: locale.value,
        t,
        optionLabel,
    }))

    function optionLabel(fieldKey: string, value: string): string {
        return optionsStore.optionsFor(locale.value, 'profile.' + fieldKey)
            .find(option => option.value === value)?.label ?? value
    }

    async function load() {
        const nextResponse = await latest.run(() => getSelfProfileDirectory(
            buildSelfProfileDirectoryQuery({
                page: page.value,
                pageSize: PROFILE_DIRECTORY_PAGE_SIZE,
                sortKey: sortKey.value,
                filters: filters.value,
            }),
        ))

        if (!nextResponse) {
            if (latest.error.value !== null) {
                response.value = null
            }
            return
        }

        response.value = nextResponse
    }

    function updateFilters(nextFilters: Partial<SelfDirectoryFilters>) {
        filters.value = {
            ...filters.value,
            ...nextFilters,
        }
        page.value = 1
    }

    function updateFilter(payload: DirectoryFilterUpdatePayload) {
        updateFilters({[payload.key]: payload.value} as Partial<SelfDirectoryFilters>)
    }

    function removeFilter(key: string) {
        updateFilters({[key]: ''} as Partial<SelfDirectoryFilters>)
    }

    function resetFilters() {
        filters.value = {...DEFAULT_SELF_DIRECTORY_FILTERS}
        sortKey.value = DEFAULT_SELF_PROFILE_SORT
        page.value = 1
    }

    function updateSort(nextSortKey: string) {
        if (!isSelfProfileSortKey(nextSortKey)) return

        sortKey.value = nextSortKey
        page.value = 1
    }

    function changePage(nextPage: number) {
        if (nextPage < 1 || nextPage > pageData.value.totalPages) return

        page.value = nextPage
    }

    return {
        loading: latest.loading,
        error: latest.error,
        filters,
        sortKey,
        pageData,
        updateFilters,
        updateFilter,
        removeFilter,
        resetFilters,
        updateSort,
        changePage,
        refresh: load,
    }
}

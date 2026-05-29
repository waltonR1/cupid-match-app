import {computed, ref, watch, type Ref} from 'vue'
import {
    getFamilyProfileDirectory,
    type FamilyProfileDirectoryResponse,
    type FamilyProfileSortKey,
    type FormatLocale,
    type ProfileFavoriteState,
} from '@/api/profiles'
import {addFavorite, removeFavorite} from '@/api/account'
import {PROFILE_DIRECTORY_PAGE_SIZE, isFamilyProfileSortKey} from '@/constants/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import {toFamilyProfileDirectoryPageData} from '@/mappers/family-profile-directory-page'
import {
    buildFamilyProfileDirectoryQuery,
    DEFAULT_FAMILY_DIRECTORY_FILTERS,
    DEFAULT_FAMILY_PROFILE_SORT,
} from '@/mappers/family-profile-directory-query'
import type {DirectoryFilterUpdatePayload, FamilyDirectoryFilters} from '@/types/profiles/directory'

/** 家庭资料目录数据 */
export function useFamilyProfileDirectory(t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const filters = ref<FamilyDirectoryFilters>({...DEFAULT_FAMILY_DIRECTORY_FILTERS})
    const sortKey = ref<FamilyProfileSortKey>(DEFAULT_FAMILY_PROFILE_SORT)
    const page = ref(1)
    const response = ref<FamilyProfileDirectoryResponse | null>(null)
    const favoriteUpdatingIds = ref<string[]>([])

    /** 筛选、排序、分页或语言变化时重新加载目录 */
    watch([filters, sortKey, page, locale], () => {
        void load()
    }, {deep: true, immediate: true})

    /** 页面展示数据 */
    const pageData = computed(() => toFamilyProfileDirectoryPageData({
        response: response.value,
        filters: filters.value,
        locale: locale.value,
        t,
    }))

    /** 加载家庭资料目录 */
    async function load() {
        const nextResponse = await latest.run(() => getFamilyProfileDirectory(
            buildFamilyProfileDirectoryQuery({
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

    /** 更新筛选条件 */
    function updateFilters(nextFilters: Partial<FamilyDirectoryFilters>) {
        filters.value = {
            ...filters.value,
            ...nextFilters,
        }
        page.value = 1
    }


    /** 更新单个筛选条件 */
    function updateFilter(payload: DirectoryFilterUpdatePayload) {
        updateFilters({[payload.key]: payload.value} as Partial<FamilyDirectoryFilters>)
    }

    /** 移除单个筛选条件 */
    function removeFilter(key: string) {
        updateFilters({[key]: ''} as Partial<FamilyDirectoryFilters>)
    }

    /** 重置筛选与排序 */
    function resetFilters() {
        filters.value = {...DEFAULT_FAMILY_DIRECTORY_FILTERS}
        sortKey.value = DEFAULT_FAMILY_PROFILE_SORT
        page.value = 1
    }

    /** 更新排序方式 */
    function updateSort(nextSortKey: string) {
        if (!isFamilyProfileSortKey(nextSortKey)) return

        sortKey.value = nextSortKey
        page.value = 1
    }

    /** 切换分页 */
    function changePage(nextPage: number) {
        if (nextPage < 1 || nextPage > pageData.value.totalPages) return

        page.value = nextPage
    }

    function updateFavoriteState(profileId: string, favorite: ProfileFavoriteState) {
        if (!response.value) return

        response.value = {
            ...response.value,
            items: response.value.items.map((item) => item.id === profileId ? {...item, favorite} : item),
        }
    }

    /** 切换目录卡片收藏状态 */
    async function toggleFavorite(profileId: string) {
        const current = response.value?.items.find((item) => item.id === profileId)?.favorite
        if (!current?.canFavorite || favoriteUpdatingIds.value.includes(profileId)) return

        favoriteUpdatingIds.value = [...favoriteUpdatingIds.value, profileId]

        try {
            if (current.isFavorite) {
                await removeFavorite(profileId)
                updateFavoriteState(profileId, {isFavorite: false, canFavorite: true})
            } else {
                const result = await addFavorite(profileId)
                updateFavoriteState(profileId, {isFavorite: true, favoriteId: result.favoriteId, canFavorite: true})
            }
        } catch {
            uni.showToast({title: t('directory.favoriteFailed'), icon: 'none'})
        } finally {
            favoriteUpdatingIds.value = favoriteUpdatingIds.value.filter((id) => id !== profileId)
        }
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
        toggleFavorite,
        refresh: load,
    }
}

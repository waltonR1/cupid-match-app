import { computed, ref, watch, type Ref } from 'vue'
import { buildActiveFilterChips, buildSelfDirectoryFilterItems, buildSelfProfileCardViewModel } from '@/mappers/profiles/profile-directory.mapper'
import { getSelfProfileDirectory, type FormatLocale, type SelfProfileDirectoryQuery, type SelfProfileDirectoryResponse, type SelfProfileSortKey } from '@/api/profiles/profiles.client'
import type { SelfDirectoryFilters } from '@/types/profiles/directory'
import type { ProfileDirectoryPageVM } from '@/types/vm/profiles'

type Translate = (key: string) => string

const DEFAULT_FILTERS: SelfDirectoryFilters = {
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

const DEFAULT_SORT: SelfProfileSortKey = 'recentActive'
const PAGE_SIZE = 6

export function useSelfProfileDirectoryPage(t: Translate, locale: Ref<FormatLocale>) {
  const filters = ref<SelfDirectoryFilters>({ ...DEFAULT_FILTERS })
  const sortKey = ref<SelfProfileSortKey>(DEFAULT_SORT)
  const page = ref(1)
  const loading = ref(false)
  const error = ref<unknown>(null)
  const response = ref<SelfProfileDirectoryResponse | null>(null)
  let requestToken = 0

  watch([filters, sortKey, page], () => {
    void load()
  }, { deep: true, immediate: true })

  const pageData = computed<ProfileDirectoryPageVM>(() => {
    const filterItems = buildSelfDirectoryFilterItems(response.value?.facets ?? null, filters.value, locale, t)
    const pagination = response.value?.pagination ?? {
      page: 1,
      pageSize: PAGE_SIZE,
      total: 0,
      totalPages: 1,
    }

    return {
      items: (response.value?.items ?? []).map(profile => ({
        id: profile.id,
        card: buildSelfProfileCardViewModel(profile, locale.value, t),
      })),
      filters: filterItems,
      activeFilters: buildActiveFilterChips(filterItems, filters.value),
      resultSummary: {
        prefix: t('directory.resultPrefix'),
        suffix: t('directory.resultSuffix'),
        pageText: t('directory.pagePrefix'),
        total: pagination.total,
        start: pagination.total ? (pagination.page - 1) * pagination.pageSize + 1 : 0,
        end: pagination.total ? Math.min(pagination.page * pagination.pageSize, pagination.total) : 0,
      },
      resultSort: {
        label: t('toolbar.sortLabel'),
        key: sortKey.value,
        options: [
          { label: t('sort.recentActive'), value: 'recentActive' },
          { label: t('sort.priorityFirst'), value: 'priorityFirst' },
          { label: t('sort.ageAsc'), value: 'ageAsc' },
          { label: t('sort.ageDesc'), value: 'ageDesc' },
        ],
      },
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: pagination.total,
      totalPages: pagination.totalPages,
    }
  })

  async function load() {
    const currentToken = ++requestToken
    loading.value = true
    error.value = null

    try {
      const nextResponse = await getSelfProfileDirectory(buildQuery())
      if (currentToken !== requestToken) return
      response.value = nextResponse
    } catch (requestError) {
      if (currentToken !== requestToken) return
      error.value = requestError
      response.value = null
    } finally {
      if (currentToken === requestToken) {
        loading.value = false
      }
    }
  }

  function buildQuery(): SelfProfileDirectoryQuery {
    return {
      page: page.value,
      pageSize: PAGE_SIZE,
      sort: sortKey.value,
      ...filters.value,
    }
  }

  function updateFilters(nextFilters: Partial<SelfDirectoryFilters>) {
    filters.value = {
      ...filters.value,
      ...nextFilters,
    }
    page.value = 1
  }

  function removeFilter(key: keyof SelfDirectoryFilters) {
    updateFilters({ [key]: '' } as Partial<SelfDirectoryFilters>)
  }

  function resetFilters() {
    filters.value = { ...DEFAULT_FILTERS }
    sortKey.value = DEFAULT_SORT
    page.value = 1
  }

  function updateSort(nextSortKey: string) {
    if (!['recentActive', 'priorityFirst', 'ageAsc', 'ageDesc'].includes(nextSortKey)) return
    sortKey.value = nextSortKey as SelfProfileSortKey
    page.value = 1
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > pageData.value.totalPages) return
    page.value = nextPage
  }

  return {
    loading,
    error,
    filters,
    sortKey,
    pageData,
    updateFilters,
    removeFilter,
    resetFilters,
    updateSort,
    changePage,
    refresh: load,
  }
}

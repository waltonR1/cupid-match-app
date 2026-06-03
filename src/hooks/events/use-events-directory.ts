import { computed, ref, watch } from 'vue'
import { listEvents, type EventsListResponse, type FormatLocale } from '@/api/events'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import {
  buildEventDirectoryQuery,
  DEFAULT_EVENT_DIRECTORY_FILTERS,
  EVENT_DIRECTORY_PAGE_SIZE,
  toEventDirectoryPageData,
} from '@/mappers/events/directory'
import type { Translate } from '@/i18n/types'
import type { EventDirectoryFilters } from '@/types/events/directory'

export function useEventsDirectory(t: Translate, locale: { value: FormatLocale }) {
  const latest = useLatestRequest()
  const filters = ref<EventDirectoryFilters>({ ...DEFAULT_EVENT_DIRECTORY_FILTERS })
  const page = ref(1)
  const response = ref<EventsListResponse | null>(null)

  watch([filters, page, () => locale.value], () => {
    void load()
  }, { deep: true, immediate: true })

  async function load() {
    const nextResponse = await latest.run(() => listEvents(buildEventDirectoryQuery({
      page: page.value,
      pageSize: EVENT_DIRECTORY_PAGE_SIZE,
      filters: filters.value,
    })))

    if (!nextResponse) {
      if (latest.error.value !== null) {
        response.value = null
      }
      return
    }

    response.value = nextResponse
  }

  const pageData = computed(() => toEventDirectoryPageData({
    response: response.value,
    filters: filters.value,
    locale: locale.value,
    t,
  }))

  return {
    loading: latest.loading,
    error: latest.error,
    pageData,
    refresh: load,
  }
}

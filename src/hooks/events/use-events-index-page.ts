import { computed, ref } from 'vue'
import { buildEventsIndexPageViewModel } from '@/mappers/events/event.mapper'
import { listEvents, type EventDTO, type FormatLocale } from '@/api/events/events.client'
import type { EventsIndexPageVM } from '@/types/vm/events'

type Translate = (key: string) => string

export function useEventsIndexPage(t: Translate, locale: { value: FormatLocale }) {
  const loading = ref(false)
  const error = ref<unknown>(null)
  const items = ref<EventDTO[]>([])
  let requestToken = 0

  void load()

  async function load() {
    const currentToken = ++requestToken
    loading.value = true
    error.value = null

    try {
      const response = await listEvents()
      if (currentToken !== requestToken) return
      items.value = response.items
    } catch (requestError) {
      if (currentToken !== requestToken) return
      error.value = requestError
      items.value = []
    } finally {
      if (currentToken === requestToken) {
        loading.value = false
      }
    }
  }

  const pageData = computed<EventsIndexPageVM>(() => buildEventsIndexPageViewModel(items.value, locale.value, t))

  return {
    loading,
    error,
    pageData,
    refresh: load,
  }
}

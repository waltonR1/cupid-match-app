import { computed, ref, watch, type Ref } from 'vue'
import { buildEventDetailPageViewModel } from '@/mappers/events/event.mapper'
import { getEventDetail, type EventDetailResponseDTO, type FormatLocale } from '@/api/events/events.client'
import type { EventDetailPageVM } from '@/types/vm/events'

type Translate = (key: string) => string

export function useEventDetailPage(eventId: Ref<string>, t: Translate, locale: { value: FormatLocale }) {
  const loading = ref(false)
  const error = ref<unknown>(null)
  const payload = ref<EventDetailResponseDTO | null>(null)
  let requestToken = 0

  watch(eventId, () => {
    void load()
  }, { immediate: true })

  async function load() {
    const id = eventId.value
    if (!id) {
      payload.value = null
      return
    }

    const currentToken = ++requestToken
    loading.value = true
    error.value = null

    try {
      const response = await getEventDetail(id)
      if (currentToken !== requestToken) return
      payload.value = response
    } catch (requestError) {
      if (currentToken !== requestToken) return
      error.value = requestError
      payload.value = null
    } finally {
      if (currentToken === requestToken) {
        loading.value = false
      }
    }
  }

  const pageData = computed<EventDetailPageVM>(() => buildEventDetailPageViewModel(payload.value, locale.value, t))

  return {
    loading,
    error,
    pageData,
    refresh: load,
  }
}

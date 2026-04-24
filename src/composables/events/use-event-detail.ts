import { ref, watch, type Ref } from 'vue'
import {
  getEventDetail,
  listEventRelatedProfiles,
  type CupidEvent,
  type EventRelatedProfile,
} from '@/api/modules/events'

export function useEventDetail(eventId: Ref<string>) {
  const event = ref<CupidEvent | null>(null)
  const relatedProfiles = ref<EventRelatedProfile[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  function loadEventDetail() {
    const id = eventId.value

    if (!id) {
      event.value = null
      relatedProfiles.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      event.value = getEventDetail(id)
      relatedProfiles.value = listEventRelatedProfiles(id)
    } catch (requestError) {
      event.value = null
      relatedProfiles.value = []
      error.value = requestError
      console.warn('Failed to load event detail.', requestError)
    } finally {
      loading.value = false
    }
  }

  watch(
    eventId,
    () => {
      loadEventDetail()
    },
    { immediate: true },
  )

  return {
    event,
    relatedProfiles,
    loading,
    error,
    refresh: loadEventDetail,
  }
}

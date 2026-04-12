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
  let requestId = 0

  async function loadEventDetail() {
    const id = eventId.value
    const currentRequestId = ++requestId

    if (!id) {
      event.value = null
      relatedProfiles.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const [eventResponse, relatedProfilesResponse] = await Promise.all([
        getEventDetail(id),
        listEventRelatedProfiles(id),
      ])

      if (currentRequestId !== requestId) return

      event.value = eventResponse.data
      relatedProfiles.value = relatedProfilesResponse.data
    } catch (requestError) {
      if (currentRequestId !== requestId) return

      event.value = null
      relatedProfiles.value = []
      error.value = requestError
      console.warn('Failed to load event detail.', requestError)
    } finally {
      if (currentRequestId === requestId) {
        loading.value = false
      }
    }
  }

  watch(
    eventId,
    () => {
      void loadEventDetail()
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

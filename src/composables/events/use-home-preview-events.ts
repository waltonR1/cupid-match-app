import { onMounted, ref } from 'vue'
import { listHomePreviewEvents, type CupidEvent } from '@/api/modules/events'

export function useHomePreviewEvents() {
  const events = ref<CupidEvent[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  onMounted(() => {
    void loadEvents()
  })

  async function loadEvents() {
    loading.value = true
    error.value = null

    try {
      const response = await listHomePreviewEvents()
      events.value = response.data
    } catch (requestError) {
      events.value = []
      error.value = requestError
      console.warn('Failed to load home preview events.', requestError)
    } finally {
      loading.value = false
    }
  }

  return {
    events,
    loading,
    error,
    refresh: loadEvents,
  }
}

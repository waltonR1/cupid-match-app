import { onMounted, ref } from 'vue'
import { listEvents, type CupidEvent } from '@/api/modules/events'

export function useEvents() {
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
      const response = await listEvents()
      events.value = response.data
    } catch (requestError) {
      events.value = []
      error.value = requestError
      console.warn('Failed to load events.', requestError)
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

import { computed, onMounted, ref } from 'vue'
import { listEvents, type CupidEvent } from '@/api/modules/events'

export function useEvents() {
  const events = ref<CupidEvent[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  onMounted(() => {
    void loadEvents()
  })

  const sortedEvents = computed(() => [...events.value].sort((left, right) => left.date.localeCompare(right.date)))
  const nextEvent = computed(() => sortedEvents.value[0])
  const featuredEvents = computed(() => sortedEvents.value.filter(item => item.status !== 'closed').slice(0, 3))

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
    sortedEvents,
    nextEvent,
    featuredEvents,
    loading,
    error,
    refresh: loadEvents,
  }
}

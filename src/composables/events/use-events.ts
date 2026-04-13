import { computed, onMounted, ref } from 'vue'
import { listEvents, pickLocalized, type CupidEvent, type LocalizedText } from '@/api/modules/events'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { EventFieldLabels, EventOverviewItem, EventStatItem } from '@/types/events'

export function useEvents() {
  const { t, locale } = usePageI18n('events')
  const events = ref<CupidEvent[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  onMounted(() => {
    void loadEvents()
  })

  const sortedEvents = computed(() => [...events.value].sort((left, right) => left.date.localeCompare(right.date)))
  const nextEventCard = computed<EventOverviewItem | undefined>(() => {
    const event = sortedEvents.value[0]
    return event ? buildEventOverviewItem(event) : undefined
  })
  const featuredEventCards = computed(() => {
    return sortedEvents.value
      .filter(item => item.status !== 'closed')
      .map(item => buildEventOverviewItem(item))
  })
  const scheduleEventCards = computed(() => {
    return sortedEvents.value.map(item => buildEventOverviewItem(item))
  })
  const fieldLabels = computed<EventFieldLabels>(() => ({
    date: t('fields.date'),
    city: t('fields.city'),
    venue: t('fields.venue'),
    format: t('fields.format'),
    audience: t('fields.audience'),
    seats: t('fields.seats'),
  }))
  const heroFields = computed(() => ({
    date: fieldLabels.value.date,
    city: fieldLabels.value.city,
    venue: fieldLabels.value.venue,
    format: fieldLabels.value.format,
    seats: fieldLabels.value.seats,
  }))
  const statCards = computed<EventStatItem[]>(() => {
    const openCount = sortedEvents.value.filter(item => item.status === 'open').length
    const waitlistCount = sortedEvents.value.filter(item => item.status === 'waitlist').length
    const cityCount = new Set(sortedEvents.value.map(item => localize(item.city))).size

    return [
      { label: t('stats.totalEvents'), value: String(sortedEvents.value.length) },
      { label: t('stats.openEvents'), value: String(openCount) },
      { label: t('stats.waitlistEvents'), value: String(waitlistCount) },
      { label: t('stats.cities'), value: String(cityCount) },
    ]
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

  function localize(text: LocalizedText) {
    return pickLocalized(locale.value, text)
  }

  function eventStatusLabel(status: EventOverviewItem['status']) {
    return t(`status.${status}`)
  }

  function formatDate(date: string) {
    const map = {
      zh: new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
      fr: new Date(date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
      en: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    } as const

    return map[locale.value]
  }

  function buildEventOverviewItem(event: CupidEvent): EventOverviewItem {
    return {
      id: event.id,
      title: localize(event.title),
      summary: localize(event.summary),
      date: formatDate(event.date),
      city: localize(event.city),
      venue: localize(event.venue),
      format: localize(event.format),
      audience: localize(event.audience),
      seats: `${event.registered} / ${event.seats}`,
      status: event.status,
      statusLabel: eventStatusLabel(event.status),
    }
  }

  return {
    events,
    sortedEvents,
    nextEventCard,
    featuredEventCards,
    scheduleEventCards,
    fieldLabels,
    heroFields,
    statCards,
    loading,
    error,
    refresh: loadEvents,
  }
}

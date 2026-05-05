import { computed, ref, watch } from 'vue'
import { listEvents, type Event, type FormatLocale } from '@/api/events/events'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { formatEventDate } from '@/utils/locale-format'

type Translate = (key: string) => string

export function useEventsDirectory(t: Translate, locale: { value: FormatLocale }) {
  const latest = useLatestRequest()
  const items = ref<Event[]>([])

  watch(() => locale.value, () => {
    void load()
  }, { immediate: true })

  async function load() {
    const response = await latest.run(() => listEvents())
    if (!response) {
      if (latest.error.value !== null) {
        items.value = []
      }
      return
    }
    items.value = response.items
  }

  const pageData = computed(() => {
    const sortedEvents = [...items.value].sort((left, right) => left.date.localeCompare(right.date))
    const fieldLabels = {
      date: t('fields.date'),
      city: t('fields.city'),
      venue: t('fields.venue'),
      format: t('fields.format'),
      audience: t('fields.audience'),
      seats: t('fields.seats'),
    }
    const heroFields = {
      date: fieldLabels.date,
      city: fieldLabels.city,
      venue: fieldLabels.venue,
      format: fieldLabels.format,
      seats: fieldLabels.seats,
    }
    const scheduleEventCards = sortedEvents.map((item) => toEventOverviewItem(item, locale.value, t))
    const featuredEventCards = sortedEvents
      .filter((item) => item.status !== 'closed')
      .slice(0, 3)
      .map((item) => toEventOverviewItem(item, locale.value, t))

    const openCount = sortedEvents.filter((item) => item.status === 'open').length
    const waitlistCount = sortedEvents.filter((item) => item.status === 'waitlist').length
    const cityCount = new Set(sortedEvents.map((item) => item.city)).size

    return {
      fieldLabels,
      heroFields,
      nextEventCard: sortedEvents[0] ? toEventOverviewItem(sortedEvents[0], locale.value, t) : undefined,
      featuredEventCards,
      scheduleEventCards,
      statCards: [
        { label: t('stats.totalEvents'), value: String(sortedEvents.length) },
        { label: t('stats.openEvents'), value: String(openCount) },
        { label: t('stats.waitlistEvents'), value: String(waitlistCount) },
        { label: t('stats.cities'), value: String(cityCount) },
      ],
    }
  })

  return {
    loading: latest.loading,
    error: latest.error,
    pageData,
    refresh: load,
  }
}

function toEventOverviewItem(event: Event, locale: FormatLocale, t: Translate) {
  return {
    id: event.id,
    title: event.title,
    summary: event.summary,
    date: formatEventDate(locale, event.date),
    city: event.city,
    venue: event.venue,
    format: event.format,
    audience: event.audience,
    seats: `${event.registered} / ${event.seats}`,
    status: event.status,
    statusLabel: t(`status.${event.status}`),
  }
}

import { computed, onMounted, ref } from 'vue'
import { listHomePreviewEvents, pickLocalized, type CupidEvent } from '@/api/modules/events'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { EventFieldLabels, EventOverviewItem } from '@/types/events'
import type { HomeEventsPreviewViewModel } from '@/types/home'

export function useHomePreviewEvents() {
  const { locale } = usePageI18n('home')
  const events = ref<CupidEvent[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  onMounted(() => {
    void loadEvents()
  })

  const fieldLabelsByLocale: Record<'zh' | 'fr' | 'en', Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>> = {
    zh: {
      city: '城市',
      venue: '场地',
      format: '形式',
      audience: '适合人群',
      seats: '席位',
    },
    fr: {
      city: 'Ville',
      venue: 'Lieu',
      format: 'Format',
      audience: 'Public',
      seats: 'Places',
    },
    en: {
      city: 'City',
      venue: 'Venue',
      format: 'Format',
      audience: 'Audience',
      seats: 'Seats',
    },
  }

  const statusLabelByLocale = {
    zh: {
      open: '报名中',
      waitlist: '候补',
      closed: '已满额',
    },
    fr: {
      open: 'Ouvert',
      waitlist: 'Attente',
      closed: 'Complet',
    },
    en: {
      open: 'Open',
      waitlist: 'Waitlist',
      closed: 'Full',
    },
  } as const

  const fieldLabels = computed(() => fieldLabelsByLocale[locale.value])

  const eventCards = computed<EventOverviewItem[]>(() =>
    events.value.map(event => ({
      id: event.id,
      date: formatDate(event.date),
      title: localize(event.title),
      summary: localize(event.summary),
      city: localize(event.city),
      venue: localize(event.venue),
      format: localize(event.format),
      audience: localize(event.audience),
      seats: `${event.registered} / ${event.seats}`,
      status: event.status,
      statusLabel: statusLabelByLocale[locale.value][event.status],
    })),
  )

  const viewModel = computed<HomeEventsPreviewViewModel>(() => ({
    fieldLabels: fieldLabels.value,
    events: eventCards.value,
  }))

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

  function localize(text: CupidEvent['title']) {
    return pickLocalized(locale.value, text)
  }

  function formatDate(date: string) {
    const value = new Date(date)

    if (locale.value === 'zh') {
      return value.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
    }

    if (locale.value === 'fr') {
      return value.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
    }

    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return {
    events,
    eventCards,
    fieldLabels,
    viewModel,
    loading,
    error,
    refresh: loadEvents,
  }
}

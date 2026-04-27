import { computed, ref } from 'vue'
import { listEvents, type EventDTO, type FormatLocale, type LocalizedTextDTO } from '@/api/events/events'
import type { HomeEventsViewModel } from '@/types/home/view'
import { formatEventDate } from '@/utils/locale-format'

type Translate = (key: string) => string

export function useHomeEvents(t: Translate, locale: { value: FormatLocale }) {
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

  const viewModel = computed<HomeEventsViewModel>(() => ({
    fieldLabels: {
      city: t('fields.city'),
      venue: t('fields.venue'),
      format: t('fields.format'),
      audience: t('fields.audience'),
      seats: t('fields.seats'),
    },
    events: items.value
      .filter(item => item.status !== 'closed')
      .slice(0, 3)
      .map(item => ({
        id: item.id,
        title: localizeText(locale.value, item.title),
        summary: localizeText(locale.value, item.summary),
        date: formatEventDate(locale.value, item.date),
        city: localizeText(locale.value, item.city),
        venue: localizeText(locale.value, item.venue),
        format: localizeText(locale.value, item.format),
        audience: localizeText(locale.value, item.audience),
        seats: `${item.registered} / ${item.seats}`,
        status: item.status,
        statusLabel: t(`status.${item.status}`),
      })),
  }))

  return {
    loading,
    error,
    viewModel,
    refresh: load,
  }
}

function localizeText(locale: FormatLocale, text: LocalizedTextDTO) {
  return text[locale] || text.en || ''
}
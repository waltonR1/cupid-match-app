import { computed, ref, watch } from 'vue'
import { listEvents, type Event, type FormatLocale } from '@/api/events'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import type { HomeEventsViewModel } from '@/types/home/view'
import { formatEventDate } from '@/utils/locale-format'

type Translate = (key: string) => string

export function useHomeEvents(t: Translate, locale: { value: FormatLocale }) {
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

  const viewModel = computed<HomeEventsViewModel>(() => ({
    fieldLabels: {
      city: t('fields.city'),
      venue: t('fields.venue'),
      format: t('fields.format'),
      audience: t('fields.audience'),
      seats: t('fields.seats'),
    },
    events: items.value
      .filter((item) => item.status !== 'closed')
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        date: formatEventDate(locale.value, item.date),
        city: item.city,
        venue: item.venue,
        format: item.format,
        audience: item.audience,
        seats: `${item.registered} / ${item.seats}`,
        status: item.status,
        statusLabel: t(`status.${item.status}`),
      })),
  }))

  return {
    loading: latest.loading,
    error: latest.error,
    viewModel,
    refresh: load,
  }
}

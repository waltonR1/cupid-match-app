import { computed, ref, watch } from 'vue'
import { listEvents, type EventDirectoryItem, type FormatLocale } from '@/api/events'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toEventOverviewItem } from '@/mappers/events/directory'
import type { Translate } from '@/i18n/types'
import {useOptionsStore} from '@/stores/modules/options'
import type { EventPreviewSectionViewModel } from '@/types/events/card'

export function useHomeEvents(t: Translate, locale: { value: FormatLocale }) {
  const latest = useLatestRequest()
  const optionsStore = useOptionsStore()
  const items = ref<EventDirectoryItem[]>([])

  watch(() => locale.value, value => {
    void optionsStore.ensureOptions(value)
    void load()
  }, { immediate: true })

  async function load() {
    const response = await latest.run(() => listEvents({ page: 1, pageSize: 3 }))
    if (!response) {
      if (latest.error.value !== null) {
        items.value = []
      }
      return
    }
    items.value = response.items
  }

  function optionLabel(group: string, value: string): string {
    return optionsStore.optionsFor(locale.value, group)
      .find(option => option.value === value)?.label ?? value
  }

  const viewModel = computed<EventPreviewSectionViewModel>(() => ({
    fieldLabels: {
      city: t('fields.city'),
      venue: t('fields.venue'),
      format: t('fields.format'),
      audience: t('fields.audience'),
      seats: t('fields.seats'),
    },
    events: items.value.map((item) => toEventOverviewItem(item, locale.value, t, optionLabel)),
  }))

  return {
    loading: latest.loading,
    error: latest.error,
    viewModel,
    refresh: load,
  }
}

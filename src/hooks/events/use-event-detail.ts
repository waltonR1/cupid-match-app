import { computed, ref, watch, type Ref } from 'vue'
import {
  cancelEventRegistration,
  getEventDetail,
  registerForEvent,
  type EventDetail,
  type FormatLocale,
} from '@/api/events'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { mergeEventRegistration, toEventDetailPageData } from '@/mappers/events/detail'
import type { Translate } from '@/i18n/types'
import {useOptionsStore} from '@/stores/modules/options'

export function useEventDetail(eventId: Ref<string>, t: Translate, locale: { value: FormatLocale }) {
  const latest = useLatestRequest()
  const actionRequest = useLatestRequest()
  const optionsStore = useOptionsStore()
  const event = ref<EventDetail | null>(null)

  watch(() => locale.value, value => {
    void optionsStore.ensureOptions(value)
  }, { immediate: true })

  watch([eventId, () => locale.value], () => {
    void load()
  }, { immediate: true })

  async function load() {
    const id = eventId.value
    if (!id) {
      event.value = null
      return
    }

    const response = await latest.run(() => getEventDetail(id))
    if (!response) {
      if (latest.error.value !== null) {
        event.value = null
      }
      return
    }

    event.value = response
  }

  async function register() {
    if (!event.value) return

    const response = await actionRequest.run(() => registerForEvent(event.value!.id))
    if (response && event.value) {
      event.value = mergeEventRegistration(event.value, response)
    }
  }

  async function cancelRegistration() {
    if (!event.value) return

    const response = await actionRequest.run(() => cancelEventRegistration(event.value!.id))
    if (response && event.value) {
      event.value = mergeEventRegistration(event.value, response)
    }
  }

  function optionLabel(group: string, value: string): string {
    return optionsStore.labelFor(locale.value, group, value) ?? value
  }

  const pageData = computed(() => toEventDetailPageData({
    event: event.value,
    locale: locale.value,
    t,
    actionLoading: actionRequest.loading.value,
    optionLabel,
  }))

  return {
    loading: latest.loading,
    error: latest.error,
    actionLoading: actionRequest.loading,
    actionError: actionRequest.error,
    pageData,
    register,
    cancelRegistration,
    refresh: load,
  }
}

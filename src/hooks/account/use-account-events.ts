import { computed, ref } from 'vue'
import { getAccountEvents, type AccountEventRegistrationDTO } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountEventsPageData } from '@/mappers/account-events'
import type { FormatLocale } from '@/utils/locale-format'

export function useAccountEvents(locale: () => FormatLocale) {
  const latest = useLatestRequest()
  const registrations = ref<AccountEventRegistrationDTO[]>([])

  void load()

  async function load() {
    const data = await latest.run(() => getAccountEvents())
    if (data) registrations.value = data
  }

  const pageData = computed(() => toAccountEventsPageData({
    registrations: registrations.value,
    locale: locale(),
  }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

import { computed, ref, watch } from 'vue'
import { getAccountEvents, type AccountEventRegistrationDTO } from '@/api/account'
import { useAuthStore } from '@/stores/modules/auth'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountEventsPageData } from '@/mappers/account-events'
import type { FormatLocale } from '@/utils/locale-format'

export function useAccountEvents(locale: () => FormatLocale) {
  const authStore = useAuthStore()
  const latest = useLatestRequest()
  const registrations = ref<AccountEventRegistrationDTO[]>([])
  const currentUserId = computed(() => authStore.user?.id ?? '')

  watch(currentUserId, () => { void load() }, { immediate: true })

  async function load() {
    if (!currentUserId.value) {
      registrations.value = []
      return
    }
    const data = await latest.run(() => getAccountEvents())
    if (data) registrations.value = data
  }

  const pageData = computed(() => toAccountEventsPageData({
    registrations: registrations.value,
    locale: locale(),
  }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

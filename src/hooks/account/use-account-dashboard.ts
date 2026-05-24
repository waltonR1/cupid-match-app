import { computed, ref } from 'vue'
import { getAccountDashboard, type AccountDashboardDTO } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountHomePageData } from '@/mappers/account-home'
import type { Translate } from '@/i18n/types'

export function useAccountDashboard(t: Translate) {
  const latest = useLatestRequest()
  const payload = ref<AccountDashboardDTO | null>(null)

  void load()

  async function load() {
    const data = await latest.run(() => getAccountDashboard())
    if (data) payload.value = data
  }

  const pageData = computed(() => toAccountHomePageData({ payload: payload.value, t }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

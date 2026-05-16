import { computed, ref, watch } from 'vue'
import { getAccountDashboard, type AccountDashboardDTO } from '@/api/account'
import { useAuthStore } from '@/stores/modules/auth'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountHomePageData } from '@/mappers/account-home'
import type { Translate } from '@/i18n/types'

export function useAccountDashboard(t: Translate) {
  const authStore = useAuthStore()
  const latest = useLatestRequest()
  const payload = ref<AccountDashboardDTO | null>(null)

  const currentUserId = computed(() => authStore.user?.id ?? '')

  watch(currentUserId, () => { void load() }, { immediate: true })

  async function load() {
    if (!currentUserId.value) { payload.value = null; return }
    const data = await latest.run(() => getAccountDashboard())
    if (data) payload.value = data
  }

  const pageData = computed(() => toAccountHomePageData({ payload: payload.value, t }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

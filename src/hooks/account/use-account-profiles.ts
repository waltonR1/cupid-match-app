import { computed, ref, watch } from 'vue'
import { getAccountProfiles, type AccountProfilesDTO } from '@/api/account'
import { useAuthStore } from '@/stores/modules/auth'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountProfilesPageData } from '@/mappers/account-profiles'
import type { Translate } from '@/i18n/types'

export function useAccountProfiles(t: Translate) {
  const authStore = useAuthStore()
  const latest = useLatestRequest()
  const payload = ref<AccountProfilesDTO | null>(null)
  const currentUserId = computed(() => authStore.user?.id ?? '')

  watch(currentUserId, () => { void load() }, { immediate: true })

  async function load() {
    if (!currentUserId.value) { payload.value = null; return }
    const data = await latest.run(() => getAccountProfiles())
    if (data) payload.value = data
  }

  const pageData = computed(() => toAccountProfilesPageData({ payload: payload.value, t }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

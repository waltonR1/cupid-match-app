import { computed, ref } from 'vue'
import { getAccountProfiles, type AccountProfilesDTO } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountProfilesPageData } from '@/mappers/account-profiles'
import type { Translate } from '@/i18n/types'

export function useAccountProfiles(t: Translate) {
  const latest = useLatestRequest()
  const payload = ref<AccountProfilesDTO | null>(null)

  void load()

  async function load() {
    const data = await latest.run(() => getAccountProfiles())
    if (data) payload.value = data
  }

  const pageData = computed(() => toAccountProfilesPageData({ payload: payload.value, t }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

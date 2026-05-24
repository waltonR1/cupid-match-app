import { ref } from 'vue'
import { getAccountProfiles, type AccountProfilesDTO } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useAccountProfiles() {
  const latest = useLatestRequest()
  const payload = ref<AccountProfilesDTO | null>(null)

  void load()

  async function load() {
    const data = await latest.run(() => getAccountProfiles())
    if (data) payload.value = data
  }

  return { loading: latest.loading, error: latest.error, payload, refresh: load }
}

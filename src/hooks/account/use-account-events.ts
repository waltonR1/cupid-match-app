import { ref } from 'vue'
import { getAccountEvents, type AccountEventRegistrationDTO } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useAccountEvents() {
  const latest = useLatestRequest()
  const registrations = ref<AccountEventRegistrationDTO[]>([])

  void load()

  async function load() {
    const data = await latest.run(() => getAccountEvents())
    if (data) registrations.value = data
  }

  return { loading: latest.loading, error: latest.error, registrations, refresh: load }
}

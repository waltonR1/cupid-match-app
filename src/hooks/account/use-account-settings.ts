import { ref } from 'vue'
import {
  getAccountSettings,
  updateAccountMe,
  updateAccountPreferences,
  type AccountPreferenceUpdatePayload,
  type AccountSettingsDTO,
  type AccountMeUpdatePayload,
} from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useAccountSettings() {
  const latest = useLatestRequest()
  const settings = ref<AccountSettingsDTO | null>(null)

  void load()

  async function load() {
    const data = await latest.run(() => getAccountSettings())
    if (data) settings.value = data
  }

  async function saveAccount(payload: AccountMeUpdatePayload) {
    const data = await latest.run(() => updateAccountMe(payload))
    if (data) await load()
  }

  async function savePreferences(payload: AccountPreferenceUpdatePayload) {
    const data = await latest.run(() => updateAccountPreferences(payload))
    if (data) settings.value = data
  }

  return {
    loading: latest.loading,
    error: latest.error,
    settings,
    refresh: load,
    saveAccount,
    savePreferences,
  }
}

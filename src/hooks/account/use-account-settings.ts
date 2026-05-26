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
import { useAuthStore } from '@/stores/modules/auth'

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
    if (!data) return false

    const authStore = useAuthStore()
    if (authStore.user) {
      if (payload.accountName !== undefined) authStore.user.accountName = payload.accountName
      if (payload.avatarUrl !== undefined) authStore.user.avatarUrl = payload.avatarUrl
    }
    await load()
    return true
  }

  async function savePreferences(payload: AccountPreferenceUpdatePayload) {
    const data = await latest.run(() => updateAccountPreferences(payload))
    if (!data) return false
    settings.value = data
    return true
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

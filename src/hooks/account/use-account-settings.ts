import { ref } from 'vue'
import {
  changeAccountPassword,
  getAccountSettings,
  updateAccountMe,
  updateAccountPreferences,
  type AccountPasswordChangePayload,
  type AccountPreferenceUpdatePayload,
  type AccountSettingsDTO,
  type AccountMeUpdatePayload,
} from '@/api/account'
import { uploadImage } from '@/api/upload/upload'
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
      const preferredLocale = isAuthLocale(data.user.preferredLocale)
        ? data.user.preferredLocale
        : authStore.user.preferredLocale
      authStore.user = {
        ...authStore.user,
        accountName: data.user.accountName,
        avatarUrl: data.user.avatarUrl,
        preferredLocale,
      }
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

  async function uploadAvatar(filePath: string) {
    return uploadImage(filePath)
  }

  async function changePassword(payload: AccountPasswordChangePayload) {
    const data = await latest.run(() => changeAccountPassword(payload))
    return data ?? null
  }

  return {
    loading: latest.loading,
    error: latest.error,
    settings,
    refresh: load,
    saveAccount,
    savePreferences,
    uploadAvatar,
    changePassword,
  }
}

function isAuthLocale(value: string): value is 'zh' | 'fr' | 'en' {
  return value === 'zh' || value === 'fr' || value === 'en'
}

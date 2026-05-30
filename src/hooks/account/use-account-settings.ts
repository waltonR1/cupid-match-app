import { ref } from 'vue'
import {
  changeAccountPassword,
  getAccountSettings,
  requestAccountExport,
  requestAccountExportDownload,
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

  async function exportData() {
    const result = await latest.run(() => requestAccountExport())
    if (!result?.downloadUrl) return false

    const data = await latest.run(() => requestAccountExportDownload(result.downloadUrl))
    if (!data) return false

    downloadJsonFile('account-export.json', data)
    return true
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
    exportData,
  }
}

function isAuthLocale(value: string): value is 'zh' | 'fr' | 'en' {
  return value === 'zh' || value === 'fr' || value === 'en'
}

function downloadJsonFile(filename: string, data: unknown) {
  const documentRef = globalThis.document
  if (!documentRef) {
    throw new Error('Browser download is only available in H5 runtime.')
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = documentRef.createElement('a')
  link.href = url
  link.download = filename
  documentRef.body.appendChild(link)
  link.click()
  documentRef.body.removeChild(link)
  URL.revokeObjectURL(url)
}

import { computed, ref, watch } from 'vue'
import { getAccountSettings, type AccountSettingsDTO } from '@/api/account'
import { useAuthStore } from '@/stores/modules/auth'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountSettingsPageData } from '@/mappers/account-settings'
import type { Translate } from '@/i18n/types'
import { useLocaleStore } from '@/stores/modules/locale'

export function useAccountSettings(t: Translate) {
  const authStore = useAuthStore()
  const localeStore = useLocaleStore()
  const latest = useLatestRequest()
  const settings = ref<AccountSettingsDTO | null>(null)
  const currentUserId = computed(() => authStore.user?.id ?? '')

  watch(currentUserId, () => { void load() }, { immediate: true })

  async function load() {
    if (!currentUserId.value) {
      settings.value = null
      return
    }

    const data = await latest.run(() => getAccountSettings())
    if (data) settings.value = data
  }

  const pageData = computed(() => toAccountSettingsPageData({
    settings: settings.value,
    t,
    locale: localeStore.locale,
  }))

  return {
    loading: latest.loading,
    error: latest.error,
    pageData, refresh: load,
  }
}

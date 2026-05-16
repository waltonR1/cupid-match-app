import { computed, ref, watch } from 'vue'
import { getAccountProfileDetail, type AccountProfileDetailDTO } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountProfileDetailPageData } from '@/mappers/account-profile-detail'
import { useAuthStore } from '@/stores/modules/auth'
import type { Translate } from '@/i18n/types'
import type { FormatLocale } from '@/utils/locale-format'

export function useAccountProfileDetail(profileId: () => string, t: Translate, locale: () => FormatLocale) {
  const authStore = useAuthStore()
  const latest = useLatestRequest()
  const payload = ref<AccountProfileDetailDTO | null>(null)
  const currentUserId = computed(() => authStore.user?.id ?? '')

  watch([profileId, currentUserId], () => {
    void load()
  }, { immediate: true })

  async function load() {
    if (!currentUserId.value || !profileId()) {
      payload.value = null
      return
    }

    const data = await latest.run(() => getAccountProfileDetail(profileId()))
    if (data) payload.value = data
  }

  const pageData = computed(() => toAccountProfileDetailPageData({
    payload: payload.value,
    t,
    locale: locale(),
  }))
  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

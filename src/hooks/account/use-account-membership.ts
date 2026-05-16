import { computed, ref, watch } from 'vue'
import {
  getAccountMembership,
  type AccountEntitlementBalanceDTO,
  type AccountMembershipDTO,
  type MembershipPlanDTO,
} from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { useAuthStore } from '@/stores/modules/auth'
import { toAccountMembershipPageData } from '@/mappers/account-membership'
import type { Translate } from '@/i18n/types'
import type { FormatLocale } from '@/utils/locale-format'

export function useAccountMembership(t: Translate, locale: () => FormatLocale) {
  const authStore = useAuthStore()
  const latest = useLatestRequest()
  const membership = ref<AccountMembershipDTO | null>(null)
  const entitlements = ref<AccountEntitlementBalanceDTO[]>([])
  const availablePlans = ref<MembershipPlanDTO[]>([])
  const currentUserId = computed(() => authStore.user?.id ?? '')

  watch(currentUserId, () => { void load() }, { immediate: true })

  async function load() {
    if (!currentUserId.value) {
      membership.value = null
      entitlements.value = []
      availablePlans.value = []
      return
    }

    const data = await latest.run(() => getAccountMembership())
    if (data) {
      membership.value = data.membership
      entitlements.value = data.entitlements
      availablePlans.value = data.availablePlans
    }
  }

  const pageData = computed(() => toAccountMembershipPageData({
    membership: membership.value,
    entitlements: entitlements.value,
    availablePlans: availablePlans.value,
    t,
    locale: locale(),
  }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load }
}

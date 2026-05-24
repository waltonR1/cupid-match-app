import { computed, ref } from 'vue'
import {
  getAccountMembership,
  requestAccountMembershipUpgrade,
  type AccountEntitlementBalanceDTO,
  type AccountMembershipDTO,
  type AccountMembershipUpgradePayload,
  type MembershipPlanDTO,
} from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountMembershipPageData } from '@/mappers/account-membership'
import type { Translate } from '@/i18n/types'
import type { FormatLocale } from '@/utils/locale-format'

export function useAccountMembership(t: Translate, locale: () => FormatLocale) {
  const latest = useLatestRequest()
  const membership = ref<AccountMembershipDTO | null>(null)
  const entitlements = ref<AccountEntitlementBalanceDTO[]>([])
  const availablePlans = ref<MembershipPlanDTO[]>([])

  void load()

  async function load() {
    const data = await latest.run(() => getAccountMembership())
    if (data) {
      membership.value = data.membership
      entitlements.value = data.entitlements
      availablePlans.value = data.availablePlans
    }
  }

  async function requestUpgrade(tier: AccountMembershipUpgradePayload['tier']) {
    return latest.run(() => requestAccountMembershipUpgrade({tier}))
  }

  const pageData = computed(() => toAccountMembershipPageData({
    membership: membership.value,
    entitlements: entitlements.value,
    availablePlans: availablePlans.value,
    t,
    locale: locale(),
  }))

  return { loading: latest.loading, error: latest.error, pageData, refresh: load, requestUpgrade }
}

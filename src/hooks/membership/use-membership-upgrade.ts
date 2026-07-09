import {requestAccountMembershipUpgrade, type AccountMembershipLevel} from '@/api/account'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {useAuthStore} from '@/stores/modules/auth'

export type MembershipUpgradeActionResult =
  | { status: 'login_required' }
  | { status: 'free_plan' }
  | Awaited<ReturnType<typeof requestAccountMembershipUpgrade>>

export function useMembershipUpgrade() {
  const authStore = useAuthStore()
  const latest = useLatestRequest()

  async function requestUpgrade(tier: AccountMembershipLevel): Promise<MembershipUpgradeActionResult | undefined> {
    if (tier === 'free') {
      return {status: 'free_plan'}
    }
    if (!authStore.isLoggedIn) {
      return {status: 'login_required'}
    }

    return latest.run(() => requestAccountMembershipUpgrade({tier}))
  }

  return {
    loading: latest.loading,
    error: latest.error,
    requestUpgrade,
  }
}

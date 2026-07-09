import {ref} from 'vue'
import {
    getAccountMembership,
    requestAccountMembershipUpgrade,
    type AccountEntitlementBalanceDTO,
    type AccountMembershipDTO,
    type AccountMembershipUpgradePayload,
    type MembershipPlanDTO,
} from '@/api/account'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {useAuthStore} from '@/stores/modules/auth'

export function useAccountMembership() {
    const authStore = useAuthStore()
    const latest = useLatestRequest()
    const membership = ref<AccountMembershipDTO | null>(null)
    const entitlements = ref<AccountEntitlementBalanceDTO[]>([])
    const availablePlans = ref<MembershipPlanDTO[]>([])

    void load()

    async function load() {
        if (!authStore.isLoggedIn) return

        const data = await latest.run(() => getAccountMembership())
        if (data) {
            membership.value = data.membership
            entitlements.value = data.entitlements
            availablePlans.value = data.availablePlans
            if (data.membership) {
                authStore.updateMembership({tier: data.membership.tier, status: data.membership.status})
            }
        }
    }

    async function requestUpgrade(tier: AccountMembershipUpgradePayload['tier']) {
        if (!authStore.isLoggedIn) return undefined

        return latest.run(() => requestAccountMembershipUpgrade({tier}))
    }

    return {
        loading: latest.loading,
        error: latest.error,
        membership,
        entitlements,
        availablePlans,
        refresh: load,
        requestUpgrade
    }
}

import { ref } from 'vue'
import { getMembershipPlans } from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toMembershipPlanViewModel } from '@/mappers/membership-plans'
import type { MembershipPlanViewModel } from '@/types/membership/view'

export function useMembershipPlans() {
  const latest = useLatestRequest()
  const plans = ref<MembershipPlanViewModel[]>([])

  void load()

  async function load() {
    const data = await latest.run(() => getMembershipPlans())
    if (data) plans.value = data.map(toMembershipPlanViewModel)
  }

  return { plans, loading: latest.loading, error: latest.error, refresh: load }
}

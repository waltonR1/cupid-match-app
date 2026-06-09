import {computed, ref, watch, type Ref} from 'vue'
import {getMembershipCatalog, type MembershipPlanDTO} from '@/api/membership'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import {toMembershipPlanViewModel} from '@/mappers/membership/catalog'

export function useMembershipCatalog(t: Translate, locale: Ref<string>) {
  const latest = useLatestRequest()
  const plans = ref<MembershipPlanDTO[]>([])

  watch(locale, () => {
    void load()
  }, {immediate: true})

  async function load() {
    const data = await latest.run(() => getMembershipCatalog())
    if (data) plans.value = data.plans
  }

  return {
    loading: latest.loading,
    error: latest.error,
    plans: computed(() => plans.value.map((plan) => toMembershipPlanViewModel(plan, t))),
    refresh: load,
  }
}

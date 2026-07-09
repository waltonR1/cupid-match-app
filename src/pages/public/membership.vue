<template>
  <AppPageLayout>
    <!-- 会员页 Hero 区 -->
    <MembershipHero
        :plans="plans"
        @open-plan="handlePlanAction"
        @open-compare="openCompare"
    />

    <!-- 会员等级区 -->
    <MembershipTiersSection :plans="plans" :current-tier="membership?.tier" @open-plan="handlePlanAction"/>

    <!-- 会员规则说明区 -->
    <MembershipRulesSection @open-plan="handlePlanAction"/>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import MembershipHero from '@/components/membership/MembershipHero.vue'
import MembershipRulesSection from '@/components/membership/MembershipRulesSection.vue'
import MembershipTiersSection from '@/components/membership/MembershipTiersSection.vue'
import {openMembershipPaymentResultPage, openRegisterPage} from '@/utils/navigation'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {useMembershipCatalog, useMembershipUpgrade} from '@/hooks/membership'
import type {MembershipTier} from '@/api/membership'
import {useAccountMembership} from '@/hooks/account'
import {useAuthStore} from '@/stores/modules/auth'

const {t, locale} = usePageI18n('membership')
const {plans} = useMembershipCatalog(t, locale)
const {requestUpgrade} = useMembershipUpgrade()
const authStore = useAuthStore()
const {membership} = useAccountMembership()

/** 滚动到会员方案对比区 */
function openCompare() {
  uni.pageScrollTo({
    selector: '#membership-compare',
    duration: 280,
  })
}

async function handlePlanAction(plan: string) {
  if (plan === 'vip') {
    openCompare()
    return
  }
  if (plan === 'free') {
    openRegisterPage()
    return
  }
  if (!authStore.isLoggedIn) {
    openRegisterPage()
    return
  }
  if (membership.value && tierRank(plan as MembershipTier) <= tierRank(membership.value.tier)) {
    return
  }

  const result = await requestUpgrade(plan as MembershipTier)
  if (result?.status === 'login_required') {
    openRegisterPage()
    return
  }
  if (result?.status === 'checkout_required' && result.checkoutUrl) {
    // #ifdef H5
    window.location.href = result.checkoutUrl
    // #endif
    // #ifndef H5
    openMembershipPaymentResultPage(result.orderId)
    // #endif
  }
}

const tierOrder: MembershipTier[] = ['free', 'silver', 'gold', 'diamond']

function tierRank(tier: MembershipTier) {
  return tierOrder.indexOf(tier)
}
</script>

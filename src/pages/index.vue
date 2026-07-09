<template>
  <AppPageLayout>
    <HomeHero/>
    <HomeVision/>

    <HomeProfiles :profiles="profiles"/>

    <HomeFamily/>

    <HomeEvents :view-model="eventsPreview"/>

    <HomeFeatures/>
    <HomeAudience/>
    <HomeMembership
        :plans="membershipPlans"
        :current-tier="membership?.tier"
        @open-plan="handleMembershipPlanAction"
    />
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import HomeAudience from '@/components/home/HomeAudience.vue'
import HomeEvents from '@/components/home/HomeEvents.vue'
import HomeFamily from '@/components/home/HomeFamily.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeMembership from '@/components/home/HomeMembership.vue'
import HomeProfiles from '@/components/home/HomeProfiles.vue'
import HomeVision from '@/components/home/HomeVision.vue'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {useHomeEvents} from '@/hooks/events'
import {useHomeSelfProfiles} from '@/hooks/profiles'
import {useMembershipCatalog, useMembershipUpgrade} from '@/hooks/membership'
import {useAccountMembership} from '@/hooks/account'
import {useAuthStore} from '@/stores/modules/auth'
import {openMembershipPaymentResultPage, openRegisterPage} from '@/utils/navigation'
import type {MembershipTier} from '@/api/membership'

const {t: profileT, locale} = usePageI18n('self')
const {t: eventsT} = usePageI18n('events')
const {t: membershipT} = usePageI18n('membership')
const {featuredProfiles: profiles} = useHomeSelfProfiles(profileT, locale)
const {viewModel: eventsPreview} = useHomeEvents(eventsT, locale)
const {plans: membershipPlans} = useMembershipCatalog(membershipT, locale)
const {requestUpgrade} = useMembershipUpgrade()
const {membership} = useAccountMembership()
const authStore = useAuthStore()

async function handleMembershipPlanAction(plan: MembershipTier) {
  if (plan === 'free') {
    openRegisterPage()
    return
  }
  if (!authStore.isLoggedIn) {
    openRegisterPage()
    return
  }
  if (membership.value && tierRank(plan) <= tierRank(membership.value.tier)) {
    return
  }

  const result = await requestUpgrade(plan)
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

<template>
  <AppPageLayout>
    <!-- 会员页 Hero 区 -->
    <MembershipHero :plans="plans" @open-plan="openRegisterPage" @open-compare="openCompare" />

    <MembershipTiersSection :plans="plans" @open-plan="openRegisterPage"/>

    <!-- 会员规则说明区 -->
    <MembershipRulesSection @open-plan="openRegisterPage"/>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import MembershipHero from '@/components/membership/MembershipHero.vue'
import MembershipRulesSection from '@/components/membership/MembershipRulesSection.vue'
import MembershipTiersSection from '@/components/membership/MembershipTiersSection.vue'
import { useMembershipPlans } from '@/hooks/membership/use-membership-plans'
import { openRegisterPage } from '@/utils/navigation'

const { plans } = useMembershipPlans()

function openCompare() {
  uni.pageScrollTo({ selector: '#membership-compare', duration: 280 })
}
</script>
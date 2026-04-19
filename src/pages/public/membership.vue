<template>
  <AppPageLayout>
    <MembershipHero
      @open-plan="openPlan"
      @open-compare="openCompare"
    />
    <MembershipTiersSection @open-plan="openPlan" />
    <MembershipRulesSection @open-plan="openPlan" />
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import MembershipHero from '@/components/membership/MembershipHero.vue'
import MembershipRulesSection from '@/components/membership/MembershipRulesSection.vue'
import MembershipTiersSection from '@/components/membership/MembershipTiersSection.vue'
import { openRegisterPage } from '@/utils/navigation'



function openPlan() {
  openRegisterPage()
}

function openCompare() {
  uni.pageScrollTo({
    selector: '#membership-compare',
    duration: 280,
  })
}

</script>

<template>
  <AppPageLayout>
    <MembershipHero
      @open-plan="openRegisterPage"
      @open-compare="openCompare"
    />
    <MembershipTiersSection @open-plan="openRegisterPage" />
    <MembershipRulesSection @open-plan="openRegisterPage" />
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import MembershipHero from '@/components/membership/MembershipHero.vue'
import MembershipRulesSection from '@/components/membership/MembershipRulesSection.vue'
import MembershipTiersSection from '@/components/membership/MembershipTiersSection.vue'
import { openRegisterPage } from '@/utils/navigation'



function openCompare() {
  uni.pageScrollTo({
    selector: '#membership-compare',
    duration: 280,
  })
}

</script>

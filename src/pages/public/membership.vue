<template>
  <AppPageLayout>
    <!-- 会员页 Hero 区 -->
    <MembershipHero
        @open-plan="openRegisterPage"
        @open-compare="openCompare"
    />

    <!-- 会员等级区 -->
    <MembershipTiersSection @open-plan="openRegisterPage"/>

    <!-- 会员规则说明区 -->
    <MembershipRulesSection @open-plan="openRegisterPage"/>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import MembershipHero from '@/components/membership/MembershipHero.vue'
import MembershipRulesSection from '@/components/membership/MembershipRulesSection.vue'
import MembershipTiersSection from '@/components/membership/MembershipTiersSection.vue'
import {openRegisterPage} from '@/utils/navigation'

/** 滚动到会员方案对比区 */
function openCompare() {
  uni.pageScrollTo({
    selector: '#membership-compare',
    duration: 280,
  })
}
</script>
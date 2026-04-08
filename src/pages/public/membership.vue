<template>
  <view class="min-h-screen bg-next-semantic-page-default text-next-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.membership"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <MembershipHero
      @open-plan="openPlan"
      @open-compare="openCompare"
    />
    <MembershipTiersSection @open-plan="openPlan" />
    <MembershipRulesSection @open-plan="openPlan" />

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import MembershipHero from '@/components/membership/MembershipHero.vue'
import MembershipRulesSection from '@/components/membership/MembershipRulesSection.vue'
import MembershipTiersSection from '@/components/membership/MembershipTiersSection.vue'
import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function openPlan(plan: string) {
  openRegisterPage(plan)
}

function openCompare() {
  uni.pageScrollTo({
    selector: '#membership-compare',
    duration: 280,
  })
}

function handleRegisterClick() {
  openRegisterPage('vip')
}
</script>

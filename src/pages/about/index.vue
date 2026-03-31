<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.about"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <AboutHeroSection />
    <AboutOriginSection />
    <AboutAudienceSection />
    <AboutDifferenceSection />
    <AboutValuesSection />

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AboutHeroSection from '@/components/about/AboutHeroSection.vue'
import AboutOriginSection from '@/components/about/AboutOriginSection.vue'
import AboutAudienceSection from '@/components/about/AboutAudienceSection.vue'
import AboutDifferenceSection from '@/components/about/AboutDifferenceSection.vue'
import AboutValuesSection from '@/components/about/AboutValuesSection.vue'

import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.about"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <AboutHero />
    <AboutOrigin />
    <AboutAudience />
    <AboutDifference />
    <AboutValues />

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AboutHero from '@/components/about/AboutHero.vue'
import AboutOrigin from '@/components/about/AboutOrigin.vue'
import AboutAudience from '@/components/about/AboutAudience.vue'
import AboutDifference from '@/components/about/AboutDifference.vue'
import AboutValues from '@/components/about/AboutValues.vue'

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

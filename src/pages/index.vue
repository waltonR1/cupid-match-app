<template>
  <view class="min-h-screen bg-next-semantic-page-default text-next-semantic-text-primary">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <!-- Hero -->
    <HomeHero/>
    <!-- 愿景 -->
    <HomeVision/>

    <HomeProfilesPreview />

    <HomeFamily />

    <HomeEventsPreview />

    <!-- 核心功能 -->
    <HomeFeatures/>

    <!-- 为谁而生 -->
    <HomeAudience />

    <!-- 会员体系 -->
    <HomeMembership />

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'
import HomeVision from "@/components/home/HomeVision.vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeFeatures from "@/components/home/HomeFeatures.vue";
import HomeMembership from "@/components/home/HomeMembership.vue";
import HomeAudience from '@/components/home/HomeAudience.vue'
import HomeEventsPreview from "@/components/home/HomeEventsPreview.vue";
import HomeProfilesPreview from "@/components/home/HomeProfilesPreview.vue";
import HomeFamily from "@/components/home/HomeFamily.vue";

const navList = NAV_LIST


function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>

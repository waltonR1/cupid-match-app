<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <!-- Hero -->
    <HomeHeroSection/>
    <!-- 愿景 -->
    <HomeVisionSection/>

    <HomeProfilesPreviewSection />

    <HomeFamilySection />

    <HomeEventsPreviewSection />

    <!-- 核心功能 -->
    <HomeFeaturesSection/>

    <!-- 为谁而生 -->
    <HomeAudienceSection />

    <!-- 会员体系 -->
    <HomeMembershipSection />

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
import HomeVisionSection from "@/components/home/HomeVisionSection.vue";
import HomeHeroSection from "@/components/home/HomeHeroSection.vue";
import HomeFeaturesSection from "@/components/home/HomeFeaturesSection.vue";
import HomeMembershipSection from "@/components/home/HomeMembershipSection.vue";
import HomeAudienceSection from '@/components/home/HomeAudienceSection.vue'
import HomeEventsPreviewSection from "@/components/home/HomeEventsPreviewSection.vue";
import HomeProfilesPreviewSection from "@/components/home/HomeProfilesPreviewSection.vue";
import HomeFamilySection from "@/components/home/HomeFamilySection.vue";

const navList = NAV_LIST


function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>

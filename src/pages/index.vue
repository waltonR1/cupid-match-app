<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <HomeHero />
    <HomeVision />

    <HomeProfilesPreview :profiles="homeProfileCards" />

    <HomeFamily />

    <HomeEventsPreview :view-model="homeEventsViewModel" />

    <HomeFeatures />
    <HomeAudience />
    <HomeMembership />

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HomeAudience from '@/components/home/HomeAudience.vue'
import HomeEventsPreview from '@/components/home/HomeEventsPreview.vue'
import HomeFamily from '@/components/home/HomeFamily.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeMembership from '@/components/home/HomeMembership.vue'
import HomeProfilesPreview from '@/components/home/HomeProfilesPreview.vue'
import HomeVision from '@/components/home/HomeVision.vue'
import { useHomePreviewEvents } from '@/composables/events/use-home-preview-events'
import { useHomePreviewProfiles } from '@/composables/profiles/use-home-preview-profiles'
import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const homePreviewEvents = useHomePreviewEvents()
const homePreviewProfiles = useHomePreviewProfiles()

const homeEventsViewModel = computed(() => homePreviewEvents.viewModel.value)
const homeProfileCards = computed(() => homePreviewProfiles.profileCards.value)

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>

<template>
  <AppPageLayout>
    <HomeHero />
    <HomeVision />

    <HomeProfilesPreview :profiles="homePreviewProfiles.profiles.value" />

    <HomeFamily />

    <HomeEventsPreview :events="homePreviewEvents.events.value" />

    <HomeFeatures />
    <HomeAudience />
    <HomeMembership />
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import HomeAudience from '@/components/home/HomeAudience.vue'
import HomeEventsPreview from '@/components/home/HomeEventsPreview.vue'
import HomeFamily from '@/components/home/HomeFamily.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeMembership from '@/components/home/HomeMembership.vue'
import HomeProfilesPreview from '@/components/home/HomeProfilesPreview.vue'
import HomeVision from '@/components/home/HomeVision.vue'
import { useHomePreviewEvents } from '@/composables/events'
import { useHomePreviewProfiles } from '@/composables/profiles'

const homePreviewEvents = useHomePreviewEvents()
const homePreviewProfiles = useHomePreviewProfiles()


</script>

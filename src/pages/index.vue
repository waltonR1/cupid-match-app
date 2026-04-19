<template>
  <AppPageLayout>
    <HomeHero />
    <HomeVision />

    <HomeProfilesPreview :profiles="profiles" />

    <HomeFamily />

    <HomeEventsPreview :events="events" />

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
import { useEvents } from '@/composables/events'
import { useSelfDirectory } from '@/composables/profiles'

const { featuredEvents: events } = useEvents()
const { featuredProfiles: profiles } = useSelfDirectory()

</script>

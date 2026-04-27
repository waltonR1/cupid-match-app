<template>
  <AppPageLayout>
    <HomeHero />
    <HomeVision />

    <HomeProfilesPreview :profiles="profiles" />

    <HomeFamily />

    <HomeEventsPreview :view-model="eventsPreview" />

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
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useHomeEventsPreview } from '@/hooks/events'
import { useHomeSelfProfilesPreview } from '@/hooks/profiles'

const { t: profileT, locale } = usePageI18n('self')
const { t: eventsT } = usePageI18n('events')
const { featuredProfiles: profiles } = useHomeSelfProfilesPreview(profileT, locale)
const { viewModel: eventsPreview } = useHomeEventsPreview(eventsT, locale)

</script>

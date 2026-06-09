<template>
  <AppPageLayout>
    <HomeHero/>
    <HomeVision/>

    <HomeProfiles :profiles="profiles"/>

    <HomeFamily/>

    <HomeEvents :view-model="eventsPreview"/>

    <HomeFeatures/>
    <HomeAudience/>
    <HomeMembership :plans="membershipPlans"/>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import HomeAudience from '@/components/home/HomeAudience.vue'
import HomeEvents from '@/components/home/HomeEvents.vue'
import HomeFamily from '@/components/home/HomeFamily.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeMembership from '@/components/home/HomeMembership.vue'
import HomeProfiles from '@/components/home/HomeProfiles.vue'
import HomeVision from '@/components/home/HomeVision.vue'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {useHomeEvents} from '@/hooks/events'
import {useHomeSelfProfiles} from '@/hooks/profiles'
import {useMembershipCatalog} from '@/hooks/membership'

const {t: profileT, locale} = usePageI18n('self')
const {t: eventsT} = usePageI18n('events')
const {t: membershipT} = usePageI18n('membership')
const {featuredProfiles: profiles} = useHomeSelfProfiles(profileT, locale)
const {viewModel: eventsPreview} = useHomeEvents(eventsT, locale)
const {plans: membershipPlans} = useMembershipCatalog(membershipT, locale)

</script>

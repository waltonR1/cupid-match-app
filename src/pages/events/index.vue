<template>
  <AppPageLayout>
    <EventsHero
      :eyebrow="t('hero.eyebrow')"
      :title="t('hero.title')"
      :subtitle="t('hero.subtitle')"
      :next-event-label="t('hero.nextEvent')"
      :fields="pageData.heroFields"
      :next-event="pageData.nextEventCard"
      @open="openEventDetail"
    />

    <EventsFeaturedGrid
      :eyebrow="t('featured.eyebrow')"
      :title="t('featured.title')"
      :subtitle="t('featured.subtitle')"
      :stats="pageData.statCards"
      :fields="pageData.fieldLabels"
      :events="pageData.featuredEventCards"
      @open="openEventDetail"
    />

    <EventsScheduleList
      :eyebrow="t('schedule.eyebrow')"
      :title="t('schedule.title')"
      :note="t('schedule.note')"
      :events="pageData.scheduleEventCards"
      @open="openEventDetail"
    />
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EventsFeaturedGrid from '@/components/events/EventsFeaturedGrid.vue'
import EventsHero from '@/components/events/EventsHero.vue'
import EventsScheduleList from '@/components/events/EventsScheduleList.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useEventsDirectory } from '@/hooks/events'
import { openEventDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('events')
const { pageData } = useEventsDirectory(t, locale)
</script>

<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.events"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <EventsHero
      :eyebrow="t('hero.eyebrow')"
      :title="t('hero.title')"
      :subtitle="t('hero.subtitle')"
      :next-event-label="t('hero.nextEvent')"
      :fields="eventData.heroFields.value"
      :next-event="eventData.nextEventCard.value"
      @open="handleEventOpen"
    />

    <EventsFeaturedGrid
      :eyebrow="t('featured.eyebrow')"
      :title="t('featured.title')"
      :subtitle="t('featured.subtitle')"
      :stats="eventData.statCards.value"
      :fields="eventData.fieldLabels.value"
      :events="eventData.featuredEventCards.value"
      @open="handleEventOpen"
    />

    <EventsScheduleList
      :eyebrow="t('schedule.eyebrow')"
      :title="t('schedule.title')"
      :note="t('schedule.note')"
      :events="eventData.scheduleEventCards.value"
      @open="handleEventOpen"
    />

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import EventsFeaturedGrid from '@/components/events/EventsFeaturedGrid.vue'
import EventsHero from '@/components/events/EventsHero.vue'
import EventsScheduleList from '@/components/events/EventsScheduleList.vue'
import { useEvents } from '@/composables/events/use-events'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openEventDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t } = usePageI18n('events')
const eventData = useEvents()

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleEventOpen(id: string) {
  openEventDetail(id)
}

function handleRegisterClick() {
  openRegisterPage('event')
}
</script>

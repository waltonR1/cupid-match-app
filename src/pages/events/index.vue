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
      :fields="heroFields"
      :next-event="nextEventCard"
      @open="handleEventOpen"
    />

    <EventsFeaturedGrid
      :eyebrow="t('featured.eyebrow')"
      :title="t('featured.title')"
      :subtitle="t('featured.subtitle')"
      :stats="statCards"
      :fields="fieldLabels"
      :events="featuredEventCards"
      @open="handleEventOpen"
    />

    <EventsScheduleList
      :eyebrow="t('schedule.eyebrow')"
      :title="t('schedule.title')"
      :note="t('schedule.note')"
      :events="scheduleEventCards"
      @open="handleEventOpen"
    />

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import EventsFeaturedGrid from '@/components/events/EventsFeaturedGrid.vue'
import EventsHero from '@/components/events/EventsHero.vue'
import EventsScheduleList from '@/components/events/EventsScheduleList.vue'
import { useEvents } from '@/composables/events'
import { pickLocalized, type CupidEvent, type LocalizedText } from '@/api/modules/events'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { EventFieldLabels, EventOverviewItem, EventStatItem } from '@/types/events'
import { openEventDetail, openRegisterPage, navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('events')
const eventData = useEvents()
const fieldLabels = computed<EventFieldLabels>(() => ({
  date: t('fields.date'),
  city: t('fields.city'),
  venue: t('fields.venue'),
  format: t('fields.format'),
  audience: t('fields.audience'),
  seats: t('fields.seats'),
}))
const heroFields = computed(() => ({
  date: fieldLabels.value.date,
  city: fieldLabels.value.city,
  venue: fieldLabels.value.venue,
  format: fieldLabels.value.format,
  seats: fieldLabels.value.seats,
}))
const nextEventCard = computed(() => {
  const event = eventData.nextEvent.value
  return event ? buildEventOverviewItem(event) : undefined
})
const featuredEventCards = computed(() => eventData.featuredEvents.value.map(item => buildEventOverviewItem(item)))
const scheduleEventCards = computed(() => eventData.sortedEvents.value.map(item => buildEventOverviewItem(item)))
const statCards = computed<EventStatItem[]>(() => {
  const openCount = eventData.sortedEvents.value.filter(item => item.status === 'open').length
  const waitlistCount = eventData.sortedEvents.value.filter(item => item.status === 'waitlist').length
  const cityCount = new Set(eventData.sortedEvents.value.map(item => localize(item.city))).size

  return [
    { label: t('stats.totalEvents'), value: String(eventData.sortedEvents.value.length) },
    { label: t('stats.openEvents'), value: String(openCount) },
    { label: t('stats.waitlistEvents'), value: String(waitlistCount) },
    { label: t('stats.cities'), value: String(cityCount) },
  ]
})

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleEventOpen(id: string) {
  openEventDetail(id)
}

function handleRegisterClick() {
  openRegisterPage('event')
}

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function eventStatusLabel(status: EventOverviewItem['status']) {
  return t(`status.${status}`)
}

function formatDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  } as const

  return map[locale.value]
}

function buildEventOverviewItem(event: CupidEvent): EventOverviewItem {
  return {
    id: event.id,
    title: localize(event.title),
    summary: localize(event.summary),
    date: formatDate(event.date),
    city: localize(event.city),
    venue: localize(event.venue),
    format: localize(event.format),
    audience: localize(event.audience),
    seats: `${event.registered} / ${event.seats}`,
    status: event.status,
    statusLabel: eventStatusLabel(event.status),
  }
}
</script>

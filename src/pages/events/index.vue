<template>
  <AppPageLayout>
    <EventsHero
      :eyebrow="t('hero.eyebrow')"
      :title="t('hero.title')"
      :subtitle="t('hero.subtitle')"
      :next-event-label="t('hero.nextEvent')"
      :fields="heroFields"
      :next-event="nextEventCard"
      @open="openEventDetail"
    />

    <EventsFeaturedGrid
      :eyebrow="t('featured.eyebrow')"
      :title="t('featured.title')"
      :subtitle="t('featured.subtitle')"
      :stats="statCards"
      :fields="fieldLabels"
      :events="featuredEventCards"
      @open="openEventDetail"
    />

    <EventsScheduleList
      :eyebrow="t('schedule.eyebrow')"
      :title="t('schedule.title')"
      :note="t('schedule.note')"
      :events="scheduleEventCards"
      @open="openEventDetail"
    />
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EventsFeaturedGrid from '@/components/events/EventsFeaturedGrid.vue'
import EventsHero from '@/components/events/EventsHero.vue'
import EventsScheduleList from '@/components/events/EventsScheduleList.vue'
import { useEvents } from '@/composables/events'
import { pickLocalized, type CupidEvent, type LocalizedText } from '@/api/modules/events'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { EventFieldLabels, EventOverviewItem, EventStatItem } from '@/types/events/view'
import { openEventDetail } from '@/utils/navigation'

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

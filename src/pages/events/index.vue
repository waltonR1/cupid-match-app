<template>
  <view class="min-h-screen bg-page-base text-text-heading">
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

    <view class="mx-auto max-w-[1280px] px-8 py-20">
      <view class="grid gap-5 md:grid-cols-4">
        <view
          v-for="item in statCards"
          :key="item.label"
          class="border border-border-base bg-surface-card px-6 py-7 shadow-panel"
        >
          <view class="text-[12px] uppercase tracking-[4px] text-brand-support">{{ item.label }}</view>
          <view class="mt-4 text-[34px] font-semibold text-text-heading">{{ item.value }}</view>
        </view>
      </view>
    </view>

    <EventsFeaturedGrid
      :eyebrow="t('featured.eyebrow')"
      :title="t('featured.title')"
      :subtitle="t('featured.subtitle')"
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
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import EventsHero from '@/components/events/EventsHero.vue'
import EventsFeaturedGrid from '@/components/events/EventsFeaturedGrid.vue'
import EventsScheduleList from '@/components/events/EventsScheduleList.vue'
import type { EventFieldLabels, EventOverviewItem } from '@/components/events/events.types'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { mockEvents, type MockEvent } from '@/mock/events'
import { pickLocalized, type LocalizedText } from '@/mock/shared'
import { openEventDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('events')

const events = computed(() => [...mockEvents].sort((left, right) => left.date.localeCompare(right.date)))
const nextEvent = computed(() => events.value[0])
const featuredEvents = computed(() => events.value.filter(item => item.status !== 'closed'))

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

const statCards = computed(() => {
  const openCount = mockEvents.filter(item => item.status === 'open').length
  const waitlistCount = mockEvents.filter(item => item.status === 'waitlist').length
  const cityCount = new Set(mockEvents.map(item => pickLocalized(locale.value, item.city))).size

  return [
    { label: t('stats.totalEvents'), value: String(mockEvents.length) },
    { label: t('stats.openEvents'), value: String(openCount) },
    { label: t('stats.waitlistEvents'), value: String(waitlistCount) },
    { label: t('stats.cities'), value: String(cityCount) },
  ]
})

const nextEventCard = computed<EventOverviewItem | undefined>(() => {
  if (!nextEvent.value) return undefined
  return buildEventOverviewItem(nextEvent.value)
})

const featuredEventCards = computed(() => {
  return featuredEvents.value.map(item => buildEventOverviewItem(item))
})

const scheduleEventCards = computed(() => {
  return events.value.map(item => buildEventOverviewItem(item))
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

function buildEventOverviewItem(event: MockEvent): EventOverviewItem {
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

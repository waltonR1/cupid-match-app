<template>
  <view class="bg-next-semantic-page-subtle text-next-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-next-semantic-accent-primary" />
            <text class="text-[12px] uppercase tracking-[5px] text-next-semantic-accent-secondary">
              {{ t('events.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-next-semantic-text-primary lg:text-[56px]">
            {{ t('events.title') }}
            <text class="text-next-semantic-accent-primary"> · {{ t('events.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[420px] text-[18px] leading-8 text-next-semantic-text-muted">
          {{ t('events.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <EventOverviewCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          :fields="fieldLabels"
          @open="handleEventOpen"
        />
      </view>

      <view class="mt-12 flex justify-center">
        <AppButton
          variant="secondary"
          context="section"
          class="min-w-[178px] px-8 tracking-[0.6px]"
          @click="goEvents"
        >
          {{ t('events.cta') }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import EventOverviewCard from '@/components/events/EventOverviewCard.vue'
import type { EventFieldLabels, EventOverviewItem } from '@/components/events/events.types'
import { computed } from 'vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { getHomePreviewEvents, type MockEvent } from '@/mock/events'
import { pickLocalized } from '@/mock/shared'
import { openEventDetail } from '@/utils/demo-navigation'

const { t, locale } = usePageI18n('home')
const previewEvents = getHomePreviewEvents()

const fieldLabelsByLocale: Record<'zh' | 'fr' | 'en', Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>> = {
  zh: {
    city: '城市',
    venue: '场地',
    format: '形式',
    audience: '适合人群',
    seats: '席位',
  },
  fr: {
    city: 'Ville',
    venue: 'Lieu',
    format: 'Format',
    audience: 'Public',
    seats: 'Places',
  },
  en: {
    city: 'City',
    venue: 'Venue',
    format: 'Format',
    audience: 'Audience',
    seats: 'Seats',
  },
}

const fieldLabels = computed(() => fieldLabelsByLocale[locale.value])

const events = computed<EventOverviewItem[]>(() =>
  previewEvents.map(event => ({
    id: event.id,
    date: formatDate(event.date),
    title: localize(event.title),
    summary: localize(event.summary),
    city: localize(event.city),
    venue: localize(event.venue),
    format: localize(event.format),
    audience: localize(event.audience),
    seats: `${event.registered} / ${event.seats}`,
    status: event.status,
    statusLabel: statusLabelByLocale[locale.value][event.status],
  })),
)

const statusLabelByLocale = {
  zh: {
    open: '报名中',
    waitlist: '候补',
    closed: '已满额',
  },
  fr: {
    open: 'Ouvert',
    waitlist: 'Attente',
    closed: 'Complet',
  },
  en: {
    open: 'Open',
    waitlist: 'Waitlist',
    closed: 'Full',
  },
} as const

function localize(text: MockEvent['title']) {
  return pickLocalized(locale.value, text)
}

function formatDate(date: string) {
  const value = new Date(date)

  if (locale.value === 'zh') {
    return value.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  if (locale.value === 'fr') {
    return value.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
  }

  return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function goEvents() {
  uni.navigateTo({ url: '/pages/events/index' })
}

function handleEventOpen(id: string) {
  openEventDetail(id)
}
</script>

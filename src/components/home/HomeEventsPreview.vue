<template>
  <view class="bg-semantic-page-subtle text-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">
              {{ t('events.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-semantic-text-primary lg:text-[56px]">
            {{ t('events.title') }}
            <text class="text-semantic-text-section-highlight"> {{ t('events.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[420px] text-[18px] leading-8 text-semantic-text-muted">
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
    city: '\u57CE\u5E02',
    venue: '\u573A\u5730',
    format: '\u5F62\u5F0F',
    audience: '\u9002\u5408\u4EBA\u7FA4',
    seats: '\u5E2D\u4F4D',
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
    open: '\u62A5\u540D\u4E2D',
    waitlist: '\u5019\u8865',
    closed: '\u5DF2\u6EE1\u989D',
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


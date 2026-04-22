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
          v-for="event in viewModel.events"
          :key="event.id"
          :event="event"
          :fields="viewModel.fieldLabels"
          @open="openEventDetail"
        />
      </view>

      <view class="mt-12 flex justify-center">
        <AppButton
          variant="secondary"
          context="section"
          class="min-w-[178px] px-8 tracking-[0.6px]"
          @click="openEventsPage"
        >
          {{ t('events.cta') }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import EventOverviewCard from '@/components/events/EventOverviewCard.vue'
import { pickLocalized, type CupidEvent, type LocalizedText } from '@/api/modules/events'
import type { HomeEventsPreviewViewModel } from '@/types/view-models/home'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openEventDetail, openEventsPage } from '@/utils/navigation'

const props = defineProps<{
  events: CupidEvent[]
}>()

const { t } = usePageI18n('home')
const { t: eventsT, locale } = usePageI18n('events')
const viewModel = computed<HomeEventsPreviewViewModel>(() => ({
  fieldLabels: {
    city: eventsT('fields.city'),
    venue: eventsT('fields.venue'),
    format: eventsT('fields.format'),
    audience: eventsT('fields.audience'),
    seats: eventsT('fields.seats'),
  },
  events: props.events.map(event => ({
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
    statusLabel: eventsT(`status.${event.status}`),
  })),
}))

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function formatDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  } as const

  return map[locale.value]
}
</script>

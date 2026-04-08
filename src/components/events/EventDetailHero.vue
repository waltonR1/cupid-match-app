<template>
  <view class="relative overflow-hidden bg-next-gradient-events-hero text-next-semantic-text-inverse">
    <view class="pointer-events-none absolute right-[-260px] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 lg:block">
      <view class="absolute inset-0 rounded-full border border-next-component-hero-ornament-line" />
      <view class="absolute inset-[40px] rounded-full border border-next-component-hero-ornament-line opacity-70" />
      <view class="absolute inset-[122px] rounded-full border border-next-component-hero-ornament-line opacity-55" />
    </view>

    <view class="relative mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <view class="max-w-[700px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-next-component-hero-border bg-next-component-hero-overlay-background-soft px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-next-component-section-line" />
            <text class="text-[12px] uppercase tracking-[6px] text-next-component-hero-eyebrow">
              {{ eyebrow }}
            </text>
          </view>

          <view class="text-[50px] font-semibold leading-[1.02] text-next-semantic-text-inverse lg:text-[80px]">
            {{ event.title }}
          </view>

          <view class="mt-8 max-w-[640px] text-[18px] leading-8 text-next-component-hero-description lg:text-[19px]">
            {{ event.summary }}
          </view>
        </view>

        <view class="relative overflow-hidden border border-next-component-hero-border bg-next-component-hero-overlay-background-panel px-8 py-8 shadow-next-shadow-hero backdrop-blur">
          <view class="flex flex-wrap items-start justify-between gap-4">
            <view class="text-[15px] uppercase tracking-[3px] text-next-component-hero-label">
              {{ fields.status }}
            </view>
            <EventStatusBadge :status="event.status" :label="event.statusLabel" />
          </view>

          <view class="mt-9 grid gap-5 lg:grid-cols-2 lg:gap-x-8">
            <view
              v-for="item in detailItems"
              :key="item.label"
              class="pt-1"
              :class="item.full ? 'lg:col-span-2' : ''"
            >
              <view class="text-[15px] uppercase tracking-[2.5px] text-next-component-hero-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[19px] leading-9 text-next-component-hero-description">
                {{ item.value }}
              </view>
            </view>
          </view>

          <view
            class="inline-flex items-center justify-center mt-8 w-full px-6 py-4 text-[16px] font-medium transition-all duration-200"
            :class="[buttonClassName, isDisabled ? 'pointer-events-none' : 'cursor-pointer']"
            @click="handleActionClick"
          >
            {{ actionText }}
          </view>

          <view class="mt-4 text-[15px] leading-8 text-next-semantic-text-inverse-muted">
            {{ actionHint }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EventDetailFieldLabels, EventOverviewItem } from './events.types'
import EventStatusBadge from './EventStatusBadge.vue'

const props = defineProps<{
  eyebrow: string
  fields: EventDetailFieldLabels
  event: EventOverviewItem
  registerText: string
  waitlistText: string
  fullText: string
  registerHint: string
  waitlistHint: string
  fullHint: string
}>()

const emit = defineEmits<{
  (e: 'register'): void
}>()

const detailItems = computed(() => [
  { label: props.fields.date, value: props.event.date, full: false },
  { label: props.fields.city, value: props.event.city, full: false },
  { label: props.fields.venue, value: props.event.venue, full: false },
  { label: props.fields.format, value: props.event.format, full: false },
  { label: props.fields.audience, value: props.event.audience, full: true },
  { label: props.fields.seats, value: props.event.seats, full: false },
])

const actionText = computed(() => {
  if (props.event.status === 'waitlist') return props.waitlistText
  if (props.event.status === 'closed') return props.fullText
  return props.registerText
})

const actionHint = computed(() => {
  if (props.event.status === 'waitlist') return props.waitlistHint
  if (props.event.status === 'closed') return props.fullHint
  return props.registerHint
})

const isDisabled = computed(() => props.event.status === 'closed')

const buttonClassName = computed(() => {
  if (props.event.status === 'waitlist') {
    return 'border border-next-semantic-action-waitlist bg-next-semantic-action-waitlist text-next-semantic-action-waitlist-contrast hover:-translate-y-[1px] hover:border-next-semantic-action-waitlist-hover hover:bg-next-semantic-action-waitlist-hover hover:shadow-next-shadow-panel'
  }

  if (props.event.status === 'closed') {
    return 'border border-next-semantic-action-disabled-border bg-next-semantic-action-disabled text-next-semantic-action-disabled-contrast opacity-90'
  }

  return 'border border-next-semantic-action-primary bg-next-semantic-action-primary text-next-semantic-action-primary-contrast hover:-translate-y-[1px] hover:border-next-semantic-action-primary-hover hover:bg-next-semantic-action-primary-hover hover:shadow-next-shadow-panel'
})

function handleActionClick() {
  if (props.event.status === 'closed') return
  emit('register')
}
</script>

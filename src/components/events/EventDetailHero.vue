<template>
  <view class="relative overflow-hidden bg-events-hero text-text-inverse">
    <view class="absolute left-[-48px] top-[-28px] h-[220px] w-[220px] rounded-full bg-brand-accent/12 blur-[84px]" />
    <view class="pointer-events-none absolute right-[-260px] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 lg:block">
      <view class="absolute inset-0 rounded-full border border-brand-accent/16" />
      <view class="absolute inset-[40px] rounded-full border border-brand-accent-soft/14" />
      <view class="absolute inset-[122px] rounded-full border border-brand-accent/10" />
      <view class="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-[36px]" />
    </view>

    <view class="relative mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <view class="max-w-[700px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/34 px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-accent-soft">
              {{ eyebrow }}
            </text>
          </view>

          <view class="text-[50px] font-semibold leading-[1.02] text-text-inverse lg:text-[80px]">
            {{ event.title }}
          </view>

          <view class="mt-8 max-w-[640px] text-[18px] leading-8 text-text-inverse-soft lg:text-[19px]">
            {{ event.summary }}
          </view>
        </view>

        <view class="relative overflow-hidden border border-border-inverse/34 bg-surface-inverse-panel/76 px-8 py-8 shadow-hero backdrop-blur">
          <view class="pointer-events-none absolute right-[-54px] top-[-70px] h-[170px] w-[170px] rounded-full bg-brand-accent/8 blur-[38px]" />

          <view class="flex flex-wrap items-start justify-between gap-4">
            <view class="text-[15px] uppercase tracking-[3px] text-brand-accent">
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
              <view class="text-[15px] uppercase tracking-[2.5px] text-brand-accent-soft/92">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[19px] leading-9 text-text-inverse-soft">
                {{ item.value }}
              </view>
            </view>
          </view>

          <button
            class="mt-8 w-full px-6 py-4 text-[16px] font-medium transition-all duration-200"
            :class="buttonClassName"
            :disabled="event.status === 'closed'"
            @click="handleActionClick"
          >
            {{ actionText }}
          </button>

          <view class="mt-4 text-[15px] leading-8 text-text-inverse-muted">
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

const buttonClassName = computed(() => {
  if (props.event.status === 'waitlist') {
    return 'border border-brand-accent/56 bg-surface-inverse-card/38 text-text-inverse hover:-translate-y-[1px] hover:border-brand-accent/72 hover:bg-surface-inverse-card/54 hover:shadow-card'
  }

  if (props.event.status === 'closed') {
    return 'cursor-default border border-border-inverse/36 bg-surface-inverse-panel/32 text-text-inverse-subtle opacity-90'
  }

  return 'border border-button-accent bg-button-accent text-button-neutral-ink hover:-translate-y-[1px] hover:border-button-accent-hover hover:bg-button-accent-hover hover:shadow-card'
})

function handleActionClick() {
  if (props.event.status === 'closed') return
  emit('register')
}
</script>

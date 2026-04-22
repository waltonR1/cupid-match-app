<template>
  <view class="relative overflow-hidden bg-gradient-events-hero text-semantic-text-inverse">
    <view class="pointer-events-none absolute right-[-260px] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 lg:block">
      <view class="absolute inset-0 rounded-full border border-semantic-border-hero-ornament" />
      <view class="absolute inset-[40px] rounded-full border border-component-hero-ornament-line-secondary" />
      <view class="absolute inset-[122px] rounded-full border border-component-hero-ornament-line-tertiary" />
    </view>

    <view class="relative mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <view class="max-w-[700px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-semantic-border-hero bg-semantic-surface-hero-soft px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-hero-eyebrow">
              {{ eyebrow }}
            </text>
          </view>

          <view class="text-[50px] font-semibold leading-[1.02] text-semantic-text-inverse lg:text-[80px]">
            {{ event.title }}
          </view>

          <view class="mt-8 max-w-[640px] text-[18px] leading-8 text-semantic-text-hero-body lg:text-[19px]">
            {{ event.summary }}
          </view>
        </view>

        <view class="relative overflow-hidden border border-semantic-border-hero bg-semantic-surface-hero-panel px-8 py-8 shadow-hero backdrop-blur">
          <view class="flex flex-wrap items-start justify-between gap-4">
            <view class="text-[15px] uppercase tracking-[3px] text-semantic-text-hero-label">
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
              <view class="text-[15px] uppercase tracking-[2.5px] text-semantic-text-hero-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[19px] leading-9 text-semantic-text-hero-body">
                {{ item.value }}
              </view>
            </view>
          </view>

          <view
            class="inline-flex items-center justify-center mt-8 w-full px-6 py-4 text-[16px] font-medium transition-all duration-200"
            :class="[buttonClassName, isDisabled ? 'cursor-not-allowed' : 'cursor-pointer']"
            @click="handleActionClick"
          >
            {{ action.text }}
          </view>

          <view class="mt-4 text-[15px] leading-8 text-semantic-text-inverse-muted">
            {{ action.hint }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EventDetailFieldLabels, EventOverviewItem } from '@/types/view-models/events'
import EventStatusBadge from './EventStatusBadge.vue'

interface EventDetailAction {
  text: string
  hint: string
  disabled: boolean
}

const props = defineProps<{
  eyebrow: string
  fields: EventDetailFieldLabels
  event: EventOverviewItem
  action: EventDetailAction
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

const isDisabled = computed(() => props.action.disabled)

const buttonClassName = computed(() => {
  if (props.event.status === 'waitlist') {
    return 'border border-semantic-action-waitlist bg-semantic-action-waitlist text-semantic-action-waitlist-contrast hover:-translate-y-[1px] hover:border-semantic-action-waitlist-hover hover:bg-semantic-action-waitlist-hover hover:shadow-panel'
  }

  if (props.event.status === 'closed') {
    return 'border border-semantic-action-disabled-border bg-semantic-action-disabled text-semantic-action-disabled-contrast'
  }

  return 'border border-semantic-action-primary bg-semantic-action-primary text-semantic-action-primary-contrast hover:-translate-y-[1px] hover:border-semantic-action-primary-hover hover:bg-semantic-action-primary-hover hover:shadow-panel'
})

function handleActionClick() {
  if (props.action.disabled) return
  emit('register')
}
</script>

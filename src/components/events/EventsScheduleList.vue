<template>
  <view class="text-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-12 h-px bg-component-section-divider-subtle" />

      <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">{{ eyebrow }}</view>
          <view class="mt-4 text-[42px] font-semibold leading-tight text-semantic-text-primary lg:text-[60px]">
            {{ title }}
          </view>
        </view>

        <view class="max-w-[460px] text-[17px] leading-8 text-semantic-text-muted">
          {{ note }}
        </view>
      </view>

      <view class="grid gap-4">
        <view
          v-for="event in events"
          :key="event.id"
          class="group relative grid gap-5 overflow-hidden border border-semantic-border-default bg-component-event-card-background px-7 py-6 shadow-panel transition-all duration-300 hover:-translate-y-[1px] hover:border-semantic-border-card-hover hover:bg-component-event-card-background-hover hover:shadow-about-hero-panel md:grid-cols-[176px_1fr_188px] md:items-center"
          @click="$emit('open', event.id)"
        >
          <view class="pointer-events-none absolute inset-y-0 left-0 w-px bg-component-event-card-edge transition-colors duration-300 group-hover:bg-component-event-card-edge-hover" />
          <view class="pointer-events-none absolute inset-x-0 top-0 h-px bg-component-event-card-edge transition-colors duration-300 group-hover:bg-component-event-card-edge-hover" />

          <view>
            <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-card-label">{{ event.date }}</view>
            <view class="mt-3 text-[16px] text-semantic-text-subtle">{{ event.city }}</view>
          </view>

          <view class="md:border-l md:border-semantic-border-soft md:pl-7">
            <view class="text-[26px] font-semibold text-semantic-text-primary transition-colors duration-300 group-hover:text-component-event-card-title-hover">{{ event.title }}</view>
            <view class="mt-3 text-[15px] leading-7 text-semantic-text-muted">{{ event.summary }}</view>
          </view>

          <view class="flex flex-col items-start gap-3 md:items-end">
            <EventStatusBadge :status="event.status" :label="event.statusLabel" />
            <view class="text-[14px] text-semantic-text-subtle">{{ event.seats }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import EventStatusBadge from './EventStatusBadge.vue'
import type { EventOverviewItem } from '@/types/events/view'

defineProps<{
  eyebrow: string
  title: string
  note: string
  events: EventOverviewItem[]
}>()

defineEmits<{
  (e: 'open', id: string): void
}>()
</script>


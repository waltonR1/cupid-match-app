<template>
  <view
    class="border border-semantic-border-default bg-component-event-card-background px-8 py-8 shadow-panel transition-all duration-300 hover:-translate-y-[2px] hover:border-semantic-border-card-hover hover:bg-component-event-card-background-hover hover:shadow-about-hero-panel"
    @click="$emit('open', event.id)"
  >
    <view class="flex items-start justify-between gap-4">
      <view>
      <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-card-label">{{ event.date }}</view>
        <view class="mt-4 text-[30px] font-semibold leading-[1.25] text-semantic-text-primary">
          {{ event.title }}
        </view>
      </view>

      <EventStatusBadge :status="event.status" :label="event.statusLabel" />
    </view>

    <view class="mt-6 grid gap-3 text-[15px] leading-7 text-semantic-text-secondary">
      <view><text class="font-medium text-semantic-text-primary">{{ fields.city }}:</text> {{ event.city }}</view>
      <view><text class="font-medium text-semantic-text-primary">{{ fields.venue }}:</text> {{ event.venue }}</view>
      <view><text class="font-medium text-semantic-text-primary">{{ fields.format }}:</text> {{ event.format }}</view>
      <view><text class="font-medium text-semantic-text-primary">{{ fields.audience }}:</text> {{ event.audience }}</view>
    </view>

    <view class="mt-6 text-[15px] leading-8 text-semantic-text-muted">
      {{ event.summary }}
    </view>

    <view class="mt-6 border-t border-semantic-border-soft pt-5 text-[14px] text-semantic-text-subtle">
      {{ fields.seats }} {{ event.seats }}
    </view>
  </view>
</template>

<script setup lang="ts">
import EventStatusBadge from './EventStatusBadge.vue'
import type { EventFieldLabels, EventOverviewItem } from '@/types/view-models/events'

defineProps<{
  event: EventOverviewItem
  fields: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
}>()

defineEmits<{
  (e: 'open', id: string): void
}>()
</script>


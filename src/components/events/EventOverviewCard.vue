<template>
  <view
    class="border border-next-semantic-border-default bg-next-component-event-card-background px-8 py-8 shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-[2px] hover:border-next-semantic-border-card-hover hover:bg-next-component-event-card-background-hover hover:shadow-next-shadow-about-hero-panel"
    @click="$emit('open', event.id)"
  >
    <view class="flex items-start justify-between gap-4">
      <view>
      <view class="text-[12px] uppercase tracking-[4px] text-next-semantic-text-card-label">{{ event.date }}</view>
        <view class="mt-4 text-[30px] font-semibold leading-[1.25] text-next-semantic-text-primary">
          {{ event.title }}
        </view>
      </view>

      <EventStatusBadge :status="event.status" :label="event.statusLabel" />
    </view>

    <view class="mt-6 grid gap-3 text-[15px] leading-7 text-next-semantic-text-secondary">
      <view><text class="font-medium text-next-semantic-text-primary">{{ fields.city }}:</text> {{ event.city }}</view>
      <view><text class="font-medium text-next-semantic-text-primary">{{ fields.venue }}:</text> {{ event.venue }}</view>
      <view><text class="font-medium text-next-semantic-text-primary">{{ fields.format }}:</text> {{ event.format }}</view>
      <view><text class="font-medium text-next-semantic-text-primary">{{ fields.audience }}:</text> {{ event.audience }}</view>
    </view>

    <view class="mt-6 text-[15px] leading-8 text-next-semantic-text-muted">
      {{ event.summary }}
    </view>

    <view class="mt-6 border-t border-next-semantic-border-soft pt-5 text-[14px] text-next-semantic-text-subtle">
      {{ fields.seats }} {{ event.seats }}
    </view>
  </view>
</template>

<script setup lang="ts">
import EventStatusBadge from './EventStatusBadge.vue'
import type { EventFieldLabels, EventOverviewItem } from './events.types'

defineProps<{
  event: EventOverviewItem
  fields: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
}>()

defineEmits<{
  (e: 'open', id: string): void
}>()
</script>

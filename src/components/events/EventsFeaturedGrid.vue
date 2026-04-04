<template>
  <view class="mx-auto max-w-[1280px] px-8 pb-24">
    <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <view>
        <view class="text-[12px] uppercase tracking-[5px] text-brand-brown">{{ eyebrow }}</view>
        <view class="mt-4 text-[44px] font-semibold leading-tight text-text-heading lg:text-[62px]">
          {{ title }}
        </view>
      </view>

      <view class="max-w-[420px] text-[17px] leading-8 text-text-body-soft">
        {{ subtitle }}
      </view>
    </view>

    <view class="grid gap-6 xl:grid-cols-3">
      <view
        v-for="event in events"
        :key="event.id"
        class="border border-border-base bg-surface-base px-8 py-8 shadow-panel transition-all duration-300 hover:-translate-y-[2px] hover:shadow-card"
        @click="$emit('open', event.id)"
      >
        <view class="flex items-start justify-between gap-4">
          <view>
            <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">{{ event.date }}</view>
            <view class="mt-4 text-[30px] font-semibold leading-[1.25] text-text-heading">
              {{ event.title }}
            </view>
          </view>

          <EventStatusBadge :status="event.status" :label="event.statusLabel" />
        </view>

        <view class="mt-6 grid gap-3 text-[15px] leading-7 text-text-body">
          <view><text class="font-medium text-text-heading">{{ fields.city }}:</text> {{ event.city }}</view>
          <view><text class="font-medium text-text-heading">{{ fields.venue }}:</text> {{ event.venue }}</view>
          <view><text class="font-medium text-text-heading">{{ fields.format }}:</text> {{ event.format }}</view>
          <view><text class="font-medium text-text-heading">{{ fields.audience }}:</text> {{ event.audience }}</view>
        </view>

        <view class="mt-6 text-[15px] leading-8 text-text-body-soft">
          {{ event.summary }}
        </view>

        <view class="mt-6 border-t border-border-light pt-5 text-[14px] text-text-muted">
          {{ fields.seats }} {{ event.seats }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import EventStatusBadge from './EventStatusBadge.vue'
import type { EventFieldLabels, EventOverviewItem } from './events.types'

defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  fields: EventFieldLabels
  events: EventOverviewItem[]
}>()

defineEmits<{
  (e: 'open', id: string): void
}>()
</script>

<template>
  <view class="bg-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-8 pb-24">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <view>
        <view class="mt-6 text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">{{ eyebrow }}</view>
        <view class="mt-4 text-[44px] font-semibold leading-tight text-semantic-text-primary lg:text-[62px]">
          {{ title }}
        </view>
      </view>

      <view class="max-w-[420px] text-[17px] leading-8 text-semantic-text-muted">
        {{ subtitle }}
      </view>
    </view>

    <view class="mb-12 mt-6 grid gap-5 md:grid-cols-4">
      <view
        v-for="item in stats"
        :key="item.label"
        class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel"
      >
          <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-card-label">{{ item.label }}</view>
        <view class="mt-4 text-[34px] font-semibold text-semantic-text-primary">{{ item.value }}</view>
      </view>
    </view>

    <view class="grid gap-6 xl:grid-cols-3">
      <EventOverviewCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        :fields="fields"
        @open="$emit('open', $event)"
      />
    </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import EventOverviewCard from './EventOverviewCard.vue'
import type { EventFieldLabels, EventOverviewItem, EventStatItem } from './events.types'

defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  stats: EventStatItem[]
  fields: EventFieldLabels
  events: EventOverviewItem[]
}>()

defineEmits<{
  (e: 'open', id: string): void
}>()
</script>


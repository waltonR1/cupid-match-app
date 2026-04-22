<template>
  <view class="relative overflow-hidden bg-gradient-events-hero text-semantic-text-inverse">
    <view class="pointer-events-none absolute right-[-215px] top-[-12px] hidden h-[430px] w-[430px] lg:block">
      <view class="absolute inset-0 rounded-full border border-semantic-border-hero-ornament" />
      <view class="absolute inset-[34px] rounded-full border border-semantic-border-hero-ornament" />
      <view class="absolute inset-[104px] rounded-full border border-semantic-border-hero-ornament" />
    </view>

    <view class="relative mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <view class="max-w-[680px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-semantic-border-hero bg-semantic-surface-hero-soft px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-hero-eyebrow">
              {{ eyebrow }}
            </text>
          </view>

          <view class="text-[52px] font-semibold leading-[1.02] text-semantic-text-inverse lg:text-[88px]">
            {{ title }}
          </view>

          <view class="mt-10 max-w-[640px] text-[19px] leading-8 text-semantic-text-hero-body lg:text-[20px]">
            {{ subtitle }}
          </view>
        </view>

        <view
          v-if="nextEvent"
          class="group relative z-10 cursor-pointer overflow-hidden border border-semantic-border-hero bg-semantic-surface-hero-panel px-8 py-8 shadow-about-hero-panel backdrop-blur transition-all duration-300 hover:-translate-y-[2px] hover:shadow-about-hero-feature"
          @click="$emit('open', nextEvent.id)"
        >
          <view class="flex flex-wrap items-start justify-between gap-4">
            <view>
              <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-hero-label transition-colors duration-300 group-hover:text-component-hero-label-hover">{{ nextEventLabel }}</view>
              <view class="mt-4 text-[34px] font-semibold leading-[1.25] text-semantic-text-inverse transition-colors duration-300 group-hover:text-semantic-text-hero-body">
                {{ nextEvent.title }}
              </view>
            </view>

            <EventStatusBadge :status="nextEvent.status" :label="nextEvent.statusLabel" />
          </view>

          <view class="mt-8 grid gap-4 text-[15px] leading-7 text-semantic-text-hero-secondary transition-colors duration-300 group-hover:text-semantic-text-inverse">
            <view>{{ fields.date }} {{ nextEvent.date }}</view>
            <view>{{ fields.city }} {{ nextEvent.city }}</view>
            <view>{{ fields.venue }} {{ nextEvent.venue }}</view>
            <view>{{ fields.format }} {{ nextEvent.format }}</view>
            <view>{{ fields.seats }} {{ nextEvent.seats }}</view>
          </view>

          <view class="mt-8 flex items-end justify-between gap-6">
            <view class="text-[15px] leading-8 text-semantic-text-inverse-muted transition-colors duration-300 group-hover:text-semantic-text-hero-body">
              {{ nextEvent.summary }}
            </view>
            <view class="hidden shrink-0 items-center text-component-hero-affordance transition-colors duration-300 group-hover:text-component-hero-affordance-hover md:inline-flex">
              <svg
                class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H9"
                  stroke="currentColor"
                  stroke-width="1.1"
                  stroke-linecap="round"
                />
                <path
                  d="M6.75 3.75L9 6L6.75 8.25"
                  stroke="currentColor"
                  stroke-width="1.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EventFieldLabels, EventOverviewItem } from '@/types/view-models/events'
import EventStatusBadge from './EventStatusBadge.vue'

defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  nextEventLabel: string
  fields: Pick<EventFieldLabels, 'date' | 'city' | 'venue' | 'format' | 'seats'>
  nextEvent?: EventOverviewItem
}>()

defineEmits<{
  (e: 'open', id: string): void
}>()
</script>


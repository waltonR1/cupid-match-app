<template>
  <view class="relative overflow-hidden bg-events-hero text-text-inverse">
    <view class="absolute left-[-40px] top-[-24px] h-[220px] w-[220px] rounded-full bg-brand-accent/12 blur-[80px]" />
    <view class="pointer-events-none absolute right-[-215px] top-[-12px] hidden h-[430px] w-[430px] lg:block">
      <view class="absolute inset-0 rounded-full border border-brand-accent/18" />
      <view class="absolute inset-[34px] rounded-full border border-brand-accent-soft/16" />
      <view class="absolute inset-[104px] rounded-full border border-brand-accent/12" />
      <view class="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-[32px]" />
    </view>

    <view class="relative mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <view class="max-w-[680px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/34 px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-accent-soft">
              {{ eyebrow }}
            </text>
          </view>

          <view class="text-[52px] font-semibold leading-[1.02] text-text-inverse lg:text-[88px]">
            {{ title }}
          </view>

          <view class="mt-10 max-w-[640px] text-[19px] leading-8 text-text-inverse-soft lg:text-[20px]">
            {{ subtitle }}
          </view>
        </view>

        <view
          v-if="nextEvent"
          class="group relative z-10 cursor-pointer overflow-hidden border border-border-inverse/34 bg-surface-inverse-panel/76 px-8 py-8 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-accent/28 hover:bg-surface-inverse-card/82 hover:shadow-hero"
          @click="$emit('open', nextEvent.id)"
        >
          <view class="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-accent/32 transition-all duration-300 group-hover:bg-brand-accent/44" />
          <view class="pointer-events-none absolute inset-y-0 left-0 w-px bg-brand-accent/14 transition-all duration-300 group-hover:bg-brand-accent/28" />
          <view class="pointer-events-none absolute right-[-56px] top-[-72px] h-[170px] w-[170px] rounded-full bg-brand-accent/8 blur-[36px] transition-all duration-300 group-hover:bg-brand-accent/11 group-hover:blur-[38px]" />

          <view class="flex flex-wrap items-start justify-between gap-4">
            <view>
              <view class="text-[12px] uppercase tracking-[4px] text-brand-accent transition-colors duration-300 group-hover:text-brand-accent-soft">{{ nextEventLabel }}</view>
              <view class="mt-4 text-[34px] font-semibold leading-[1.25] text-text-inverse transition-colors duration-300 group-hover:text-text-inverse-soft">
                {{ nextEvent.title }}
              </view>
            </view>

            <EventStatusBadge :status="nextEvent.status" :label="nextEvent.statusLabel" />
          </view>

          <view class="mt-8 grid gap-4 text-[15px] leading-7 text-text-inverse-soft transition-colors duration-300 group-hover:text-text-inverse">
            <view>{{ fields.date }} {{ nextEvent.date }}</view>
            <view>{{ fields.city }} {{ nextEvent.city }}</view>
            <view>{{ fields.venue }} {{ nextEvent.venue }}</view>
            <view>{{ fields.format }} {{ nextEvent.format }}</view>
            <view>{{ fields.seats }} {{ nextEvent.seats }}</view>
          </view>

          <view class="mt-8 flex items-end justify-between gap-6">
            <view class="text-[15px] leading-8 text-text-inverse-muted transition-colors duration-300 group-hover:text-text-inverse-soft">
              {{ nextEvent.summary }}
            </view>
            <view class="hidden shrink-0 items-center text-brand-accent transition-colors duration-300 group-hover:text-brand-accent-soft md:inline-flex">
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
import type { EventFieldLabels, EventOverviewItem } from './events.types'
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

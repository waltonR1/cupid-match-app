<template>
  <view class="relative overflow-hidden border border-border-inverse bg-home-hero px-6 py-6 text-text-inverse shadow-[0_24px_60px_rgba(13,34,56,0.12)] lg:px-8 lg:py-7">
    <view class="absolute inset-x-0 top-0 h-px bg-white/10" />
    <view class="absolute right-[-80px] top-[-70px] hidden h-[220px] w-[220px] rounded-full border border-white/5 xl:block" />

    <view class="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
      <view class="min-w-0">
        <view class="flex flex-wrap items-center gap-3">
          <view class="inline-flex items-center gap-3">
            <view class="h-px w-12 bg-border-highlight-soft" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-highlight-soft">
              {{ data.eyebrow }}
            </text>
          </view>

          <view class="inline-flex items-center border border-border-highlight-soft/55 bg-border-highlight-soft/10 px-3 py-1 text-[11px] tracking-[2px] text-brand-highlight-strong">
            {{ data.recordId }}
          </view>
        </view>

        <view class="mt-5 flex flex-wrap items-start gap-5">
          <view class="flex h-[82px] w-[82px] shrink-0 items-center justify-center border border-border-highlight-soft/50 bg-surface-inverse-panel text-[28px] font-semibold text-brand-highlight-strong">
            {{ data.avatar }}
          </view>

          <view class="min-w-0 flex-1">
            <view class="flex flex-wrap items-center gap-2.5">
              <view class="text-[36px] font-semibold leading-[1.02] text-text-inverse lg:text-[48px]">
                {{ data.name }}
              </view>

              <view
                v-if="data.gender"
                class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border-inverse-soft bg-surface-inverse-card text-text-inverse-soft"
              >
                <svg
                  v-if="data.gender === 'female'"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="3.75" r="2.75" stroke="currentColor" stroke-width="1.2" />
                  <path d="M6 6.75V11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                  <path d="M4.25 9.25H7.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                </svg>
                <svg
                  v-else
                  class="h-3.5 w-3.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4.5" cy="7.5" r="2.75" stroke="currentColor" stroke-width="1.2" />
                  <path d="M6.75 5.25L11 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                  <path d="M8.25 1H11V3.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </view>
            </view>

            <view class="mt-3 text-[17px] leading-7 text-text-inverse-subtle">
              {{ data.meta }}
            </view>

            <view class="mt-5 flex flex-wrap gap-2.5">
              <view
                v-for="badge in data.badges"
                :key="badge.label"
                class="rounded-full border px-3 py-1 text-[12px]"
                :class="badgeClassName(badge.tone)"
              >
                {{ badge.label }}
              </view>
            </view>
          </view>
        </view>

        <view class="mt-6 max-w-[720px] text-[16px] leading-8 text-text-inverse-soft lg:text-[17px]">
          {{ data.summary }}
        </view>
      </view>

      <view class="border border-border-inverse-soft bg-surface-inverse-card px-5 py-5">
        <view class="text-[12px] uppercase tracking-[3px] text-brand-highlight-soft">
          {{ data.indexTitle }}
        </view>

        <view class="mt-4 space-y-3">
          <view
            v-for="item in data.indexFacts"
            :key="item.label"
            class="flex items-start justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
          >
            <text class="text-[12px] tracking-[1px] text-text-inverse-subtle">
              {{ item.label }}
            </text>
            <text class="max-w-[180px] text-right text-[15px] leading-6 text-text-inverse">
              {{ item.value }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DetailBadgeItem, DetailHeroData } from './detail.types'

defineProps<{
  data: DetailHeroData
}>()

function badgeClassName(tone?: DetailBadgeItem['tone']) {
  if (tone === 'muted') {
    return 'border-border-inverse-soft bg-surface-inverse-card text-text-inverse-subtle'
  }

  return 'border-border-highlight-soft/55 bg-border-highlight-soft/10 text-brand-highlight-strong'
}
</script>

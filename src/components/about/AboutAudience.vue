<template>
  <view class="bg-page-soft">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-12">
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-brand-accent" />
          <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
            {{ t('audience.eyebrow') }}
          </text>
        </view>

        <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
          {{ t('audience.title') }}
          <text class="italic text-brand-accent-strong">& {{ t('audience.titleAccent') }}</text>
        </view>

        <view class="mt-5 max-w-[780px] text-[19px] italic leading-8 text-text-lead lg:text-[21px]">
          {{ t('audience.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-4">
        <view
          v-for="item in audienceCards"
          :key="item.title"
          class="relative min-h-[320px] overflow-hidden px-7 py-8 transition-transform duration-300"
          :class="cardClass(item.tone)"
        >
          <view class="absolute inset-x-0 top-0 h-px" :class="lineClass(item.tone)" />

          <view class="flex items-start justify-between">
            <view class="text-[12px] uppercase tracking-[4px]" :class="item.tone === 'accent' ? 'text-brand-accent' : 'text-brand-support'">
              Profile
            </view>
            <view class="text-[12px] uppercase tracking-[4px] text-text-subtle">
              {{ item.index }}
            </view>
          </view>

          <view class="mt-12 text-[28px] font-semibold leading-[1.25] text-text-heading">
            {{ t(item.title) }}
          </view>

          <view class="mt-5 text-[16px] leading-8 text-text-body">
            {{ t(item.desc) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('about')

const audienceCards = [
  { index: '01', tone: 'accent', title: 'audience.card1.title', desc: 'audience.card1.desc' },
  { index: '02', tone: 'base', title: 'audience.card2.title', desc: 'audience.card2.desc' },
  { index: '03', tone: 'panel', title: 'audience.card3.title', desc: 'audience.card3.desc' },
  { index: '04', tone: 'warm', title: 'audience.card4.title', desc: 'audience.card4.desc' },
] as const

function cardClass(tone: (typeof audienceCards)[number]['tone']) {
  if (tone === 'accent') {
    return 'border border-border-base bg-surface-panel text-text-heading shadow-emphasis lg:translate-y-6'
  }

  if (tone === 'base') {
    return 'border border-border-soft bg-surface-base text-text-heading shadow-card'
  }

  if (tone === 'panel') {
    return 'border border-border-base bg-surface-panel text-text-heading shadow-card lg:-translate-y-3'
  }

  return 'border border-border-accent/25 bg-brand-accent/10 text-text-heading shadow-emphasis lg:translate-y-4'
}

function lineClass(tone: (typeof audienceCards)[number]['tone']) {
  if (tone === 'accent') {
    return 'bg-brand-accent/55'
  }

  if (tone === 'warm') {
    return 'bg-brand-accent/65'
  }

  return 'bg-border-light/80'
}
</script>

<template>
  <view class="bg-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-12">
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-semantic-border-eyebrow" />
          <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
            {{ t('audience.eyebrow') }}
          </text>
        </view>

        <view class="text-[44px] font-semibold leading-tight text-semantic-text-primary lg:text-[64px]">
          {{ t('audience.title') }}
          <text class="italic text-semantic-text-section-highlight">& {{ t('audience.titleAccent') }}</text>
        </view>

        <view class="mt-5 max-w-[780px] text-[19px] italic leading-8 text-semantic-text-lead lg:text-[21px]">
          {{ t('audience.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-4">
        <view
          v-for="item in audienceCards"
          :key="item.title"
          class="relative min-h-[320px] overflow-hidden px-7 py-8 transition-transform duration-300"
          :class="cardClass(item.emphasis)"
        >
          <view class="absolute inset-x-0 top-0 h-px" :class="lineClass(item.emphasis)" />

          <view class="flex items-start justify-between">
            <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-card-label">
              Profile
            </view>
            <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-subtle">
              {{ item.index }}
            </view>
          </view>

          <view class="mt-12 text-[28px] font-semibold leading-[1.25] text-semantic-text-primary">
            {{ t(item.title) }}
          </view>

          <view class="mt-5 text-[16px] leading-8 text-semantic-text-secondary">
            {{ t(item.desc) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('about')

const audienceCards = [
  { index: '01', emphasis: false, title: 'audience.card1.title', desc: 'audience.card1.desc' },
  { index: '02', emphasis: false, title: 'audience.card2.title', desc: 'audience.card2.desc' },
  { index: '03', emphasis: false, title: 'audience.card3.title', desc: 'audience.card3.desc' },
  { index: '04', emphasis: true, title: 'audience.card4.title', desc: 'audience.card4.desc' },
] as const

function cardClass(emphasis: boolean) {
  if (emphasis) {
    return 'border border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary shadow-emphasis lg:translate-y-4'
  }

  return 'border border-semantic-border-soft bg-component-editorial-card-background text-semantic-text-primary shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover hover:shadow-panel'
}

function lineClass(emphasis: boolean) {
  if (emphasis) {
    return 'bg-semantic-border-emphasis-divider'
  }

  return 'bg-component-editorial-card-line'
}
</script>


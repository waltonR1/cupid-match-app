<template>
  <view class="bg-semantic-page-default">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
        <view class="border border-semantic-border-soft bg-semantic-surface-soft px-8 py-10 shadow-panel lg:sticky lg:top-28 lg:self-start lg:px-10 lg:py-12">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
              {{ t('origin.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] text-semantic-text-primary lg:text-[66px]">
            {{ t('origin.title') }}
            <text class="text-semantic-text-section-highlight">{{ t('origin.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-semantic-text-lead">
            {{ t('origin.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-semantic-text-lead">
            {{ t('origin.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
        <view class="relative overflow-hidden border border-semantic-border-soft bg-component-editorial-card-background px-8 py-8 shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover hover:shadow-panel">
          <view class="absolute inset-x-0 top-0 h-px bg-component-editorial-card-line" />
            <view class="text-[18px] uppercase tracking-[5px] text-semantic-text-card-label">Paris</view>
            <view class="mt-4 text-[28px] font-semibold text-semantic-text-primary">
              {{ t('origin.card1.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-semantic-text-secondary">
              {{ t('origin.card1.desc') }}
            </view>
          </view>

        <view class="relative overflow-hidden border border-semantic-border-soft bg-component-editorial-card-background px-8 py-8 text-semantic-text-primary shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover hover:shadow-panel lg:ml-12">
          <view class="absolute inset-x-0 top-0 h-px bg-component-editorial-card-line" />
            <view class="text-[18px] uppercase tracking-[5px] text-semantic-text-card-label">Global</view>
            <view class="mt-4 text-[28px] font-semibold text-semantic-text-primary">
              {{ t('origin.card2.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-semantic-text-secondary">
              {{ t('origin.card2.desc') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('about')
</script>


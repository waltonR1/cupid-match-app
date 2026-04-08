<template>
  <view class="bg-next-semantic-page-default">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-8 py-10 shadow-next-shadow-panel lg:sticky lg:top-28 lg:self-start lg:px-10 lg:py-12">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-next-semantic-accent-secondary" />
            <text class="text-[12px] uppercase tracking-[6px] text-next-semantic-accent-secondary">
              {{ t('origin.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] text-next-semantic-text-primary lg:text-[66px]">
            {{ t('origin.title') }}
            <text class="text-next-semantic-accent-primary">{{ t('origin.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-next-semantic-text-lead">
            {{ t('origin.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-next-semantic-text-lead">
            {{ t('origin.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="relative overflow-hidden border border-next-semantic-border-soft bg-next-semantic-surface-info-card px-8 py-8 shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-next-semantic-border-info-card-hover hover:bg-next-semantic-surface-info-card-hover hover:shadow-next-shadow-panel">
            <view class="absolute inset-x-0 top-0 h-px bg-next-component-info-card-line" />
            <view class="text-[18px] uppercase tracking-[5px] text-next-semantic-accent-secondary">Paris</view>
            <view class="mt-4 text-[28px] font-semibold text-next-semantic-text-primary">
              {{ t('origin.card1.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-next-semantic-text-secondary">
              {{ t('origin.card1.desc') }}
            </view>
          </view>

          <view class="relative overflow-hidden border border-next-semantic-border-soft bg-next-semantic-surface-info-card px-8 py-8 text-next-semantic-text-primary shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-next-semantic-border-info-card-hover hover:bg-next-semantic-surface-info-card-hover hover:shadow-next-shadow-panel lg:ml-12">
            <view class="absolute inset-x-0 top-0 h-px bg-next-component-info-card-line" />
            <view class="text-[18px] uppercase tracking-[5px] text-next-semantic-accent-primary">Global</view>
            <view class="mt-4 text-[28px] font-semibold text-next-semantic-text-primary">
              {{ t('origin.card2.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-next-semantic-text-secondary">
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

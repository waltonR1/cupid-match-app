<template>
  <view class="bg-page-base">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
        <view class="border border-border-soft bg-surface-card-soft px-8 py-10 shadow-card lg:sticky lg:top-28 lg:self-start lg:px-10 lg:py-12">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
              {{ t('origin.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] lg:text-[66px]">
            {{ t('origin.title') }}
            <text class="text-brand-accent-strong">{{ t('origin.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-text-lead">
            {{ t('origin.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-text-lead">
            {{ t('origin.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="relative overflow-hidden border border-border-base bg-surface-panel px-8 py-8 shadow-card">
            <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/45" />
            <view class="text-[18px] uppercase tracking-[5px] text-brand-support">Paris</view>
            <view class="mt-4 text-[28px] font-semibold text-text-heading">
              {{ t('origin.card1.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-text-body">
              {{ t('origin.card1.desc') }}
            </view>
          </view>

          <view class="relative overflow-hidden border border-border-base bg-surface-card px-8 py-8 text-text-heading shadow-card lg:ml-12">
            <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/55" />
            <view class="text-[18px] uppercase tracking-[5px] text-brand-accent">Global</view>
            <view class="mt-4 text-[28px] font-semibold text-text-heading">
              {{ t('origin.card2.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-text-body">
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

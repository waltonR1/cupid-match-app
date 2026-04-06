<template>
  <view class="bg-page-base">
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
              {{ t('difference.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('difference.title') }}
            <text class="italic text-brand-accent-strong">& {{ t('difference.titleAccent') }}</text>
          </view>

          <view class="mt-5 max-w-[440px] text-[19px] italic leading-8 text-text-lead lg:text-[21px]">
            {{ t('difference.subtitle') }}
          </view>
        </view>

        <view class="grid gap-6 lg:grid-cols-2">
          <view class="relative overflow-hidden border border-border-base bg-surface-panel px-9 py-10 text-text-heading shadow-emphasis lg:translate-y-8">
            <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/55" />
            <view class="text-[15px] uppercase tracking-[5px] text-brand-accent">
              {{ differenceCards[0].index }}
            </view>
            <view class="mt-6 text-[34px] font-semibold leading-[1.2] text-text-heading">
              {{ t(differenceCards[0].title) }}
            </view>
            <view class="mt-6 text-[17px] leading-8 text-text-body">
              {{ t(differenceCards[0].desc) }}
            </view>
          </view>

          <view class="grid gap-6">
            <view class="relative overflow-hidden border border-border-base bg-surface-base px-8 py-9 shadow-card">
              <view class="absolute inset-x-0 top-0 h-px bg-border-light/80" />
              <view class="text-[15px] uppercase tracking-[5px] text-brand-support">
                {{ differenceCards[1].index }}
              </view>
              <view class="mt-5 text-[30px] font-semibold text-text-heading">
                {{ t(differenceCards[1].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-text-body">
                {{ t(differenceCards[1].desc) }}
              </view>
            </view>

            <view class="relative overflow-hidden border border-border-accent/30 bg-brand-accent/10 px-8 py-9 shadow-card lg:ml-10">
              <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/60" />
              <view class="text-[15px] uppercase tracking-[5px] text-brand-support">
                {{ differenceCards[2].index }}
              </view>
              <view class="mt-5 text-[30px] font-semibold text-text-heading">
                {{ t(differenceCards[2].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-text-body">
                {{ t(differenceCards[2].desc) }}
              </view>
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

const differenceCards = [
  { index: '01', title: 'difference.card1.title', desc: 'difference.card1.desc' },
  { index: '02', title: 'difference.card2.title', desc: 'difference.card2.desc' },
  { index: '03', title: 'difference.card3.title', desc: 'difference.card3.desc' },
]
</script>

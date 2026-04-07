<template>
  <view class="bg-next-semantic-page-default">
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-next-semantic-accent-secondary" />
            <text class="text-[12px] uppercase tracking-[6px] text-next-semantic-accent-secondary">
              {{ t('difference.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight text-next-semantic-text-primary lg:text-[64px]">
            {{ t('difference.title') }}
            <text class="italic text-next-semantic-accent-primary">& {{ t('difference.titleAccent') }}</text>
          </view>

          <view class="mt-5 max-w-[440px] text-[19px] italic leading-8 text-next-semantic-text-lead lg:text-[21px]">
            {{ t('difference.subtitle') }}
          </view>
        </view>

        <view class="grid gap-6 lg:grid-cols-2">
          <view class="relative overflow-hidden border border-next-semantic-border-soft bg-next-component-point-background px-9 py-10 text-next-semantic-text-primary shadow-next-shadow-emphasis transition-all duration-300 hover:-translate-y-[3px] hover:border-next-component-point-border-hover hover:bg-next-component-point-background-hover hover:shadow-next-shadow-panel lg:translate-y-8">
            <view class="absolute inset-x-0 top-0 h-px bg-next-component-point-line" />
            <view class="text-[15px] uppercase tracking-[5px] text-next-semantic-accent-primary">
              {{ differenceCards[0].index }}
            </view>
            <view class="mt-6 text-[34px] font-semibold leading-[1.2] text-next-semantic-text-primary">
              {{ t(differenceCards[0].title) }}
            </view>
            <view class="mt-6 text-[17px] leading-8 text-next-semantic-text-secondary">
              {{ t(differenceCards[0].desc) }}
            </view>
          </view>

          <view class="grid gap-6">
            <view class="relative overflow-hidden border border-next-semantic-border-soft bg-next-component-point-background px-8 py-9 shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-next-component-point-border-hover hover:bg-next-component-point-background-hover hover:shadow-next-shadow-panel">
              <view class="absolute inset-x-0 top-0 h-px bg-next-component-point-line" />
              <view class="text-[15px] uppercase tracking-[5px] text-next-semantic-accent-secondary">
                {{ differenceCards[1].index }}
              </view>
              <view class="mt-5 text-[30px] font-semibold text-next-semantic-text-primary">
                {{ t(differenceCards[1].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-next-semantic-text-secondary">
                {{ t(differenceCards[1].desc) }}
              </view>
            </view>

            <view class="relative overflow-hidden border border-next-semantic-border-soft bg-next-component-point-background px-8 py-9 shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-next-component-point-border-hover hover:bg-next-component-point-background-hover hover:shadow-next-shadow-panel lg:ml-10">
              <view class="absolute inset-x-0 top-0 h-px bg-next-component-point-line" />
              <view class="text-[15px] uppercase tracking-[5px] text-next-semantic-accent-secondary">
                {{ differenceCards[2].index }}
              </view>
              <view class="mt-5 text-[30px] font-semibold text-next-semantic-text-primary">
                {{ t(differenceCards[2].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-next-semantic-text-secondary">
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

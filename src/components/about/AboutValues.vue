<template>
  <view class="bg-page-soft">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[1.06fr_0.94fr]">
        <view class="grid gap-6">
          <view class="relative overflow-hidden border border-border-base bg-surface-panel px-9 py-10 text-text-heading shadow-emphasis">
            <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/55" />
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-brand-accent" />
              <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
                {{ t('values.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-tight lg:text-[62px]">
              {{ t('values.title') }}
              <text class="italic text-brand-accent">& {{ t('values.titleAccent') }}</text>
            </view>

            <view class="mt-6 max-w-[560px] text-[19px] italic leading-8 text-text-body-soft lg:text-[20px]">
              {{ t('values.subtitle') }}
            </view>
          </view>

          <view class="grid gap-6 md:grid-cols-2">
            <view
              v-for="item in valueCards.slice(0, 2)"
              :key="item.title"
              class="border border-border-base bg-surface-card px-8 py-9 shadow-card"
            >
              <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                {{ item.index }}
              </view>
              <view class="mt-6 text-[28px] font-semibold text-text-heading">
                {{ t(item.title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-text-body">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="grid gap-6">
          <view class="relative overflow-hidden border border-brand-primary/18 bg-brand-primary/8 px-8 py-9 shadow-card lg:mr-12">
            <view class="absolute inset-x-0 top-0 h-px bg-brand-secondary/45" />
            <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
              {{ valueCards[2].index }}
            </view>
            <view class="mt-6 text-[30px] font-semibold text-text-heading">
              {{ t(valueCards[2].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-text-body">
              {{ t(valueCards[2].desc) }}
            </view>
          </view>

          <view class="relative overflow-hidden border border-border-accent/35 bg-brand-accent/18 px-8 py-9 text-text-heading shadow-emphasis lg:ml-12">
            <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/70" />
            <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
              {{ valueCards[3].index }}
            </view>
            <view class="mt-6 text-[30px] font-semibold">
              {{ t(valueCards[3].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-text-body">
              {{ t(valueCards[3].desc) }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('about')

const valueCards = [
  { index: '01', title: 'values.card1.title', desc: 'values.card1.desc' },
  { index: '02', title: 'values.card2.title', desc: 'values.card2.desc' },
  { index: '03', title: 'values.card3.title', desc: 'values.card3.desc' },
  { index: '04', title: 'values.card4.title', desc: 'values.card4.desc' },
]
</script>

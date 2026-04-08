<template>
  <view class="bg-next-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[1.06fr_0.94fr]">
        <view class="grid gap-6">
          <view class="relative overflow-hidden border border-next-semantic-border-default bg-next-semantic-surface-panel px-9 py-10 text-next-semantic-text-primary shadow-next-shadow-emphasis">
            <view class="absolute inset-x-0 top-0 h-px bg-next-component-info-card-line" />
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-next-semantic-accent-secondary" />
              <text class="text-[12px] uppercase tracking-[6px] text-next-semantic-accent-secondary">
                {{ t('values.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-tight text-next-semantic-text-primary lg:text-[62px]">
              {{ t('values.title') }}
              <text class="italic text-next-semantic-accent-secondary">& {{ t('values.titleAccent') }}</text>
            </view>

            <view class="mt-6 max-w-[560px] text-[19px] italic leading-8 text-next-semantic-text-muted lg:text-[20px]">
              {{ t('values.subtitle') }}
            </view>
          </view>

          <view class="grid gap-6 md:grid-cols-2">
            <view
              v-for="item in valueCards.slice(0, 2)"
              :key="item.title"
              class="relative overflow-hidden border border-next-semantic-border-soft bg-next-semantic-surface-info-card px-8 py-9 shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-next-semantic-border-info-card-hover hover:bg-next-semantic-surface-info-card-hover hover:shadow-next-shadow-panel"
            >
              <view class="absolute inset-x-0 top-0 h-px bg-next-component-info-card-line" />
              <view class="text-[12px] uppercase tracking-[4px] text-next-semantic-accent-secondary">
                {{ item.index }}
              </view>
              <view class="mt-6 text-[28px] font-semibold text-next-semantic-text-primary">
                {{ t(item.title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-next-semantic-text-secondary">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="grid gap-6">
          <view class="relative overflow-hidden border border-next-component-emphasis-card-border bg-next-component-emphasis-card-background px-8 py-9 shadow-next-shadow-panel lg:mr-12">
            <view class="absolute inset-x-0 top-0 h-px bg-next-component-emphasis-card-line" />
            <view class="text-[12px] uppercase tracking-[4px] text-next-semantic-accent-secondary">
              {{ valueCards[2].index }}
            </view>
            <view class="mt-6 text-[30px] font-semibold text-next-semantic-text-primary">
              {{ t(valueCards[2].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-next-semantic-text-secondary">
              {{ t(valueCards[2].desc) }}
            </view>
          </view>

          <view class="relative overflow-hidden border border-next-semantic-border-soft bg-next-semantic-surface-info-card px-8 py-9 text-next-semantic-text-primary shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-[3px] hover:border-next-semantic-border-info-card-hover hover:bg-next-semantic-surface-info-card-hover hover:shadow-next-shadow-panel lg:ml-12">
            <view class="absolute inset-x-0 top-0 h-px bg-next-component-info-card-line" />
            <view class="text-[12px] uppercase tracking-[4px] text-next-semantic-accent-secondary">
              {{ valueCards[3].index }}
            </view>
            <view class="mt-6 text-[30px] font-semibold text-next-semantic-text-primary">
              {{ t(valueCards[3].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-next-semantic-text-secondary">
              {{ t(valueCards[3].desc) }}
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

const valueCards = [
  { index: '01', title: 'values.card1.title', desc: 'values.card1.desc' },
  { index: '02', title: 'values.card2.title', desc: 'values.card2.desc' },
  { index: '03', title: 'values.card3.title', desc: 'values.card3.desc' },
  { index: '04', title: 'values.card4.title', desc: 'values.card4.desc' },
]
</script>

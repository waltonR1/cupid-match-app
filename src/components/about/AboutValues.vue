<template>
  <view class="bg-[#f3ede3]">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[1.06fr_0.94fr]">
        <view class="grid gap-6">
          <view class="border border-[#1f3047] bg-[#1f3047] px-9 py-10 text-white">
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#e7d5b1]">
                {{ t('values.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-tight lg:text-[62px]">
              {{ t('values.title') }}
              <text class="italic text-[#d7b86e]">& {{ t('values.titleAccent') }}</text>
            </view>

            <view class="mt-6 max-w-[560px] text-[19px] italic leading-8 text-[#ecdfcf] lg:text-[20px]">
              {{ t('values.subtitle') }}
            </view>
          </view>

          <view class="grid gap-6 md:grid-cols-2">
            <view
                v-for="item in valueCards.slice(0, 2)"
                :key="item.title"
                class="border border-[#e0d4c5] bg-[#faf6ee] px-8 py-9"
            >
              <view class="text-[32px]">{{ item.icon }}</view>
              <view class="mt-6 text-[28px] font-semibold text-[#1f1f1f]">
                {{ t(item.title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="grid gap-6">
          <view class="border border-[#d71934]/20 bg-[#f8edea] px-8 py-9 lg:mr-12">
            <view class="text-[32px]">{{ valueCards[2].icon }}</view>
            <view class="mt-6 text-[30px] font-semibold text-[#1f1f1f]">
              {{ t(valueCards[2].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
              {{ t(valueCards[2].desc) }}
            </view>
          </view>

          <view class="border border-[#d7b86e]/40 bg-[#d7b86e] px-8 py-9 text-[#1f3047] lg:ml-12">
            <view class="text-[32px]">{{ valueCards[3].icon }}</view>
            <view class="mt-6 text-[30px] font-semibold">
              {{ t(valueCards[3].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-[#3c3428]">
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
  { icon: '🤝', title: 'values.card1.title', desc: 'values.card1.desc' },
  { icon: '🎩', title: 'values.card2.title', desc: 'values.card2.desc' },
  { icon: '💎', title: 'values.card3.title', desc: 'values.card3.desc' },
  { icon: '🕰️', title: 'values.card4.title', desc: 'values.card4.desc' }
]
</script>
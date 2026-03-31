<template>
  <view class="mx-auto max-w-[1280px] px-8 py-28">
    <view class="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
      <view class="lg:sticky lg:top-24 lg:self-start">
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-[#d08e92]" />
          <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
            {{ t('difference.eyebrow') }}
          </text>
        </view>

        <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
          {{ t('difference.title') }}
          <text class="italic text-[#d71934]">& {{ t('difference.titleAccent') }}</text>
        </view>

        <view class="mt-5 max-w-[420px] text-[19px] italic leading-8 text-[#8c6b49] lg:text-[21px]">
          {{ t('difference.subtitle') }}
        </view>

        <view class="mt-10 border border-[#e3d5c4] bg-[#fbf6ed] px-7 py-8">
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">Editorial Note</view>
          <view class="mt-4 text-[17px] leading-8 text-[#6d5a48]">
            {{ t(differenceCards[0].desc) }}
          </view>
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-2">
        <view
            class="border border-[#1f3047] bg-[#1f3047] px-9 py-10 text-white shadow-[0_24px_60px_rgba(18,35,56,0.12)] lg:translate-y-10"
        >
          <view class="text-[15px] uppercase tracking-[5px] text-[#d7b86e]">
            {{ differenceCards[0].index }}
          </view>
          <view class="mt-6 text-[34px] font-semibold leading-[1.2] text-[#fffaf2]">
            {{ t(differenceCards[0].title) }}
          </view>
          <view class="mt-6 text-[17px] leading-8 text-[#ecdfcf]">
            {{ t(differenceCards[0].desc) }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="border border-[#e2d7c9] bg-white px-8 py-9">
            <view class="text-[15px] uppercase tracking-[5px] text-[#cf9aa0]">
              {{ differenceCards[1].index }}
            </view>
            <view class="mt-5 text-[30px] font-semibold text-[#1f1f1f]">
              {{ t(differenceCards[1].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
              {{ t(differenceCards[1].desc) }}
            </view>
          </view>

          <view class="border border-[#d71934]/20 bg-[#f4e0de] px-8 py-9 lg:ml-10">
            <view class="text-[15px] uppercase tracking-[5px] text-[#b96373]">
              {{ differenceCards[2].index }}
            </view>
            <view class="mt-5 text-[30px] font-semibold text-[#1f1f1f]">
              {{ t(differenceCards[2].title) }}
            </view>
            <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
              {{ t(differenceCards[2].desc) }}
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

const differenceCards = [
  { index: '01', title: 'difference.card1.title', desc: 'difference.card1.desc' },
  { index: '02', title: 'difference.card2.title', desc: 'difference.card2.desc' },
  { index: '03', title: 'difference.card3.title', desc: 'difference.card3.desc' }
]
</script>
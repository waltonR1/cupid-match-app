<template>
  <view class="mx-auto max-w-[1280px] px-8 py-24">
    <view class="grid gap-20 lg:grid-cols-[1.02fr_0.98fr]">
      <view>
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-[#d08e92]" />
          <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
            {{ t('origin.eyebrow') }}
          </text>
        </view>

        <view class="text-[44px] font-semibold leading-[1.15] lg:text-[66px]">
          {{ t('origin.title') }}
          <text class="text-[#d71934]">{{ t('origin.titleAccent') }}</text>
        </view>

        <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-[#8b6e4d]">
          {{ t('origin.description') }}
        </view>

        <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-[#8b6e4d]">
          {{ t('origin.secondaryDescription') }}
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-[#e2d7c9] bg-[#efe7d8] px-8 py-8">
          <view class="text-[18px] uppercase tracking-[5px] text-[#cf9aa0]">Paris</view>
          <view class="mt-4 text-[28px] font-semibold text-[#1f1f1f]">
            {{ t('origin.card1.title') }}
          </view>
          <view class="mt-4 text-[16px] leading-8 text-[#6b5c4d]">
            {{ t('origin.card1.desc') }}
          </view>
        </view>

        <view class="border border-[#21344b] bg-[#203854] px-8 py-8 text-white">
          <view class="text-[18px] uppercase tracking-[5px] text-[#d7b86e]">Global</view>
          <view class="mt-4 text-[28px] font-semibold text-[#fffaf2]">
            {{ t('origin.card2.title') }}
          </view>
          <view class="mt-4 text-[16px] leading-8 text-[#ecdfcf]">
            {{ t('origin.card2.desc') }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('about')
</script>
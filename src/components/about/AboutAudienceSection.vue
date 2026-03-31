<template>
  <view class="mx-auto max-w-[1280px] px-8 py-24">
    <view class="mb-12">
      <view class="mb-5 inline-flex items-center gap-4">
        <view class="h-[1px] w-16 bg-[#d08e92]" />
        <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
          {{ t('audience.eyebrow') }}
        </text>
      </view>

      <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
        {{ t('audience.title') }}
        <text class="italic text-[#d71934]">& {{ t('audience.titleAccent') }}</text>
      </view>

      <view class="mt-5 max-w-[780px] text-[19px] italic leading-8 text-[#8c6b49] lg:text-[21px]">
        {{ t('audience.subtitle') }}
      </view>
    </view>

    <view class="grid gap-6 lg:grid-cols-4">
      <view
          v-for="(item, index) in audienceCards"
          :key="item.title"
          class="px-7 py-8"
          :class="index === 0 ? 'bg-[#1c2736] text-white lg:translate-y-10' : index === 1 ? 'bg-white' : index === 2 ? 'bg-[#f2e4d7]' : 'bg-[#d71934] text-white lg:-translate-y-6'"
      >
        <view class="text-[40px]">{{ item.icon }}</view>
        <view class="mt-8 text-[28px] font-semibold leading-[1.25]" :class="index === 0 || index === 3 ? 'text-white' : 'text-[#1f1f1f]'">
          {{ t(item.title) }}
        </view>
        <view class="mt-5 text-[16px] leading-8" :class="index === 0 || index === 3 ? 'text-white/78' : 'text-[#6c5c4d]'">
          {{ t(item.desc) }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('about')

const audienceCards = [
  { icon: '🎓', title: 'audience.card1.title', desc: 'audience.card1.desc' },
  { icon: '🌍', title: 'audience.card2.title', desc: 'audience.card2.desc' },
  { icon: '🤍', title: 'audience.card3.title', desc: 'audience.card3.desc' },
  { icon: '✨', title: 'audience.card4.title', desc: 'audience.card4.desc' }
]
</script>
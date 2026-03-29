<template>
  <view class="bg-[#f3ede3]">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <!-- 标题区 -->
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view class="max-w-[760px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">
              {{ t('membership.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-[#1f1a1c] lg:text-[56px]">
            <text>{{ t('membership.title') }}</text>
            <text class="text-[#d71934]"> · {{ t('membership.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] leading-8 text-[#8c6b49] lg:text-[19px]">
          {{ t('membership.subtitle') }}
        </view>
      </view>

      <!-- 四张卡片：同宽同高 -->
      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <!-- Free -->
        <view
            class="flex min-h-[560px] flex-col border border-[#ddd6c8] bg-[#faf7f1] px-7 py-8 text-[#1f1f1f] lg:px-8 lg:py-9"
        >
          <view class="text-[13px] uppercase tracking-[5px] text-[#9b907f]">
            {{ t('membership.free.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] lg:text-[38px]">
            {{ t('membership.free.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.free.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-[#7f7669]">
              {{ t('membership.free.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-[#8a7a67]">
            {{ t('membership.free.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8 text-[#4e463d]">
            <view>• {{ t('membership.free.f1') }}</view>
            <view>• {{ t('membership.free.f2') }}</view>
            <view>• {{ t('membership.free.f3') }}</view>
          </view>

          <button
              class="mt-auto w-full border border-[#1f1f1f] bg-transparent px-4 py-3 text-[16px] text-[#1f1f1f]"
              @click="openPlan('free')"
          >
            {{ t('membership.free.button') }}
          </button>
        </view>

        <!-- Silver -->
        <view
            class="flex min-h-[560px] flex-col border border-[#dbcdb6] bg-[#fbf7ef] px-7 py-8 text-[#2d241d] lg:px-8 lg:py-9"
        >
          <view class="text-[13px] uppercase tracking-[5px] text-[#b08b4f]">
            {{ t('membership.vip.silver.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] text-[#8b6a36] lg:text-[38px]">
            {{ t('membership.vip.silver.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.vip.silver.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-[#7d7367]">
              {{ t('membership.vip.silver.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-[#8a7a67]">
            {{ t('membership.vip.silver.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8">
            <view>• {{ t('membership.vip.silver.f1') }}</view>
            <view>• {{ t('membership.vip.silver.f2') }}</view>
            <view>• {{ t('membership.vip.silver.f3') }}</view>
          </view>

          <button
              class="mt-auto w-full border border-[#8b6a36] bg-transparent px-4 py-3 text-[16px] text-[#8b6a36]"
              @click="openPlan('silver')"
          >
            {{ t('membership.vip.cta') }}
          </button>
        </view>

        <!-- Gold -->
        <view
            class="flex min-h-[560px] flex-col border border-[#d7b86e] bg-[#203854] px-7 py-8 text-white shadow-[0_18px_40px_rgba(22,41,65,0.12)] lg:px-8 lg:py-9"
        >
          <view class="text-[13px] uppercase tracking-[5px] text-[#d7b86e]">
            {{ t('membership.vip.gold.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] text-[#f4d27f] lg:text-[38px]">
            {{ t('membership.vip.gold.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.vip.gold.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-white/70">
              {{ t('membership.vip.gold.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-white/70">
            {{ t('membership.vip.gold.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8 text-[#f0e6d8]">
            <view>• {{ t('membership.vip.gold.f1') }}</view>
            <view>• {{ t('membership.vip.gold.f2') }}</view>
            <view>• {{ t('membership.vip.gold.f3') }}</view>
          </view>

          <button
              class="mt-auto w-full border border-[#d7b86e] bg-[#d7b86e] px-4 py-3 text-[16px] text-[#1f3047]"
              @click="openPlan('gold')"
          >
            {{ t('membership.vip.cta') }}
          </button>
        </view>

        <!-- Diamond -->
        <view
            class="flex min-h-[560px] flex-col border border-[#d90429] bg-[#d90429] px-7 py-8 text-white lg:px-8 lg:py-9"
        >
          <view class="text-[13px] uppercase tracking-[5px] text-[#ffd5dc]">
            {{ t('membership.vip.diamond.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] text-[#fff3f5] lg:text-[38px]">
            {{ t('membership.vip.diamond.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.vip.diamond.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-white/75">
              {{ t('membership.vip.diamond.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-white/75">
            {{ t('membership.vip.diamond.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8 text-[#fff1f3]">
            <view>• {{ t('membership.vip.diamond.f1') }}</view>
            <view>• {{ t('membership.vip.diamond.f2') }}</view>
            <view>• {{ t('membership.vip.diamond.f3') }}</view>
          </view>

          <button
              class="mt-auto w-full border border-white bg-white px-4 py-3 text-[16px] text-[#d90429]"
              @click="openPlan('diamond')"
          >
            {{ t('membership.vip.cta') }}
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'

const { t } = usePageI18n('home')

function openPlan(plan: string) {
  openRegisterPage(plan)
}
</script>
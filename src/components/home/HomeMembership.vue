<template>
  <view class="bg-page-soft">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view class="max-w-[760px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-brand-rose-line" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-rose">
              {{ t('membership.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-text-heading lg:text-[56px]">
            <text>{{ t('membership.title') }}</text>
            <text class="text-brand-primary"> · {{ t('membership.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] leading-8 text-text-warm lg:text-[19px]">
          {{ t('membership.subtitle') }}
        </view>
      </view>

      <!-- 四张卡片：同宽同高 -->
      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <!-- Free -->
        <view class="flex min-h-[560px] flex-col border border-border-subtle bg-surface-card px-7 py-8 text-button-neutral lg:px-8 lg:py-9">
          <view class="text-[13px] uppercase tracking-[5px] text-text-subtle">
            {{ t('membership.free.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] lg:text-[38px]">
            {{ t('membership.free.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.free.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-text-muted">
              {{ t('membership.free.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-text-muted">
            {{ t('membership.free.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8 text-text-body">
            <view>• {{ t('membership.free.f1') }}</view>
            <view>• {{ t('membership.free.f2') }}</view>
            <view>• {{ t('membership.free.f3') }}</view>
          </view>

          <view
            class="mt-auto inline-flex w-full cursor-pointer items-center justify-center rounded-button border border-button-neutral/55 bg-transparent py-btn-cta-y text-[16px] font-medium tracking-[0.5px] text-button-neutral transition-all duration-300 hover:border-button-neutral hover:bg-button-neutral hover:text-white"
            @click="openPlan('free')"
          >
            {{ t('membership.free.button') }}
          </view>
        </view>

        <!-- Silver -->
        <view class="flex min-h-[560px] flex-col border border-border-highlight/50 bg-surface-card-soft px-7 py-8 text-text-heading lg:px-8 lg:py-9">
          <view class="text-[13px] uppercase tracking-[5px] text-brand-brown">
            {{ t('membership.vip.silver.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] text-brand-brown lg:text-[38px]">
            {{ t('membership.vip.silver.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.vip.silver.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-text-muted">
              {{ t('membership.vip.silver.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-text-muted">
            {{ t('membership.vip.silver.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8">
            <view>• {{ t('membership.vip.silver.f1') }}</view>
            <view>• {{ t('membership.vip.silver.f2') }}</view>
            <view>• {{ t('membership.vip.silver.f3') }}</view>
          </view>

          <view
            class="mt-auto inline-flex w-full cursor-pointer items-center justify-center rounded-button border border-brand-brown/70 bg-transparent py-btn-cta-y text-[16px] font-medium tracking-[0.5px] text-brand-brown transition-all duration-300 hover:border-brand-brown hover:bg-brand-brown hover:text-surface-card-soft"
            @click="openPlan('silver')"
          >
            {{ t('membership.vip.cta') }}
          </view>
        </view>

        <!-- Gold -->
        <view class="flex min-h-[560px] flex-col border border-border-highlight bg-surface-inverse-strong px-7 py-8 text-text-inverse shadow-[0_18px_40px_rgba(22,41,65,0.12)] lg:px-8 lg:py-9">
          <view class="text-[13px] uppercase tracking-[5px] text-brand-highlight">
            {{ t('membership.vip.gold.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] text-brand-highlight-warm lg:text-[38px]">
            {{ t('membership.vip.gold.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.vip.gold.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-text-inverse-subtle">
              {{ t('membership.vip.gold.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-text-inverse-subtle">
            {{ t('membership.vip.gold.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8 text-text-inverse-soft">
            <view>• {{ t('membership.vip.gold.f1') }}</view>
            <view>• {{ t('membership.vip.gold.f2') }}</view>
            <view>• {{ t('membership.vip.gold.f3') }}</view>
          </view>

          <view
            class="mt-auto inline-flex w-full cursor-pointer items-center justify-center rounded-button border border-button-highlight bg-button-highlight py-btn-cta-y text-[16px] font-medium tracking-[0.5px] text-button-neutral-ink transition-all duration-300 hover:-translate-y-[1px] hover:border-button-highlight-hover hover:bg-button-highlight-hover"
            @click="openPlan('gold')"
          >
            {{ t('membership.vip.cta') }}
          </view>
        </view>

        <!-- Diamond -->
        <view class="flex min-h-[560px] flex-col border border-border-accent-strong bg-button-primary px-7 py-8 text-text-inverse lg:px-8 lg:py-9">
          <view class="text-[13px] uppercase tracking-[5px] text-brand-primary-soft">
            {{ t('membership.vip.diamond.badge') }}
          </view>

          <view class="mt-5 text-[34px] font-semibold leading-[1.18] text-text-inverse lg:text-[38px]">
            {{ t('membership.vip.diamond.name') }}
          </view>

          <view class="mt-8 text-[30px] font-semibold leading-none lg:text-[32px]">
            {{ t('membership.vip.diamond.price') }}
            <text class="ml-1 text-[17px] font-normal leading-normal text-text-inverse-soft">
              {{ t('membership.vip.diamond.priceNote') }}
            </text>
          </view>

          <view class="mt-3 text-[15px] italic text-text-inverse-soft">
            {{ t('membership.vip.diamond.period') }}
          </view>

          <view class="mt-8 space-y-3 text-[16px] leading-8 text-text-inverse">
            <view>• {{ t('membership.vip.diamond.f1') }}</view>
            <view>• {{ t('membership.vip.diamond.f2') }}</view>
            <view>• {{ t('membership.vip.diamond.f3') }}</view>
          </view>

          <view
            class="mt-auto inline-flex w-full cursor-pointer items-center justify-center rounded-button border border-white bg-white py-btn-cta-y text-[16px] font-medium tracking-[0.5px] text-button-primary transition-all duration-300 hover:-translate-y-[1px] hover:bg-white/95"
            @click="openPlan('diamond')"
          >
            {{ t('membership.vip.cta') }}
          </view>
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

<template>
  <view class="relative overflow-hidden bg-page-base text-text-heading">
    <!-- ambient background -->
    <view class="pointer-events-none absolute inset-0">
      <view
          class="absolute inset-0 bg-decor-ambient"
      />
      <view
          class="absolute right-[-140px] top-[-20px] h-[300px] w-[300px] rounded-full bg-decor-glow blur-3xl"
      />
      <view
          class="absolute bottom-[-120px] left-[-100px] h-[240px] w-[240px] rounded-full bg-decor-haze blur-3xl"
      />
    </view>

    <view class="relative mx-auto max-w-[1240px] px-6 py-16 lg:px-8 lg:py-20">
      <!-- header -->
      <view class="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
        <view class="pt-2">
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-10 bg-brand-accent" />
            <text class="text-[10px] uppercase tracking-[4px] text-text-subtle dark:text-text-inverse-subtle">
              {{ t('membership.eyebrow') }}
            </text>
          </view>

          <view class="max-w-[760px]">
            <view
                class="text-[32px] font-semibold leading-[1.06] text-text-heading dark:text-text-inverse lg:text-[52px]"
            >
              <text>{{ t('membership.title') }}</text>
              <text class="text-brand-accent"> · {{ t('membership.titleAccent') }}</text>
            </view>

            <view
                class="mt-4 max-w-[700px] text-[14px] leading-7 text-text-body dark:text-text-inverse-soft lg:text-[15px]"
            >
              {{ t('membership.subtitle') }}
            </view>
          </view>
        </view>
      </view>

      <!-- membership cards -->
      <view class="grid gap-4 lg:grid-cols-[0.92fr_1fr_1.06fr]">
        <!-- silver -->
        <view
            class="relative flex min-h-[460px] flex-col overflow-hidden border border-border-membership-silver bg-surface-membership-silver px-5 py-6 shadow-card dark:border-border-membership-silver dark:bg-surface-membership-silver dark:shadow-card lg:px-6"
        >
          <view class="text-[10px] uppercase tracking-[3px] text-brand-support-soft dark:text-text-inverse-subtle">
            {{ t('membership.vip.silver.badge') }}
          </view>

          <view class="mt-3 h-px w-10 bg-border-membership-silver" />

          <view
              class="mt-5 text-[28px] font-semibold leading-[1.12] text-text-heading dark:text-text-inverse lg:text-[32px]"
          >
            {{ t('membership.vip.silver.name') }}
          </view>

          <view
              class="mt-3 text-[13px] leading-6 text-text-body dark:text-text-inverse-soft"
          >
            {{ t('membership.vip.silver.description') }}
          </view>

          <view class="mt-6">
            <view
                class="text-[36px] font-semibold leading-none text-text-heading dark:text-text-inverse"
            >
              {{ t('membership.vip.silver.price') }}
            </view>
            <view
                class="mt-2 text-[12px] leading-5 text-text-muted dark:text-text-inverse-subtle"
            >
              {{ t('membership.vip.silver.priceNote') }}
            </view>
            <view
                class="mt-1 text-[12px] italic leading-5 text-text-muted dark:text-text-inverse-subtle"
            >
              {{ t('membership.vip.silver.period') }}
            </view>
          </view>

          <view class="mt-6 h-px w-full bg-border-soft dark:bg-border-inverse" />

          <view
              class="mt-6 space-y-3 text-[13px] leading-6 text-text-body dark:text-text-inverse-soft"
          >
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.silver.f1') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.silver.f2') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.silver.f3') }}</text>
            </view>
          </view>

          <view
              class="mt-auto inline-flex w-full cursor-pointer items-center justify-center border border-border-membership-silver bg-transparent py-[0.75rem] text-[14px] font-medium tracking-[0.3px] text-text-heading transition-all duration-300 hover:bg-black/[0.03] dark:text-text-inverse dark:hover:bg-white/5"
              @click="openPlan('silver')"
          >
            {{ t('membership.vip.cta') }}
          </view>
        </view>

        <!-- gold -->
        <view
            class="relative flex min-h-[460px] flex-col overflow-hidden border border-border-membership-gold bg-membership-gold-card px-5 py-6 shadow-emphasis dark:border-border-membership-gold lg:px-6"
        >
          <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/70" />
          <view class="absolute inset-0 bg-membership-gold-card-glow" />

          <view class="relative text-[10px] uppercase tracking-[3px] text-brand-accent-foreground">
            {{ t('membership.vip.gold.badge') }}
          </view>

          <view class="relative mt-3 h-px w-10 bg-border-membership-gold" />

          <view
              class="relative mt-5 text-[28px] font-semibold leading-[1.12] text-brand-accent-foreground lg:text-[32px]"
          >
            {{ t('membership.vip.gold.name') }}
          </view>

          <view class="relative mt-3 text-[13px] leading-6 text-text-inverse-soft">
            {{ t('membership.vip.gold.description') }}
          </view>

          <view class="relative mt-6">
            <view class="text-[36px] font-semibold leading-none text-text-inverse">
              {{ t('membership.vip.gold.price') }}
            </view>
            <view class="mt-2 text-[12px] leading-5 text-text-inverse-subtle">
              {{ t('membership.vip.gold.priceNote') }}
            </view>
            <view class="mt-1 text-[12px] italic leading-5 text-text-inverse-subtle">
              {{ t('membership.vip.gold.period') }}
            </view>
          </view>

          <view class="relative mt-6 h-px w-full bg-brand-accent/22" />

          <view class="relative mt-6 space-y-3 text-[13px] leading-6 text-text-inverse-soft">
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.gold.f1') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.gold.f2') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.gold.f3') }}</text>
            </view>
          </view>

          <view
              class="relative mt-auto inline-flex w-full cursor-pointer items-center justify-center border border-button-membership-gold bg-button-membership-gold py-[0.75rem] text-[14px] font-medium tracking-[0.3px] text-button-neutral-ink transition-all duration-300 hover:border-button-membership-gold-hover hover:bg-button-membership-gold-hover"
              @click="openPlan('gold')"
          >
            {{ t('membership.vip.cta') }}
          </view>
        </view>

        <!-- diamond -->
        <view
            class="relative flex min-h-[490px] flex-col overflow-hidden border border-brand-accent bg-membership-diamond-card px-5 py-6 shadow-luxe ring-1 ring-brand-accent/18 lg:-translate-y-1 lg:px-6"
        >
          <view class="absolute inset-x-0 top-0 h-[2px] bg-brand-accent" />
          <view class="absolute inset-y-0 right-0 w-[46%] bg-membership-diamond-card-glow" />

          <view
              class="relative inline-flex w-fit items-center border border-brand-accent/35 bg-brand-accent/10 px-2.5 py-1 text-[10px] uppercase tracking-[3px] text-brand-accent-foreground"
          >
            {{ t('membership.vip.diamond.badge') }}
          </view>

          <view class="relative mt-4 h-px w-12 bg-brand-accent/70" />

          <view
              class="relative mt-5 text-[30px] font-semibold leading-[1.1] text-brand-accent-foreground lg:text-[34px]"
          >
            {{ t('membership.vip.diamond.name') }}
          </view>

          <view class="relative mt-3 text-[13px] leading-6 text-text-inverse-soft">
            {{ t('membership.vip.diamond.description') }}
          </view>

          <view class="relative mt-6">
            <view class="text-[40px] font-semibold leading-none text-text-inverse">
              {{ t('membership.vip.diamond.price') }}
            </view>
            <view class="mt-2 text-[12px] leading-5 text-text-inverse-subtle">
              {{ t('membership.vip.diamond.priceNote') }}
            </view>
            <view class="mt-1 text-[12px] italic leading-5 text-text-inverse-subtle">
              {{ t('membership.vip.diamond.period') }}
            </view>
          </view>

          <view class="relative mt-7 h-px w-full bg-brand-accent/25" />

          <view class="relative mt-6 space-y-3 text-[13px] leading-6 text-text-inverse-soft">
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.diamond.f1') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.diamond.f2') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.vip.diamond.f3') }}</text>
            </view>
          </view>

          <view class="relative mt-auto pt-6">
            <view class="mb-3 text-[10px] uppercase tracking-[3px] text-brand-accent/80">
              {{ t('membership.vip.diamond.accessLabel') }}
            </view>

            <view
                class="inline-flex w-full cursor-pointer items-center justify-center border border-button-membership-diamond bg-button-membership-diamond py-[0.75rem] text-[14px] font-medium tracking-[0.3px] text-button-neutral-ink transition-all duration-300 hover:border-button-membership-diamond-hover hover:bg-button-membership-diamond-hover"
                @click="openPlan('diamond')"
            >
              {{ t('membership.vip.cta') }}
            </view>
          </view>
        </view>
      </view>

      <!-- complimentary access -->
      <view
          class="mt-4 border border-border-base bg-surface-card px-5 py-5 shadow-card dark:border-border-inverse-soft dark:bg-surface-inverse-panel/88 dark:shadow-panel lg:px-6"
      >
        <view class="grid gap-5 lg:grid-cols-[210px_120px_minmax(0,1fr)_150px] lg:items-center">
          <view>
            <view class="text-[10px] uppercase tracking-[3px] text-text-subtle dark:text-text-inverse-subtle">
              {{ t('membership.free.badge') }}
            </view>
            <view
                class="mt-2 text-[24px] font-semibold leading-[1.14] text-text-heading dark:text-text-inverse"
            >
              {{ t('membership.free.name') }}
            </view>
            <view class="mt-2 text-[12px] leading-6 text-text-body dark:text-text-inverse-soft">
              {{ t('membership.free.description') }}
            </view>
          </view>

          <view>
            <view
                class="text-[30px] font-semibold leading-none text-text-heading dark:text-text-inverse"
            >
              {{ t('membership.free.price') }}
            </view>
            <view class="mt-2 text-[12px] leading-5 text-text-muted dark:text-text-inverse-subtle">
              {{ t('membership.free.priceNote') }}
            </view>
            <view class="mt-1 text-[12px] italic leading-5 text-text-muted dark:text-text-inverse-subtle">
              {{ t('membership.free.period') }}
            </view>
          </view>

          <view
              class="grid gap-2 text-[12px] leading-6 text-text-body dark:text-text-inverse-soft lg:grid-cols-3 lg:gap-4"
          >
            <view class="flex gap-2">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.free.f1') }}</text>
            </view>
            <view class="flex gap-2">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.free.f2') }}</text>
            </view>
            <view class="flex gap-2">
              <text class="text-brand-accent">—</text>
              <text>{{ t('membership.free.f3') }}</text>
            </view>
          </view>

          <view
              class="inline-flex w-full cursor-pointer items-center justify-center border border-border-base bg-transparent py-[0.72rem] text-[13px] font-medium tracking-[0.3px] text-text-heading transition-all duration-300 hover:bg-black/[0.03] dark:border-border-inverse-hover dark:text-text-inverse dark:hover:bg-white/5"
              @click="openPlan('free')"
          >
            {{ t('membership.free.button') }}
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

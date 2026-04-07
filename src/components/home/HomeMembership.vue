<template>
  <view class="relative overflow-hidden bg-next-semantic-page-default text-next-semantic-text-primary">
    <!-- ambient background -->
    <view class="pointer-events-none absolute inset-0">
      <view class="absolute inset-0 bg-next-gradient-home-membership-ambient" />
    </view>

    <view class="relative mx-auto max-w-[1240px] px-6 py-16 lg:px-8 lg:py-20">
      <!-- header -->
      <view class="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
        <view class="pt-2">
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-10 bg-next-semantic-accent-primary" />
            <text class="text-[10px] uppercase tracking-[4px] text-next-semantic-text-subtle">
              {{ t('membership.eyebrow') }}
            </text>
          </view>

          <view class="max-w-[760px]">
            <view class="text-[32px] font-semibold leading-[1.06] text-next-semantic-text-primary lg:text-[52px]">
              <text>{{ t('membership.title') }}</text>
              <text class="text-next-semantic-accent-primary"> · {{ t('membership.titleAccent') }}</text>
            </view>

            <view class="mt-4 max-w-[700px] text-[14px] leading-7 text-next-semantic-text-secondary lg:text-[15px]">
              {{ t('membership.subtitle') }}
            </view>
          </view>
        </view>
      </view>

      <!-- membership cards -->
      <view class="grid gap-4 lg:grid-cols-[0.92fr_1fr_1.06fr]">
        <!-- silver -->
        <view
          class="relative flex min-h-[460px] flex-col overflow-hidden border border-next-component-home-membership-silver-border bg-next-gradient-home-membership-silver-card px-5 py-6 shadow-next-shadow-panel lg:px-6"
        >
          <view class="absolute inset-x-0 top-0 h-px bg-next-component-home-membership-silver-line" />
          <view class="absolute inset-0 bg-next-gradient-home-membership-silver-glow" />

          <view class="relative text-[10px] uppercase tracking-[3px] text-next-semantic-accent-muted">
            {{ t('membership.vip.silver.badge') }}
          </view>

          <view class="relative mt-3 h-px w-10 bg-next-component-home-membership-silver-line" />

          <view class="relative mt-5 text-[28px] font-semibold leading-[1.12] text-next-semantic-text-primary lg:text-[32px]">
            {{ t('membership.vip.silver.name') }}
          </view>

          <view class="relative mt-3 text-[13px] leading-6 text-next-semantic-text-secondary">
            {{ t('membership.vip.silver.description') }}
          </view>

          <view class="relative mt-6">
            <view class="text-[36px] font-semibold leading-none text-next-semantic-text-primary">
              {{ t('membership.vip.silver.price') }}
            </view>
            <view class="mt-2 text-[12px] leading-5 text-next-semantic-text-muted">
              {{ t('membership.vip.silver.priceNote') }}
            </view>
            <view class="mt-1 text-[12px] italic leading-5 text-next-semantic-text-muted">
              {{ t('membership.vip.silver.period') }}
            </view>
          </view>

          <view class="relative mt-6 h-px w-full bg-next-component-home-membership-silver-line" />

          <view class="relative mt-6 space-y-3 text-[13px] leading-6 text-next-semantic-text-secondary">
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.silver.f1') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.silver.f2') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.silver.f3') }}</text>
            </view>
          </view>

          <AppButton
            variant="secondary"
            context="membership-silver"
            size="sm"
            width="full"
            rounded="none"
            class="relative mt-auto"
            @click="openPlan('silver')"
          >
            {{ t('membership.vip.cta') }}
          </AppButton>
        </view>

        <!-- gold -->
        <view
          class="relative flex min-h-[460px] flex-col overflow-hidden border border-next-semantic-accent-secondary bg-next-gradient-home-membership-gold-card px-5 py-6 shadow-next-shadow-emphasis lg:px-6"
        >
          <view class="absolute inset-x-0 top-0 h-px bg-next-component-home-membership-gold-accent" />
          <view class="absolute inset-0 bg-next-gradient-home-membership-gold-glow" />

          <view class="relative text-[10px] uppercase tracking-[3px] text-next-semantic-text-inverse-subtle">
            {{ t('membership.vip.gold.badge') }}
          </view>

          <view class="relative mt-3 h-px w-10 bg-next-component-home-membership-gold-accent" />

          <view class="relative mt-5 text-[28px] font-semibold leading-[1.12] text-next-semantic-text-inverse lg:text-[32px]">
            {{ t('membership.vip.gold.name') }}
          </view>

          <view class="relative mt-3 text-[13px] leading-6 text-next-semantic-text-inverse-muted">
            {{ t('membership.vip.gold.description') }}
          </view>

          <view class="relative mt-6">
            <view class="text-[36px] font-semibold leading-none text-next-semantic-text-inverse">
              {{ t('membership.vip.gold.price') }}
            </view>
            <view class="mt-2 text-[12px] leading-5 text-next-semantic-text-inverse-subtle">
              {{ t('membership.vip.gold.priceNote') }}
            </view>
            <view class="mt-1 text-[12px] italic leading-5 text-next-semantic-text-inverse-subtle">
              {{ t('membership.vip.gold.period') }}
            </view>
          </view>

          <view class="relative mt-6 h-px w-full bg-next-component-home-membership-gold-divider" />

          <view class="relative mt-6 space-y-3 text-[13px] leading-6 text-next-semantic-text-inverse-muted">
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.gold.f1') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.gold.f2') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.gold.f3') }}</text>
            </view>
          </view>

          <AppButton
            variant="secondary"
            context="membership-gold"
            size="sm"
            width="full"
            rounded="none"
            class="relative mt-auto"
            @click="openPlan('gold')"
          >
            {{ t('membership.vip.cta') }}
          </AppButton>
        </view>

        <!-- diamond -->
        <view
          class="relative flex min-h-[490px] flex-col overflow-hidden border border-next-component-home-membership-diamond-border bg-next-gradient-home-membership-diamond-card px-5 py-6 shadow-next-shadow-luxe ring-1 ring-next-component-home-membership-diamond-ring lg:-translate-y-1 lg:px-6"
        >
          <view class="absolute inset-x-0 top-0 h-[2px] bg-next-component-home-membership-diamond-line" />
          <view class="absolute inset-y-0 right-0 w-[46%] bg-next-gradient-home-membership-diamond-glow" />

          <view
            class="relative inline-flex w-fit items-center border border-next-component-home-membership-diamond-badge-border bg-next-component-home-membership-diamond-badge-background px-2.5 py-1 text-[10px] uppercase tracking-[3px] text-next-semantic-text-inverse"
          >
            {{ t('membership.vip.diamond.badge') }}
          </view>

          <view class="relative mt-4 h-px w-12 bg-next-component-home-membership-diamond-line" />

          <view class="relative mt-5 text-[30px] font-semibold leading-[1.1] text-next-semantic-text-inverse lg:text-[34px]">
            {{ t('membership.vip.diamond.name') }}
          </view>

          <view class="relative mt-3 text-[13px] leading-6 text-next-semantic-text-inverse-muted">
            {{ t('membership.vip.diamond.description') }}
          </view>

          <view class="relative mt-6">
            <view class="text-[40px] font-semibold leading-none text-next-semantic-text-inverse">
              {{ t('membership.vip.diamond.price') }}
            </view>
            <view class="mt-2 text-[12px] leading-5 text-next-semantic-text-inverse-subtle">
              {{ t('membership.vip.diamond.priceNote') }}
            </view>
            <view class="mt-1 text-[12px] italic leading-5 text-next-semantic-text-inverse-subtle">
              {{ t('membership.vip.diamond.period') }}
            </view>
          </view>

          <view class="relative mt-7 h-px w-full bg-next-component-home-membership-diamond-divider" />

          <view class="relative mt-6 space-y-3 text-[13px] leading-6 text-next-semantic-text-inverse-muted">
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.diamond.f1') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.diamond.f2') }}</text>
            </view>
            <view class="flex gap-3">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.vip.diamond.f3') }}</text>
            </view>
          </view>

          <view class="relative mt-auto pt-6">
            <view class="mb-3 text-[10px] uppercase tracking-[3px] text-next-component-home-membership-diamond-access-label">
              {{ t('membership.vip.diamond.accessLabel') }}
            </view>

            <AppButton
              variant="secondary"
              context="membership-diamond"
              size="sm"
              width="full"
              rounded="none"
              @click="openPlan('diamond')"
            >
              {{ t('membership.vip.cta') }}
            </AppButton>
          </view>
        </view>
      </view>

      <!-- complimentary access -->
      <view
        class="mt-4 border border-next-component-home-membership-free-panel-border bg-next-component-home-membership-free-panel-background px-5 py-5 shadow-next-shadow-panel lg:px-6"
      >
        <view class="grid gap-5 lg:grid-cols-[210px_120px_minmax(0,1fr)_150px] lg:items-center">
          <view>
            <view class="text-[10px] uppercase tracking-[3px] text-next-semantic-text-subtle">
              {{ t('membership.free.badge') }}
            </view>
            <view class="mt-2 text-[24px] font-semibold leading-[1.14] text-next-semantic-text-primary">
              {{ t('membership.free.name') }}
            </view>
            <view class="mt-2 text-[12px] leading-6 text-next-semantic-text-secondary">
              {{ t('membership.free.description') }}
            </view>
          </view>

          <view>
            <view class="text-[30px] font-semibold leading-none text-next-semantic-text-primary">
              {{ t('membership.free.price') }}
            </view>
            <view class="mt-2 text-[12px] leading-5 text-next-semantic-text-muted">
              {{ t('membership.free.priceNote') }}
            </view>
            <view class="mt-1 text-[12px] italic leading-5 text-next-semantic-text-muted">
              {{ t('membership.free.period') }}
            </view>
          </view>

          <view class="grid gap-2 text-[12px] leading-6 text-next-semantic-text-secondary lg:grid-cols-3 lg:gap-4">
            <view class="flex gap-2">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.free.f1') }}</text>
            </view>
            <view class="flex gap-2">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.free.f2') }}</text>
            </view>
            <view class="flex gap-2">
              <text class="text-next-semantic-accent-primary">—</text>
              <text>{{ t('membership.free.f3') }}</text>
            </view>
          </view>

          <AppButton
            variant="secondary"
            context="membership-free"
            size="sm"
            width="full"
            rounded="none"
            @click="openPlan('free')"
          >
            {{ t('membership.free.button') }}
          </AppButton>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'

const { t } = usePageI18n('home')

function openPlan(plan: string) {
  openRegisterPage(plan)
}
</script>

<template>
  <view class="bg-page-base">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view class="max-w-[720px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
              {{ t('compare.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('compare.title') }}
            <text class="italic text-brand-accent-strong"> {{ t('compare.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] italic leading-8 text-text-lead">
          {{ t('compare.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
        <view class="border border-border-base bg-surface-card px-8 py-10 shadow-card">
          <view class="text-[13px] uppercase tracking-[5px] text-text-subtle">{{ t('free.badge') }}</view>

          <view class="mt-5 text-[40px] font-semibold text-text-heading">
            {{ t('free.title') }}
          </view>

          <view class="mt-8 text-[34px] font-semibold text-text-heading">
            {{ t('free.price') }}
            <text class="text-[18px] font-normal text-text-muted"> {{ t('free.priceNote') }}</text>
          </view>

          <view class="mt-8 grid gap-3">
            <view class="border border-border-light bg-surface-card-soft px-4 py-4 text-[15px] leading-7 text-text-body">
              {{ t('free.f1') }}
            </view>
            <view class="border border-border-light bg-surface-card-soft px-4 py-4 text-[15px] leading-7 text-text-body">
              {{ t('free.f2') }}
            </view>
            <view class="border border-border-light bg-surface-card-soft px-4 py-4 text-[15px] leading-7 text-text-body">
              {{ t('free.f3') }}
            </view>
            <view class="border border-border-light bg-surface-card-soft px-4 py-4 text-[15px] leading-7 text-text-body">
              {{ t('free.f4') }}
            </view>
          </view>

          <view
            class="mt-10 flex w-full cursor-pointer items-center justify-center rounded-button border border-button-neutral bg-transparent px-btn-cta-x py-btn-cta-y text-[16px] text-button-neutral transition-all duration-300 hover:-translate-y-[1px] hover:bg-surface-card-soft hover:shadow-card"
            role="button"
            @click="emit('openPlan', 'free')"
          >
            {{ t('free.cta') }}
          </view>
        </view>

        <view class="border border-border-inverse/24 bg-surface-inverse-card px-8 py-10 text-text-inverse shadow-emphasis">
          <view class="flex flex-wrap items-center justify-between gap-4">
            <view>
              <view class="text-[13px] uppercase tracking-[5px] text-brand-accent">
                {{ t('vip.label') }}
              </view>
              <view class="mt-4 text-[38px] font-semibold text-text-inverse">
                {{ t('vip.title') }}
              </view>
            </view>

            <view class="rounded-full border border-border-membership-gold/70 px-4 py-2 text-[13px] text-brand-accent-soft">
              {{ t('vip.badge') }}
            </view>
          </view>

          <view class="mt-8 grid gap-4 md:grid-cols-2">
            <view class="border border-border-inverse/16 bg-surface-inverse-panel/80 px-5 py-5 text-[15px] leading-7 text-text-inverse-soft">
              {{ t('vip.value1') }}
            </view>
            <view class="border border-border-inverse/16 bg-surface-inverse-panel/80 px-5 py-5 text-[15px] leading-7 text-text-inverse-soft">
              {{ t('vip.value2') }}
            </view>
            <view class="border border-border-inverse/16 bg-surface-inverse-panel/80 px-5 py-5 text-[15px] leading-7 text-text-inverse-soft">
              {{ t('vip.value3') }}
            </view>
            <view class="border border-border-inverse/16 bg-surface-inverse-panel/80 px-5 py-5 text-[15px] leading-7 text-text-inverse-soft">
              {{ t('vip.value4') }}
            </view>
          </view>

          <view class="mt-5 text-[16px] italic leading-8 text-text-inverse-muted">
            {{ t('vip.value5') }}
          </view>

          <view
            class="mt-8 inline-flex min-w-btn-cta cursor-pointer items-center justify-center rounded-button border border-brand-accent bg-transparent px-btn-cta-x py-btn-cta-y text-[16px] text-brand-accent-soft transition-all duration-300 hover:-translate-y-[1px] hover:bg-brand-accent/10"
            role="button"
            @click="emit('openPlan', 'vip')"
          >
            {{ t('vip.cta') }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'

const emit = defineEmits<{
  openPlan: [plan: string]
}>()

const { t } = usePageI18n('membership')
</script>

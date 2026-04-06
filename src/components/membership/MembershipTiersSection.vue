<template>
  <view class="bg-page-soft">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
              {{ t('tiers.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('tiers.title') }}
            <text class="italic text-brand-accent-strong"> {{ t('tiers.titleAccent') }}</text>
          </view>

          <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-text-lead lg:text-[21px]">
            {{ t('tiers.subtitle') }}
          </view>

          <view
            class="mt-10 inline-flex min-w-btn-cta cursor-pointer items-center justify-center rounded-button border border-button-neutral bg-transparent px-btn-cta-x py-btn-cta-y text-[16px] text-button-neutral transition-all duration-300 hover:-translate-y-[1px] hover:bg-surface-card hover:shadow-card"
            role="button"
            @click="emit('openPlan', 'vip')"
          >
            {{ t('tiers.cta') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="border border-border-membership-silver/60 bg-surface-membership-silver px-8 py-10 text-text-heading shadow-card">
            <view class="text-[13px] uppercase tracking-[5px] text-brand-support">{{ t('silver.badge') }}</view>
            <view class="mt-5 text-[40px] font-semibold">{{ t('silver.title') }}</view>
            <view class="mt-3 max-w-[460px] text-[15px] italic leading-7 text-text-body-soft">
              {{ t('tiers.silverFit') }}
            </view>

            <view class="mt-8 text-[34px] font-semibold">
              {{ t('silver.price') }}
              <text class="text-[18px] font-normal text-text-muted"> {{ t('silver.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-text-muted">{{ t('silver.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
                <view class="border border-border-membership-silver/30 bg-surface-card-soft/70 px-4 py-4 text-[14px] leading-6 text-text-body">
                {{ t('silver.f1') }}
              </view>
                <view class="border border-border-membership-silver/30 bg-surface-card-soft/70 px-4 py-4 text-[14px] leading-6 text-text-body">
                {{ t('silver.f2') }}
              </view>
                <view class="border border-border-membership-silver/30 bg-surface-card-soft/70 px-4 py-4 text-[14px] leading-6 text-text-body">
                {{ t('silver.f3') }}
              </view>
            </view>

            <view
                class="mt-8 flex w-full cursor-pointer items-center justify-center rounded-button border border-border-membership-silver bg-transparent px-btn-cta-x py-btn-cta-y text-[15px] text-text-heading transition-all duration-300 hover:-translate-y-[1px] hover:bg-surface-card-soft"
              role="button"
              @click="emit('openPlan', 'silver')"
            >
              {{ t('tiers.cardCta') }}
            </view>
          </view>

          <view class="border border-border-membership-gold/70 bg-surface-membership-gold px-8 py-10 text-text-heading shadow-feature">
            <view class="flex items-start justify-between gap-4">
              <view>
                <view class="text-[13px] uppercase tracking-[5px] text-brand-support">{{ t('gold.badge') }}</view>
                <view class="mt-5 text-[40px] font-semibold">{{ t('gold.title') }}</view>
                <view class="mt-3 max-w-[500px] text-[15px] italic leading-7 text-text-body-soft">
                  {{ t('tiers.goldFit') }}
                </view>
              </view>

              <view class="rounded-full border border-border-membership-gold/80 px-4 py-2 text-[12px] uppercase tracking-[3px] text-brand-support">
                {{ t('tiers.popular') }}
              </view>
            </view>

            <view class="mt-8 text-[34px] font-semibold">
              {{ t('gold.price') }}
              <text class="text-[18px] font-normal text-text-muted"> {{ t('gold.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-text-muted">{{ t('gold.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
                <view class="border border-border-membership-gold/35 bg-surface-card-soft/72 px-4 py-4 text-[14px] leading-6 text-text-body">
                {{ t('gold.f1') }}
              </view>
                <view class="border border-border-membership-gold/35 bg-surface-card-soft/72 px-4 py-4 text-[14px] leading-6 text-text-body">
                {{ t('gold.f2') }}
              </view>
                <view class="border border-border-membership-gold/35 bg-surface-card-soft/72 px-4 py-4 text-[14px] leading-6 text-text-body">
                {{ t('gold.f3') }}
              </view>
            </view>

            <view
                class="mt-8 flex w-full cursor-pointer items-center justify-center rounded-button border border-border-membership-gold bg-transparent px-btn-cta-x py-btn-cta-y text-[15px] text-text-heading transition-all duration-300 hover:-translate-y-[1px] hover:bg-surface-card-soft"
              role="button"
              @click="emit('openPlan', 'gold')"
            >
              {{ t('tiers.cardCta') }}
            </view>
          </view>

          <view class="border border-border-membership-diamond/70 bg-surface-membership-diamond px-8 py-10 text-text-inverse shadow-luxe">
            <view class="text-[13px] uppercase tracking-[5px] text-brand-accent-soft">{{ t('diamond.badge') }}</view>
            <view class="mt-5 text-[40px] font-semibold text-text-inverse">{{ t('diamond.title') }}</view>
            <view class="mt-3 max-w-[520px] text-[15px] italic leading-7 text-text-inverse-soft">
              {{ t('tiers.diamondFit') }}
            </view>

            <view class="mt-8 text-[34px] font-semibold text-text-inverse">
              {{ t('diamond.price') }}
              <text class="text-[18px] font-normal text-text-inverse-soft"> {{ t('diamond.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-text-inverse-soft">{{ t('diamond.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
              <view class="border border-border-membership-diamond/40 bg-surface-inverse-panel/50 px-4 py-4 text-[14px] leading-6 text-text-inverse-soft">
                {{ t('diamond.f1') }}
              </view>
              <view class="border border-border-membership-diamond/40 bg-surface-inverse-panel/50 px-4 py-4 text-[14px] leading-6 text-text-inverse-soft">
                {{ t('diamond.f2') }}
              </view>
              <view class="border border-border-membership-diamond/40 bg-surface-inverse-panel/50 px-4 py-4 text-[14px] leading-6 text-text-inverse-soft">
                {{ t('diamond.f3') }}
              </view>
            </view>

            <view
              class="mt-8 flex w-full cursor-pointer items-center justify-center rounded-button border border-border-membership-diamond bg-transparent px-btn-cta-x py-btn-cta-y text-[15px] text-text-inverse transition-all duration-300 hover:-translate-y-[1px] hover:bg-surface-inverse-panel/60"
              role="button"
              @click="emit('openPlan', 'diamond')"
            >
              {{ t('tiers.cardCta') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const emit = defineEmits<{
  openPlan: [plan: string]
}>()

const { t } = usePageI18n('membership')
</script>

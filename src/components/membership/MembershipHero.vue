<template>
  <view class="relative overflow-hidden bg-membership-hero text-text-inverse">
    <view class="pointer-events-none absolute right-[-140px] top-14 h-[320px] w-[320px] rounded-full border border-border-inverse/28" />
    <view class="mx-auto min-h-[640px] max-w-[1280px] px-8 pb-14 pt-10 lg:min-h-[700px] lg:pb-16 lg:pt-12">
      <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <view class="max-w-[620px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/34 px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-brand-highlight" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-highlight-soft">
              {{ t('hero.eyebrow') }}
            </text>
          </view>

          <view class="text-[52px] font-semibold leading-[1.02] text-text-inverse lg:text-[80px]">
            {{ t('hero.title') }}
          </view>

          <view class="mt-4 text-[30px] italic leading-[1.08] text-brand-highlight-strong lg:text-[52px]">
            {{ t('hero.titleAccent') }}
          </view>

          <view class="mt-10 max-w-[580px] text-[19px] leading-8 text-text-inverse-soft lg:text-[20px]">
            {{ t('hero.description') }}
          </view>

          <view class="mt-5 max-w-[600px] text-[17px] italic leading-8 text-text-inverse-muted lg:text-[18px]">
            {{ t('hero.secondaryDescription') }}
          </view>

          <view class="mt-10 flex flex-wrap gap-4">
            <view
              class="inline-flex min-w-btn-cta cursor-pointer items-center justify-center rounded-button border border-brand-highlight bg-brand-highlight px-btn-cta-x py-btn-cta-y text-[16px] font-medium text-button-neutral-ink transition-all duration-300 hover:-translate-y-[1px] hover:bg-button-membership-gold-hover hover:shadow-card"
              role="button"
              @click="emit('openPlan', 'vip')"
            >
              {{ t('hero.primaryCta') }}
            </view>

            <view
              class="inline-flex min-w-btn-cta cursor-pointer items-center justify-center rounded-button border border-brand-highlight/42 bg-transparent px-btn-cta-x py-btn-cta-y text-[16px] text-brand-highlight-soft transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-highlight/70 hover:bg-brand-highlight/10"
              role="button"
              @click="emit('openPlan', 'free')"
            >
              {{ t('hero.secondaryCta') }}
            </view>
          </view>
        </view>

        <view class="grid gap-5 lg:ml-auto lg:max-w-[560px]">
          <view class="border border-border-hero-float/70 bg-surface-hero-float-strong/78 px-7 py-7 shadow-soft-luxe backdrop-blur">
            <view class="text-[13px] uppercase tracking-[5px] text-brand-highlight">
              {{ t('hero.overviewTitle') }}
            </view>

            <view class="mt-4 max-w-[440px] text-[17px] leading-8 text-text-inverse-soft">
              {{ t('hero.overviewText') }}
            </view>

            <view class="mt-7 grid gap-4 md:grid-cols-3">
              <view class="border border-border-membership-silver/55 bg-surface-membership-silver px-4 py-4 text-text-heading shadow-card">
                <view class="text-[12px] uppercase tracking-[3px] text-brand-brown">
                  {{ t('heroCards.silverLabel') }}
                </view>
                <view class="mt-3 text-[26px] font-semibold">{{ t('silver.price') }}</view>
                <view class="mt-2 text-[13px] leading-6 text-text-body-soft">{{ t('silver.period') }}</view>
              </view>

              <view class="border border-border-membership-gold/70 bg-surface-membership-gold px-4 py-4 text-text-heading shadow-card">
                <view class="flex items-center justify-between gap-2">
                  <view class="text-[12px] uppercase tracking-[3px] text-brand-brown">
                    {{ t('heroCards.goldLabel') }}
                  </view>
                  <view class="rounded-full border border-border-membership-gold/70 px-2 py-1 text-[10px] uppercase tracking-[2px] text-brand-brown">
                    {{ t('tiers.popular') }}
                  </view>
                </view>
                <view class="mt-3 text-[26px] font-semibold">{{ t('gold.price') }}</view>
                <view class="mt-2 text-[13px] leading-6 text-text-body-soft">{{ t('gold.period') }}</view>
              </view>

              <view class="border border-border-membership-diamond/60 bg-surface-membership-diamond px-4 py-4 text-text-inverse shadow-luxe">
                <view class="text-[12px] uppercase tracking-[3px] text-brand-highlight-soft">
                  {{ t('heroCards.diamondLabel') }}
                </view>
                <view class="mt-3 text-[26px] font-semibold">{{ t('diamond.price') }}</view>
                <view class="mt-2 text-[13px] leading-6 text-text-inverse-soft">{{ t('diamond.period') }}</view>
              </view>
            </view>
          </view>

          <view class="border border-border-inverse/20 bg-surface-inverse-panel/26 px-6 py-6 text-[16px] leading-8 text-text-inverse-soft backdrop-blur">
            {{ t('hero.card1') }}
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

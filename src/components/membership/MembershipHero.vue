<template>
  <view class="relative overflow-hidden bg-gradient-membership-hero text-semantic-text-inverse">
  <view class="pointer-events-none absolute right-[-140px] top-14 h-[320px] w-[320px] rounded-full border border-semantic-border-hero-ornament" />
    <view class="mx-auto min-h-[640px] max-w-[1280px] px-8 pb-14 pt-10 lg:min-h-[700px] lg:pb-16 lg:pt-12">
      <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <view class="max-w-[620px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-semantic-border-hero bg-semantic-surface-hero-soft px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-hero-eyebrow">
              {{ t('hero.eyebrow') }}
            </text>
          </view>

          <view class="text-[52px] font-semibold leading-[1.02] text-semantic-text-inverse lg:text-[80px]">
            {{ t('hero.title') }}
          </view>

          <view class="mt-4 text-[30px] italic leading-[1.08] text-semantic-text-hero-highlight lg:text-[52px]">
            {{ t('hero.titleAccent') }}
          </view>

          <view class="mt-10 max-w-[580px] text-[19px] leading-8 text-semantic-text-hero-body lg:text-[20px]">
            {{ t('hero.description') }}
          </view>

          <view class="mt-5 max-w-[600px] text-[17px] italic leading-8 text-semantic-text-hero-secondary lg:text-[18px]">
            {{ t('hero.secondaryDescription') }}
          </view>

          <view class="mt-10 flex flex-wrap gap-4">
            <AppButton
              variant="primary"
              size="lg"
              width="cta"
              class="[margin-left:0] [margin-right:0]"
              @click="emit('openPlan', 'vip')"
            >
              {{ t('hero.primaryCta') }}
            </AppButton>

            <AppButton
              variant="secondary"
              context="hero"
              size="lg"
              width="cta"
              class="[margin-left:0] [margin-right:0]"
              @click="emit('openCompare')"
            >
              {{ t('hero.secondaryCta') }}
            </AppButton>
          </view>
        </view>

        <view class="grid gap-5 lg:ml-auto lg:max-w-[560px]">
          <view class="border border-semantic-border-hero bg-semantic-surface-hero-panel px-7 py-7 shadow-soft-luxe backdrop-blur">
            <view class="text-[13px] uppercase tracking-[5px] text-semantic-text-hero-label">
              {{ t('hero.overviewTitle') }}
            </view>

            <view class="mt-4 max-w-[440px] text-[17px] leading-8 text-semantic-text-hero-body">
              {{ t('hero.overviewText') }}
            </view>

            <view class="mt-7 grid gap-4 md:grid-cols-3">
              <view class="border border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card px-4 py-4 text-semantic-text-primary shadow-panel">
                <view class="text-[12px] uppercase tracking-[3px] text-component-membership-tier-silver-badge-label">
                  {{ t('heroCards.silverLabel') }}
                </view>
                <view class="mt-3 text-[26px] font-semibold">{{ t('silver.price') }}</view>
                <view class="mt-2 text-[13px] leading-6 text-semantic-text-muted">{{ t('silver.period') }}</view>
              </view>

              <view class="border border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card px-4 py-4 text-semantic-text-inverse shadow-panel">
                <view class="flex items-center justify-between gap-2">
                  <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-inverse-subtle">
                    {{ t('heroCards.goldLabel') }}
                  </view>
                  <view class="rounded-full border border-component-membership-tier-gold-border px-2 py-1 text-[10px] uppercase tracking-[2px] text-component-membership-tier-gold-badge-label">
                    {{ t('tiers.popular') }}
                  </view>
                </view>
                <view class="mt-3 text-[26px] font-semibold">{{ t('gold.price') }}</view>
                <view class="mt-2 text-[13px] leading-6 text-semantic-text-inverse-muted">{{ t('gold.period') }}</view>
              </view>

              <view class="border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card px-4 py-4 text-semantic-text-inverse shadow-luxe">
                <view class="text-[12px] uppercase tracking-[3px] text-component-membership-tier-diamond-badge-label">
                  {{ t('heroCards.diamondLabel') }}
                </view>
                <view class="mt-3 text-[26px] font-semibold">{{ t('diamond.price') }}</view>
                <view class="mt-2 text-[13px] leading-6 text-semantic-text-inverse-muted">{{ t('diamond.period') }}</view>
              </view>
            </view>
          </view>

          <view class="border border-semantic-border-hero bg-semantic-surface-hero-soft px-6 py-6 text-[16px] leading-8 text-semantic-text-hero-body backdrop-blur">
            {{ t('hero.card1') }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const emit = defineEmits<{
  openPlan: [plan: string]
  openCompare: []
}>()

const { t } = usePageI18n('membership')
</script>


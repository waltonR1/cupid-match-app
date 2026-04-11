<template>
  <view id="membership-compare" class="bg-next-semantic-page-subtle text-next-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-next-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-next-semantic-text-eyebrow">
              {{ t('tiers.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight text-next-semantic-text-primary lg:text-[64px]">
            {{ t('tiers.title') }}
            <text class="italic text-next-semantic-text-section-highlight"> {{ t('tiers.titleAccent') }}</text>
          </view>

          <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-next-semantic-text-lead lg:text-[21px]">
            {{ t('tiers.subtitle') }}
          </view>

          <AppButton
            variant="primary"
            size="lg"
            width="cta"
            rounded="none"
            class="mt-10"
            @click="emit('openPlan', 'vip')"
          >
            {{ t('tiers.cta') }}
          </AppButton>
        </view>

        <view class="grid gap-6">
          <view class="border border-next-component-membership-tier-free-card-border bg-next-component-membership-tier-free-card-background px-7 py-8 shadow-next-shadow-panel">
            <view class="flex flex-wrap items-start justify-between gap-4">
              <view>
                <view class="text-[13px] uppercase tracking-[5px] text-next-semantic-text-subtle">{{ t('free.badge') }}</view>
                <view class="mt-4 text-[32px] font-semibold text-next-semantic-text-primary">{{ t('free.title') }}</view>
              </view>

              <view class="text-right">
                <view class="text-[26px] font-semibold text-next-semantic-text-primary">
                  {{ t('free.price') }}
                </view>
                <view class="mt-1 text-[14px] italic text-next-semantic-text-muted">{{ t('free.priceNote') }}</view>
              </view>
            </view>

            <view class="mt-6 grid gap-3 md:grid-cols-2">
              <view class="border border-next-component-membership-tier-free-feature-border bg-next-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-secondary">
                {{ t('free.f1') }}
              </view>
              <view class="border border-next-component-membership-tier-free-feature-border bg-next-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-secondary">
                {{ t('free.f2') }}
              </view>
              <view class="border border-next-component-membership-tier-free-feature-border bg-next-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-secondary">
                {{ t('free.f3') }}
              </view>
              <view class="border border-next-component-membership-tier-free-feature-border bg-next-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-secondary">
                {{ t('free.f4') }}
              </view>
            </view>

            <AppButton
              variant="secondary"
              context="membership-free"
              size="sm"
              width="full"
              rounded="none"
              class="mt-8"
              @click="emit('openPlan', 'free')"
            >
              {{ t('free.cta') }}
            </AppButton>
          </view>

          <view class="border border-next-component-membership-tier-silver-border bg-next-gradient-membership-tier-silver-card px-8 py-10 text-next-semantic-text-primary shadow-next-shadow-panel">
            <view class="text-[13px] uppercase tracking-[5px] text-next-component-membership-tier-silver-badge-label">{{ t('silver.badge') }}</view>
            <view class="mt-5 text-[40px] font-semibold">{{ t('silver.title') }}</view>
            <view class="mt-3 max-w-[460px] text-[15px] italic leading-7 text-next-semantic-text-secondary">
              {{ t('tiers.silverFit') }}
            </view>

            <view class="mt-8 text-[34px] font-semibold">
              {{ t('silver.price') }}
              <text class="text-[18px] font-normal text-next-semantic-text-muted"> {{ t('silver.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-next-semantic-text-muted">{{ t('silver.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
              <view class="border border-next-component-membership-tier-silver-feature-border bg-next-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-secondary">
                {{ t('silver.f1') }}
              </view>
              <view class="border border-next-component-membership-tier-silver-feature-border bg-next-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-secondary">
                {{ t('silver.f2') }}
              </view>
              <view class="border border-next-component-membership-tier-silver-feature-border bg-next-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-secondary">
                {{ t('silver.f3') }}
              </view>
            </view>

            <AppButton
              variant="secondary"
              context="membership-silver"
              size="sm"
              width="full"
              rounded="none"
              class="mt-8"
              @click="emit('openPlan', 'silver')"
            >
              {{ t('tiers.cardCta') }}
            </AppButton>
          </view>

          <view class="border border-next-component-membership-tier-gold-border bg-next-gradient-membership-tier-gold-card px-8 py-10 text-next-semantic-text-inverse shadow-next-shadow-emphasis">
            <view class="flex items-start justify-between gap-4">
              <view>
                <view class="text-[13px] uppercase tracking-[5px] text-next-semantic-text-inverse-subtle">{{ t('gold.badge') }}</view>
                <view class="mt-5 text-[40px] font-semibold">{{ t('gold.title') }}</view>
                <view class="mt-3 max-w-[500px] text-[15px] italic leading-7 text-next-semantic-text-inverse-muted">
                  {{ t('tiers.goldFit') }}
                </view>
              </view>

              <view class="rounded-full border border-next-component-membership-tier-gold-border px-4 py-2 text-[12px] uppercase tracking-[3px] text-next-component-membership-tier-gold-badge-label">
                {{ t('tiers.popular') }}
              </view>
            </view>

            <view class="mt-8 text-[34px] font-semibold">
              {{ t('gold.price') }}
              <text class="text-[18px] font-normal text-next-semantic-text-inverse-subtle"> {{ t('gold.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-next-semantic-text-inverse-subtle">{{ t('gold.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
              <view class="border border-next-component-membership-tier-gold-feature-border bg-next-component-membership-tier-gold-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-inverse-muted">
                {{ t('gold.f1') }}
              </view>
              <view class="border border-next-component-membership-tier-gold-feature-border bg-next-component-membership-tier-gold-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-inverse-muted">
                {{ t('gold.f2') }}
              </view>
              <view class="border border-next-component-membership-tier-gold-feature-border bg-next-component-membership-tier-gold-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-inverse-muted">
                {{ t('gold.f3') }}
              </view>
            </view>

            <AppButton
              variant="secondary"
              context="membership-gold"
              size="sm"
              width="full"
              rounded="none"
              class="mt-8"
              @click="emit('openPlan', 'gold')"
            >
              {{ t('tiers.cardCta') }}
            </AppButton>
          </view>

          <view class="border border-next-component-membership-tier-diamond-border bg-next-gradient-membership-tier-diamond-card px-8 py-10 text-next-semantic-text-inverse shadow-next-shadow-luxe">
            <view class="text-[13px] uppercase tracking-[5px] text-next-component-membership-tier-diamond-badge-label">{{ t('diamond.badge') }}</view>
            <view class="mt-5 text-[40px] font-semibold text-next-semantic-text-inverse">{{ t('diamond.title') }}</view>
            <view class="mt-3 max-w-[520px] text-[15px] italic leading-7 text-next-semantic-text-inverse-muted">
              {{ t('tiers.diamondFit') }}
            </view>

            <view class="mt-8 text-[34px] font-semibold text-next-semantic-text-inverse">
              {{ t('diamond.price') }}
              <text class="text-[18px] font-normal text-next-semantic-text-inverse-muted"> {{ t('diamond.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-next-semantic-text-inverse-muted">{{ t('diamond.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
              <view class="border border-next-component-membership-tier-diamond-feature-border bg-next-component-membership-tier-diamond-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-inverse-muted">
                {{ t('diamond.f1') }}
              </view>
              <view class="border border-next-component-membership-tier-diamond-feature-border bg-next-component-membership-tier-diamond-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-inverse-muted">
                {{ t('diamond.f2') }}
              </view>
              <view class="border border-next-component-membership-tier-diamond-feature-border bg-next-component-membership-tier-diamond-feature-background px-4 py-4 text-[14px] leading-6 text-next-semantic-text-inverse-muted">
                {{ t('diamond.f3') }}
              </view>
            </view>

            <AppButton
              variant="secondary"
              context="membership-diamond"
              size="sm"
              width="full"
              rounded="none"
              class="mt-8"
              @click="emit('openPlan', 'diamond')"
            >
              {{ t('tiers.cardCta') }}
            </AppButton>
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
}>()

const { t } = usePageI18n('membership')
</script>


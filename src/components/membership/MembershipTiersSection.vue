<template>
  <view id="membership-compare" class="bg-semantic-page-subtle text-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-semantic-border-eyebrow"/>
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
              {{ t('tiers.eyebrow') }}
            </text>
          </view>
          <view class="text-[44px] font-semibold leading-tight text-semantic-text-primary lg:text-[64px]">
            {{ t('tiers.title') }}
            <text class="italic text-semantic-text-section-highlight"> {{ t('tiers.titleAccent') }}</text>
          </view>
          <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-semantic-text-lead lg:text-[21px]">
            {{ t('tiers.subtitle') }}
          </view>
          <AppButton variant="primary" size="lg" width="cta" rounded="none" class="mt-10" @click="emit('openPlan', 'vip')">
            {{ t('tiers.cta') }}
          </AppButton>
        </view>

        <view class="grid gap-6">
          <view
            v-for="plan in plans"
            :key="plan.id"
            class="px-7 py-8 shadow-panel"
            :class="tierCardClass(plan.tier)"
          >
            <view class="flex flex-wrap items-start justify-between gap-4">
              <view>
                <view class="text-[13px] uppercase tracking-[5px]" :class="tierBadgeLabelClass(plan.tier)">
                  {{ plan.name }}
                </view>
                <view v-if="plan.tier !== 'free'" class="mt-3 max-w-[460px] text-[15px] italic leading-7"
                  :class="tierDescClass(plan.tier)">
                  {{ t(`tiers.${plan.tier}Fit`) }}
                </view>
              </view>
              <view v-if="plan.tier === 'free'" class="text-right">
                <view class="text-[26px] font-semibold text-semantic-text-primary">{{ t('plans.free') }}</view>
                <view class="mt-1 text-[14px] italic text-semantic-text-muted">{{ t('plans.freePeriod') }}</view>
              </view>
              <view
                v-if="plan.tier === 'gold' || plan.tier === 'diamond'"
                class="rounded-full border px-4 py-2 text-[12px] uppercase tracking-[3px]"
                :class="plan.tier === 'gold'
                  ? 'border-component-membership-tier-gold-border text-component-membership-tier-gold-badge-label'
                  : 'border-component-membership-tier-diamond-border text-component-membership-tier-diamond-badge-label'"
              >
                {{ t('tiers.popular') }}
              </view>
            </view>

            <view v-if="plan.tier !== 'free'" class="mt-8">
              <view class="text-[34px] font-semibold"
                :class="plan.tier === 'silver' ? 'text-semantic-text-primary' : 'text-semantic-text-inverse'">
                {{ plan.price }}
                <text class="text-[18px] font-normal"
                  :class="plan.tier === 'silver' ? 'text-semantic-text-muted' : 'text-semantic-text-inverse-subtle'">
                  {{ t(`plans.${plan.billingPeriodLabel}`) }}
                </text>
              </view>
              <view class="mt-2 text-[15px] italic"
                :class="plan.tier === 'silver' ? 'text-semantic-text-muted' : 'text-semantic-text-inverse-subtle'">
                {{ plan.privateIntroductionQuota }} {{ t('plans.introPerPeriod') }}
              </view>
            </view>

            <view class="mt-6 grid gap-3 md:grid-cols-3">
              <view
                v-for="feat in plan.features"
                :key="feat"
                class="border px-4 py-4 text-[14px] leading-6"
                :class="tierFeatureClass(plan.tier)"
              >
                {{ planFeatureLabel(feat) }}
              </view>
            </view>

            <MembershipPlanButton
                :tier="plan.tier"
                class="mt-8"
                @click="emit('openPlan', plan.tier)"
            >
              {{ plan.tier === 'free' ? t('plans.freeCta') : t('tiers.cardCta') }}
            </MembershipPlanButton>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import MembershipPlanButton from '@/components/membership/MembershipPlanButton.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { featureLabel } from '@/mappers/membership-plans'
import type { MembershipPlanViewModel } from '@/types/membership/view'

const props = defineProps<{ plans: MembershipPlanViewModel[] }>()
const emit = defineEmits<{ openPlan: [plan: string] }>()
const { t } = usePageI18n('membership')

const tierCardClass = (tier: string) => ({
  'free': 'border border-component-membership-tier-free-card-border bg-component-membership-tier-free-card-background',
  'silver': 'border border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card text-semantic-text-primary',
  'gold': 'border border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card text-semantic-text-inverse shadow-emphasis',
  'diamond': 'border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card text-semantic-text-inverse shadow-luxe',
}[tier] || '')

const tierBadgeLabelClass = (tier: string) => ({
  'free': 'text-semantic-text-subtle',
  'silver': 'text-component-membership-tier-silver-badge-label',
  'gold': 'text-semantic-text-inverse-subtle',
  'diamond': 'text-component-membership-tier-diamond-badge-label',
}[tier] || '')

const tierDescClass = (tier: string) => ({
  'silver': 'text-semantic-text-secondary',
  'gold': 'text-semantic-text-inverse-muted',
  'diamond': 'text-semantic-text-inverse-muted',
}[tier] || '')

const tierFeatureClass = (tier: string) => ({
  'free': 'border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background text-semantic-text-secondary',
  'silver': 'border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background text-semantic-text-secondary',
  'gold': 'border-component-membership-tier-gold-feature-border bg-component-membership-tier-gold-feature-background text-semantic-text-inverse-muted',
  'diamond': 'border-component-membership-tier-diamond-feature-border bg-component-membership-tier-diamond-feature-background text-semantic-text-inverse-muted',
}[tier] || '')

function planFeatureLabel(code: string) {
  return featureLabel(t, code)
}
</script>

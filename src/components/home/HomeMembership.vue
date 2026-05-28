<template>
  <view class="relative overflow-hidden bg-semantic-page-default text-semantic-text-primary">
    <view class="pointer-events-none absolute inset-0">
      <view class="absolute inset-0 bg-gradient-membership-showcase-ambient"/>
    </view>

    <view class="relative mx-auto max-w-[1240px] px-6 py-16 lg:px-8 lg:py-20">
      <view class="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
        <view class="pt-2">
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-10 bg-semantic-border-eyebrow"/>
            <text class="text-[10px] uppercase tracking-[4px] text-semantic-text-subtle">
              {{ t('membership.eyebrow') }}
            </text>
          </view>
          <view class="max-w-[760px]">
            <view class="text-[32px] font-semibold leading-[1.06] text-semantic-text-primary lg:text-[52px]">
              <text>{{ t('membership.title') }}</text>
              <text class="text-semantic-text-section-highlight"> {{ t('membership.titleAccent') }}</text>
            </view>
            <view class="mt-4 max-w-[700px] text-[14px] leading-7 text-semantic-text-secondary lg:text-[15px]">
              {{ t('membership.subtitle') }}
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-4 lg:grid-cols-[0.92fr_1fr_1.06fr]">
        <template v-for="plan in vipPlans" :key="plan.id">
          <view v-if="plan.tier !== 'diamond'"
            class="relative flex min-h-[460px] flex-col overflow-hidden border px-5 py-6 lg:px-6"
            :class="tierCardClass(plan.tier)"
          >
            <view class="absolute inset-x-0 top-0 h-px" :class="tierAccentLineClass(plan.tier)"/>
            <view class="absolute inset-0" :class="tierGlowClass(plan.tier)"/>

            <view class="relative text-[10px] uppercase tracking-[3px]" :class="tierBadgeClass(plan.tier)">
              {{ plan.name }}
            </view>
            <view class="relative mt-3 h-px w-10" :class="tierAccentLineClass(plan.tier)"/>
            <view class="relative mt-5 text-[28px] font-semibold leading-[1.12] lg:text-[32px]"
              :class="tierTextClass(plan.tier)">
              {{ plan.name }}
            </view>
            <view class="relative mt-3 text-[13px] leading-6" :class="tierSubtextClass(plan.tier)">
              {{ plan.description }}
            </view>
            <view class="relative mt-6">
              <view class="text-[36px] font-semibold leading-none" :class="tierTextClass(plan.tier)">
                {{ plan.price }}
              </view>
              <view class="mt-2 text-[12px] leading-5" :class="tierSubtextClass(plan.tier)">
                {{ t(`plans.${plan.billingPeriodLabel}`) }}
              </view>
            </view>
            <view class="relative mt-6 h-px w-full" :class="tierDividerClass(plan.tier)"/>
            <view class="relative mt-6 space-y-3 text-[13px] leading-6" :class="tierSubtextClass(plan.tier)">
              <view v-for="feat in plan.features" :key="feat" class="flex gap-3">
                <text class="text-component-membership-feature-bullet">-</text>
                <text>{{ planFeatureLabel(feat) }}</text>
              </view>
            </view>
            <MembershipPlanButton :tier="plan.tier" class="relative mt-auto" @click="openRegisterPage">
              {{ t('membership.vip.cta') }}
            </MembershipPlanButton>
          </view>

          <!-- Diamond special layout -->
          <view v-else
            class="relative flex min-h-[490px] flex-col overflow-hidden border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card px-5 py-6 shadow-luxe ring-1 ring-component-membership-tier-diamond-ring lg:-translate-y-1 lg:px-6"
          >
            <view class="absolute inset-x-0 top-0 h-[2px] bg-component-membership-tier-diamond-accent-line"/>
            <view class="absolute inset-y-0 right-0 w-[46%] bg-gradient-membership-tier-diamond-glow"/>
            <view class="relative inline-flex w-fit items-center border border-component-membership-tier-diamond-badge-border bg-component-membership-tier-diamond-badge-background px-2.5 py-1 text-[10px] uppercase tracking-[3px] text-semantic-text-inverse">
              {{ plan.name }}
            </view>
            <view class="relative mt-4 h-px w-12 bg-component-membership-tier-diamond-accent-line"/>
            <view class="relative mt-5 text-[30px] font-semibold leading-[1.1] text-semantic-text-inverse lg:text-[34px]">
              {{ plan.name }}
            </view>
            <view class="relative mt-3 text-[13px] leading-6 text-semantic-text-inverse-muted">
              {{ plan.description }}
            </view>
            <view class="relative mt-6">
              <view class="text-[40px] font-semibold leading-none text-semantic-text-inverse">
                {{ plan.price }}
              </view>
              <view class="mt-2 text-[12px] leading-5 text-semantic-text-inverse-subtle">
                {{ t(`plans.${plan.billingPeriodLabel}`) }}
              </view>
            </view>
            <view class="relative mt-7 h-px w-full bg-component-membership-tier-diamond-divider"/>
            <view class="relative mt-6 space-y-3 text-[13px] leading-6 text-semantic-text-inverse-muted">
              <view v-for="feat in plan.features" :key="feat" class="flex gap-3">
                <text class="text-component-membership-feature-bullet">-</text>
                <text>{{ planFeatureLabel(feat) }}</text>
              </view>
            </view>
            <view class="relative mt-auto pt-6">
              <MembershipPlanButton tier="diamond" @click="openRegisterPage">
                {{ t('membership.vip.cta') }}
              </MembershipPlanButton>
            </view>
          </view>
        </template>
      </view>

      <!-- Free tier -->
      <view v-if="freePlan"
        class="mt-4 border border-component-membership-tier-free-card-border bg-component-membership-tier-free-card-background px-5 py-5 shadow-panel lg:px-6"
      >
        <view class="grid gap-5 lg:grid-cols-[210px_120px_minmax(0,1fr)_150px] lg:items-center">
          <view>
            <view class="text-[10px] uppercase tracking-[3px] text-semantic-text-subtle">{{ freePlan.name }}</view>
            <view class="mt-2 text-[24px] font-semibold leading-[1.14] text-semantic-text-primary">{{ freePlan.name }}</view>
            <view class="mt-2 text-[12px] leading-6 text-semantic-text-secondary">{{ freePlan.description }}</view>
          </view>
          <view>
            <view class="text-[30px] font-semibold leading-none text-semantic-text-primary">{{ freePlan.price || t('plans.free') }}</view>
          </view>
          <view class="grid gap-2 text-[12px] leading-6 text-semantic-text-secondary lg:grid-cols-3 lg:gap-4">
            <view v-for="feat in freePlan.features" :key="feat" class="flex gap-2">
              <text class="text-component-membership-feature-bullet">-</text>
              <text>{{ planFeatureLabel(feat) }}</text>
            </view>
          </view>
          <MembershipPlanButton tier="free" @click="openRegisterPage">
            {{ t('membership.free.button') }}
          </MembershipPlanButton>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openRegisterPage } from '@/utils/navigation'
import MembershipPlanButton from '@/components/membership/MembershipPlanButton.vue'
import { featureLabel } from '@/mappers/membership-plans'
import type { MembershipPlanViewModel } from '@/types/membership/view'

const props = defineProps<{ plans: MembershipPlanViewModel[] }>()
const { t } = usePageI18n('home')

const vipPlans = computed(() => props.plans.filter((p) => p.tier !== 'free'))
const freePlan = computed(() => props.plans.find((p) => p.tier === 'free') ?? null)

function planFeatureLabel(code: string) {
  return featureLabel(t, code)
}

const tierCardClass = (tier: string) => ({
  'silver': 'border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card shadow-panel',
  'gold': 'border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card shadow-emphasis',
}[tier] || '')

const tierAccentLineClass = (tier: string) => ({
  'silver': 'bg-component-membership-tier-silver-accent-line',
  'gold': 'bg-component-membership-tier-gold-accent-line',
}[tier] || '')

const tierGlowClass = (tier: string) => ({
  'silver': 'bg-gradient-membership-tier-silver-glow',
  'gold': 'bg-gradient-membership-tier-gold-glow',
}[tier] || '')

const tierBadgeClass = (tier: string) => ({
  'silver': 'text-component-membership-tier-silver-badge-label',
  'gold': 'text-semantic-text-inverse-subtle',
}[tier] || '')

const tierTextClass = (tier: string) =>
  tier === 'silver' ? 'text-semantic-text-primary' : 'text-semantic-text-inverse'

const tierSubtextClass = (tier: string) =>
  tier === 'silver' ? 'text-semantic-text-secondary' : 'text-semantic-text-inverse-muted'

const tierDividerClass = (tier: string) => ({
  'silver': 'bg-component-membership-tier-silver-divider',
  'gold': 'bg-component-membership-tier-gold-divider',
}[tier] || '')
</script>

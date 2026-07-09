<template>
  <view id="membership-compare" class="relative overflow-hidden bg-semantic-page-default text-semantic-text-primary">
    <view class="pointer-events-none absolute inset-0">
      <view class="absolute inset-0 bg-gradient-membership-showcase-ambient"/>
    </view>
    <view class="relative mx-auto max-w-[1280px] px-8 py-24">
      <!-- Membership Tiers 内容区域 -->
      <view class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <!-- 左侧标题与操作区 -->
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

        <!-- 右侧会员方案列表 -->
        <view class="grid gap-6">
          <!-- 免费方案 -->
          <view
              class="border border-component-membership-tier-free-card-border bg-component-membership-tier-free-card-background px-7 py-8 shadow-panel">
            <view class="flex flex-wrap items-start justify-between gap-4">
              <view>
                <view class="text-[13px] uppercase tracking-[5px] text-semantic-text-subtle">{{
                    t('free.badge')
                  }}
                </view>
                <view class="mt-4 text-[32px] font-semibold text-semantic-text-primary">{{ plan('free')?.name }}</view>
              </view>

              <view class="text-right">
                <view class="text-[26px] font-semibold text-semantic-text-primary">
                  {{ plan('free')?.euroPrice }}
                </view>
                <view class="mt-1 text-[14px] italic text-semantic-text-muted">{{ plan('free')?.cnyPrice }} · {{ plan('free')?.validity }}</view>
              </view>
            </view>

            <view class="mt-6 grid gap-3 md:grid-cols-2">
              <view
                  class="border border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ plan('free')?.privateIntroduction }}
              </view>
              <view
                  class="border border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ plan('free')?.eventAllowance }}
              </view>
              <view
                  class="border border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('free.f3') }}
              </view>
              <view
                  class="border border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('free.f4') }}
              </view>
            </view>

            <MembershipPlanButton
                tier="free"
                class="mt-8"
                :disabled="isPlanDisabled('free')"
                @click="emit('openPlan', 'free')"
            >
              {{ planCta('free', t('free.cta')) }}
            </MembershipPlanButton>
          </view>

          <!-- Silver 方案 -->
          <view
              class="relative overflow-hidden border border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card px-8 py-10 text-semantic-text-primary shadow-panel">
            <view class="pointer-events-none absolute inset-x-0 top-0 h-px bg-component-membership-tier-silver-accent-line"/>
            <view class="pointer-events-none absolute inset-0 bg-gradient-membership-tier-silver-glow"/>
            <view class="relative text-[13px] uppercase tracking-[5px] text-component-membership-tier-silver-badge-label">
              {{ t('silver.badge') }}
            </view>
            <view class="relative mt-5 text-[40px] font-semibold">{{ plan('silver')?.name }}</view>
            <view class="relative mt-3 max-w-[460px] text-[15px] italic leading-7 text-semantic-text-secondary">
              {{ t('tiers.silverFit') }}
            </view>

            <view class="relative mt-8 text-[34px] font-semibold">
              {{ plan('silver')?.euroPrice }}
              <text class="text-[18px] font-normal text-semantic-text-muted"> / {{ plan('silver')?.cnyPrice }}</text>
            </view>
            <view class="relative mt-2 text-[15px] italic text-semantic-text-muted">{{ plan('silver')?.validity }}</view>

            <view class="relative mt-8 grid gap-3 md:grid-cols-3">
              <view
                  class="border border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ plan('silver')?.privateIntroduction }}
              </view>
              <view
                  class="border border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ plan('silver')?.eventAllowance }}
              </view>
              <view
                  class="border border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('silver.f3') }}
              </view>
            </view>

            <MembershipPlanButton
                tier="silver"
                class="relative mt-8"
                :disabled="isPlanDisabled('silver')"
                @click="emit('openPlan', 'silver')"
            >
              {{ planCta('silver', t('tiers.cardCta')) }}
            </MembershipPlanButton>
          </view>

          <!-- Gold 方案 -->
          <view
              class="relative overflow-hidden border border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card px-8 py-10 text-semantic-text-inverse shadow-emphasis">
            <view class="pointer-events-none absolute inset-x-0 top-0 h-px bg-component-membership-tier-gold-accent-line"/>
            <view class="pointer-events-none absolute inset-0 bg-gradient-membership-tier-gold-glow"/>
            <view class="relative flex items-start justify-between gap-4">
              <view>
                <view class="text-[13px] uppercase tracking-[5px] text-semantic-text-inverse-subtle">{{
                    t('gold.badge')
                  }}
                </view>
                <view class="mt-5 text-[40px] font-semibold">{{ plan('gold')?.name }}</view>
                <view class="mt-3 max-w-[500px] text-[15px] italic leading-7 text-semantic-text-inverse-muted">
                  {{ t('tiers.goldFit') }}
                </view>
              </view>

              <view
                  class="rounded-full border border-component-membership-tier-gold-border px-4 py-2 text-[12px] uppercase tracking-[3px] text-component-membership-tier-gold-badge-label">
                {{ t('tiers.popular') }}
              </view>
            </view>

            <view class="relative mt-8 text-[34px] font-semibold">
              {{ plan('gold')?.euroPrice }}
              <text class="text-[18px] font-normal text-semantic-text-inverse-subtle"> / {{ plan('gold')?.cnyPrice }}</text>
            </view>
            <view class="relative mt-2 text-[15px] italic text-semantic-text-inverse-subtle">{{ plan('gold')?.validity }}</view>

            <view class="relative mt-8 grid gap-3 md:grid-cols-3">
              <view
                  class="border border-component-membership-tier-gold-feature-border bg-transparent px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ plan('gold')?.privateIntroduction }}
              </view>
              <view
                  class="border border-component-membership-tier-gold-feature-border bg-transparent px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ plan('gold')?.eventAllowance }}
              </view>
              <view
                  class="border border-component-membership-tier-gold-feature-border bg-transparent px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('gold.f3') }}
              </view>
            </view>

            <MembershipPlanButton
                tier="gold"
                class="relative mt-8"
                :disabled="isPlanDisabled('gold')"
                disabled-tone="dark"
                @click="emit('openPlan', 'gold')"
            >
              {{ planCta('gold', t('tiers.cardCta')) }}
            </MembershipPlanButton>
          </view>

          <!-- Diamond 方案 -->
          <view
              class="relative overflow-hidden border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card px-8 py-10 text-semantic-text-inverse shadow-luxe ring-1 ring-component-membership-tier-diamond-ring">
            <view class="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-component-membership-tier-diamond-accent-line"/>
            <view class="pointer-events-none absolute inset-y-0 right-0 w-[46%] bg-gradient-membership-tier-diamond-glow"/>
            <view class="relative text-[13px] uppercase tracking-[5px] text-component-membership-tier-diamond-badge-label">
              {{ t('diamond.badge') }}
            </view>
            <view class="relative mt-5 text-[40px] font-semibold text-semantic-text-inverse">{{ plan('diamond')?.name }}</view>
            <view class="relative mt-3 max-w-[520px] text-[15px] italic leading-7 text-semantic-text-inverse-muted">
              {{ t('tiers.diamondFit') }}
            </view>

            <view class="relative mt-8 text-[34px] font-semibold text-semantic-text-inverse">
              {{ plan('diamond')?.euroPrice }}
              <text class="text-[18px] font-normal text-semantic-text-inverse-muted"> {{
                  plan('diamond')?.cnyPrice
                }}
              </text>
            </view>
            <view class="relative mt-2 text-[15px] italic text-semantic-text-inverse-muted">{{ plan('diamond')?.validity }}</view>

            <view class="relative mt-8 grid gap-3 md:grid-cols-3">
              <view
                  class="border border-component-membership-tier-diamond-feature-border bg-transparent px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ plan('diamond')?.privateIntroduction }}
              </view>
              <view
                  class="border border-component-membership-tier-diamond-feature-border bg-transparent px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ plan('diamond')?.eventAllowance }}
              </view>
              <view
                  class="border border-component-membership-tier-diamond-feature-border bg-transparent px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('diamond.f3') }}
              </view>
            </view>

            <MembershipPlanButton
                tier="diamond"
                class="relative mt-8"
                :disabled="isPlanDisabled('diamond')"
                disabled-tone="dark"
                @click="emit('openPlan', 'diamond')"
            >
              {{ planCta('diamond', t('tiers.cardCta')) }}
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
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import type {MembershipPlanViewModel} from '@/types/membership/catalog'

const props = defineProps<{
  plans: MembershipPlanViewModel[]
  currentTier?: MembershipPlanViewModel['tier']
}>()

/** Membership Tiers 操作事件 */
const emit = defineEmits<{
  openPlan: [plan: string]
}>()

/** Membership 页面命名空间文案 */
const {t} = usePageI18n('membership')

function plan(tier: MembershipPlanViewModel['tier']) {
  return props.plans.find((item) => item.tier === tier)
}

const tierOrder: MembershipPlanViewModel['tier'][] = ['free', 'silver', 'gold', 'diamond']

function tierRank(tier?: MembershipPlanViewModel['tier']) {
  return tier ? tierOrder.indexOf(tier) : -1
}

function isPlanDisabled(tier: MembershipPlanViewModel['tier']) {
  const currentRank = tierRank(props.currentTier)
  return currentRank >= 0 && tierRank(tier) <= currentRank
}

function planCta(tier: MembershipPlanViewModel['tier'], fallback: string) {
  const currentRank = tierRank(props.currentTier)
  const targetRank = tierRank(tier)
  if (currentRank < 0) return fallback
  if (targetRank === currentRank) return t('tiers.currentPlanCta')
  if (targetRank < currentRank) return t('tiers.includedCta')
  return t('tiers.upgradeCta')
}
</script>

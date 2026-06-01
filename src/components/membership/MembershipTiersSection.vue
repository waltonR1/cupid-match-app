<template>
  <view id="membership-compare" class="bg-semantic-page-subtle text-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
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
                <view class="mt-4 text-[32px] font-semibold text-semantic-text-primary">{{ t('free.title') }}</view>
              </view>

              <view class="text-right">
                <view class="text-[26px] font-semibold text-semantic-text-primary">
                  {{ t('free.price') }}
                </view>
                <view class="mt-1 text-[14px] italic text-semantic-text-muted">{{ t('free.priceNote') }}</view>
              </view>
            </view>

            <view class="mt-6 grid gap-3 md:grid-cols-2">
              <view
                  class="border border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('free.f1') }}
              </view>
              <view
                  class="border border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('free.f2') }}
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
                @click="emit('openPlan', 'free')"
            >
              {{ t('free.cta') }}
            </MembershipPlanButton>
          </view>

          <!-- Silver 方案 -->
          <view
              class="border border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card px-8 py-10 text-semantic-text-primary shadow-panel">
            <view class="text-[13px] uppercase tracking-[5px] text-component-membership-tier-silver-badge-label">
              {{ t('silver.badge') }}
            </view>
            <view class="mt-5 text-[40px] font-semibold">{{ t('silver.title') }}</view>
            <view class="mt-3 max-w-[460px] text-[15px] italic leading-7 text-semantic-text-secondary">
              {{ t('tiers.silverFit') }}
            </view>

            <view class="mt-8 text-[34px] font-semibold">
              {{ t('silver.price') }}
              <text class="text-[18px] font-normal text-semantic-text-muted"> {{ t('silver.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-semantic-text-muted">{{ t('silver.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
              <view
                  class="border border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('silver.f1') }}
              </view>
              <view
                  class="border border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('silver.f2') }}
              </view>
              <view
                  class="border border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-secondary">
                {{ t('silver.f3') }}
              </view>
            </view>

            <MembershipPlanButton
                tier="silver"
                class="mt-8"
                @click="emit('openPlan', 'silver')"
            >
              {{ t('tiers.cardCta') }}
            </MembershipPlanButton>
          </view>

          <!-- Gold 方案 -->
          <view
              class="border border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card px-8 py-10 text-semantic-text-inverse shadow-emphasis">
            <view class="flex items-start justify-between gap-4">
              <view>
                <view class="text-[13px] uppercase tracking-[5px] text-semantic-text-inverse-subtle">{{
                    t('gold.badge')
                  }}
                </view>
                <view class="mt-5 text-[40px] font-semibold">{{ t('gold.title') }}</view>
                <view class="mt-3 max-w-[500px] text-[15px] italic leading-7 text-semantic-text-inverse-muted">
                  {{ t('tiers.goldFit') }}
                </view>
              </view>

              <view
                  class="rounded-full border border-component-membership-tier-gold-border px-4 py-2 text-[12px] uppercase tracking-[3px] text-component-membership-tier-gold-badge-label">
                {{ t('tiers.popular') }}
              </view>
            </view>

            <view class="mt-8 text-[34px] font-semibold">
              {{ t('gold.price') }}
              <text class="text-[18px] font-normal text-semantic-text-inverse-subtle"> {{ t('gold.priceNote') }}</text>
            </view>
            <view class="mt-2 text-[15px] italic text-semantic-text-inverse-subtle">{{ t('gold.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
              <view
                  class="border border-component-membership-tier-gold-feature-border bg-component-membership-tier-gold-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('gold.f1') }}
              </view>
              <view
                  class="border border-component-membership-tier-gold-feature-border bg-component-membership-tier-gold-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('gold.f2') }}
              </view>
              <view
                  class="border border-component-membership-tier-gold-feature-border bg-component-membership-tier-gold-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('gold.f3') }}
              </view>
            </view>

            <MembershipPlanButton
                tier="gold"
                class="mt-8"
                @click="emit('openPlan', 'gold')"
            >
              {{ t('tiers.cardCta') }}
            </MembershipPlanButton>
          </view>

          <!-- Diamond 方案 -->
          <view
              class="border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card px-8 py-10 text-semantic-text-inverse shadow-luxe">
            <view class="text-[13px] uppercase tracking-[5px] text-component-membership-tier-diamond-badge-label">
              {{ t('diamond.badge') }}
            </view>
            <view class="mt-5 text-[40px] font-semibold text-semantic-text-inverse">{{ t('diamond.title') }}</view>
            <view class="mt-3 max-w-[520px] text-[15px] italic leading-7 text-semantic-text-inverse-muted">
              {{ t('tiers.diamondFit') }}
            </view>

            <view class="mt-8 text-[34px] font-semibold text-semantic-text-inverse">
              {{ t('diamond.price') }}
              <text class="text-[18px] font-normal text-semantic-text-inverse-muted"> {{
                  t('diamond.priceNote')
                }}
              </text>
            </view>
            <view class="mt-2 text-[15px] italic text-semantic-text-inverse-muted">{{ t('diamond.period') }}</view>

            <view class="mt-8 grid gap-3 md:grid-cols-3">
              <view
                  class="border border-component-membership-tier-diamond-feature-border bg-component-membership-tier-diamond-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('diamond.f1') }}
              </view>
              <view
                  class="border border-component-membership-tier-diamond-feature-border bg-component-membership-tier-diamond-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('diamond.f2') }}
              </view>
              <view
                  class="border border-component-membership-tier-diamond-feature-border bg-component-membership-tier-diamond-feature-background px-4 py-4 text-[14px] leading-6 text-semantic-text-inverse-muted">
                {{ t('diamond.f3') }}
              </view>
            </view>

            <MembershipPlanButton
                tier="diamond"
                class="mt-8"
                @click="emit('openPlan', 'diamond')"
            >
              {{ t('tiers.cardCta') }}
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

/** Membership Tiers 操作事件 */
const emit = defineEmits<{
  openPlan: [plan: string]
}>()

/** Membership 页面命名空间文案 */
const {t} = usePageI18n('membership')
</script>
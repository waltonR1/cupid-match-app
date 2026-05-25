<template>
  <AccountShell active-page="membership">
    <view>
      <AccountSubPageHeader
        :label="t('membership.title')"
        :title="t('membership.title')"
        :description="t('membership.subtitle')"
      />

      <view class="grid gap-6 xl:grid-cols-2">
        <view
          v-if="membership"
          class="px-7 py-7"
          :class="currentPlanCardClass(membership.tier)"
        >
          <view class="flex items-start justify-between gap-4">
            <view>
              <view class="text-[12px] uppercase tracking-[4px]" :class="currentPlanLabelClass(membership.tier)">
                {{ t('membership.currentPlan') }}
              </view>
              <view class="mt-4 text-[34px] font-semibold">{{ membership.name }}</view>
              <view class="mt-3 max-w-[340px] text-[14px] leading-7" :class="currentPlanDescriptionClass(membership.tier)">
                {{ t(`membership.tierPositioning.${membership.tier}`) }}
              </view>
            </view>

            <view class="rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[2px]" :class="currentPlanBadgeClass(membership.tier)">
              {{ t(`membership.status.${membership.status}`) }}
            </view>
          </view>

          <view class="mt-8 grid gap-4 sm:grid-cols-2">
            <view class="border px-4 py-4" :class="currentPlanFeatureClass(membership.tier)">
              <view class="text-[12px] uppercase tracking-[2px]" :class="currentPlanLabelClass(membership.tier)">
                {{ t('membership.startedAt') }}
              </view>
              <view class="mt-2 text-[16px] font-medium">
                {{ formatLocalizedDate(locale, membership.startedAt) }}
              </view>
            </view>

            <view class="border px-4 py-4" :class="currentPlanFeatureClass(membership.tier)">
              <view class="text-[12px] uppercase tracking-[2px]" :class="currentPlanLabelClass(membership.tier)">
                {{ t('membership.conciergePriority') }}
              </view>
              <view class="mt-2 text-[16px] font-medium">
                {{ membership.conciergePriority ? t('common.yes') : t('common.no') }}
              </view>
            </view>

            <view
              v-if="membership.expiresAt"
              class="border px-4 py-4 sm:col-span-2"
              :class="currentPlanFeatureClass(membership.tier)"
            >
              <view class="text-[12px] uppercase tracking-[2px]" :class="currentPlanLabelClass(membership.tier)">
                {{ t('membership.expiresAt') }}
              </view>
              <view class="mt-2 text-[16px] font-medium">
                {{ formatLocalizedDate(locale, membership.expiresAt) }}
              </view>
            </view>
          </view>
        </view>

        <view
          v-if="featuredEntitlement"
          class="border border-semantic-border-default bg-semantic-surface-card px-7 py-7 shadow-panel"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ t('membership.coreQuota') }}
          </view>
          <view class="mt-4 text-[20px] font-semibold">{{ t(`membership.entitlement.${featuredEntitlement.code}`) }}</view>
          <view class="mt-5 text-[42px] font-semibold leading-none">
            {{ featuredEntitlement.quotaRemaining }}
            <text class="text-[18px] font-normal text-semantic-text-secondary">/ {{ featuredEntitlement.quotaTotal }}</text>
          </view>
          <view class="mt-5 max-w-[480px] text-[14px] leading-7 text-semantic-text-secondary">
            {{ t('membership.featuredDescription') }}
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel xl:col-span-2">
          <view class="text-[16px] font-semibold">{{ t('membership.enabledServices') }}</view>
          <view class="mt-4 grid gap-3 md:grid-cols-3">
            <view
              v-for="item in secondaryEntitlements"
              :key="item.code"
              class="border border-semantic-border-soft bg-semantic-surface-panel px-4 py-4"
            >
              <view class="text-[13px] text-semantic-text-secondary">{{ t(`membership.entitlement.${item.code}`) }}</view>
              <view class="mt-3 text-[18px] font-semibold">
                {{ item.quotaTotal > 0 ? `${item.quotaRemaining} / ${item.quotaTotal}` : t(`membership.entitlementState.${item.code}`) }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-6 border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="flex flex-wrap items-start justify-between gap-5">
          <view>
            <view class="text-[16px] font-semibold">{{ t('membership.upgrade.title') }}</view>
            <view class="mt-2 text-[14px] leading-7 text-semantic-text-secondary">
              {{ t('membership.upgrade.description') }}
            </view>
          </view>

          <view class="flex flex-wrap gap-3">
            <view
              v-if="nextPlan"
              class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-3 text-[14px] font-medium text-semantic-text-primary"
              @click="requestNextUpgrade"
            >
              {{ t('membership.actions.upgrade') }} · {{ t('membership.upgrade.nextPlan', { plan: nextPlan.name }) }}
            </view>
            <view
              class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px] text-semantic-text-link"
              @click="openMembershipSystemPage"
            >
              {{ t('membership.actions.viewSystem') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import { useAccountMembership } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openPage } from '@/utils/navigation'
import { formatLocalizedDate } from '@/utils/locale-format'
import { findNextPlan } from '@/mappers/account-membership'

const { t, locale } = usePageI18n('accountCenter')
const { membership, entitlements, availablePlans, requestUpgrade } = useAccountMembership()

const featuredEntitlement = computed(() => entitlements.value.find((item) => item.code === 'private_introduction'))
const secondaryEntitlements = computed(() => entitlements.value.filter((item) => item.code !== 'private_introduction'))
const nextPlan = computed(() => findNextPlan(availablePlans.value, membership.value?.tier))

function openMembershipSystemPage() {
  openPage('/pages/public/membership')
}

async function requestNextUpgrade() {
  if (!nextPlan.value) return
  const result = await requestUpgrade(nextPlan.value.tier)
  if (result?.status === 'pending_external_flow') {
    uni.showToast({ title: t('membership.upgrade.pending'), icon: 'none' })
  }
}

function currentPlanCardClass(tier: string) {
  if (tier === 'gold') {
    return 'border border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card text-semantic-text-inverse shadow-emphasis'
  }

  if (tier === 'diamond') {
    return 'border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card text-semantic-text-inverse shadow-luxe'
  }

  if (tier === 'silver') {
    return 'border border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card text-semantic-text-primary shadow-panel'
  }

  return 'border border-component-membership-tier-free-card-border bg-component-membership-tier-free-card-background text-semantic-text-primary shadow-panel'
}

function currentPlanLabelClass(tier: string) {
  return tier === 'silver' || tier === 'free'
    ? 'text-semantic-text-muted'
    : 'text-semantic-text-inverse-subtle'
}

function currentPlanBadgeClass(tier: string) {
  if (tier === 'gold') {
    return 'border-component-membership-tier-gold-border text-component-membership-tier-gold-badge-label'
  }

  if (tier === 'diamond') {
    return 'border-component-membership-tier-diamond-border text-component-membership-tier-diamond-badge-label'
  }

  if (tier === 'silver') {
    return 'border-component-membership-tier-silver-border text-component-membership-tier-silver-badge-label'
  }

  return 'border-component-membership-tier-free-card-border text-semantic-text-secondary'
}

function currentPlanFeatureClass(tier: string) {
  if (tier === 'gold') {
    return 'border-component-membership-tier-gold-feature-border bg-component-membership-tier-gold-feature-background'
  }

  if (tier === 'diamond') {
    return 'border-component-membership-tier-diamond-feature-border bg-component-membership-tier-diamond-feature-background'
  }

  if (tier === 'silver') {
    return 'border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background'
  }

  return 'border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background'
}

function currentPlanDescriptionClass(tier: string) {
  return tier === 'silver' || tier === 'free'
    ? 'text-semantic-text-secondary'
    : 'text-semantic-text-inverse-muted'
}
</script>

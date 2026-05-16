<template>
  <AccountShell :account-data="accountData" active-page="membership">
    <view>
      <AccountSubPageHeader
        :label="t('membership.title')"
        :title="t('membership.title')"
        :description="t('membership.subtitle')"
      />

      <view class="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <view
          v-if="pageData.currentPlan"
          class="border border-semantic-border-emphasis bg-semantic-surface-emphasis px-6 py-6 shadow-emphasis"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('membership.currentPlan') }}</view>
          <view class="mt-4 text-[28px] font-semibold">{{ pageData.currentPlan.name }}</view>
          <view class="mt-2 text-[14px] text-semantic-text-secondary">
            {{ t(`membership.status.${pageData.currentPlan.status}`) }}
          </view>
          <view class="mt-6 grid gap-3 border-t border-semantic-border-soft pt-5 text-[14px]">
            <view class="flex justify-between">
              <text class="text-semantic-text-secondary">{{ t('membership.startedAt') }}</text>
              <text>{{ pageData.currentPlan.startedAtText }}</text>
            </view>
            <view v-if="pageData.currentPlan.expiresAtText" class="flex justify-between">
              <text class="text-semantic-text-secondary">{{ t('membership.expiresAt') }}</text>
              <text>{{ pageData.currentPlan.expiresAtText }}</text>
            </view>
            <view class="flex justify-between">
              <text class="text-semantic-text-secondary">{{ t('membership.conciergePriority') }}</text>
              <text>{{ pageData.currentPlan.conciergePriority ? t('common.yes') : t('common.no') }}</text>
            </view>
          </view>
        </view>

        <view class="grid gap-6">
          <view
            v-if="featuredEntitlement"
            class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
          >
            <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
              {{ t('membership.featuredEntitlement') }}
            </view>
            <view class="mt-3 text-[18px] font-semibold">{{ featuredEntitlement.label }}</view>
            <view class="mt-4 text-[34px] font-semibold">
              {{ featuredEntitlement.quotaRemaining }}
              <text class="text-[16px] font-normal text-semantic-text-secondary">/ {{ featuredEntitlement.quotaTotal }}</text>
            </view>
            <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
              {{ t('membership.featuredDescription') }}
            </view>
          </view>

          <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('membership.entitlementsTitle') }}</view>
            <view class="mt-4 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
              <view
                v-for="item in secondaryEntitlements"
                :key="item.code"
                class="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-center"
              >
                <view class="text-[13px] text-semantic-text-secondary">{{ item.label }}</view>
                <view class="text-[18px] font-semibold sm:text-right">{{ item.quotaRemaining }} / {{ item.quotaTotal }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-6 border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="text-[16px] font-semibold">{{ t('membership.availablePlans') }}</view>
        <view class="mt-4 grid gap-3 md:grid-cols-3">
          <view
            v-for="plan in pageData.availablePlans"
            :key="plan.id"
            class="border border-semantic-border-soft bg-semantic-surface-panel px-4 py-4"
          >
            <view class="text-[14px] font-medium">{{ plan.name }}</view>
            <view class="mt-3 text-[14px] leading-6 text-semantic-text-secondary">
              {{ plan.description }}
            </view>
            <view class="mt-3 text-[13px] leading-6 text-semantic-text-muted">
              {{ plan.entitlementLabels.join(' / ') }}
            </view>
            <view class="mt-4 text-[13px] text-semantic-text-link">
              {{ t('membership.actions.upgrade') }}
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
import { useAccountMembership, useAccountOverview } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const { pageData } = useAccountMembership(t, () => locale.value)
const featuredEntitlement = computed(() => pageData.value.entitlementBalances.find((item) => item.code === 'private_introduction'))
const secondaryEntitlements = computed(() => pageData.value.entitlementBalances.filter((item) => item.code !== 'private_introduction'))
</script>

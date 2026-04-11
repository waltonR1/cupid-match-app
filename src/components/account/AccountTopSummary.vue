<template>
  <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
    <view class="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
      <view>
        <view class="flex items-center gap-3">
          <view class="h-px w-10 bg-semantic-border-eyebrow" />
          <text class="text-[11px] uppercase tracking-[4px] text-semantic-text-eyebrow">
            {{ t('topSummary.title') }}
          </text>
        </view>
        <view class="mt-4 text-[30px] font-semibold leading-[1.2] text-semantic-text-primary lg:text-[38px]">
          {{ profile?.name ?? account.name }}
        </view>
        <view class="mt-3 max-w-[760px] text-[15px] leading-7 text-semantic-text-secondary">
          {{ t('topSummary.subtitle') }}
        </view>

        <view class="mt-5 flex flex-wrap gap-3">
          <AppButton
            variant="secondary"
            context="section"
            size="sm"
            @click="openMyProfilePage"
          >
            {{ t('topSummary.actions.profile') }}
          </AppButton>
          <AppButton
            variant="secondary"
            context="section"
            size="sm"
            @click="openVerificationPage"
          >
            {{ t('topSummary.actions.verification') }}
          </AppButton>
          <AppButton
            variant="secondary"
            context="section"
            size="sm"
            @click="openConnectionsPage"
          >
            {{ t('topSummary.actions.connections') }}
          </AppButton>
          <AppButton
            variant="primary"
            size="sm"
            @click="openMembershipPage"
          >
            {{ t('topSummary.actions.membership') }}
          </AppButton>
        </view>
      </view>

      <view class="grid gap-4 sm:grid-cols-2">
        <view
          v-for="item in summaryItems"
          :key="item.label"
          class="border border-semantic-border-soft bg-semantic-surface-panel px-5 py-5"
        >
          <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ item.label }}
          </view>
          <view class="mt-3 text-[24px] font-semibold text-semantic-text-primary">
            {{ item.value }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import { useAccountData } from '@/components/account/use-account-data'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import {
  openConnectionsPage,
  openMembershipPage,
  openMyProfilePage,
  openVerificationPage,
} from '@/utils/demo-navigation'

const { t } = usePageI18n('accountCenter')
const { account, profile, userEvents, familyAssistSetting, membershipLabel } = useAccountData()

const verificationCount = computed(() => {
  let count = 1

  if (profile?.familyVisible) count += 1
  if (familyAssistSetting.value?.enabled) count += 1
  if (account.membership !== 'free') count += 1

  return count
})

const summaryItems = computed(() => [
  {
    label: t('topSummary.metrics.completion'),
    value: `${account.completion}%`,
  },
  {
    label: t('topSummary.metrics.verification'),
    value: String(verificationCount.value),
  },
  {
    label: t('topSummary.metrics.membership'),
    value: membershipLabel(account.membership),
  },
  {
    label: t('topSummary.metrics.activity'),
    value: String(userEvents.length),
  },
])
</script>

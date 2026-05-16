<template>
  <AccountShell
    :account-data="accountShellData"
    active-page="home"
  >
    <view v-if="pageData" class="grid gap-6">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
          {{ t('home.accountSummary') }}
        </view>
        <view class="mt-4 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
          <view
            v-for="item in pageData.accountItems"
            :key="item.key"
            class="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)]"
          >
            <view class="text-[13px] text-semantic-text-secondary">{{ item.label }}</view>
            <view class="text-[15px]">{{ item.value }}</view>
          </view>
        </view>
      </view>

      <view
        v-if="pageData.onboarding"
        class="border border-semantic-border-emphasis bg-semantic-surface-emphasis px-6 py-6 shadow-emphasis"
      >
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('home.nextStage') }}</view>
        <view class="mt-4 text-[20px] font-semibold">{{ pageData.onboarding.title }}</view>
        <view class="mt-2 max-w-[720px] text-[15px] leading-7 text-semantic-text-secondary">
          {{ pageData.onboarding.description }}
        </view>
      </view>

      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('home.activitySummary') }}</view>
        <view class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <view v-for="item in pageData.summaryItems" :key="item.key">
            <view class="text-[13px] text-semantic-text-secondary">{{ item.label }}</view>
            <view class="mt-2 text-[26px] font-semibold">{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>
    <EmptyStatePanel
      v-else-if="!accountData.loading.value"
      size="page"
      :title="t('home.empty.title')"
      :subtitle="t('home.empty.profile')"
    />
  </AccountShell>
</template>

<script setup lang="ts">
import AccountShell from '@/components/account/AccountShell.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { useAccountDashboard, useAccountOverview } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const { pageData } = useAccountDashboard(t)
const accountShellData = accountData
</script>

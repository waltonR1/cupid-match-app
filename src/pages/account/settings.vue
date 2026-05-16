<template>
  <AccountShell :account-data="accountData" active-page="settings">
    <view>
      <AccountSubPageHeader
        :label="t('settings.title')"
        :title="t('settings.title')"
        :description="t('settings.subtitle')"
      />

      <view class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[16px] font-semibold">{{ t('settings.preferences') }}</view>
          <view class="mt-4 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
            <view
              v-for="p in pageData.preferences"
              :key="p.code"
              class="grid gap-2 py-4 text-[14px] sm:grid-cols-[220px_minmax(0,1fr)]"
            >
              <text class="text-semantic-text-secondary">{{ p.label }}</text>
              <text>{{ p.displayValue }}</text>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[16px] font-semibold">{{ t('settings.legal') }}</view>
          <view class="mt-4 flex flex-wrap gap-3">
            <text
              v-for="item in pageData.legalDocuments"
              :key="item.type"
              class="border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px] text-semantic-text-link"
            >
              {{ item.label }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import { useAccountOverview, useAccountSettings } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const { pageData } = useAccountSettings(t)
</script>

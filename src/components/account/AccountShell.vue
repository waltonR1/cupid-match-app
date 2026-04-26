<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1280px] px-5 py-6 sm:px-8 lg:py-8">
      <AccountTopSummary
        :account-name="accountData.profile.displayName || accountData.account.displayName"
        :summary-items="topSummaryItems"
      />

      <view class="mt-5">
        <AccountPrimaryNav :active-page="props.activePage" />
      </view>

      <view class="mt-6 border border-semantic-border-default bg-semantic-surface-panel px-6 py-6 shadow-panel lg:px-8 lg:py-8">
        <AccountSectionHeader
          :label="props.headerEyebrow"
          :title="props.headerTitle"
          :description="props.headerDescription"
        />
      </view>

      <view class="mt-6">
        <slot />
      </view>
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import AccountPrimaryNav from '@/components/account/AccountPrimaryNav.vue'
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountTopSummary from '@/components/account/AccountTopSummary.vue'
import type { AccountOverviewContext } from '@/hooks/account'
import type { AccountPrimaryPageKey } from '@/types/account/navigation'
import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'

const props = defineProps<{
  accountData: AccountOverviewContext
  activePage: AccountPrimaryPageKey
  headerEyebrow: string
  headerTitle: string
  headerDescription?: string
}>()

const accountData = props.accountData
const { t: globalT } = useLocaleBridge()
const topSummaryItems = computed(() => [
  {
    key: 'completion',
    value: `${accountData.account.completion}%`,
  },
  {
    key: 'verification',
    value: String(accountData.verificationCount.value),
  },
  {
    key: 'membership',
    value: globalT(`membership.${accountData.account.membership}.title`),
  },
  {
    key: 'activity',
    value: String(accountData.userEvents.length),
  },
])


</script>

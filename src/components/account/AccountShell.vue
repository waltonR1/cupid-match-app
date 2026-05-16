<template>
  <AppPageLayout>
    <view class="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-8">
      <AccountSidebar
        :account-name="accountData.user.accountName || t('topSummary.guestName')"
        :membership="accountData.user.membership"
        :active-page="activePage"
      />

      <view class="min-w-0">
        <slot />
      </view>
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import AccountSidebar from '@/components/account/AccountSidebar.vue'
import type { AccountOverviewContext } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const props = defineProps<{
  accountData: AccountOverviewContext
  activePage: 'home' | 'profiles' | 'relationship' | 'events' | 'membership' | 'settings'
}>()

const accountData = props.accountData
const { t } = usePageI18n('accountCenter')
</script>

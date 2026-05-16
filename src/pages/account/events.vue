<template>
  <AccountShell :account-data="accountData" active-page="events">
    <view>
      <AccountSubPageHeader
        :label="t('events.title')"
        :title="t('events.title')"
        :description="t('events.subtitle')"
      />

      <view class="grid gap-4">
        <view class="grid gap-4">
          <view
            v-if="pageData.eventRegistrations.length > 0"
            class="border border-semantic-border-default bg-semantic-surface-card shadow-panel"
          >
            <view
              v-for="item in pageData.eventRegistrations"
              :key="item.registrationId"
              class="grid gap-4 border-b border-semantic-border-soft px-5 py-5 last:border-b-0 md:grid-cols-[120px_minmax(0,1fr)_140px]"
            >
              <image :src="item.coverImageUrl" class="h-24 w-full object-cover" />
              <view>
                <view class="text-[18px] font-semibold">{{ item.title }}</view>
                <view class="mt-3 text-[14px] text-semantic-text-secondary">{{ item.city }} / {{ item.venue }}</view>
                <view class="mt-1 text-[13px] text-semantic-text-muted">
                  {{ item.dateText }} / {{ item.timeText }}
                </view>
              </view>
              <view class="flex items-start md:justify-end">
                <view class="border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[12px] text-semantic-text-card-label">
                  {{ t(`events.registrationStatus.${item.status}`) }}
                </view>
              </view>
            </view>
          </view>
          <EmptyStatePanel v-else size="page" :title="t('events.empty.title')" :description="t('events.empty.description')" />
        </view>

      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { useAccountEvents, useAccountOverview } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const { pageData } = useAccountEvents(() => locale.value)
</script>

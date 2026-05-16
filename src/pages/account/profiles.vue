<template>
  <AccountShell :account-data="accountData" active-page="profiles">
    <view>
      <AccountSubPageHeader
        :label="t('profiles.title')"
        :title="t('profiles.title')"
        :description="t('profiles.subtitle')"
      />

      <view v-if="pageData" class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card shadow-panel">
          <view
            v-for="profile in pageData.profiles"
            :key="profile.profileId"
            class="flex cursor-pointer items-center gap-4 border-b border-semantic-border-soft px-5 py-5 last:border-b-0 hover:bg-semantic-surface-soft"
            @click="openProfile(profile)"
          >
            <image :src="profile.avatarUrl" class="h-14 w-14 rounded-full object-cover" />
            <view class="min-w-0 flex-1">
              <view class="flex flex-wrap items-center gap-2">
                <view class="text-[18px] font-semibold">{{ profile.displayName }}, {{ profile.age }}</view>
                <view
                  v-for="badge in profile.presentationBadges"
                  :key="badge"
                  class="border border-semantic-border-soft bg-semantic-surface-panel px-2 py-1 text-[11px] text-semantic-text-secondary"
                >
                  {{ badge }}
                </view>
              </view>
              <view class="mt-1 text-[14px] text-semantic-text-secondary">
                {{ profile.city }} / {{ profile.profileStatusText }}
              </view>
            </view>
            <view class="text-[13px] text-semantic-text-link">{{ t('profiles.actions.view') }}</view>
          </view>
        </view>

      </view>
      <EmptyStatePanel
        v-else
        size="page"
        :title="t('profiles.empty.title')"
        :description="t('profiles.empty.description')"
      />
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { useAccountOverview, useAccountProfiles } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openAccountProfileDetail } from '@/utils/navigation'

const { t } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const { pageData } = useAccountProfiles(t)

function openProfile(profile: NonNullable<typeof pageData.value>['profiles'][number]) {
  openAccountProfileDetail(profile.profileId)
}
</script>

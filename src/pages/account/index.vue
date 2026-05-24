<template>
  <AccountShell active-page="home">
    <view v-if="pageData" class="grid gap-6">
      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <view
          v-if="pageData.primaryAction"
          class="border border-semantic-border-emphasis bg-semantic-surface-emphasis px-6 py-6 shadow-emphasis"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('home.nextStage') }}</view>
          <view class="mt-4 text-[24px] font-semibold">{{ pageData.primaryAction.label }}</view>
          <view
            class="mt-6 inline-flex cursor-pointer border border-semantic-border-emphasis bg-component-button-primary-background px-5 py-3 text-[14px] text-semantic-text-inverse transition-opacity hover:opacity-90"
            @click="handleAction(pageData.primaryAction.key)"
          >
            {{ pageData.primaryAction.label }}
          </view>
        </view>

        <view
          v-if="pageData.quotaSummary"
          class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ pageData.quotaSummary.label }}
          </view>
          <view class="mt-5 text-[34px] font-semibold">{{ pageData.quotaSummary.value }}</view>
          <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
            {{ pageData.quotaSummary.description }}
          </view>
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('home.attention.title') }}</view>
          <view class="mt-5 grid gap-4">
            <view
              v-for="item in pageData.attentionItems"
              :key="item.key"
              class="border-t border-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <view class="flex items-start justify-between gap-4">
                <view>
                  <view class="text-[14px] text-semantic-text-secondary">{{ item.label }}</view>
                  <view class="mt-2 text-[15px] leading-7">{{ item.description }}</view>
                </view>
                <view class="text-[28px] font-semibold">{{ item.value }}</view>
              </view>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('home.upcoming.title') }}</view>
          <view v-if="pageData.upcomingItems.length > 0" class="mt-5 grid gap-4">
            <view
              v-for="item in pageData.upcomingItems"
              :key="item.key"
              class="border-t border-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <view class="flex flex-wrap items-center justify-between gap-3">
                <view>
                  <view class="text-[15px]">{{ item.title }}</view>
                  <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ item.meta }}</view>
                </view>
                <view class="border border-semantic-border-soft px-3 py-1 text-[12px] text-semantic-text-secondary">
                  {{ item.status }}
                </view>
              </view>
            </view>
          </view>
          <view v-else class="mt-5 text-[15px] leading-7 text-semantic-text-secondary">
            {{ t('home.upcoming.empty') }}
          </view>
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('home.profiles.title') }}</view>
          <view v-if="pageData.profileItems.length > 0" class="mt-5 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
            <view
              v-for="item in pageData.profileItems"
              :key="item.key"
              class="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto]"
            >
              <view>
                <view class="text-[15px]">{{ item.title }}</view>
                <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ item.meta }}</view>
              </view>
              <view class="text-[13px] text-semantic-text-secondary">{{ item.status }}</view>
            </view>
          </view>
          <view v-else class="mt-5 text-[15px] leading-7 text-semantic-text-secondary">
            {{ t('home.profiles.empty') }}
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ t('home.accountSummary') }}
          </view>
          <view class="mt-4 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
            <view
              v-for="item in pageData.accountItems"
              :key="item.key"
              class="grid gap-1 py-4"
            >
              <view class="text-[13px] text-semantic-text-secondary">{{ item.label }}</view>
              <view class="text-[15px]">{{ item.value }}</view>
            </view>
          </view>
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
      v-else-if="!loading"
      size="page"
      :title="t('home.empty.title')"
      :subtitle="t('home.empty.profile')"
    />
  </AccountShell>
</template>

<script setup lang="ts">
import AccountShell from '@/components/account/AccountShell.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { useAccountDashboard } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openMyProfilePage, openSelfDirectoryPage } from '@/utils/navigation'

const { t } = usePageI18n('accountCenter')
const { loading, pageData } = useAccountDashboard(t)

function handleAction(key: string) {
  if (key === 'create-profile') {
    openMyProfilePage()
    return
  }

  if (key === 'browse-profiles') {
    openSelfDirectoryPage()
  }
}
</script>

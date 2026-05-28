<template>
  <AppPageLayout>
    <view class="mx-auto w-full max-w-[1120px] px-6 py-10 lg:px-8 lg:py-14">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel md:px-8 md:py-8">
        <view class="flex items-center gap-3">
          <view class="h-px w-10 bg-semantic-border-eyebrow" />
          <text class="text-[11px] uppercase tracking-[4px] text-semantic-text-eyebrow">
            {{ t('eyebrow') }}
          </text>
        </view>
        <view class="mt-4 text-[30px] font-semibold text-semantic-text-primary">
          {{ t('title') }}
        </view>
        <view class="mt-3 max-w-[680px] text-[15px] leading-8 text-semantic-text-secondary">
          {{ t('placeholder') }}
        </view>
      </view>

      <view class="mt-6 border border-semantic-border-default bg-semantic-surface-card shadow-panel">
        <view class="border-b border-semantic-border-soft px-6 py-4">
          <view class="text-[16px] font-semibold">{{ t('notifications') }}</view>
        </view>

        <view v-if="threads.length > 0" class="divide-y divide-semantic-border-soft">
          <view
            v-for="item in threads"
            :key="item.id"
            class="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-semantic-surface-soft"
          >
            <view
              v-if="item.unread"
              class="h-2 w-2 shrink-0 rounded-full bg-component-account-nav-current-border"
            />
            <view v-else class="w-2 shrink-0" />
            <view class="min-w-0 flex-1">
              <view class="text-[14px] text-semantic-text-primary">{{ item.lastMessage || t('empty.defaultMessage') }}</view>
              <view class="mt-1 text-[12px] text-semantic-text-muted">{{ item.lastMessageAt }}</view>
            </view>
          </view>
        </view>

        <EmptyStatePanel
          v-else
          size="compact"
          :title="t('empty.title')"
          :description="t('empty.description')"
        />
      </view>
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useMessagesInbox } from '@/hooks/messages/use-messages-inbox'

const { t } = usePageI18n('messages')
const { threads } = useMessagesInbox()
</script>

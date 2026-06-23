<template>
  <AppPageLayout>
    <view class="mx-auto flex max-w-[1120px] gap-0 px-6 py-10 lg:px-8 lg:py-14">
      <!-- 左侧通知列表 -->
      <view class="w-[280px] shrink-0 border border-semantic-border-default bg-semantic-surface-card shadow-panel">
        <view class="border-b border-semantic-border-soft px-5 py-4">
          <view class="text-[16px] font-semibold text-semantic-text-primary">{{ t('title') }}</view>
        </view>

        <view v-if="loading" class="px-5 py-8 text-[13px] text-semantic-text-muted">
          {{ t('loading') }}
        </view>

        <view v-else-if="error" class="px-5 py-8">
          <EmptyStatePanel
              :subtitle="t('error.description')"
              :title="t('error.title')"
              size="compact"
          />
        </view>

        <view v-else class="divide-y divide-semantic-border-soft">
          <view
              v-for="item in threads"
              :key="item.id"
              :class="activeThreadId === item.id ? 'bg-semantic-surface-soft' : ''"
              class="flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors hover:bg-semantic-surface-soft"
              @click="selectThread(item.id)"
          >
            <view class="relative h-10 w-10 shrink-0">
              <image :src="resolveAvatar(item)" class="h-10 w-10 rounded-full object-cover"/>
              <view
                  v-if="item.unread"
                  class="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-semantic-surface-card bg-component-account-nav-current-border"
              />
            </view>
            <view class="min-w-0 flex-1">
              <view class="text-[14px] text-semantic-text-primary">{{ resolveLabel(item) }}</view>
              <view class="mt-0.5 text-[11px] text-semantic-text-muted">{{ formatTime(item.lastMessageAt) }}</view>
            </view>
          </view>
        </view>

        <EmptyStatePanel
            v-if="!loading && !error && threads.length === 0"
            :title="t('empty.title')"
            size="compact"
        />
      </view>

      <!-- 右侧通知详情 -->
      <view
          class="flex min-h-[500px] flex-1 flex-col border border-l-0 border-semantic-border-default bg-semantic-surface-card shadow-panel">
        <template v-if="activeThread">
          <view class="border-b border-semantic-border-soft px-6 py-4">
            <view class="text-[16px] font-semibold text-semantic-text-primary">{{ resolveLabel(activeThread) }}</view>
          </view>

          <view class="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <view v-if="detailLoading" class="text-[13px] text-semantic-text-muted">
              {{ t('loading') }}
            </view>

            <EmptyStatePanel
                v-else-if="detailError"
                :subtitle="t('error.description')"
                :title="t('error.title')"
                size="compact"
            />

            <template v-else>
              <view
                  v-for="msg in messages"
                  :key="msg.id"
                  class="flex justify-start"
              >
                <view
                    class="max-w-[70%] rounded-lg bg-semantic-surface-panel px-4 py-3 text-[14px] leading-6 text-semantic-text-primary">
                  {{ msg.body }}
                </view>
              </view>
              <EmptyStatePanel
                  v-if="messages.length === 0"
                  :title="t('empty.messages')"
                  size="compact"
              />
            </template>
            <view
                v-if="!detailLoading && !detailError && hasMore"
                class="mt-2 cursor-pointer text-center text-[12px] text-semantic-text-link hover:underline"
                @click="loadMore"
            >
              {{ t('loadMore') }}
            </view>
          </view>
        </template>

        <EmptyStatePanel
            v-else
            :subtitle="t('detailPlaceholder.description')"
            :title="t('detailPlaceholder.title')"
            size="compact"
        />
      </view>
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {useRequireAuth} from '@/hooks/common/use-require-auth'
import {computed} from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {useMessagesInbox} from '@/hooks/messages/use-messages-inbox'
import type {InboxSubjectType} from '@/types/messages/inbox'

type MessageThread = {
  subjectType?: InboxSubjectType
}

useRequireAuth()
const {t} = usePageI18n('messages')
const {
  threads,
  messages,
  activeThreadId,
  hasMore,
  loading,
  error,
  detailLoading,
  detailError,
  selectThread,
  loadMore,
} = useMessagesInbox()

const activeThread = computed(() =>
    threads.value.find((t) => t.id === activeThreadId.value) ?? null,
)

const defaultAvatar = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e5e7eb" width="100" height="100"/><text x="50" y="65" text-anchor="middle" fill="%239ca3af" font-size="50">?</text></svg>'

function resolveLabel(item: MessageThread) {
  if (item.subjectType) return t(`subject.${item.subjectType}`)
  return t('subject.system')
}

function resolveAvatar(_item: MessageThread) {
  return defaultAvatar
}

function formatTime(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const diffH = (now.getTime() - d.getTime()) / 3600000
  if (diffH < 1) return `${Math.max(1, Math.floor(diffH * 60))}m`
  if (diffH < 24) return `${Math.floor(diffH)}h`
  if (diffH < 48) return t('time.yesterday')
  return `${d.getMonth() + 1}/${d.getDate()}`
}
</script>

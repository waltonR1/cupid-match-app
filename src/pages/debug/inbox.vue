<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1080px] px-5 py-10 lg:px-8">
      <DebugPageHeader title="Inbox 通知调试" description="查看 mock 通知线程，并发送测试系统通知。">
        <view class="flex flex-wrap gap-2">
          <input v-model="form.userId" class="box-border min-h-[40px] w-[140px] border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[13px]" placeholder="userId" />
          <input v-model="form.body" class="box-border min-h-[40px] flex-1 border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[13px]" placeholder="通知内容" />
          <AppButton variant="primary" size="sm" :disabled="sending" @click="sendNotify">
            {{ sending ? '发送中' : '发送通知' }}
          </AppButton>
          <AppButton variant="secondary" size="sm" @click="load">
            刷新
          </AppButton>
        </view>
      </DebugPageHeader>

      <view class="mt-6 grid gap-4">
        <view
          v-for="item in threads"
          :key="item.id"
          class="border border-semantic-border-default bg-semantic-surface-card px-5 py-4 shadow-panel"
        >
          <view class="flex flex-wrap items-start justify-between gap-4">
            <view>
              <view class="text-[12px] uppercase tracking-[2px] text-semantic-text-eyebrow">
                {{ item.id }} / {{ item.type }}
              </view>
              <view class="mt-2 text-[14px] text-semantic-text-primary">
                userId: {{ item.userId }}
                <text v-if="item.subjectType"> / {{ item.subjectType }}: {{ item.subjectId }}</text>
              </view>
            </view>
            <view class="flex flex-wrap items-center gap-4 text-[12px] text-semantic-text-secondary">
              <view>{{ item.messageCount }} 条消息</view>
              <view>状态: {{ item.status }}</view>
            </view>
          </view>
        </view>

        <EmptyStatePanel
          v-if="threads.length === 0"
          size="compact"
          title="暂无通知线程"
        />
      </view>
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import DebugPageHeader from '@/components/debug/DebugPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { listInboxDebugThreads, sendInboxDebugNotification } from '@/api/debug/inbox'
import type { InboxDebugThread } from '@/api/debug/inbox.types'

const threads = ref<InboxDebugThread[]>([])
const sending = ref(false)
const form = ref({ userId: '', body: '' })

async function load() {
  const data = await listInboxDebugThreads()
  if (data) threads.value = data
}

async function sendNotify() {
  sending.value = true
  try {
    await sendInboxDebugNotification({
      userId: form.value.userId || undefined,
      body: form.value.body || undefined,
    })
    form.value.body = ''
    void load()
  } finally {
    sending.value = false
  }
}

void load()
</script>

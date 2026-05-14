<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1080px] px-5 py-10 lg:px-8">
      <DebugPageHeader
        title="活动申请审核调试"
        description="用于模拟平台确认席位、转入候补或拒绝活动申请。这个页面只操作 mock 后端状态，不参与正式用户流程。"
      >
        <view>
          <AppButton variant="secondary" size="sm" @click="load">
            刷新申请列表
          </AppButton>
        </view>
      </DebugPageHeader>

      <view class="mt-6 grid gap-4">
        <view
          v-for="item in items"
          :key="item.id"
          class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel"
        >
          <view class="flex flex-wrap items-start justify-between gap-4">
            <view>
              <view class="text-[12px] uppercase tracking-[2px] text-semantic-text-eyebrow">
                {{ item.id }} · {{ item.status }}
              </view>
              <view class="mt-2 text-[20px] font-semibold text-semantic-text-primary">
                {{ item.eventTitle }}
              </view>
              <view class="mt-2 text-[14px] leading-6 text-semantic-text-muted">
                申请用户：{{ item.userName }}（{{ item.userId }}）
              </view>
              <view class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                活动编号：{{ item.eventId }}
              </view>
              <view class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                申请时间：{{ item.requestedAt }}
              </view>
              <view v-if="item.confirmedAt" class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                确认时间：{{ item.confirmedAt }}
              </view>
              <view v-if="item.declinedAt" class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                拒绝时间：{{ item.declinedAt }}
              </view>
              <view v-if="item.cancelledAt" class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                取消时间：{{ item.cancelledAt }}
              </view>
            </view>

            <view class="flex flex-wrap gap-2">
              <AppButton
                variant="primary"
                size="sm"
                :disabled="item.status !== 'requested' || submittingId === item.id"
                @click="review(item.id, 'confirmed')"
              >
                确认席位
              </AppButton>
              <AppButton
                variant="secondary"
                size="sm"
                :disabled="item.status !== 'requested' || submittingId === item.id"
                @click="review(item.id, 'waitlist')"
              >
                转入候补
              </AppButton>
              <AppButton
                variant="secondary"
                size="sm"
                :disabled="item.status !== 'requested' || submittingId === item.id"
                @click="review(item.id, 'declined')"
              >
                拒绝
              </AppButton>
            </view>
          </view>
        </view>

        <view
          v-if="!items.length && !loading"
          class="border border-semantic-border-default bg-semantic-surface-card px-6 py-8 text-center text-semantic-text-muted shadow-panel"
        >
          暂无活动申请。先在活动详情调试页提交一次申请。
        </view>
      </view>
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import DebugPageHeader from '@/components/debug/DebugPageHeader.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import {
  getEventRegistrationDebugItems,
  reviewEventRegistrationDebugItem,
  type EventRegistrationDebugItem,
  type EventRegistrationDebugReviewStatus,
} from '@/api/debug'

const items = ref<EventRegistrationDebugItem[]>([])
const loading = ref(false)
const submittingId = ref('')

onMounted(() => {
  void load()
})

async function load() {
  loading.value = true
  try {
    const response = await getEventRegistrationDebugItems()
    items.value = response.items
  } finally {
    loading.value = false
  }
}

async function review(id: string, status: EventRegistrationDebugReviewStatus) {
  submittingId.value = id
  try {
    await reviewEventRegistrationDebugItem(id, status)
    await load()
  } finally {
    submittingId.value = ''
  }
}
</script>

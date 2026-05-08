<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1080px] px-5 py-10 lg:px-8">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
          Debug Tool
        </view>
        <view class="mt-2 text-[28px] font-semibold leading-tight text-semantic-text-primary">
          私人介绍请求调试
        </view>
        <view class="mt-3 text-[15px] leading-7 text-semantic-text-muted">
          用于模拟对方接受或拒绝 Private Introduction。这个页面只操作 mock 后端状态，不参与正式用户流程。
        </view>
        <view class="mt-5">
          <AppButton variant="secondary" size="sm" @click="load">
            刷新请求列表
          </AppButton>
        </view>
      </view>

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
                {{ item.profileName }}
              </view>
              <view class="mt-2 text-[14px] leading-6 text-semantic-text-muted">
                申请账号：{{ item.accountName }}（{{ item.accountId }}）
              </view>
              <view class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                发起时间：{{ item.requestedAt }}
              </view>
              <view v-if="item.respondedAt" class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                响应时间：{{ item.respondedAt }}
              </view>
              <view v-if="item.cooldownUntil" class="mt-1 text-[14px] leading-6 text-semantic-text-muted">
                冷静期至：{{ item.cooldownUntil }}
              </view>
            </view>

            <view class="flex flex-wrap gap-2">
              <AppButton
                variant="primary"
                size="sm"
                :disabled="item.status !== 'requested' || submittingId === item.id"
                @click="acceptRequest(item.id)"
              >
                接受
              </AppButton>
              <AppButton
                variant="secondary"
                size="sm"
                :disabled="item.status !== 'requested' || submittingId === item.id"
                @click="declineRequest(item.id)"
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
          暂无私人介绍请求。先在 self detail 页面提交一次申请。
        </view>
      </view>
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import {
  acceptPrivateIntroductionDebugRequest,
  declinePrivateIntroductionDebugRequest,
  getPrivateIntroductionDebugRequests,
  type PrivateIntroductionDebugItem,
} from '@/api/debug'

const items = ref<PrivateIntroductionDebugItem[]>([])
const loading = ref(false)
const submittingId = ref('')

onMounted(() => {
  void load()
})

async function load() {
  loading.value = true
  try {
    const response = await getPrivateIntroductionDebugRequests()
    items.value = response.items
  } finally {
    loading.value = false
  }
}

async function acceptRequest(id: string) {
  submittingId.value = id
  try {
    await acceptPrivateIntroductionDebugRequest(id)
    await load()
  } finally {
    submittingId.value = ''
  }
}

async function declineRequest(id: string) {
  submittingId.value = id
  try {
    await declinePrivateIntroductionDebugRequest(id)
    await load()
  } finally {
    submittingId.value = ''
  }
}
</script>

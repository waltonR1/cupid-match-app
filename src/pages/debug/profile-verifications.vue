<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1080px] px-5 py-10 lg:px-8">
      <DebugPageHeader
        title="资料认证审核调试"
        description="查看 mock profile_verifications，并模拟工作人员更新身份、学历、收入、婚姻与平台审核状态。"
      >
        <view class="flex flex-wrap items-end gap-3">
          <view class="grid min-w-[260px] flex-1 gap-2">
            <text class="text-[13px] text-semantic-text-secondary">资料 ID</text>
            <input
              v-model="profileId"
              class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary"
              placeholder="可留空，例如 p-001"
            />
          </view>
          <AppButton variant="secondary" size="sm" @click="load">
            刷新
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
                {{ item.id }} / {{ item.profileId }}
              </view>
              <view class="mt-2 text-[20px] font-semibold text-semantic-text-primary">
                {{ item.profileName }}
              </view>
              <view class="mt-3 grid gap-1 text-[14px] leading-6 text-semantic-text-muted">
                <text>真实姓名：{{ item.legalName || '未填写' }}</text>
                <text>出生日期：{{ item.dateOfBirth || '未填写' }}</text>
                <text>完成时间：{{ item.verifiedAt || '未完成' }}</text>
              </view>
            </view>
          </view>

          <view class="mt-5 grid gap-4 md:grid-cols-2">
            <view
              v-for="field in fields"
              :key="field.key"
              class="border border-semantic-border-soft bg-semantic-surface-panel px-4 py-4"
            >
              <view class="flex flex-wrap items-center justify-between gap-3">
                <view>
                  <view class="text-[13px] text-semantic-text-secondary">{{ field.label }}</view>
                  <view class="mt-1 text-[16px] font-semibold text-semantic-text-primary">
                    {{ statusLabel(item[field.key]) }}
                  </view>
                </view>
              </view>
              <view class="mt-4 flex flex-wrap gap-2">
                <AppButton
                  v-for="status in field.statuses"
                  :key="status"
                  :variant="item[field.key] === status ? 'primary' : 'secondary'"
                  size="sm"
                  :disabled="submittingKey === `${item.profileId}-${field.key}`"
                  @click="review(item.profileId, field.key, status)"
                >
                  {{ statusLabel(status) }}
                </AppButton>
              </view>
            </view>
          </view>
        </view>

        <view
          v-if="!items.length && !loading"
          class="border border-semantic-border-default bg-semantic-surface-card px-6 py-8 text-center text-semantic-text-muted shadow-panel"
        >
          暂无认证记录。
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
  getProfileVerificationDebugItems,
  reviewProfileVerificationDebugItem,
  type ProfileVerificationDebugField,
  type ProfileVerificationDebugItem,
  type ProfileVerificationDebugStatus,
} from '@/api/debug'

const items = ref<ProfileVerificationDebugItem[]>([])
const loading = ref(false)
const submittingKey = ref('')
const profileId = ref('')

const verificationStatuses = ['unverified', 'pending', 'verified', 'rejected'] as const
const reviewStatuses = ['unreviewed', 'pending', 'approved', 'rejected'] as const

const fields: Array<{
  key: ProfileVerificationDebugField
  label: string
  statuses: readonly ProfileVerificationDebugStatus[]
}> = [
  {key: 'identityStatus', label: '身份认证', statuses: verificationStatuses},
  {key: 'educationStatus', label: '学历认证', statuses: verificationStatuses},
  {key: 'incomeStatus', label: '收入认证', statuses: verificationStatuses},
  {key: 'maritalStatus', label: '婚姻认证', statuses: verificationStatuses},
  {key: 'reviewStatus', label: '平台审核', statuses: reviewStatuses},
]

onMounted(() => {
  void load()
})

async function load() {
  loading.value = true
  try {
    const response = await getProfileVerificationDebugItems(profileId.value.trim() || undefined)
    items.value = response.items
  } finally {
    loading.value = false
  }
}

async function review(
  profileIdValue: string,
  field: ProfileVerificationDebugField,
  status: ProfileVerificationDebugStatus,
) {
  submittingKey.value = `${profileIdValue}-${field}`
  try {
    await reviewProfileVerificationDebugItem(profileIdValue, field, status)
    await load()
  } finally {
    submittingKey.value = ''
  }
}

function statusLabel(status: ProfileVerificationDebugStatus) {
  return {
    unverified: '未认证',
    pending: '审核中',
    verified: '已认证',
    rejected: '未通过',
    unreviewed: '未审核',
    approved: '已通过',
  }[status]
}
</script>

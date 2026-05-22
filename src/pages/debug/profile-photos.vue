<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1080px] px-5 py-10 lg:px-8">
      <DebugPageHeader
        title="资料照片审核调试"
        description="查看 mock 资料照片，并在待审核、已通过、已隐藏状态之间切换。"
      >
        <view class="flex flex-wrap gap-2">
          <input
            v-model="profileId"
            class="box-border min-h-[44px] w-full min-w-[220px] border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary"
            placeholder="资料 ID，可留空"
          />
          <AppButton variant="secondary" size="sm" @click="load">
            刷新
          </AppButton>
        </view>
      </DebugPageHeader>

      <view class="mt-6 grid gap-4">
        <view
          v-for="item in items"
          :key="item.id"
          class="grid gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel md:grid-cols-[120px_minmax(0,1fr)]"
        >
          <image :src="item.url" class="h-[120px] w-full border border-semantic-border-soft object-cover" mode="aspectFill" />

          <view class="grid gap-4">
            <view class="flex flex-wrap items-start justify-between gap-4">
              <view>
                <view class="text-[12px] uppercase tracking-[2px] text-semantic-text-eyebrow">
                  {{ item.id }} / {{ item.status }}
                </view>
                <view class="mt-2 text-[20px] font-semibold text-semantic-text-primary">
                  {{ item.profileId }}
                </view>
                <view class="mt-2 text-[14px] leading-6 text-semantic-text-muted">
                  排序：{{ item.sortOrder }} / 主图：{{ item.isPrimary ? '是' : '否' }}
                </view>
              </view>

              <view class="flex flex-wrap gap-2">
                <AppButton
                  variant="primary"
                  size="sm"
                  :disabled="submittingId === item.id || item.status === 'approved'"
                  @click="review(item.id, 'approved')"
                >
                  通过
                </AppButton>
                <AppButton
                  variant="secondary"
                  size="sm"
                  :disabled="submittingId === item.id || item.status === 'review'"
                  @click="review(item.id, 'review')"
                >
                  待审核
                </AppButton>
                <AppButton
                  variant="secondary"
                  size="sm"
                  :disabled="submittingId === item.id || item.status === 'hidden'"
                  @click="review(item.id, 'hidden')"
                >
                  隐藏
                </AppButton>
              </view>
            </view>
          </view>
        </view>

        <view
          v-if="!items.length && !loading"
          class="border border-semantic-border-default bg-semantic-surface-card px-6 py-8 text-center text-semantic-text-muted shadow-panel"
        >
          暂无资料照片。
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
  getProfilePhotoDebugItems,
  reviewProfilePhotoDebugItem,
  type ProfilePhotoDebugItem,
  type ProfilePhotoDebugStatus,
} from '@/api/debug'

const items = ref<ProfilePhotoDebugItem[]>([])
const loading = ref(false)
const submittingId = ref('')
const profileId = ref('')

onMounted(() => {
  void load()
})

async function load() {
  loading.value = true
  try {
    const response = await getProfilePhotoDebugItems(profileId.value.trim() || undefined)
    items.value = response.items
  } finally {
    loading.value = false
  }
}

async function review(id: string, status: ProfilePhotoDebugStatus) {
  submittingId.value = id
  try {
    await reviewProfilePhotoDebugItem(id, status)
    await load()
  } finally {
    submittingId.value = ''
  }
}
</script>

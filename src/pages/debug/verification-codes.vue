<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1080px] px-5 py-10 lg:px-8">
      <DebugPageHeader
        title="验证码调试"
        description="查看本地开发环境生成的登录方式验证码。验证码只用于本地调试，不进入正式产品链路。"
      >
        <AppButton variant="secondary" size="sm" @click="load">
          刷新
        </AppButton>
      </DebugPageHeader>

      <view class="mt-6 grid gap-4">
        <view
          v-for="item in items"
          :key="item.id"
          class="grid gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel md:grid-cols-[180px_minmax(0,1fr)_160px]"
        >
          <view>
            <view class="text-[12px] uppercase tracking-[2px] text-semantic-text-eyebrow">
              {{ item.provider }}
            </view>
            <view class="mt-2 text-[26px] font-semibold tracking-[4px] text-semantic-text-primary">
              {{ item.code }}
            </view>
          </view>

          <view class="min-w-0">
            <view class="text-[13px] text-semantic-text-muted">
              账号标识
            </view>
            <view class="mt-2 break-words text-[15px] font-medium text-semantic-text-primary">
              {{ item.identifier }}
            </view>
          </view>

          <view>
            <view class="text-[13px] text-semantic-text-muted">
              过期时间
            </view>
            <view class="mt-2 text-[14px] font-medium text-semantic-text-primary">
              {{ formatLocalizedDateTime(locale, item.expiresAt) }}
            </view>
          </view>
        </view>

        <view
          v-if="!items.length && !loading"
          class="border border-semantic-border-default bg-semantic-surface-card px-6 py-8 text-center text-semantic-text-muted shadow-panel"
        >
          暂无验证码。请先在注册页或账户设置里点击“发送验证码”。
        </view>
      </view>
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import { useDebugGuard } from '@/hooks/common/use-debug-guard'
useDebugGuard()
import { onMounted, ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import DebugPageHeader from '@/components/debug/DebugPageHeader.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import { listVerificationCodeDebugItems, type VerificationCodeDebugItem } from '@/api/debug'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { formatLocalizedDateTime } from '@/utils/locale-format'

const { locale } = usePageI18n('common')
const items = ref<VerificationCodeDebugItem[]>([])
const loading = ref(false)

onMounted(() => {
  void load()
})

async function load() {
  loading.value = true
  try {
    items.value = await listVerificationCodeDebugItems()
  } finally {
    loading.value = false
  }
}
</script>

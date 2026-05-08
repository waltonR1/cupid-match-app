<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1080px] px-5 py-10 lg:px-8">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
          Debug Center
        </view>
        <view class="mt-2 text-[30px] font-semibold leading-tight text-semantic-text-primary">
          调试工具
        </view>
        <view class="mt-3 text-[15px] leading-7 text-semantic-text-muted">
          本页只用于本地 mock 调试，集中进入临时工具页面。
        </view>
      </view>

      <view class="mt-6 grid gap-4 md:grid-cols-2">
        <view
          v-for="item in debugItems"
          :key="item.path"
          class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
        >
          <view class="text-[12px] uppercase tracking-[2px] text-semantic-text-eyebrow">
            {{ item.label }}
          </view>
          <view class="mt-2 text-[22px] font-semibold text-semantic-text-primary">
            {{ item.title }}
          </view>
          <view class="mt-3 min-h-[56px] text-[14px] leading-7 text-semantic-text-muted">
            {{ item.description }}
          </view>
          <view class="mt-5">
            <AppButton variant="primary" size="sm" @click="openPage(item.path)">
              进入调试
            </AppButton>
          </view>
        </view>
      </view>
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import AppButton from '@/components/common/AppButton.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import {openPage} from '@/utils/navigation'

const debugItems = [
  {
    label: 'Private Introduction',
    title: '私人介绍请求',
    description: '查看 mock 私人介绍请求，并模拟对方接受或拒绝。',
    path: '/pages/debug/private-introductions',
  },
  {
    label: 'Access Preview',
    title: '访问层级预览',
    description: '预览 self detail 在 Backend、Guest、Free、Member 下的字段展示差异。',
    path: '/pages/debug/profile-access-preview',
  },
]
</script>

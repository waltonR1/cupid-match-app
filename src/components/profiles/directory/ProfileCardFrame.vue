<template>
  <view
      class="flex h-full min-h-[460px] cursor-pointer flex-col border border-semantic-border-default bg-semantic-surface-card p-6 transition-all duration-300 hover:-translate-y-[3px] hover:border-component-directory-card-hover-border hover:bg-semantic-surface-soft hover:shadow-panel"
      @click="handleSelect"
  >
    <!-- 头部信息 -->
    <view class="flex items-start justify-between gap-4">
      <view class="flex min-w-0 items-center gap-4">
        <AppAvatar :value="data.avatarUrl" :fallback="data.avatarFallback"/>

        <view class="min-w-0">
          <view class="flex items-center gap-2">
            <view class="min-w-0 truncate text-[22px] font-semibold text-semantic-text-primary">
              {{ data.displayName }}
            </view>

            <AppGenderBadge :gender="data.gender"/>
          </view>

          <view class="mt-1 text-[14px] text-semantic-text-muted">
            {{ data.meta }}
          </view>
        </view>
      </view>

      <!-- 右上角徽标 -->
      <view
          class="rounded-full border border-component-directory-card-badge-border bg-component-directory-card-badge-background px-3 py-1 text-[12px] text-component-directory-card-badge-text">
        {{ data.badge }}
      </view>
    </view>

    <!-- 简介 -->
    <view class="mt-6 text-[15px] leading-7 text-semantic-text-secondary">
      {{ data.summary }}
    </view>

    <!-- 基础信息 -->
    <view class="mt-6 grid gap-3">
      <view
          v-for="fact in data.facts"
          :key="fact.label"
          class="flex items-start justify-between gap-4 border-b border-semantic-border-divider pb-3 text-[14px]"
      >
        <text class="text-semantic-text-subtle">{{ fact.label }}</text>
        <text class="text-right text-semantic-text-primary">{{ fact.value }}</text>
      </view>
    </view>

    <!-- 标签 -->
    <view class="mt-6 flex flex-wrap gap-2">
      <view
          v-for="tag in data.tags"
          :key="tag"
          class="rounded-full border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1 text-[12px] text-semantic-text-muted"
      >
        {{ tag }}
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="mt-auto pt-8 text-[13px] italic tracking-[2px] text-semantic-text-eyebrow">
      {{ data.footer }}
    </view>
  </view>
</template>

<script setup lang="ts">
import AppAvatar from '@/components/common/AppAvatar.vue'
import AppGenderBadge from '@/components/common/AppGenderBadge.vue'
import type {ProfileCardViewModel} from '@/types/profiles/card'

/** 卡片数据 */
defineProps<{
  data: ProfileCardViewModel
}>()

/** 卡片点击事件 */
const emit = defineEmits<{
  (e: 'select'): void
}>()

/** 触发选中 */
function handleSelect() {
  emit('select')
}
</script>
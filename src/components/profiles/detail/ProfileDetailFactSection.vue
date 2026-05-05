<template>
  <view :class="surfaceClass" class="px-6 py-7 shadow-panel">

    <!-- 区块标题 -->
    <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-eyebrow">
      {{ title }}
    </view>

    <!-- 自定义内容 -->
    <slot/>

    <!-- 信息列表 -->
    <view class="mt-6 grid gap-4">
      <view
          v-for="item in visibleItems"
          :key="item.label"
          class="border-b border-semantic-border-divider pb-3 last:border-b-0 last:pb-0"
      >
        <view class="text-[12px] tracking-[1px] text-semantic-text-muted">
          {{ item.label }}
        </view>

        <view class="mt-2 text-[16px] leading-7 text-semantic-text-secondary">
          {{ displayValue(item) }}
        </view>
      </view>
    </view>

  </view>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import type {ProfileDetailFactItem} from '@/types/profiles/detail'

/** 组件参数 */
const props = withDefaults(defineProps<{
  title: string
  items: ProfileDetailFactItem[]
  surface?: 'card' | 'soft'
}>(), {
  surface: 'card',
})

/** 默认插槽 */
defineSlots<{
  default?(): unknown
}>()

/** 区块表面样式 */
const surfaceClass = computed(() => {
  if (props.surface === 'soft') {
    return 'border border-semantic-border-default bg-semantic-surface-soft'
  }

  return 'border border-semantic-border-default bg-semantic-surface-card'
})

/** 可展示字段 */
const visibleItems = computed(() => props.items.filter(item => item.access !== 'hidden'))

/** 格式化展示值 */
function displayValue(item: ProfileDetailFactItem) {
  if (item.access === 'masked') {
    return item.maskText || '****'
  }

  return item.value
}
</script>
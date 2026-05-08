<template>
  <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
    <view class="flex flex-wrap items-end justify-between gap-3">
      <view>
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
          {{ title }}
        </view>
        <view v-if="subtitle" class="mt-2 text-[14px] leading-6 text-semantic-text-muted">
          {{ subtitle }}
        </view>
      </view>
      <slot name="aside"/>
    </view>

    <slot/>

    <view v-if="visibleItems.length" :class="gridClass" class="mt-6 grid gap-4">
      <view
          v-for="item in visibleItems"
          :key="item.label"
          class="border-b border-semantic-border-divider pb-3 last:border-b-0"
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

/** 组件入参 */
const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  items?: ProfileDetailFactItem[]
  columns?: 1 | 2 | 3
  loginLockedText?: string
  memberLockedText?: string
}>(), {
  subtitle: '',
  items: () => [],
  columns: 2,
  loginLockedText: '****',
  memberLockedText: '****',
})

/** 组件插槽 */
defineSlots<{
  default?(): unknown
  aside?(): unknown
}>()

/** 可见资料项 */
const visibleItems = computed(() => props.items.filter(item => item.access !== 'hidden'))

/** 网格列样式 */
const gridClass = computed(() => {
  if (props.columns === 3) return 'md:grid-cols-2 xl:grid-cols-3'
  if (props.columns === 1) return ''
  return 'md:grid-cols-2'
})

/** 显示字段值 */
function displayValue(item: ProfileDetailFactItem) {
  if (item.access === 'masked') {
    if (item.lockReason === 'login') return props.loginLockedText
    if (item.lockReason === 'member') return props.memberLockedText
    return item.maskText || '****'
  }

  return item.value
}
</script>

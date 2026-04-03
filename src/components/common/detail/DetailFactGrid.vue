<template>
  <view class="grid gap-x-6 gap-y-4" :class="gridClassName">
    <view
      v-for="item in items"
      :key="item.label"
      class="border-b border-border-light pb-3"
    >
      <view class="text-[12px] tracking-[1px] text-text-muted">
        {{ item.label }}
      </view>
      <view class="mt-2 text-[16px] leading-7 text-text-body">
        {{ item.value }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DetailFactItem } from './detail.types'

const props = withDefaults(defineProps<{
  items: DetailFactItem[]
  columns?: 2 | 3
}>(), {
  columns: 3,
})

const gridClassName = computed(() => {
  return props.columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'
})
</script>

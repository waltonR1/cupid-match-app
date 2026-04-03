<template>
  <view class="grid gap-4">
    <view
      v-for="item in items"
      :key="item.label"
      class="border-b border-border-light pb-3 last:border-b-0 last:pb-0"
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
import type { DetailFactItem } from './detail.types'

defineProps<{
  items: DetailFactItem[]
}>()
</script>

<template>
  <view class="mx-auto max-w-[1280px] px-8 py-20">
    <view class="grid gap-5 md:grid-cols-4">
      <view
        v-for="item in items"
        :key="item.label"
        class="border border-border-base bg-surface-card px-6 py-7 shadow-panel"
      >
        <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">{{ item.label }}</view>
        <view class="mt-4 text-[34px] font-semibold text-text-heading">{{ item.value }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EventStatItem } from './events.types'

defineProps<{
  items: EventStatItem[]
}>()
</script>

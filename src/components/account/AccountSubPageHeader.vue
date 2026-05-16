<template>
  <view class="mb-6">
    <view class="flex items-center gap-3">
      <view class="h-px w-10 bg-semantic-border-eyebrow" />
      <text class="text-[11px] uppercase tracking-[4px] text-semantic-text-eyebrow">
        {{ label }}
      </text>
    </view>
    <view class="mt-3 text-[28px] font-semibold text-semantic-text-primary">
      {{ title }}
    </view>
    <view v-if="description" class="mt-2 max-w-[720px] text-[15px] leading-7 text-semantic-text-secondary">
      {{ description }}
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  title: string
  description?: string
}>()
</script>

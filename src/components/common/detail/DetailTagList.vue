<template>
  <view class="flex flex-wrap gap-2">
    <view
      v-for="item in items"
      :key="item"
      class="rounded-full border border-border-base bg-surface-panel px-3 py-1.5 text-[12px] text-brand-brown"
    >
      {{ item }}
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  items: string[]
}>()
</script>

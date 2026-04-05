<template>
  <view
    v-if="items.length"
    class="flex flex-wrap gap-2"
  >
    <view
      v-for="item in items"
      :key="String(item.key)"
      class="inline-flex min-h-[28px] items-center gap-2 border border-border-accent/40 bg-surface-panel px-2.5 text-[12px] text-brand-support"
    >
      <text class="text-text-body-soft">{{ item.label }}</text>
      <text class="font-medium">{{ item.value }}</text>
      <text
        class="cursor-pointer text-[12px] leading-none transition-opacity duration-200 hover:opacity-70"
        @click="$emit('remove', item.key)"
      >
        x
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    key: string
    label: string
    value: string
  }>
}>()

defineEmits<{
  (e: 'remove', key: string): void
}>()
</script>

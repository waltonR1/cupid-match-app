<template>
  <view
    v-if="items.length"
    class="flex flex-wrap gap-2 border border-border-light bg-surface-base px-3 py-3"
  >
    <view
      v-for="item in items"
      :key="String(item.key)"
      class="inline-flex min-h-[36px] items-center gap-2 border border-brand-highlight/40 bg-brand-highlight/10 px-3 text-[12px] text-brand-brown"
    >
      <text class="text-text-body-soft">{{ item.label }}</text>
      <text class="font-medium">{{ item.value }}</text>
      <text
        class="cursor-pointer text-[13px] leading-none transition-opacity duration-200 hover:opacity-70"
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

<template>
  <view
    v-if="items.length"
    class="flex flex-wrap gap-2"
  >
    <view
      v-for="item in items"
      :key="String(item.key)"
      class="inline-flex min-h-[28px] items-center gap-2 border border-next-component-directory-control-selected-border bg-next-component-directory-control-selected-background px-2.5 text-[12px] text-next-component-directory-control-selected-text"
    >
      <text class="text-next-semantic-text-muted">{{ item.label }}</text>
      <text class="font-medium">{{ item.value }}</text>
      <text
        class="cursor-pointer text-[12px] leading-none transition-colors duration-200 hover:text-next-semantic-text-primary"
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

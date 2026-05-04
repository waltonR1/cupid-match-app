<template>
  <!-- 已激活筛选标签列表 -->
  <view
      v-if="items.length"
      class="flex flex-wrap gap-2"
  >
    <view
        v-for="item in items"
        :key="String(item.key)"
        class="inline-flex min-h-[28px] items-center gap-2 border border-component-directory-control-selected-border bg-component-directory-control-selected-background px-2.5 text-[12px] text-component-directory-control-selected-text"
    >
      <text class="text-semantic-text-muted">{{ item.label }}</text>
      <text class="font-medium">{{ item.value }}</text>

      <!-- 移除筛选标签 -->
      <text
          class="cursor-pointer text-[12px] leading-none transition-colors duration-200 hover:text-semantic-text-primary"
          @click="$emit('remove', item.key)"
      >
        x
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
/** 已激活筛选标签组件参数 */
defineProps<{
  items: Array<{
    key: string
    label: string
    value: string
  }>
}>()

/** 移除筛选标签事件 */
defineEmits<{
  (e: 'remove', key: string): void
}>()
</script>
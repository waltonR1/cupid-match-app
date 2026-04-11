<template>
  <view class="mt-5 border border-next-semantic-border-default bg-next-semantic-surface-card px-5 py-4 shadow-next-shadow-panel">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <view class="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-next-semantic-text-muted">
        <view>
          {{ resultPrefix }}
          <text class="px-1 font-medium text-next-semantic-text-primary">{{ total }}</text>
          {{ resultSuffix }}
        </view>

        <view v-if="total > 0">
          {{ pageText }}
          <text class="px-1 font-medium text-next-semantic-text-primary">{{ start }} - {{ end }}</text>
        </view>
      </view>

      <view class="flex flex-wrap items-center gap-2">
        <view class="mr-1 text-[13px] tracking-[2px] text-next-semantic-text-muted">
          {{ sortLabel }}
        </view>

        <view
          v-for="item in sortOptions"
          :key="item.value"
          class="inline-flex min-h-[40px] cursor-pointer items-center justify-center border px-4 text-[13px] transition-all duration-200"
          :class="item.value === sortKey
            ? 'border-next-component-directory-control-selected-border bg-next-component-directory-control-selected-background text-next-component-directory-control-selected-text hover:-translate-y-[1px] hover:border-next-component-directory-control-selected-border-hover hover:bg-next-component-directory-control-selected-background-hover'
            : 'border-next-semantic-border-default bg-next-semantic-surface-panel text-next-semantic-text-muted hover:-translate-y-[1px] hover:border-next-semantic-border-interactive-hover hover:bg-next-semantic-surface-soft hover:text-next-semantic-text-primary'"
          @click="$emit('update:sort-key', item.value)"
        >
          {{ item.label }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  resultPrefix: string
  resultSuffix: string
  pageText: string
  sortLabel: string
  total: number
  start: number
  end: number
  sortKey: string
  sortOptions: Array<{
    label: string
    value: string
  }>
}>()

defineEmits<{
  (e: 'update:sort-key', value: string): void
}>()
</script>

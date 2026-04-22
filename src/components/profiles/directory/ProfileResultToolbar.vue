<template>
  <view class="mt-5 border border-semantic-border-default bg-semantic-surface-card px-5 py-4 shadow-panel">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <view class="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-semantic-text-muted">
        <view>
          {{ summary.prefix }}
          <text class="px-1 font-medium text-semantic-text-primary">{{ summary.total }}</text>
          {{ summary.suffix }}
        </view>

        <view v-if="summary.total > 0">
          {{ summary.pageText }}
          <text class="px-1 font-medium text-semantic-text-primary">{{ summary.start }} - {{ summary.end }}</text>
        </view>
      </view>

      <view class="flex flex-wrap items-center gap-2">
        <view class="mr-1 text-[13px] tracking-[2px] text-semantic-text-muted">
          {{ sort.label }}
        </view>

        <view
          v-for="item in sort.options"
          :key="item.value"
          class="inline-flex min-h-[40px] cursor-pointer items-center justify-center border px-4 text-[13px] transition-all duration-200"
          :class="item.value === sort.key
            ? 'border-component-directory-control-selected-border bg-component-directory-control-selected-background text-component-directory-control-selected-text hover:-translate-y-[1px] hover:border-component-directory-control-selected-border-hover hover:bg-component-directory-control-selected-background-hover'
            : 'border-semantic-border-default bg-semantic-surface-panel text-semantic-text-muted hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
          @click="$emit('update:sort-key', item.value)"
        >
          {{ item.label }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface DirectoryResultSummary {
  prefix: string
  suffix: string
  pageText: string
  total: number
  start: number
  end: number
}

interface DirectorySortControl {
  label: string
  key: string
  options: Array<{
    label: string
    value: string
  }>
}

defineProps<{
  summary: DirectoryResultSummary
  sort: DirectorySortControl
}>()

defineEmits<{
  (e: 'update:sort-key', value: string): void
}>()
</script>

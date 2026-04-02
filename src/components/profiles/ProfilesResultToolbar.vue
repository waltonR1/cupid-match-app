<template>
  <view class="mt-5 border border-border-base bg-surface-card px-5 py-4 shadow-[0_16px_40px_rgba(30,24,18,0.04)]">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <view class="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-text-body-soft">
        <view>
          {{ resultPrefix }}
          <text class="px-1 font-medium text-text-heading">{{ total }}</text>
          {{ resultSuffix }}
        </view>

        <view v-if="total > 0">
          {{ pageText }}
          <text class="px-1 font-medium text-text-heading">{{ start }} - {{ end }}</text>
        </view>
      </view>

      <view class="flex flex-wrap items-center gap-2">
        <view class="mr-1 text-[13px] tracking-[2px] text-text-muted">
          {{ sortLabel }}
        </view>

        <view
          v-for="item in sortOptions"
          :key="item.value"
          class="inline-flex min-h-[40px] cursor-pointer items-center justify-center border px-4 text-[13px] transition-all duration-200"
          :class="item.value === sortKey
            ? 'border-brand-highlight/60 bg-brand-highlight/10 text-brand-brown hover:-translate-y-[1px] hover:border-brand-highlight/80 hover:bg-brand-highlight/20'
            : 'border-border-base bg-surface-base text-text-body-soft hover:-translate-y-[1px] hover:border-border-highlight hover:bg-surface-panel hover:text-text-heading'"
          @click="$emit('update:sort-key', item.value)"
        >
          {{ item.label }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DirectoryOption, ProfilesSortKey } from './profiles.types'

defineProps<{
  resultPrefix: string
  resultSuffix: string
  pageText: string
  sortLabel: string
  total: number
  start: number
  end: number
  sortKey: ProfilesSortKey
  sortOptions: DirectoryOption[]
}>()

defineEmits<{
  (e: 'update:sort-key', value: string): void
}>()
</script>

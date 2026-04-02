<template>
  <view class="mt-5 border border-divider bg-card px-4 py-4 lg:px-5">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <view class="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-text-secondary">
        <view>
          {{ resultPrefix }}
          <text class="px-1 text-text-main">{{ total }}</text>
          {{ resultSuffix }}
        </view>

        <view v-if="total > 0">
          {{ pageText }}
          <text class="px-1 text-text-main">{{ start }} - {{ end }}</text>
        </view>
      </view>

      <view class="flex flex-wrap items-center gap-2">
        <view class="mr-1 text-[13px] tracking-[2px] text-text-secondary">
          {{ sortLabel }}
        </view>

        <view
            v-for="item in sortOptions"
            :key="item.value"
            class="cursor-pointer border px-3 py-2 text-[13px] transition-colors duration-200"
            :class="item.value === sortKey
            ? 'border-[#b89c6b] bg-[rgba(184,156,107,0.08)] text-[#7b6241]'
            : 'border-divider bg-background text-text-secondary'"
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
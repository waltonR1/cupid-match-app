<template>
  <view class="profile-result-toolbar">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <view class="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-[#7b7265]">
        <view>
          {{ resultPrefix }}
          <text class="px-1 font-medium text-[#16263a]">{{ total }}</text>
          {{ resultSuffix }}
        </view>

        <view v-if="total > 0">
          {{ pageText }}
          <text class="px-1 font-medium text-[#16263a]">{{ start }} - {{ end }}</text>
        </view>
      </view>

      <view class="flex flex-wrap items-center gap-2">
        <view class="mr-1 text-[13px] tracking-[2px] text-[#7f7466]">
          {{ sortLabel }}
        </view>

        <view
            v-for="item in sortOptions"
            :key="item.value"
            class="result-sort-chip interactive-view"
            :class="item.value === sortKey ? 'result-sort-chip-active' : 'result-sort-chip-default'"
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

<style scoped>
.profile-result-toolbar {
  margin-top: 20px;
  border: 1px solid #ddd6c8;
  background: #faf7f1;
  padding: 16px 18px;
}

.result-sort-chip {
  border: 1px solid #ddd6c8;
  padding: 9px 14px;
  font-size: 13px;
  transition: all 0.22s ease;
}

.result-sort-chip-default {
  background: #fffdf9;
  color: #506071;
}

.result-sort-chip-default:hover {
  transform: translateY(-1px);
  border-color: #cbb48a;
  background: #f8f3ea;
  color: #16263a;
}

.result-sort-chip-active {
  border-color: rgba(184, 156, 107, 0.62);
  background: rgba(184, 156, 107, 0.1);
  color: #7b6241;
}

.result-sort-chip-active:hover {
  transform: translateY(-1px);
  border-color: rgba(184, 156, 107, 0.78);
  background: rgba(184, 156, 107, 0.14);
}
</style>
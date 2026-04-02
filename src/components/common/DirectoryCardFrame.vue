<template>
  <view
    class="flex h-full min-h-[460px] flex-col border border-border-base bg-surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,24,18,0.08)]"
    :class="rootClassName"
    @click="handleSelect"
  >
    <view class="flex items-start justify-between gap-4">
      <view class="flex min-w-0 items-center gap-4">
        <view class="flex h-14 w-14 items-center justify-center rounded-full border border-border-muted bg-surface-panel text-[20px] font-semibold text-surface-inverse-strong">
          {{ data.avatar }}
        </view>

        <view class="min-w-0">
          <view class="truncate text-[22px] font-semibold text-text-heading">
            {{ data.name }}
          </view>
          <view class="mt-1 text-[14px] text-text-body-soft">
            {{ data.meta }}
          </view>
        </view>
      </view>

      <view class="rounded-full bg-surface-panel px-3 py-1 text-[12px] text-brand-brown">
        {{ data.badge }}
      </view>
    </view>

    <view class="mt-6 text-[15px] leading-7 text-text-body" :class="summaryClass">
      {{ data.summary }}
    </view>

    <view class="mt-6 grid gap-3">
      <view
        v-for="fact in data.facts"
        :key="fact.label"
        class="flex items-start justify-between gap-4 border-b border-border-light pb-3 text-[14px]"
      >
        <text class="text-text-muted">{{ fact.label }}</text>
        <text class="text-right text-text-heading">{{ fact.value }}</text>
      </view>
    </view>

    <view class="mt-6 flex flex-wrap gap-2">
      <view
        v-for="tag in data.tags"
        :key="tag"
        class="rounded-full border border-border-base bg-surface-base px-3 py-1 text-[12px] text-text-body-soft"
      >
        {{ tag }}
      </view>
    </view>

    <view class="mt-auto pt-8 text-[13px] italic tracking-[2px] text-brand-rose-deep">
      {{ data.footer }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DirectoryCardViewModel } from './directory-card.types'

const props = withDefaults(defineProps<{
  data: DirectoryCardViewModel
  clickable?: boolean
  summaryClass?: string
}>(), {
  clickable: false,
  summaryClass: '',
})

const emit = defineEmits<{
  (e: 'select'): void
}>()

const rootClassName = computed(() => {
  return props.clickable ? 'cursor-pointer hover:border-border-highlight/50' : ''
})

function handleSelect() {
  if (!props.clickable) return
  emit('select')
}
</script>

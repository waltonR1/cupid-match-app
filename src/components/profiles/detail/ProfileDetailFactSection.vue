<template>
  <view class="px-6 py-7 shadow-panel" :class="surfaceClass">
    <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-eyebrow">
      {{ title }}
    </view>

    <slot />

    <view class="mt-6 grid gap-4">
      <view
        v-for="item in visibleItems"
        :key="item.label"
        class="border-b border-semantic-border-divider pb-3 last:border-b-0 last:pb-0"
      >
        <view class="text-[12px] tracking-[1px] text-semantic-text-muted">
          {{ item.label }}
        </view>
        <view class="mt-2 text-[16px] leading-7 text-semantic-text-secondary">
          {{ displayValue(item) }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProfileDetailFactItem } from '@/types/profile-detail'

const props = withDefaults(defineProps<{
  title: string
  items: ProfileDetailFactItem[]
  surface?: 'card' | 'soft'
}>(), {
  surface: 'card',
})

defineSlots<{
  default?(): unknown
}>()

const surfaceClass = computed(() => {
  if (props.surface === 'soft') {
    return 'border border-semantic-border-default bg-semantic-surface-soft'
  }

  return 'border border-semantic-border-default bg-semantic-surface-card'
})

const visibleItems = computed(() => props.items.filter(item => item.access !== 'hidden'))

function displayValue(item: ProfileDetailFactItem) {
  if (item.access === 'masked') {
    return item.maskText || '••••'
  }

  return item.value
}
</script>

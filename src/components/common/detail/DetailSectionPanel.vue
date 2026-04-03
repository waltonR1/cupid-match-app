<template>
  <view
    class="border border-border-base px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)]"
    :class="surfaceClassName"
  >
    <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
      {{ title }}
    </view>

    <view :class="contentClassName">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  surface?: 'base' | 'soft'
  spacing?: 'default' | 'compact'
}>(), {
  surface: 'base',
  spacing: 'default',
})

const surfaceClassName = computed(() => {
  return props.surface === 'soft' ? 'bg-surface-card-soft' : 'bg-surface-card'
})

const contentClassName = computed(() => {
  return props.spacing === 'compact' ? 'mt-4' : 'mt-6'
})
</script>

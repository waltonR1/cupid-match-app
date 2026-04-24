<template>
  <view :class="rootClassName">
    <image
      v-if="imageSrc"
      class="h-full w-full"
      :src="imageSrc"
      mode="aspectFill"
    />
    <text v-else :class="textClassName">
      {{ fallbackText }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value?: string
  fallback?: string
  size?: 'sm' | 'lg'
  tone?: 'default' | 'accent'
}>(), {
  value: '',
  fallback: '',
  size: 'sm',
  tone: 'default',
})

const imageSrc = computed(() => {
  const value = props.value.trim()
  if (!value) return ''

  return /^(https?:)?\/\//.test(value) || value.startsWith('/')
    ? value
    : ''
})

const fallbackText = computed(() => {
  const fallback = props.fallback.trim()
  return fallback || '?'
})

const textClassName = computed(() => {
  const fallbackLength = fallbackText.value.length

  if (fallbackLength >= 5) {
    return props.size === 'lg'
      ? 'text-[18px] tracking-[1px]'
      : 'text-[12px] tracking-[0.5px]'
  }

  if (fallbackLength >= 3) {
    return props.size === 'lg'
      ? 'text-[22px] tracking-[0.5px]'
      : 'text-[15px] tracking-[0.5px]'
  }

  return ''
})

const rootClassName = computed(() => {
  const sizeClassName = props.size === 'lg'
    ? 'h-[82px] w-[82px] text-[28px]'
    : 'h-14 w-14 text-[20px]'
  const toneClassName = props.tone === 'accent'
    ? 'border-semantic-accent-secondary'
    : 'border-semantic-border-soft'

  return `flex shrink-0 items-center justify-center overflow-hidden rounded-full border ${sizeClassName} ${toneClassName} bg-semantic-surface-panel font-semibold text-semantic-accent-primary`
})
</script>

<template>
  <view :class="rootClassName">
    <image
      v-if="imageSrc"
      class="h-full w-full"
      :src="imageSrc"
      mode="aspectFill"
    />
    <text v-else>
      {{ fallbackText }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value?: string
  label?: string
  size?: 'sm' | 'lg'
  tone?: 'default' | 'accent'
}>(), {
  value: '',
  label: '',
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
  const value = props.value.trim()
  if (value && !imageSrc.value) return value

  const label = props.label.trim()
  if (!label) return '?'

  const parts = label.split(/\s+/).filter(Boolean)
  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase()
  }

  return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase() || '?'
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

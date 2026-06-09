<template>
  <view
    v-if="visible"
    class="fixed left-1/2 top-24 z-50 -translate-x-1/2 transition-opacity duration-200"
    :class="visible ? 'opacity-100' : 'opacity-0'"
  >
    <view
      class="flex items-center gap-3 border px-6 py-4 shadow-panel"
      :class="typeClass"
    >
      <text v-if="type === 'success'" class="text-[18px]">&#10003;</text>
      <text v-if="type === 'error'" class="text-[18px]">&#10007;</text>
      <text v-if="type === 'info'" class="text-[18px]">&#9432;</text>
      <text class="text-[15px] leading-6">{{ message }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed, watch} from 'vue'

const props = defineProps<{
  visible: boolean
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}>()

const emit = defineEmits<{ close: [] }>()

const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'border-semantic-state-complete bg-semantic-surface-card text-semantic-state-complete'
    case 'error':
      return 'border-semantic-state-danger bg-semantic-surface-card text-semantic-state-danger'
    default:
      return 'border-semantic-border-emphasis bg-semantic-surface-card text-semantic-text-primary'
  }
})

let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.visible, (val) => {
  if (timer) { clearTimeout(timer); timer = null }
  if (val) {
    const ms = props.duration ?? 2000
    timer = setTimeout(() => emit('close'), ms)
  }
})
</script>

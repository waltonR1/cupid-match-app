<template>
  <view
    class="flex cursor-pointer flex-col justify-center border border-border-base px-[22rpx] py-[18rpx] transition-all duration-200"
    :class="[variantClassName, spanClass]"
  >
    <view class="text-[12px] tracking-[1.8px] text-text-muted">
      {{ label }}
    </view>

    <picker
      mode="selector"
      :range="options"
      range-key="label"
      :value="selectedIndex"
      @change="handleChange"
    >
      <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
        {{ selectedLabel }}
      </view>
    </picker>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DirectoryOption {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  label: string
  options: DirectoryOption[]
  value: string
  variant?: 'primary' | 'secondary'
  spanClass?: string
}>(), {
  variant: 'primary',
  spanClass: '',
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const selectedIndex = computed(() => {
  const index = props.options.findIndex(item => item.value === props.value)
  return index >= 0 ? index : 0
})

const selectedLabel = computed(() => {
  return props.options[selectedIndex.value]?.label || props.options[0]?.label || ''
})

const variantClassName = computed(() => {
  if (props.variant === 'secondary') {
    return 'min-h-[78rpx] bg-surface-base hover:border-border-highlight/70 hover:bg-surface-card-soft'
  }

  return 'min-h-[82rpx] bg-surface-card-soft hover:-translate-y-[1px] hover:border-border-highlight/70 hover:bg-surface-base hover:shadow-[0_10px_18px_rgba(24,38,58,0.03)]'
})

function handleChange(event: any) {
  const index = Number(event?.detail?.value ?? 0)
  emit('change', props.options[index]?.value ?? '')
}
</script>

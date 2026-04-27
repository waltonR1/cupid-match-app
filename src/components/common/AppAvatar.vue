<template>
  <view :class="rootClassName">
    <!-- 图片头像 -->
    <image
        v-if="imageSrc"
        class="h-full w-full"
        :src="imageSrc"
        mode="aspectFill"
    />

    <!-- 文本头像 -->
    <text v-else :class="textClassName">
      {{ fallbackText }}
    </text>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'

/** 组件属性 */
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

/** 解析图片地址 */
const imageSrc = computed(() => {
  const value = props.value.trim()

  if (!value) return ''

  return /^(https?:)?\/\//.test(value) || value.startsWith('/')
      ? value
      : ''
})

/** 占位文本 */
const fallbackText = computed(() => {
  return props.fallback.trim() || '?'
})

/** 根据文本长度调整字号 */
const textClassName = computed(() => {
  const length = fallbackText.value.length

  if (length >= 5) {
    return props.size === 'lg'
        ? 'text-[18px] tracking-[1px]'
        : 'text-[12px] tracking-[0.5px]'
  }

  if (length >= 3) {
    return props.size === 'lg'
        ? 'text-[22px] tracking-[0.5px]'
        : 'text-[15px] tracking-[0.5px]'
  }

  return ''
})

/** 根节点样式 */
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
<template>
  <view v-if="gender" :class="rootClassName">
    <!-- 女性图标 -->
    <svg
        v-if="gender === 'female'"
        :class="iconClassName"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="3.75" r="2.75" stroke="currentColor" :stroke-width="strokeWidth"/>
      <path d="M6 6.75V11" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round"/>
      <path d="M4.25 9.25H7.75" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round"/>
    </svg>

    <!-- 男性图标 -->
    <svg
        v-else
        :class="iconClassName"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4.5" cy="7.5" r="2.75" stroke="currentColor" :stroke-width="strokeWidth"/>
      <path d="M6.75 5.25L11 1" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round"/>
      <path d="M8.25 1H11V3.75" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'

type Gender = 'male' | 'female'

/** 性别徽标配置 */
const props = withDefaults(defineProps<{
  gender?: Gender
  size?: 'sm' | 'md'
}>(), {
  gender: undefined,
  size: 'sm',
})

/** 外层容器样式 */
const rootClassName = computed(() => {
  const sizeClassName = props.size === 'md' ? 'h-6 w-6' : 'h-5 w-5'

  return `inline-flex ${sizeClassName} shrink-0 items-center justify-center rounded-full border border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-muted`
})

/** 图标尺寸 */
const iconClassName = computed(() => props.size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3')

/** 图标线宽 */
const strokeWidth = computed(() => props.size === 'md' ? 1.2 : 1.25)
</script>
<template>
  <view
      class="border border-semantic-border-default bg-semantic-surface-card text-center"
      :class="variantClassName"
  >
    <!-- 状态码 -->
    <view v-if="code" class="text-[64px] leading-none text-component-empty-state-code lg:text-[72px]">
      {{ code }}
    </view>

    <!-- 标题 -->
    <view
        class="font-semibold text-semantic-text-primary"
        :class="variant === 'compact' ? 'mt-0 text-[24px]' : 'mt-6 text-[34px]'"
    >
      {{ title }}
    </view>

    <!-- 副标题说明 -->
    <view
        v-if="subtitle"
        class="mx-auto text-semantic-text-muted"
        :class="variant === 'compact' ? 'mt-3 max-w-[520px] text-[15px] leading-7' : 'mt-5 max-w-[560px] text-[17px] leading-8'"
    >
      {{ subtitle }}
    </view>

    <!-- 操作按钮区 -->
    <view
        v-if="primaryText || secondaryText"
        class="mt-8 flex flex-wrap justify-center gap-4"
    >
      <view
          v-if="primaryText"
          class="inline-flex min-h-[48px] cursor-pointer items-center justify-center px-6 py-3 text-[15px] transition-all duration-200"
          :class="primaryButtonClassName"
          @click="$emit('primary')"
      >
        {{ primaryText }}
      </view>

      <view
          v-if="secondaryText"
          class="inline-flex min-h-[48px] cursor-pointer items-center justify-center px-6 py-3 text-[15px] transition-all duration-200"
          :class="secondaryButtonClassName"
          @click="$emit('secondary')"
      >
        {{ secondaryText }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'

/** 空状态组件配置 */
const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  code?: string
  primaryText?: string
  secondaryText?: string
  primaryVariant?: 'solid' | 'outline'
  secondaryVariant?: 'solid' | 'outline'
  variant?: 'default' | 'compact'
}>(), {
  subtitle: '',
  code: '',
  primaryText: '',
  secondaryText: '',
  primaryVariant: 'solid',
  secondaryVariant: 'outline',
  variant: 'default',
})

/** 空状态操作事件 */
defineEmits<{
  (e: 'primary'): void
  (e: 'secondary'): void
}>()

/** 根据展示模式控制整体间距 */
const variantClassName = computed(() => {
  if (props.variant === 'compact') {
    return 'px-6 py-12'
  }

  return 'px-10 py-14'
})

/** 主按钮样式 */
const primaryButtonClassName = computed(() => {
  if (props.primaryVariant === 'outline') {
    return 'border border-semantic-border-default bg-semantic-surface-card text-semantic-text-secondary hover:-translate-y-[1px] hover:border-semantic-border-card-hover hover:bg-semantic-surface-panel hover:text-semantic-text-primary'
  }

  return 'border border-semantic-action-primary bg-semantic-action-primary text-semantic-action-primary-contrast hover:border-semantic-action-primary-hover hover:bg-semantic-action-primary-hover'
})

/** 次按钮样式 */
const secondaryButtonClassName = computed(() => {
  if (props.secondaryVariant === 'solid') {
    return 'border border-semantic-action-primary bg-semantic-action-primary text-semantic-action-primary-contrast hover:border-semantic-action-primary-hover hover:bg-semantic-action-primary-hover'
  }

  return 'border border-semantic-border-default bg-semantic-surface-card text-semantic-text-secondary hover:-translate-y-[1px] hover:border-semantic-border-card-hover hover:bg-semantic-surface-panel hover:text-semantic-text-primary'
})
</script>
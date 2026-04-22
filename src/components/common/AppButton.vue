<template>
  <view
    v-bind="$attrs"
    class="inline-flex items-center justify-center border font-medium transition-all duration-300"
    :class="[widthClass, sizeClass, radiusClass, variantClass, motionClass, disabled ? disabledClass : 'cursor-pointer']"
    :aria-disabled="disabled ? 'true' : 'false'"
    @click="handleClick"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary'
type ButtonContext =
  | 'default'
  | 'header'
  | 'hero'
  | 'section'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
type ButtonWidth = 'auto' | 'cta' | 'full'
type ButtonRadius = 'none' | 'button' | 'xl'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  context?: ButtonContext
  size?: ButtonSize
  width?: ButtonWidth
  rounded?: ButtonRadius
  disabled?: boolean
}>(), {
  variant: 'primary',
  context: 'default',
  size: 'md',
  width: 'auto',
  rounded: 'button',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: unknown): void
}>()

const widthClass = computed(() => {
  switch (props.width) {
    case 'cta':
      return 'min-w-btn-cta'
    case 'full':
      return 'w-full'
    default:
      return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-5 py-2 text-[14px] tracking-[0.3px]'
    case 'lg':
      return 'px-btn-cta-x py-btn-cta-y text-[16px]'
    case 'icon':
      return 'h-[34px] w-[34px] text-[14px]'
    default:
      return 'px-4 py-3 text-[15px]'
  }
})

const radiusClass = computed(() => {
  switch (props.rounded) {
    case 'xl':
      return 'rounded-xl'
    case 'none':
      return ''
    default:
      return 'rounded-button'
  }
})

const motionClass = computed(() => {
  if (props.disabled) {
    return ''
  }

  if (props.variant === 'primary') {
    return 'hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-emphasis'
  }

  return 'hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-panel'
})

const disabledClass = 'cursor-not-allowed'

const variantClass = computed(() => {
  if (props.disabled) {
    return 'border-semantic-action-disabled-border bg-semantic-action-disabled text-semantic-action-disabled-contrast'
  }

  if (props.variant === 'primary') {
    return 'border-semantic-action-primary bg-semantic-action-primary text-semantic-action-primary-contrast hover:border-semantic-action-primary-hover hover:bg-semantic-action-primary-hover'
  }

  if (props.context === 'header') {
    return 'border-component-header-ghost-border bg-component-header-ghost text-component-header-ghost-label hover:border-component-header-ghost-border-hover hover:bg-component-header-ghost-hover hover:text-component-header-ghost-label-hover'
  }

  if (props.context === 'hero') {
    return 'border-component-hero-secondary-action-border bg-component-hero-secondary-action-background text-semantic-text-secondary hover:border-component-hero-secondary-action-emphasis hover:bg-component-hero-secondary-action-background-hover hover:text-component-hero-secondary-action-emphasis hover:shadow-panel'
  }

  if (props.context === 'section') {
    return 'border-semantic-border-default bg-semantic-surface-soft text-component-section-action-emphasis hover:border-component-section-action-emphasis hover:bg-semantic-page-subtle hover:text-semantic-text-primary hover:shadow-panel'
  }

  return 'border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary hover:border-semantic-border-soft hover:bg-semantic-surface-panel hover:text-semantic-text-primary'
})

function handleClick(event: unknown) {
  if (props.disabled) {
    return
  }

  emit('click', event)
}
</script>

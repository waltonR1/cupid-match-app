<template>
  <view
    v-bind="$attrs"
    class="inline-flex cursor-pointer items-center justify-center border font-medium transition-all duration-300"
    :class="[widthClass, sizeClass, radiusClass, variantClass, motionClass, disabled ? disabledClass : '']"
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
  | 'home-hero'
  | 'section'
  | 'membership-silver'
  | 'membership-gold'
  | 'membership-diamond'
  | 'membership-free'
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
    return 'hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-next-shadow-emphasis'
  }

  return 'hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-next-shadow-panel'
})

const disabledClass = 'pointer-events-none opacity-60'

const variantClass = computed(() => {
  if (props.variant === 'primary') {
    return 'border-next-semantic-action-primary bg-next-semantic-action-primary text-next-semantic-action-primary-contrast hover:border-next-semantic-action-primary-hover hover:bg-next-semantic-action-primary-hover'
  }

  if (props.context === 'header') {
    return 'border-next-component-header-ghost-border bg-next-component-header-ghost text-next-semantic-accent-secondary hover:border-next-component-header-ghost-border-hover hover:bg-next-component-header-ghost-hover hover:text-next-semantic-accent-primary'
  }

  if (props.context === 'home-hero') {
    return 'border-next-component-home-hero-secondary-action-border bg-next-component-home-hero-secondary-action-background text-next-semantic-text-secondary hover:border-next-semantic-accent-secondary hover:bg-next-component-home-hero-secondary-action-background-hover hover:text-next-semantic-accent-secondary hover:shadow-next-shadow-panel'
  }

  if (props.context === 'section') {
    return 'border-next-semantic-border-default bg-next-semantic-surface-soft text-next-semantic-accent-secondary hover:border-next-semantic-accent-secondary hover:bg-next-semantic-page-subtle hover:text-next-semantic-text-primary hover:shadow-next-shadow-panel'
  }

  if (props.context === 'membership-silver') {
    return 'border-next-component-home-membership-silver-button-border bg-transparent text-next-semantic-text-primary hover:border-next-component-home-membership-silver-button-border hover:bg-next-component-home-membership-silver-button-hover hover:text-next-semantic-text-primary'
  }

  if (props.context === 'membership-gold') {
    return 'border-next-component-home-membership-gold-button-border bg-next-component-home-membership-gold-button-background text-next-semantic-action-primary-contrast hover:border-next-component-home-membership-gold-button-border-hover hover:bg-next-component-home-membership-gold-button-background-hover hover:text-next-semantic-action-primary-contrast hover:shadow-next-shadow-emphasis'
  }

  if (props.context === 'membership-diamond') {
    return 'border-next-component-home-membership-diamond-button-border bg-next-component-home-membership-diamond-button-background text-next-semantic-action-primary-contrast hover:border-next-component-home-membership-diamond-button-border-hover hover:bg-next-component-home-membership-diamond-button-background-hover hover:text-next-semantic-action-primary-contrast hover:shadow-next-shadow-emphasis'
  }

  if (props.context === 'membership-free') {
    return 'border-next-component-home-membership-free-button-border bg-transparent text-next-semantic-text-primary hover:border-next-component-home-membership-free-button-border hover:bg-next-component-home-membership-free-button-hover hover:text-next-semantic-text-primary'
  }

  return 'border-next-semantic-border-default bg-next-semantic-surface-soft text-next-semantic-text-secondary hover:border-next-semantic-border-soft hover:bg-next-semantic-surface-panel hover:text-next-semantic-text-primary'
})

function handleClick(event: unknown) {
  if (props.disabled) {
    return
  }

  emit('click', event)
}
</script>

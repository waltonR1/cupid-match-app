<template>
  <view
      v-bind="$attrs"
      class="inline-flex w-full items-center justify-center border px-5 py-2 text-[14px] font-medium tracking-[0.3px] transition-all duration-300"
      :class="[tierClass, disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-[2px] hover:scale-[1.02]']"
      :aria-disabled="disabled ? 'true' : 'false'"
      @click="handleClick"
  >
    <slot/>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'

type MembershipPlanTier = 'free' | 'silver' | 'gold' | 'diamond'

/** 会员按钮配置 */
const props = defineProps<{
  tier: MembershipPlanTier
  disabled?: boolean
}>()

/** 点击事件 */
const emit = defineEmits<{
  (e: 'click', event: unknown): void
}>()

/** 会员等级样式 */
const tierClass = computed(() => {
  if (props.disabled) {
    return 'border-semantic-action-disabled-border bg-semantic-action-disabled text-semantic-action-disabled-contrast'
  }

  if (props.tier === 'silver') {
    return 'border-component-membership-tier-silver-button-border bg-component-membership-tier-silver-button-fill text-semantic-text-primary hover:border-component-membership-tier-silver-button-border hover:bg-component-membership-tier-silver-button-fill-hover hover:text-semantic-text-primary hover:shadow-panel'
  }

  if (props.tier === 'gold') {
    return 'border-component-membership-tier-gold-border bg-component-membership-tier-gold-fill text-semantic-action-primary-contrast hover:border-component-membership-tier-gold-border-hover hover:bg-component-membership-tier-gold-fill-hover hover:text-semantic-action-primary-contrast hover:shadow-emphasis'
  }

  if (props.tier === 'diamond') {
    return 'border-component-membership-tier-diamond-button-border bg-component-membership-tier-diamond-button-fill text-semantic-action-primary-contrast hover:border-component-membership-tier-diamond-button-border-hover hover:bg-component-membership-tier-diamond-button-fill-hover hover:text-semantic-action-primary-contrast hover:shadow-emphasis'
  }

  return 'border-component-membership-tier-free-button-border bg-transparent text-semantic-text-primary hover:border-component-membership-tier-free-button-border hover:bg-component-membership-tier-free-button-fill-hover hover:text-semantic-text-primary hover:shadow-panel'
})

/** 禁用时拦截点击 */
function handleClick(event: unknown) {
  if (props.disabled) return

  emit('click', event)
}
</script>
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
        :class="size === 'compact' ? 'mt-0 text-[24px]' : 'mt-6 text-[34px]'"
    >
      {{ title }}
    </view>

    <!-- 副标题说明 -->
    <view
        v-if="subtitle"
        class="mx-auto text-semantic-text-muted"
        :class="size === 'compact' ? 'mt-3 max-w-[520px] text-[15px] leading-7' : 'mt-5 max-w-[560px] text-[17px] leading-8'"
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
          class="inline-flex"
      >
        <AppButton
            :variant="primaryButtonVariant"
            context="section"
            size="md"
            rounded="none"
            @click="$emit('primary')"
        >
          {{ primaryText }}
        </AppButton>
      </view>

      <view
          v-if="secondaryText"
          class="inline-flex"
      >
        <AppButton
            variant="secondary"
            context="section"
            size="md"
            rounded="none"
            @click="$emit('secondary')"
        >
          {{ secondaryText }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import AppButton from '@/components/common/AppButton.vue'

/** 空状态组件配置 */
const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  code?: string
  primaryText?: string
  secondaryText?: string
  size?: 'page' | 'compact'
}>(), {
  subtitle: '',
  code: '',
  primaryText: '',
  secondaryText: '',
  size: 'compact',
})

/** 空状态操作事件 */
defineEmits<{
  (e: 'primary'): void
  (e: 'secondary'): void
}>()

/** 根据展示模式控制整体间距 */
const variantClassName = computed(() => {
  if (props.size === 'compact') {
    return 'px-6 py-12'
  }

  return 'px-10 py-14'
})

/** 主按钮由组件根据使用场景决定视觉层级 */
const primaryButtonVariant = computed(() => {
  return props.size === 'compact' ? 'secondary' : 'primary'
})
</script>

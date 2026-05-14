<template>
  <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
    <view class="flex flex-wrap items-start justify-between gap-4">
      <view>
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
          {{ eyebrow }}
        </view>
        <view class="mt-2 text-[28px] font-semibold leading-tight text-semantic-text-primary">
          {{ title }}
        </view>
        <view class="mt-3 max-w-[780px] text-[15px] leading-7 text-semantic-text-muted">
          {{ description }}
        </view>
      </view>

      <AppButton variant="secondary" size="sm" @click="openDebugIndex">
        返回调试中心
      </AppButton>
    </view>

    <view v-if="$slots.default" class="mt-6">
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import AppButton from '@/components/common/AppButton.vue'
import {openPage} from '@/utils/navigation'

withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description: string
}>(), {
  eyebrow: 'Debug Tool',
})

function openDebugIndex() {
  openPage('/pages/debug/index')
}
</script>

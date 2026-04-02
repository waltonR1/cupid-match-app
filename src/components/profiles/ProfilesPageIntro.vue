<template>
  <view class="mb-6 border border-border-base bg-surface-card px-5 py-5 shadow-[0_16px_40px_rgba(30,24,18,0.04)] lg:mb-7 lg:px-7 lg:py-6">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <view class="max-w-[760px]">
        <view
          v-if="eyebrow"
          class="mb-3 inline-flex items-center border border-brand-highlight/40 bg-brand-highlight/10 px-3 py-1 text-[12px] tracking-[2px] text-brand-brown"
        >
          {{ eyebrow }}
        </view>

        <view class="text-[28px] font-semibold leading-[1.2] text-text-heading lg:text-[34px]">
          {{ title }}
        </view>

        <view class="mt-3 max-w-[720px] text-[14px] leading-7 text-text-body-soft lg:text-[15px]">
          {{ subtitle }}
        </view>
      </view>

      <view class="flex flex-wrap gap-2 lg:max-w-[360px] lg:justify-end">
        <view
          v-for="item in tags"
          :key="item"
          class="border border-border-base bg-surface-base px-3 py-2 text-[12px] tracking-[1px] text-text-body-soft"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle: string
  tags: string[]
}>()
</script>

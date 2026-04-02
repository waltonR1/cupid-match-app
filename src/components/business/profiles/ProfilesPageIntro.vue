<template>
  <view class="mb-6 border border-divider bg-card px-5 py-5 lg:mb-7 lg:px-7 lg:py-6">
    <view class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <view class="max-w-[760px]">
        <view
            v-if="eyebrow"
            class="mb-3 inline-flex items-center border border-[rgba(184,156,107,0.34)] bg-[rgba(184,156,107,0.08)] px-3 py-1 text-[12px] tracking-[2px] text-[#8d7550]"
        >
          {{ eyebrow }}
        </view>

        <view class="text-[28px] font-semibold leading-[1.2] text-text-main lg:text-[34px]">
          {{ title }}
        </view>

        <view class="mt-3 max-w-[720px] text-[14px] leading-7 text-text-secondary lg:text-[15px]">
          {{ subtitle }}
        </view>
      </view>

      <view class="flex flex-wrap gap-2 lg:max-w-[360px] lg:justify-end">
        <view
            v-for="item in tags"
            :key="item"
            class="border border-divider bg-background px-3 py-2 text-[12px] tracking-[1px] text-text-secondary"
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
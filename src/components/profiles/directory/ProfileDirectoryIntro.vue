<template>
  <view
      class="mb-6 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel lg:mb-7 lg:px-7 lg:py-6"
  >
    <!-- 目录介绍内容区 -->
    <view class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <!-- 左侧标题 -->
      <view class="max-w-[760px]">
        <view
            v-if="eyebrow"
            class="mb-3 inline-flex items-center border border-semantic-border-eyebrow bg-semantic-surface-soft px-3 py-1 text-[12px] tracking-[2px] text-semantic-text-eyebrow"
        >
          {{ eyebrow }}
        </view>

        <view class="text-[28px] font-semibold leading-[1.2] text-semantic-text-primary lg:text-[34px]">
          {{ title }}
        </view>

        <view class="mt-3 max-w-[720px] text-[14px] leading-7 text-semantic-text-muted lg:text-[15px]">
          {{ subtitle }}
        </view>
      </view>

      <!-- 右侧的标签 -->
      <view
          v-if="tags.length"
          class="flex flex-wrap gap-2 lg:max-w-[360px] lg:justify-end"
      >
        <view
            v-for="item in tags"
            :key="item"
            class="border border-semantic-border-default bg-semantic-surface-panel px-3 py-2 text-[12px] tracking-[1px] text-semantic-text-muted"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/** 目录介绍组件参数 */
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  subtitle: string
  tags?: string[]
}>(), {
  tags: () => [],
})
</script>
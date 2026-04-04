<template>
  <view class="mb-6 border border-border-base bg-surface-card px-5 py-5 shadow-panel lg:mb-7 lg:px-7 lg:py-6">
    <view
      class="flex flex-col gap-8 lg:flex-row lg:justify-between"
      :class="hasStats ? 'lg:items-start' : 'lg:items-end'"
    >
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

        <view
          v-if="hasStats && tags.length"
          class="mt-5 flex flex-wrap gap-2"
        >
          <view
            v-for="item in tags"
            :key="item"
            class="border border-border-base bg-surface-base px-3 py-2 text-[12px] tracking-[1px] text-text-body-soft"
          >
            {{ item }}
          </view>
        </view>
      </view>

      <view
        v-if="hasStats"
        class="grid gap-3 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1 xl:w-[500px] xl:grid-cols-3"
      >
        <view
          v-for="item in stats"
          :key="item.label"
          class="border border-border-base bg-surface-base px-4 py-4"
        >
          <view class="text-[12px] tracking-[2px] text-text-muted">
            {{ item.label }}
          </view>
          <view class="mt-3 text-[28px] font-semibold text-text-heading">
            {{ item.value }}
          </view>
        </view>
      </view>

      <view
        v-else
        class="flex flex-wrap gap-2 lg:max-w-[360px] lg:justify-end"
      >
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
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  eyebrow?: string
  title: string
  subtitle: string
  tags?: string[]
  stats?: Array<{
    label: string
    value: string
  }>
}>(), {
  tags: () => [],
  stats: () => [],
})

const hasStats = computed(() => props.stats.length > 0)
</script>

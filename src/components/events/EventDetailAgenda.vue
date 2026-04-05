<template>
  <view class="border border-border-base bg-surface-base px-8 py-10 shadow-panel">
    <view class="text-[12px] uppercase tracking-[4px] text-brand-support">{{ eyebrow }}</view>
    <view class="mt-4 text-[34px] font-semibold text-text-heading">{{ title }}</view>

    <view class="mt-8 grid gap-5">
      <view
        v-for="item in items"
        :key="item.time"
        class="grid gap-3 border border-border-light bg-surface-card px-5 py-5 transition-all duration-200 hover:border-border-accent/30 hover:bg-surface-base hover:shadow-panel md:grid-cols-[100px_1fr]"
      >
        <view class="text-[13px] uppercase tracking-[4px] text-brand-support">{{ item.time }}</view>
        <view>
          <view class="text-[22px] font-medium text-text-heading">{{ item.title }}</view>
          <view class="mt-2 text-[15px] leading-7 text-text-body-soft">{{ item.desc }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EventAgendaItem } from './events.types'

defineProps<{
  eyebrow: string
  title: string
  items: EventAgendaItem[]
}>()
</script>

<template>
  <view class="border border-semantic-border-default bg-semantic-surface-panel px-8 py-10 shadow-panel">
    <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-eyebrow">{{ eyebrow }}</view>
    <view class="mt-4 text-[34px] font-semibold text-semantic-text-primary">{{ title }}</view>

    <view class="mt-8 grid gap-5">
      <view
        v-for="item in items"
        :key="item.time"
        class="grid gap-3 border border-semantic-border-soft bg-semantic-surface-card px-5 py-5 transition-all duration-200 hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft hover:shadow-panel md:grid-cols-[100px_1fr]"
      >
        <view class="text-[13px] uppercase tracking-[4px] text-semantic-text-card-label">{{ item.time }}</view>
        <view>
          <view class="text-[22px] font-medium text-semantic-text-primary">{{ item.title }}</view>
          <view class="mt-2 text-[15px] leading-7 text-semantic-text-muted">{{ item.desc }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EventAgendaItem } from '@/types/events'

defineProps<{
  eyebrow: string
  title: string
  items: EventAgendaItem[]
}>()
</script>


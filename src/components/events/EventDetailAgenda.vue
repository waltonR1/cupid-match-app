<template>
  <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-8 py-10 shadow-next-panel">
    <view class="text-[12px] uppercase tracking-[4px] text-next-semantic-text-eyebrow">{{ eyebrow }}</view>
    <view class="mt-4 text-[34px] font-semibold text-next-semantic-text-primary">{{ title }}</view>

    <view class="mt-8 grid gap-5">
      <view
        v-for="item in items"
        :key="item.time"
        class="grid gap-3 border border-next-semantic-border-soft bg-next-semantic-surface-card px-5 py-5 transition-all duration-200 hover:border-next-semantic-border-card-hover hover:bg-next-semantic-surface-soft hover:shadow-next-panel md:grid-cols-[100px_1fr]"
      >
        <view class="text-[13px] uppercase tracking-[4px] text-next-semantic-text-card-label">{{ item.time }}</view>
        <view>
          <view class="text-[22px] font-medium text-next-semantic-text-primary">{{ item.title }}</view>
          <view class="mt-2 text-[15px] leading-7 text-next-semantic-text-muted">{{ item.desc }}</view>
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


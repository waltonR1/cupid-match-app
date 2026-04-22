<template>
  <view class="grid gap-6">
    <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-eyebrow">{{ eyebrow }}</view>
    <view class="text-[34px] font-semibold text-semantic-text-primary">{{ title }}</view>

    <view v-if="profiles.length" class="grid gap-6 md:grid-cols-2">
      <view
        v-for="profile in profiles"
        :key="profile.id"
        class="group cursor-pointer border border-semantic-border-default bg-component-event-card-background px-8 py-8 shadow-panel transition-all duration-200 hover:-translate-y-[1px] hover:border-component-event-card-border-hover hover:bg-component-event-card-background-hover hover:shadow-panel"
        @click="$emit('open', profile.id)"
      >
        <view class="inline-flex items-center rounded-full bg-semantic-surface-panel px-3 py-1 text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
          {{ profile.reason }}
        </view>
        <view class="mt-4 text-[28px] font-semibold text-semantic-text-primary transition-colors duration-200 group-hover:text-component-event-card-title-hover">
          {{ profile.name }}
        </view>
        <view class="mt-3 text-[13px] uppercase tracking-[3px] text-semantic-text-subtle">
          {{ profile.meta }}
        </view>
        <view class="mt-3 text-[15px] leading-7 text-semantic-text-muted">
          {{ profile.summary }}
        </view>
      </view>
    </view>

    <view v-else class="border border-semantic-border-default bg-semantic-surface-card px-8 py-8 text-[16px] leading-8 text-semantic-text-muted shadow-panel">
      {{ emptyText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EventRelatedProfileItem } from '@/types/view-models/events'

defineProps<{
  eyebrow: string
  title: string
  emptyText: string
  profiles: EventRelatedProfileItem[]
}>()

defineEmits<{
  (e: 'open', id: string): void
}>()
</script>


<template>
  <view class="grid gap-6">
    <view class="text-[12px] uppercase tracking-[4px] text-next-semantic-text-eyebrow">{{ eyebrow }}</view>
    <view class="text-[34px] font-semibold text-next-semantic-text-primary">{{ title }}</view>

    <view v-if="profiles.length" class="grid gap-6 md:grid-cols-2">
      <view
        v-for="profile in profiles"
        :key="profile.id"
        class="group cursor-pointer border border-next-semantic-border-default bg-next-component-event-card-background px-8 py-8 shadow-next-shadow-panel transition-all duration-200 hover:-translate-y-[1px] hover:border-next-component-event-card-border-hover hover:bg-next-component-event-card-background-hover hover:shadow-next-shadow-panel"
        @click="$emit('open', profile.id)"
      >
        <view class="inline-flex items-center rounded-full bg-next-semantic-surface-panel px-3 py-1 text-[11px] uppercase tracking-[3px] text-next-semantic-text-card-label">
          {{ profile.reason }}
        </view>
        <view class="mt-4 text-[28px] font-semibold text-next-semantic-text-primary transition-colors duration-200 group-hover:text-next-component-event-card-title-hover">
          {{ profile.name }}
        </view>
        <view class="mt-3 text-[13px] uppercase tracking-[3px] text-next-semantic-text-subtle">
          {{ profile.meta }}
        </view>
        <view class="mt-3 text-[15px] leading-7 text-next-semantic-text-muted">
          {{ profile.summary }}
        </view>
      </view>
    </view>

    <view v-else class="border border-next-semantic-border-default bg-next-semantic-surface-card px-8 py-8 text-[16px] leading-8 text-next-semantic-text-muted shadow-next-shadow-panel">
      {{ emptyText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EventRelatedProfileItem } from './events.types'

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

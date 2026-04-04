<template>
  <view class="grid gap-6">
    <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">{{ eyebrow }}</view>
    <view class="text-[34px] font-semibold text-text-heading">{{ title }}</view>

    <view v-if="profiles.length" class="grid gap-6 md:grid-cols-2">
      <view
        v-for="profile in profiles"
        :key="profile.id"
        class="group cursor-pointer border border-border-base bg-surface-card px-8 py-8 shadow-panel transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight/28 hover:bg-surface-base hover:shadow-card"
        @click="$emit('open', profile.id)"
      >
        <view class="inline-flex items-center rounded-full bg-surface-panel px-3 py-1 text-[11px] uppercase tracking-[3px] text-brand-brown">
          {{ profile.reason }}
        </view>
        <view class="mt-4 text-[28px] font-semibold text-text-heading transition-colors duration-200 group-hover:text-brand-brown">
          {{ profile.name }}
        </view>
        <view class="mt-3 text-[13px] uppercase tracking-[3px] text-text-muted">
          {{ profile.meta }}
        </view>
        <view class="mt-3 text-[15px] leading-7 text-text-body-soft">
          {{ profile.summary }}
        </view>
      </view>
    </view>

    <view v-else class="border border-border-base bg-surface-card px-8 py-8 text-[16px] leading-8 text-text-body-soft shadow-panel">
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

<template>
  <view class="overflow-hidden border border-next-semantic-border-default bg-next-semantic-surface-card px-8 py-10 text-next-semantic-text-primary shadow-next-panel">
    <view class="h-px w-14 bg-next-component-section-divider" />
    <view class="mt-6 text-[12px] uppercase tracking-[4px] text-next-semantic-text-eyebrow">{{ eyebrow }}</view>
    <view class="mt-4 text-[34px] font-semibold text-next-semantic-text-primary">{{ title }}</view>

    <view class="mt-8 grid gap-5">
      <view
        v-for="(item, index) in items"
        :key="item.title"
        class="border-t border-next-semantic-border-soft pt-5 first:border-t-0 first:pt-0"
      >
        <view class="flex items-start gap-4">
          <view class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-next-semantic-surface-panel text-[11px] font-medium text-next-semantic-text-card-label">
            {{ index + 1 }}
          </view>

          <view>
            <view class="text-[18px] font-medium text-next-semantic-text-primary">
              {{ item.title }}
            </view>
            <view class="mt-2 text-[15px] leading-7 text-next-semantic-text-muted">
              {{ item.desc }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EventNoteItem } from './events.types'

defineProps<{
  eyebrow: string
  title: string
  items: EventNoteItem[]
}>()
</script>


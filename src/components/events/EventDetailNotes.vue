<template>
  <view class="overflow-hidden border border-border-base bg-surface-card px-8 py-10 text-text-heading shadow-panel">
    <view class="h-px w-14 bg-brand-accent/62" />
    <view class="mt-6 text-[12px] uppercase tracking-[4px] text-brand-support">{{ eyebrow }}</view>
    <view class="mt-4 text-[34px] font-semibold text-text-heading">{{ title }}</view>

    <view class="mt-8 grid gap-5">
      <view
        v-for="(item, index) in items"
        :key="item.title"
        class="border-t border-border-light pt-5 first:border-t-0 first:pt-0"
      >
        <view class="flex items-start gap-4">
          <view class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-panel text-[11px] font-medium text-brand-support">
            {{ index + 1 }}
          </view>

          <view>
            <view class="text-[18px] font-medium text-text-heading">
              {{ item.title }}
            </view>
            <view class="mt-2 text-[15px] leading-7 text-text-body-soft">
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

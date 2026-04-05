<template>
  <view
    class="inline-flex min-h-[36px] min-w-[114px] shrink-0 items-center justify-center gap-2 border px-3.5 py-2 text-center text-[11.5px] font-medium uppercase leading-none"
    :class="badgeClassName"
  >
    <view class="shrink-0" :class="dotClassName" />
    <text>{{ label }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EventStatus } from '@/mock/events'

const props = defineProps<{
  status: EventStatus
  label: string
}>()

const badgeClassName = computed(() => {
  if (props.status === 'open') {
    return 'rounded-full border-brand-accent/72 bg-button-accent text-button-neutral-ink shadow-panel tracking-[1.5px]'
  }

  if (props.status === 'waitlist') {
    return 'rounded-full border-brand-secondary-soft/72 bg-brand-primary-soft/52 text-brand-secondary shadow-panel tracking-[1.5px]'
  }

  return 'rounded-[10px] border-dashed border-border-base/90 bg-surface-panel/88 text-text-muted tracking-[1.2px]'
})

const dotClassName = computed(() => {
  if (props.status === 'open') {
    return 'h-1.5 w-1.5 rounded-full bg-button-neutral-ink'
  }

  if (props.status === 'waitlist') {
    return 'h-1.5 w-1.5 rounded-full bg-brand-secondary'
  }

  if (props.status === 'closed') {
    return 'h-[5px] w-[5px] rounded-[1px] bg-text-muted'
  }

  return 'h-1.5 w-1.5 rounded-full bg-button-neutral-ink'
})
</script>

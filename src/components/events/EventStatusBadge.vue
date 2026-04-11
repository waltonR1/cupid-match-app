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
    return 'rounded-full border-next-semantic-state-event-open-border bg-next-semantic-state-event-open-background text-next-semantic-state-event-open-text shadow-next-panel tracking-[1.5px]'
  }

  if (props.status === 'waitlist') {
    return 'rounded-full border-next-semantic-state-event-waitlist-border bg-next-semantic-state-event-waitlist-background text-next-semantic-state-event-waitlist-text shadow-next-panel tracking-[1.5px]'
  }

  return 'rounded-[10px] border-dashed border-next-semantic-state-event-closed-border bg-next-semantic-state-event-closed-background text-next-semantic-state-event-closed-text tracking-[1.2px]'
})

const dotClassName = computed(() => {
  if (props.status === 'open') {
    return 'h-1.5 w-1.5 rounded-full bg-next-semantic-state-event-open-dot'
  }

  if (props.status === 'waitlist') {
    return 'h-1.5 w-1.5 rounded-full bg-next-semantic-state-event-waitlist-dot'
  }

  if (props.status === 'closed') {
    return 'h-[5px] w-[5px] rounded-[1px] bg-next-semantic-state-event-closed-dot'
  }

  return 'h-1.5 w-1.5 rounded-full bg-next-semantic-state-event-open-dot'
})
</script>

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
import type { EventCardStatus } from '@/types/events/card'

const props = defineProps<{
  status: EventCardStatus
  label: string
}>()

const badgeClassName = computed(() => {
  if (props.status === 'open') {
    return 'rounded-full border-semantic-state-event-open-border bg-semantic-state-event-open-background text-semantic-state-event-open-text shadow-panel tracking-[1.5px]'
  }

  if (props.status === 'waitlist' || props.status === 'member') {
    return 'rounded-full border-semantic-state-event-waitlist-border bg-semantic-state-event-waitlist-background text-semantic-state-event-waitlist-text shadow-panel tracking-[1.5px]'
  }

  return 'rounded-[10px] border-dashed border-semantic-state-event-closed-border bg-semantic-state-event-closed-background text-semantic-state-event-closed-text tracking-[1.2px]'
})

const dotClassName = computed(() => {
  if (props.status === 'open') {
    return 'h-1.5 w-1.5 rounded-full bg-semantic-state-event-open-dot'
  }

  if (props.status === 'waitlist' || props.status === 'member') {
    return 'h-1.5 w-1.5 rounded-full bg-semantic-state-event-waitlist-dot'
  }

  if (props.status === 'closed' || props.status === 'completed') {
    return 'h-[5px] w-[5px] rounded-[1px] bg-semantic-state-event-closed-dot'
  }

  return 'h-1.5 w-1.5 rounded-full bg-semantic-state-event-open-dot'
})
</script>

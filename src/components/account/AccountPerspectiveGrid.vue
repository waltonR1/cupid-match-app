<template>
  <view class="grid gap-6 lg:grid-cols-2">
    <view
      v-for="item in items"
      :key="item.title"
      class="border px-7 py-7 shadow-card"
      :class="toneClass(item.tone).card"
    >
      <view class="flex items-start justify-between gap-4">
        <view>
          <view class="inline-flex items-center gap-3">
            <view class="h-px w-8" :class="toneClass(item.tone).line" />
            <text class="text-[11px] uppercase tracking-[3px]" :class="toneClass(item.tone).eyebrow">
              {{ item.eyebrow }}
            </text>
          </view>

          <view class="mt-4 text-[24px] font-semibold" :class="toneClass(item.tone).title">
            {{ item.title }}
          </view>
        </view>

        <view
          v-if="item.badge"
          class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
          :class="toneClass(item.tone).badge"
        >
          {{ item.badge }}
        </view>
      </view>

      <view class="mt-4 text-[15px] leading-7" :class="toneClass(item.tone).description">
        {{ item.description }}
      </view>

      <view v-if="item.points.length" class="mt-6 grid gap-3">
        <view
          v-for="point in item.points"
          :key="point"
          class="flex items-start gap-3 text-[14px] leading-6"
          :class="toneClass(item.tone).point"
        >
          <view class="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" :class="toneClass(item.tone).dot" />
          <text>{{ point }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type Tone = 'base' | 'accent' | 'inverse'

interface PerspectiveItem {
  eyebrow: string
  title: string
  description: string
  points: string[]
  badge?: string
  tone?: Tone
}

defineProps<{
  items: PerspectiveItem[]
}>()

function toneClass(tone: Tone = 'base') {
  if (tone === 'accent') {
    return {
      card: 'border-border-accent/35 bg-surface-card-soft',
      line: 'bg-brand-accent',
      eyebrow: 'text-brand-support',
      title: 'text-text-heading',
      description: 'text-text-body',
      point: 'text-text-body-soft',
      dot: 'bg-brand-accent',
      badge: 'border-border-accent/50 bg-brand-accent/10 text-brand-accent-strong',
    }
  }

  if (tone === 'inverse') {
    return {
      card: 'border-border-inverse bg-surface-inverse-panel',
      line: 'bg-brand-accent',
      eyebrow: 'text-brand-accent-foreground',
      title: 'text-text-inverse',
      description: 'text-text-inverse-soft',
      point: 'text-text-inverse-muted',
      dot: 'bg-brand-accent',
      badge: 'border-border-inverse-hover bg-white/5 text-text-inverse',
    }
  }

  return {
    card: 'border-border-base bg-surface-card',
    line: 'bg-brand-accent',
    eyebrow: 'text-brand-support',
    title: 'text-text-heading',
    description: 'text-text-body',
    point: 'text-text-body-soft',
    dot: 'bg-brand-accent',
    badge: 'border-border-base bg-surface-panel text-text-body-soft',
  }
}
</script>

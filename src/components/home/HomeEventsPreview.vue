<template>
  <view class="bg-page-soft text-text-heading">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">

      <!-- 标题 -->
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-support">
              {{ t('events.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] lg:text-[56px]">
            {{ t('events.title') }}
            <text class="text-brand-accent-strong"> · {{ t('events.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[420px] text-[18px] leading-8 text-text-body-soft">
          {{ t('events.subtitle') }}
        </view>
      </view>

      <!-- 卡片 -->
      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <view
          v-for="event in events"
          :key="event.id"
          class="group cursor-pointer border border-border-base bg-surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-accent/50 hover:bg-surface-panel hover:shadow-card"
          @click="handleEventOpen(event.id)"
        >
          <!-- 标签 -->
          <view class="text-[12px] uppercase tracking-[4px] text-brand-accent">
            {{ event.tag }}
          </view>

          <!-- 标题 -->
          <view class="mt-4 text-[22px] font-semibold leading-[1.4]">
            {{ event.title }}
          </view>

          <!-- 描述 -->
          <view class="mt-3 text-[15px] leading-7 text-text-body-soft">
            {{ event.desc }}
          </view>

          <!-- meta -->
          <view class="mt-6 text-[13px] text-text-subtle">
            {{ event.meta }}
          </view>
        </view>
      </view>

      <!-- CTA -->
      <view class="mt-12 flex justify-center">
        <view
          class="inline-flex min-w-[178px] cursor-pointer items-center justify-center rounded-button border border-brand-accent/35 bg-brand-accent/8 px-8 py-3 text-[15px] tracking-[0.6px] text-brand-support transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-accent hover:bg-brand-accent/16 hover:text-text-heading hover:shadow-panel"
          @click="goEvents"
        >
          {{ t('events.cta') }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { getHomePreviewEvents, type MockEvent } from '@/mock/events'
import { pickLocalized } from '@/mock/shared'
import { openEventDetail } from '@/utils/demo-navigation'

const { t, locale } = usePageI18n('home')
const previewEvents = getHomePreviewEvents()

const events = computed(() =>
  previewEvents.map(event => ({
    id: event.id,
    tag: formatDate(event.date),
    title: localize(event.title),
    desc: localize(event.summary),
    meta: `${localize(event.city)} | ${localize(event.venue)}`,
  })),
)

function localize(text: MockEvent['title']) {
  return pickLocalized(locale.value, text)
}

function formatDate(date: string) {
  const value = new Date(date)

  if (locale.value === 'zh') {
    return value.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  if (locale.value === 'fr') {
    return value.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
  }

  return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function goEvents() {
  uni.navigateTo({ url: '/pages/events/index' })
}

function handleEventOpen(id: string) {
  openEventDetail(id)
}
</script>

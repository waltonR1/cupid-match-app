<template>
  <view class="bg-page-soft text-text-heading">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">

      <!-- 标题 -->
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-brand-highlight" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-brown">
              {{ t('events.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] lg:text-[56px]">
            {{ t('events.title') }}
            <text class="text-brand-highlight-strong"> · {{ t('events.titleAccent') }}</text>
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
          :key="event.title"
          class="group border border-border-base bg-surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-highlight/50 hover:bg-surface-panel hover:shadow-card"
        >
          <!-- 标签 -->
          <view class="text-[12px] uppercase tracking-[4px] text-brand-highlight">
            {{ t(event.tag) }}
          </view>

          <!-- 标题 -->
          <view class="mt-4 text-[22px] font-semibold leading-[1.4]">
            {{ t(event.title) }}
          </view>

          <!-- 描述 -->
          <view class="mt-3 text-[15px] leading-7 text-text-body-soft">
            {{ t(event.desc) }}
          </view>

          <!-- meta -->
          <view class="mt-6 text-[13px] text-text-subtle">
            {{ t(event.meta) }}
          </view>
        </view>
      </view>

      <!-- CTA -->
      <view class="mt-12 flex justify-center">
        <view
          class="inline-flex min-w-[178px] cursor-pointer items-center justify-center rounded-button border border-brand-highlight/35 bg-brand-highlight/8 px-8 py-3 text-[15px] tracking-[0.6px] text-brand-brown transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-highlight hover:bg-brand-highlight/16 hover:text-text-heading hover:shadow-panel"
          @click="goEvents"
        >
          {{ t('events.cta') }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('home')

const events = [
  {
    tag: 'events.item1.tag',
    title: 'events.item1.title',
    desc: 'events.item1.desc',
    meta: 'events.item1.meta',
  },
  {
    tag: 'events.item2.tag',
    title: 'events.item2.title',
    desc: 'events.item2.desc',
    meta: 'events.item2.meta',
  },
  {
    tag: 'events.item3.tag',
    title: 'events.item3.title',
    desc: 'events.item3.desc',
    meta: 'events.item3.meta',
  },
]

function goEvents() {
  uni.navigateTo({ url: '/pages/events/index' })
}
</script>

<template>
  <view class="bg-page-inverse text-text-inverse">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">

      <!-- 标题 -->
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-brand-rose-deep" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-rose-strong">
              {{ t('events.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] lg:text-[56px]">
            {{ t('events.title') }}
            <text class="text-brand-primary"> · {{ t('events.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[420px] text-[18px] leading-8 text-text-inverse-subtle">
          {{ t('events.subtitle') }}
        </view>
      </view>

      <!-- 卡片 -->
      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <view
          v-for="event in events"
          :key="event.title"
          class="group border border-white/10 bg-surface-inverse-panel p-6 transition hover:-translate-y-1 hover:border-border-highlight"
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
          <view class="mt-3 text-[15px] leading-7 text-text-inverse-subtle">
            {{ t(event.desc) }}
          </view>

          <!-- meta -->
          <view class="mt-6 text-[13px] text-text-inverse-muted/70">
            {{ t(event.meta) }}
          </view>
        </view>
      </view>

      <!-- CTA -->
      <view class="mt-12 flex justify-center">
        <view
          class="inline-flex cursor-pointer items-center justify-center border border-button-highlight px-6 py-3 text-[16px] text-button-highlight transition duration-300 hover:bg-button-highlight hover:text-page-inverse"
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

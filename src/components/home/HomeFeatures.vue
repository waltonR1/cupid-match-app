<template>
  <view class="bg-page-base text-text-heading">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <!-- 标题区 -->
      <view class="mb-16">
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-px w-14 bg-brand-accent" />
          <text class="text-[12px] uppercase tracking-[5px] text-brand-support">
            {{ t('features.eyebrow') }}
          </text>
        </view>

        <view class="text-[40px] font-semibold leading-[1.06] lg:text-[56px]">
          <text>{{ t('features.title') }}</text>
          <text class="text-brand-accent-strong"> · {{ t('features.titleAccent') }}</text>
        </view>

        <view class="mt-5 max-w-[760px] text-[18px] leading-8 text-text-body-soft lg:text-[19px]">
          {{ t('features.subtitle') }}
        </view>
      </view>

      <!-- 服务卡片区 -->
      <view class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <view
          v-for="card in serviceCards"
          :key="card.title"
          class="flex min-h-[280px] cursor-pointer flex-col border border-border-base bg-surface-card px-8 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-accent/50 hover:bg-surface-panel hover:shadow-feature"
          @click="openPath(card.path)"
        >
          <view class="text-[20px] font-semibold uppercase tracking-[2px] text-text-subtle">
            {{ card.icon }}
          </view>

          <view class="mt-4 text-[26px] font-semibold leading-[1.24] text-brand-accent-strong lg:text-[28px]">
            {{ t(card.title) }}
          </view>

          <view class="mt-3 text-[17px] leading-8 text-text-body lg:text-[18px]">
            {{ t(card.desc) }}
          </view>

          <view
            v-if="showBrandLabel"
            class="mt-auto pt-6 text-[14px] italic tracking-[3px] text-brand-support"
          >
            {{ t(card.label) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t, locale } = usePageI18n('home')

interface ServiceCardItem {
  icon: string
  title: string
  desc: string
  label: string
  path: string
}

const serviceCards: ServiceCardItem[] = [
  {
    icon: '🤖',
    title: 'features.ai.title',
    desc: 'features.ai.desc',
    label: 'features.ai.label',
    path: '/pages/discovery/self/index',
  },
  {
    icon: '💌',
    title: 'features.message.title',
    desc: 'features.message.desc',
    label: 'features.message.label',
    path: '/pages/discovery/self/index',
  },
  {
    icon: '🎭',
    title: 'features.event.title',
    desc: 'features.event.desc',
    label: 'features.event.label',
    path: '/pages/events/index',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'features.family.title',
    desc: 'features.family.desc',
    label: 'features.family.label',
    path: '/pages/discovery/family/index',
  },
  {
    icon: '💎',
    title: 'features.vip.title',
    desc: 'features.vip.desc',
    label: 'features.vip.label',
    path: '/pages/public/membership',
  },
  {
    icon: '🏆',
    title: 'features.story.title',
    desc: 'features.story.desc',
    label: 'features.story.label',
    path: '/pages/public/about',
  },
]

/**
 * 当前语言是法文时，不再显示法文品牌副标签，避免重复。
 * 中文 / 英文环境下继续显示，作为品牌点缀。
 */
const showBrandLabel = computed(() => {
  return locale.value !== 'fr'
})

function openPath(path: string) {
  if (!path) return
  uni.navigateTo({
    url: path,
  })
}
</script>

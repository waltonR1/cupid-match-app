<template>
  <view class="bg-next-semantic-page-default text-next-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <!-- 标题区 -->
      <view class="mb-16">
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-px w-14 bg-next-semantic-accent-primary" />
          <text class="text-[12px] uppercase tracking-[5px] text-next-semantic-accent-secondary">
            {{ t('features.eyebrow') }}
          </text>
        </view>

        <view class="text-[40px] font-semibold leading-[1.06] text-next-semantic-text-primary lg:text-[56px]">
          <text>{{ t('features.title') }}</text>
          <text class="text-next-semantic-accent-primary"> · {{ t('features.titleAccent') }}</text>
        </view>

        <view class="mt-5 max-w-[760px] text-[18px] leading-8 text-next-semantic-text-muted lg:text-[19px]">
          {{ t('features.subtitle') }}
        </view>
      </view>

      <!-- 服务卡片区 -->
      <view class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <view
          v-for="card in serviceCards"
          :key="card.title"
          class="flex min-h-[280px] cursor-pointer flex-col border border-next-semantic-border-default bg-next-semantic-surface-card px-8 py-8 transition-all duration-300 hover:-translate-y-[2px] hover:border-next-component-section-card-hover-border hover:bg-next-semantic-surface-soft hover:shadow-next-shadow-panel"
          @click="openPath(card.path)"
        >
          <view class="text-[20px] font-semibold uppercase tracking-[2px] text-next-semantic-text-subtle">
            {{ card.icon }}
          </view>

          <view class="mt-4 text-[26px] font-semibold leading-[1.24] text-next-semantic-accent-primary lg:text-[28px]">
            {{ t(card.title) }}
          </view>

          <view class="mt-3 text-[17px] leading-8 text-next-semantic-text-secondary lg:text-[18px]">
            {{ t(card.desc) }}
          </view>

          <view
            v-if="showBrandLabel"
            class="mt-auto pt-6 text-[14px] italic tracking-[3px] text-next-semantic-accent-secondary"
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

<template>
  <view class="bg-semantic-page-default text-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <!-- 标题区 -->
      <view class="mb-16">
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-px w-14 bg-semantic-border-eyebrow"/>
          <text class="text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">
            {{ t('features.eyebrow') }}
          </text>
        </view>

        <view class="text-[40px] font-semibold leading-[1.06] text-semantic-text-primary lg:text-[56px]">
          <text>{{ t('features.title') }}</text>
          <text class="text-semantic-text-section-highlight"> {{ t('features.titleAccent') }}</text>
        </view>

        <view class="mt-5 max-w-[760px] text-[18px] leading-8 text-semantic-text-muted lg:text-[19px]">
          {{ t('features.subtitle') }}
        </view>
      </view>

      <!-- 功能卡片 -->
      <view class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <view
            v-for="card in serviceCards"
            :key="card.title"
            class="flex min-h-[280px] cursor-pointer flex-col border border-semantic-border-default bg-semantic-surface-card px-8 py-8 transition-all duration-300 hover:-translate-y-[2px] hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft hover:shadow-panel"
            @click="openPage(card.path)"
        >
          <view class="text-[20px] font-semibold uppercase tracking-[2px] text-semantic-text-subtle">
            {{ card.icon }}
          </view>

          <view class="mt-4 text-[26px] font-semibold leading-[1.24] text-component-home-feature-title lg:text-[28px]">
            {{ t(card.title) }}
          </view>

          <view class="mt-3 text-[17px] leading-8 text-semantic-text-secondary lg:text-[18px]">
            {{ t(card.desc) }}
          </view>

          <view
              v-if="showBrandLabel"
              class="mt-auto pt-6 text-[14px] italic tracking-[3px] text-component-home-feature-label"
          >
            {{ t(card.label) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {openPage} from '@/utils/navigation'

/** 首页文案 */
const {t, locale} = usePageI18n('home')

/** 功能卡片数据 */
const serviceCards = [
  {
    icon: 'AI',
    title: 'features.ai.title',
    desc: 'features.ai.desc',
    label: 'features.ai.label',
    path: '/pages/profiles/self/index',
  },
  {
    icon: 'MSG',
    title: 'features.message.title',
    desc: 'features.message.desc',
    label: 'features.message.label',
    path: '/pages/profiles/self/index',
  },
  {
    icon: 'EVT',
    title: 'features.event.title',
    desc: 'features.event.desc',
    label: 'features.event.label',
    path: '/pages/events/index',
  },
  {
    icon: 'FAM',
    title: 'features.family.title',
    desc: 'features.family.desc',
    label: 'features.family.label',
    path: '/pages/profiles/family/index',
  },
  {
    icon: 'VIP',
    title: 'features.vip.title',
    desc: 'features.vip.desc',
    label: 'features.vip.label',
    path: '/pages/public/membership',
  },
  {
    icon: 'STORY',
    title: 'features.story.title',
    desc: 'features.story.desc',
    label: 'features.story.label',
    path: '/pages/public/about',
  },
] as const

/** 法语下隐藏品牌副标签，避免语义重复 */
const showBrandLabel = computed(() => {
  return locale.value !== 'fr'
})
</script>
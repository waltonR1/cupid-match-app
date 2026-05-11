<template>
  <view class="bg-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <!-- Contact Cases 内容区域 -->
      <view class="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <!-- 左侧标题介绍 -->
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-semantic-border-eyebrow"/>
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
              {{ t('cases.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight text-semantic-text-primary lg:text-[64px]">
            <view class="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <text>{{ t('cases.title') }}</text>
              <text class="whitespace-nowrap italic text-semantic-text-section-highlight">& {{ t('cases.titleAccent') }}</text>
            </view>
          </view>

          <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-semantic-text-lead lg:text-[21px]">
            {{ t('cases.subtitle') }}
          </view>

          <!-- 桌面端补充说明 -->
          <view class="mt-10 border border-semantic-border-soft bg-semantic-surface-soft px-7 py-8 shadow-panel">
            <view class="text-[12px] uppercase tracking-[5px] text-semantic-text-card-label">
              {{ t('cases.deskLabel') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-semantic-text-secondary">
              {{ t(cards[0].desc) }}
            </view>
          </view>
        </view>

        <!-- 联系场景卡片列表 -->
        <view class="grid gap-4">
          <view
              v-for="(item, index) in cards"
              :key="item.title"
              class="relative grid gap-5 overflow-hidden border px-8 py-8 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-emphasis lg:grid-cols-[120px_1fr] lg:items-center"
              :class="cardClass(index)"
          >
            <view class="absolute inset-x-0 top-0 h-px" :class="lineClass(index)"/>
            <view
                class="flex h-20 w-20 items-center justify-center rounded-full border text-[34px]"
                :class="iconClass(index)"
            >
              {{ item.icon }}
            </view>
            <view>
              <view class="text-[13px] uppercase tracking-[4px]" :class="indexClass(index)">
                {{ `0${index + 1}`.slice(-2) }}
              </view>
              <view class="mt-3 text-[28px] font-semibold text-semantic-text-primary">
                {{ t(item.title) }}
              </view>
              <view class="mt-4 text-[16px] leading-8 text-semantic-text-secondary">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {usePageI18n} from '@/i18n/composables/use-page-i18n'

/** Contact Cases 组件参数 */
defineProps<{
  cards: {
    icon: string
    title: string
    desc: string
  }[]
}>()

/** Contact 页面命名空间文案 */
const {t} = usePageI18n('contact')

/** 根据序号控制场景卡片样式 */
function cardClass(index: number) {
  if (index % 3 === 2) {
    return 'border-semantic-border-emphasis bg-semantic-surface-emphasis'
  }

  return 'border-semantic-border-soft bg-component-editorial-card-background hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover'
}

/** 根据序号控制顶部线条样式 */
function lineClass(index: number) {
  if (index % 3 === 2) {
    return 'bg-semantic-border-emphasis-divider'
  }

  return 'bg-component-editorial-card-line'
}

/** 根据序号控制图标样式 */
function iconClass(index: number) {
  if (index % 3 === 2) {
    return 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-component-contact-case-emphasis'
  }

  if (index % 3 === 1) {
    return 'border-semantic-border-default bg-semantic-surface-panel text-component-contact-case-default'
  }

  return 'border-semantic-border-soft bg-semantic-surface-soft text-component-contact-case-soft'
}

/** 根据序号控制编号样式 */
function indexClass(index: number) {
  if (index % 3 === 2) {
    return 'text-component-contact-case-emphasis'
  }

  return 'text-component-contact-case-soft'
}
</script>
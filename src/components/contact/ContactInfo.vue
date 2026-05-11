<template>
  <view class="bg-semantic-page-default">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <!-- Contact Info 标题区 -->
      <view class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view class="max-w-[760px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-semantic-border-eyebrow"/>
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
              {{ t('info.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight text-semantic-text-primary lg:text-[64px]">
            <view class="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <text>{{ t('info.title') }}</text>
              <text class="whitespace-nowrap italic text-semantic-text-section-highlight">& {{ t('info.titleAccent') }}</text>
            </view>
          </view>
        </view>

        <view class="max-w-[440px] text-[18px] italic leading-8 text-semantic-text-lead">
          {{ t('info.subtitle') }}
        </view>
      </view>

      <!-- 联系方式卡片列表 -->
      <view class="grid gap-6 lg:grid-cols-3">
        <view
            v-for="item in cards"
            :key="item.title"
            class="group relative overflow-hidden border border-semantic-border-soft bg-component-editorial-card-background px-8 py-10 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover hover:shadow-emphasis"
        >
          <view class="absolute inset-x-0 top-0 h-px bg-component-editorial-card-line"/>
          <view class="flex items-center justify-between gap-4">
            <view class="text-[32px]">{{ item.icon }}</view>
            <view class="text-[13px] uppercase tracking-[4px] text-semantic-text-card-label">
              {{ t('info.cardLabel') }}
            </view>
          </view>
          <view class="mt-6 text-[30px] font-semibold text-semantic-text-primary">
            {{ t(item.title) }}
          </view>
          <view class="mt-5 text-[16px] leading-8 text-semantic-text-secondary">
            {{ t(item.desc) }}
          </view>
          <view
              class="mt-6 border-t border-semantic-border-soft pt-5 text-[16px] font-medium text-semantic-text-primary">
            {{ t(item.value, {email}) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {usePageI18n} from '@/i18n/composables/use-page-i18n'

/** Contact Info 组件参数 */
defineProps<{
  cards: {
    icon: string
    title: string
    desc: string
    value: string
  }[]
  email: string
}>()

/** Contact 页面命名空间文案 */
const {t} = usePageI18n('contact')
</script>
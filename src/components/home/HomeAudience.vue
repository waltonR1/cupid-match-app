<template>
  <view class="bg-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
        <!-- 左侧介绍 -->
        <view
            class="border border-semantic-border-default bg-semantic-surface-panel px-7 py-8 lg:sticky lg:top-28 lg:self-start lg:px-8 lg:py-10">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-semantic-border-eyebrow"/>
            <text class="text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">
              {{ t('audience.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-semantic-text-primary lg:text-[56px]">
            <text>{{ t('audience.title') }}</text>
            <text class="text-semantic-text-section-highlight"> {{ t('audience.titleAccent') }}</text>
          </view>

          <view class="mt-7 text-[17px] leading-8 text-semantic-text-secondary lg:text-[18px]">
            {{ t('audience.description') }}
          </view>

          <view class="mt-5 text-[16px] italic leading-8 text-semantic-text-muted lg:text-[17px]">
            {{ t('audience.secondaryDescription') }}
          </view>
        </view>

        <!-- 右侧内容 -->
        <view class="space-y-6">
          <!-- 目标人群标签 -->
          <view class="grid gap-5 sm:grid-cols-3">
            <view
                v-for="tag in audienceTags"
                :key="tag.title"
                class="border border-semantic-border-default bg-component-home-audience-tag-background px-6 py-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-component-home-audience-tag-border-hover hover:bg-component-home-audience-tag-background-hover hover:shadow-panel lg:px-7"
            >
              <view class="text-[22px] font-medium leading-[1.3] text-semantic-text-primary">
                {{ t(tag.title) }}
              </view>

              <view class="mt-3 text-[14px] italic leading-6 text-semantic-text-muted">
                {{ t(tag.desc) }}
              </view>
            </view>
          </view>

          <!-- 核心理念 -->
          <view class="grid gap-6 md:grid-cols-2">
            <view
                class="min-h-[204px] border border-component-principle-card-border bg-component-principle-card-background px-7 py-8 text-semantic-text-primary lg:px-8 lg:py-9">
              <view class="text-[13px] uppercase tracking-[4px] text-semantic-text-card-label">
                {{ t('audience.card1Label') }}
              </view>

              <view class="mt-5 max-w-[12ch] text-[24px] leading-[1.6] lg:text-[25px]">
                {{ t('audience.card1') }}
              </view>

              <view class="mt-5 text-[15px] leading-8 text-semantic-text-muted lg:text-[16px]">
                {{ t('audience.card1Accent') }}
              </view>
            </view>

            <view
                class="min-h-[204px] border border-component-home-audience-highlight-border bg-component-home-audience-highlight-background px-7 py-8 text-semantic-text-primary shadow-emphasis lg:px-8 lg:py-9">
              <view class="text-[13px] uppercase tracking-[4px] text-semantic-text-card-label">
                {{ t('audience.card2Label') }}
              </view>

              <view class="mt-5 max-w-[12ch] text-[24px] leading-[1.6] lg:text-[25px]">
                {{ t('audience.card2') }}
              </view>

              <view class="mt-5 text-[15px] leading-8 text-semantic-text-muted lg:text-[16px]">
                {{ t('audience.card2Accent') }}
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

/** 首页文案 */
const {t} = usePageI18n('home')

/** 目标人群标签 */
const audienceTags = [
  {title: 'audience.tag1.title', desc: 'audience.tag1.desc', accent: true},
  {title: 'audience.tag2.title', desc: 'audience.tag2.desc'},
  {title: 'audience.tag3.title', desc: 'audience.tag3.desc'},
] as const
</script>
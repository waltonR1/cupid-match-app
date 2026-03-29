<template>
  <view class="bg-[#f3ede3]">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
        <!-- 左侧主说明 -->
        <view
            class="border border-[#e2d7c9] bg-[#f6ecdf] px-7 py-8 lg:sticky lg:top-28 lg:self-start lg:px-8 lg:py-10"
        >
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">
              {{ t('audience.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-[#1f1a1c] lg:text-[56px]">
            <text>{{ t('audience.title') }}</text>
            <text class="text-[#d71934]">{{ t('audience.titleAccent') }}</text>
          </view>

          <view class="mt-7 text-[17px] leading-8 text-[#685a4e] lg:text-[18px]">
            {{ t('audience.description') }}
          </view>

          <view class="mt-5 text-[16px] italic leading-8 text-[#8a7765] lg:text-[17px]">
            {{ t('audience.secondaryDescription') }}
          </view>
        </view>

        <!-- 右侧内容 -->
        <view class="space-y-6">
          <!-- 三个标签卡 -->
          <view class="grid gap-5 sm:grid-cols-3">
            <view
                v-for="tag in audienceTags"
                :key="tag.title"
                class="border border-[#e2d7c9] bg-white px-6 py-6 lg:px-7"
            >
              <view
                  class="text-[22px] font-medium leading-[1.3]"
                  :class="tag.accent ? 'text-[#d71934]' : 'text-[#1e1e1f]'"
              >
                {{ t(tag.title) }}
              </view>

              <view class="mt-3 text-[14px] italic leading-6 text-[#7d6752]">
                {{ t(tag.desc) }}
              </view>
            </view>
          </view>

          <!-- 两张核心态度卡 -->
          <view class="grid gap-6 md:grid-cols-2">
            <view class="border border-[#203854] bg-[#203854] px-7 py-8 text-white lg:px-8 lg:py-9">
              <view class="text-[13px] uppercase tracking-[4px] text-[#d7b86e]">
                {{ t('audience.card1Label') }}
              </view>

              <view class="mt-5 text-[28px] leading-[1.45] lg:text-[30px]">
                {{ t('audience.card1') }}
              </view>

              <view class="mt-5 text-[15px] leading-8 text-white/72 lg:text-[16px]">
                {{ t('audience.card1Accent') }}
              </view>
            </view>

            <view
                class="border border-[#d71934] bg-[#d71934] px-7 py-8 text-white shadow-[0_20px_50px_rgba(175,16,47,0.14)] lg:px-8 lg:py-9"
            >
              <view class="text-[13px] uppercase tracking-[4px] text-[#ffd5dd]">
                {{ t('audience.card2Label') }}
              </view>

              <view class="mt-5 text-[28px] leading-[1.45] lg:text-[30px]">
                {{ t('audience.card2') }}
              </view>

              <view class="mt-5 text-[15px] leading-8 text-white/80 lg:text-[16px]">
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
import { usePageI18n } from '@/i18n/use-page-i18n'

interface AudienceTagItem {
  title: string
  desc: string
  accent?: boolean
}

const { t } = usePageI18n('home')

const audienceTags: AudienceTagItem[] = [
  { title: 'audience.tag1.title', desc: 'audience.tag1.desc', accent: true },
  { title: 'audience.tag2.title', desc: 'audience.tag2.desc' },
  { title: 'audience.tag3.title', desc: 'audience.tag3.desc' },
]
</script>
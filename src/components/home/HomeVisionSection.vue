<script lang="ts" setup>
import {usePageI18n} from "@/i18n/use-page-i18n";

const { t } = usePageI18n('home')

const visionPoints = [
  {
    title: 'vision.points.relationship.title',
    desc: 'vision.points.relationship.desc',
  },
  {
    title: 'vision.points.values.title',
    desc: 'vision.points.values.desc',
  },
  {
    title: 'vision.points.intention.title',
    desc: 'vision.points.intention.desc',
  },
]
</script>

<template>
  <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
    <view class="grid gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:gap-10">
      <!-- 左侧标题区 -->
      <view
          class="border border-[#e6dacd] bg-[#f6ecdf] px-7 py-8 lg:sticky lg:top-28 lg:self-start lg:px-8 lg:py-10"
      >
        <view class="mb-6 inline-flex items-center gap-4">
          <view class="h-px w-10 bg-[#d8a1a1]"/>
          <text class="text-[12px] uppercase tracking-[5px] text-[#cc8f93]">
            {{ t('vision.eyebrow') }}
          </text>
        </view>

        <view
            class="text-[40px] font-semibold leading-[1.04] text-[#1f1620] sm:text-[46px] lg:text-[58px]"
        >
          <text>{{ t('vision.title') }}</text>
          <text class="text-[#cf2438]"> · {{ t('vision.titleAccent') }}</text>
        </view>

        <view class="mt-6 max-w-[420px] text-[15px] leading-7 text-[#7c654f] lg:text-[16px]">
          {{ t('vision.intro') }}
        </view>
      </view>

      <!-- 右侧内容区 -->
      <view class="space-y-6">
        <!-- 主说明卡 -->
        <view class="border border-[#eadfd2] bg-white px-7 py-8 lg:px-9 lg:py-9">
          <view class="text-[21px] leading-[1.85] text-[#7f5d3c] lg:text-[24px]">
            {{ t('vision.description') }}
          </view>

          <view class="mt-7 text-[18px] italic leading-[1.9] text-[#a27b55] lg:text-[20px]">
            {{ t('vision.secondaryDescription') }}
          </view>
        </view>

        <!-- 三张 point 卡 -->
        <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <view
              v-for="item in visionPoints"
              :key="item.title"
              class="flex min-h-[220px] flex-col border border-[#eadfd2] bg-[#fbf7ef] px-7 py-8"
          >
            <view class="text-[13px] uppercase tracking-[4px] text-[#cc8f93]">
              {{ t('vision.pointLabel') }}
            </view>

            <view class="mt-5 text-[25px] font-medium leading-[1.28] text-[#cf2438]">
              {{ t(item.title) }}
            </view>

            <view class="mt-4 text-[16px] italic leading-7 text-[#7c654f]">
              {{ t(item.desc) }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
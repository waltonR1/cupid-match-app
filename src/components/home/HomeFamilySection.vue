<template>
  <view class="bg-[#0f2438]">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

        <!-- 左侧 -->
        <view class="border border-[#2a4158] bg-[#162f4a] px-8 py-10">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-14 bg-[#d7b86e]" />
            <text class="text-[12px] uppercase tracking-[5px] text-[#d7b86e]">
              {{ t('family.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.1] text-white">
            {{ t('family.title') }}
            <text class="text-[#d71934]">
              {{ t('family.titleAccent') }}
            </text>
          </view>

          <view class="mt-6 text-[17px] leading-8 text-white/70">
            {{ t('family.description') }}
          </view>

          <view class="mt-5 text-[16px] italic leading-8 text-white/50">
            {{ t('family.secondary') }}
          </view>
        </view>

        <!-- 右侧 -->
        <view class="space-y-6">

          <!-- 三个点 -->
          <view class="grid gap-5 sm:grid-cols-3">
            <view
                v-for="item in familyItems"
                :key="item.title"
                class="border border-[#2a4158] bg-[#162f4a] px-6 py-6"
            >
              <view class="text-[20px] font-medium text-white">
                {{ t(item.title) }}
              </view>

              <view class="mt-3 text-[14px] italic leading-6 text-white/60">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>

          <!-- 强调卡 -->
          <view class="grid gap-6 md:grid-cols-2">
            <view class="border border-[#2a4158] bg-[#203b5a] px-8 py-8 text-white">
              <view class="text-[13px] uppercase tracking-[4px] text-[#d7b86e]">
                {{ t('family.card1Label') }}
              </view>

              <view class="mt-4 text-[26px] leading-[1.5]">
                {{ t('family.card1') }}
              </view>
            </view>

            <view class="border border-[#d71934] bg-[#d71934] px-8 py-8 text-white">
              <view class="text-[13px] uppercase tracking-[4px] text-white/70">
                {{ t('family.card2Label') }}
              </view>

              <view class="mt-4 text-[26px] leading-[1.5]">
                {{ t('family.card2') }}
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

const { t } = usePageI18n('home')

const familyItems = [
  { title: 'family.item1.title', desc: 'family.item1.desc' },
  { title: 'family.item2.title', desc: 'family.item2.desc' },
  { title: 'family.item3.title', desc: 'family.item3.desc' },
]
</script>
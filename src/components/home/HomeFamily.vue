<template>
  <view class="bg-page-base">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

        <!-- 左侧 -->
        <view class="border border-border-base bg-surface-panel px-8 py-10">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-14 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-accent">
              {{ t('family.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.1] text-text-heading">
            {{ t('family.title') }}
            <text class="text-brand-accent-strong">
              {{ t('family.titleAccent') }}
            </text>
          </view>

          <view class="mt-6 text-[17px] leading-8 text-text-body">
            {{ t('family.description') }}
          </view>

          <view class="mt-5 text-[16px] italic leading-8 text-text-muted">
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
              class="border border-border-base bg-surface-base px-6 py-6"
            >
              <view class="text-[20px] font-medium text-text-heading">
                {{ t(item.title) }}
              </view>

              <view class="mt-3 text-[14px] italic leading-6 text-text-body-soft">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>

          <!-- 强调卡 -->
          <view class="grid gap-6 md:grid-cols-2">
            <view class="border border-border-base bg-surface-card px-8 py-8 text-text-heading">
              <view class="text-[13px] uppercase tracking-[4px] text-brand-accent">
                {{ t('family.card1Label') }}
              </view>

              <view class="mt-4 text-[26px] leading-[1.5]">
                {{ t('family.card1') }}
              </view>
            </view>

            <view class="border border-border-accent/55 bg-surface-panel px-8 py-8 text-text-heading shadow-emphasis">
              <view class="text-[13px] uppercase tracking-[4px] text-brand-support">
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

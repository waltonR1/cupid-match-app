<template>
  <view class="bg-next-semantic-page-default">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

        <!-- 左侧 -->
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-8 py-10">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-14 bg-next-semantic-accent-primary" />
            <text class="text-[12px] uppercase tracking-[5px] text-next-semantic-accent-primary">
              {{ t('family.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.1] text-next-semantic-text-primary">
            {{ t('family.title') }}
            <text class="text-next-semantic-accent-primary">
              {{ t('family.titleAccent') }}
            </text>
          </view>

          <view class="mt-6 text-[17px] leading-8 text-next-semantic-text-secondary">
            {{ t('family.description') }}
          </view>

          <view class="mt-5 text-[16px] italic leading-8 text-next-semantic-text-muted">
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
              class="border border-next-semantic-border-default bg-next-component-home-family-point-background px-6 py-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-next-component-home-family-point-border-hover hover:bg-next-component-home-family-point-background-hover hover:shadow-next-shadow-panel"
            >
              <view class="text-[20px] font-medium text-next-semantic-text-primary">
                {{ t(item.title) }}
              </view>

              <view class="mt-3 text-[14px] italic leading-6 text-next-semantic-text-muted">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>

          <!-- 强调卡 -->
          <view class="grid gap-6 md:grid-cols-2">
            <view class="min-h-[204px] border border-next-component-principle-card-border bg-next-component-principle-card-background px-8 py-8 text-next-semantic-text-primary">
              <view class="text-[13px] uppercase tracking-[4px] text-next-semantic-accent-primary">
                {{ t('family.card1Label') }}
              </view>

              <view class="mt-4 max-w-[12ch] text-[24px] leading-[1.6] md:text-[25px]">
                {{ t('family.card1') }}
              </view>
            </view>

            <view class="min-h-[204px] border border-next-component-home-family-highlight-border bg-next-component-home-family-highlight-background px-8 py-8 text-next-semantic-text-primary shadow-next-shadow-emphasis">
              <view class="text-[13px] uppercase tracking-[4px] text-next-semantic-accent-secondary">
                {{ t('family.card2Label') }}
              </view>

              <view class="mt-4 max-w-[12ch] text-[24px] leading-[1.6] md:text-[25px]">
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
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('home')

const familyItems = [
  { title: 'family.item1.title', desc: 'family.item1.desc' },
  { title: 'family.item2.title', desc: 'family.item2.desc' },
  { title: 'family.item3.title', desc: 'family.item3.desc' },
]
</script>

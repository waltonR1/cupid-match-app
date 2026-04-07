<template>
  <view class="bg-next-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
        <!-- 左侧主说明 -->
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-7 py-8 lg:sticky lg:top-28 lg:self-start lg:px-8 lg:py-10">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-next-semantic-accent-primary" />
            <text class="text-[12px] uppercase tracking-[5px] text-next-semantic-accent-secondary">
              {{ t('audience.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-next-semantic-text-primary lg:text-[56px]">
            <text>{{ t('audience.title') }}</text>
            <text class="text-next-semantic-accent-primary"> · {{ t('audience.titleAccent') }}</text>
          </view>

          <view class="mt-7 text-[17px] leading-8 text-next-semantic-text-secondary lg:text-[18px]">
            {{ t('audience.description') }}
          </view>

          <view class="mt-5 text-[16px] italic leading-8 text-next-semantic-text-muted lg:text-[17px]">
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
              class="border border-next-semantic-border-default bg-next-component-home-audience-tag-background px-6 py-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-next-component-home-audience-tag-border-hover hover:bg-next-component-home-audience-tag-background-hover hover:shadow-next-shadow-panel lg:px-7"
            >
              <view
                class="text-[22px] font-medium leading-[1.3] text-next-semantic-text-primary"
              >
                {{ t(tag.title) }}
              </view>

              <view class="mt-3 text-[14px] italic leading-6 text-next-semantic-text-muted">
                {{ t(tag.desc) }}
              </view>
            </view>
          </view>

          <!-- 两张核心态度卡 -->
          <view class="grid gap-6 md:grid-cols-2">
            <view class="min-h-[204px] border border-next-component-principle-card-border bg-next-component-principle-card-background px-7 py-8 text-next-semantic-text-primary lg:px-8 lg:py-9">
              <view class="text-[13px] uppercase tracking-[4px] text-next-semantic-accent-primary">
                {{ t('audience.card1Label') }}
              </view>

              <view class="mt-5 max-w-[12ch] text-[24px] leading-[1.6] lg:text-[25px]">
                {{ t('audience.card1') }}
              </view>

              <view class="mt-5 text-[15px] leading-8 text-next-semantic-text-muted lg:text-[16px]">
                {{ t('audience.card1Accent') }}
              </view>
            </view>

            <view class="min-h-[204px] border border-next-component-home-audience-highlight-border bg-next-component-home-audience-highlight-background px-7 py-8 text-next-semantic-text-primary shadow-next-shadow-emphasis lg:px-8 lg:py-9">
              <view class="text-[13px] uppercase tracking-[4px] text-next-semantic-accent-secondary">
                {{ t('audience.card2Label') }}
              </view>

              <view class="mt-5 max-w-[12ch] text-[24px] leading-[1.6] lg:text-[25px]">
                {{ t('audience.card2') }}
              </view>

              <view class="mt-5 text-[15px] leading-8 text-next-semantic-text-muted lg:text-[16px]">
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
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

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

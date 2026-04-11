<template>
  <view class="bg-next-semantic-page-default">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="grid gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:gap-10">
        <!-- Sticky intro panel -->
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-7 py-8 lg:sticky lg:top-28 lg:self-start lg:px-8 lg:py-10">
          <view class="mb-6 inline-flex items-center gap-4">
            <view class="h-px w-10 bg-next-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[5px] text-next-semantic-text-eyebrow">
              {{ t('vision.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.04] text-next-semantic-text-primary sm:text-[46px] lg:text-[58px]">
            <text>{{ t('vision.title') }}</text>
            <text class="text-next-semantic-text-section-highlight"> {{ t('vision.titleAccent') }}</text>
          </view>

          <view class="mt-6 max-w-[420px] text-[15px] leading-7 text-next-semantic-text-muted lg:text-[16px]">
            {{ t('vision.intro') }}
          </view>
        </view>

        <!-- Content column -->
        <view class="space-y-6">
          <!-- Vision statement -->
          <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-7 py-8 lg:px-9 lg:py-9">
            <view class="text-[21px] leading-[1.85] text-next-semantic-text-muted lg:text-[24px]">
              {{ t('vision.description') }}
            </view>

            <view class="mt-7 text-[18px] italic leading-[1.9] text-next-component-home-vision-quote lg:text-[20px]">
              {{ t('vision.secondaryDescription') }}
            </view>
          </view>

          <!-- Vision points -->
          <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <view
              v-for="item in visionPoints"
              :key="item.title"
              class="relative flex min-h-[220px] flex-col overflow-hidden border border-next-semantic-border-soft bg-next-component-editorial-card-background px-7 py-8 transition-all duration-300 hover:-translate-y-[3px] hover:border-next-component-editorial-card-border-hover hover:bg-next-component-editorial-card-background-hover hover:shadow-next-shadow-panel"
            >
              <view class="absolute inset-x-0 top-0 h-px bg-next-component-editorial-card-line" />
              <view class="text-[13px] uppercase tracking-[4px] text-next-semantic-text-card-label">
                {{ t('vision.pointLabel') }}
              </view>

              <view class="mt-5 text-[25px] font-medium leading-[1.28] text-next-component-home-vision-point-title">
                {{ t(item.title) }}
              </view>

              <view class="mt-4 text-[16px] italic leading-7 text-next-semantic-text-muted">
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
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

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

<template>
  <view class="bg-semantic-page-default">
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-10">
        <view class="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
          <view>
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-semantic-border-eyebrow" />
              <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
                {{ t('guide.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-[1.15] text-semantic-text-primary lg:text-[66px]">
              <view class="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <text>{{ t('guide.title') }}</text>
                <text class="whitespace-nowrap text-semantic-text-section-highlight">{{ t('guide.titleAccent') }}</text>
              </view>
            </view>
          </view>

          <view class="grid gap-4 md:grid-cols-3">
            <view
              v-for="item in tags"
              :key="item.title"
              class="border border-semantic-border-soft bg-component-editorial-card-background px-7 py-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover hover:shadow-emphasis"
            >
              <view class="text-[22px] font-medium text-semantic-text-primary">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[14px] italic leading-6 text-semantic-text-muted">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="grid gap-6 xl:grid-cols-[0.7fr_0.3fr]">
          <view class="grid gap-6 md:grid-cols-2">
            <view class="relative overflow-hidden border border-semantic-border-soft bg-component-editorial-card-background px-8 py-10 shadow-emphasis transition-all duration-300 hover:-translate-y-1 hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover">
              <view class="absolute inset-x-0 top-0 h-px bg-component-editorial-card-line" />
              <view class="text-[12px] uppercase tracking-[5px] text-semantic-text-card-label">
                {{ t('guide.flow1Label') }}
              </view>
              <view class="mt-5 text-[30px] font-semibold leading-[1.4] text-semantic-text-primary">
                {{ t('guide.card1') }}
              </view>
              <view class="mt-6 text-[16px] italic leading-8 text-semantic-text-muted">
                {{ t('guide.card1Sub') }}
              </view>
            </view>

            <view class="relative overflow-hidden border border-semantic-border-emphasis bg-semantic-surface-emphasis px-8 py-10 shadow-panel md:translate-y-10">
              <view class="absolute inset-x-0 top-0 h-px bg-semantic-border-emphasis-divider" />
              <view class="text-[12px] uppercase tracking-[5px] text-semantic-text-card-label">
                {{ t('guide.flow2Label') }}
              </view>
              <view class="mt-5 text-[30px] font-semibold leading-[1.4] text-semantic-text-primary">
                {{ t('guide.card2') }}
              </view>
              <view class="mt-6 text-[16px] italic leading-8 text-semantic-text-muted">
                {{ t('guide.card2Sub') }}
              </view>
            </view>
          </view>

          <view class="border border-semantic-border-soft bg-semantic-surface-soft px-8 py-10 shadow-panel">
            <view class="text-[16px] italic leading-8 text-semantic-text-lead">
              {{ t('guide.description') }}
            </view>
            <view class="mt-8 border-t border-semantic-border-soft pt-8 text-[16px] italic leading-8 text-semantic-text-lead">
              {{ t('guide.secondaryDescription') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { ContactGuideTag } from '@/components/contact/contact.types'

defineProps<{
  tags: ContactGuideTag[]
}>()

const { t } = usePageI18n('contact')
</script>


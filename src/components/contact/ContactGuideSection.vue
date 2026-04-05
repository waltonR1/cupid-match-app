<template>
  <view class="bg-page-base">
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-10">
        <view class="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
          <view>
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-brand-accent" />
              <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
                {{ t('guide.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-[1.15] lg:text-[66px]">
              <view class="inline-flex items-baseline gap-3">
                <text>{{ t('guide.title') }}</text>
                <text class="text-brand-accent-strong">{{ t('guide.titleAccent') }}</text>
              </view>
            </view>
          </view>

          <view class="grid gap-4 md:grid-cols-3">
            <view
              v-for="item in tags"
              :key="item.title"
              class="border px-7 py-6 shadow-card"
              :class="item.accent ? 'border-border-accent/30 bg-brand-accent/10' : 'border-border-base bg-surface-panel'"
            >
              <view class="text-[22px] font-medium" :class="item.accent ? 'text-brand-accent-strong' : 'text-text-heading'">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[14px] italic leading-6 text-text-body-soft">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="grid gap-6 xl:grid-cols-[0.7fr_0.3fr]">
          <view class="grid gap-6 md:grid-cols-2">
            <view class="relative overflow-hidden border border-border-base bg-surface-panel px-8 py-10 shadow-emphasis">
              <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/60" />
              <view class="text-[12px] uppercase tracking-[5px] text-brand-accent">
                {{ t('guide.flow1Label') }}
              </view>
              <view class="mt-5 text-[30px] font-semibold leading-[1.4] text-text-heading">
                {{ t('guide.card1') }}
              </view>
              <view class="mt-6 text-[16px] italic leading-8 text-text-body-soft">
                {{ t('guide.card1Sub') }}
              </view>
            </view>

            <view class="relative overflow-hidden border border-brand-accent/30 bg-brand-accent/10 px-8 py-10 shadow-card md:translate-y-10">
              <view class="absolute inset-x-0 top-0 h-px bg-brand-accent/72" />
              <view class="text-[12px] uppercase tracking-[5px] text-brand-support">
                {{ t('guide.flow2Label') }}
              </view>
              <view class="mt-5 text-[30px] font-semibold leading-[1.4] text-text-heading">
                {{ t('guide.card2') }}
              </view>
              <view class="mt-6 text-[16px] italic leading-8 text-text-body-soft">
                {{ t('guide.card2Sub') }}
              </view>
            </view>
          </view>

          <view class="border border-border-soft bg-surface-card-soft px-8 py-10 shadow-card">
            <view class="text-[16px] italic leading-8 text-text-lead">
              {{ t('guide.description') }}
            </view>
            <view class="mt-8 border-t border-border-soft pt-8 text-[16px] italic leading-8 text-text-lead">
              {{ t('guide.secondaryDescription') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'
import type { ContactGuideTag } from '@/components/contact/contact.types'

defineProps<{
  tags: ContactGuideTag[]
}>()

const { t } = usePageI18n('contact')
</script>

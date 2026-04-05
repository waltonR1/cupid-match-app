<template>
  <view class="bg-page-base">
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <view>
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
              {{ t('rules.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] lg:text-[66px]">
            {{ t('rules.title') }}
            <text class="text-brand-accent-strong"> {{ t('rules.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-text-lead">
            {{ t('rules.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-text-lead">
            {{ t('rules.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="grid gap-6 md:grid-cols-3">
            <view
              v-for="item in ruleTags"
              :key="item.title"
              class="border px-7 py-6 shadow-card"
              :class="item.accent
                ? 'border-border-accent-soft bg-brand-accent/10'
                : 'border-border-base bg-surface-panel'"
            >
              <view class="text-[22px] font-medium" :class="item.accent ? 'text-brand-accent-strong' : 'text-text-heading'">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[14px] italic leading-6 text-text-body-soft">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>

          <view class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <view class="border border-border-base bg-surface-card px-8 py-8 shadow-card">
              <view class="text-[20px] font-medium text-text-heading">
                {{ t('rules.processTitle') }}
              </view>

              <view class="mt-6 grid gap-4">
                <view class="flex gap-4 border-b border-border-light pb-4">
                  <view class="text-[26px] font-semibold text-brand-accent-strong">01</view>
                  <view class="text-[16px] leading-8 text-text-body">{{ t('rules.process1') }}</view>
                </view>

                <view class="flex gap-4 border-b border-border-light pb-4">
                  <view class="text-[26px] font-semibold text-brand-accent-strong">02</view>
                  <view class="text-[16px] leading-8 text-text-body">{{ t('rules.process2') }}</view>
                </view>

                <view class="flex gap-4">
                  <view class="text-[26px] font-semibold text-brand-accent-strong">03</view>
                  <view class="text-[16px] leading-8 text-text-body">{{ t('rules.process3') }}</view>
                </view>
              </view>
            </view>

            <view class="border border-border-membership-gold/50 bg-surface-card-soft px-8 py-8 shadow-card">
              <view class="text-[24px] leading-[1.7] text-text-heading">
                {{ t('rules.card1') }}
              </view>
              <view class="mt-5 text-[16px] italic leading-8 text-text-body-soft">
                {{ t('rules.card1Sub') }}
              </view>

              <view class="mt-8 h-px w-full bg-border-light" />

              <view class="mt-8 text-[24px] leading-[1.7] text-text-heading">
                {{ t('rules.card2') }}
              </view>
              <view class="mt-5 text-[16px] italic leading-8 text-text-body-soft">
                {{ t('rules.card2Sub') }}
              </view>

              <view
                class="mt-8 inline-flex cursor-pointer items-center justify-center rounded-button border border-button-neutral bg-transparent px-btn-cta-x py-btn-cta-y text-[15px] text-button-neutral transition-all duration-300 hover:-translate-y-[1px] hover:bg-surface-card-soft"
                role="button"
                @click="emit('openPlan', 'vip')"
              >
                {{ t('rules.finalCta') }}
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

const emit = defineEmits<{
  openPlan: [plan: string]
}>()

const { t } = usePageI18n('membership')

const ruleTags = [
  { title: 'rules.tag1.title', desc: 'rules.tag1.desc', accent: true },
  { title: 'rules.tag2.title', desc: 'rules.tag2.desc', accent: false },
  { title: 'rules.tag3.title', desc: 'rules.tag3.desc', accent: false },
]
</script>

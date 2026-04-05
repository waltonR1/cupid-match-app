<template>
  <view class="bg-page-soft">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
              {{ t('cases.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            <view class="inline-flex items-baseline gap-3">
              <text>{{ t('cases.title') }}</text>
              <text class="italic text-brand-accent-strong">& {{ t('cases.titleAccent') }}</text>
            </view>
          </view>

          <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-text-lead lg:text-[21px]">
            {{ t('cases.subtitle') }}
          </view>

          <view class="mt-10 border border-border-soft bg-surface-card-soft px-7 py-8 shadow-card">
            <view class="text-[12px] uppercase tracking-[5px] text-brand-support">
              {{ t('cases.deskLabel') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-text-body">
              {{ t(cards[0].desc) }}
            </view>
          </view>
        </view>

        <view class="grid gap-4">
          <view
            v-for="(item, index) in cards"
            :key="item.title"
            class="relative overflow-hidden grid gap-5 border px-8 py-8 shadow-card lg:grid-cols-[120px_1fr] lg:items-center"
            :class="cardClass(index)"
          >
            <view class="absolute inset-x-0 top-0 h-px" :class="lineClass(index)" />
            <view
              class="flex h-20 w-20 items-center justify-center rounded-full border text-[34px]"
              :class="iconClass(index)"
            >
              {{ item.icon }}
            </view>
            <view>
              <view class="text-[13px] uppercase tracking-[4px]" :class="indexClass(index)">
                {{ `0${index + 1}`.slice(-2) }}
              </view>
              <view class="mt-3 text-[28px] font-semibold text-text-heading">
                {{ t(item.title) }}
              </view>
              <view class="mt-4 text-[16px] leading-8 text-text-body">
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
import { usePageI18n } from '@/i18n/use-page-i18n'
import type { ContactCaseItem } from '@/components/contact/contact.types'

defineProps<{
  cards: ContactCaseItem[]
}>()

const { t } = usePageI18n('contact')

function cardClass(index: number) {
  if (index % 3 === 0) {
    return 'border-border-base bg-surface-base'
  }

  if (index % 3 === 1) {
    return 'border-border-base bg-surface-panel'
  }

  return 'border-border-accent/25 bg-brand-accent/10'
}

function lineClass(index: number) {
  if (index % 3 === 2) {
    return 'bg-brand-accent/65'
  }

  return 'bg-border-light/80'
}

function iconClass(index: number) {
  if (index % 3 === 0) {
    return 'border-border-soft bg-surface-card text-brand-support'
  }

  if (index % 3 === 1) {
    return 'border-border-base bg-surface-base text-brand-accent-strong'
  }

  return 'border-border-accent/35 bg-brand-accent/12 text-brand-accent-strong'
}

function indexClass(index: number) {
  if (index % 3 === 2) {
    return 'text-brand-accent-strong'
  }

  return 'text-brand-support'
}
</script>

<template>
  <view class="flex h-full min-h-[460px] flex-col border border-border-base bg-surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,24,18,0.08)]">
    <view class="flex items-start justify-between gap-4">
      <view class="flex min-w-0 items-center gap-4">
        <view class="flex h-14 w-14 items-center justify-center rounded-full border border-border-muted bg-surface-panel text-[20px] font-semibold text-surface-inverse-strong">
          {{ cardData.avatar }}
        </view>

        <view class="min-w-0">
          <view class="truncate text-[22px] font-semibold text-text-heading">
            {{ cardData.name }}
          </view>
          <view class="mt-1 text-[14px] text-text-body-soft">
            {{ cardData.meta }}
          </view>
        </view>
      </view>

      <view class="rounded-full bg-surface-panel px-3 py-1 text-[12px] text-brand-brown">
        {{ goalText }}
      </view>
    </view>

    <view class="mt-6 text-[15px] leading-7 text-text-body">
      {{ cardData.summary }}
    </view>

    <view class="mt-6 grid gap-3">
      <view class="flex items-start justify-between gap-4 border-b border-border-light pb-3 text-[14px]">
        <text class="text-text-muted">{{ cityLabel }}</text>
        <text class="text-right text-text-heading">{{ cardData.facts.city }}</text>
      </view>

      <view class="flex items-start justify-between gap-4 border-b border-border-light pb-3 text-[14px]">
        <text class="text-text-muted">{{ educationLabel }}</text>
        <text class="text-right text-text-heading">{{ cardData.facts.education }}</text>
      </view>

      <view class="flex items-start justify-between gap-4 border-b border-border-light pb-3 text-[14px]">
        <text class="text-text-muted">{{ languagesLabel }}</text>
        <text class="text-right text-text-heading">{{ cardData.facts.languages }}</text>
      </view>
    </view>

    <view class="mt-6 flex flex-wrap gap-2">
      <view
        v-for="tag in cardData.tags"
        :key="tag"
        class="rounded-full border border-border-base bg-surface-base px-3 py-1 text-[12px] text-text-body-soft"
      >
        {{ tag }}
      </view>
    </view>

    <view class="mt-auto pt-8 text-[13px] italic tracking-[2px] text-brand-rose-deep">
      {{ labelText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageI18n } from '@/i18n/use-page-i18n'
import type { AppLocale } from '@/i18n/types'
import { getLocalizedProfileCardData } from '@/mock/business'
import type { MockProfile } from '@/mock/business'

const props = defineProps<{
  profile: MockProfile
  locale: AppLocale
  cityLabel: string
  educationLabel: string
  languagesLabel: string
}>()

const { t } = usePageI18n('profiles')

const cardData = computed(() => getLocalizedProfileCardData(props.locale, props.profile))

const goalText = computed(() => {
  switch (cardData.value.goalCode) {
    case 'marriage':
      return t('card.goalMarriage')
    case 'exclusive':
      return t('card.goalExclusive')
    case 'cross_border':
      return t('card.goalCrossBorder')
    case 'serious':
    default:
      return t('card.goalSerious')
  }
})

const labelText = computed(() => {
  switch (cardData.value.status) {
    case 'review':
      return t('card.labelReview')
    case 'vip':
      return t('card.labelPriority')
    case 'open':
    default:
      return t('card.labelSelected')
  }
})
</script>

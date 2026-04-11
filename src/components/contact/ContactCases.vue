<template>
  <view class="bg-next-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-next-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-next-semantic-text-eyebrow">
              {{ t('cases.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight text-next-semantic-text-primary lg:text-[64px]">
            <view class="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <text>{{ t('cases.title') }}</text>
              <text class="whitespace-nowrap italic text-next-semantic-text-section-highlight">& {{ t('cases.titleAccent') }}</text>
            </view>
          </view>

          <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-next-semantic-text-lead lg:text-[21px]">
            {{ t('cases.subtitle') }}
          </view>

          <view class="mt-10 border border-next-semantic-border-soft bg-next-semantic-surface-soft px-7 py-8 shadow-next-shadow-panel">
            <view class="text-[12px] uppercase tracking-[5px] text-next-semantic-text-card-label">
              {{ t('cases.deskLabel') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-next-semantic-text-secondary">
              {{ t(cards[0].desc) }}
            </view>
          </view>
        </view>

        <view class="grid gap-4">
          <view
            v-for="(item, index) in cards"
            :key="item.title"
            class="relative grid gap-5 overflow-hidden border px-8 py-8 shadow-next-shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-next-shadow-emphasis lg:grid-cols-[120px_1fr] lg:items-center"
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
              <view class="mt-3 text-[28px] font-semibold text-next-semantic-text-primary">
                {{ t(item.title) }}
              </view>
              <view class="mt-4 text-[16px] leading-8 text-next-semantic-text-secondary">
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
import type { ContactCaseItem } from '@/components/contact/contact.types'

defineProps<{
  cards: ContactCaseItem[]
}>()

const { t } = usePageI18n('contact')

function cardClass(index: number) {
  if (index % 3 === 2) {
    return 'border-next-semantic-border-emphasis bg-next-semantic-surface-emphasis'
  }

  return 'border-next-semantic-border-soft bg-next-component-editorial-card-background hover:border-next-component-editorial-card-border-hover hover:bg-next-component-editorial-card-background-hover'
}

function lineClass(index: number) {
  if (index % 3 === 2) {
    return 'bg-next-semantic-border-emphasis-divider'
  }

  return 'bg-next-component-editorial-card-line'
}

function iconClass(index: number) {
  if (index % 3 === 2) {
    return 'border-next-semantic-border-emphasis bg-next-semantic-surface-emphasis text-next-component-contact-case-emphasis'
  }

  if (index % 3 === 1) {
    return 'border-next-semantic-border-default bg-next-semantic-surface-panel text-next-component-contact-case-default'
  }

  return 'border-next-semantic-border-soft bg-next-semantic-surface-soft text-next-component-contact-case-soft'
}

function indexClass(index: number) {
  if (index % 3 === 2) {
    return 'text-next-component-contact-case-emphasis'
  }

  return 'text-next-component-contact-case-soft'
}
</script>


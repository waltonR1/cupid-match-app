<template>
  <view class="bg-page-base">
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view class="max-w-[760px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-brand-highlight" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-brown">
              {{ t('info.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            <view class="inline-flex items-baseline gap-3">
              <text>{{ t('info.title') }}</text>
              <text class="italic text-brand-highlight-strong">& {{ t('info.titleAccent') }}</text>
            </view>
          </view>
        </view>

        <view class="max-w-[440px] text-[18px] italic leading-8 text-text-warm">
          {{ t('info.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-3">
        <view
          v-for="item in cards"
          :key="item.title"
          class="relative overflow-hidden border border-border-base bg-surface-base px-8 py-10 shadow-card"
        >
          <view class="absolute inset-x-0 top-0 h-px bg-border-light/80" />
          <view class="flex items-center justify-between gap-4">
            <view class="text-[32px]">{{ item.icon }}</view>
            <view class="text-[13px] uppercase tracking-[4px] text-brand-brown">
              {{ t('info.cardLabel') }}
            </view>
          </view>
          <view class="mt-6 text-[30px] font-semibold text-text-heading">
            {{ t(item.title) }}
          </view>
          <view class="mt-5 text-[16px] leading-8 text-text-body">
            {{ t(item.desc) }}
          </view>
          <view class="mt-6 border-t border-border-soft pt-5 text-[16px] font-medium text-text-heading">
            {{ t(item.value, { email }) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'
import type { ContactCardItem } from '@/components/contact/contact.types'

defineProps<{
  cards: ContactCardItem[]
  email: string
}>()

const { t } = usePageI18n('contact')
</script>

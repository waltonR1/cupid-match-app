<template>
  <view class="relative overflow-hidden bg-events-hero text-text-inverse">
    <view class="pointer-events-none absolute left-[-48px] top-[-32px] h-[220px] w-[220px] rounded-full bg-brand-highlight/10 blur-[84px]" />

    <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-12 lg:min-h-[560px] lg:grid-cols-[1fr_0.94fr] lg:items-start">
        <view class="max-w-[680px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/34 px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-brand-highlight" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-highlight-soft">
              {{ t('hero.eyebrow') }}
            </text>
          </view>

          <view class="mt-1">
            <view class="text-[52px] font-semibold leading-[1.02] text-text-inverse lg:text-[86px]">
              {{ t('hero.title') }}
            </view>
            <view class="mt-4 text-[32px] italic leading-[1.08] text-brand-highlight-strong lg:text-[58px]">
              {{ t('hero.titleAccent') }}
            </view>
          </view>

          <view class="mt-10 max-w-[620px] text-[19px] leading-8 text-text-inverse-soft lg:text-[20px]">
            {{ t('hero.description') }}
          </view>

          <view class="mt-5 max-w-[620px] text-[17px] italic leading-8 text-text-inverse-muted lg:text-[18px]">
            {{ t('hero.secondaryDescription') }}
          </view>

          <view class="mt-12 flex justify-start">
            <button
              class="[margin-left:0] [margin-right:0] inline-flex min-w-btn-cta items-center justify-center self-start rounded-button border border-button-highlight bg-button-highlight px-btn-cta-x py-btn-cta-y text-[16px] font-medium text-button-neutral-ink transition-all duration-300 hover:-translate-y-[1px] hover:border-button-highlight-hover hover:bg-button-highlight-hover hover:shadow-card"
              @click="emit('primaryAction')"
            >
              {{ t('hero.actions.primary') }}
            </button>
          </view>
        </view>

        <view class="grid gap-5 lg:ml-auto lg:max-w-[480px]">
          <view
            v-for="item in cards"
            :key="item.title"
            class="border border-border-inverse/32 bg-surface-inverse-panel/34 px-6 py-6 shadow-card backdrop-blur"
          >
            <view class="flex items-center gap-4">
              <view class="text-[28px]">{{ item.icon }}</view>
              <view class="text-[18px] font-medium text-brand-highlight">
                {{ t(item.title) }}
              </view>
            </view>
            <view class="mt-4 text-[17px] leading-8 text-text-inverse-soft">
              {{ t(item.desc) }}
            </view>
            <view class="mt-6 text-[18px] font-medium text-text-inverse">
              {{ t(item.value, { email }) }}
            </view>
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

const emit = defineEmits<{
  primaryAction: []
}>()

const { t } = usePageI18n('contact')
</script>

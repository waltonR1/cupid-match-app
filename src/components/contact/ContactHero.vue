<template>
  <view class="relative overflow-hidden bg-gradient-contact-hero text-semantic-text-inverse">
    <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-12 lg:min-h-[560px] lg:grid-cols-[1fr_0.94fr] lg:items-start">
        <view class="max-w-[680px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-semantic-border-hero bg-semantic-surface-hero-soft px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-hero-eyebrow">
              {{ t('hero.eyebrow') }}
            </text>
          </view>

          <view class="mt-1">
            <view class="text-[52px] font-semibold leading-[1.02] text-semantic-text-inverse lg:text-[86px]">
              {{ t('hero.title') }}
            </view>
            <view class="mt-4 text-[32px] italic leading-[1.08] text-semantic-text-hero-highlight lg:text-[58px]">
              {{ t('hero.titleAccent') }}
            </view>
          </view>

          <view class="mt-10 max-w-[620px] text-[19px] leading-8 text-semantic-text-hero-body lg:text-[20px]">
            {{ t('hero.description') }}
          </view>

          <view class="mt-5 max-w-[620px] text-[17px] italic leading-8 text-semantic-text-hero-secondary lg:text-[18px]">
            {{ t('hero.secondaryDescription') }}
          </view>

          <view class="mt-10 flex justify-start">
            <AppButton
              variant="primary"
              size="lg"
              width="cta"
              class="[margin-left:0] [margin-right:0] self-start"
              @click="emit('primaryAction')"
            >
              {{ t('hero.actions.primary') }}
            </AppButton>
          </view>
        </view>

        <view class="grid gap-5 lg:ml-auto lg:max-w-[480px]">
          <view
            v-for="item in cards"
            :key="item.title"
            class="border border-semantic-border-hero bg-semantic-surface-hero-soft px-6 py-6 shadow-about-hero-panel backdrop-blur"
          >
            <view class="flex items-center gap-4">
              <view class="text-[28px]">{{ item.icon }}</view>
              <view class="text-[18px] font-medium text-semantic-text-hero-label">
                {{ t(item.title) }}
              </view>
            </view>
            <view class="mt-4 text-[17px] leading-8 text-semantic-text-hero-body">
              {{ t(item.desc) }}
            </view>
            <view class="mt-6 text-[18px] font-medium text-semantic-text-inverse">
              {{ t(item.value, { email }) }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { ContactCardItem } from '@/types/view-models/contact'

defineProps<{
  cards: ContactCardItem[]
  email: string
}>()

const emit = defineEmits<{
  primaryAction: []
}>()

const { t } = usePageI18n('contact')
</script>


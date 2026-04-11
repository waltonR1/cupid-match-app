<template>
  <view class="bg-next-semantic-page-default text-next-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <view>
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-next-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-next-semantic-text-eyebrow">
              {{ t('rules.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] text-next-semantic-text-primary lg:text-[66px]">
            {{ t('rules.title') }}
            <text class="text-next-semantic-text-section-highlight"> {{ t('rules.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-next-semantic-text-lead">
            {{ t('rules.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-next-semantic-text-lead">
            {{ t('rules.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="grid gap-6 md:grid-cols-3">
            <view
              v-for="item in ruleTags"
              :key="item.title"
              class="border px-7 py-6"
              :class="item.emphasis
                ? 'border-next-semantic-border-emphasis bg-next-semantic-surface-emphasis shadow-next-shadow-emphasis'
                : 'border-next-semantic-border-default bg-next-component-editorial-card-background shadow-next-shadow-panel hover:border-next-component-editorial-card-border-hover hover:bg-next-component-editorial-card-background-hover'"
            >
              <view class="text-[22px] font-medium" :class="item.emphasis ? 'text-next-component-membership-rule-emphasis' : 'text-next-semantic-text-primary'">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[14px] italic leading-6 text-next-semantic-text-secondary">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>

          <view class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-8 py-8 shadow-next-shadow-panel">
              <view class="text-[20px] font-medium text-next-semantic-text-primary">
                {{ t('rules.processTitle') }}
              </view>

              <view class="mt-6 grid gap-4">
                <view class="flex gap-4 border-b border-next-semantic-border-divider pb-4">
                  <view class="text-[26px] font-semibold text-next-component-membership-rule-emphasis">01</view>
                  <view class="text-[16px] leading-8 text-next-semantic-text-secondary">{{ t('rules.process1') }}</view>
                </view>

                <view class="flex gap-4 border-b border-next-semantic-border-divider pb-4">
                  <view class="text-[26px] font-semibold text-next-component-membership-rule-emphasis">02</view>
                  <view class="text-[16px] leading-8 text-next-semantic-text-secondary">{{ t('rules.process2') }}</view>
                </view>

                <view class="flex gap-4">
                  <view class="text-[26px] font-semibold text-next-component-membership-rule-emphasis">03</view>
                  <view class="text-[16px] leading-8 text-next-semantic-text-secondary">{{ t('rules.process3') }}</view>
                </view>
              </view>
            </view>

            <view class="border border-next-semantic-border-emphasis bg-next-semantic-surface-emphasis px-8 py-8 shadow-next-shadow-emphasis">
              <view class="text-[24px] leading-[1.7] text-next-semantic-text-primary">
                {{ t('rules.card1') }}
              </view>
              <view class="mt-5 text-[16px] italic leading-8 text-next-semantic-text-secondary">
                {{ t('rules.card1Sub') }}
              </view>

              <view class="mt-8 h-px w-full bg-next-semantic-border-emphasis-divider" />

              <view class="mt-8 text-[24px] leading-[1.7] text-next-semantic-text-primary">
                {{ t('rules.card2') }}
              </view>
              <view class="mt-5 text-[16px] italic leading-8 text-next-semantic-text-secondary">
                {{ t('rules.card2Sub') }}
              </view>

              <AppButton
                variant="primary"
                size="lg"
                width="cta"
                rounded="none"
                class="mt-8"
                @click="emit('openPlan', 'vip')"
              >
                {{ t('rules.finalCta') }}
              </AppButton>
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

const emit = defineEmits<{
  openPlan: [plan: string]
}>()

const { t } = usePageI18n('membership')

const ruleTags = [
  { title: 'rules.tag1.title', desc: 'rules.tag1.desc', emphasis: true },
  { title: 'rules.tag2.title', desc: 'rules.tag2.desc', emphasis: false },
  { title: 'rules.tag3.title', desc: 'rules.tag3.desc', emphasis: false },
]
</script>


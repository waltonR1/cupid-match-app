<template>
  <view class="relative overflow-hidden bg-gradient-about-hero text-semantic-text-inverse">
    <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-14 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <view class="relative z-10 max-w-[720px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-semantic-border-hero bg-semantic-surface-hero-soft px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-hero-eyebrow">
              {{ t('hero.eyebrow') }}
            </text>
          </view>

          <view class="max-w-[640px] text-[52px] font-semibold leading-[1.02] text-semantic-text-inverse lg:text-[92px]">
            {{ t('hero.title') }}
          </view>

          <view class="mt-4 text-[32px] italic leading-[1.05] text-semantic-text-hero-highlight lg:text-[62px]">
            {{ t('hero.titleAccent') }}
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] leading-8 text-semantic-text-hero-body lg:text-[21px]">
            {{ t('hero.description') }}
          </view>

          <view class="mt-5 max-w-[620px] text-[17px] italic leading-8 text-semantic-text-hero-secondary lg:text-[18px]">
            {{ t('hero.secondaryDescription') }}
          </view>

          <view class="mt-12 grid gap-4 sm:grid-cols-2">
            <view
                v-for="item in audienceCards.slice(0, 2)"
                :key="item.title"
                class="border border-semantic-border-hero bg-semantic-surface-hero-soft px-6 py-5 backdrop-blur"
            >
              <view class="text-[13px] uppercase tracking-[4px] text-semantic-text-hero-label">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[15px] leading-7 text-semantic-text-hero-body">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="relative">
          <view class="pointer-events-none absolute right-0 top-[-36px] text-[118px] font-semibold tracking-[10px] text-component-about-hero-ghost-title lg:text-[180px]">
            PARIS
          </view>

          <view class="grid gap-6 lg:ml-auto lg:max-w-[460px]">
            <view class="border border-semantic-border-hero bg-semantic-surface-hero-panel px-8 py-8 shadow-about-hero-panel backdrop-blur">
              <view class="text-[13px] uppercase tracking-[4px] text-semantic-text-hero-label">Positioning</view>
              <view class="mt-5 text-[28px] leading-[1.6] text-semantic-text-inverse">
                {{ t('hero.card1') }}
              </view>
            </view>

            <view class="border border-semantic-border-hero bg-semantic-surface-hero-panel px-8 py-8 text-semantic-text-inverse shadow-about-hero-feature lg:ml-14">
              <view class="text-[13px] uppercase tracking-[4px] text-semantic-text-hero-label">Approach</view>
              <view class="mt-5 text-[28px] leading-[1.6] text-semantic-text-inverse">
                {{ t('hero.card2') }}
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

const { t } = usePageI18n('about')

const audienceCards = [
  { icon: '\uD83C\uDF93', title: 'audience.card1.title', desc: 'audience.card1.desc' },
  { icon: '\uD83C\uDF0D', title: 'audience.card2.title', desc: 'audience.card2.desc' },
  { icon: '\uD83E\uDD0D', title: 'audience.card3.title', desc: 'audience.card3.desc' },
  { icon: '\u2728', title: 'audience.card4.title', desc: 'audience.card4.desc' },
]
</script>


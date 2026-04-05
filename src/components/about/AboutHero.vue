<template>
  <view class="relative overflow-hidden bg-events-hero text-text-inverse">
    <view class="pointer-events-none absolute left-[-56px] top-[-40px] h-[220px] w-[220px] rounded-full bg-brand-accent/10 blur-[82px]" />

    <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-14 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <view class="relative z-10 max-w-[720px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/34 px-5 py-2 backdrop-blur">
            <view class="h-[1px] w-12 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[6px] text-brand-accent-soft">
              {{ t('hero.eyebrow') }}
            </text>
          </view>

          <view class="max-w-[640px] text-[52px] font-semibold leading-[1.02] text-text-inverse lg:text-[92px]">
            {{ t('hero.title') }}
          </view>

          <view class="mt-4 text-[32px] italic leading-[1.05] text-brand-accent-strong lg:text-[62px]">
            {{ t('hero.titleAccent') }}
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] leading-8 text-text-inverse-soft lg:text-[21px]">
            {{ t('hero.description') }}
          </view>

          <view class="mt-5 max-w-[620px] text-[17px] italic leading-8 text-text-inverse-muted lg:text-[18px]">
            {{ t('hero.secondaryDescription') }}
          </view>

          <view class="mt-12 grid gap-4 sm:grid-cols-2">
            <view
                v-for="item in audienceCards.slice(0, 2)"
                :key="item.title"
                class="border border-border-inverse/32 bg-surface-inverse-panel/34 px-6 py-5 backdrop-blur"
            >
              <view class="text-[13px] uppercase tracking-[4px] text-brand-accent-soft">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[15px] leading-7 text-text-inverse-soft">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="relative">
          <view class="pointer-events-none absolute right-0 top-[-36px] text-[118px] font-semibold tracking-[10px] text-text-inverse/5 lg:text-[180px]">
            PARIS
          </view>

          <view class="grid gap-6 lg:ml-auto lg:max-w-[460px]">
            <view class="border border-border-inverse/34 bg-surface-inverse-panel/76 px-8 py-8 shadow-card backdrop-blur">
              <view class="text-[13px] uppercase tracking-[4px] text-brand-accent">Positioning</view>
              <view class="mt-5 text-[28px] leading-[1.6] text-text-inverse">
                {{ t('hero.card1') }}
              </view>
            </view>

            <view class="border border-brand-accent/32 bg-surface-inverse-card/72 px-8 py-8 text-text-inverse shadow-hero lg:ml-14">
              <view class="text-[13px] uppercase tracking-[4px] text-brand-accent-soft">Approach</view>
              <view class="mt-5 text-[28px] leading-[1.6] text-text-inverse">
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
import { usePageI18n } from '@/i18n/use-page-i18n'

const { t } = usePageI18n('about')

const audienceCards = [
  { icon: '🎓', title: 'audience.card1.title', desc: 'audience.card1.desc' },
  { icon: '🌍', title: 'audience.card2.title', desc: 'audience.card2.desc' },
  { icon: '🤍', title: 'audience.card3.title', desc: 'audience.card3.desc' },
  { icon: '✨', title: 'audience.card4.title', desc: 'audience.card4.desc' }
]
</script>

<template>
  <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_52%,#102842_100%)] text-white">
    <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,25,52,0.22),transparent_52%)]" />
    <view class="absolute right-[-120px] top-16 h-[320px] w-[320px] rounded-full border border-white/10" />

    <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
      <view class="grid gap-14 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <view class="relative z-10 max-w-[720px]">
          <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
            <view class="h-[1px] w-12 bg-[#d7b86e]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#e8d7bc]">
              {{ t('hero.eyebrow') }}
            </text>
          </view>

          <view class="max-w-[640px] text-[52px] font-semibold leading-[1.02] text-[#fffaf3] lg:text-[92px]">
            {{ t('hero.title') }}
          </view>

          <view class="mt-4 text-[32px] italic leading-[1.05] text-[#d7b86e] lg:text-[62px]">
            {{ t('hero.titleAccent') }}
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] leading-8 text-[#efe2cf] lg:text-[21px]">
            {{ t('hero.description') }}
          </view>

          <view class="mt-5 max-w-[620px] text-[17px] italic leading-8 text-white/60 lg:text-[18px]">
            {{ t('hero.secondaryDescription') }}
          </view>

          <view class="mt-12 grid gap-4 sm:grid-cols-2">
            <view
                v-for="item in audienceCards.slice(0, 2)"
                :key="item.title"
                class="border border-white/10 bg-white/5 px-6 py-5 backdrop-blur"
            >
              <view class="text-[13px] uppercase tracking-[4px] text-[#ffb3bf]">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[15px] leading-7 text-[#efe5d7]">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>
        </view>

        <view class="relative">
          <view class="pointer-events-none absolute right-0 top-[-36px] text-[118px] font-semibold tracking-[10px] text-white/5 lg:text-[180px]">
            PARIS
          </view>

          <view class="grid gap-6 lg:ml-auto lg:max-w-[460px]">
            <view class="border border-[#d7b86e]/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] px-8 py-8 backdrop-blur">
              <view class="text-[13px] uppercase tracking-[4px] text-[#d7b86e]">Positioning</view>
              <view class="mt-5 text-[28px] leading-[1.6] text-white">
                {{ t('hero.card1') }}
              </view>
            </view>

            <view class="border border-[#f06b82]/40 bg-[#d71934] px-8 py-8 text-white shadow-[0_30px_80px_rgba(164,17,46,0.28)] lg:ml-14">
              <view class="text-[13px] uppercase tracking-[4px] text-[#ffd5dd]">Approach</view>
              <view class="mt-5 text-[28px] leading-[1.6]">
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
<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.about"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <!-- Hero -->
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

    <!-- 品牌起点 -->
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-20 lg:grid-cols-[1.02fr_0.98fr]">
        <view>
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
              {{ t('origin.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] lg:text-[66px]">
            {{ t('origin.title') }}
            <text class="text-[#d71934]">{{ t('origin.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-[#8b6e4d]">
            {{ t('origin.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-[#8b6e4d]">
            {{ t('origin.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="border border-[#e2d7c9] bg-[#efe7d8] px-8 py-8">
            <view class="text-[18px] uppercase tracking-[5px] text-[#cf9aa0]">Paris</view>
            <view class="mt-4 text-[28px] font-semibold text-[#1f1f1f]">
              {{ t('origin.card1.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-[#6b5c4d]">
              {{ t('origin.card1.desc') }}
            </view>
          </view>

          <view class="border border-[#21344b] bg-[#203854] px-8 py-8 text-white">
            <view class="text-[18px] uppercase tracking-[5px] text-[#d7b86e]">Global</view>
            <view class="mt-4 text-[28px] font-semibold text-[#fffaf2]">
              {{ t('origin.card2.title') }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-[#ecdfcf]">
              {{ t('origin.card2.desc') }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 面向谁 -->
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-12">
        <view class="mb-5 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-[#d08e92]" />
          <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
            {{ t('audience.eyebrow') }}
          </text>
        </view>

        <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
          {{ t('audience.title') }}
          <text class="italic text-[#d71934]">& {{ t('audience.titleAccent') }}</text>
        </view>

        <view class="mt-5 max-w-[780px] text-[19px] italic leading-8 text-[#8c6b49] lg:text-[21px]">
          {{ t('audience.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-4">
        <view
            v-for="(item, index) in audienceCards"
            :key="item.title"
            class="px-7 py-8"
            :class="index === 0 ? 'bg-[#1c2736] text-white lg:translate-y-10' : index === 1 ? 'bg-white' : index === 2 ? 'bg-[#f2e4d7]' : 'bg-[#d71934] text-white lg:-translate-y-6'"
        >
          <view class="text-[40px]">{{ item.icon }}</view>
          <view class="mt-8 text-[28px] font-semibold leading-[1.25]" :class="index === 0 || index === 3 ? 'text-white' : 'text-[#1f1f1f]'">
            {{ t(item.title) }}
          </view>
          <view class="mt-5 text-[16px] leading-8" :class="index === 0 || index === 3 ? 'text-white/78' : 'text-[#6c5c4d]'">
            {{ t(item.desc) }}
          </view>
        </view>
      </view>
    </view>

    <!-- 与普通相亲平台的不同 -->
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <view class="lg:sticky lg:top-24 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
              {{ t('difference.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('difference.title') }}
            <text class="italic text-[#d71934]">& {{ t('difference.titleAccent') }}</text>
          </view>

          <view class="mt-5 max-w-[420px] text-[19px] italic leading-8 text-[#8c6b49] lg:text-[21px]">
            {{ t('difference.subtitle') }}
          </view>

          <view class="mt-10 border border-[#e3d5c4] bg-[#fbf6ed] px-7 py-8">
            <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">Editorial Note</view>
            <view class="mt-4 text-[17px] leading-8 text-[#6d5a48]">
              {{ t(differenceCards[0].desc) }}
            </view>
          </view>
        </view>

        <view class="grid gap-6 lg:grid-cols-2">
          <view
              class="border border-[#1f3047] bg-[#1f3047] px-9 py-10 text-white shadow-[0_24px_60px_rgba(18,35,56,0.12)] lg:translate-y-10"
          >
            <view class="text-[15px] uppercase tracking-[5px] text-[#d7b86e]">
              {{ differenceCards[0].index }}
            </view>
            <view class="mt-6 text-[34px] font-semibold leading-[1.2] text-[#fffaf2]">
              {{ t(differenceCards[0].title) }}
            </view>
            <view class="mt-6 text-[17px] leading-8 text-[#ecdfcf]">
              {{ t(differenceCards[0].desc) }}
            </view>
          </view>

          <view class="grid gap-6">
            <view
                class="border border-[#e2d7c9] bg-white px-8 py-9"
            >
              <view class="text-[15px] uppercase tracking-[5px] text-[#cf9aa0]">
                {{ differenceCards[1].index }}
              </view>
              <view class="mt-5 text-[30px] font-semibold text-[#1f1f1f]">
                {{ t(differenceCards[1].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
                {{ t(differenceCards[1].desc) }}
              </view>
            </view>

            <view
                class="border border-[#d71934]/20 bg-[#f4e0de] px-8 py-9 lg:ml-10"
            >
              <view class="text-[15px] uppercase tracking-[5px] text-[#b96373]">
                {{ differenceCards[2].index }}
              </view>
              <view class="mt-5 text-[30px] font-semibold text-[#1f1f1f]">
                {{ t(differenceCards[2].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
                {{ t(differenceCards[2].desc) }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 平台价值观 -->
    <view class="bg-[#f3ede3]">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-10 lg:grid-cols-[1.06fr_0.94fr]">
          <view class="grid gap-6">
            <view class="border border-[#1f3047] bg-[#1f3047] px-9 py-10 text-white">
              <view class="mb-5 inline-flex items-center gap-4">
                <view class="h-[1px] w-16 bg-[#d7b86e]" />
                <text class="text-[12px] uppercase tracking-[6px] text-[#e7d5b1]">
                  {{ t('values.eyebrow') }}
                </text>
              </view>

              <view class="text-[44px] font-semibold leading-tight lg:text-[62px]">
                {{ t('values.title') }}
                <text class="italic text-[#d7b86e]">& {{ t('values.titleAccent') }}</text>
              </view>

              <view class="mt-6 max-w-[560px] text-[19px] italic leading-8 text-[#ecdfcf] lg:text-[20px]">
                {{ t('values.subtitle') }}
              </view>
            </view>

            <view class="grid gap-6 md:grid-cols-2">
              <view
                  v-for="item in valueCards.slice(0, 2)"
                  :key="item.title"
                  class="border border-[#e0d4c5] bg-[#faf6ee] px-8 py-9"
              >
                <view class="text-[32px]">{{ item.icon }}</view>
                <view class="mt-6 text-[28px] font-semibold text-[#1f1f1f]">
                  {{ t(item.title) }}
                </view>
                <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
                  {{ t(item.desc) }}
                </view>
              </view>
            </view>
          </view>

          <view class="grid gap-6">
            <view class="border border-[#d71934]/20 bg-[#f8edea] px-8 py-9 lg:mr-12">
              <view class="text-[32px]">{{ valueCards[2].icon }}</view>
              <view class="mt-6 text-[30px] font-semibold text-[#1f1f1f]">
                {{ t(valueCards[2].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
                {{ t(valueCards[2].desc) }}
              </view>
            </view>

            <view class="border border-[#d7b86e]/40 bg-[#d7b86e] px-8 py-9 text-[#1f3047] lg:ml-12">
              <view class="text-[32px]">{{ valueCards[3].icon }}</view>
              <view class="mt-6 text-[30px] font-semibold">
                {{ t(valueCards[3].title) }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-[#3c3428]">
                {{ t(valueCards[3].desc) }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const { t } = usePageI18n('about')
const navList = NAV_LIST

const audienceCards = [
  { icon: '🎓', title: 'audience.card1.title', desc: 'audience.card1.desc' },
  { icon: '🌍', title: 'audience.card2.title', desc: 'audience.card2.desc' },
  { icon: '🤍', title: 'audience.card3.title', desc: 'audience.card3.desc' },
  { icon: '✨', title: 'audience.card4.title', desc: 'audience.card4.desc' }
]

const differenceCards = [
  { index: '01', title: 'difference.card1.title', desc: 'difference.card1.desc' },
  { index: '02', title: 'difference.card2.title', desc: 'difference.card2.desc' },
  { index: '03', title: 'difference.card3.title', desc: 'difference.card3.desc' }
]

const valueCards = [
  { icon: '🤝', title: 'values.card1.title', desc: 'values.card1.desc' },
  { icon: '🎩', title: 'values.card2.title', desc: 'values.card2.desc' },
  { icon: '💎', title: 'values.card3.title', desc: 'values.card3.desc' },
  { icon: '🕰️', title: 'values.card4.title', desc: 'values.card4.desc' }
]

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>


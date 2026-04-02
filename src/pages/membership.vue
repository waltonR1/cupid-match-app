<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.membership"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <!-- Hero -->
    <view class="relative overflow-hidden bg-[#14171d] text-white">
      <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.26),transparent_56%)]" />
      <view class="absolute right-[-120px] top-12 h-[320px] w-[320px] rounded-full border border-white/10" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:min-h-[620px] lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <view class="max-w-[620px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#eeddb5]">
                {{ t('hero.eyebrow') }}
              </text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-[#fffdf8] lg:text-[90px]">
              {{ t('hero.title') }}
            </view>

            <view class="mt-4 text-[32px] italic leading-[1.08] text-[#d7b86e] lg:text-[58px]">
              {{ t('hero.titleAccent') }}
            </view>

            <view class="mt-10 max-w-[600px] text-[19px] leading-8 text-[#ebe4d8] lg:text-[20px]">
              {{ t('hero.description') }}
            </view>

            <view class="mt-5 max-w-[620px] text-[17px] italic leading-8 text-white/60 lg:text-[18px]">
              {{ t('hero.secondaryDescription') }}
            </view>
          </view>

          <view class="grid gap-5 lg:ml-auto lg:max-w-[520px]">
            <view class="grid gap-5 md:grid-cols-2">
              <view class="border border-white/10 bg-white/5 px-6 py-7">
                <view class="text-[13px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('heroCards.freeLabel') }}</view>
                <view class="mt-4 text-[34px] font-semibold">{{ t('free.price') }}</view>
                <view class="mt-3 text-[16px] leading-7 text-white/70">{{ t('free.title') }}</view>
              </view>
              <view class="border border-[#d7b86e]/40 bg-[#203854] px-6 py-7">
                <view class="text-[13px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('heroCards.silverLabel') }}</view>
                <view class="mt-4 text-[34px] font-semibold text-[#f2d690]">{{ t('silver.price') }}</view>
                <view class="mt-3 text-[16px] leading-7 text-white/70">{{ t('silver.period') }}</view>
              </view>
            </view>

            <view class="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
              <view class="border border-[#d7b86e] bg-[#d7b86e] px-6 py-7 text-[#182739]">
                <view class="text-[13px] uppercase tracking-[4px] text-[#6d5328]">{{ t('heroCards.goldLabel') }}</view>
                <view class="mt-4 text-[38px] font-semibold">{{ t('gold.price') }}</view>
                <view class="mt-3 text-[16px] leading-7 text-[#3c3428]">{{ t('gold.period') }}</view>
              </view>
              <view class="border border-[#d71934] bg-[#d71934] px-6 py-7 text-white shadow-[0_24px_60px_rgba(164,17,46,0.28)]">
                <view class="text-[13px] uppercase tracking-[4px] text-[#ffd5dd]">{{ t('heroCards.diamondLabel') }}</view>
                <view class="mt-4 text-[38px] font-semibold">{{ t('diamond.price') }}</view>
                <view class="mt-3 text-[16px] leading-7 text-white/78">{{ t('diamond.period') }}</view>
              </view>
            </view>

            <view class="border border-white/10 px-6 py-6 text-[16px] leading-8 text-white/70">
              {{ t('hero.card1') }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 免费 vs VIP -->
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view class="max-w-[720px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
              {{ t('compare.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('compare.title') }}
            <text class="italic text-[#d71934]">& {{ t('compare.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] italic leading-8 text-[#7b6d60]">
          {{ t('compare.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <view class="border border-[#ddd6c8] bg-[#faf7f1] px-8 py-10">
          <view class="text-[13px] uppercase tracking-[5px] text-[#9b907f]">{{ t('free.badge') }}</view>
          <view class="mt-5 text-[40px] font-semibold text-[#1f1f1f]">
            {{ t('free.title') }}
          </view>
          <view class="mt-8 text-[34px] font-semibold text-[#1f1f1f]">
            {{ t('free.price') }}
            <text class="text-[18px] font-normal text-[#7f7669]"> {{ t('free.priceNote') }}</text>
          </view>
          <view class="mt-8 space-y-3 text-[16px] leading-8 text-[#4e463d]">
            <view>• {{ t('free.f1') }}</view>
            <view>• {{ t('free.f2') }}</view>
            <view>• {{ t('free.f3') }}</view>
            <view>• {{ t('free.f4') }}</view>
          </view>
          <button class="mt-10 w-full border border-[#1f1f1f] px-4 py-3 text-[16px] text-[#1f1f1f]" @click="openPlan('free')">
            {{ t('free.cta') }}
          </button>
        </view>

        <view class="border border-[#1f3047] bg-[#1f3047] px-8 py-10 text-white shadow-[0_20px_50px_rgba(22,41,65,0.12)]">
          <view class="flex flex-wrap items-center justify-between gap-4">
            <view>
              <view class="text-[13px] uppercase tracking-[5px] text-[#d7b86e]">
                {{ t('vip.label') }}
              </view>
              <view class="mt-4 text-[38px] font-semibold text-[#fffaf2]">
                {{ t('vip.title') }}
              </view>
            </view>

            <view class="rounded-full border border-[#d7b86e] px-4 py-2 text-[13px] text-[#f3dfb2]">
              {{ t('vip.badge') }}
            </view>
          </view>

          <view class="mt-10 grid gap-8 xl:grid-cols-2">
            <view>
              <view class="text-[18px] font-medium text-[#d7b86e]">
                {{ t('vip.onlineTitle') }}
              </view>
              <view class="mt-5 space-y-3 text-[16px] leading-8 text-[#ecdfcf]">
                <view>• {{ t('vip.online.f1') }}</view>
                <view>• {{ t('vip.online.f2') }}</view>
                <view>• {{ t('vip.online.f3') }}</view>
                <view>• {{ t('vip.online.f4') }}</view>
              </view>
            </view>

            <view class="border border-white/10 bg-white/5 px-6 py-6">
              <view class="text-[18px] font-medium text-[#d7b86e]">
                {{ t('vip.offlineTitle') }}
              </view>
              <view class="mt-5 space-y-3 text-[16px] leading-8 text-[#ecdfcf]">
                <view>• {{ t('vip.offline.f1') }}</view>
                <view>• {{ t('vip.offline.f2') }}</view>
                <view>• {{ t('vip.offline.f3') }}</view>
                <view>• {{ t('vip.offline.f4') }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 三档VIP -->
    <view class="bg-[#f3ede3]">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <view class="lg:sticky lg:top-24 lg:self-start">
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-[#d08e92]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
                {{ t('tiers.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
              {{ t('tiers.title') }}
              <text class="italic text-[#d71934]">& {{ t('tiers.titleAccent') }}</text>
            </view>

            <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-[#8c6b49] lg:text-[21px]">
              {{ t('tiers.subtitle') }}
            </view>

            <button class="mt-10 min-w-[210px] border border-[#1f3047] px-6 py-4 text-[16px] text-[#1f3047]" @click="openPlan('vip')">
              {{ t('tiers.cta') }}
            </button>
          </view>

          <view class="grid gap-6">
            <view class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <view class="border border-[#dbcdb6] bg-[#fbf7ef] px-8 py-10 text-[#2d241d] xl:translate-y-12">
                <view class="text-[13px] uppercase tracking-[5px] text-[#b08b4f]">{{ t('silver.badge') }}</view>
                <view class="mt-5 text-[40px] font-semibold text-[#8b6a36]">
                  {{ t('silver.title') }}
                </view>
                <view class="mt-8 text-[34px] font-semibold">
                  {{ t('silver.price') }}
                  <text class="text-[20px] font-normal text-[#7d7367]"> {{ t('silver.priceNote') }}</text>
                </view>
                <view class="mt-2 text-[15px] italic text-[#8a7a67]">
                  {{ t('silver.period') }}
                </view>
                <view class="mt-8 space-y-3 text-[16px] leading-8">
                  <view>• {{ t('silver.f1') }}</view>
                  <view>• {{ t('silver.f2') }}</view>
                  <view>• {{ t('silver.f3') }}</view>
                </view>
              </view>

              <view class="border border-[#d7b86e] bg-[#203854] px-8 py-10 text-white shadow-[0_20px_50px_rgba(22,41,65,0.12)]">
                <view class="flex items-start justify-between gap-4">
                  <view>
                    <view class="text-[13px] uppercase tracking-[5px] text-[#d7b86e]">{{ t('gold.badge') }}</view>
                    <view class="mt-5 text-[40px] font-semibold text-[#f4d27f]">
                      {{ t('gold.title') }}
                    </view>
                  </view>
                  <view class="rounded-full border border-[#d7b86e] px-4 py-2 text-[12px] uppercase tracking-[3px] text-[#f3dfb2]">
                    {{ t('tiers.popular') }}
                  </view>
                </view>
                <view class="mt-8 text-[34px] font-semibold">
                  {{ t('gold.price') }}
                  <text class="text-[20px] font-normal text-white/70"> {{ t('gold.priceNote') }}</text>
                </view>
                <view class="mt-2 text-[15px] italic text-white/70">
                  {{ t('gold.period') }}
                </view>
                <view class="mt-8 grid gap-4 md:grid-cols-3">
                  <view class="border border-white/10 bg-white/5 px-4 py-4 text-[14px] leading-6 text-[#f0e6d8]">
                    {{ t('gold.f1') }}
                  </view>
                  <view class="border border-white/10 bg-white/5 px-4 py-4 text-[14px] leading-6 text-[#f0e6d8]">
                    {{ t('gold.f2') }}
                  </view>
                  <view class="border border-white/10 bg-white/5 px-4 py-4 text-[14px] leading-6 text-[#f0e6d8]">
                    {{ t('gold.f3') }}
                  </view>
                </view>
              </view>
            </view>

            <view class="border border-[#d90429] bg-[#d90429] px-8 py-10 text-white lg:ml-20">
              <view class="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-center">
                <view>
                  <view class="text-[13px] uppercase tracking-[5px] text-[#ffd5dc]">{{ t('diamond.badge') }}</view>
                  <view class="mt-5 text-[40px] font-semibold text-[#fff3f5]">
                    {{ t('diamond.title') }}
                  </view>
                  <view class="mt-8 text-[34px] font-semibold">
                    {{ t('diamond.price') }}
                    <text class="text-[20px] font-normal text-white/75"> {{ t('diamond.priceNote') }}</text>
                  </view>
                  <view class="mt-2 text-[15px] italic text-white/75">
                    {{ t('diamond.period') }}
                  </view>
                </view>

                <view class="grid gap-4 md:grid-cols-3">
                  <view class="border border-white/15 bg-white/10 px-4 py-4 text-[14px] leading-6 text-[#fff1f3]">
                    {{ t('diamond.f1') }}
                  </view>
                  <view class="border border-white/15 bg-white/10 px-4 py-4 text-[14px] leading-6 text-[#fff1f3]">
                    {{ t('diamond.f2') }}
                  </view>
                  <view class="border border-white/15 bg-white/10 px-4 py-4 text-[14px] leading-6 text-[#fff1f3]">
                    {{ t('diamond.f3') }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 规则与升级 -->
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <view>
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
              {{ t('rules.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] lg:text-[66px]">
            {{ t('rules.title') }}
            <text class="text-[#d71934]">{{ t('rules.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-[#8b6e4d]">
            {{ t('rules.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-[#8b6e4d]">
            {{ t('rules.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="grid gap-6 md:grid-cols-3">
            <view
                v-for="item in ruleTags"
                :key="item.title"
                class="border border-[#e2d7c9] bg-[#efe7d8] px-7 py-6"
            >
              <view class="text-[22px] font-medium" :class="item.accent ? 'text-[#d71934]' : 'text-[#1e1e1f]'">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[14px] italic leading-6 text-[#7d6752]">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>

          <view class="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <view class="border border-[#1f3047] bg-[#203854] px-8 py-10 text-white">
              <view class="text-[58px] font-semibold text-[#8b7d5a]">01</view>
              <view class="mt-6 max-w-[300px] text-[24px] leading-[1.7]">
                {{ t('rules.card1') }}
              </view>
              <view class="mt-8 max-w-[280px] text-[16px] italic leading-8 text-[#d8cfbf]">
                {{ t('rules.card1Sub') }}
              </view>
            </view>

            <view class="border border-[#d70a2f] bg-[#d70a2f] px-8 py-10 text-white xl:translate-y-14">
              <view class="text-[58px] font-semibold text-[#f06078]">02</view>
              <view class="mt-6 max-w-[300px] text-[24px] leading-[1.7]">
                {{ t('rules.card2') }}
              </view>
              <view class="mt-8 max-w-[280px] text-[16px] italic leading-8 text-[#f2d5d9]">
                {{ t('rules.card2Sub') }}
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

const { t } = usePageI18n('membership')
const navList = NAV_LIST

const ruleTags = [
  { title: 'rules.tag1.title', desc: 'rules.tag1.desc', accent: true },
  { title: 'rules.tag2.title', desc: 'rules.tag2.desc', accent: false },
  { title: 'rules.tag3.title', desc: 'rules.tag3.desc', accent: false }
]

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function openPlan(plan: string) {
  openRegisterPage(plan)
}

function handleRegisterClick() {
  openRegisterPage('vip')
}
</script>


<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navListWithContact"
        active-nav="common.nav.contact"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <!-- Hero -->
    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_52%,#102842_100%)] text-white">
      <view class="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top_left,rgba(215,25,52,0.18),transparent_52%)]" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:min-h-[560px] lg:grid-cols-[1fr_0.94fr] lg:items-start">
          <view class="max-w-[680px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">
                {{ t('hero.eyebrow') }}
              </text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-[#fffaf6] lg:text-[86px]">
              {{ t('hero.title') }}
            </view>

            <view class="mt-4 text-[32px] italic leading-[1.08] text-[#d7b86e] lg:text-[58px]">
              {{ t('hero.titleAccent') }}
            </view>

            <view class="mt-10 max-w-[620px] text-[19px] leading-8 text-[#ebdfd9] lg:text-[20px]">
              {{ t('hero.description') }}
            </view>

            <view class="mt-5 max-w-[620px] text-[17px] italic leading-8 text-white/60 lg:text-[18px]">
              {{ t('hero.secondaryDescription') }}
            </view>

            <view class="mt-12 flex flex-wrap gap-5">
              <button class="min-w-[190px] bg-[#d71934] px-6 py-4 text-[16px] font-medium text-white" @click="handlePrimaryAction">
                {{ t('hero.actions.primary') }}
              </button>
              <button class="min-w-[190px] border border-white/20 bg-transparent px-6 py-4 text-[16px] text-[#f5e9e0]" @click="handleSecondaryAction">
                {{ t('hero.actions.secondary') }}
              </button>
            </view>
          </view>

          <view class="grid gap-5 lg:ml-auto lg:max-w-[480px]">
            <view
                v-for="item in contactCards"
                :key="item.title"
                class="flex items-start gap-5 border border-white/10 bg-white/5 px-6 py-6 backdrop-blur"
            >
              <view class="text-[28px]">{{ item.icon }}</view>
              <view>
                <view class="text-[13px] uppercase tracking-[4px] text-[#d7b86e]">{{ t(item.title) }}</view>
                <view class="mt-3 text-[15px] leading-7 text-white/70">{{ t(item.desc) }}</view>
                <view class="mt-4 text-[18px] font-medium text-white">{{ t(item.value) }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 联系方式 -->
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view class="max-w-[760px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
              {{ t('info.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('info.title') }}
            <text class="italic text-[#d71934]">& {{ t('info.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[440px] text-[18px] italic leading-8 text-[#7b6d60]">
          {{ t('info.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 lg:grid-cols-3">
        <view
            v-for="item in contactCards"
            :key="item.title"
            class="border border-[#e2d7c9] bg-white px-8 py-10 shadow-[0_16px_40px_rgba(28,18,16,0.05)]"
        >
          <view class="flex items-center justify-between gap-4">
            <view class="text-[32px]">{{ item.icon }}</view>
            <view class="text-[13px] uppercase tracking-[4px] text-[#d08e92]">Direct</view>
          </view>
          <view class="mt-6 text-[30px] font-semibold text-[#1f1f1f]">
            {{ t(item.title) }}
          </view>
          <view class="mt-5 text-[16px] leading-8 text-[#6c5c4d]">
            {{ t(item.desc) }}
          </view>
          <view class="mt-6 border-t border-[#efe3d5] pt-5 text-[16px] font-medium text-[#1f1f1f]">
            {{ t(item.value) }}
          </view>
        </view>
      </view>
    </view>

    <!-- 联系场景 -->
    <view class="bg-[#0d2238] text-white">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <view class="lg:sticky lg:top-24 lg:self-start">
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-[#b84c5c]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#d58f97]">
                {{ t('cases.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
              {{ t('cases.title') }}
              <text class="italic text-[#e0143d]">& {{ t('cases.titleAccent') }}</text>
            </view>

            <view class="mt-5 max-w-[400px] text-[19px] italic leading-8 text-[#d9d0c4] lg:text-[21px]">
              {{ t('cases.subtitle') }}
            </view>

            <view class="mt-10 border border-white/10 bg-white/5 px-7 py-8 backdrop-blur">
              <view class="text-[12px] uppercase tracking-[5px] text-[#d7b86e]">Concierge Desk</view>
              <view class="mt-4 text-[16px] leading-8 text-white/72">
                {{ t(caseCards[0].desc) }}
              </view>
            </view>
          </view>

          <view class="grid gap-4">
            <view
                v-for="(item, index) in caseCards"
                :key="item.title"
                class="grid gap-5 border px-8 py-8 lg:grid-cols-[120px_1fr] lg:items-center"
                :class="index % 2 === 0 ? 'border-white/10 bg-[#203854]' : 'border-[#d71934]/30 bg-[#152a43]'"
            >
              <view class="flex h-20 w-20 items-center justify-center rounded-full border text-[34px]"
                    :class="index % 2 === 0 ? 'border-[#d7b86e]/40 bg-[#d7b86e]/10 text-[#d7b86e]' : 'border-white/15 bg-white/5 text-white'">
                {{ item.icon }}
              </view>
              <view>
                <view class="text-[13px] uppercase tracking-[4px]"
                      :class="index % 2 === 0 ? 'text-[#d7b86e]' : 'text-[#ffd5dd]'">
                  {{ `0${index + 1}`.slice(-2) }}
                </view>
                <view class="mt-3 text-[28px] font-semibold"
                      :class="index % 2 === 0 ? 'text-white' : 'text-[#fff4f6]'">
                  {{ t(item.title) }}
                </view>
                <view class="mt-4 text-[16px] leading-8 text-white/72">
                  {{ t(item.desc) }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 联系建议与响应方式 -->
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-10">
        <view class="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
          <view>
            <view class="mb-5 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-[#d08e92]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
                {{ t('guide.eyebrow') }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-[1.15] lg:text-[66px]">
              {{ t('guide.title') }}
              <text class="text-[#d71934]">{{ t('guide.titleAccent') }}</text>
            </view>
          </view>

          <view class="grid gap-4 md:grid-cols-3">
            <view
                v-for="item in guideTags"
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
        </view>

        <view class="grid gap-6 xl:grid-cols-[0.7fr_0.3fr]">
          <view class="grid gap-6 md:grid-cols-2">
            <view class="border border-[#1f3047] bg-[#203854] px-8 py-10 text-white">
              <view class="text-[12px] uppercase tracking-[5px] text-[#d7b86e]">Reply Flow 01</view>
              <view class="mt-5 text-[30px] font-semibold leading-[1.4]">
                {{ t('guide.card1') }}
              </view>
              <view class="mt-6 text-[16px] italic leading-8 text-[#d8cfbf]">
                {{ t('guide.card1Sub') }}
              </view>
            </view>

            <view class="border border-[#d70a2f] bg-[#d70a2f] px-8 py-10 text-white md:translate-y-10">
              <view class="text-[12px] uppercase tracking-[5px] text-[#ffd5dd]">Reply Flow 02</view>
              <view class="mt-5 text-[30px] font-semibold leading-[1.4]">
                {{ t('guide.card2') }}
              </view>
              <view class="mt-6 text-[16px] italic leading-8 text-[#f2d5d9]">
                {{ t('guide.card2Sub') }}
              </view>
            </view>
          </view>

          <view class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-10">
            <view class="text-[16px] italic leading-8 text-[#8b6e4d]">
              {{ t('guide.description') }}
            </view>
            <view class="mt-8 border-t border-[#e6dbcf] pt-8 text-[16px] italic leading-8 text-[#8b6e4d]">
              {{ t('guide.secondaryDescription') }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <AppFooter
        :nav-list="navListWithContact"
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

const { t } = usePageI18n('contact')
const navListWithContact = NAV_LIST

const contactCards = [
  { icon: '✉️', title: 'info.card1.title', desc: 'info.card1.desc', value: 'info.card1.value' },
  { icon: '💬', title: 'info.card2.title', desc: 'info.card2.desc', value: 'info.card2.value' },
  { icon: '📍', title: 'info.card3.title', desc: 'info.card3.desc', value: 'info.card3.value' }
]

const caseCards = [
  { icon: '📘', title: 'cases.card1.title', desc: 'cases.card1.desc' },
  { icon: '💎', title: 'cases.card2.title', desc: 'cases.card2.desc' },
  { icon: '🎭', title: 'cases.card3.title', desc: 'cases.card3.desc' },
  { icon: '🤝', title: 'cases.card4.title', desc: 'cases.card4.desc' },
  { icon: '👨‍👩‍👧', title: 'cases.card5.title', desc: 'cases.card5.desc' },
  { icon: '🏛️', title: 'cases.card6.title', desc: 'cases.card6.desc' }
]

const guideTags = [
  { title: 'guide.tag1.title', desc: 'guide.tag1.desc', accent: true },
  { title: 'guide.tag2.title', desc: 'guide.tag2.desc', accent: false },
  { title: 'guide.tag3.title', desc: 'guide.tag3.desc', accent: false }
]

function handleNavClick(key: string) {
  navigateByNavKey(key, navListWithContact)
}

function handlePrimaryAction() {
  openRegisterPage('contact')
}

function handleSecondaryAction() {
  uni.navigateTo({
    url: '/pages/events/index',
  })
}

function handleRegisterClick() {
  openRegisterPage('contact')
}
</script>


<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view v-if="profile" class="pb-20">
      <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_52%,#102842_100%)] text-white">
        <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.18),transparent_54%)]" />
        <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
          <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <view class="max-w-[700px]">
              <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
                <view class="h-[1px] w-12 bg-[#d7b86e]" />
                <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">{{ labels.eyebrow }}</text>
              </view>

              <view class="flex items-center gap-5">
                <view class="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-[24px] font-semibold text-[#f6e8c7]">
                  {{ profile.avatar }}
                </view>
                <view>
                  <view class="text-[52px] font-semibold leading-[1.02] text-[#fffaf3] lg:text-[76px]">{{ profile.name }}</view>
                  <view class="mt-2 text-[18px] text-[#e7dbc8]">{{ localize(profile.city) }} · {{ profile.age }}</view>
                </view>
              </view>
            </view>

            <view class="grid gap-5 md:grid-cols-2">
              <view class="border border-white/10 bg-white/5 px-7 py-7 backdrop-blur">
                <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.completion }}</view>
                <view class="mt-4 text-[34px] font-semibold text-white">{{ account.completion }}%</view>
              </view>
              <view class="border border-white/10 bg-white/5 px-7 py-7 backdrop-blur">
                <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.visibility }}</view>
                <view class="mt-4 text-[24px] font-semibold text-white">{{ profile.familyVisible ? labels.familyVisible : labels.userOnly }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <view class="border border-[#e2d7c9] bg-white px-8 py-10">
            <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ labels.basic }}</view>
            <view class="mt-8 grid gap-4 text-[16px] leading-8 text-[#5d5045]">
              <view><text class="font-medium text-[#1f1f1f]">{{ labels.city }}:</text> {{ localize(profile.city) }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ labels.education }}:</text> {{ localize(profile.education) }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ labels.job }}:</text> {{ localize(profile.occupation) }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ labels.intent }}:</text> {{ localize(profile.intent) }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ labels.languages }}:</text> {{ profile.languages.join(' / ') }}</view>
            </view>
          </view>

          <view class="grid gap-6">
            <view class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-10">
              <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ labels.summary }}</view>
              <view class="mt-6 text-[16px] leading-8 text-[#6b5c4d]">
                {{ localize(profile.summary) }}
              </view>
            </view>

            <view class="border border-[#1f3047] bg-[#203854] px-8 py-10 text-white">
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.tags }}</view>
              <view class="mt-6 flex flex-wrap gap-3">
                <view
                    v-for="item in profile.tags"
                    :key="localize(item)"
                    class="bg-white/10 px-4 py-2 text-[14px] text-[#f0e6d8]"
                >
                  {{ localize(item) }}
                </view>
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
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { getCurrentMockProfile, mockCurrentUser, pickLocalized, type LocalizedText } from '@/mock/business'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('myProfile')
const account = mockCurrentUser
const profile = getCurrentMockProfile()

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  completion: t('hero.completion'),
  visibility: t('hero.visibility'),
  familyVisible: t('hero.familyVisible'),
  userOnly: t('hero.userOnly'),
  basic: t('hero.basic'),
  city: t('hero.city'),
  education: t('hero.education'),
  job: t('hero.job'),
  intent: t('hero.intent'),
  languages: t('hero.languages'),
  summary: t('hero.summary'),
  tags: t('hero.tags'),
}))

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>



<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.profiles"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view v-if="profile" class="pb-20">
      <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_52%,#102842_100%)] text-white">
        <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.18),transparent_54%)]" />
        <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
          <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <view class="max-w-[680px]">
              <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
                <view class="h-[1px] w-12 bg-[#d7b86e]" />
                <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">{{ t('hero.eyebrow') }}</text>
              </view>

              <view class="flex items-center gap-5">
                <view class="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-[24px] font-semibold text-[#f6e8c7]">
                  {{ profile.avatar }}
                </view>
                <view>
                  <view class="text-[52px] font-semibold leading-[1.02] text-[#fffaf3] lg:text-[76px]">{{ profile.name }}</view>
                  <view class="mt-2 text-[18px] text-[#e7dbc8]">{{ t('fields.age') }} {{ profile.age }} · {{ localize(profile.city) }}</view>
                </view>
              </view>

              <view class="mt-8 max-w-[620px] text-[18px] leading-8 text-[#e7dbc8]">
                {{ localize(profile.summary) }}
              </view>
            </view>

            <view class="grid gap-5 md:grid-cols-2">
              <view class="border border-white/10 bg-white/5 px-7 py-7 backdrop-blur">
                <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('fields.intent') }}</view>
                <view class="mt-4 text-[24px] leading-8 text-white">{{ localize(profile.intent) }}</view>
              </view>
              <view class="border border-white/10 bg-white/5 px-7 py-7 backdrop-blur">
                <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('fields.status') }}</view>
                <view class="mt-4 text-[24px] leading-8 text-white">{{ statusLabel(profile.status) }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <view class="border border-[#e2d7c9] bg-white px-8 py-10">
            <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ t('sections.profileFacts') }}</view>
            <view class="mt-8 grid gap-4 text-[16px] leading-8 text-[#5d5045]">
              <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.city') }}:</text> {{ localize(profile.city) }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.education') }}:</text> {{ localize(profile.education) }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.job') }}:</text> {{ localize(profile.occupation) }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.languages') }}:</text> {{ profile.languages.join(' / ') }}</view>
              <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.visibility') }}:</text> {{ profile.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible') }}</view>
            </view>
          </view>

          <view class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-10">
            <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ t('sections.tags') }}</view>
            <view class="mt-8 flex flex-wrap gap-3">
              <view
                  v-for="item in profile.tags"
                  :key="localize(item)"
                  class="bg-white px-4 py-2 text-[14px] text-[#6d5a48]"
              >
                {{ localize(item) }}
              </view>
            </view>

            <view class="mt-10 text-[16px] leading-8 text-[#6b5c4d]">
              {{ t('sections.detailSummary') }}
            </view>
          </view>
        </view>
      </view>

      <view class="bg-[#0d2238] text-white">
        <view class="mx-auto max-w-[1280px] px-8 py-24">
          <view class="mb-12">
            <view class="text-[12px] uppercase tracking-[5px] text-[#d7b86e]">{{ t('sections.relatedEvents') }}</view>
            <view class="mt-4 text-[42px] font-semibold leading-tight text-[#fffaf2] lg:text-[60px]">
              {{ t('sections.eventMatches') }}
            </view>
          </view>

          <view class="grid gap-6 lg:grid-cols-3">
            <view
                v-for="event in relatedEvents"
                :key="event.id"
                class="border border-white/10 bg-white/5 px-8 py-8 backdrop-blur"
                @click="handleEventOpen(event.id)"
            >
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ formatDate(event.date) }}</view>
              <view class="mt-4 text-[28px] font-semibold text-[#fffaf2]">{{ localize(event.title) }}</view>
              <view class="mt-4 text-[15px] leading-7 text-[#d8cfbf]">{{ localize(event.summary) }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-else class="mx-auto max-w-[960px] px-8 py-24">
      <view class="border border-[#e2d7c9] bg-white px-8 py-10 text-[18px] leading-8 text-[#6b5c4d]">
        {{ t('sections.notFound') }}
      </view>
    </view>

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { getMockProfileById, mockEvents, pickLocalized, type LocalizedText } from '@/mock/business'
import { openEventDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('profileDetail')
const profileId = ref('')

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

const profile = computed(() => getMockProfileById(profileId.value))
const relatedEvents = computed(() => mockEvents.slice(0, 3))

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function statusLabel(status: 'open' | 'review' | 'vip') {
  return t(`status.${status}`)
}

function formatDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  } as const

  return map[locale.value]
}

function handleEventOpen(id: string) {
  openEventDetail(id)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>





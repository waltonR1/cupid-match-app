<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

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
                {{ account.avatar }}
              </view>
              <view>
                <view class="text-[52px] font-semibold leading-[1.02] text-[#fffaf3] lg:text-[76px]">{{ account.name }}</view>
                <view class="mt-2 text-[18px] text-[#e7dbc8]">{{ localize(account.city) }} · {{ membershipLabel(account.membership) }}</view>
              </view>
            </view>

            <view class="mt-8 max-w-[640px] text-[18px] leading-8 text-[#e7dbc8]">
              {{ localize(account.bio) }}
            </view>
          </view>

          <view class="grid gap-5 md:grid-cols-3">
            <view
              v-for="item in statCards"
              :key="item.label"
              class="border border-white/10 bg-white/5 px-6 py-7 backdrop-blur"
            >
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ item.label }}</view>
              <view class="mt-5 text-[34px] font-semibold text-white">{{ item.value }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <view class="border border-[#e2d7c9] bg-white px-8 py-10">
          <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ labels.quickAccess }}</view>
          <view class="mt-8 grid gap-5">
            <view
              v-for="item in quickCards"
              :key="item.title"
              class="border border-[#eee4d8] bg-[#faf7f1] px-6 py-6"
              @click="item.action"
            >
              <view class="text-[24px] font-semibold tracking-[2px] text-[#b63549]">{{ item.icon }}</view>
              <view class="mt-4 text-[26px] font-semibold text-[#1f1f1f]">{{ item.title }}</view>
              <view class="mt-3 text-[15px] leading-8 text-[#6b5c4d]">{{ item.desc }}</view>
            </view>
          </view>
        </view>

        <view class="grid gap-6">
          <view class="border border-[#1f3047] bg-[#203854] px-8 py-10 text-white">
            <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.accountSummary }}</view>
            <view class="mt-6 grid gap-4 text-[15px] leading-8 text-[#d8cfbf]">
              <view>{{ labels.joined }} {{ formatDate(account.joinedAt) }}</view>
              <view>{{ labels.membership }} {{ membershipLabel(account.membership) }}</view>
              <view>{{ labels.profileCompletion }} {{ account.completion }}%</view>
              <view>{{ labels.currentProfile }} {{ currentProfile?.name ?? '-' }}</view>
            </view>
          </view>

          <view class="grid gap-6 md:grid-cols-2">
            <view class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-8">
              <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ labels.latestRegistration }}</view>
              <view class="mt-4 text-[28px] font-semibold text-[#1f1f1f]">{{ latestEvent?.event ? localize(latestEvent.event.title) : '-' }}</view>
              <view class="mt-3 text-[15px] leading-8 text-[#6b5c4d]">{{ latestEvent ? registrationStatus(latestEvent.registration.status) : '-' }}</view>
            </view>

            <view class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-8">
              <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ labels.parentAccess }}</view>
              <view class="mt-4 text-[28px] font-semibold text-[#1f1f1f]">{{ currentProfile?.familyVisible ? labels.enabled : labels.disabled }}</view>
              <view class="mt-3 text-[15px] leading-8 text-[#6b5c4d]">{{ labels.parentNote }}</view>
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
import { getCurrentMockProfile, getMockUserEvents, mockCurrentUser, pickLocalized, type LocalizedText } from '@/mock/business'
import {
  openFavoritesPage,
  openMessagesPage,
  openMyEventsPage,
  openMyProfilePage,
  openPrivacyPage,
  openRegisterPage,
} from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('account')
const account = mockCurrentUser
const currentProfile = getCurrentMockProfile()
const userEvents = getMockUserEvents()
const latestEvent = userEvents[0]

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  quickAccess: t('hero.quickAccess'),
  accountSummary: t('hero.accountSummary'),
  joined: t('hero.joined'),
  membership: t('hero.membership'),
  profileCompletion: t('hero.profileCompletion'),
  currentProfile: t('hero.currentProfile'),
  latestRegistration: t('hero.latestRegistration'),
  parentAccess: t('hero.parentAccess'),
  enabled: t('hero.enabled'),
  disabled: t('hero.disabled'),
  parentNote: t('hero.parentNote'),
}))

const statCards = computed(() => [
  { label: t('stats.profile'), value: `${account.completion}%` },
  { label: t('stats.registrations'), value: String(userEvents.length) },
  { label: t('stats.tier'), value: membershipShort(account.membership) },
])

const quickCards = computed(() => [
  { icon: 'PF', title: t('quickCards.myProfile.title'), desc: t('quickCards.myProfile.desc'), action: openMyProfilePage },
  { icon: 'EV', title: t('quickCards.myEvents.title'), desc: t('quickCards.myEvents.desc'), action: openMyEventsPage },
  { icon: 'FV', title: t('quickCards.favorites.title'), desc: t('quickCards.favorites.desc'), action: openFavoritesPage },
  { icon: 'MS', title: t('quickCards.messages.title'), desc: t('quickCards.messages.desc'), action: openMessagesPage },
  { icon: 'PR', title: t('quickCards.privacy.title'), desc: t('quickCards.privacy.desc'), action: openPrivacyPage },
  { icon: 'VIP', title: t('quickCards.renew.title'), desc: t('quickCards.renew.desc'), action: () => openRegisterPage('gold') },
])

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function membershipShort(membership: 'free' | 'silver' | 'gold' | 'diamond') {
  return membership.toUpperCase()
}

function membershipLabel(membership: 'free' | 'silver' | 'gold' | 'diamond') {
  return t(`membership.${membership}`)
}

function registrationStatus(status: 'confirmed' | 'waitlist' | 'completed') {
  return t(`status.${status}`)
}

function formatDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  } as const

  return map[locale.value]
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>


<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_50%,#6d1224_100%)] text-white">
      <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.18),transparent_54%)]" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <view class="max-w-[700px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">{{ labels.eyebrow }}</text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-[#fff7ef] lg:text-[82px]">
              {{ labels.title }}
            </view>

            <view class="mt-8 max-w-[640px] text-[18px] leading-8 text-[#f5ddd1]">
              {{ labels.subtitle }}
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
      <view class="grid gap-6">
        <view
            v-for="item in userEvents"
            :key="item.registration.id"
            class="grid gap-5 border border-[#e2d7c9] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(20,32,44,0.05)] md:grid-cols-[180px_1fr_180px] md:items-center"
            @click="handleEventOpen(item.event.id)"
        >
          <view>
            <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ formatDate(item.event.date) }}</view>
            <view class="mt-3 text-[16px] text-[#7a6757]">{{ localize(item.event.city) }}</view>
          </view>

          <view>
            <view class="text-[28px] font-semibold text-[#1f1f1f]">{{ localize(item.event.title) }}</view>
            <view class="mt-3 text-[15px] leading-7 text-[#6b5c4d]">{{ localize(item.registration.note) }}</view>
          </view>

          <view class="flex flex-col items-start gap-3 md:items-end">
            <view class="px-3 py-2 text-[12px] uppercase tracking-[3px]" :class="statusClass(item.registration.status)">
              {{ registrationStatus(item.registration.status) }}
            </view>
            <view class="text-[14px] text-[#7a6757]">{{ item.event.registered }} / {{ item.event.seats }}</view>
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
import { getMockUserEvents, pickLocalized, type LocalizedText } from '@/mock/business'
import { openEventDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('myEvents')
const userEvents = getMockUserEvents()

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
}))

const statCards = computed(() => {
  const confirmed = userEvents.filter(item => item.registration.status === 'confirmed').length
  const waitlist = userEvents.filter(item => item.registration.status === 'waitlist').length
  const completed = userEvents.filter(item => item.registration.status === 'completed').length

  return [
    { label: t('stats.confirmed'), value: String(confirmed) },
    { label: t('stats.waitlist'), value: String(waitlist) },
    { label: t('stats.completed'), value: String(completed) },
  ]
})

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function registrationStatus(status: 'confirmed' | 'waitlist' | 'completed') {
  return t(`status.${status}`)
}

function statusClass(status: 'confirmed' | 'waitlist' | 'completed') {
  if (status === 'confirmed') return 'bg-[#f2dfb2] text-[#5c4620]'
  if (status === 'waitlist') return 'bg-[#f4e0de] text-[#b45b69]'
  return 'bg-[#eff2f5] text-[#344a63]'
}

function formatDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
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
  openRegisterPage('event')
}
</script>


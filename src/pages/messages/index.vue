<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader :nav-list="navList" active-nav="" @nav-click="handleNavClick" @register-click="handleRegisterClick" />

    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_50%,#6d1224_100%)] text-white">
      <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.18),transparent_54%)]" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <view class="max-w-[700px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">{{ labels.eyebrow }}</text>
            </view>
            <view class="text-[52px] font-semibold leading-[1.02] text-[#fffaf3] lg:text-[82px]">{{ labels.title }}</view>
            <view class="mt-8 max-w-[620px] text-[18px] leading-8 text-[#f5ddd1]">{{ labels.subtitle }}</view>
          </view>

          <view class="grid gap-5 md:grid-cols-2">
            <view class="border border-white/10 bg-white/5 px-7 py-7 backdrop-blur">
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.threads }}</view>
              <view class="mt-4 text-[34px] font-semibold text-white">{{ threads.length }}</view>
            </view>
            <view class="border border-white/10 bg-white/5 px-7 py-7 backdrop-blur">
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.unread }}</view>
              <view class="mt-4 text-[34px] font-semibold text-white">{{ unreadCount }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-6">
        <view
            v-for="item in threads"
            :key="item.thread.id"
            class="grid gap-5 border border-[#e2d7c9] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(20,32,44,0.05)] md:grid-cols-[90px_1fr_140px] md:items-center"
            @click="handleProfileOpen(item.profile.id)"
        >
          <view class="flex h-16 w-16 items-center justify-center rounded-full bg-[#203854] text-[20px] font-semibold text-[#f6e8c7]">
            {{ item.profile.avatar }}
          </view>

          <view>
            <view class="text-[28px] font-semibold text-[#1f1f1f]">{{ item.profile.name }}</view>
            <view class="mt-3 text-[15px] leading-8 text-[#6b5c4d]">{{ localize(item.thread.lastMessage) }}</view>
          </view>

          <view class="flex flex-col items-start gap-3 md:items-end">
            <view class="text-[14px] text-[#7a6757]">{{ formatDateTime(item.thread.updatedAt) }}</view>
            <view v-if="item.thread.unread > 0" class="rounded-full bg-[#d71934] px-3 py-1 text-[12px] text-white">{{ item.thread.unread }}</view>
          </view>
        </view>
      </view>
    </view>

    <AppFooter :nav-list="navList" @nav-click="handleNavClick" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { getMockThreads, pickLocalized, type LocalizedText } from '@/mock/business'
import { openProfileDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('messages')
const threads = getMockThreads()
const unreadCount = threads.reduce((sum, item) => sum + item.thread.unread, 0)

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  threads: t('hero.threads'),
  unread: t('hero.unread'),
}))

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function formatDateTime(date: string) {
  const map = {
    zh: new Date(date).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    fr: new Date(date).toLocaleString('fr-FR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    en: new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
  } as const
  return map[locale.value]
}

function handleProfileOpen(id: string) {
  openProfileDetail(id)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>


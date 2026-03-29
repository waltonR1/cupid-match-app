<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader :nav-list="navList" active-nav="" @nav-click="handleNavClick" @register-click="handleRegisterClick" />

    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#f5f0e8_0%,#efe2cf_52%,#eadac4_100%)] text-[#1f2520]">
      <view class="absolute right-[-80px] top-10 h-[300px] w-[300px] rounded-full bg-white/30 blur-3xl" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <view class="max-w-[700px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-[#d7c9b5] bg-white/40 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#8f785b]">{{ labels.eyebrow }}</text>
            </view>
            <view class="text-[52px] font-semibold leading-[1.02] text-[#1d221e] lg:text-[82px]">{{ labels.title }}</view>
            <view class="mt-8 max-w-[620px] text-[18px] leading-8 text-[#5d4f42]">{{ labels.subtitle }}</view>
          </view>

          <view class="grid gap-5 md:grid-cols-3">
            <view
                v-for="item in statCards"
                :key="item.label"
                class="border border-white/50 bg-white/55 px-6 py-7 shadow-[0_18px_45px_rgba(50,63,49,0.08)]"
            >
              <view class="text-[12px] uppercase tracking-[4px] text-[#8f785b]">{{ item.label }}</view>
              <view class="mt-4 text-[34px] font-semibold text-[#1f2520]">{{ item.value }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-6">
        <view
            v-for="item in settings"
            :key="item.id"
            class="grid gap-5 border border-[#e2d7c9] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(20,32,44,0.05)] md:grid-cols-[1fr_120px] md:items-center"
        >
          <view>
            <view class="text-[28px] font-semibold text-[#1f1f1f]">{{ localize(item.title) }}</view>
            <view class="mt-3 text-[15px] leading-8 text-[#6b5c4d]">{{ localize(item.desc) }}</view>
          </view>

          <view class="justify-self-start px-4 py-2 text-[13px] uppercase tracking-[3px] md:justify-self-end"
                :class="item.enabled ? 'bg-[#223148] text-white' : 'bg-[#f3ede3] text-[#6b5c4d]'">
            {{ item.enabled ? labels.enabled : labels.disabled }}
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
import { mockPrivacySettings, pickLocalized, type LocalizedText } from '@/mock/business'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('privacy')
const settings = mockPrivacySettings

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  enabled: t('hero.enabled'),
  disabled: t('hero.disabled'),
}))

const statCards = computed(() => {
  const enabled = settings.filter(item => item.enabled).length
  const disabled = settings.length - enabled

  return [
    { label: t('stats.enabled'), value: String(enabled) },
    { label: t('stats.disabled'), value: String(disabled) },
    { label: t('stats.settings'), value: String(settings.length) },
  ]
})

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


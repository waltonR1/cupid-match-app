<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.profiles"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_52%,#102842_100%)] text-white">
      <view class="absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.18),transparent_54%)]" />
      <view class="absolute right-[-80px] top-14 h-[280px] w-[280px] rounded-full bg-[#d71934]/10 blur-3xl" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <view class="max-w-[660px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">
                {{ t('hero.eyebrow') }}
              </text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-[#f9fcff] lg:text-[88px]">
              {{ t('hero.title') }}
            </view>

            <view class="mt-10 max-w-[620px] text-[19px] leading-8 text-[#d8e6ea] lg:text-[20px]">
              {{ t('hero.subtitle') }}
            </view>
          </view>

          <view class="grid gap-5 md:grid-cols-3">
            <view
                v-for="item in statCards"
                :key="item.label"
                class="border border-white/10 bg-white/5 px-6 py-7 backdrop-blur"
            >
              <view class="text-[14px] uppercase tracking-[4px] text-[#d7b86e]">{{ item.label }}</view>
              <view class="mt-5 text-[40px] font-semibold text-white">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-20">
      <view class="grid gap-5 md:grid-cols-3">
        <view class="border border-[#e2d7c9] bg-[#faf7f1] px-7 py-7">
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ t('filters.city') }}</view>
          <view class="mt-4 flex flex-wrap gap-3">
            <view
                v-for="item in cityFilters"
                :key="item"
                class="border border-[#e3d8cb] bg-white px-4 py-2 text-[14px] text-[#5d5045]"
            >
              {{ item }}
            </view>
          </view>
        </view>

        <view class="border border-[#e2d7c9] bg-[#faf7f1] px-7 py-7">
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ t('filters.intent') }}</view>
          <view class="mt-4 flex flex-wrap gap-3">
            <view
                v-for="item in intentFilters"
                :key="item"
                class="border border-[#e3d8cb] bg-white px-4 py-2 text-[14px] text-[#5d5045]"
            >
              {{ item }}
            </view>
          </view>
        </view>

        <view class="border border-[#e2d7c9] bg-[#faf7f1] px-7 py-7">
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ t('filters.languages') }}</view>
          <view class="mt-4 flex flex-wrap gap-3">
            <view
                v-for="item in languageFilters"
                :key="item"
                class="border border-[#e3d8cb] bg-white px-4 py-2 text-[14px] text-[#5d5045]"
            >
              {{ item }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 pb-24">
      <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ t('directory.eyebrow') }}</view>
          <view class="mt-4 text-[44px] font-semibold leading-tight text-[#1f1f1f] lg:text-[62px]">
            {{ t('directory.title') }}
          </view>
        </view>

        <view class="max-w-[420px] text-[17px] leading-8 text-[#7b6d60]">
          {{ t('directory.note') }}
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-3">
          <view
            v-for="profile in profiles"
            :key="profile.id"
            class="border border-[#e2d7c9] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(20,32,44,0.05)]"
            @click="handleProfileOpen(profile.id)"
        >
          <view class="flex items-start justify-between gap-4">
            <view class="flex items-center gap-4">
              <view class="flex h-16 w-16 items-center justify-center rounded-full bg-[#203854] text-[20px] font-semibold text-[#f6e8c7]">
                {{ profile.avatar }}
              </view>
              <view>
                <view class="text-[28px] font-semibold text-[#1f1f1f]">{{ profile.name }}</view>
                <view class="mt-1 text-[15px] text-[#7a6757]">{{ t('fields.age') }} {{ profile.age }}</view>
              </view>
            </view>

            <view
                class="px-3 py-2 text-[12px] uppercase tracking-[3px]"
                :class="profile.familyVisible ? 'bg-[#f4e0de] text-[#b45b69]' : 'bg-[#eff2f5] text-[#344a63]'"
            >
              {{ profile.familyVisible ? t('badges.familyAssisted') : t('badges.directProfile') }}
            </view>
          </view>

          <view class="mt-8 grid gap-4 border-t border-[#eee4d8] pt-6 text-[15px] leading-7 text-[#5d5045]">
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.city') }}:</text> {{ localize(profile.city) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.education') }}:</text> {{ localize(profile.education) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.job') }}:</text> {{ localize(profile.occupation) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.intent') }}:</text> {{ localize(profile.intent) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.languages') }}:</text> {{ profile.languages.join(' / ') }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.status') }}:</text> {{ statusLabel(profile.status) }}</view>
          </view>

          <view class="mt-6 text-[15px] leading-8 text-[#6b5c4d]">
            {{ localize(profile.summary) }}
          </view>

          <view class="mt-6 flex flex-wrap gap-3">
            <view
                v-for="item in profile.tags"
                :key="localize(item)"
                class="bg-[#f3ede3] px-4 py-2 text-[13px] text-[#6d5a48]"
            >
              {{ localize(item) }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="bg-[#0d2238] text-white">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
            <view class="text-[12px] uppercase tracking-[5px] text-[#d7b86e]">{{ t('featured.eyebrow') }}</view>
            <view class="mt-4 text-[42px] font-semibold leading-tight text-[#fffaf2] lg:text-[60px]">
              {{ t('featured.title') }}
            </view>
          </view>

          <view class="max-w-[460px] text-[17px] leading-8 text-[#d8cfbf]">
            {{ t('featured.subtitle') }}
          </view>
        </view>

        <view class="grid gap-6 lg:grid-cols-3">
          <view
              v-for="profile in familyProfiles"
              :key="profile.id"
              class="border border-white/10 bg-white/5 px-8 py-8 backdrop-blur"
              @click="handleProfileOpen(profile.id, 'family')"
          >
            <view class="flex items-center justify-between gap-4">
              <view class="text-[26px] font-semibold text-[#fffaf2]">{{ profile.name }}</view>
              <view class="text-[12px] uppercase tracking-[3px] text-[#d7b86e]">{{ statusLabel(profile.status) }}</view>
            </view>

            <view class="mt-5 text-[15px] leading-7 text-[#ecdfcf]">
              {{ t('fields.city') }} {{ localize(profile.city) }} / {{ t('fields.age') }} {{ profile.age }}
            </view>

            <view class="mt-5 text-[15px] leading-8 text-white/72">
              {{ localize(profile.summary) }}
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
import { type LocalizedText, mockProfiles, pickLocalized } from '@/mock/business'
import { openProfileDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('profiles')
const profiles = computed(() => mockProfiles)
const familyProfiles = computed(() => mockProfiles.filter(profile => profile.familyVisible))

const statCards = computed(() => {
  return [
    { label: t('stats.totalProfiles'), value: String(mockProfiles.length) },
    { label: t('stats.openCities'), value: String(new Set(mockProfiles.map(item => pickLocalized(locale.value, item.city))).size) },
    { label: t('stats.familyAssisted'), value: String(familyProfiles.value.length) },
  ]
})

const cityFilters = computed(() => Array.from(new Set(mockProfiles.map(item => localize(item.city)))))
const intentFilters = computed(() => Array.from(new Set(mockProfiles.map(item => localize(item.intent)))))
const languageFilters = computed(() => Array.from(new Set(mockProfiles.flatMap(item => item.languages))))

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function statusLabel(status: 'open' | 'review' | 'vip') {
  return t(`status.${status}`)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleProfileOpen(id: string, source: 'member' | 'family' = 'member') {
  openProfileDetail(id, source)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>


<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.parents"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#f5f0e8_0%,#efe2cf_52%,#eadac4_100%)] text-[#1f2520]">
      <view class="absolute right-[-80px] top-10 h-[300px] w-[300px] rounded-full bg-white/30 blur-3xl" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <view class="max-w-[700px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-[#d7c9b5] bg-white/40 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#8f785b]">
                {{ t('hero.eyebrow') }}
              </text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-[#1d221e] lg:text-[86px]">
              {{ t('hero.title') }}
            </view>

            <view class="mt-10 max-w-[650px] text-[19px] leading-8 text-[#5d4f42] lg:text-[20px]">
              {{ t('hero.subtitle') }}
            </view>
          </view>

          <view class="grid gap-5 md:grid-cols-3">
            <view
                v-for="item in statCards"
                :key="item.label"
                class="border border-white/50 bg-white/55 px-6 py-7 shadow-[0_18px_45px_rgba(50,63,49,0.08)]"
            >
              <view class="text-[12px] uppercase tracking-[4px] text-[#8f785b]">{{ item.label }}</view>
              <view class="mt-5 text-[36px] font-semibold text-[#1f2520]">{{ item.value }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ t('profiles.eyebrow') }}</view>
          <view class="mt-4 text-[44px] font-semibold leading-tight text-[#1f1f1f] lg:text-[62px]">
            {{ t('profiles.title') }}
          </view>
        </view>

        <view class="max-w-[440px] text-[17px] leading-8 text-[#7b6d60]">
          {{ t('profiles.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-3">
        <view
            v-for="profile in familyProfiles"
            :key="profile.id"
            class="border border-[#e2d7c9] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(20,32,44,0.05)]"
            @click="handleProfileOpen(profile.id)"
        >
          <view class="flex items-start justify-between gap-4">
            <view class="flex items-center gap-4">
              <view class="flex h-16 w-16 items-center justify-center rounded-full bg-[#223148] text-[20px] font-semibold text-[#f6e8c7]">
                {{ profile.avatar }}
              </view>
              <view>
                <view class="text-[28px] font-semibold text-[#1f1f1f]">{{ profile.name }}</view>
                <view class="mt-1 text-[15px] text-[#7a6757]">{{ t('fields.age') }} {{ profile.age }}</view>
              </view>
            </view>

            <view class="bg-[#f4e0de] px-3 py-2 text-[12px] uppercase tracking-[3px] text-[#b45b69]">
              {{ profileStatus(profile.status) }}
            </view>
          </view>

          <view class="mt-8 grid gap-4 border-t border-[#eee4d8] pt-6 text-[15px] leading-7 text-[#5d5045]">
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.city') }}:</text> {{ localize(profile.city) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.education') }}:</text> {{ localize(profile.education) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.job') }}:</text> {{ localize(profile.occupation) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.intent') }}:</text> {{ localize(profile.intent) }}</view>
          </view>

          <view class="mt-6 text-[15px] leading-8 text-[#6b5c4d]">
            {{ localize(profile.summary) }}
          </view>
        </view>
      </view>
    </view>

    <view class="bg-[#223148] text-white">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
            <view class="text-[12px] uppercase tracking-[5px] text-[#d7b86e]">{{ t('programs.eyebrow') }}</view>
            <view class="mt-4 text-[42px] font-semibold leading-tight text-[#fffaf2] lg:text-[60px]">
              {{ t('programs.title') }}
            </view>
          </view>

          <view class="max-w-[460px] text-[17px] leading-8 text-[#d8cfbf]">
            {{ t('programs.subtitle') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view
              v-for="program in parentPrograms"
              :key="program.id"
              class="grid gap-5 border border-white/10 bg-white/5 px-7 py-7 md:grid-cols-[160px_1fr_200px] md:items-center"
              @click="handleProgramOpen(program.id)"
          >
            <view>
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ formatDate(program.date) }}</view>
              <view class="mt-3 text-[15px] text-white/76">{{ localize(program.city) }}</view>
            </view>

            <view>
              <view class="text-[26px] font-semibold text-[#fffaf2]">{{ localize(program.title) }}</view>
              <view class="mt-3 text-[15px] leading-7 text-[#d8cfbf]">{{ localize(program.summary) }}</view>
            </view>

            <view class="flex flex-col items-start gap-3 md:items-end">
              <view class="px-3 py-2 text-[12px] uppercase tracking-[3px]"
                    :class="programStatusClass(program.status)">
                {{ programStatus(program.status) }}
              </view>
              <view class="text-[14px] text-white/70">{{ localize(program.mode) }} / {{ program.seats }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ t('steps.eyebrow') }}</view>
          <view class="mt-4 text-[44px] font-semibold leading-tight text-[#1f1f1f] lg:text-[62px]">
            {{ t('steps.title') }}
          </view>
        </view>

        <view class="max-w-[420px] text-[17px] leading-8 text-[#7b6d60]">
          {{ t('steps.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-3">
        <view
            v-for="step in stepCards"
            :key="step.title"
            class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-8"
        >
          <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ step.index }}</view>
          <view class="mt-5 text-[28px] font-semibold text-[#1f1f1f]">{{ step.title }}</view>
          <view class="mt-5 text-[15px] leading-8 text-[#6b5c4d]">{{ step.desc }}</view>
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
import { type LocalizedText, mockParentPrograms, mockProfiles, pickLocalized } from '@/mock/business'
import { openParentProgramDetail, openProfileDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('parents')
const familyProfiles = computed(() => mockProfiles.filter(profile => profile.familyVisible))
const parentPrograms = computed(() => [...mockParentPrograms].sort((left, right) => left.date.localeCompare(right.date)))

const statCards = computed(() => {
  const openPrograms = mockParentPrograms.filter(item => item.status === 'open').length

  return [
    { label: t('stats.visibleProfiles'), value: String(familyProfiles.value.length) },
    { label: t('stats.openPrograms'), value: String(openPrograms) },
    { label: t('stats.supportSlots'), value: String(mockParentPrograms.length) },
  ]
})

const stepCards = computed(() => {
  return [
    {
      index: t('steps.items.first.index'),
      title: t('steps.items.first.title'),
      desc: t('steps.items.first.desc'),
    },
    {
      index: t('steps.items.second.index'),
      title: t('steps.items.second.title'),
      desc: t('steps.items.second.desc'),
    },
    {
      index: t('steps.items.third.index'),
      title: t('steps.items.third.title'),
      desc: t('steps.items.third.desc'),
    },
  ]
})

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function profileStatus(status: 'open' | 'review' | 'vip') {
  return t(`profileStatus.${status}`)
}

function programStatus(status: 'open' | 'waitlist' | 'closed') {
  return t(`programStatus.${status}`)
}

function programStatusClass(status: 'open' | 'waitlist' | 'closed') {
  if (status === 'open') {
    return 'bg-[#f2dfb2] text-[#5c4620]'
  }

  if (status === 'waitlist') {
    return 'bg-[#f4e0de] text-[#b45b69]'
  }

  return 'bg-white/10 text-white'
}

function formatDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  } as const

  return map[locale.value]
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleProfileOpen(id: string) {
  openProfileDetail(id, 'parent')
}

function handleProgramOpen(id: string) {
  openParentProgramDetail(id)
}

function handleRegisterClick() {
  openRegisterPage('contact')
}
</script>



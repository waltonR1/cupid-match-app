<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.events"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view v-if="event" class="pb-20">
      <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_50%,#6d1224_100%)] text-white">
        <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.18),transparent_54%)]" />
        <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
          <view class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
            <view class="max-w-[700px]">
              <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
                <view class="h-[1px] w-12 bg-[#d7b86e]" />
                <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">{{ t('hero.eyebrow') }}</text>
              </view>

              <view class="text-[52px] font-semibold leading-[1.02] text-[#fff7ef] lg:text-[82px]">
                {{ localize(event.title) }}
              </view>

              <view class="mt-8 max-w-[640px] text-[18px] leading-8 text-[#f5ddd1]">
                {{ localize(event.summary) }}
              </view>
            </view>

            <view class="border border-white/10 bg-black/10 px-8 py-8 backdrop-blur">
              <view class="flex items-start justify-between gap-4">
                <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('fields.status') }}</view>
                <view class="px-3 py-2 text-[12px] uppercase tracking-[3px]" :class="statusClass(event.status)">
                  {{ statusLabel(event.status) }}
                </view>
              </view>

              <view class="mt-8 grid gap-4 text-[15px] leading-7 text-white/74">
                <view>{{ t('fields.date') }} {{ formatDate(event.date) }}</view>
                <view>{{ t('fields.city') }} {{ localize(event.city) }}</view>
                <view>{{ t('fields.venue') }} {{ localize(event.venue) }}</view>
                <view>{{ t('fields.format') }} {{ localize(event.format) }}</view>
                <view>{{ t('fields.audience') }} {{ localize(event.audience) }}</view>
                <view>{{ t('fields.seats') }} {{ event.registered }} / {{ event.seats }}</view>
              </view>

              <button class="mt-8 w-full bg-[#d7b86e] px-6 py-4 text-[16px] font-medium text-[#12253b]" @click="handleRegisterClick">
                {{ t('actions.register') }}
              </button>
            </view>
          </view>
        </view>
      </view>

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <view class="border border-[#e2d7c9] bg-white px-8 py-10">
            <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ t('sections.agenda') }}</view>
            <view class="mt-8 grid gap-5">
              <view
                  v-for="item in agenda"
                  :key="item.time"
                  class="grid gap-3 border border-[#eee4d8] bg-[#faf7f1] px-5 py-5 md:grid-cols-[100px_1fr]"
              >
                <view class="text-[14px] uppercase tracking-[4px] text-[#cf9aa0]">{{ item.time }}</view>
                <view>
                  <view class="text-[22px] font-medium text-[#1f1f1f]">{{ item.title }}</view>
                  <view class="mt-2 text-[15px] leading-7 text-[#6b5c4d]">{{ item.desc }}</view>
                </view>
              </view>
            </view>
          </view>

          <view class="grid gap-6">
            <view class="border border-[#1f3047] bg-[#203854] px-8 py-10 text-white">
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('sections.notes') }}</view>
              <view class="mt-6 text-[16px] leading-8 text-[#d8cfbf]">
                {{ t('sections.notesText') }}
              </view>
            </view>

            <view class="grid gap-6 md:grid-cols-2">
              <view
                  v-for="profile in relatedProfiles"
                  :key="profile.id"
                  class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-8"
                  @click="handleProfileOpen(profile.id)"
              >
                <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ t('sections.relatedProfiles') }}</view>
                <view class="mt-4 text-[28px] font-semibold text-[#1f1f1f]">{{ profile.name }}</view>
                <view class="mt-3 text-[15px] leading-7 text-[#6b5c4d]">{{ localize(profile.summary) }}</view>
              </view>
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
import { mockProfiles } from '@/mock/business'
import { getMockEventById } from '@/mock/events'
import { pickLocalized, type LocalizedText } from '@/mock/shared'
import { openProfileDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('eventDetail')
const eventId = ref('')

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    eventId.value = query.id
  }
})

const event = computed(() => getMockEventById(eventId.value))
const relatedProfiles = computed(() => mockProfiles.slice(0, 2))

const agenda = computed(() => [
  { time: '18:30', title: t('agenda.step1.title'), desc: t('agenda.step1.desc') },
  { time: '19:00', title: t('agenda.step2.title'), desc: t('agenda.step2.desc') },
  { time: '20:15', title: t('agenda.step3.title'), desc: t('agenda.step3.desc') },
])

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function statusLabel(status: 'open' | 'waitlist' | 'closed') {
  return t(`status.${status}`)
}

function statusClass(status: 'open' | 'waitlist' | 'closed') {
  if (status === 'open') return 'bg-[#f2dfb2] text-[#5c4620]'
  if (status === 'waitlist') return 'bg-[#f4e0de] text-[#b45b69]'
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

function handleProfileOpen(id: string) {
  openProfileDetail(id)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('event')
}
</script>




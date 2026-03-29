<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.events"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_50%,#6d1224_100%)] text-white">
      <view class="absolute right-[-120px] top-10 h-[340px] w-[340px] rounded-full border border-white/10" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <view class="max-w-[680px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-black/10 px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">
                {{ t('hero.eyebrow') }}
              </text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-[#fff7ef] lg:text-[88px]">
              {{ t('hero.title') }}
            </view>

            <view class="mt-10 max-w-[640px] text-[19px] leading-8 text-[#f5ddd1] lg:text-[20px]">
              {{ t('hero.subtitle') }}
            </view>
          </view>

          <view class="border border-white/10 bg-black/10 px-8 py-8 backdrop-blur" @click="handleEventOpen(nextEvent.id)">
            <view class="flex flex-wrap items-start justify-between gap-4">
              <view>
                <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('hero.nextEvent') }}</view>
                <view class="mt-4 text-[34px] font-semibold leading-[1.25] text-white">
                  {{ localize(nextEvent.title) }}
                </view>
              </view>
              <view class="px-4 py-2 text-[12px] uppercase tracking-[3px]"
                    :class="eventStatusClass(nextEvent.status)">
                {{ eventStatusLabel(nextEvent.status) }}
              </view>
            </view>

            <view class="mt-8 grid gap-4 text-[15px] leading-7 text-white/74">
              <view>{{ t('fields.date') }} {{ formatDate(nextEvent.date) }}</view>
              <view>{{ t('fields.city') }} {{ localize(nextEvent.city) }}</view>
              <view>{{ t('fields.venue') }} {{ localize(nextEvent.venue) }}</view>
              <view>{{ t('fields.format') }} {{ localize(nextEvent.format) }}</view>
              <view>{{ t('fields.seats') }} {{ nextEvent.registered }} / {{ nextEvent.seats }}</view>
            </view>

            <view class="mt-8 text-[15px] leading-8 text-[#f2d9d3]">
              {{ localize(nextEvent.summary) }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-20">
      <view class="grid gap-5 md:grid-cols-4">
        <view
            v-for="item in statCards"
            :key="item.label"
            class="border border-[#e2d7c9] bg-[#faf7f1] px-6 py-7"
        >
          <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ item.label }}</view>
          <view class="mt-4 text-[34px] font-semibold text-[#1f1f1f]">{{ item.value }}</view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 pb-24">
      <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ t('featured.eyebrow') }}</view>
          <view class="mt-4 text-[44px] font-semibold leading-tight text-[#1f1f1f] lg:text-[62px]">
            {{ t('featured.title') }}
          </view>
        </view>

        <view class="max-w-[420px] text-[17px] leading-8 text-[#7b6d60]">
          {{ t('featured.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-3">
        <view
            v-for="event in featuredEvents"
            :key="event.id"
            class="border border-[#e2d7c9] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(20,32,44,0.05)]"
            @click="handleEventOpen(event.id)"
        >
          <view class="flex items-start justify-between gap-4">
            <view>
              <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ formatDate(event.date) }}</view>
              <view class="mt-4 text-[30px] font-semibold leading-[1.25] text-[#1f1f1f]">
                {{ localize(event.title) }}
              </view>
            </view>

            <view class="px-3 py-2 text-[12px] uppercase tracking-[3px]"
                  :class="eventStatusClass(event.status)">
              {{ eventStatusLabel(event.status) }}
            </view>
          </view>

          <view class="mt-6 grid gap-3 text-[15px] leading-7 text-[#5d5045]">
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.city') }}:</text> {{ localize(event.city) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.venue') }}:</text> {{ localize(event.venue) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.format') }}:</text> {{ localize(event.format) }}</view>
            <view><text class="font-medium text-[#1f1f1f]">{{ t('fields.audience') }}:</text> {{ localize(event.audience) }}</view>
          </view>

          <view class="mt-6 text-[15px] leading-8 text-[#6b5c4d]">
            {{ localize(event.summary) }}
          </view>

          <view class="mt-6 border-t border-[#eee4d8] pt-5 text-[14px] text-[#7a6757]">
            {{ t('fields.seats') }} {{ event.registered }} / {{ event.seats }}
          </view>
        </view>
      </view>
    </view>

    <view class="bg-[#0d2238] text-white">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <view>
            <view class="text-[12px] uppercase tracking-[5px] text-[#d7b86e]">{{ t('schedule.eyebrow') }}</view>
            <view class="mt-4 text-[42px] font-semibold leading-tight text-[#fffaf2] lg:text-[60px]">
              {{ t('schedule.title') }}
            </view>
          </view>

          <view class="max-w-[460px] text-[17px] leading-8 text-[#d8cfbf]">
            {{ t('schedule.note') }}
          </view>
        </view>

        <view class="grid gap-4">
          <view
              v-for="event in events"
              :key="event.id"
              class="grid gap-5 border border-white/10 bg-white/5 px-7 py-6 md:grid-cols-[160px_1fr_180px] md:items-center"
              @click="handleEventOpen(event.id)"
          >
            <view>
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ formatDate(event.date) }}</view>
              <view class="mt-3 text-[16px] text-[#ecdfcf]">{{ localize(event.city) }}</view>
            </view>

            <view>
              <view class="text-[26px] font-semibold text-[#fffaf2]">{{ localize(event.title) }}</view>
              <view class="mt-3 text-[15px] leading-7 text-[#d8cfbf]">{{ localize(event.summary) }}</view>
            </view>

            <view class="flex flex-col items-start gap-3 md:items-end">
              <view class="px-3 py-2 text-[12px] uppercase tracking-[3px]"
                    :class="eventStatusClass(event.status)">
                {{ eventStatusLabel(event.status) }}
              </view>
              <view class="text-[14px] text-white/70">{{ event.registered }} / {{ event.seats }}</view>
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
import { type LocalizedText, mockEvents, pickLocalized } from '@/mock/business'
import { openEventDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('events')
const events = computed(() => [...mockEvents].sort((left, right) => left.date.localeCompare(right.date)))
const nextEvent = computed(() => events.value[0])
const featuredEvents = computed(() => events.value.filter(item => item.status !== 'closed'))

const statCards = computed(() => {
  const openCount = mockEvents.filter(item => item.status === 'open').length
  const waitlistCount = mockEvents.filter(item => item.status === 'waitlist').length
  const cityCount = new Set(mockEvents.map(item => pickLocalized(locale.value, item.city))).size

  return [
    { label: t('stats.totalEvents'), value: String(mockEvents.length) },
    { label: t('stats.openEvents'), value: String(openCount) },
    { label: t('stats.waitlistEvents'), value: String(waitlistCount) },
    { label: t('stats.cities'), value: String(cityCount) },
  ]
})

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function eventStatusLabel(status: 'open' | 'waitlist' | 'closed') {
  return t(`status.${status}`)
}

function eventStatusClass(status: 'open' | 'waitlist' | 'closed') {
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

function handleEventOpen(id: string) {
  openEventDetail(id)
}

function handleRegisterClick() {
  openRegisterPage('event')
}
</script>



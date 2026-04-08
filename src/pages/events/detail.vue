<template>
  <view class="min-h-screen bg-next-semantic-page-default text-next-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.events"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view v-if="eventCard" class="pb-20">
      <EventDetailHero
        :eyebrow="t('hero.eyebrow')"
        :fields="detailFieldLabels"
        :event="eventCard"
        :register-text="t('actions.register')"
        :waitlist-text="t('actions.joinWaitlist')"
        :full-text="t('actions.full')"
        :register-hint="t('actions.registerHint')"
        :waitlist-hint="t('actions.waitlistHint')"
        :full-hint="t('actions.fullHint')"
        @register="handleRegisterClick"
      />

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <EventDetailAgenda
            :eyebrow="t('sections.agenda')"
            :title="t('sections.agenda')"
            :items="agenda"
          />

          <view class="grid gap-6">
            <EventDetailNotes
              :eyebrow="t('sections.notes')"
              :title="t('sections.notes')"
              :items="noteItems"
            />

            <EventDetailRelatedProfiles
              :eyebrow="t('sections.relatedProfiles')"
              :title="t('sections.relatedProfiles')"
              :empty-text="t('sections.relatedEmpty')"
              :profiles="relatedProfiles"
              @open="handleProfileOpen"
            />
          </view>
        </view>
      </view>
    </view>

    <view v-else class="mx-auto max-w-[960px] px-8 py-24">
      <EmptyStatePanel
        :title="t('sections.notFound')"
        :primary-text="t('actions.backToEvents')"
        variant="compact"
        @primary="handleBackToEvents"
      />
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
import EventDetailAgenda from '@/components/events/EventDetailAgenda.vue'
import EventDetailHero from '@/components/events/EventDetailHero.vue'
import EventDetailNotes from '@/components/events/EventDetailNotes.vue'
import EventDetailRelatedProfiles from '@/components/events/EventDetailRelatedProfiles.vue'
import type {
  EventAgendaItem,
  EventDetailFieldLabels,
  EventNoteItem,
  EventOverviewItem,
  EventRelatedProfileItem,
} from '@/components/events/events.types'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { mockProfiles, type MockProfile } from '@/mock/business'
import { getMockEventById, type MockEvent } from '@/mock/events'
import { pickLocalized, type LocalizedText } from '@/mock/shared'
import { openSelfDetail, openRegisterPage } from '@/utils/demo-navigation'
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

const detailFieldLabels = computed<EventDetailFieldLabels>(() => ({
  status: t('fields.status'),
  date: t('fields.date'),
  city: t('fields.city'),
  venue: t('fields.venue'),
  format: t('fields.format'),
  audience: t('fields.audience'),
  seats: t('fields.seats'),
}))

const eventCard = computed<EventOverviewItem | undefined>(() => {
  if (!event.value) return undefined
  return buildEventOverviewItem(event.value)
})

const agenda = computed<EventAgendaItem[]>(() => {
  if (!event.value) return []

  return event.value.agenda.map(item => ({
    time: item.time,
    title: localize(item.title),
    desc: localize(item.desc),
  }))
})

const noteItems = computed<EventNoteItem[]>(() => [
  { title: t('rules.step1.title'), desc: t('rules.step1.desc') },
  { title: t('rules.step2.title'), desc: t('rules.step2.desc') },
  { title: t('rules.step3.title'), desc: t('rules.step3.desc') },
  { title: t('rules.step4.title'), desc: t('rules.step4.desc') },
])

const relatedProfiles = computed<EventRelatedProfileItem[]>(() => {
  if (!event.value) return []

  const cityKey = event.value.city.en
  const rankedProfiles = [...mockProfiles].sort((left, right) => profilePriority(right) - profilePriority(left))
  const sameCityProfiles = rankedProfiles.filter(profile => profile.city.en === cityKey)
  const fallbackProfiles = rankedProfiles.filter(profile => profile.city.en !== cityKey)

  return [...sameCityProfiles, ...fallbackProfiles]
    .slice(0, 2)
    .map(profile => ({
      id: profile.id,
      name: profile.name,
      meta: formatRelatedProfileMeta(profile),
      reason: buildRelatedReason(profile, cityKey),
      summary: localize(profile.summary),
    }))
})

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function eventStatusLabel(status: EventOverviewItem['status']) {
  return t(`status.${status}`)
}

function formatDetailDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  } as const

  return map[locale.value]
}

function buildEventOverviewItem(item: MockEvent): EventOverviewItem {
  return {
    id: item.id,
    title: localize(item.title),
    summary: localize(item.summary),
    date: formatDetailDate(item.date),
    city: localize(item.city),
    venue: localize(item.venue),
    format: localize(item.format),
    audience: localize(item.audience),
    seats: `${item.registered} / ${item.seats}`,
    status: item.status,
    statusLabel: eventStatusLabel(item.status),
  }
}

function profilePriority(profile: MockProfile) {
  let score = 0

  if (profile.status === 'vip') score += 4
  if (profile.isVerified) score += 2
  if (profile.familyVisible) score += 1

  return score
}

function formatRelatedProfileMeta(profile: MockProfile) {
  const city = localize(profile.city)
  const intent = localize(profile.intent)

  if (locale.value === 'zh') return `${profile.age}岁 | ${city} | ${intent}`
  if (locale.value === 'fr') return `${profile.age} ans | ${city} | ${intent}`
  return `${profile.age} | ${city} | ${intent}`
}

function buildRelatedReason(profile: MockProfile, cityKey: string) {
  if (profile.city.en === cityKey) return t('relatedReason.sameCity')
  if (profile.status === 'vip') return t('relatedReason.priority')
  if (profile.isVerified) return t('relatedReason.verified')
  return t('relatedReason.curated')
}

function handleProfileOpen(id: string) {
  openSelfDetail(id)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleBackToEvents() {
  navigateByNavKey('common.nav.events', navList)
}

function handleRegisterClick() {
  openRegisterPage('event')
}
</script>

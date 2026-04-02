<template>
  <view class="min-h-screen bg-page-soft text-text-heading">
    <AppHeader
      :nav-list="navList"
      :active-nav="activeNavKey"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1240px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <view
        class="mb-6 inline-flex cursor-pointer items-center gap-2 border border-border-base bg-surface-card px-3 py-2 text-[12px] tracking-[1.2px] text-text-body-soft transition-colors duration-200 hover:text-brand-brown"
        @click="handleBack"
      >
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.75 2.5L4.25 6L7.75 9.5"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <text>{{ backText }}</text>
      </view>

      <view v-if="profile" class="space-y-6">
        <view class="relative overflow-hidden border border-border-inverse bg-home-hero px-6 py-6 text-text-inverse shadow-[0_24px_60px_rgba(13,34,56,0.12)] lg:px-8 lg:py-7">
          <view class="absolute inset-x-0 top-0 h-px bg-white/10" />
          <view class="absolute right-[-80px] top-[-70px] hidden h-[220px] w-[220px] rounded-full border border-white/5 xl:block" />

          <view class="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
            <view class="min-w-0">
              <view class="flex flex-wrap items-center gap-3">
                <view class="inline-flex items-center gap-3">
                  <view class="h-px w-12 bg-border-highlight-soft" />
                  <text class="text-[12px] uppercase tracking-[5px] text-brand-highlight-soft">
                    {{ t('hero.eyebrow') }}
                  </text>
                </view>

                <view class="inline-flex items-center border border-border-highlight-soft/55 bg-border-highlight-soft/10 px-3 py-1 text-[11px] tracking-[2px] text-brand-highlight-strong">
                  {{ recordId }}
                </view>
              </view>

              <view class="mt-5 flex flex-wrap items-start gap-5">
                <view class="flex h-[82px] w-[82px] shrink-0 items-center justify-center border border-border-highlight-soft/50 bg-surface-inverse-panel text-[28px] font-semibold text-brand-highlight-strong">
                  {{ profile.avatar }}
                </view>

                <view class="min-w-0 flex-1">
                  <view class="flex flex-wrap items-center gap-2.5">
                    <view class="text-[36px] font-semibold leading-[1.02] text-text-inverse lg:text-[48px]">
                      {{ profile.name }}
                    </view>

                    <view
                      class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border-inverse-soft bg-surface-inverse-card text-text-inverse-soft"
                    >
                      <svg
                        v-if="profile.gender === 'female'"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="6" cy="3.75" r="2.75" stroke="currentColor" stroke-width="1.2" />
                        <path d="M6 6.75V11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                        <path d="M4.25 9.25H7.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                      </svg>
                      <svg
                        v-else
                        class="h-3.5 w-3.5"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4.5" cy="7.5" r="2.75" stroke="currentColor" stroke-width="1.2" />
                        <path d="M6.75 5.25L11 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                        <path d="M8.25 1H11V3.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </view>
                  </view>

                  <view class="mt-3 text-[17px] leading-7 text-text-inverse-subtle">
                    {{ heroMeta }}
                  </view>

                  <view class="mt-5 flex flex-wrap gap-2.5">
                    <view class="rounded-full border border-border-highlight-soft/55 bg-border-highlight-soft/10 px-3 py-1 text-[12px] text-brand-highlight-strong">
                      {{ statusText }}
                    </view>
                    <view
                      class="rounded-full border px-3 py-1 text-[12px]"
                      :class="profile.isVerified
                        ? 'border-border-highlight-soft/55 bg-border-highlight-soft/10 text-brand-highlight-strong'
                        : 'border-border-inverse-soft bg-surface-inverse-card text-text-inverse-subtle'"
                    >
                      {{ verificationText }}
                    </view>
                    <view
                      class="rounded-full border px-3 py-1 text-[12px]"
                      :class="profile.familyVisible
                        ? 'border-border-highlight-soft/55 bg-border-highlight-soft/10 text-brand-highlight-strong'
                        : 'border-border-inverse-soft bg-surface-inverse-card text-text-inverse-subtle'"
                    >
                      {{ visibilityText }}
                    </view>
                  </view>
                </view>
              </view>

              <view class="mt-6 max-w-[720px] text-[16px] leading-8 text-text-inverse-soft lg:text-[17px]">
                {{ localize(profile.summary) }}
              </view>
            </view>

            <view class="border border-border-inverse-soft bg-surface-inverse-card px-5 py-5">
              <view class="text-[12px] uppercase tracking-[3px] text-brand-highlight-soft">
                {{ t('sections.archiveIndex') }}
              </view>

              <view class="mt-4 space-y-3">
                <view
                  v-for="item in archiveFacts"
                  :key="item.label"
                  class="flex items-start justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
                >
                  <text class="text-[12px] tracking-[1px] text-text-inverse-subtle">
                    {{ item.label }}
                  </text>
                  <text class="max-w-[180px] text-right text-[15px] leading-6 text-text-inverse">
                    {{ item.value }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <view class="space-y-6">
            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)] lg:px-8">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
                {{ t('sections.overview') }}
              </view>

              <view class="mt-6 grid gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
                <view
                  v-for="item in overviewFacts"
                  :key="item.label"
                  class="border-b border-border-light pb-3"
                >
                  <view class="text-[12px] tracking-[1px] text-text-muted">
                    {{ item.label }}
                  </view>
                  <view class="mt-2 text-[16px] leading-7 text-text-body">
                    {{ item.value }}
                  </view>
                </view>
              </view>
            </view>

            <view class="grid gap-6 lg:grid-cols-2">
              <view class="border border-border-base bg-surface-card-soft px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)]">
                <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
                  {{ t('sections.relationship') }}
                </view>

                <view class="mt-5 border border-border-light bg-surface-card px-5 py-5">
                  <view class="text-[12px] tracking-[1px] text-text-muted">
                    {{ t('fields.intent') }}
                  </view>
                  <view class="mt-3 text-[22px] leading-8 text-text-heading">
                    {{ localize(profile.intent) }}
                  </view>

                  <view class="mt-5 text-[12px] tracking-[1px] text-text-muted">
                    {{ t('fields.maritalPlan') }}
                  </view>
                  <view class="mt-3 text-[16px] leading-8 text-text-body">
                    {{ localize(profile.maritalPlan) }}
                  </view>
                </view>

                <view class="mt-6 grid gap-x-6 gap-y-4">
                  <view
                    v-for="item in relationshipFacts"
                    :key="item.label"
                    class="border-b border-border-light pb-3"
                  >
                    <view class="text-[12px] tracking-[1px] text-text-muted">
                      {{ item.label }}
                    </view>
                    <view class="mt-2 text-[16px] leading-7 text-text-body">
                      {{ item.value }}
                    </view>
                  </view>
                </view>
              </view>

              <view class="border border-border-base bg-surface-card px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)]">
                <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
                  {{ t('sections.lifestyle') }}
                </view>

                <view class="mt-6 grid gap-x-6 gap-y-4">
                  <view
                    v-for="item in lifestyleFacts"
                    :key="item.label"
                    class="border-b border-border-light pb-3"
                  >
                    <view class="text-[12px] tracking-[1px] text-text-muted">
                      {{ item.label }}
                    </view>
                    <view class="mt-2 text-[16px] leading-7 text-text-body">
                      {{ item.value }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <view class="border border-border-base bg-surface-card-soft px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)]">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
                {{ t('sections.accessPolicy') }}
              </view>
              <view class="mt-4 text-[16px] leading-8 text-text-body-soft">
                {{ t('hero.accessNote') }}
              </view>
            </view>

            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)]">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
                {{ t('sections.curationFocus') }}
              </view>

              <view class="mt-6 grid gap-4">
                <view
                  v-for="item in spotlightFacts"
                  :key="item.label"
                  class="border-b border-border-light pb-3 last:border-b-0 last:pb-0"
                >
                  <view class="text-[12px] tracking-[1px] text-text-muted">
                    {{ item.label }}
                  </view>
                  <view class="mt-2 text-[16px] leading-7 text-text-body">
                    {{ item.value }}
                  </view>
                </view>
              </view>
            </view>

            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)]">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
                {{ t('sections.highlights') }}
              </view>

              <view class="mt-6 grid gap-3">
                <view
                  v-for="item in highlightTexts"
                  :key="item"
                  class="border border-border-light bg-surface-card-soft px-4 py-4 text-[16px] leading-7 text-text-body"
                >
                  {{ item }}
                </view>
              </view>
            </view>

            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-[0_18px_40px_rgba(30,24,18,0.04)]">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
                {{ t('sections.tags') }}
              </view>

              <view class="mt-5 flex flex-wrap gap-2">
                <view
                  v-for="tag in tagTexts"
                  :key="tag"
                  class="rounded-full border border-border-base bg-surface-panel px-3 py-1.5 text-[12px] text-brand-brown"
                >
                  {{ tag }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <EmptyStatePanel
        v-else
        :title="t('sections.notFoundTitle')"
        :subtitle="t('sections.notFoundSubtitle')"
        :primary-text="backText"
        primary-variant="outline"
        variant="compact"
        @primary="handleBack"
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
import EmptyStatePanel from '@/components/common/EmptyStatePanel.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import {
  getLocalizedLanguageLabel,
  getMockProfileById,
  pickLocalized,
  type LocalizedText,
} from '@/mock/business'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

type DetailSource = 'member' | 'family'
type MaritalStatusValue = 'single' | 'divorced' | 'widowed'
type HabitValue = 'never' | 'social' | 'often'

interface DetailFactItem {
  label: string
  value: string
}

const navList = NAV_LIST
const { t, locale } = usePageI18n('profileDetail')

const profileId = ref('')
const source = ref<DetailSource>('member')

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }

  if (query && query.source === 'family') {
    source.value = 'family'
  }
})

const profile = computed(() => getMockProfileById(profileId.value))

const activeNavKey = computed(() => {
  return source.value === 'family' ? 'common.nav.family' : 'common.nav.profiles'
})

const backText = computed(() => {
  return source.value === 'family' ? t('actions.backToFamily') : t('actions.backToProfiles')
})

const recordId = computed(() => {
  return profile.value ? profile.value.id.toUpperCase() : ''
})

const statusText = computed(() => {
  if (!profile.value) return ''
  return t(`status.${profile.value.status}`)
})

const verificationText = computed(() => {
  if (!profile.value) return ''
  return profile.value.isVerified ? t('badges.verified') : t('badges.unverified')
})

const visibilityText = computed(() => {
  if (!profile.value) return ''
  return profile.value.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')
})

const heroMeta = computed(() => {
  if (!profile.value) return ''

  return [
    localize(profile.value.occupation),
    formatAge(profile.value.age),
    localize(profile.value.city),
  ].join(' / ')
})

const archiveFacts = computed<DetailFactItem[]>(() => {
  if (!profile.value) return []

  return [
    { label: t('fields.recordNumber'), value: recordId.value },
    { label: t('fields.status'), value: statusText.value },
    { label: t('fields.verification'), value: verificationText.value },
    { label: t('fields.visibility'), value: visibilityText.value },
    { label: t('fields.lastActive'), value: formatDate(profile.value.lastActiveAt) },
    { label: t('fields.joinedAt'), value: formatDate(profile.value.joinedAt) },
  ]
})

const spotlightFacts = computed<DetailFactItem[]>(() => {
  if (!profile.value) return []

  return [
    { label: t('fields.education'), value: localize(profile.value.education) },
    { label: t('fields.job'), value: localize(profile.value.occupation) },
    { label: t('fields.languages'), value: formatLanguages(profile.value.languages) },
    { label: t('fields.residencePlan'), value: localize(profile.value.residencePlan) },
  ]
})

const overviewFacts = computed<DetailFactItem[]>(() => {
  if (!profile.value) return []

  return [
    { label: t('fields.age'), value: formatAge(profile.value.age) },
    { label: t('fields.height'), value: formatHeight(profile.value.height) },
    { label: t('fields.city'), value: localize(profile.value.city) },
    { label: t('fields.country'), value: localize(profile.value.country) },
    { label: t('fields.nationality'), value: localize(profile.value.nationality) },
    { label: t('fields.education'), value: localize(profile.value.education) },
    { label: t('fields.job'), value: localize(profile.value.occupation) },
    { label: t('fields.industry'), value: localize(profile.value.industry) },
    { label: t('fields.employer'), value: localize(profile.value.employer) },
    { label: t('fields.income'), value: localize(profile.value.incomeRange) },
  ]
})

const relationshipFacts = computed<DetailFactItem[]>(() => {
  if (!profile.value) return []

  return [
    { label: t('fields.maritalStatus'), value: maritalStatusText(profile.value.maritalStatus) },
    { label: t('fields.children'), value: booleanText(profile.value.hasChildren) },
    { label: t('fields.wantChildren'), value: booleanText(profile.value.wantChildren) },
    { label: t('fields.longDistance'), value: booleanText(profile.value.acceptLongDistance) },
    { label: t('fields.familySupport'), value: familySupportText() },
  ]
})

const lifestyleFacts = computed<DetailFactItem[]>(() => {
  if (!profile.value) return []

  return [
    { label: t('fields.languages'), value: formatLanguages(profile.value.languages) },
    { label: t('fields.smoke'), value: habitText(profile.value.smoke) },
    { label: t('fields.drink'), value: habitText(profile.value.drink) },
    { label: t('fields.exercise'), value: localize(profile.value.exercise) },
    { label: t('fields.residencePlan'), value: localize(profile.value.residencePlan) },
  ]
})

const highlightTexts = computed(() => {
  if (!profile.value) return []
  return profile.value.highlights.map(item => localize(item))
})

const tagTexts = computed(() => {
  if (!profile.value) return []
  return profile.value.tags.map(item => localize(item))
})

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function formatAge(age: number) {
  if (locale.value === 'zh') return `${age}岁`
  if (locale.value === 'fr') return `${age} ans`
  return `${age}`
}

function formatHeight(height: number) {
  return `${height} cm`
}

function formatLanguages(languages: string[]) {
  return languages
    .map(language => getLocalizedLanguageLabel(locale.value, language))
    .join(' / ')
}

function formatDate(date: string) {
  const localeMap = {
    zh: 'zh-CN',
    fr: 'fr-FR',
    en: 'en-US',
  } as const

  return new Date(date).toLocaleDateString(localeMap[locale.value], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function booleanText(value: boolean) {
  return value ? t('values.yes') : t('values.no')
}

function maritalStatusText(status: MaritalStatusValue) {
  return t(`maritalStatus.${status}`)
}

function habitText(value: HabitValue) {
  return t(`habits.${value}`)
}

function familySupportText() {
  if (!profile.value) return ''
  if (profile.value.familyPriority) return t('familySupport.priority')
  if (profile.value.allowFamilyContact) return t('familySupport.contactReady')
  return t('familySupport.contextOnly')
}

function handleBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }

  uni.redirectTo({
    url: source.value === 'family' ? '/pages/family/index' : '/pages/profiles/index',
  })
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>

import { computed } from 'vue'
import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'
import {
  getCurrentMockProfile,
  getMockFavorites,
  getLocalizedLanguageLabel,
  getMockThreads,
  getMockUserEvents,
  mockCurrentUser,
  mockPrivacySettings,
  pickLocalized,
  type LocalizedText,
} from '@/mock/business'

const LOCALE_MAP = {
  zh: 'zh-CN',
  fr: 'fr-FR',
  en: 'en-US',
} as const

export function useAccountData() {
  const { locale, t: globalT } = useLocaleBridge()

  const account = mockCurrentUser
  const profile = getCurrentMockProfile()
  const userEvents = getMockUserEvents()
  const favorites = getMockFavorites()
  const threads = getMockThreads()
  const privacySettings = mockPrivacySettings

  const latestEvent = computed(() => userEvents[0] ?? null)
  const unreadCount = computed(() => threads.reduce((sum, item) => sum + item.thread.unread, 0))
  const familyAssistSetting = computed(() => privacySettings.find(item => item.id === 'privacy-family'))
  const advisorContactSetting = computed(() => privacySettings.find(item => item.id === 'privacy-contact'))
  const visibleFieldsSetting = computed(() => privacySettings.find(item => item.id === 'privacy-visibility'))
  const familyVisibleFavorites = computed(() => favorites.filter(item => item.profile.familyVisible))
  const privateFavorites = computed(() => favorites.filter(item => !item.profile.familyVisible))
  const familyVisibleThreads = computed(() => threads.filter(item => item.profile.familyVisible))

  function localize(text: LocalizedText) {
    return pickLocalized(locale.value, text)
  }

  function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
    return new Date(date).toLocaleDateString(
      LOCALE_MAP[locale.value],
      options ?? { year: 'numeric', month: 'short', day: 'numeric' }
    )
  }

  function formatDateTime(date: string, options?: Intl.DateTimeFormatOptions) {
    return new Date(date).toLocaleString(
      LOCALE_MAP[locale.value],
      options ?? { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    )
  }

  function membershipLabel(membership: 'free' | 'silver' | 'gold' | 'diamond' = account.membership) {
    return globalT(`membership.${membership}.title`)
  }

  function formatLanguages(languages: string[]) {
    return languages.map(language => getLocalizedLanguageLabel(locale.value, language)).join(' / ')
  }

  return {
    account,
    profile,
    userEvents,
    favorites,
    threads,
    privacySettings,
    latestEvent,
    unreadCount,
    familyAssistSetting,
    advisorContactSetting,
    visibleFieldsSetting,
    familyVisibleFavorites,
    privateFavorites,
    familyVisibleThreads,
    localize,
    formatDate,
    formatDateTime,
    formatLanguages,
    membershipLabel,
  }
}

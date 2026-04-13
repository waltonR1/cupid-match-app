import { computed, inject, onMounted, provide, reactive, ref, type InjectionKey } from 'vue'
import {
  getAccountLanguageLabel,
  getAccountOverview,
  getAccountOverviewSnapshot,
  pickLocalized,
  type AccountFavoriteRecord,
  type AccountMembershipLevel,
  type AccountPrivacySetting,
  type AccountProfile,
  type AccountThreadRecord,
  type AccountUserEventRecord,
  type LocalizedText,
} from '@/api/modules/account'
import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'

const LOCALE_MAP = {
  zh: 'zh-CN',
  fr: 'fr-FR',
  en: 'en-US',
} as const

export function useAccountData() {
  const { locale, t: globalT } = useLocaleBridge()
  const initialData = getAccountOverviewSnapshot()

  const account = reactive({ ...initialData.account })
  const profile = reactive((initialData.profile ?? {}) as AccountProfile)
  const userEvents = reactive<AccountUserEventRecord[]>([...initialData.userEvents])
  const favorites = reactive<AccountFavoriteRecord[]>([...initialData.favorites])
  const threads = reactive<AccountThreadRecord[]>([...initialData.threads])
  const privacySettings = reactive<AccountPrivacySetting[]>([...initialData.privacySettings])
  const loading = ref(false)
  const error = ref<unknown>(null)

  onMounted(() => {
    void refresh()
  })

  const latestEvent = computed(() => userEvents[0] ?? null)
  const unreadCount = computed(() => threads.reduce((sum, item) => sum + item.thread.unread, 0))
  const familyAssistSetting = computed(() => privacySettings.find(item => item.id === 'privacy-family'))
  const advisorContactSetting = computed(() => privacySettings.find(item => item.id === 'privacy-contact'))
  const visibleFieldsSetting = computed(() => privacySettings.find(item => item.id === 'privacy-visibility'))
  const familyVisibleFavorites = computed(() => favorites.filter(item => item.profile.familyVisible))
  const privateFavorites = computed(() => favorites.filter(item => !item.profile.familyVisible))
  const familyVisibleThreads = computed(() => threads.filter(item => item.profile.familyVisible))
  const verificationCount = computed(() => {
    let count = 1

    if (profile.familyVisible) count += 1
    if (familyAssistSetting.value?.enabled) count += 1
    if (account.membership !== 'free') count += 1

    return count
  })
  const topSummaryItems = computed(() => [
    {
      key: 'completion',
      value: `${account.completion}%`,
    },
    {
      key: 'verification',
      value: String(verificationCount.value),
    },
    {
      key: 'membership',
      value: membershipLabel(account.membership),
    },
    {
      key: 'activity',
      value: String(userEvents.length),
    },
  ])

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

  function membershipLabel(membership: AccountMembershipLevel = account.membership) {
    return globalT(`membership.${membership}.title`)
  }

  function formatLanguages(languages: string[]) {
    return languages.map(language => getAccountLanguageLabel(locale.value, language)).join(' / ')
  }

  async function refresh() {
    loading.value = true
    error.value = null

    try {
      const response = await getAccountOverview()
      const data = response.data

      Object.assign(account, data.account)
      Object.assign(profile, data.profile ?? {})
      replaceArray(userEvents, data.userEvents)
      replaceArray(favorites, data.favorites)
      replaceArray(threads, data.threads)
      replaceArray(privacySettings, data.privacySettings)
    } catch (requestError) {
      error.value = requestError
      console.warn('Failed to load account data.', requestError)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
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
    topSummaryItems,
    localize,
    formatDate,
    formatDateTime,
    formatLanguages,
    membershipLabel,
    refresh,
  }
}

export type AccountDataContext = ReturnType<typeof useAccountData>
export const accountDataKey: InjectionKey<AccountDataContext> = Symbol('account-data')

export function provideAccountDataContext(accountData: AccountDataContext) {
  provide(accountDataKey, accountData)
}

export function useAccountDataContext() {
  const accountData = inject(accountDataKey)

  if (!accountData) {
    throw new Error('Account data context is not available outside AccountShell.')
  }

  return accountData
}

function replaceArray<T>(target: T[], value: T[]) {
  target.splice(0, target.length, ...value)
}

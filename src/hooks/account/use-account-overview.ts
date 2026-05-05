import { computed, reactive, ref, watch } from 'vue'
import {
  getAccountOverview,
  type AccountFavoriteRecord,
  type AccountOverviewResponse,
  type AccountPrivacySetting,
  type AccountProfileSummary,
  type AccountThreadRecord,
  type AccountUserEventRecord,
} from '@/api/account'
import { useLocaleStore } from '@/stores/modules/locale'

export function useAccountOverview() {
  const initialData = createEmptyAccountOverview()
  const localeStore = useLocaleStore()

  const account = reactive({ ...initialData.account })
  const profile = reactive(createEmptyAccountProfileSummary())
  const userEvents = reactive<AccountUserEventRecord[]>([...initialData.userEvents])
  const favorites = reactive<AccountFavoriteRecord[]>([...initialData.favorites])
  const threads = reactive<AccountThreadRecord[]>([...initialData.threads])
  const privacySettings = reactive<AccountPrivacySetting[]>([...initialData.privacySettings])
  const loading = ref(false)
  const error = ref<unknown>(null)

  const latestEvent = computed(() => userEvents[0] ?? null)
  const unreadCount = computed(() => threads.reduce((sum, item) => sum + item.thread.unread, 0))
  const familyAssistSetting = computed(() => privacySettings.find((item) => item.id === 'privacy-family'))
  const advisorContactSetting = computed(() => privacySettings.find((item) => item.id === 'privacy-contact'))
  const visibleFieldsSetting = computed(() => privacySettings.find((item) => item.id === 'privacy-visibility'))
  const familyVisibleFavorites = computed(() => favorites.filter((item) => item.profile.familyVisible))
  const privateFavorites = computed(() => favorites.filter((item) => !item.profile.familyVisible))
  const familyVisibleThreads = computed(() => threads.filter((item) => item.profile.familyVisible))
  const verificationCount = computed(() => {
    let count = 1

    if (profile.familyVisible) count += 1
    if (familyAssistSetting.value?.enabled) count += 1
    if (account.membership !== 'free') count += 1

    return count
  })

  watch(() => localeStore.locale, () => {
    void refresh()
  }, { immediate: true })

  async function refresh() {
    loading.value = true
    error.value = null

    try {
      const data = await getAccountOverview()

      Object.assign(account, data.account)
      Object.assign(profile, createEmptyAccountProfileSummary(), data.profile ?? {})
      replaceArray(userEvents, data.userEvents)
      replaceArray(favorites, data.favorites)
      replaceArray(threads, data.threads)
      replaceArray(privacySettings, data.privacySettings)
    } catch (requestError) {
      error.value = requestError
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
    verificationCount,
    refresh,
  }
}

export type AccountOverviewContext = ReturnType<typeof useAccountOverview>

function replaceArray<T>(target: T[], value: T[]) {
  target.splice(0, target.length, ...value)
}

function createEmptyAccountOverview(): AccountOverviewResponse {
  return {
    account: {
      id: '',
      realName: '',
      nickName: '',
      avatarUrl: '',
      displayName: '',
      city: '',
      joinedAt: '',
      profileId: '',
      completion: 0,
      membership: 'free',
      bio: '',
    },
    profile: null,
    userEvents: [],
    favorites: [],
    threads: [],
    privacySettings: [],
  }
}

function createEmptyAccountProfileSummary(): AccountProfileSummary {
  return {
    id: '',
    displayName: '',
    city: '',
    education: '',
    occupation: '',
    maritalStatus: 'single',
    languages: [],
    familyVisible: false,
    summary: '',
    highlights: [],
    tags: [],
  }
}

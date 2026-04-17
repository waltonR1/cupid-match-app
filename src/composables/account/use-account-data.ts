import { computed, onMounted, reactive, ref } from 'vue'
import {
  getAccountOverview,
  getAccountOverviewSnapshot,
  type AccountFavoriteRecord,
  type AccountPrivacySetting,
  type AccountProfile,
  type AccountThreadRecord,
  type AccountUserEventRecord,
} from '@/api/modules/account'

export function useAccountData() {
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
    verificationCount,
    refresh,
  }
}

export type AccountDataContext = ReturnType<typeof useAccountData>

function replaceArray<T>(target: T[], value: T[]) {
  target.splice(0, target.length, ...value)
}

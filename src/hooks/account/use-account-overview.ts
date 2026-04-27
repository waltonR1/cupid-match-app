import { computed, reactive, ref } from 'vue'
import {
  getAccountOverview,
  type AccountFavoriteRecordDTO,
  type AccountOverviewDTO,
  type AccountPrivacySettingDTO,
  type AccountProfileDTO,
  type AccountThreadRecordDTO,
  type AccountUserEventRecordDTO,
} from '@/api/account/account'

export function useAccountOverview() {
  const initialData = createEmptyAccountOverview()

  const account = reactive({ ...initialData.account })
  const profile = reactive((initialData.profile ?? {}) as AccountProfileDTO)
  const userEvents = reactive<AccountUserEventRecordDTO[]>([...initialData.userEvents])
  const favorites = reactive<AccountFavoriteRecordDTO[]>([...initialData.favorites])
  const threads = reactive<AccountThreadRecordDTO[]>([...initialData.threads])
  const privacySettings = reactive<AccountPrivacySettingDTO[]>([...initialData.privacySettings])
  const loading = ref(false)
  const error = ref<unknown>(null)

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

  void refresh()

  async function refresh() {
    loading.value = true
    error.value = null

    try {
      const data = await getAccountOverview()

      Object.assign(account, data.account)
      Object.assign(profile, data.profile ?? {})
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

function createEmptyAccountOverview(): AccountOverviewDTO {
  return {
    account: {
      id: '',
      realName: '',
      nickName: '',
      avatarUrl: '',
      displayName: '',
      city: localized('', '', ''),
      joinedAt: '',
      profileId: '',
      completion: 0,
      membership: 'free',
      bio: localized('', '', ''),
    },
    profile: null,
    userEvents: [],
    favorites: [],
    threads: [],
    privacySettings: [],
  }
}

function localized(zh: string, fr: string, en: string) {
  return { zh, fr, en }
}

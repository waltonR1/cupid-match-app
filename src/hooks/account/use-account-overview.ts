import { computed, reactive, ref, watch } from 'vue'
import { getAccountOverview, type AccountShellUser } from '@/api/account'
import { useAuthStore, type UserInfo } from '@/stores/modules/auth'
import { useLocaleStore } from '@/stores/modules/locale'

export function useAccountOverview() {
  const authStore = useAuthStore()
  const localeStore = useLocaleStore()
  const user = reactive<AccountShellUser>(createEmptyAccountUser())
  const loading = ref(false)
  const error = ref<unknown>(null)

  const currentUserId = computed(() => authStore.user?.id ?? '')
  const isSignedIn = computed(() => Boolean(currentUserId.value))

  watch([() => localeStore.locale, currentUserId], () => {
    void refresh()
  }, { immediate: true })

  async function refresh() {
    if (!currentUserId.value) {
      resetOverview()
      error.value = null
      loading.value = false
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await getAccountOverview()
      Object.assign(user, data.user)
    } catch (requestError) {
      error.value = requestError
      Object.assign(user, createAuthFallbackUser(authStore.user))
    } finally {
      loading.value = false
    }
  }

  function resetOverview() {
    Object.assign(user, createEmptyAccountUser())
  }

  return {
    loading,
    error,
    user,
    isSignedIn,
    refresh,
  }
}

export type AccountOverviewContext = ReturnType<typeof useAccountOverview>

function createEmptyAccountUser(): AccountShellUser {
  return {
    id: '',
    accountName: '',
    avatarUrl: '',
    joinedAt: '',
    membership: 'free',
  }
}

function createAuthFallbackUser(user: UserInfo | null): AccountShellUser {
  if (!user) return createEmptyAccountUser()

  return {
    id: user.id,
    accountName: user.accountName,
    avatarUrl: user.avatarUrl,
    joinedAt: '',
    membership: 'free',
  }
}

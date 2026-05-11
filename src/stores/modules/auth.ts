import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface UserInfo {
  id: string
  accountName: string
  avatarUrl: string
  onboardingPath: 'self' | 'family'
  onboardingStep: 'create_profile' | 'review_profile' | 'browse'
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref<UserInfo | null>(null)

  const accountName = computed(() => {
    return user.value?.accountName || ''
  })

  const avatarUrl = computed(() => {
    return user.value?.avatarUrl || ''
  })

  const onboardingPath = computed(() => {
    return user.value?.onboardingPath ?? 'self'
  })

  const onboardingStep = computed(() => {
    return user.value?.onboardingStep ?? 'create_profile'
  })

  function login(nextUser: UserInfo) {
    isLoggedIn.value = true
    user.value = nextUser
  }

  function logout() {
    isLoggedIn.value = false
    user.value = null
  }

  return {
    isLoggedIn,
    user,
    accountName,
    avatarUrl,
    onboardingPath,
    onboardingStep,
    login,
    logout,
  }
}, {
  persist: {
    paths: ['isLoggedIn', 'user'],
  },
})

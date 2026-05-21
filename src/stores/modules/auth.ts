import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {AuthSession, AuthUser} from '@/api/auth'

export type UserInfo = AuthUser

/** 认证状态 Store */
export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const token = ref('')
  const user = ref<UserInfo | null>(null)

  const accountName = computed(() => user.value?.accountName || '')
  const avatarUrl = computed(() => user.value?.avatarUrl || '')
  const preferredLocale = computed(() => user.value?.preferredLocale ?? 'zh')

  function login(session: AuthSession) {
    isLoggedIn.value = true
    token.value = session.token
    user.value = session.user
  }

  function logout() {
    isLoggedIn.value = false
    token.value = ''
    user.value = null
  }

  return {
    isLoggedIn,
    token,
    user,
    accountName,
    avatarUrl,
    preferredLocale,
    login,
    logout,
  }
}, {
  persist: {
    paths: ['isLoggedIn', 'token', 'user'],
  },
})

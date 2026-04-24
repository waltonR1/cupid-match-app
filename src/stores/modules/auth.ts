import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface UserInfo {
  id?: string
  displayName: string
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref<UserInfo | null>(null)

  const displayName = computed(() => {
    return user.value?.displayName || ''
  })

  const avatarUrl = computed(() => {
    return user.value?.avatarUrl || ''
  })

  function login(nextUser: UserInfo) {
    isLoggedIn.value = true
    user.value = nextUser
  }

  function loginMock() {
    login({
      id: 'u-001',
      displayName: 'U-001',
      avatarUrl: '',
    })
  }

  function logout() {
    isLoggedIn.value = false
    user.value = null
  }

  function toggleLoginStatus() {
    if (isLoggedIn.value) {
      logout()
    } else {
      loginMock()
    }
  }

  return {
    isLoggedIn,
    user,
    displayName,
    avatarUrl,
    login,
    loginMock,
    logout,
    toggleLoginStatus,
  }
}, {
  persist: {
    paths: ['isLoggedIn', 'user'],
  },
})

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


  function logout() {
    isLoggedIn.value = false
    user.value = null
  }


  return {
    isLoggedIn,
    user,
    displayName,
    avatarUrl,
    login,
    logout,
  }
}, {
  persist: {
    paths: ['isLoggedIn', 'user'],
  },
})

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface UserInfo {
  id?: string
  displayName: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref<UserInfo | null>(null)

  const displayName = computed(() => {
    return user.value?.displayName || ''
  })

  const avatar = computed(() => {
    return user.value?.avatar || ''
  })

  function loginMock() {
    isLoggedIn.value = true
    user.value = {
      id: '1',
      displayName: 'Claire',
      avatar: '',
    }
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
    avatar,
    loginMock,
    logout,
    toggleLoginStatus,
  }
}, {
  persist: {
    paths: ['isLoggedIn', 'user'],
  },
})

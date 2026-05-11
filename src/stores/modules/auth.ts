import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/** 当前登录用户信息 */
export interface UserInfo {
  /** 用户 ID */
  id: string

  /** 账号名称 */
  accountName: string

  /** 头像地址 */
  avatarUrl: string

  /** 新用户引导类型 */
  onboardingPath: 'self' | 'family'

  /** 新用户引导进度 */
  onboardingStep: 'create_profile' | 'review_profile' | 'browse'
}

/** 认证状态 Store */
export const useAuthStore = defineStore('auth', () => {
  /** 是否已登录 */
  const isLoggedIn = ref(false)

  /** 当前用户信息 */
  const user = ref<UserInfo | null>(null)

  /** 当前账号名称 */
  const accountName = computed(() => {
    return user.value?.accountName || ''
  })

  /** 当前用户头像 */
  const avatarUrl = computed(() => {
    return user.value?.avatarUrl || ''
  })

  /** 当前用户引导类型 */
  const onboardingPath = computed(() => {
    return user.value?.onboardingPath ?? 'self'
  })

  /** 当前用户引导进度 */
  const onboardingStep = computed(() => {
    return user.value?.onboardingStep ?? 'create_profile'
  })

  /** 登录并写入用户信息 */
  function login(nextUser: UserInfo) {
    isLoggedIn.value = true
    user.value = nextUser
  }

  /** 退出登录并清空用户信息 */
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
    // 仅持久化登录状态和用户信息
    paths: ['isLoggedIn', 'user'],
  },
})
import { onShow } from '@dcloudio/uni-app'
import { useAuthStore } from '@/stores/modules/auth'

export function useRequireAuth() {
  onShow(() => {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      uni.redirectTo({ url: '/pages/auth/login' })
    }
  })
}

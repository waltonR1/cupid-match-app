import { onShow } from '@dcloudio/uni-app'
import { resolveDebugEnabled } from '@/config/app'

export function useDebugGuard() {
  onShow(() => {
    if (!resolveDebugEnabled()) {
      uni.redirectTo({ url: '/pages/not-found' })
    }
  })
}

import { useAuthStore } from '@/stores/modules/auth'

const PROTECTED_PREFIXES = [
  '/pages/account/',
  '/pages/profiles/',
  '/pages/messages/',
]

const LOGIN_PATH = '/pages/auth/login'

function isProtected(path: string) {
  return PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix))
}

function guard(args: { url: string }) {
  const url = typeof args.url === 'string' ? args.url.split('?')[0] ?? '' : ''
  if (!isProtected(url)) return

  const auth = useAuthStore()
  if (!auth.isLoggedIn) {
    uni.navigateTo({ url: LOGIN_PATH })
    return false
  }
}

export function installRouteGuard() {
  uni.addInterceptor('navigateTo', { invoke: guard })
  uni.addInterceptor('redirectTo', { invoke: guard })
  uni.addInterceptor('reLaunch', { invoke: guard })
}

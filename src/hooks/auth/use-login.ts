import { login as loginApi, type LoginPayload } from '@/api/auth'
import { useAuthStore } from '@/stores/modules/auth'
import { useLocaleStore } from '@/stores/modules/locale'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

/** 登录业务 Hook */
export function useLogin() {
  const auth = useAuthStore()
  const locale = useLocaleStore()
  const latest = useLatestRequest()

  async function login(payload: LoginPayload) {
    const session = await latest.run(() => loginApi(payload))
    if (!session) return undefined

    auth.login(session)
    locale.setLocale(session.user.preferredLocale)
    return session
  }

  return {
    loading: latest.loading,
    error: latest.error,
    login,
  }
}

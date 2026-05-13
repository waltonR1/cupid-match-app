import { isApiStatusError } from '@/api/shared/http'
import { register as registerApi, type RegisterPayload } from '@/api/auth'
import { useAuthStore } from '@/stores/modules/auth'
import { useLocaleStore } from '@/stores/modules/locale'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

/** 注册业务 Hook */
export function useRegister() {
  const auth = useAuthStore()
  const locale = useLocaleStore()
  const latest = useLatestRequest()

  async function register(payload: RegisterPayload) {
    const session = await latest.run(() => registerApi(payload))
    if (!session) return undefined

    auth.login(session)
    locale.setLocale(session.user.preferredLocale)
    return session
  }

  return {
    loading: latest.loading,
    error: latest.error,
    register,
  }
}

export function isDuplicateRegistrationError(error: unknown) {
  return isApiStatusError(error, 409)
}

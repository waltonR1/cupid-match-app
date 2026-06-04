import {
  isDuplicateRegistrationError as isDuplicateRegistrationApiError,
  register as registerApi,
  requestAuthVerificationCode,
  type AuthVerificationCodeRequestPayload,
  type RegisterPayload,
} from '@/api/auth'
import { useAuthStore } from '@/stores/modules/auth'
import { useLocaleStore } from '@/stores/modules/locale'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

/** 注册业务 Hook */
export function useRegister() {
  const auth = useAuthStore()
  const locale = useLocaleStore()
  const registerLatest = useLatestRequest()
  const codeLatest = useLatestRequest()

  async function register(payload: RegisterPayload) {
    const session = await registerLatest.run(() => registerApi(payload))
    if (!session) return undefined

    auth.login(session)
    locale.setLocale(session.user.preferredLocale)
    return session
  }

  async function requestVerificationCode(payload: AuthVerificationCodeRequestPayload) {
    const result = await codeLatest.run(() => requestAuthVerificationCode(payload))
    return result ?? null
  }

  return {
    loading: registerLatest.loading,
    error: registerLatest.error,
    verificationError: codeLatest.error,
    register,
    requestVerificationCode,
  }
}

export function isDuplicateRegistrationError(error: unknown) {
  return isDuplicateRegistrationApiError(error)
}

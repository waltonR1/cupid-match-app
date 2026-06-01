import { requestPasswordResetCode, resetPassword, type PasswordResetCodePayload, type PasswordResetPayload } from '@/api/auth'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useForgotPassword() {
  const codeRequest = useLatestRequest()
  const resetRequest = useLatestRequest()

  function sendResetCode(payload: PasswordResetCodePayload) {
    return codeRequest.run(() => requestPasswordResetCode(payload))
  }

  function submitPasswordReset(payload: PasswordResetPayload) {
    return resetRequest.run(() => resetPassword(payload))
  }

  return {
    codeSending: codeRequest.loading,
    codeError: codeRequest.error,
    resetting: resetRequest.loading,
    resetError: resetRequest.error,
    sendResetCode,
    submitPasswordReset,
  }
}

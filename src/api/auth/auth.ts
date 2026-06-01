import { requestJson } from '@/api/shared/http'
import type {
  AuthSession,
  AuthVerificationCodeRequestPayload,
  AuthVerificationCodeRequestResult,
  LoginPayload,
  PasswordResetCodePayload,
  PasswordResetPayload,
  RegisterPayload,
} from './auth.types'

export function login(payload: LoginPayload): Promise<AuthSession> {
  return requestJson<AuthSession>('/auth/login', {
    method: 'POST',
    data: payload,
  })
}

export function register(payload: RegisterPayload): Promise<AuthSession> {
  return requestJson<AuthSession>('/auth/register', {
    method: 'POST',
    data: payload,
  })
}

export function requestAuthVerificationCode(payload: AuthVerificationCodeRequestPayload): Promise<AuthVerificationCodeRequestResult> {
  return requestJson<AuthVerificationCodeRequestResult>('/auth/verification-code', {
    method: 'POST',
    data: payload,
  })
}

export function requestPasswordResetCode(payload: PasswordResetCodePayload): Promise<AuthVerificationCodeRequestResult> {
  return requestJson<AuthVerificationCodeRequestResult>('/auth/password-reset-code', {
    method: 'POST',
    data: payload,
  })
}

export function resetPassword(payload: PasswordResetPayload): Promise<{ success: boolean }> {
  return requestJson<{ success: boolean }>('/auth/password/reset', {
    method: 'POST',
    data: payload,
  })
}

import { apiRequest, isApiStatusError } from '@/api/shared/http'
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
  return apiRequest<AuthSession>('/auth/login', {
    method: 'POST',
    data: payload,
  })
}

export function logoutSession(): Promise<void> {
  return apiRequest<void>('/auth/logout', {
    method: 'POST',
    data: {},
  })
}

export function register(payload: RegisterPayload): Promise<AuthSession> {
  return apiRequest<AuthSession>('/auth/register', {
    method: 'POST',
    data: payload,
  })
}

export function requestAuthVerificationCode(payload: AuthVerificationCodeRequestPayload): Promise<AuthVerificationCodeRequestResult> {
  return apiRequest<AuthVerificationCodeRequestResult>('/auth/verification-code', {
    method: 'POST',
    data: payload,
  })
}

export function requestPasswordResetCode(payload: PasswordResetCodePayload): Promise<AuthVerificationCodeRequestResult> {
  return apiRequest<AuthVerificationCodeRequestResult>('/auth/password-reset-code', {
    method: 'POST',
    data: payload,
  })
}

export function resetPassword(payload: PasswordResetPayload): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>('/auth/password/reset', {
    method: 'POST',
    data: payload,
  })
}

export function isDuplicateRegistrationError(error: unknown) {
  return isApiStatusError(error, 409)
}

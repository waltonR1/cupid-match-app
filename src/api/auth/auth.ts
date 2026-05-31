import { requestJson } from '@/api/shared/http'
import type {
  AuthSession,
  AuthVerificationCodeRequestPayload,
  AuthVerificationCodeRequestResult,
  LoginPayload,
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

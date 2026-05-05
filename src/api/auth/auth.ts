import { requestJson } from '@/api/shared/http'
import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from './auth.types'

export type {
  AuthSession,
  AuthUser,
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

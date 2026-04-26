import { requestJson } from '@/api/shared/http'
import type { AuthApiClient } from './auth.contract'
import type { AuthSessionDTO, LoginPayload, RegisterPayload } from './auth.types'

export function createHttpAuthApiClient(): AuthApiClient {
  return {
    login(payload: LoginPayload) {
      return requestJson<AuthSessionDTO>('/auth/login', {
        method: 'POST',
        data: payload,
      })
    },
    register(payload: RegisterPayload) {
      return requestJson<AuthSessionDTO>('/auth/register', {
        method: 'POST',
        data: payload,
      })
    },
  }
}

import { requestJson } from '@/api/shared/http'
import type { AuthSessionDTO, AuthUserDTO, LoginPayload, RegisterPayload } from './auth.types'

export type {
  AuthSessionDTO,
  AuthUserDTO,
  LoginPayload,
  RegisterPayload,
} from './auth.types'

export function login(payload: LoginPayload): Promise<AuthSessionDTO> {
  return requestJson<AuthSessionDTO>('/auth/login', {
    method: 'POST',
    data: payload,
  })
}

export function register(payload: RegisterPayload): Promise<AuthSessionDTO> {
  return requestJson<AuthSessionDTO>('/auth/register', {
    method: 'POST',
    data: payload,
  })
}

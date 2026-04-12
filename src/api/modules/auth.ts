import type { UserInfo } from '@/stores/modules/auth'
import { mockRequest } from '../mock-request'

export interface LoginPayload {
  identity: string
  password: string
}

export interface RegisterPayload {
  role: 'self' | 'parent'
  email: string
  password: string
  name: string
  city: string
}

export interface AuthSession {
  token: string
  user: UserInfo
}

export function login(payload: LoginPayload) {
  return mockRequest<AuthSession>({
    token: 'mock-token',
    user: {
      id: '1',
      displayName: payload.identity.trim() || 'Claire',
      avatar: '',
    },
  })
}

export function register(payload: RegisterPayload) {
  return mockRequest<AuthSession>({
    token: 'mock-token',
    user: {
      id: '1',
      displayName: payload.name.trim() || payload.email.trim() || 'Claire',
      avatar: '',
    },
  })
}

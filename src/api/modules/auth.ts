import { getDisplayName } from '@/utils/display-name'
import type { UserInfo } from '@/stores/modules/auth'

export interface LoginPayload {
  identity: string
  password: string
}

export interface RegisterPayload {
  role: 'self' | 'parent'
  email: string
  password: string
  nickName: string
  city: string
}

export interface AuthSession {
  token: string
  user: UserInfo
}

export function login(payload: LoginPayload) {
  return {
    token: 'mock-token',
    user: {
      id: 'u-001',
      displayName: getDisplayName({ id: 'u-001' }),
      avatarUrl: '',
    },
  }
}

export function register(payload: RegisterPayload) {
  return {
    token: 'mock-token',
    user: {
      id: 'u-001',
      displayName: getDisplayName({ id: 'u-001' }),
      avatarUrl: '',
    },
  }
}

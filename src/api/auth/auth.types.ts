export type AuthPath = 'self' | 'family'
export type AuthProvider = 'email' | 'phone'
export type AuthLocale = 'zh' | 'fr' | 'en'

export interface LoginPayload {
  identifier: string
  password: string
}

export interface RegisterPayload {
  path: AuthPath
  provider: AuthProvider
  identifier: string
  password: string
  accountName: string
  preferredLocale: AuthLocale
}

export interface AuthUser {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: AuthLocale
}

export interface AuthSession {
  token: string
  user: AuthUser
}

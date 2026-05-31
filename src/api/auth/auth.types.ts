export type AuthPath = 'self' | 'family'
export type AuthProvider = 'email' | 'phone'
export type AuthLocale = 'zh' | 'fr' | 'en'
export type AuthMembershipTier = 'free' | 'silver' | 'gold' | 'diamond'
export type AuthMembershipStatus = 'active' | 'expired' | 'cancelled' | 'paused'

export interface LoginPayload {
  identifier: string
  password: string
}

export interface RegisterPayload {
  path: AuthPath
  provider: AuthProvider
  identifier: string
  code: string
  password: string
  accountName: string
  preferredLocale: AuthLocale
}

export interface AuthVerificationCodeRequestPayload {
  provider: AuthProvider
  identifier: string
}

export interface AuthVerificationCodeRequestResult {
  id: string
  expiresAt: string
}

export interface AuthUser {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: AuthLocale
  status: 'active' | 'deactivated' | 'suspended'
}

export interface AuthMembership {
  tier: AuthMembershipTier
  status: AuthMembershipStatus
}

export interface AuthSession {
  token: string
  user: AuthUser
  membership: AuthMembership | null
}

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

export interface AuthMembership {
  tier: AuthMembershipTier
  status: AuthMembershipStatus
}

export interface AuthSession {
  token: string
  user: AuthUser
  membership: AuthMembership | null
}

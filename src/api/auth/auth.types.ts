export interface LoginPayload {
  identifier: string
  password: string
}

export interface RegisterPayload {
  path: 'self' | 'family'
  provider: 'email' | 'phone' | 'wechat'
  identifier: string
  password: string
  accountName: string
  city: string
  preferredLocale: 'zh' | 'fr' | 'en'
}

export interface AuthUser {
  id: string
  accountName: string
  avatarUrl: string
  onboardingPath: 'self' | 'family'
  onboardingStep: 'create_profile' | 'review_profile' | 'browse'
}

export interface AuthSession {
  token: string
  user: AuthUser
}

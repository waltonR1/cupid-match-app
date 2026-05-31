export interface VerificationCodeDebugItem {
  id: string
  provider: 'email' | 'phone'
  identifier: string
  code: string
  expiresAt: string
}

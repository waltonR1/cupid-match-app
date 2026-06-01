import { apiRequest } from '@/api/shared/http'
import type { VerificationCodeDebugItem } from './verification-codes.types'

export function listVerificationCodeDebugItems(): Promise<VerificationCodeDebugItem[]> {
  return apiRequest<VerificationCodeDebugItem[]>('/debug/verification-codes')
}

import { requestJson } from '@/api/shared/http'
import type { VerificationCodeDebugItem } from './verification-codes.types'

export function listVerificationCodeDebugItems(): Promise<VerificationCodeDebugItem[]> {
  return requestJson<VerificationCodeDebugItem[]>('/debug/verification-codes')
}

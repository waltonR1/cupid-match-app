import {requestJson} from '@/api/shared/http'
import type {PrivateIntroductionDebugItem, PrivateIntroductionDebugResponse} from './private-introductions.types'

export function getPrivateIntroductionDebugRequests(): Promise<PrivateIntroductionDebugResponse> {
  return requestJson<PrivateIntroductionDebugResponse>('/debug/private-introductions')
}

export function acceptPrivateIntroductionDebugRequest(id: string): Promise<PrivateIntroductionDebugItem> {
  return requestJson<PrivateIntroductionDebugItem>(`/debug/private-introductions/${id}/accept`, {
    method: 'POST',
    data: {},
  })
}

export function declinePrivateIntroductionDebugRequest(id: string): Promise<PrivateIntroductionDebugItem> {
  return requestJson<PrivateIntroductionDebugItem>(`/debug/private-introductions/${id}/decline`, {
    method: 'POST',
    data: {},
  })
}

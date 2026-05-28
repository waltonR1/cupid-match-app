import { requestJson } from '@/api/shared/http'
import type { InboxDebugThread, InboxNotifyPayload, InboxNotifyResult } from './inbox.types'

export function listInboxDebugThreads(): Promise<InboxDebugThread[]> {
  return requestJson<InboxDebugThread[]>('/debug/inbox/threads')
}

export function sendInboxDebugNotification(payload: InboxNotifyPayload): Promise<InboxNotifyResult> {
  return requestJson<InboxNotifyResult>('/debug/inbox/notify', { method: 'POST', data: payload })
}

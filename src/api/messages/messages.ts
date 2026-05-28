import { requestJson } from '@/api/shared/http'
import type { InboxThreadDTO } from './messages.types'

export function getInboxThreads(): Promise<InboxThreadDTO[]> {
  return requestJson<InboxThreadDTO[]>('/inbox/threads')
}

export function markInboxThreadRead(threadId: string): Promise<{ threadId: string; lastReadAt: string }> {
  return requestJson<{ threadId: string; lastReadAt: string }>(`/inbox/threads/${threadId}/read`, { method: 'POST' })
}

import { apiRequest } from '@/api/shared/http'
import type { InboxMessagesPage, InboxThreadDTO } from './messages.types'

export function getInboxThreads(): Promise<InboxThreadDTO[]> {
  return apiRequest<InboxThreadDTO[]>('/inbox/threads')
}

export function getInboxMessages(threadId: string, before?: string): Promise<InboxMessagesPage> {
  const query = before ? { before, limit: 20 } : { limit: 20 }
  return apiRequest<InboxMessagesPage>(`/inbox/threads/${threadId}/messages`, { query: query as Record<string, string | number> })
}

export function markInboxThreadRead(threadId: string): Promise<{ threadId: string; lastReadAt: string }> {
  return apiRequest<{ threadId: string; lastReadAt: string }>(`/inbox/threads/${threadId}/read`, { method: 'POST', data: {} })
}

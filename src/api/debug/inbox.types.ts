import type { InboxSubjectType } from '@/api/messages'

export interface InboxDebugThread {
  id: string
  userId: string
  subjectType?: InboxSubjectType
  subjectId?: string
  status: string
  messageCount: number
  createdAt: string
  updatedAt: string
}

export interface InboxNotifyPayload {
  userId?: string
  templateCode?: string
  templateLocale?: 'zh' | 'en' | 'fr'
  body?: string
}

export interface InboxNotifyResult {
  threadId: string
  messageId: string
  userId: string
  templateCode: string
  templateLocale: string
  body: string
  createdAt: string
}

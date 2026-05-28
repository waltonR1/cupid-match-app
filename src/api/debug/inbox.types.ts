export interface InboxDebugThread {
  id: string
  userId: string
  type: string
  subjectType?: string
  subjectId?: string
  status: string
  messageCount: number
  createdAt: string
  updatedAt: string
}

export interface InboxNotifyPayload {
  userId?: string
  type?: string
  subjectType?: string
  subjectId?: string
  body?: string
}

export interface InboxNotifyResult {
  threadId: string
  messageId: string
  userId: string
  createdAt: string
}

import type { Database } from '../types/database.js'
import { nextId } from '../utils/id.js'

interface InboxThreadDTO {
  id: string
  type: string
  subjectType?: string
  subjectId?: string
  status: string
  lastMessage?: string
  lastMessageAt?: string
  unread: boolean
  createdAt: string
  updatedAt: string
}

export function getInboxThreads(data: Database, userId: string): InboxThreadDTO[] {
  return data.inbox_threads
    .filter((t) => t.userId === userId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((t) => {
      const lastMsg = data.inbox_messages
        .filter((m) => m.threadId === t.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]
      const read = data.inbox_reads.find((r) => r.threadId === t.id && r.userId === userId)
      const unread = lastMsg && (!read || lastMsg.createdAt > read.lastReadAt)
      return {
        id: t.id,
        type: t.type,
        subjectType: t.subjectType,
        subjectId: t.subjectId,
        status: t.status,
        lastMessage: lastMsg?.body?.slice(0, 120),
        lastMessageAt: lastMsg?.createdAt,
        unread: Boolean(unread),
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }
    })
}

export function markInboxRead(data: Database, userId: string, threadId: string) {
  if (!data.inbox_threads.some((t) => t.id === threadId && t.userId === userId)) return null

  const existing = data.inbox_reads.find((r) => r.threadId === threadId && r.userId === userId)
  const now = new Date().toISOString()
  if (existing) {
    existing.lastReadAt = now
    existing.updatedAt = now
  } else {
    data.inbox_reads.push({
      id: nextId('read', data.inbox_reads),
      threadId,
      userId,
      lastReadAt: now,
      createdAt: now,
      updatedAt: now,
    })
  }
  return { threadId, lastReadAt: now }
}

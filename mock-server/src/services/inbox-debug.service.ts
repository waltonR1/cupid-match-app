import type { Database } from '../types/database.js'

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

export function listInboxDebugThreads(data: Database): InboxDebugThread[] {
    return data.inbox_threads
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((t) => ({
            id: t.id,
            userId: t.userId,
            type: t.type,
            subjectType: t.subjectType,
            subjectId: t.subjectId,
            status: t.status,
            messageCount: data.inbox_messages.filter((m) => m.threadId === t.id).length,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
        }))
}

export function sendInboxDebugNotification(
    data: Database,
    payload: { userId?: string; type?: string; subjectType?: string; subjectId?: string; body?: string },
) {
    const now = new Date().toISOString()
    const threadId = `inbox-${Date.now()}`
    const messageId = `msg-${Date.now()}`

    data.inbox_threads.push({
        id: threadId,
        userId: payload.userId || 'u-001',
        type: (payload.type as never) || 'system',
        subjectType: payload.subjectType,
        subjectId: payload.subjectId,
        status: 'open',
        createdAt: now,
        updatedAt: now,
    })
    data.inbox_messages.push({
        id: messageId,
        threadId,
        senderType: 'system',
        messageType: 'system_notice',
        body: payload.body || 'This is a test notification.',
        createdAt: now,
        updatedAt: now,
    })

    return {
        threadId,
        messageId,
        userId: payload.userId || 'u-001',
        createdAt: now,
    }
}

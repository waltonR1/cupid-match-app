import type { Database, PrivateIntroductionRequestRecord } from '../types/database.js'
import { nextId } from '../utils/id.js'

type InboxLocale = 'zh' | 'en' | 'fr'
type PrivateIntroductionNoticeResult = 'accepted' | 'declined'

const privateIntroductionNoticeText: Record<PrivateIntroductionNoticeResult, Record<InboxLocale, string>> = {
  accepted: {
    zh: '对方已接受你的私人介绍申请。平台已开启受控沟通入口。',
    en: 'The other party has accepted your private introduction request. A guided communication thread is now open.',
    fr: 'L autre personne a accepte votre demande d introduction privee. Un espace de communication encadre est ouvert.',
  },
  declined: {
    zh: '对方暂不接受私人介绍申请。平台已保留边界，并会避免重复打扰。',
    en: 'The other party is not open to this private introduction for now. The platform will preserve the boundary.',
    fr: 'L autre personne n accepte pas cette introduction privee pour le moment. La plateforme preserve cette limite.',
  },
}

interface InboxThreadDTO {
  id: string
  category: 'system' | 'chat'
  subjectType?: 'profile' | 'event' | 'private_introduction_request' | 'membership' | 'legal_document'
  subjectId?: string
  status: 'open' | 'closed' | 'archived'
  lastMessage?: string
  lastMessageAt?: string
  unread: boolean
  createdAt: string
  updatedAt: string
}

interface InboxMessageDTO {
  id: string
  senderType: 'system' | 'staff' | 'user'
  messageType: 'text' | 'system_notice' | 'status_update' | 'action_prompt'
  body: string
  createdAt: string
}

interface InboxMessagesPage {
  items: InboxMessageDTO[]
  page: { limit: number; hasMore: boolean; nextBefore?: string }
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
        category: t.category,
        subjectType: t.subjectType as InboxThreadDTO['subjectType'],
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

export function getInboxMessages(
  data: Database,
  userId: string,
  threadId: string,
  before?: string,
  limit = 20,
): InboxMessagesPage | null {
  const thread = data.inbox_threads.find((t) => t.id === threadId && t.userId === userId)
  if (!thread) return null

  const all = data.inbox_messages
    .filter((m) => m.threadId === threadId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const idx = before ? all.findIndex((m) => m.id === before) : -1
  const start = idx >= 0 ? idx + 1 : 0
  const slice = all.slice(start, start + limit)

  return {
    items: slice.map((m) => ({
      id: m.id,
      senderType: m.senderType,
      messageType: m.messageType,
      body: m.body,
      createdAt: m.createdAt,
    })),
    page: {
      limit,
      hasMore: start + limit < all.length,
      nextBefore: start + limit < all.length ? slice[slice.length - 1]?.id : undefined,
    },
  }
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

export function createPrivateIntroductionInboxNotice(
  data: Database,
  request: PrivateIntroductionRequestRecord,
  result: PrivateIntroductionNoticeResult,
  createdAt: string,
) {
  const requester = data.users.find((user) => user.id === request.requesterUserId)
  const locale = normalizeInboxLocale(requester?.preferredLocale)
  const category: 'system' | 'chat' = result === 'accepted' ? 'chat' : 'system'
  const messageType: 'status_update' | 'system_notice' = result === 'accepted' ? 'status_update' : 'system_notice'
  const templateCode = result === 'accepted' ? 'introduction_accepted' : 'introduction_declined'

  let thread = data.inbox_threads.find((item) =>
    item.userId === request.requesterUserId
    && item.subjectType === 'private_introduction_request'
    && item.subjectId === request.id
  )

  if (!thread) {
    thread = {
      id: nextId('inbox-thread', data.inbox_threads),
      userId: request.requesterUserId,
      category,
      subjectType: 'private_introduction_request',
      subjectId: request.id,
      status: 'open',
      createdAt,
      updatedAt: createdAt,
    }
    data.inbox_threads.push(thread)
  } else {
    thread.category = category
    thread.status = 'open'
    thread.updatedAt = createdAt
  }

  const message = {
    id: nextId('msg', data.inbox_messages),
    threadId: thread.id,
    senderType: 'system' as const,
    messageType,
    body: privateIntroductionNoticeText[result][locale],
    templateCode,
    templateLocale: locale,
    createdAt,
    updatedAt: createdAt,
  }
  data.inbox_messages.push(message)

  return { thread, message }
}

function normalizeInboxLocale(value: string | undefined): InboxLocale {
  return value === 'en' || value === 'fr' || value === 'zh' ? value : 'zh'
}

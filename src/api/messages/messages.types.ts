export type InboxSenderType = 'system' | 'staff' | 'user'
export type InboxMessageType = 'text' | 'system_notice' | 'status_update' | 'action_prompt'
export type InboxActionType = 'view_profile' | 'view_event' | 'view_introduction' | 'view_membership'

export type InboxThreadStatus = 'open' | 'closed' | 'archived'
export type InboxSubjectType = 'profile' | 'event' | 'private_introduction_request' | 'membership' | 'legal_document'

export interface InboxThreadDTO {
  id: string
  category: 'system' | 'chat'
  subjectType?: InboxSubjectType
  subjectId?: string
  status: InboxThreadStatus
  lastMessage?: string
  lastMessageAt?: string
  unread: boolean
  createdAt: string
  updatedAt: string
}

export interface InboxMessageDTO {
  id: string
  senderType: InboxSenderType
  messageType: InboxMessageType
  actionType?: InboxActionType
  body: string
  createdAt: string
}

export interface InboxMessagesPage {
  items: InboxMessageDTO[]
  page: { limit: number; hasMore: boolean; nextBefore?: string }
}

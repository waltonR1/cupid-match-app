export interface InboxThreadDTO {
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

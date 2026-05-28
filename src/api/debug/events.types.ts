export type EventDebugStatus = 'draft' | 'open' | 'waitlist' | 'closed' | 'completed'

export interface EventDebugItem {
  id: string
  slug: string
  status: EventDebugStatus
  visibility: string
  title: string
  city: string
  date: string
  capacity: number
  confirmedCount: number
  createdAt: string
}

export interface EventDebugStatusUpdatePayload {
  status: EventDebugStatus
}

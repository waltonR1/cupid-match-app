import type { LocalizedText } from '@/mock/shared'

export type EventStatus = 'open' | 'waitlist' | 'closed'

export interface MockEventAgendaItem {
  time: string
  title: LocalizedText
  desc: LocalizedText
}

export interface MockEvent {
  id: string
  date: string
  city: LocalizedText
  venue: LocalizedText
  status: EventStatus
  title: LocalizedText
  format: LocalizedText
  audience: LocalizedText
  summary: LocalizedText
  seats: number
  registered: number
  agenda: MockEventAgendaItem[]
}

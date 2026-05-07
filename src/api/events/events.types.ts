import type { FormatLocale } from '@/utils/locale-format'

export type { FormatLocale }

export type EventStatus = 'open' | 'waitlist' | 'closed'
export type RelatedProfileStatus = 'open' | 'review' | 'vip'

export interface EventAgendaItem {
  time: string
  title: string
  desc: string
}

export interface Event {
  id: string
  date: string
  city: string
  venue: string
  status: EventStatus
  title: string
  format: string
  audience: string
  summary: string
  seats: number
  registered: number
  agenda: EventAgendaItem[]
}

export interface EventRelatedProfile {
  id: string
  displayName: string
  age: number
  city: string
  datingIntentionLabel: string
  summary: string
  profileStatus: RelatedProfileStatus
  isVerified: boolean
}

export interface EventsListResponse {
  items: Event[]
}

export interface EventDetailResponse {
  event: Event
  relatedProfiles: EventRelatedProfile[]
}

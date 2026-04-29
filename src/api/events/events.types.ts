import type { FormatLocale } from '@/utils/locale-format'

export type { FormatLocale }

export type EventStatusDTO = 'open' | 'waitlist' | 'closed'
export type RelatedProfileStatusDTO = 'open' | 'review' | 'vip'

export interface EventAgendaItemDTO {
  time: string
  title: string
  desc: string
}

export interface EventDTO {
  id: string
  date: string
  city: string
  venue: string
  status: EventStatusDTO
  title: string
  format: string
  audience: string
  summary: string
  seats: number
  registered: number
  agenda: EventAgendaItemDTO[]
}

export interface EventRelatedProfileDTO {
  id: string
  displayName: string
  age: number
  city: string
  intent: string
  summary: string
  status: RelatedProfileStatusDTO
  isVerified: boolean
}

export interface EventsListResponseDTO {
  items: EventDTO[]
}

export interface EventDetailResponseDTO {
  event: EventDTO
  relatedProfiles: EventRelatedProfileDTO[]
}

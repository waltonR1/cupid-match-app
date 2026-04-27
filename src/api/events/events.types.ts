import type { FormatLocale } from '@/utils/locale-format'

export type { FormatLocale }

export type EventStatusDTO = 'open' | 'waitlist' | 'closed'
export type RelatedProfileStatusDTO = 'open' | 'review' | 'vip'

export interface LocalizedTextDTO {
  zh: string
  fr: string
  en: string
}

export interface EventAgendaItemDTO {
  time: string
  title: LocalizedTextDTO
  desc: LocalizedTextDTO
}

export interface EventDTO {
  id: string
  date: string
  city: LocalizedTextDTO
  venue: LocalizedTextDTO
  status: EventStatusDTO
  title: LocalizedTextDTO
  format: LocalizedTextDTO
  audience: LocalizedTextDTO
  summary: LocalizedTextDTO
  seats: number
  registered: number
  agenda: EventAgendaItemDTO[]
}

export interface EventRelatedProfileDTO {
  id: string
  displayName: string
  age: number
  city: LocalizedTextDTO
  intent: LocalizedTextDTO
  summary: LocalizedTextDTO
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

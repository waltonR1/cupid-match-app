import type { FormatLocale } from '@/utils/locale-format'

export type { FormatLocale }

export type EventStatus = 'open' | 'waitlist' | 'closed' | 'completed'
export type EventVisibility = 'public' | 'registered' | 'member'
export type EventRegistrationStatus =
  | 'guest'
  | 'available'
  | 'requested'
  | 'confirmed'
  | 'declined'
  | 'waitlist'
  | 'cancelled'
  | 'attended'
  | 'closed'
  | 'member_required'

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface EventDirectoryQuery {
  page?: number
  pageSize?: number
  city?: string
  status?: string
  visibility?: EventVisibility
  month?: string
}

export interface EventDirectoryItem {
  id: string
  slug: string
  status: EventStatus
  title: string
  summary: string
  city: string
  venue: string
  date: string
  startTime: string
  endTime: string
  format: string
  audience: string
  relationshipFocus: string[]
  capacity: number
  registeredCount: number
  waitlistCount: number
  remainingSeats: number
  memberOnly: boolean
  coverImageUrl: string
}

export interface EventFacetOption {
  value: string
  label: string
  count: number
}

export interface EventDirectoryFacets {
  city: EventFacetOption[]
  status: EventFacetOption[]
  visibility: EventFacetOption[]
  month: EventFacetOption[]
}

export interface EventsListResponse {
  items: EventDirectoryItem[]
  pagination: Pagination
  facets: EventDirectoryFacets
}

export interface EventAgendaItem {
  id: string
  time: string
  title: string
  desc: string
  sortOrder: number
}

export interface EventRegistrationState {
  status: EventRegistrationStatus
  registrationId?: string
}

export interface EventDetail extends EventDirectoryItem {
  address?: string
  addressVisible: boolean
  addressLockReason?: 'login_required' | 'registration_required' | 'confirmation_required'
  languageCodes: string[]
  advisorNote: string
  agendaItems: EventAgendaItem[]
  registration: EventRegistrationState
}

export interface EventRegistrationResponse {
  registration: EventRegistrationState
  registeredCount: number
  waitlistCount: number
  remainingSeats: number
}

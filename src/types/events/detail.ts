import type { EventRegistrationStatus } from '@/api/events'
import type { EventOverviewItem } from './card'

export type { EventRegistrationStatus }

export interface EventAgendaItem {
  id: string
  time: string
  title: string
  description: string
}

export interface EventNoteItem {
  title: string
  desc: string
}

export interface EventRegistrationViewModel {
  status: EventRegistrationStatus
  title: string
  description: string
  action?: {
    key: string
    label: string
    disabled: boolean
    loading?: boolean
    reason?: string
  }
}

export interface EventDetailHeroViewModel extends EventOverviewItem {
  addressText?: string
  addressLocked: boolean
  addressLockHint?: string
  languageText: string
}

export type EventStatus = 'open' | 'waitlist' | 'closed'

export interface EventFieldLabels {
  date: string
  city: string
  venue: string
  format: string
  audience: string
  seats: string
}

export interface EventDetailFieldLabels extends EventFieldLabels {
  status: string
}

export interface EventStatItem {
  label: string
  value: string
}

export interface EventOverviewItem {
  id: string
  title: string
  summary: string
  date: string
  city: string
  venue: string
  format: string
  audience: string
  seats: string
  status: EventStatus
  statusLabel: string
}

export interface EventAgendaItem {
  time: string
  title: string
  desc: string
}

export interface EventNoteItem {
  title: string
  desc: string
}

export interface EventRelatedProfileItem {
  id: string
  displayName: string
  meta: string
  reason: string
  summary: string
}

export type EventCardStatus = 'open' | 'waitlist' | 'closed' | 'completed' | 'hidden' | 'member'

export interface EventFieldLabels {
  date: string
  city: string
  venue: string
  address: string
  format: string
  audience: string
  seats: string
  focus: string
  languages: string
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
  coverImageUrl: string
  date: string
  time: string
  city: string
  venue: string
  format: string
  audience: string
  relationshipFocus: string[]
  remainingSeatsText: string
  waitlistText?: string
  memberOnly: boolean
  status: EventCardStatus
  statusLabel: string
}

export interface EventPreviewSectionViewModel {
  fieldLabels: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
  events: EventOverviewItem[]
}

import type { EventAgendaItem, EventDetailFieldLabels, EventFieldLabels, EventNoteItem, EventOverviewItem, EventRelatedProfileItem, EventStatItem } from '@/types/events/view'

export interface EventsIndexPageVM {
  fieldLabels: EventFieldLabels
  heroFields: Pick<EventFieldLabels, 'date' | 'city' | 'venue' | 'format' | 'seats'>
  nextEventCard?: EventOverviewItem
  featuredEventCards: EventOverviewItem[]
  scheduleEventCards: EventOverviewItem[]
  statCards: EventStatItem[]
}

export interface EventDetailActionVM {
  text: string
  hint: string
  disabled: boolean
}

export interface EventDetailPageVM {
  detailFieldLabels: EventDetailFieldLabels
  eventCard?: EventOverviewItem
  eventAction: EventDetailActionVM
  agenda: EventAgendaItem[]
  noteItems: EventNoteItem[]
  relatedProfileItems: EventRelatedProfileItem[]
}

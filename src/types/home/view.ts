import type { EventFieldLabels, EventOverviewItem } from '@/types/events/view'
import type { ProfileCardViewModel } from '@/types/profiles/card'

export interface HomeProfilesItem {
  id: string
  card: ProfileCardViewModel
}

export interface HomeEventsViewModel {
  fieldLabels: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
  events: EventOverviewItem[]
}
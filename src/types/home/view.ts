import type { EventFieldLabels, EventOverviewItem } from '@/types/events/view'
import type { ProfileCardViewModel } from '@/types/profiles/card'

export interface HomeProfilesPreviewItem {
  id: string
  card: ProfileCardViewModel
}

export interface HomeEventsPreviewViewModel {
  fieldLabels: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
  events: EventOverviewItem[]
}

import type { EventFieldLabels, EventOverviewItem } from '@/types/view-models/events'
import type { ProfileCardViewModel } from '@/types/view-models/profiles/card'

export interface HomeProfilesPreviewItem {
  id: string
  card: ProfileCardViewModel
}

export interface HomeEventsPreviewViewModel {
  fieldLabels: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
  events: EventOverviewItem[]
}

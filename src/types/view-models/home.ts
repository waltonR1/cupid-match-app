import type { EventFieldLabels, EventOverviewItem } from '@/types/view-models/events'
import type { DirectoryCardViewModel } from '@/types/view-models/profiles/directory-card'

export interface HomeProfilesPreviewItem {
  id: string
  card: DirectoryCardViewModel
}

export interface HomeEventsPreviewViewModel {
  fieldLabels: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
  events: EventOverviewItem[]
}

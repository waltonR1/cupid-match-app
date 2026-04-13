import type { DirectoryCardViewModel } from '@/types/directory-card'
import type { EventFieldLabels, EventOverviewItem } from '@/types/events'

export interface HomeProfilesPreviewItem {
  id: string
  card: DirectoryCardViewModel
}

export interface HomeEventsPreviewViewModel {
  fieldLabels: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
  events: EventOverviewItem[]
}

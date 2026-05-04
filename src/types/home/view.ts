import type {EventFieldLabels, EventOverviewItem} from '@/types/events/view'

export interface HomeEventsViewModel {
    fieldLabels: Pick<EventFieldLabels, 'city' | 'venue' | 'format' | 'audience' | 'seats'>
    events: EventOverviewItem[]
}

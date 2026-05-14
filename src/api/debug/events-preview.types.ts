import type {EventDetail, EventRegistrationResponse} from '@/api/events'

export type EventPreviewMode = 'guest' | 'free' | 'member'

export interface EventPreviewQuery {
  eventId: string
  mode: EventPreviewMode
}

export type EventPreviewDetail = EventDetail
export type EventPreviewActionResponse = EventRegistrationResponse

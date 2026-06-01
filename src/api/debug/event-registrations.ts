import {apiRequest} from '@/api/shared/http'
import type {
  EventRegistrationDebugItem,
  EventRegistrationDebugResponse,
  EventRegistrationDebugReviewStatus,
} from './event-registrations.types'

export function getEventRegistrationDebugItems(): Promise<EventRegistrationDebugResponse> {
  return apiRequest<EventRegistrationDebugResponse>('/debug/event-registrations')
}

export function reviewEventRegistrationDebugItem(
  id: string,
  status: EventRegistrationDebugReviewStatus,
): Promise<EventRegistrationDebugItem> {
  return apiRequest<EventRegistrationDebugItem>(`/debug/event-registrations/${id}/review/${status}`, {
    method: 'POST',
    data: {},
  })
}

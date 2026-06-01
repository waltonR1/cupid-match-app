import {apiRequest} from '@/api/shared/http'
import type {EventDebugItem, EventDebugStatusUpdatePayload} from './events.types'

export async function listEventDebugItems(): Promise<EventDebugItem[]> {
  return await apiRequest<EventDebugItem[]>('/debug/events')
}

export async function updateEventDebugStatus(
  eventId: string,
  payload: EventDebugStatusUpdatePayload,
): Promise<EventDebugItem> {
  return await apiRequest<EventDebugItem>(`/debug/events/${eventId}/status`, {
    method: 'POST',
    data: payload,
  })
}

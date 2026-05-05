import { isApiStatusError, requestJson } from '@/api/shared/http'
import type { EventDetailResponse, EventsListResponse } from './events.types'

export function listEvents(): Promise<EventsListResponse> {
  return requestJson<EventsListResponse>('/events')
}

export async function getEventDetail(id: string): Promise<EventDetailResponse | null> {
  try {
    return await requestJson<EventDetailResponse>(`/events/${id}`)
  } catch (error) {
    if (isApiStatusError(error, 404)) return null
    throw error
  }
}

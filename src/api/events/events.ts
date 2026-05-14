import { isApiStatusError, requestJson } from '@/api/shared/http'
import type { EventDetail, EventDirectoryQuery, EventRegistrationResponse, EventsListResponse } from './events.types'

export function listEvents(query: EventDirectoryQuery = {}): Promise<EventsListResponse> {
  return requestJson<EventsListResponse>('/events', { query })
}

export async function getEventDetail(id: string): Promise<EventDetail | null> {
  try {
    return await requestJson<EventDetail>(`/events/${id}`)
  } catch (error) {
    if (isApiStatusError(error, 404)) return null
    throw error
  }
}

export async function registerForEvent(id: string): Promise<EventRegistrationResponse> {
  try {
    return await requestJson<EventRegistrationResponse>(`/events/${id}/register`, {
      method: 'POST',
      data: {},
    })
  } catch (error) {
    if (isApiStatusError(error, 401) || isApiStatusError(error, 409)) {
      const payload = error && typeof error === 'object' && 'payload' in error ? error.payload : null
      if (payload && typeof payload === 'object') {
        return payload as EventRegistrationResponse
      }
    }
    throw error
  }
}

export async function cancelEventRegistration(id: string): Promise<EventRegistrationResponse> {
  try {
    return await requestJson<EventRegistrationResponse>(`/events/${id}/cancel`, {
      method: 'POST',
      data: {},
    })
  } catch (error) {
    if (isApiStatusError(error, 401) || isApiStatusError(error, 409)) {
      const payload = error && typeof error === 'object' && 'payload' in error ? error.payload : null
      if (payload && typeof payload === 'object') {
        return payload as EventRegistrationResponse
      }
    }
    throw error
  }
}

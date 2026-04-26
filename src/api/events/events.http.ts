import { isApiStatusError, requestJson } from '@/api/shared/http'
import type { EventsApiClient } from './events.contract'
import type { EventDetailResponseDTO, EventsListResponseDTO } from './events.types'

export function createHttpEventsApiClient(): EventsApiClient {
  return {
    listEvents() {
      return requestJson<EventsListResponseDTO>('/events')
    },
    async getEventDetail(id) {
      try {
        return await requestJson<EventDetailResponseDTO>(`/events/${id}`)
      } catch (error) {
        if (isApiStatusError(error, 404)) return null
        throw error
      }
    },
  }
}

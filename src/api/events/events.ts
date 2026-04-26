import { isApiStatusError, requestJson } from '@/api/shared/http'
import type {
  EventDTO,
  EventDetailResponseDTO,
  EventRelatedProfileDTO,
  EventsListResponseDTO,
  EventStatusDTO,
  FormatLocale,
  LocalizedTextDTO,
  RelatedProfileStatusDTO,
} from './events.types'

export type {
  EventDTO,
  EventDetailResponseDTO,
  EventRelatedProfileDTO,
  EventsListResponseDTO,
  EventStatusDTO,
  FormatLocale,
  LocalizedTextDTO,
  RelatedProfileStatusDTO,
} from './events.types'

export function listEvents(): Promise<EventsListResponseDTO> {
  return requestJson<EventsListResponseDTO>('/events')
}

export async function getEventDetail(id: string): Promise<EventDetailResponseDTO | null> {
  try {
    return await requestJson<EventDetailResponseDTO>(`/events/${id}`)
  } catch (error) {
    if (isApiStatusError(error, 404)) return null
    throw error
  }
}

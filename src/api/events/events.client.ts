import type { EventsApiClient } from './events.contract'
import { createHttpEventsApiClient } from './events.http'
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

const eventsApiClient = createHttpEventsApiClient()

export type { EventsApiClient }
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

export function getEventsApiClient() {
  return eventsApiClient
}

export function listEvents(): Promise<EventsListResponseDTO> {
  return eventsApiClient.listEvents()
}

export function getEventDetail(id: string): Promise<EventDetailResponseDTO | null> {
  return eventsApiClient.getEventDetail(id)
}

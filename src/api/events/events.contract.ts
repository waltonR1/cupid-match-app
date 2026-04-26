import type { EventDetailResponseDTO, EventsListResponseDTO } from './events.types'

export interface EventsApiClient {
  listEvents(): Promise<EventsListResponseDTO>
  getEventDetail(id: string): Promise<EventDetailResponseDTO | null>
}

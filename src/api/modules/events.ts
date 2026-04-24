import {
  getEventRecord,
  listEventRecords,
  listEventRelatedProfileRecords,
  pickLocalized,
  type EventRecord,
  type EventRelatedProfileRecord,
  type EventStatus,
  type LocalizedText,
} from '@/mock/gateways/events'

export type CupidEvent = EventRecord
export type EventRelatedProfile = EventRelatedProfileRecord
export type { EventStatus, LocalizedText }

export function listEvents() {
  return listEventRecords()
}

export function getEventDetail(id: string) {
  return getEventRecord(id)
}

export function listEventRelatedProfiles(eventId: string) {
  return listEventRelatedProfileRecords(eventId)
}

export {
  pickLocalized,
}

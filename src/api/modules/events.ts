import { mockProfiles, type MockProfile } from '@/mock/business'
import {
  getHomePreviewEvents as getMockHomePreviewEvents,
  getMockEventById,
  mockEvents,
  type EventStatus,
  type MockEvent,
} from '@/mock/events'
import { pickLocalized, type LocalizedText } from '@/mock/shared'
import { mockRequest } from '../mock-request'

export type CupidEvent = MockEvent
export type EventRelatedProfile = MockProfile
export type { EventStatus, LocalizedText }

export function listEvents() {
  return mockRequest([...mockEvents].sort((left, right) => left.date.localeCompare(right.date)))
}

export function listHomePreviewEvents() {
  return mockRequest(getMockHomePreviewEvents())
}

export function getEventDetail(id: string) {
  return mockRequest(getMockEventById(id) ?? null)
}

export function listEventRelatedProfiles(eventId: string) {
  const event = getMockEventById(eventId)

  if (!event) {
    return mockRequest<EventRelatedProfile[]>([])
  }

  const cityKey = event.city.en
  const rankedProfiles = [...mockProfiles].sort((left, right) => {
    return getRelatedProfilePriority(right) - getRelatedProfilePriority(left)
  })
  const sameCityProfiles = rankedProfiles.filter(profile => profile.city.en === cityKey)
  const fallbackProfiles = rankedProfiles.filter(profile => profile.city.en !== cityKey)

  return mockRequest([...sameCityProfiles, ...fallbackProfiles].slice(0, 2))
}

function getRelatedProfilePriority(profile: EventRelatedProfile) {
  let score = 0

  if (profile.status === 'vip') score += 4
  if (profile.isVerified) score += 2
  if (profile.familyVisible) score += 1

  return score
}

export {
  pickLocalized,
}

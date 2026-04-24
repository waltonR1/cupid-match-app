import { getDisplayName } from '@/utils/display-name'
import { mockProfiles, type MockProfile } from '@/mock/data/profiles'
import {
  mockEvents,
  type EventStatus,
  type MockEvent,
} from '@/mock/data/events'
import { pickLocalized, type LocalizedText } from '@/mock/shared'

export type EventRecord = MockEvent
export type EventRelatedProfileRecord = MockProfile & {
  displayName: string
}
export type { EventStatus, LocalizedText }

export function listEventRecords() {
  return [...mockEvents].sort((left, right) => left.date.localeCompare(right.date))
}

export function getEventRecord(id: string) {
  return mockEvents.find(item => item.id === id) ?? null
}

export function listEventRelatedProfileRecords(eventId: string) {
  const event = mockEvents.find(item => item.id === eventId)

  if (!event) {
    return [] as EventRelatedProfileRecord[]
  }

  const cityKey = event.city.en
  const rankedProfiles = [...mockProfiles].sort((left, right) => {
    return getRelatedProfilePriority(right) - getRelatedProfilePriority(left)
  })
  const sameCityProfiles = rankedProfiles.filter(profile => profile.city.en === cityKey)
  const fallbackProfiles = rankedProfiles.filter(profile => profile.city.en !== cityKey)

  return [...sameCityProfiles, ...fallbackProfiles]
    .slice(0, 2)
    .map(withDisplayName)
}

function getRelatedProfilePriority(profile: MockProfile) {
  let score = 0

  if (profile.status === 'vip') score += 4
  if (profile.isVerified) score += 2
  if (profile.familyVisible) score += 1

  return score
}

export {
  pickLocalized,
}

function withDisplayName(profile: MockProfile): EventRelatedProfileRecord {
  return {
    ...profile,
    displayName: getDisplayName(profile),
  }
}

import type { EventRecord } from '../types/database.js'
import type { ProfileRecord } from '../types/profile.js'
import { resolveDisplayName } from '../utils/localized.js'

export function listEvents(events: EventRecord[]): { items: EventRecord[] } {
  return {
    items: [...events].sort((left, right) => left.date.localeCompare(right.date)),
  }
}

export function eventDetail(
  events: EventRecord[],
  profiles: ProfileRecord[],
  id: string,
): { event: EventRecord; relatedProfiles: Array<ReturnType<typeof mapRelatedProfile>> } | null {
  const event = events.find((item) => item.id === id)
  if (!event) {
    return null
  }

  return {
    event,
    relatedProfiles: buildRelatedProfiles(profiles, event.city.en),
  }
}

export function buildRelatedProfiles(profiles: ProfileRecord[], cityKey: string): Array<ReturnType<typeof mapRelatedProfile>> {
  return profiles
    .map((profile, index) => ({ profile, index }))
    .sort((left, right) => {
      const cityRankDiff = getCityRank(right.profile, cityKey) - getCityRank(left.profile, cityKey)
      if (cityRankDiff !== 0) {
        return cityRankDiff
      }

      const priorityDiff = getRelatedProfilePriority(right.profile) - getRelatedProfilePriority(left.profile)
      if (priorityDiff !== 0) {
        return priorityDiff
      }

      return left.index - right.index
    })
    .slice(0, 2)
    .map(({ profile }) => mapRelatedProfile(profile))
}

function mapRelatedProfile(profile: ProfileRecord) {
  return {
    id: profile.id,
    displayName: resolveDisplayName(profile),
    age: profile.age,
    city: profile.city,
    intent: profile.intent,
    summary: profile.summary,
    status: profile.status,
    isVerified: profile.isVerified,
  }
}

function getCityRank(profile: ProfileRecord, cityKey: string): number {
  return profile.city.en === cityKey ? 1 : 0
}

function getRelatedProfilePriority(profile: ProfileRecord): number {
  let score = 0
  if (profile.status === 'vip') {
    score += 4
  }
  if (profile.isVerified) {
    score += 2
  }
  if (profile.familyVisible) {
    score += 1
  }
  return score
}

import type { ApiLocale } from '../types/common.js'
import type { Database, EventRecord } from '../types/database.js'
import { resolveLocalizedText } from '../utils/localized.js'
import { buildProfileView } from './profile.service.js'

export function listEvents(locale: ApiLocale, events: EventRecord[]): { items: Array<ReturnType<typeof toEventDTO>> } {
  return {
    items: [...events]
      .sort((left, right) => left.date.localeCompare(right.date))
      .map((event) => toEventDTO(locale, event)),
  }
}

export function eventDetail(
  locale: ApiLocale,
  data: Database,
  id: string,
): { event: ReturnType<typeof toEventDTO>; relatedProfiles: Array<ReturnType<typeof mapRelatedProfile>> } | null {
  const event = data.events.find((item) => item.id === id)
  if (!event) {
    return null
  }

  return {
    event: toEventDTO(locale, event),
    relatedProfiles: buildRelatedProfiles(locale, data, event.city.en),
  }
}

export function buildRelatedProfiles(locale: ApiLocale, data: Database, cityKey: string): Array<ReturnType<typeof mapRelatedProfile>> {
  return data.profiles
    .map((profile, index) => ({ profile: buildProfileView(data, profile), index }))
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
    .map(({ profile }) => mapRelatedProfile(locale, profile))
}

function toEventDTO(locale: ApiLocale, event: EventRecord) {
  return {
    id: event.id,
    date: event.date,
    city: resolveLocalizedText(locale, event.city),
    venue: resolveLocalizedText(locale, event.venue),
    status: event.status,
    title: resolveLocalizedText(locale, event.title),
    format: resolveLocalizedText(locale, event.format),
    audience: resolveLocalizedText(locale, event.audience),
    summary: resolveLocalizedText(locale, event.summary),
    seats: event.seats,
    registered: event.registered,
    agenda: event.agenda.map((item) => ({
      time: item.time,
      title: resolveLocalizedText(locale, item.title),
      desc: resolveLocalizedText(locale, item.desc),
    })),
  }
}

function mapRelatedProfile(locale: ApiLocale, profile: ReturnType<typeof buildProfileView>) {
  return {
    id: profile.id,
    displayName: profile.displayName,
    age: profile.age,
    city: resolveLocalizedText(locale, profile.city),
    datingIntentionLabel: resolveLocalizedText(locale, profile.datingIntentionLabel),
    summary: resolveLocalizedText(locale, profile.summary),
    profileStatus: profile.profileStatus,
    isVerified: profile.isVerified,
  }
}

function getCityRank(profile: ReturnType<typeof buildProfileView>, cityKey: string): number {
  return profile.city.en === cityKey ? 1 : 0
}

function getRelatedProfilePriority(profile: ReturnType<typeof buildProfileView>): number {
  let score = 0
  if (profile.profileStatus === 'vip') {
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

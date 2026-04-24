import { getDisplayName } from '@/utils/display-name'
import {
  mockCurrentUser,
  mockFavoriteProfiles,
  mockMessageThreads,
  mockPrivacySettings,
  mockUserRegistrations,
  type MockFavoriteRecord,
  type MockPrivacySetting,
  type MockThreadRecord,
  type MockUserAccount,
  type MockUserEventRecord,
} from '@/mock/data/account'
import { mockEvents } from '@/mock/data/events'
import type { MembershipLevel } from '@/mock/data/account'
import { mockProfiles, type MockProfile } from '@/mock/data/profiles'
import { getProfileLanguageLabel } from '@/mock/gateways/profiles'
import { pickLocalized, type LocalizedText } from '@/mock/shared'

export type AccountRecord = MockUserAccount & {
  displayName: string
}
export type AccountProfileRecord = MockProfile & {
  displayName: string
}
export type AccountFavoriteRecord = Omit<MockFavoriteRecord, 'profile'> & {
  profile: AccountProfileRecord
}
export type AccountPrivacySettingRecord = MockPrivacySetting
export type AccountThreadRecord = Omit<MockThreadRecord, 'profile'> & {
  profile: AccountProfileRecord
}
export type AccountUserEventRecord = MockUserEventRecord
export type AccountMembershipLevel = MembershipLevel
export type { LocalizedText }

export interface AccountOverviewRecord {
  account: AccountRecord
  profile: AccountProfileRecord | null
  userEvents: AccountUserEventRecord[]
  favorites: AccountFavoriteRecord[]
  threads: AccountThreadRecord[]
  privacySettings: AccountPrivacySettingRecord[]
}

export function getAccountOverviewRecord(): AccountOverviewRecord {
  return {
    account: withAccountDisplayName(mockCurrentUser),
    profile: withProfileDisplayName(getCurrentMockProfile()),
    userEvents: getMockUserEvents(),
    favorites: getMockFavorites().map(withFavoriteProfileDisplayName),
    threads: getMockThreads().map(withThreadProfileDisplayName),
    privacySettings: [...mockPrivacySettings],
  }
}

export function getAccountLanguageLabel(locale: Parameters<typeof getProfileLanguageLabel>[0], language: string) {
  return getProfileLanguageLabel(locale, language)
}

export {
  pickLocalized,
}

function withAccountDisplayName(account: MockUserAccount): AccountRecord {
  return {
    ...account,
    displayName: getDisplayName(account),
  }
}

function withProfileDisplayName(profile: MockProfile | null | undefined): AccountProfileRecord | null {
  if (!profile) return null

  return {
    ...profile,
    displayName: getDisplayName(profile),
  }
}

function withFavoriteProfileDisplayName(record: MockFavoriteRecord): AccountFavoriteRecord {
  return {
    ...record,
    profile: {
      ...record.profile,
      displayName: getDisplayName(record.profile),
    },
  }
}

function withThreadProfileDisplayName(record: MockThreadRecord): AccountThreadRecord {
  return {
    ...record,
    profile: {
      ...record.profile,
      displayName: getDisplayName(record.profile),
    },
  }
}

function getMockProfileById(id: string) {
  return mockProfiles.find(item => item.id === id)
}

function getCurrentMockProfile() {
  return getMockProfileById(mockCurrentUser.profileId)
}

function getMockUserEvents() {
  return mockUserRegistrations
    .map(registration => {
      const event = mockEvents.find(item => item.id === registration.eventId)
      if (!event) return undefined
      return { registration, event }
    })
    .filter((item): item is MockUserEventRecord => Boolean(item))
}

function getMockFavorites() {
  return mockFavoriteProfiles
    .map(favorite => {
      const profile = getMockProfileById(favorite.profileId)
      if (!profile) return undefined
      return { favorite, profile }
    })
    .filter((item): item is MockFavoriteRecord => Boolean(item))
}

function getMockThreads() {
  return mockMessageThreads
    .map(thread => {
      const profile = getMockProfileById(thread.profileId)
      if (!profile) return undefined
      return { thread, profile }
    })
    .filter((item): item is MockThreadRecord => Boolean(item))
}

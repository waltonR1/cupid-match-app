import {
  getCurrentMockProfile,
  getLocalizedLanguageLabel,
  getMockFavorites,
  getMockThreads,
  getMockUserEvents,
  mockCurrentUser,
  mockPrivacySettings,
  pickLocalized,
  type LocalizedText,
  type MembershipLevel,
  type MockFavoriteRecord,
  type MockPrivacySetting,
  type MockProfile,
  type MockThreadRecord,
  type MockUserAccount,
  type MockUserEventRecord,
} from '@/mock/business'
import { mockRequest } from '../mock-request'

export type Account = MockUserAccount
export type AccountProfile = MockProfile
export type AccountFavoriteRecord = MockFavoriteRecord
export type AccountPrivacySetting = MockPrivacySetting
export type AccountThreadRecord = MockThreadRecord
export type AccountUserEventRecord = MockUserEventRecord
export type AccountMembershipLevel = MembershipLevel
export type { LocalizedText }

export interface AccountOverview {
  account: Account
  profile: AccountProfile | null
  userEvents: AccountUserEventRecord[]
  favorites: AccountFavoriteRecord[]
  threads: AccountThreadRecord[]
  privacySettings: AccountPrivacySetting[]
}

export function getAccountOverview() {
  return mockRequest(getAccountOverviewSnapshot())
}

export function getAccountOverviewSnapshot(): AccountOverview {
  return {
    account: mockCurrentUser,
    profile: getCurrentMockProfile() ?? null,
    userEvents: getMockUserEvents(),
    favorites: getMockFavorites(),
    threads: getMockThreads(),
    privacySettings: [...mockPrivacySettings],
  }
}

export function getAccountLanguageLabel(locale: Parameters<typeof getLocalizedLanguageLabel>[0], language: string) {
  return getLocalizedLanguageLabel(locale, language)
}

export {
  pickLocalized,
}

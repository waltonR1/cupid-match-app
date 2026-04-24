import {
  getAccountLanguageLabel as getMockAccountLanguageLabel,
  getAccountOverviewRecord,
  pickLocalized,
  type AccountFavoriteRecord as AccountFavoriteRecordSource,
  type AccountMembershipLevel as AccountMembershipLevelSource,
  type AccountOverviewRecord as AccountOverviewRecordSource,
  type AccountPrivacySettingRecord as AccountPrivacySettingRecordSource,
  type AccountProfileRecord as AccountProfileRecordSource,
  type AccountRecord as AccountRecordSource,
  type AccountThreadRecord as AccountThreadRecordSource,
  type AccountUserEventRecord as AccountUserEventRecordSource,
  type LocalizedText,
} from '@/mock/gateways/account'

export type Account = AccountRecordSource
export type AccountProfile = AccountProfileRecordSource
export type AccountFavoriteRecord = AccountFavoriteRecordSource
export type AccountPrivacySetting = AccountPrivacySettingRecordSource
export type AccountThreadRecord = AccountThreadRecordSource
export type AccountUserEventRecord = AccountUserEventRecordSource
export type AccountMembershipLevel = AccountMembershipLevelSource
export type { LocalizedText }

export type AccountOverview = AccountOverviewRecordSource

export function getAccountOverview() {
  return getAccountOverviewSnapshot()
}

export function getAccountOverviewSnapshot(): AccountOverview {
  return getAccountOverviewRecord()
}

export function getAccountLanguageLabel(locale: Parameters<typeof getMockAccountLanguageLabel>[0], language: string) {
  return getMockAccountLanguageLabel(locale, language)
}

export {
  pickLocalized,
}

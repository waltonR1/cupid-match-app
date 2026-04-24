import {
  getLocalizedProfileCard,
  getProfileLanguageLabel as getMockProfileLanguageLabel,
  getProfileRecord,
  listProfileRecords,
  localized,
  pickLocalized,
  type LocalizedProfileCardData,
  type LocalizedText,
  type MockLocale,
  type ProfileDirectoryMode,
  type ProfileRecord,
} from '@/mock/gateways/profiles'

export type Profile = ProfileRecord
export type { LocalizedProfileCardData, LocalizedText, ProfileDirectoryMode }
export type ProfileOptionGetter = (profile: Profile) => LocalizedText

export interface ListProfilesParams {
  mode?: ProfileDirectoryMode
}

export function listProfiles(params: ListProfilesParams = {}) {
  return listProfileRecords(params.mode)
}

export function getProfileDetail(id: string) {
  return getProfileRecord(id)
}

export function getProfileLanguageLabel(locale: MockLocale, language: string) {
  return getMockProfileLanguageLabel(locale, language)
}

export function getLocalizedProfileCardData(locale: MockLocale, profile: Profile) {
  return getLocalizedProfileCard(locale, profile)
}

export function getLocalizedProfileOptions(
  profiles: Profile[],
  locale: MockLocale,
  getter: ProfileOptionGetter,
) {
  const values = new Set<string>()

  profiles.forEach(profile => {
    const value = pickLocalized(locale, getter(profile)).trim()
    if (!value) return
    values.add(value)
  })

  return Array.from(values).sort((a, b) => a.localeCompare(b))
}

export function getLocalizedIntentOptions(profiles: Profile[], locale: MockLocale) {
  const seen = new Set<string>()

  return profiles
    .map(profile => ({
      code: profile.intentCode,
      label: pickLocalized(locale, profile.intent),
    }))
    .filter(item => {
      if (!item.code || !item.label) return false
      if (seen.has(item.code)) return false
      seen.add(item.code)
      return true
    })
}

export function getLocalizedLanguageOptions(profiles: Profile[], locale: MockLocale) {
  const values = new Set<string>()

  profiles.forEach(profile => {
    profile.languages.forEach(language => {
      const value = String(language || '').trim()
      if (!value) return
      values.add(value)
    })
  })

  return Array.from(values)
    .sort((a, b) => getProfileLanguageLabel(locale, a).localeCompare(getProfileLanguageLabel(locale, b)))
    .map(value => ({
      label: getProfileLanguageLabel(locale, value),
      value,
    }))
}

export {
  localized,
  pickLocalized,
}

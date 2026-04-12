import type { AppLocale } from '@/i18n/types'
import {
  getLocalizedLanguageLabel,
  getLocalizedProfileCardData as getMockLocalizedProfileCardData,
  getHomePreviewProfiles as getMockHomePreviewProfiles,
  localized,
  mockProfiles,
  pickLocalized,
  type LocalizedProfileCardData,
  type LocalizedText,
  type MockProfile,
} from '@/mock/business'
import { mockRequest } from '../mock-request'

export type Profile = MockProfile
export type ProfileDirectoryMode = 'self' | 'family'
export type ProfileOptionGetter = (profile: Profile) => LocalizedText
export type { LocalizedProfileCardData, LocalizedText }

export interface ListProfilesParams {
  mode?: ProfileDirectoryMode
}

export function listProfiles(params: ListProfilesParams = {}) {
  const profiles = params.mode === 'family'
    ? mockProfiles.filter(profile => profile.familyVisible)
    : [...mockProfiles]

  return mockRequest(profiles)
}

export function getProfileDetail(id: string) {
  return mockRequest(mockProfiles.find(item => item.id === id) ?? null)
}

export function listHomePreviewProfiles() {
  return mockRequest(getMockHomePreviewProfiles())
}

export function getProfileLanguageLabel(locale: AppLocale, language: string) {
  return getLocalizedLanguageLabel(locale, language)
}

export function getLocalizedProfileCardData(locale: AppLocale, profile: Profile) {
  return getMockLocalizedProfileCardData(locale, profile)
}

export function getLocalizedProfileOptions(
  profiles: Profile[],
  locale: AppLocale,
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

export function getLocalizedIntentOptions(profiles: Profile[], locale: AppLocale) {
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

export function getLocalizedLanguageOptions(profiles: Profile[], locale: AppLocale) {
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

import { getDisplayName } from '@/utils/display-name'
import { mockProfiles, type MockProfile } from '@/mock/data/profiles'
import { localized, pickLocalized, type LocalizedText, type MockLocale } from '@/mock/shared'

const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedText> = {
  FR: localized('法语', 'Francais', 'French'),
  EN: localized('英语', 'Anglais', 'English'),
  ZH: localized('中文', 'Chinois', 'Chinese'),
  NL: localized('荷兰语', 'Neerlandais', 'Dutch'),
  IT: localized('意大利语', 'Italien', 'Italian'),
  DE: localized('德语', 'Allemand', 'German'),
}

export type ProfileRecord = MockProfile & {
  displayName: string
}
export type ProfileDirectoryMode = 'self' | 'family'
export type ProfileOptionGetter = (profile: ProfileRecord) => LocalizedText
export type { LocalizedText, MockLocale }

export interface LocalizedChoiceOption {
  label: string
  value: string
}

export interface LocalizedProfileCardData {
  id: string
  displayName: string
  avatarUrl: string
  meta: string
  goalCode: MockProfile['intentCode']
  status: MockProfile['status']
  summary: string
  facts: {
    city: string
    education: string
    languages: string
  }
  tags: string[]
}

export function listProfileRecords(mode: ProfileDirectoryMode = 'self') {
  const profiles = mode === 'family'
    ? mockProfiles.filter(profile => profile.familyVisible)
    : mockProfiles

  return profiles.map(withDisplayName)
}

export function getProfileRecord(id: string) {
  const profile = mockProfiles.find(item => item.id === id)
  return profile ? withDisplayName(profile) : null
}

export function getProfileLanguageLabel(locale: MockLocale, language: string) {
  const label = PROFILE_LANGUAGE_LABELS[String(language || '').trim()]
  if (!label) return String(language || '').trim()
  return pickLocalized(locale, label)
}

export function getLocalizedProfileCard(locale: MockLocale, profile: ProfileRecord) {
  return {
    id: profile.id,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    meta: formatProfileDirectoryMeta(locale, profile),
    goalCode: profile.intentCode,
    status: profile.status,
    summary: pickLocalized(locale, profile.summary),
    facts: {
      city: pickLocalized(locale, profile.city),
      education: pickLocalized(locale, profile.education),
      languages: formatProfileDirectoryLanguages(locale, profile.languages),
    },
    tags: profile.tags.slice(0, 3).map(item => pickLocalized(locale, item)),
  }
}

export {
  localized,
  pickLocalized,
}

function withDisplayName(profile: MockProfile): ProfileRecord {
  return {
    ...profile,
    displayName: getDisplayName(profile),
  }
}

function formatProfileDirectoryMeta(locale: MockLocale, profile: MockProfile) {
  const occupation = pickLocalized(locale, profile.occupation)

  if (locale === 'zh') return `${profile.age}岁 / ${occupation}`
  if (locale === 'fr') return `${profile.age} ans / ${occupation}`
  return `${profile.age} / ${occupation}`
}

function formatProfileDirectoryLanguages(locale: MockLocale, languages: string[]) {
  return languages.map(language => getProfileLanguageLabel(locale, language)).join(' / ')
}

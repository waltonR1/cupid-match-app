import type { AppLocale } from '@/i18n/types'
import { formatLocalizedDate } from './locale-format'

export type LocalizedTextValue = Record<AppLocale, string>

const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedTextValue> = {
  FR: { zh: '\u6cd5\u8bed', fr: 'Francais', en: 'French' },
  EN: { zh: '\u82f1\u8bed', fr: 'Anglais', en: 'English' },
  ZH: { zh: '\u4e2d\u6587', fr: 'Chinois', en: 'Chinese' },
  NL: { zh: '\u8377\u5170\u8bed', fr: 'Neerlandais', en: 'Dutch' },
  IT: { zh: '\u610f\u5927\u5229\u8bed', fr: 'Italien', en: 'Italian' },
  DE: { zh: '\u5fb7\u8bed', fr: 'Allemand', en: 'German' },
}

export function localizeProfileText(locale: AppLocale, text: LocalizedTextValue) {
  return text[locale] || text.en || ''
}

export function formatProfileAge(locale: AppLocale, age: number) {
  if (locale === 'zh') return `${age}\u5c81`
  if (locale === 'fr') return `${age} ans`
  return String(age)
}

export function formatProfileHeight(height: number) {
  return `${height} cm`
}

export function formatProfileLanguages(locale: AppLocale, languages: string[]) {
  return languages
    .map(language => getProfileLanguageLabel(locale, language))
    .join(' / ')
}

export function formatProfileDate(locale: AppLocale, date: string) {
  return formatLocalizedDate(locale, date)
}

function getProfileLanguageLabel(locale: AppLocale, language: string) {
  const key = String(language || '').trim()
  const label = PROFILE_LANGUAGE_LABELS[key]
  if (!label) return key
  return localizeProfileText(locale, label)
}

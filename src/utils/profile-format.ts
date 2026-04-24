import { formatLocalizedDate, type FormatLocale } from './locale-format'

export type LocalizedTextValue = Record<FormatLocale, string>

const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedTextValue> = {
  FR: { zh: '\u6cd5\u8bed', fr: 'Francais', en: 'French' },
  EN: { zh: '\u82f1\u8bed', fr: 'Anglais', en: 'English' },
  ZH: { zh: '\u4e2d\u6587', fr: 'Chinois', en: 'Chinese' },
  NL: { zh: '\u8377\u5170\u8bed', fr: 'Neerlandais', en: 'Dutch' },
  IT: { zh: '\u610f\u5927\u5229\u8bed', fr: 'Italien', en: 'Italian' },
  DE: { zh: '\u5fb7\u8bed', fr: 'Allemand', en: 'German' },
}

export function localizeProfileText(locale: FormatLocale, text: LocalizedTextValue) {
  return text[locale] || text.en || ''
}

export function formatProfileAge(locale: FormatLocale, age: number) {
  if (locale === 'zh') return `${age}\u5c81`
  if (locale === 'fr') return `${age} ans`
  return String(age)
}

export function formatProfileHeight(height: number) {
  return `${height} cm`
}

export function formatProfileLanguages(locale: FormatLocale, languages: string[]) {
  return languages
    .map(language => getProfileLanguageLabel(locale, language))
    .join(' / ')
}

export function formatProfileDate(locale: FormatLocale, date: string) {
  return formatLocalizedDate(locale, date)
}

function getProfileLanguageLabel(locale: FormatLocale, language: string) {
  const key = String(language || '').trim()
  const label = PROFILE_LANGUAGE_LABELS[key]
  if (!label) return key
  return localizeProfileText(locale, label)
}

import { formatLocalizedDate, type FormatLocale } from './locale-format'

export type LocalizedTextValue = Record<FormatLocale, string>

const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedTextValue> = {
  FR: { zh: '法语', fr: 'Francais', en: 'French' },
  EN: { zh: '英语', fr: 'Anglais', en: 'English' },
  ZH: { zh: '中文', fr: 'Chinois', en: 'Chinese' },
  NL: { zh: '荷兰语', fr: 'Neerlandais', en: 'Dutch' },
  IT: { zh: '意大利语', fr: 'Italien', en: 'Italian' },
  DE: { zh: '德语', fr: 'Allemand', en: 'German' },
}

export function localizeProfileText(locale: FormatLocale, text: LocalizedTextValue) {
  return text[locale] || text.en || ''
}

export function formatProfileAge(locale: FormatLocale, age: number) {
  if (locale === 'zh') return `${age}岁`
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

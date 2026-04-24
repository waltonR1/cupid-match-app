export type FormatLocale = 'zh' | 'fr' | 'en'

const LOCALE_MAP = {
  zh: 'zh-CN',
  fr: 'fr-FR',
  en: 'en-US',
} as const satisfies Record<FormatLocale, string>

export function formatLocalizedDate(
  locale: FormatLocale,
  date: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' },
) {
  return new Date(date).toLocaleDateString(LOCALE_MAP[locale], options)
}

export function formatLocalizedDateTime(
  locale: FormatLocale,
  date: string,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
) {
  return new Date(date).toLocaleString(LOCALE_MAP[locale], options)
}

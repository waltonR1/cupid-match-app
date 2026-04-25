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

/**
 * 格式化活动日期 (简短格式: 4月25日 / Apr 25)
 */
export function formatEventDate(locale: FormatLocale, date: string) {
  return formatLocalizedDate(locale, date, { month: 'short', day: 'numeric' })
}

/**
 * 格式化活动详情日期 (长格式: 2026年4月25日 / Apr 25, 2026)
 */
export function formatEventDetailDate(locale: FormatLocale, date: string) {
  const options: Intl.DateTimeFormatOptions = locale === 'zh'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' }

  return formatLocalizedDate(locale, date, options)
}

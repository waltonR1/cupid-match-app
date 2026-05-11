/** 支持的格式化语言 */
export type FormatLocale = 'zh' | 'fr' | 'en'

/** Intl 对应的 locale 映射 */
const LOCALE_MAP = {
  zh: 'zh-CN',
  fr: 'fr-FR',
  en: 'en-US',
} as const satisfies Record<FormatLocale, string>

/**
 * 格式化日期
 *
 * 示例：
 * - zh: 2026年4月25日
 * - fr: 25 avr. 2026
 * - en: Apr 25, 2026
 */
export function formatLocalizedDate(
    locale: FormatLocale,
    date: string,
    options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'},
) {
  return new Date(date).toLocaleDateString(LOCALE_MAP[locale], options)
}

/**
 * 格式化日期时间
 *
 * 示例：
 * - zh: 4月25日 18:30
 * - fr: 25 avr., 18:30
 * - en: Apr 25, 6:30 PM
 */
export function formatLocalizedDateTime(
    locale: FormatLocale,
    date: string,
    options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'},
) {
  return new Date(date).toLocaleString(LOCALE_MAP[locale], options)
}

/**
 * 格式化活动日期（列表短格式）
 *
 * 示例：
 * - zh: 4月25日
 * - fr: 25 avr.
 * - en: Apr 25
 */
export function formatEventDate(locale: FormatLocale, date: string) {
  return formatLocalizedDate(locale, date, {month: 'short', day: 'numeric'})
}

/**
 * 格式化活动详情日期（详情长格式）
 *
 * 示例：
 * - zh: 2026年4月25日
 * - fr: 25 avr. 2026
 * - en: Apr 25, 2026
 */
export function formatEventDetailDate(locale: FormatLocale, date: string) {
  // 中文使用 long 月份格式
  const options: Intl.DateTimeFormatOptions = locale === 'zh'
      ? {year: 'numeric', month: 'long', day: 'numeric'}
      : {year: 'numeric', month: 'short', day: 'numeric'}

  return formatLocalizedDate(locale, date, options)
}
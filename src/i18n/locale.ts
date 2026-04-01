import type { AppLocale } from '@/i18n/types'
import { SUPPORTED_LOCALES } from '@/i18n/types'

export const DEFAULT_LOCALE: AppLocale = 'zh'
export const FALLBACK_LOCALE: AppLocale = 'zh'

export function isSupportedLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as AppLocale)
}

export function normalizeLocale(value: unknown): AppLocale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE
}

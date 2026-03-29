import type { AppLocale } from '@/i18n/types'
import { SUPPORTED_LOCALES } from '@/i18n/types'

export const LOCALE_STORAGE_KEY = 'app-locale'
export const DEFAULT_LOCALE: AppLocale = 'zh'
export const FALLBACK_LOCALE: AppLocale = 'zh'

export function isSupportedLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as AppLocale)
}

export function readLocale(): AppLocale {
  try {
    const storedLocale = uni.getStorageSync(LOCALE_STORAGE_KEY)

    if (isSupportedLocale(storedLocale)) {
      return storedLocale
    }
  } catch (error) {
    console.warn('Failed to read locale from storage.', error)
  }

  return DEFAULT_LOCALE
}

export function writeLocale(locale: AppLocale) {
  try {
    uni.setStorageSync(LOCALE_STORAGE_KEY, locale)
  } catch (error) {
    console.warn('Failed to persist locale to storage.', error)
  }
}

import type { AppLocale } from '@/i18n/types'

export type LocalizedText = Record<AppLocale, string>

export function localized(zh: string, fr: string, en: string): LocalizedText {
  return { zh, fr, en }
}

export function pickLocalized(locale: AppLocale, text: LocalizedText) {
  return text[locale]
}

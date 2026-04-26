import { formatProfileLanguages, localizeProfileText, type LocalizedTextValue } from './profile-format'
import type { FormatLocale } from './locale-format'

export function localizeAccountText(locale: FormatLocale, text: LocalizedTextValue) {
  return localizeProfileText(locale, text)
}

export function formatAccountLanguages(locale: FormatLocale, languages: string[]) {
  return formatProfileLanguages(locale, languages)
}

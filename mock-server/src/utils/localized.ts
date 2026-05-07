import type { ApiLocale, DisplayNameCapable, LocalizedText } from '../types/common.js'

const SUPPORTED_API_LOCALES: ApiLocale[] = ['zh', 'fr', 'en']

export function localized(zh: string, fr: string, en: string): LocalizedText {
  return { zh, fr, en }
}

export function resolveApiLocale(value: unknown): ApiLocale {
  if (typeof value === 'string' && SUPPORTED_API_LOCALES.includes(value as ApiLocale)) {
    return value as ApiLocale
  }

  return 'zh'
}

export function resolveLocalizedText(locale: ApiLocale, text: LocalizedText): string {
  return text[locale] || text.en || ''
}

export function resolveLocalizedTexts(locale: ApiLocale, items: LocalizedText[]): string[] {
  return items.map((item) => resolveLocalizedText(locale, item))
}

export function resolveDisplayName(record: DisplayNameCapable): string {
  return record.displayName ?? record.nickname ?? record.legalName ?? record.nickName ?? record.realName ?? record.id ?? 'Unknown'
}

export function withDisplayName<T extends DisplayNameCapable>(record: T): T & { displayName: string } {
  return {
    ...record,
    displayName: resolveDisplayName(record),
  }
}

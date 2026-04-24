export const MOCK_LOCALES = ['zh', 'fr', 'en'] as const
export type MockLocale = (typeof MOCK_LOCALES)[number]

export type LocalizedText = Record<MockLocale, string>

export function localized(zh: string, fr: string, en: string): LocalizedText {
  return { zh, fr, en }
}

export function pickLocalized(locale: MockLocale, text: LocalizedText) {
  return text[locale]
}

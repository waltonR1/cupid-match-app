export const SUPPORTED_LOCALES = ['zh', 'fr', 'en'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export type AppMessageValue = string | AppMessageSchema

export interface AppMessageSchema {
  [key: string]: AppMessageValue
}

export type AppLocaleMessages = Record<AppLocale, AppMessageSchema>

export type AppMessages = Record<AppLocale, Record<string, AppMessageSchema>>

/** i18n 翻译函数类型 */
export type Translate = (key: string) => string
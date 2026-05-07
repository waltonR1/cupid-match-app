import type {ApiLocale, DisplayNameCapable, LocalizedText} from '../types/common.js'

/** 支持的语言 */
const SUPPORTED_API_LOCALES: ApiLocale[] = ['zh', 'fr', 'en']

/** 创建多语言文本 */
export function localized(zh: string, fr: string, en: string): LocalizedText {
    return {zh, fr, en}
}

/** 解析语言 */
export function resolveApiLocale(value: unknown): ApiLocale {
    if (typeof value === 'string' && SUPPORTED_API_LOCALES.includes(value as ApiLocale)) {
        return value as ApiLocale
    }

    return 'zh'
}

/** 解析多语言文本 */
export function resolveLocalizedText(locale: ApiLocale, text: LocalizedText): string {
    return text[locale] || text.en || ''
}

/** 批量解析多语言文本 */
export function resolveLocalizedTexts(locale: ApiLocale, items: LocalizedText[]): string[] {
    return items.map((item) => resolveLocalizedText(locale, item))
}

/** 解析展示名 */
export function resolveDisplayName(record: DisplayNameCapable): string {
    return record.displayName ?? record.nickname ?? record.legalName ?? record.nickName ?? record.realName ?? record.id ?? 'Unknown'
}

/** 补充展示名 */
export function withDisplayName<T extends DisplayNameCapable>(record: T): T & { displayName: string } {
    return {
        ...record,
        displayName: resolveDisplayName(record),
    }
}
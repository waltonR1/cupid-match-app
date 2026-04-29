import {formatLocalizedDate, type FormatLocale} from './locale-format'

export type LocalizedTextValue = Record<FormatLocale, string>

/** 语言标签映射 */
const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedTextValue> = {
    FR: {zh: '法语', fr: 'Francais', en: 'French'},
    EN: {zh: '英语', fr: 'Anglais', en: 'English'},
    ZH: {zh: '中文', fr: 'Chinois', en: 'Chinese'},
    NL: {zh: '荷兰语', fr: 'Neerlandais', en: 'Dutch'},
    IT: {zh: '意大利语', fr: 'Italien', en: 'Italian'},
    DE: {zh: '德语', fr: 'Allemand', en: 'German'},
}

/** 多语言文本本地化 */
export function localizeProfileText(locale: FormatLocale, text: LocalizedTextValue | string | null | undefined) {
    if (typeof text === 'string') return text
    if (!text) return ''
    return text[locale] || text.en || ''
}

/** 年龄格式化 */
export function formatProfileAge(locale: FormatLocale, age: number) {
    if (locale === 'zh') return `${age}岁`
    if (locale === 'fr') return `${age} ans`
    return String(age)
}

/** 身高格式化 */
export function formatProfileHeight(height: number) {
    return `${height} cm`
}

/** 语言列表格式化 */
export function formatProfileLanguages(locale: FormatLocale, languages: string[]) {
    return languages
        .map((language) => getProfileLanguageLabel(locale, language))
        .join(' / ')
}

/** 日期格式化 */
export function formatProfileDate(locale: FormatLocale, date: string) {
    return formatLocalizedDate(locale, date)
}

/** 获取语言本地化标签 */
function getProfileLanguageLabel(locale: FormatLocale, language: string) {
    const key = String(language || '').trim()
    const label = PROFILE_LANGUAGE_LABELS[key]

    if (!label) return key

    return localizeProfileText(locale, label)
}
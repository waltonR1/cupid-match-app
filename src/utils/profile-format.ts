import type {FormatLocale} from './locale-format'
import type {Translate} from '@/i18n/types'
import type {ActiveDirectoryFilterChip} from '@/types/profiles/directory'
import type {ProfileFilterToolbarItem} from '@/types/profiles/directory'

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
export function formatLocalizedAge(locale: FormatLocale, age: number) {
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

/** 获取语言本地化标签 */
function getProfileLanguageLabel(locale: FormatLocale, language: string) {
    const key = String(language || '').trim()
    const label = PROFILE_LANGUAGE_LABELS[key]

    if (!label) return key

    return localizeProfileText(locale, label)
}

/** 布尔值本地化展示 */
export function formatBooleanText(value: boolean, t: Translate) {
    return value ? t('values.yes') : t('values.no')
}

/** 构建资料详情事实项 */
export function createProfileFact(label: string, value: string) {
    return {label, value}
}

/** 构建当前激活的筛选标签 */
export function buildActiveDirectoryFilterChips<TKey extends string, TFilters extends Record<TKey, string>>(
    items: ProfileFilterToolbarItem<TKey>[],
    filters: TFilters,
): ActiveDirectoryFilterChip<TKey>[] {
    return items
        .map((item) => {
            const value = filters[item.key]
            if (!value) return undefined

            return {
                key: item.key,
                label: item.label,
                value: item.options.find(option => option.value === value)?.label ?? value,
            }
        })
        .filter((item): item is ActiveDirectoryFilterChip<TKey> => Boolean(item))
}

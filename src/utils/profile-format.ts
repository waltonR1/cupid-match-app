import type {FormatLocale} from './locale-format'
import type {Translate} from '@/i18n/types'
import type {ActiveDirectoryFilterChip} from '@/types/profiles/directory'
import type {ProfileFilterToolbarItem} from '@/types/profiles/directory'

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

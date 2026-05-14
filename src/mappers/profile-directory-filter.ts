import {
    PROFILE_AGE_RANGE_FILTER_OPTIONS,
    PROFILE_CHILDREN_FILTER_OPTIONS,
    PROFILE_EDUCATION_FILTER_OPTIONS,
    PROFILE_FILTER_WIDTH_CLASS,
    PROFILE_GENDER_FILTER_OPTIONS,
    PROFILE_LONG_DISTANCE_FILTER_OPTIONS,
    PROFILE_MARITAL_STATUS_FILTER_OPTIONS,
    type ProfileFilterOptionDefinition,
} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import type {DirectoryOption} from '@/types/profiles/directory'
import type {ProfileFilterToolbarItem} from '@/types/profiles/directory'

type FilterGroup = ProfileFilterToolbarItem['group']

interface FacetOption {
    label: string
    value: string
}

interface IntentOption {
    code: string
    label: string
}

/** 构建全部选项 */
export function allOption(t: Translate): DirectoryOption {
    return {label: t('filters.all'), value: ''}
}

/** 转换通用 facet 选项 */
export function toDirectoryOptions(items: FacetOption[]): DirectoryOption[] {
    return items.map(item => ({label: item.label, value: item.value}))
}

/** 转换交友意向 facet 选项 */
export function toIntentOptions(items: IntentOption[]): DirectoryOption[] {
    return items.map(item => ({label: item.label, value: item.code}))
}

/** 转换静态筛选选项 */
export function toStaticOptions(items: readonly ProfileFilterOptionDefinition[], t: Translate): DirectoryOption[] {
    return items.map(item => ({
        label: 'label' in item ? item.label : t(item.labelKey),
        value: item.value,
    }))
}

/** 构建性别筛选项 */
export function buildGenderFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.gender'),
        options: toStaticOptions(PROFILE_GENDER_FILTER_OPTIONS, t),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.compact,
        group: 'primary',
        t,
    })
}

/** 构建年龄筛选项 */
export function buildAgeRangeFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.age'),
        options: toStaticOptions(PROFILE_AGE_RANGE_FILTER_OPTIONS, t),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.compact,
        group: 'primary',
        t,
    })
}

/** 构建学历筛选项 */
export function buildEducationFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.education'),
        options: toStaticOptions(PROFILE_EDUCATION_FILTER_OPTIONS, t),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'primary',
        t,
    })
}

/** 构建婚姻状态筛选项 */
export function buildMaritalStatusFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.maritalStatus'),
        options: toStaticOptions(PROFILE_MARITAL_STATUS_FILTER_OPTIONS, t),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
        t,
    })
}

/** 构建子女状态筛选项 */
export function buildChildrenFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.children'),
        options: toStaticOptions(PROFILE_CHILDREN_FILTER_OPTIONS, t),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
        t,
    })
}

/** 构建异地接受度筛选项 */
export function buildLongDistanceFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.longDistance'),
        options: toStaticOptions(PROFILE_LONG_DISTANCE_FILTER_OPTIONS, t),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
        t,
    })
}

/** 构建带动态选项的筛选项 */
export function buildDynamicFilter<TKey extends string>(params: {
    key: TKey
    label: string
    options: DirectoryOption[]
    value: string
    widthClass: string
    group: FilterGroup
    t: Translate
}): ProfileFilterToolbarItem<TKey> {
    return {
        key: params.key,
        label: params.label,
        options: [allOption(params.t), ...params.options],
        value: params.value,
        widthClass: params.widthClass,
        group: params.group,
    }
}

/** 构建带固定选项的筛选项 */
function buildStaticFilter<TKey extends string>(params: {
    key: TKey
    label: string
    options: DirectoryOption[]
    value: string
    widthClass: string
    group: FilterGroup
    t: Translate
}): ProfileFilterToolbarItem<TKey> {
    return buildDynamicFilter(params)
}

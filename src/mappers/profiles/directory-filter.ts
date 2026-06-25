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

export type OptionLabel = (fieldKey: string, value: string) => string

interface FacetOption {
    label: string
    value: string
}

interface IntentOption {
    code: string
    label: string
}

export function allOption(t: Translate): DirectoryOption {
    return {label: t('filters.all'), value: ''}
}

export function toDirectoryOptions(items: FacetOption[]): DirectoryOption[] {
    return items.map(item => ({label: item.label, value: item.value}))
}

export function toIntentOptions(items: IntentOption[]): DirectoryOption[] {
    return items.map(item => ({label: item.label, value: item.code}))
}

export function toStaticOptions(items: readonly ProfileFilterOptionDefinition[], t: Translate): DirectoryOption[] {
    return items.map(item => ({
        label: 'label' in item ? item.label : t(item.labelKey),
        value: item.value,
    }))
}

function toCommonOptions(
    items: readonly ProfileFilterOptionDefinition[],
    fieldKey: string,
    optionLabel: OptionLabel,
): DirectoryOption[] {
    return items.map(item => ({
        label: optionLabel(fieldKey, item.value),
        value: item.value,
    }))
}

export function buildGenderFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
    optionLabel: OptionLabel,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.gender'),
        options: toCommonOptions(PROFILE_GENDER_FILTER_OPTIONS, 'gender', optionLabel),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.compact,
        group: 'primary',
        t,
    })
}

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

export function buildEducationFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
    optionLabel: OptionLabel,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.education'),
        options: toCommonOptions(PROFILE_EDUCATION_FILTER_OPTIONS, 'degreeLevel', optionLabel),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'primary',
        t,
    })
}

export function buildMaritalStatusFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
    optionLabel: OptionLabel,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.maritalStatus'),
        options: toCommonOptions(PROFILE_MARITAL_STATUS_FILTER_OPTIONS, 'maritalStatus', optionLabel),
        value,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
        t,
    })
}

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

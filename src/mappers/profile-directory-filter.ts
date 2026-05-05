import {PROFILE_FILTER_WIDTH_CLASS} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import type {DirectoryOption} from '@/types/profiles/directory'
import type {ProfileFilterToolbarItem} from '@/types/profiles/view'

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

/** 构建性别筛选项 */
export function buildGenderFilter<TKey extends string>(
    key: TKey,
    value: string,
    t: Translate,
): ProfileFilterToolbarItem<TKey> {
    return buildStaticFilter({
        key,
        label: t('filters.gender'),
        options: [
            {label: t('filters.genderMale'), value: 'male'},
            {label: t('filters.genderFemale'), value: 'female'},
        ],
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
        options: [
            {label: t('filters.ageUnder25'), value: 'under25'},
            {label: t('filters.age25to29'), value: '25to29'},
            {label: t('filters.age30to34'), value: '30to34'},
            {label: t('filters.age35to39'), value: '35to39'},
            {label: t('filters.age40plus'), value: '40plus'},
        ],
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
        options: [
            {label: t('filters.eduBachelor'), value: 'bachelor'},
            {label: t('filters.eduMaster'), value: 'master'},
            {label: t('filters.eduPhD'), value: 'phd'},
        ],
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
        options: [
            {label: t('filters.maritalSingle'), value: 'single'},
            {label: t('filters.maritalDivorced'), value: 'divorced'},
            {label: t('filters.maritalWidowed'), value: 'widowed'},
        ],
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
        options: [
            {label: t('filters.childrenYes'), value: 'yes'},
            {label: t('filters.childrenNo'), value: 'no'},
        ],
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
        options: [
            {label: t('filters.longDistanceYes'), value: 'yes'},
            {label: t('filters.longDistanceNo'), value: 'no'},
        ],
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

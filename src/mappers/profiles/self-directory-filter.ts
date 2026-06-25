import type {FormatLocale, SelfProfileDirectoryFacets} from '@/api/profiles'
import {
    PROFILE_FILTER_WIDTH_CLASS,
    SELF_HEIGHT_RANGE_FILTER_OPTIONS,
    SELF_VERIFIED_FILTER_OPTIONS,
} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import {
    allOption,
    buildAgeRangeFilter,
    buildChildrenFilter,
    buildDynamicFilter,
    buildEducationFilter,
    buildGenderFilter,
    buildLongDistanceFilter,
    buildMaritalStatusFilter,
    toDirectoryOptions,
    toIntentOptions,
    toStaticOptions,
    type OptionLabel,
} from '@/mappers/profiles/directory-filter'
import type {SelfDirectoryFilterItem, SelfDirectoryFilters} from '@/types/profiles/directory'

/** 构建个人资料目录筛选项 */
export function buildSelfDirectoryFilterItems(
    facets: SelfProfileDirectoryFacets | null,
    filters: SelfDirectoryFilters,
    _locale: FormatLocale,
    t: Translate,
    optionLabel: OptionLabel,
): SelfDirectoryFilterItem[] {
    const cities = facets?.cities ?? []
    const intents = facets?.intents ?? []
    const industries = facets?.industries ?? []
    const languages = facets?.languages ?? []

    return [
        buildGenderFilter('gender', filters.gender, t, optionLabel),
        buildAgeRangeFilter('ageRange', filters.ageRange, t),
        buildCityFilter(filters, t, cities),
        buildHeightRangeFilter(filters, t),
        buildEducationFilter('education', filters.education, t, optionLabel),
        buildIntentFilter(filters, t, intents),
        buildIndustryFilter(filters, t, industries),
        buildLanguageFilter(filters, t, languages, optionLabel),
        buildVerifiedFilter(filters, t),
        buildMaritalStatusFilter('maritalStatus', filters.maritalStatus, t, optionLabel),
        buildChildrenFilter('hasChildren', filters.hasChildren, t),
        buildLongDistanceFilter('acceptsLongDistance', filters.acceptsLongDistance, t),
    ]
}

/** 构建城市筛选项 */
function buildCityFilter(
    filters: SelfDirectoryFilters,
    t: Translate,
    cities: SelfProfileDirectoryFacets['cities'],
): SelfDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'city',
        label: t('filters.city'),
        options: toDirectoryOptions(cities),
        value: filters.city,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'primary',
        t,
    })
}

/** 构建身高筛选项 */
function buildHeightRangeFilter(filters: SelfDirectoryFilters, t: Translate): SelfDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'heightRange',
        label: t('filters.height'),
        options: toStaticOptions(SELF_HEIGHT_RANGE_FILTER_OPTIONS, t),
        value: filters.heightRange,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.compact,
        group: 'primary',
        t,
    })
}

/** 构建交友意向筛选项 */
function buildIntentFilter(
    filters: SelfDirectoryFilters,
    t: Translate,
    intents: SelfProfileDirectoryFacets['intents'],
): SelfDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'datingIntentionCode',
        label: t('filters.intent'),
        options: toIntentOptions(intents),
        value: filters.datingIntentionCode,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
        group: 'primary',
        t,
    })
}

/** 构建行业筛选项 */
function buildIndustryFilter(
    filters: SelfDirectoryFilters,
    t: Translate,
    industries: SelfProfileDirectoryFacets['industries'],
): SelfDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'industry',
        label: t('filters.industry'),
        options: toDirectoryOptions(industries),
        value: filters.industry,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
        t,
    })
}

/** 构建语言筛选项 */
function buildLanguageFilter(
    filters: SelfDirectoryFilters,
    t: Translate,
    languages: SelfProfileDirectoryFacets['languages'],
    optionLabel: OptionLabel,
): SelfDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'language',
        label: t('filters.languages'),
        options: languages.map(value => ({
            label: optionLabel('languages', value.toUpperCase()),
            value,
        })),
        value: filters.language,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
        t,
    })
}

/** 构建认证状态筛选项 */
function buildVerifiedFilter(filters: SelfDirectoryFilters, t: Translate): SelfDirectoryFilterItem {
    return {
        key: 'verified',
        label: t('filters.verified'),
        options: [allOption(t), ...toStaticOptions(SELF_VERIFIED_FILTER_OPTIONS, t)],
        value: filters.verified,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
    }
}

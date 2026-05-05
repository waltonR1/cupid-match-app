import type {FormatLocale, SelfProfileDirectoryFacets} from '@/api/profiles'
import {PROFILE_FILTER_WIDTH_CLASS} from '@/constants/profiles'
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
} from '@/mappers/profile-directory-filter'
import type {SelfDirectoryFilterItem, SelfDirectoryFilters} from '@/types/profiles/directory'
import {formatProfileLanguages} from '@/utils/profile-format'

/** 构建个人资料目录筛选项 */
export function buildSelfDirectoryFilterItems(
    facets: SelfProfileDirectoryFacets | null,
    filters: SelfDirectoryFilters,
    locale: FormatLocale,
    t: Translate,
): SelfDirectoryFilterItem[] {
    const cities = facets?.cities ?? []
    const intents = facets?.intents ?? []
    const industries = facets?.industries ?? []
    const occupations = facets?.occupations ?? []
    const languages = facets?.languages ?? []

    return [
        buildGenderFilter('gender', filters.gender, t),
        buildAgeRangeFilter('ageRange', filters.ageRange, t),
        buildCityFilter(filters, t, cities),
        buildHeightRangeFilter(filters, t),
        buildEducationFilter('education', filters.education, t),
        buildIntentFilter(filters, t, intents),
        buildIndustryFilter(filters, t, industries),
        buildOccupationFilter(filters, t, occupations),
        buildLanguageFilter(filters, locale, t, languages),
        buildVerifiedFilter(filters, t),
        buildMaritalStatusFilter('maritalStatus', filters.maritalStatus, t),
        buildChildrenFilter('hasChildren', filters.hasChildren, t),
        buildLongDistanceFilter('acceptLongDistance', filters.acceptLongDistance, t),
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
        options: [
            {label: '165cm-', value: 'under165'},
            {label: '165-169cm', value: '165to169'},
            {label: '170-174cm', value: '170to174'},
            {label: '175-179cm', value: '175to179'},
            {label: '180cm+', value: '180plus'},
        ],
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
        key: 'intentCode',
        label: t('filters.intent'),
        options: toIntentOptions(intents),
        value: filters.intentCode,
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

/** 构建职业筛选项 */
function buildOccupationFilter(
    filters: SelfDirectoryFilters,
    t: Translate,
    occupations: SelfProfileDirectoryFacets['occupations'],
): SelfDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'occupation',
        label: t('fields.job'),
        options: toDirectoryOptions(occupations),
        value: filters.occupation,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
        group: 'secondary',
        t,
    })
}

/** 构建语言筛选项 */
function buildLanguageFilter(
    filters: SelfDirectoryFilters,
    locale: FormatLocale,
    t: Translate,
    languages: SelfProfileDirectoryFacets['languages'],
): SelfDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'language',
        label: t('filters.languages'),
        options: languages.map(value => ({
            label: formatProfileLanguages(locale, [value]),
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
        options: [
            allOption(t),
            {label: t('filters.verifiedYes'), value: 'verified'},
            {label: t('filters.verifiedNo'), value: 'unverified'},
        ],
        value: filters.verified,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
        group: 'secondary',
    }
}

import type {FamilyProfileDirectoryFacets} from '@/api/profiles'
import {FAMILY_MODE_FILTER_OPTIONS, PROFILE_FILTER_WIDTH_CLASS} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import {
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
} from '@/mappers/profile-directory-filter'
import type {FamilyDirectoryFilterItem, FamilyDirectoryFilters} from '@/types/profiles/directory'

/** 构建家庭资料目录筛选项 */
export function buildFamilyDirectoryFilterItems(
    facets: FamilyProfileDirectoryFacets | null,
    filters: FamilyDirectoryFilters,
    t: Translate,
): FamilyDirectoryFilterItem[] {
    const cities = facets?.cities ?? []
    const intents = facets?.intents ?? []
    const occupations = facets?.occupations ?? []
    const industries = facets?.industries ?? []

    return [
        buildGenderFilter('gender', filters.gender, t),
        buildAgeRangeFilter('ageRange', filters.ageRange, t),
        buildFamilyModeFilter(filters, t),
        buildCityFilter(filters, t, cities),
        buildEducationFilter('education', filters.education, t),
        buildIntentFilter(filters, t, intents),
        buildOccupationFilter(filters, t, occupations),
        buildIndustryFilter(filters, t, industries),
        buildMaritalStatusFilter('maritalStatus', filters.maritalStatus, t),
        buildChildrenFilter('hasChildren', filters.hasChildren, t),
        buildLongDistanceFilter('acceptsLongDistance', filters.acceptsLongDistance, t),
    ]
}

/** 构建家庭参与模式筛选项 */
function buildFamilyModeFilter(filters: FamilyDirectoryFilters, t: Translate): FamilyDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'familyMode',
        label: t('filters.familyMode'),
        options: toStaticOptions(FAMILY_MODE_FILTER_OPTIONS, t),
        value: filters.familyMode,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
        group: 'primary',
        t,
    })
}

/** 构建城市筛选项 */
function buildCityFilter(
    filters: FamilyDirectoryFilters,
    t: Translate,
    cities: FamilyProfileDirectoryFacets['cities'],
): FamilyDirectoryFilterItem {
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

/** 构建交友意向筛选项 */
function buildIntentFilter(
    filters: FamilyDirectoryFilters,
    t: Translate,
    intents: FamilyProfileDirectoryFacets['intents'],
): FamilyDirectoryFilterItem {
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

/** 构建职业筛选项 */
function buildOccupationFilter(
    filters: FamilyDirectoryFilters,
    t: Translate,
    occupations: FamilyProfileDirectoryFacets['occupations'],
): FamilyDirectoryFilterItem {
    return buildDynamicFilter({
        key: 'occupation',
        label: t('filters.occupation'),
        options: toDirectoryOptions(occupations),
        value: filters.occupation,
        widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
        group: 'secondary',
        t,
    })
}

/** 构建行业筛选项 */
function buildIndustryFilter(
    filters: FamilyDirectoryFilters,
    t: Translate,
    industries: FamilyProfileDirectoryFacets['industries'],
): FamilyDirectoryFilterItem {
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

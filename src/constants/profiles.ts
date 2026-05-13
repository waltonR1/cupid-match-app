import type {FamilyProfileSortKey, SelfProfileSortKey} from '@/api/profiles'
import type {FamilyDirectoryFilters, SelfDirectoryFilters} from '@/types/profiles/directory'

/** 静态筛选选项定义 */
export type ProfileFilterOptionDefinition =
    | {
    label: string
    value: string
}
    | {
    labelKey: string
    value: string
}

/** 资料目录统一分页大小 */
export const PROFILE_DIRECTORY_PAGE_SIZE = 6

/** 资料筛选项宽度样式 */
export const PROFILE_FILTER_WIDTH_CLASS = {
    compact: 'w-[86px] sm:w-[90px] lg:w-[94px] xl:w-[98px]',
    regular: 'w-[98px] sm:w-[104px] lg:w-[110px] xl:w-[116px]',
    wide: 'w-[114px] sm:w-[122px] lg:w-[130px] xl:w-[136px]',
} as const

/** 默认个人资料筛选条件 */
export const DEFAULT_SELF_DIRECTORY_FILTERS: SelfDirectoryFilters = {
    gender: '',
    ageRange: '',
    city: '',
    heightRange: '',
    education: '',
    datingIntentionCode: '',
    industry: '',
    language: '',
    verified: '',
    maritalStatus: '',
    hasChildren: '',
    acceptsLongDistance: '',
}

/** 默认家庭资料筛选条件 */
export const DEFAULT_FAMILY_DIRECTORY_FILTERS: FamilyDirectoryFilters = {
    gender: '',
    ageRange: '',
    city: '',
    education: '',
    datingIntentionCode: '',
    familyMode: '',
    industry: '',
    maritalStatus: '',
    hasChildren: '',
    acceptsLongDistance: '',
}

/** 默认个人资料排序方式 */
export const DEFAULT_SELF_PROFILE_SORT: SelfProfileSortKey = 'recentActive'

/** 默认家庭资料排序方式 */
export const DEFAULT_FAMILY_PROFILE_SORT: FamilyProfileSortKey = 'priorityFirst'

/** 个人资料目录排序 key */
export const SELF_PROFILE_SORT_KEYS = [
    'recentActive',
    'priorityFirst',
    'ageAsc',
    'ageDesc',
] as const satisfies readonly SelfProfileSortKey[]

/** 家庭资料目录排序 key */
export const FAMILY_PROFILE_SORT_KEYS = [
    'priorityFirst',
    'recentActive',
    'ageAsc',
    'ageDesc',
] as const satisfies readonly FamilyProfileSortKey[]

/** 性别筛选选项 */
export const PROFILE_GENDER_FILTER_OPTIONS = [
    {labelKey: 'filters.genderMale', value: 'male'},
    {labelKey: 'filters.genderFemale', value: 'female'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 年龄筛选选项 */
export const PROFILE_AGE_RANGE_FILTER_OPTIONS = [
    {labelKey: 'filters.ageUnder25', value: 'under25'},
    {labelKey: 'filters.age25to29', value: '25to29'},
    {labelKey: 'filters.age30to34', value: '30to34'},
    {labelKey: 'filters.age35to39', value: '35to39'},
    {labelKey: 'filters.age40plus', value: '40plus'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 学历筛选选项 */
export const PROFILE_EDUCATION_FILTER_OPTIONS = [
    {labelKey: 'filters.eduBachelor', value: 'bachelor'},
    {labelKey: 'filters.eduMaster', value: 'master'},
    {labelKey: 'filters.eduPhD', value: 'phd'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 婚姻状态筛选选项 */
export const PROFILE_MARITAL_STATUS_FILTER_OPTIONS = [
    {labelKey: 'filters.maritalSingle', value: 'never_married'},
    {labelKey: 'filters.maritalDivorced', value: 'divorced'},
    {labelKey: 'filters.maritalWidowed', value: 'widowed'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 子女状态筛选选项 */
export const PROFILE_CHILDREN_FILTER_OPTIONS = [
    {labelKey: 'filters.childrenYes', value: 'yes'},
    {labelKey: 'filters.childrenNo', value: 'no'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 异地接受度筛选选项 */
export const PROFILE_LONG_DISTANCE_FILTER_OPTIONS = [
    {labelKey: 'filters.longDistanceYes', value: 'yes'},
    {labelKey: 'filters.longDistanceNo', value: 'no'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 家庭参与模式筛选选项 */
export const FAMILY_MODE_FILTER_OPTIONS = [
    {labelKey: 'filters.modeContextOnly', value: 'context_only'},
    {labelKey: 'filters.modeContactReady', value: 'contact_ready'},
    {labelKey: 'filters.modePriority', value: 'priority'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 个人身高筛选选项 */
export const SELF_HEIGHT_RANGE_FILTER_OPTIONS = [
    {label: '165cm-', value: 'under165'},
    {label: '165-169cm', value: '165to169'},
    {label: '170-174cm', value: '170to174'},
    {label: '175-179cm', value: '175to179'},
    {label: '180cm+', value: '180plus'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 个人认证状态筛选选项 */
export const SELF_VERIFIED_FILTER_OPTIONS = [
    {labelKey: 'filters.verifiedYes', value: 'verified'},
    {labelKey: 'filters.verifiedNo', value: 'unverified'},
] as const satisfies readonly ProfileFilterOptionDefinition[]

/** 校验个人资料排序 key */
export function isSelfProfileSortKey(value: string): value is SelfProfileSortKey {
    return SELF_PROFILE_SORT_KEYS.includes(value as SelfProfileSortKey)
}

/** 校验家庭资料排序 key */
export function isFamilyProfileSortKey(value: string): value is FamilyProfileSortKey {
    return FAMILY_PROFILE_SORT_KEYS.includes(value as FamilyProfileSortKey)
}

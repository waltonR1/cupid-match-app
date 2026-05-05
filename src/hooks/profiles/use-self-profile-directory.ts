import {computed, ref, watch, type Ref} from 'vue'
import {
    getSelfProfileDirectory,
    type FormatLocale,
    type SelfProfileDirectoryFacets,
    type SelfProfileDirectoryQuery,
    type SelfProfileDirectoryResponse,
    type SelfProfileSortKey,
} from '@/api/profiles/profiles'
import {toProfileCardViewModel} from '@/hooks/profiles/profile-card-presenter'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {PROFILE_DIRECTORY_PAGE_SIZE, PROFILE_FILTER_WIDTH_CLASS, isSelfProfileSortKey} from '@/constants/profiles'
import type {Translate} from '@/i18n/types'
import type {DirectoryOption, SelfDirectoryFilters} from '@/types/profiles/directory'
import type {ProfileFilterToolbarItem} from '@/types/profiles/view'
import {buildActiveDirectoryFilterChips, formatProfileLanguages} from '@/utils/profile-format'

/** 默认筛选条件 */
const DEFAULT_FILTERS: SelfDirectoryFilters = {
    gender: '',
    ageRange: '',
    city: '',
    heightRange: '',
    education: '',
    intentCode: '',
    industry: '',
    occupation: '',
    language: '',
    verified: '',
    maritalStatus: '',
    hasChildren: '',
    acceptLongDistance: '',
}

/** 默认排序方式 */
const DEFAULT_SORT: SelfProfileSortKey = 'recentActive'

/** 个人资料目录数据 */
export function useSelfProfileDirectory(t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const filters = ref<SelfDirectoryFilters>({...DEFAULT_FILTERS})
    const sortKey = ref<SelfProfileSortKey>(DEFAULT_SORT)
    const page = ref(1)
    const response = ref<SelfProfileDirectoryResponse | null>(null)

    /** 筛选、排序、分页或语言变化时重新加载目录 */
    watch([filters, sortKey, page, locale], () => {
        void load()
    }, {deep: true, immediate: true})

    /** 页面展示数据 */
    const pageData = computed(() => {
        const filterItems = buildSelfDirectoryFilterItems(response.value?.facets ?? null, filters.value, locale.value, t)
        const pagination = response.value?.pagination ?? {
            page: 1,
            pageSize: PROFILE_DIRECTORY_PAGE_SIZE,
            total: 0,
            totalPages: 1,
        }

        return {
            items: (response.value?.items ?? []).map(item => ({
                id: item.id,
                card: toProfileCardViewModel(item.card, t),
            })),
            filters: filterItems,
            activeFilters: buildActiveDirectoryFilterChips(filterItems, filters.value),
            page: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            totalPages: pagination.totalPages,
        }
    })

    /** 加载个人资料目录 */
    async function load() {
        const nextResponse = await latest.run(() => getSelfProfileDirectory(buildQuery()))

        if (!nextResponse) {
            if (latest.error.value !== null) {
                response.value = null
            }
            return
        }

        response.value = nextResponse
    }

    /** 构建目录查询参数 */
    function buildQuery(): SelfProfileDirectoryQuery {
        return {
            page: page.value,
            pageSize: PROFILE_DIRECTORY_PAGE_SIZE,
            sort: sortKey.value,
            ...filters.value,
        }
    }

    /** 更新筛选条件 */
    function updateFilters(nextFilters: Partial<SelfDirectoryFilters>) {
        filters.value = {
            ...filters.value,
            ...nextFilters,
        }
        page.value = 1
    }

    /** 移除单个筛选条件 */
    function removeFilter(key: keyof SelfDirectoryFilters) {
        updateFilters({[key]: ''} as Partial<SelfDirectoryFilters>)
    }

    /** 重置筛选与排序 */
    function resetFilters() {
        filters.value = {...DEFAULT_FILTERS}
        sortKey.value = DEFAULT_SORT
        page.value = 1
    }

    /** 更新排序方式 */
    function updateSort(nextSortKey: string) {
        if (!isSelfProfileSortKey(nextSortKey)) return

        sortKey.value = nextSortKey
        page.value = 1
    }

    /** 切换分页 */
    function changePage(nextPage: number) {
        if (nextPage < 1 || nextPage > pageData.value.totalPages) return

        page.value = nextPage
    }

    return {
        loading: latest.loading,
        error: latest.error,
        filters,
        sortKey,
        pageData,
        updateFilters,
        removeFilter,
        resetFilters,
        updateSort,
        changePage,
        refresh: load,
    }
}

/** 目录筛选项结构 */
type ProfileDirectoryFilterItem = ProfileFilterToolbarItem<keyof SelfDirectoryFilters>

/** 构建目录筛选项 */
function buildSelfDirectoryFilterItems(
    facets: SelfProfileDirectoryFacets | null,
    filters: SelfDirectoryFilters,
    locale: FormatLocale,
    t: Translate,
): ProfileDirectoryFilterItem[] {
    const cities = facets?.cities ?? []
    const intents = facets?.intents ?? []
    const industries = facets?.industries ?? []
    const occupations = facets?.occupations ?? []
    const languages = facets?.languages ?? []

    return [
        {
            key: 'gender',
            label: t('filters.gender'),
            options: [allOption(t), {label: t('filters.genderMale'), value: 'male'}, {
                label: t('filters.genderFemale'),
                value: 'female'
            }],
            value: filters.gender,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.compact,
            group: 'primary',
        },
        {
            key: 'ageRange',
            label: t('filters.age'),
            options: [
                allOption(t),
                {label: t('filters.ageUnder25'), value: 'under25'},
                {label: t('filters.age25to29'), value: '25to29'},
                {label: t('filters.age30to34'), value: '30to34'},
                {label: t('filters.age35to39'), value: '35to39'},
                {label: t('filters.age40plus'), value: '40plus'},
            ],
            value: filters.ageRange,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.compact,
            group: 'primary',
        },
        {
            key: 'city',
            label: t('filters.city'),
            options: [allOption(t), ...cities.map(item => ({label: item.label, value: item.value}))],
            value: filters.city,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'primary',
        },
        {
            key: 'heightRange',
            label: t('filters.height'),
            options: [
                allOption(t),
                {label: '165cm-', value: 'under165'},
                {label: '165-169cm', value: '165to169'},
                {label: '170-174cm', value: '170to174'},
                {label: '175-179cm', value: '175to179'},
                {label: '180cm+', value: '180plus'},
            ],
            value: filters.heightRange,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.compact,
            group: 'primary',
        },
        {
            key: 'education',
            label: t('filters.education'),
            options: [allOption(t), {
                label: t('filters.eduBachelor'),
                value: 'bachelor'
            }, {label: t('filters.eduMaster'), value: 'master'}, {label: t('filters.eduPhD'), value: 'phd'}],
            value: filters.education,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'primary',
        },
        {
            key: 'intentCode',
            label: t('filters.intent'),
            options: [allOption(t), ...intents.map(item => ({label: item.label, value: item.code}))],
            value: filters.intentCode,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
            group: 'primary',
        },
        {
            key: 'industry',
            label: t('filters.industry'),
            options: [allOption(t), ...industries.map(item => ({label: item.label, value: item.value}))],
            value: filters.industry,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
        {
            key: 'occupation',
            label: t('fields.job'),
            options: [allOption(t), ...occupations.map(item => ({label: item.label, value: item.value}))],
            value: filters.occupation,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
            group: 'secondary',
        },
        {
            key: 'language',
            label: t('filters.languages'),
            options: [allOption(t), ...languages.map(value => ({
                label: formatProfileLanguages(locale, [value]),
                value
            }))],
            value: filters.language,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
        {
            key: 'verified',
            label: t('filters.verified'),
            options: [allOption(t), {
                label: t('filters.verifiedYes'),
                value: 'verified'
            }, {label: t('filters.verifiedNo'), value: 'unverified'}],
            value: filters.verified,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
        {
            key: 'maritalStatus',
            label: t('filters.maritalStatus'),
            options: [allOption(t), {
                label: t('filters.maritalSingle'),
                value: 'single'
            }, {label: t('filters.maritalDivorced'), value: 'divorced'}, {
                label: t('filters.maritalWidowed'),
                value: 'widowed'
            }],
            value: filters.maritalStatus,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
        {
            key: 'hasChildren',
            label: t('filters.children'),
            options: [allOption(t), {label: t('filters.childrenYes'), value: 'yes'}, {
                label: t('filters.childrenNo'),
                value: 'no'
            }],
            value: filters.hasChildren,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
        {
            key: 'acceptLongDistance',
            label: t('filters.longDistance'),
            options: [allOption(t), {
                label: t('filters.longDistanceYes'),
                value: 'yes'
            }, {label: t('filters.longDistanceNo'), value: 'no'}],
            value: filters.acceptLongDistance,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
    ]
}

/** 全部选项 */
function allOption(t: Translate): DirectoryOption {
    return {label: t('filters.all'), value: ''}
}

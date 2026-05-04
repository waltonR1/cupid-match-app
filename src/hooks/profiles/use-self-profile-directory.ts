import {computed, ref, watch, type Ref} from 'vue'
import {
    getFeaturedSelfProfiles,
    getSelfProfileDirectory,
    type FormatLocale,
    type SelfProfileCard,
    type SelfProfileDirectoryFacets,
    type SelfProfileDirectoryQuery,
    type SelfProfileDirectoryResponse,
    type SelfProfileSortKey,
} from '@/api/profiles/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {ProfileCardListItem} from '@/types/profiles/card'
import type {ActiveDirectoryFilterChip, DirectoryOption, SelfDirectoryFilters} from '@/types/profiles/directory'
import type {ProfileFilterToolbarItem} from '@/types/profiles/view'
import {formatLocalizedAge, formatProfileLanguages} from '@/utils/profile-format'

/** 翻译函数类型 */
type Translate = (key: string) => string

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

/** 目录分页大小 */
const PAGE_SIZE = 6

/** 筛选项宽度样式 */
const compactWidthClass = 'w-[86px] sm:w-[90px] lg:w-[94px] xl:w-[98px]'
const regularWidthClass = 'w-[98px] sm:w-[104px] lg:w-[110px] xl:w-[116px]'
const wideWidthClass = 'w-[114px] sm:w-[122px] lg:w-[130px] xl:w-[136px]'

/** 首页精选会员数据 */
export function useHomeSelfProfiles(t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const items = ref<ProfileCardListItem[]>([])

    /** 语言变化时重新加载数据 */
    watch(locale, () => {
        void load()
    }, {immediate: true})

    /** 加载首页精选会员 */
    async function load() {
        const response = await latest.run(() => getFeaturedSelfProfiles())

        if (!response) return

        items.value = response.items.map(profile => ({
            id: profile.id,
            card: toSelfProfileCard(profile, locale.value, t),
        }))
    }

    return {
        loading: latest.loading,
        error: latest.error,
        featuredProfiles: computed(() => items.value),
        refresh: load,
    }
}

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
            pageSize: PAGE_SIZE,
            total: 0,
            totalPages: 1,
        }

        return {
            items: (response.value?.items ?? []).map(profile => ({
                id: profile.id,
                card: toSelfProfileCard(profile, locale.value, t),
            })),
            filters: filterItems,
            activeFilters: buildActiveFilterChips(filterItems, filters.value),
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
            pageSize: PAGE_SIZE,
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
        if (!['recentActive', 'priorityFirst', 'ageAsc', 'ageDesc'].includes(nextSortKey)) return

        sortKey.value = nextSortKey as SelfProfileSortKey
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

/** 转换会员卡片展示数据 */
function toSelfProfileCard(profile: SelfProfileCard, locale: FormatLocale, t: Translate) {
    return {
        avatarUrl: profile.avatarUrl,
        displayName: profile.displayName,
        gender: profile.gender,
        meta: `${formatLocalizedAge(locale, profile.age)} / ${profile.occupation}`,
        badge: t(intentBadgeKey(profile.intentCode)),
        summary: profile.summary,
        facts: [
            {label: t('fields.city'), value: profile.city},
            {label: t('fields.education'), value: profile.education},
            {label: t('fields.languages'), value: formatProfileLanguages(locale, profile.languages)},
        ],
        tags: profile.tags.slice(0, 3),
        footer: t(statusFooterKey(profile.status)),
    }
}

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
            widthClass: compactWidthClass,
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
            widthClass: compactWidthClass,
            group: 'primary',
        },
        {
            key: 'city',
            label: t('filters.city'),
            options: [allOption(t), ...cities.map(item => ({label: item.label, value: item.value}))],
            value: filters.city,
            widthClass: regularWidthClass,
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
            widthClass: compactWidthClass,
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
            widthClass: regularWidthClass,
            group: 'primary',
        },
        {
            key: 'intentCode',
            label: t('filters.intent'),
            options: [allOption(t), ...intents.map(item => ({label: item.label, value: item.code}))],
            value: filters.intentCode,
            widthClass: wideWidthClass,
            group: 'primary',
        },
        {
            key: 'industry',
            label: t('filters.industry'),
            options: [allOption(t), ...industries.map(item => ({label: item.label, value: item.value}))],
            value: filters.industry,
            widthClass: regularWidthClass,
            group: 'secondary',
        },
        {
            key: 'occupation',
            label: t('fields.job'),
            options: [allOption(t), ...occupations.map(item => ({label: item.label, value: item.value}))],
            value: filters.occupation,
            widthClass: wideWidthClass,
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
            widthClass: regularWidthClass,
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
            widthClass: regularWidthClass,
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
            widthClass: regularWidthClass,
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
            widthClass: regularWidthClass,
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
            widthClass: regularWidthClass,
            group: 'secondary',
        },
    ]
}

/** 构建当前激活的筛选标签 */
function buildActiveFilterChips(items: ProfileDirectoryFilterItem[], filters: SelfDirectoryFilters): ActiveDirectoryFilterChip<keyof SelfDirectoryFilters>[] {
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
        .filter((item): item is ActiveDirectoryFilterChip<keyof SelfDirectoryFilters> => Boolean(item))
}

/** 全部选项 */
function allOption(t: Translate): DirectoryOption {
    return {label: t('filters.all'), value: ''}
}

/** 根据交友意向返回徽章文案 key */
function intentBadgeKey(intentCode: SelfProfileCard['intentCode']) {
    switch (intentCode) {
        case 'marriage':
            return 'card.goalMarriage'
        case 'exclusive':
            return 'card.goalExclusive'
        case 'cross_border':
            return 'card.goalCrossBorder'
        case 'serious':
        default:
            return 'card.goalSerious'
    }
}

/** 根据账号状态返回底部标签文案 key */
function statusFooterKey(status: SelfProfileCard['status']) {
    switch (status) {
        case 'review':
            return 'card.labelReview'
        case 'vip':
            return 'card.labelPriority'
        case 'open':
        default:
            return 'card.labelSelected'
    }
}

import {computed, ref, watch, type Ref} from 'vue'
import {
    getFamilyProfileDirectory,
    type FamilyProfileCard,
    type FamilyProfileDirectoryFacets,
    type FamilyProfileDirectoryQuery,
    type FamilyProfileDirectoryResponse,
    type FamilyProfileSortKey,
    type FormatLocale,
} from '@/api/profiles/profiles'
import {PROFILE_DIRECTORY_PAGE_SIZE, PROFILE_FILTER_WIDTH_CLASS, isFamilyProfileSortKey} from '@/constants/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import type {DirectoryOption, FamilyDirectoryFilters} from '@/types/profiles/directory'
import type {ProfileFilterToolbarItem} from '@/types/profiles/view'
import {buildActiveDirectoryFilterChips, formatLocalizedAge} from '@/utils/profile-format'

/** 默认筛选条件 */
const DEFAULT_FILTERS: FamilyDirectoryFilters = {
    gender: '',
    ageRange: '',
    city: '',
    education: '',
    intentCode: '',
    familyMode: '',
    occupation: '',
    industry: '',
    maritalStatus: '',
    hasChildren: '',
    acceptLongDistance: '',
}

/** 默认排序方式 */
const DEFAULT_SORT: FamilyProfileSortKey = 'priorityFirst'

/** 家庭资料目录数据 */
export function useFamilyProfileDirectory(t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const filters = ref<FamilyDirectoryFilters>({...DEFAULT_FILTERS})
    const sortKey = ref<FamilyProfileSortKey>(DEFAULT_SORT)
    const page = ref(1)
    const response = ref<FamilyProfileDirectoryResponse | null>(null)

    /** 筛选、排序、分页或语言变化时重新加载目录 */
    watch([filters, sortKey, page, locale], () => {
        void load()
    }, {deep: true, immediate: true})

    /** 页面展示数据 */
    const pageData = computed(() => {
        const filterItems = buildFamilyDirectoryFilterItems(response.value?.facets ?? null, filters.value, locale.value, t)
        const pagination = response.value?.pagination ?? {
            page: 1,
            pageSize: PROFILE_DIRECTORY_PAGE_SIZE,
            total: 0,
            totalPages: 1,
        }

        return {
            items: (response.value?.items ?? []).map(profile => ({
                id: profile.id,
                card: toFamilyProfileCard(profile, locale.value, t),
            })),
            filters: filterItems,
            activeFilters: buildActiveDirectoryFilterChips(filterItems, filters.value),
            page: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            totalPages: pagination.totalPages,
        }
    })

    /** 加载家庭资料目录 */
    async function load() {
        const nextResponse = await latest.run(() => getFamilyProfileDirectory(buildQuery()))

        if (!nextResponse) {
            if (latest.error.value !== null) {
                response.value = null
            }
            return
        }

        response.value = nextResponse
    }

    /** 构建目录查询参数 */
    function buildQuery(): FamilyProfileDirectoryQuery {
        return {
            page: page.value,
            pageSize: PROFILE_DIRECTORY_PAGE_SIZE,
            sort: sortKey.value,
            ...filters.value,
        }
    }

    /** 更新筛选条件 */
    function updateFilters(nextFilters: Partial<FamilyDirectoryFilters>) {
        filters.value = {
            ...filters.value,
            ...nextFilters,
        }
        page.value = 1
    }

    /** 移除单个筛选条件 */
    function removeFilter(key: keyof FamilyDirectoryFilters) {
        updateFilters({[key]: ''} as Partial<FamilyDirectoryFilters>)
    }

    /** 重置筛选与排序 */
    function resetFilters() {
        filters.value = {...DEFAULT_FILTERS}
        sortKey.value = DEFAULT_SORT
        page.value = 1
    }

    /** 更新排序方式 */
    function updateSort(nextSortKey: string) {
        if (!isFamilyProfileSortKey(nextSortKey)) return

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
type ProfileDirectoryFilterItem = ProfileFilterToolbarItem<keyof FamilyDirectoryFilters>

/** 转换家庭资料卡片展示数据 */
function toFamilyProfileCard(profile: FamilyProfileCard, locale: FormatLocale, t: Translate) {
    const familyMode = resolveFamilyMode(profile)
    const additionalTags = [
        t(maritalStatusTagKey(profile.maritalStatus)),
        profile.acceptLongDistance ? t('tags.longDistanceYes') : '',
        profile.hasChildren ? t('tags.childrenYes') : t('tags.childrenNo'),
    ].filter(Boolean)

    return {
        avatarUrl: profile.avatarUrl,
        displayName: profile.displayName,
        gender: profile.gender,
        meta: `${formatLocalizedAge(locale, profile.age)} / ${profile.occupation}`,
        badge: t(familyModeBadgeKey(familyMode)),
        summary: profile.maritalPlan,
        facts: [
            {label: t('fields.city'), value: profile.city},
            {label: t('fields.education'), value: profile.education},
            {label: t('fields.residencePlan'), value: profile.residencePlan},
        ],
        tags: [...profile.tags, ...additionalTags].slice(0, 3),
        footer: t(familyFooterKey(profile, familyMode)),
    }
}

/** 构建家庭资料目录筛选项 */
function buildFamilyDirectoryFilterItems(
    facets: FamilyProfileDirectoryFacets | null,
    filters: FamilyDirectoryFilters,
    locale: FormatLocale,
    t: Translate,
): ProfileDirectoryFilterItem[] {
    const cities = facets?.cities ?? []
    const intents = facets?.intents ?? []
    const occupations = facets?.occupations ?? []
    const industries = facets?.industries ?? []

    return [
        {
            key: 'gender',
            label: t('filters.gender'),
            options: [
                allOption(t),
                {label: t('filters.genderMale'), value: 'male'},
                {label: t('filters.genderFemale'), value: 'female'},
            ],
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
            key: 'familyMode',
            label: t('filters.familyMode'),
            options: [
                allOption(t),
                {label: t('filters.modeContextOnly'), value: 'context_only'},
                {label: t('filters.modeContactReady'), value: 'contact_ready'},
                {label: t('filters.modePriority'), value: 'priority'},
            ],
            value: filters.familyMode,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
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
            key: 'education',
            label: t('filters.education'),
            options: [
                allOption(t),
                {label: t('filters.eduBachelor'), value: 'bachelor'},
                {label: t('filters.eduMaster'), value: 'master'},
                {label: t('filters.eduPhD'), value: 'phd'},
            ],
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
            key: 'occupation',
            label: t('filters.occupation'),
            options: [allOption(t), ...occupations.map(item => ({label: item.label, value: item.value}))],
            value: filters.occupation,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.wide,
            group: 'secondary',
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
            key: 'maritalStatus',
            label: t('filters.maritalStatus'),
            options: [
                allOption(t),
                {label: t('filters.maritalSingle'), value: 'single'},
                {label: t('filters.maritalDivorced'), value: 'divorced'},
                {label: t('filters.maritalWidowed'), value: 'widowed'},
            ],
            value: filters.maritalStatus,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
        {
            key: 'hasChildren',
            label: t('filters.children'),
            options: [
                allOption(t),
                {label: t('filters.childrenYes'), value: 'yes'},
                {label: t('filters.childrenNo'), value: 'no'},
            ],
            value: filters.hasChildren,
            widthClass: PROFILE_FILTER_WIDTH_CLASS.regular,
            group: 'secondary',
        },
        {
            key: 'acceptLongDistance',
            label: t('filters.longDistance'),
            options: [
                allOption(t),
                {label: t('filters.longDistanceYes'), value: 'yes'},
                {label: t('filters.longDistanceNo'), value: 'no'},
            ],
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

/** 解析家庭参与模式 */
function resolveFamilyMode(profile: FamilyProfileCard) {
    if (profile.familyPriority) return 'PRIORITY'
    if (profile.allowFamilyContact) return 'CONTACT_READY'
    return 'CONTEXT_ONLY'
}

/** 家庭参与模式徽章文案 key */
function familyModeBadgeKey(mode: ReturnType<typeof resolveFamilyMode>) {
    switch (mode) {
        case 'PRIORITY':
            return 'modes.priority'
        case 'CONTACT_READY':
            return 'modes.contactReady'
        case 'CONTEXT_ONLY':
        default:
            return 'modes.contextOnly'
    }
}

/** 家庭资料底部标签文案 key */
function familyFooterKey(profile: FamilyProfileCard, mode: ReturnType<typeof resolveFamilyMode>) {
    if (profile.status === 'review') return 'card.labelReview'

    switch (mode) {
        case 'PRIORITY':
            return 'card.labelPriority'
        case 'CONTACT_READY':
            return 'card.labelContactReady'
        case 'CONTEXT_ONLY':
        default:
            return 'card.labelObserve'
    }
}

/** 婚姻状态标签文案 key */
function maritalStatusTagKey(value: FamilyProfileCard['maritalStatus']) {
    switch (value) {
        case 'divorced':
            return 'tags.maritalDivorced'
        case 'widowed':
            return 'tags.maritalWidowed'
        case 'single':
        default:
            return 'tags.maritalSingle'
    }
}
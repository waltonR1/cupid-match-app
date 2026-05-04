import { computed, ref, watch, type Ref } from 'vue'
import {
  getFamilyProfileDirectory,
  type FamilyProfileCard,
  type FamilyProfileDirectoryFacets,
  type FamilyProfileDirectoryQuery,
  type FamilyProfileDirectoryResponse,
  type FamilyProfileSortKey,
  type FormatLocale,
} from '@/api/profiles/profiles'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import type { ActiveDirectoryFilterChip, DirectoryOption, FamilyDirectoryFilters } from '@/types/profiles/directory'
import { formatLocalizedAge } from '@/utils/profile-format'

type Translate = (key: string) => string

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

const DEFAULT_SORT: FamilyProfileSortKey = 'priorityFirst'
const PAGE_SIZE = 6
const compactWidthClass = 'w-[86px] sm:w-[90px] lg:w-[94px] xl:w-[98px]'
const regularWidthClass = 'w-[98px] sm:w-[104px] lg:w-[110px] xl:w-[116px]'
const wideWidthClass = 'w-[114px] sm:w-[122px] lg:w-[130px] xl:w-[136px]'

export function useFamilyProfileDirectory(t: Translate, locale: Ref<FormatLocale>) {
  const latest = useLatestRequest()
  const filters = ref<FamilyDirectoryFilters>({ ...DEFAULT_FILTERS })
  const sortKey = ref<FamilyProfileSortKey>(DEFAULT_SORT)
  const page = ref(1)
  const response = ref<FamilyProfileDirectoryResponse | null>(null)

  watch([filters, sortKey, page, locale], () => {
    void load()
  }, { deep: true, immediate: true })

  const pageData = computed(() => {
    const filterItems = buildFamilyDirectoryFilterItems(response.value?.facets ?? null, filters.value, locale.value, t)
    const pagination = response.value?.pagination ?? {
      page: 1,
      pageSize: PAGE_SIZE,
      total: 0,
      totalPages: 1,
    }

    return {
      items: (response.value?.items ?? []).map(profile => ({
        id: profile.id,
        card: toFamilyProfileCard(profile, locale.value, t),
      })),
      filters: filterItems,
      activeFilters: buildActiveFilterChips(filterItems, filters.value),
      resultSummary: {
        prefix: t('directory.resultPrefix'),
        suffix: t('directory.resultSuffix'),
        pageText: t('directory.pagePrefix'),
        total: pagination.total,
        start: pagination.total ? (pagination.page - 1) * pagination.pageSize + 1 : 0,
        end: pagination.total ? Math.min(pagination.page * pagination.pageSize, pagination.total) : 0,
      },
      resultSort: {
        label: t('toolbar.sortLabel'),
        key: sortKey.value,
        options: [
          { label: t('sort.priorityFirst'), value: 'priorityFirst' },
          { label: t('sort.recentActive'), value: 'recentActive' },
          { label: t('sort.ageAsc'), value: 'ageAsc' },
          { label: t('sort.ageDesc'), value: 'ageDesc' },
        ],
      },
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: pagination.total,
      totalPages: pagination.totalPages,
    }
  })

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

  function buildQuery(): FamilyProfileDirectoryQuery {
    return {
      page: page.value,
      pageSize: PAGE_SIZE,
      sort: sortKey.value,
      ...filters.value,
    }
  }

  function updateFilters(nextFilters: Partial<FamilyDirectoryFilters>) {
    filters.value = {
      ...filters.value,
      ...nextFilters,
    }
    page.value = 1
  }

  function removeFilter(key: keyof FamilyDirectoryFilters) {
    updateFilters({ [key]: '' } as Partial<FamilyDirectoryFilters>)
  }

  function resetFilters() {
    filters.value = { ...DEFAULT_FILTERS }
    sortKey.value = DEFAULT_SORT
    page.value = 1
  }

  function updateSort(nextSortKey: string) {
    if (!['priorityFirst', 'recentActive', 'ageAsc', 'ageDesc'].includes(nextSortKey)) return
    sortKey.value = nextSortKey as FamilyProfileSortKey
    page.value = 1
  }

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

type ProfileDirectoryFilterItem = {
  key: keyof FamilyDirectoryFilters
  label: string
  options: DirectoryOption[]
  value: string
  widthClass: string
  group: 'primary' | 'secondary'
}

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
      { label: t('fields.city'), value: profile.city },
      { label: t('fields.education'), value: profile.education },
      { label: t('fields.residencePlan'), value: profile.residencePlan },
    ],
    tags: [...profile.tags, ...additionalTags].slice(0, 3),
    footer: t(familyFooterKey(profile, familyMode)),
  }
}

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
      options: [allOption(t), { label: t('filters.genderMale'), value: 'male' }, { label: t('filters.genderFemale'), value: 'female' }],
      value: filters.gender,
      widthClass: compactWidthClass,
      group: 'primary',
    },
    {
      key: 'ageRange',
      label: t('filters.age'),
      options: [
        allOption(t),
        { label: t('filters.ageUnder25'), value: 'under25' },
        { label: t('filters.age25to29'), value: '25to29' },
        { label: t('filters.age30to34'), value: '30to34' },
        { label: t('filters.age35to39'), value: '35to39' },
        { label: t('filters.age40plus'), value: '40plus' },
      ],
      value: filters.ageRange,
      widthClass: compactWidthClass,
      group: 'primary',
    },
    {
      key: 'familyMode',
      label: t('filters.familyMode'),
      options: [
        allOption(t),
        { label: t('filters.modeContextOnly'), value: 'context_only' },
        { label: t('filters.modeContactReady'), value: 'contact_ready' },
        { label: t('filters.modePriority'), value: 'priority' },
      ],
      value: filters.familyMode,
      widthClass: wideWidthClass,
      group: 'primary',
    },
    {
      key: 'city',
      label: t('filters.city'),
      options: [allOption(t), ...cities.map(item => ({ label: item.label, value: item.value }))],
      value: filters.city,
      widthClass: regularWidthClass,
      group: 'primary',
    },
    {
      key: 'education',
      label: t('filters.education'),
      options: [allOption(t), { label: t('filters.eduBachelor'), value: 'bachelor' }, { label: t('filters.eduMaster'), value: 'master' }, { label: t('filters.eduPhD'), value: 'phd' }],
      value: filters.education,
      widthClass: regularWidthClass,
      group: 'primary',
    },
    {
      key: 'intentCode',
      label: t('filters.intent'),
      options: [allOption(t), ...intents.map(item => ({ label: item.label, value: item.code }))],
      value: filters.intentCode,
      widthClass: wideWidthClass,
      group: 'primary',
    },
    {
      key: 'occupation',
      label: t('filters.occupation'),
      options: [allOption(t), ...occupations.map(item => ({ label: item.label, value: item.value }))],
      value: filters.occupation,
      widthClass: wideWidthClass,
      group: 'secondary',
    },
    {
      key: 'industry',
      label: t('filters.industry'),
      options: [allOption(t), ...industries.map(item => ({ label: item.label, value: item.value }))],
      value: filters.industry,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'maritalStatus',
      label: t('filters.maritalStatus'),
      options: [allOption(t), { label: t('filters.maritalSingle'), value: 'single' }, { label: t('filters.maritalDivorced'), value: 'divorced' }, { label: t('filters.maritalWidowed'), value: 'widowed' }],
      value: filters.maritalStatus,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'hasChildren',
      label: t('filters.children'),
      options: [allOption(t), { label: t('filters.childrenYes'), value: 'yes' }, { label: t('filters.childrenNo'), value: 'no' }],
      value: filters.hasChildren,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
    {
      key: 'acceptLongDistance',
      label: t('filters.longDistance'),
      options: [allOption(t), { label: t('filters.longDistanceYes'), value: 'yes' }, { label: t('filters.longDistanceNo'), value: 'no' }],
      value: filters.acceptLongDistance,
      widthClass: regularWidthClass,
      group: 'secondary',
    },
  ]
}

function buildActiveFilterChips(items: ProfileDirectoryFilterItem[], filters: FamilyDirectoryFilters): ActiveDirectoryFilterChip<keyof FamilyDirectoryFilters>[] {
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
    .filter((item): item is ActiveDirectoryFilterChip<keyof FamilyDirectoryFilters> => Boolean(item))
}

function allOption(t: Translate): DirectoryOption {
  return { label: t('filters.all'), value: '' }
}

function resolveFamilyMode(profile: FamilyProfileCard) {
  if (profile.familyPriority) return 'PRIORITY'
  if (profile.allowFamilyContact) return 'CONTACT_READY'
  return 'CONTEXT_ONLY'
}

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

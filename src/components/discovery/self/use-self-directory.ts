import { computed, ref } from 'vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import {
  getLocalizedIntentOptions,
  getLocalizedLanguageOptions,
  getLocalizedProfileOptions,
  localized,
  mockProfiles,
} from '@/mock/business'
import type { MockProfile } from '@/mock/business'
import type {
  ActiveDirectoryFilterChip,
  DirectoryOption,
  SelfDirectoryFilters,
  SelfSortKey,
  UseSelfDirectoryResult,
} from './self.types'

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

function toTimestamp(dateText?: string) {
  if (!dateText) return 0
  const value = new Date(dateText).getTime()
  return Number.isNaN(value) ? 0 : value
}

function buildBaseAllOption(label: string): DirectoryOption {
  return {
    label,
    value: '',
  }
}

function resolveOptionLabel(options: DirectoryOption[], value: string) {
  return options.find(item => item.value === value)?.label || value
}

function buildActiveChip(
  key: keyof SelfDirectoryFilters,
  label: string,
  options: DirectoryOption[],
  value: string,
): ActiveDirectoryFilterChip | undefined {
  if (!value) return undefined

  return {
    key,
    label,
    value: resolveOptionLabel(options, value),
  }
}

function matchAgeRange(age: number, range: string) {
  if (!range) return true

  switch (range) {
    case 'under25':
      return age < 25
    case '25to29':
      return age >= 25 && age <= 29
    case '30to34':
      return age >= 30 && age <= 34
    case '35to39':
      return age >= 35 && age <= 39
    case '40plus':
      return age >= 40
    default:
      return true
  }
}

function matchGender(gender: MockProfile['gender'], value: string) {
  if (!value) return true
  return gender === value
}

function matchHeightRange(height: number, range: string) {
  if (!range) return true

  switch (range) {
    case 'under165':
      return height < 165
    case '165to169':
      return height >= 165 && height <= 169
    case '170to174':
      return height >= 170 && height <= 174
    case '175to179':
      return height >= 175 && height <= 179
    case '180plus':
      return height >= 180
    default:
      return true
  }
}

function matchEducation(profile: MockProfile, education: string) {
  if (!education) return true

  switch (education) {
    case 'bachelor':
      return profile.degreeLevel === 'bachelor'
    case 'master':
      return profile.degreeLevel === 'master'
    case 'phd':
      return profile.degreeLevel === 'phd'
    default:
      return true
  }
}

function matchVerified(isVerified: boolean, value: string) {
  if (!value) return true

  switch (value) {
    case 'verified':
      return isVerified
    case 'unverified':
      return !isVerified
    default:
      return true
  }
}

function matchHasChildren(hasChildren: boolean, value: string) {
  if (!value) return true

  switch (value) {
    case 'yes':
      return hasChildren
    case 'no':
      return !hasChildren
    default:
      return true
  }
}

function matchAcceptLongDistance(acceptLongDistance: boolean, value: string) {
  if (!value) return true

  switch (value) {
    case 'yes':
      return acceptLongDistance
    case 'no':
      return !acceptLongDistance
    default:
      return true
  }
}

function getPriorityRank(profile: MockProfile) {
  return profile.status === 'vip' ? 0 : 1
}

export function useSelfDirectory(): UseSelfDirectoryResult<MockProfile> {
  const { locale, t } = usePageI18n('self')

  const filters = ref<SelfDirectoryFilters>({ ...DEFAULT_FILTERS })
  const sortKey = ref<SelfSortKey>('recentActive')
  const page = ref(1)
  const pageSize = ref(6)

  const text = computed(() => ({
    gender: t('filters.gender'),
    genderMale: t('filters.genderMale'),
    genderFemale: t('filters.genderFemale'),
    all: localized('全部', 'Tous', 'All')[locale.value],
    age: localized('年龄', 'Age', 'Age')[locale.value],
    city: localized('城市', 'Ville', 'City')[locale.value],
    height: localized('身高', 'Taille', 'Height')[locale.value],
    education: localized('学历', 'Formation', 'Education')[locale.value],
    intent: localized('关系意向', 'Intention', 'Intent')[locale.value],
    industry: localized('行业', 'Secteur', 'Industry')[locale.value],
    occupation: localized('职业', 'Metier', 'Occupation')[locale.value],
    languages: localized('语言', 'Langues', 'Languages')[locale.value],
    verified: localized('认证状态', 'Verification', 'Verification')[locale.value],
    maritalStatus: localized('婚姻状态', 'Statut marital', 'Marital status')[locale.value],
    children: localized('子女情况', 'Enfants', 'Children')[locale.value],
    longDistance: localized('异地接受度', 'Distance', 'Long-distance')[locale.value],
    ageUnder25: localized('25岁以下', 'Moins de 25 ans', 'Under 25')[locale.value],
    age25to29: localized('25-29岁', '25-29 ans', '25-29')[locale.value],
    age30to34: localized('30-34岁', '30-34 ans', '30-34')[locale.value],
    age35to39: localized('35-39岁', '35-39 ans', '35-39')[locale.value],
    age40plus: localized('40岁以上', '40 ans et plus', '40+')[locale.value],
    degreeBachelor: localized('本科', 'Licence', 'Bachelor')[locale.value],
    degreeMaster: localized('硕士', 'Master', 'Master')[locale.value],
    degreePhd: localized('博士', 'Doctorat', 'PhD')[locale.value],
    verifiedYes: localized('已认证', 'Verifie', 'Verified')[locale.value],
    verifiedNo: localized('未认证', 'Non verifie', 'Unverified')[locale.value],
    childrenYes: localized('有孩子', 'Avec enfants', 'Has children')[locale.value],
    childrenNo: localized('无孩子', 'Sans enfant', 'No children')[locale.value],
    longDistanceYes: localized('接受异地', 'Ouvert a distance', 'Open to long-distance')[locale.value],
    longDistanceNo: localized('不接受异地', 'Pas de distance', 'No long-distance')[locale.value],
    maritalSingle: localized('未婚', 'Celibataire', 'Single')[locale.value],
    maritalDivorced: localized('离异', 'Divorce', 'Divorced')[locale.value],
    maritalWidowed: localized('丧偶', 'Veuf / veuve', 'Widowed')[locale.value],
    sortRecent: localized('最近活跃', 'Activite recente', 'Recently active')[locale.value],
    sortPriority: localized('优先资料', 'Profils prioritaires', 'Priority profiles')[locale.value],
    sortAgeAsc: localized('年龄从低到高', 'Age croissant', 'Age: low to high')[locale.value],
    sortAgeDesc: localized('年龄从高到低', 'Age decroissant', 'Age: high to low')[locale.value],
  }))

  const ageOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: text.value.ageUnder25, value: 'under25' },
    { label: text.value.age25to29, value: '25to29' },
    { label: text.value.age30to34, value: '30to34' },
    { label: text.value.age35to39, value: '35to39' },
    { label: text.value.age40plus, value: '40plus' },
  ])

  const genderOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: text.value.genderMale, value: 'male' },
    { label: text.value.genderFemale, value: 'female' },
  ])

  const heightOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: '165cm-', value: 'under165' },
    { label: '165-169cm', value: '165to169' },
    { label: '170-174cm', value: '170to174' },
    { label: '175-179cm', value: '175to179' },
    { label: '180cm+', value: '180plus' },
  ])

  const educationOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: text.value.degreeBachelor, value: 'bachelor' },
    { label: text.value.degreeMaster, value: 'master' },
    { label: text.value.degreePhd, value: 'phd' },
  ])

  const cityOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    ...getLocalizedProfileOptions(locale.value, profile => profile.city).map(value => ({
      label: value,
      value,
    })),
  ])

  const intentOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    ...getLocalizedIntentOptions(locale.value).map(item => ({
      label: item.label,
      value: item.code,
    })),
  ])

  const industryOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    ...getLocalizedProfileOptions(locale.value, profile => profile.industry).map(value => ({
      label: value,
      value,
    })),
  ])

  const occupationOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    ...getLocalizedProfileOptions(locale.value, profile => profile.occupation).map(value => ({
      label: value,
      value,
    })),
  ])

  const languageOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    ...getLocalizedLanguageOptions(locale.value),
  ])

  const verifiedOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: text.value.verifiedYes, value: 'verified' },
    { label: text.value.verifiedNo, value: 'unverified' },
  ])

  const maritalStatusOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: text.value.maritalSingle, value: 'single' },
    { label: text.value.maritalDivorced, value: 'divorced' },
    { label: text.value.maritalWidowed, value: 'widowed' },
  ])

  const childrenOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: text.value.childrenYes, value: 'yes' },
    { label: text.value.childrenNo, value: 'no' },
  ])

  const longDistanceOptions = computed<DirectoryOption[]>(() => [
    buildBaseAllOption(text.value.all),
    { label: text.value.longDistanceYes, value: 'yes' },
    { label: text.value.longDistanceNo, value: 'no' },
  ])

  const sortOptions = computed<DirectoryOption[]>(() => [
    { label: text.value.sortRecent, value: 'recentActive' },
    { label: text.value.sortPriority, value: 'priorityFirst' },
    { label: text.value.sortAgeAsc, value: 'ageAsc' },
    { label: text.value.sortAgeDesc, value: 'ageDesc' },
  ])

  const filteredItems = computed<MockProfile[]>(() => {
    return mockProfiles.filter(profile => {
      const localizedCity = profile.city[locale.value]
      const localizedIndustry = profile.industry[locale.value]
      const localizedOccupation = profile.occupation[locale.value]

      const passedGender = matchGender(profile.gender, filters.value.gender)
      const passedAge = matchAgeRange(profile.age, filters.value.ageRange)
      const passedCity = !filters.value.city || localizedCity === filters.value.city
      const passedHeight = matchHeightRange(profile.height, filters.value.heightRange)
      const passedEducation = matchEducation(profile, filters.value.education)
      const passedIntent = !filters.value.intentCode || profile.intentCode === filters.value.intentCode
      const passedIndustry = !filters.value.industry || localizedIndustry === filters.value.industry
      const passedOccupation = !filters.value.occupation || localizedOccupation === filters.value.occupation
      const passedLanguage = !filters.value.language || profile.languages.includes(filters.value.language)
      const passedVerified = matchVerified(profile.isVerified, filters.value.verified)
      const passedMaritalStatus =
        !filters.value.maritalStatus || profile.maritalStatus === filters.value.maritalStatus
      const passedHasChildren = matchHasChildren(profile.hasChildren, filters.value.hasChildren)
      const passedLongDistance = matchAcceptLongDistance(
        profile.acceptLongDistance,
        filters.value.acceptLongDistance,
      )

      return [
        passedGender,
        passedAge,
        passedCity,
        passedHeight,
        passedEducation,
        passedIntent,
        passedIndustry,
        passedOccupation,
        passedLanguage,
        passedVerified,
        passedMaritalStatus,
        passedHasChildren,
        passedLongDistance,
      ].every(Boolean)
    })
  })

  const sortedItems = computed<MockProfile[]>(() => {
    const list = [...filteredItems.value]

    switch (sortKey.value) {
      case 'recentActive':
        return list.sort((a, b) => toTimestamp(b.lastActiveAt) - toTimestamp(a.lastActiveAt))

      case 'priorityFirst':
        return list.sort((a, b) => {
          const rankDiff = getPriorityRank(a) - getPriorityRank(b)
          if (rankDiff !== 0) return rankDiff
          return toTimestamp(b.lastActiveAt) - toTimestamp(a.lastActiveAt)
        })

      case 'ageAsc':
        return list.sort((a, b) => a.age - b.age)

      case 'ageDesc':
        return list.sort((a, b) => b.age - a.age)

      default:
        return list
    }
  })

  const total = computed(() => sortedItems.value.length)

  const totalPages = computed(() => {
    if (!total.value) return 1
    return Math.ceil(total.value / pageSize.value)
  })

  const pagedItems = computed<MockProfile[]>(() => {
    const start = (page.value - 1) * pageSize.value
    const end = start + pageSize.value
    return sortedItems.value.slice(start, end)
  })

  const pageStart = computed(() => {
    if (!total.value) return 0
    return (page.value - 1) * pageSize.value + 1
  })

  const pageEnd = computed(() => {
    if (!total.value) return 0
    return Math.min(page.value * pageSize.value, total.value)
  })

  const activeFilterChips = computed<ActiveDirectoryFilterChip[]>(() => {
    const chips = [
      buildActiveChip('gender', text.value.gender, genderOptions.value, filters.value.gender),
      buildActiveChip('ageRange', text.value.age, ageOptions.value, filters.value.ageRange),
      buildActiveChip('city', text.value.city, cityOptions.value, filters.value.city),
      buildActiveChip('heightRange', text.value.height, heightOptions.value, filters.value.heightRange),
      buildActiveChip('education', text.value.education, educationOptions.value, filters.value.education),
      buildActiveChip('intentCode', text.value.intent, intentOptions.value, filters.value.intentCode),
      buildActiveChip('industry', text.value.industry, industryOptions.value, filters.value.industry),
      buildActiveChip('occupation', text.value.occupation, occupationOptions.value, filters.value.occupation),
      buildActiveChip('language', text.value.languages, languageOptions.value, filters.value.language),
      buildActiveChip('verified', text.value.verified, verifiedOptions.value, filters.value.verified),
      buildActiveChip(
        'maritalStatus',
        text.value.maritalStatus,
        maritalStatusOptions.value,
        filters.value.maritalStatus,
      ),
      buildActiveChip('hasChildren', text.value.children, childrenOptions.value, filters.value.hasChildren),
      buildActiveChip(
        'acceptLongDistance',
        text.value.longDistance,
        longDistanceOptions.value,
        filters.value.acceptLongDistance,
      ),
    ]

    return chips.filter((item): item is ActiveDirectoryFilterChip => Boolean(item))
  })

  function updateFilters(nextFilters: Partial<SelfDirectoryFilters>) {
    filters.value = {
      ...filters.value,
      ...nextFilters,
    }
    page.value = 1
  }

  function removeFilter(key: keyof SelfDirectoryFilters) {
    updateFilters({ [key]: '' })
  }

  function resetFilters() {
    filters.value = { ...DEFAULT_FILTERS }
    sortKey.value = 'recentActive'
    page.value = 1
  }

  function updateSort(nextSortKey: string) {
    const allowed: SelfSortKey[] = [
      'recentActive',
      'priorityFirst',
      'ageAsc',
      'ageDesc',
    ]

    if (!allowed.includes(nextSortKey as SelfSortKey)) return

    sortKey.value = nextSortKey as SelfSortKey
    page.value = 1
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages.value) return
    page.value = nextPage
  }

  return {
    filters,
    sortKey,
    page,
    pageSize,
    total,
    totalPages,
    filteredItems,
    sortedItems,
    pagedItems,
    pageStart,
    pageEnd,
    activeFilterChips,
    ageOptions,
    genderOptions,
    cityOptions,
    heightOptions,
    educationOptions,
    intentOptions,
    industryOptions,
    occupationOptions,
    languageOptions,
    verifiedOptions,
    maritalStatusOptions,
    childrenOptions,
    longDistanceOptions,
    sortOptions,
    updateFilters,
    removeFilter,
    resetFilters,
    updateSort,
    changePage,
  }
}

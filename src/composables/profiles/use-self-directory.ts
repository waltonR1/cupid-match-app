import { computed, onMounted, ref } from 'vue'
import { listProfiles, type Profile } from '@/api/modules/profiles'
import type { SelfDirectoryFilters, SelfSortKey, UseSelfDirectoryResult } from '@/types/self-directory'

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

function matchGender(gender: Profile['gender'], value: string) {
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

function matchEducation(profile: Profile, education: string) {
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

function getPriorityRank(profile: Profile) {
  return profile.status === 'vip' ? 0 : 1
}

export function useSelfDirectory(): UseSelfDirectoryResult<Profile> {
  const filters = ref<SelfDirectoryFilters>({ ...DEFAULT_FILTERS })
  const sortKey = ref<SelfSortKey>('recentActive')
  const page = ref(1)
  const pageSize = ref(6)
  const sourceItems = ref<Profile[]>([])

  onMounted(() => {
    void loadProfiles()
  })

  const filteredItems = computed<Profile[]>(() => {
    return sourceItems.value.filter(profile => {
      const passedGender = matchGender(profile.gender, filters.value.gender)
      const passedAge = matchAgeRange(profile.age, filters.value.ageRange)
      const passedCity = !filters.value.city || profile.city.en === filters.value.city
      const passedHeight = matchHeightRange(profile.height, filters.value.heightRange)
      const passedEducation = matchEducation(profile, filters.value.education)
      const passedIntent = !filters.value.intentCode || profile.intentCode === filters.value.intentCode
      const passedIndustry = !filters.value.industry || profile.industry.en === filters.value.industry
      const passedOccupation = !filters.value.occupation || profile.occupation.en === filters.value.occupation
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

  const sortedItems = computed<Profile[]>(() => {
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
  const pagedItems = computed<Profile[]>(() => {
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
    const allowed: SelfSortKey[] = ['recentActive', 'priorityFirst', 'ageAsc', 'ageDesc']

    if (!allowed.includes(nextSortKey as SelfSortKey)) return

    sortKey.value = nextSortKey as SelfSortKey
    page.value = 1
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages.value) return
    page.value = nextPage
  }

  async function loadProfiles() {
    try {
      const response = await listProfiles({ mode: 'self' })
      sourceItems.value = response.data
    } catch (error) {
      console.warn('Failed to load self profiles.', error)
    }
  }

  return {
    filters,
    sortKey,
    page,
    pageSize,
    sourceItems,
    total,
    totalPages,
    filteredItems,
    sortedItems,
    pagedItems,
    pageStart,
    pageEnd,
    updateFilters,
    removeFilter,
    resetFilters,
    updateSort,
    changePage,
  }
}

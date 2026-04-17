import { computed, onMounted, ref } from 'vue'
import { listProfiles, type Profile } from '@/api/modules/profiles'
import type { FamilyDirectoryFilters, FamilySortKey, UseFamilyDirectoryResult } from '@/types/family-directory'

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

function matchFamilyMode(profile: Profile, value: string) {
  if (!value) return true

  switch (value) {
    case 'context_only':
      return profile.familyVisible && !profile.allowFamilyContact && !profile.familyPriority
    case 'contact_ready':
      return profile.allowFamilyContact
    case 'priority':
      return profile.familyPriority
    default:
      return true
  }
}

function getFamilyPriorityRank(profile: Profile) {
  if (profile.familyPriority) return 0
  if (profile.allowFamilyContact) return 1
  return 2
}

export function useFamilyDirectory(): UseFamilyDirectoryResult<Profile> {
  const filters = ref<FamilyDirectoryFilters>({ ...DEFAULT_FILTERS })
  const sortKey = ref<FamilySortKey>('priorityFirst')
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
      const passedEducation = matchEducation(profile, filters.value.education)
      const passedIntent = !filters.value.intentCode || profile.intentCode === filters.value.intentCode
      const passedFamilyMode = matchFamilyMode(profile, filters.value.familyMode)
      const passedOccupation = !filters.value.occupation || profile.occupation.en === filters.value.occupation
      const passedIndustry = !filters.value.industry || profile.industry.en === filters.value.industry
      const passedMaritalStatus =
        !filters.value.maritalStatus || profile.maritalStatus === filters.value.maritalStatus
      const passedChildren = matchHasChildren(profile.hasChildren, filters.value.hasChildren)
      const passedLongDistance = matchAcceptLongDistance(
        profile.acceptLongDistance,
        filters.value.acceptLongDistance,
      )

      return [
        passedGender,
        passedAge,
        passedCity,
        passedEducation,
        passedIntent,
        passedFamilyMode,
        passedOccupation,
        passedIndustry,
        passedMaritalStatus,
        passedChildren,
        passedLongDistance,
      ].every(Boolean)
    })
  })

  const sortedItems = computed<Profile[]>(() => {
    const list = [...filteredItems.value]

    switch (sortKey.value) {
      case 'priorityFirst':
        return list.sort((a, b) => {
          const rankDiff = getFamilyPriorityRank(a) - getFamilyPriorityRank(b)
          if (rankDiff !== 0) return rankDiff
          return toTimestamp(b.lastActiveAt) - toTimestamp(a.lastActiveAt)
        })
      case 'recentActive':
        return list.sort((a, b) => toTimestamp(b.lastActiveAt) - toTimestamp(a.lastActiveAt))
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

  function updateFilters(nextFilters: Partial<FamilyDirectoryFilters>) {
    filters.value = {
      ...filters.value,
      ...nextFilters,
    }
    page.value = 1
  }

  function removeFilter(key: keyof FamilyDirectoryFilters) {
    updateFilters({ [key]: '' })
  }

  function resetFilters() {
    filters.value = { ...DEFAULT_FILTERS }
    sortKey.value = 'priorityFirst'
    page.value = 1
  }

  function updateSort(nextSortKey: string) {
    const allowed: FamilySortKey[] = ['priorityFirst', 'recentActive', 'ageAsc', 'ageDesc']

    if (!allowed.includes(nextSortKey as FamilySortKey)) return

    sortKey.value = nextSortKey as FamilySortKey
    page.value = 1
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages.value) return
    page.value = nextPage
  }

  async function loadProfiles() {
    try {
      const response = await listProfiles({ mode: 'family' })
      sourceItems.value = response.data
    } catch (error) {
      console.warn('Failed to load family profiles.', error)
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

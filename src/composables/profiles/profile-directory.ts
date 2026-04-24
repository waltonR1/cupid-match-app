import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { listProfiles, type Profile, type ProfileDirectoryMode } from '@/api/modules/profiles'

interface UseProfileDirectoryStateOptions<TFilters extends object, TSortKey extends string> {
  mode: ProfileDirectoryMode
  defaultFilters: TFilters
  defaultSortKey: TSortKey
  allowedSortKeys: readonly TSortKey[]
  filterProfile: (profile: Profile, filters: TFilters) => boolean
  sortProfiles: (profiles: Profile[], sortKey: TSortKey) => Profile[]
  loadErrorMessage: string
}

export interface ProfileDirectoryState<TFilters extends object, TSortKey extends string> {
  filters: Ref<TFilters>
  sortKey: Ref<TSortKey>
  page: Ref<number>
  pageSize: Ref<number>
  sourceItems: Ref<Profile[]>

  total: ComputedRef<number>
  totalPages: ComputedRef<number>
  filteredItems: ComputedRef<Profile[]>
  sortedItems: ComputedRef<Profile[]>
  pagedItems: ComputedRef<Profile[]>
  pageStart: ComputedRef<number>
  pageEnd: ComputedRef<number>

  updateFilters: (nextFilters: Partial<TFilters>) => void
  removeFilter: (key: keyof TFilters) => void
  resetFilters: () => void
  updateSort: (nextSortKey: string) => void
  changePage: (nextPage: number) => void
}

export function useProfileDirectoryState<TFilters extends object, TSortKey extends string>(
  options: UseProfileDirectoryStateOptions<TFilters, TSortKey>,
): ProfileDirectoryState<TFilters, TSortKey> {
  const filters = ref({ ...options.defaultFilters }) as Ref<TFilters>
  const sortKey = ref(options.defaultSortKey) as Ref<TSortKey>
  const page = ref(1)
  const pageSize = ref(6)
  const sourceItems = ref<Profile[]>([])

  onMounted(() => {
    loadProfiles()
  })

  const filteredItems = computed<Profile[]>(() => {
    return sourceItems.value.filter(profile => options.filterProfile(profile, filters.value))
  })

  const sortedItems = computed<Profile[]>(() => {
    return options.sortProfiles([...filteredItems.value], sortKey.value)
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

  function updateFilters(nextFilters: Partial<TFilters>) {
    filters.value = {
      ...filters.value,
      ...nextFilters,
    }
    page.value = 1
  }

  function removeFilter(key: keyof TFilters) {
    updateFilters({ [key]: '' } as Partial<TFilters>)
  }

  function resetFilters() {
    filters.value = { ...options.defaultFilters }
    sortKey.value = options.defaultSortKey
    page.value = 1
  }

  function updateSort(nextSortKey: string) {
    if (!options.allowedSortKeys.includes(nextSortKey as TSortKey)) return

    sortKey.value = nextSortKey as TSortKey
    page.value = 1
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages.value) return
    page.value = nextPage
  }

  function loadProfiles() {
    try {
      sourceItems.value = listProfiles({ mode: options.mode })
    } catch (error) {
      console.warn(options.loadErrorMessage, error)
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

export function toTimestamp(dateText?: string) {
  if (!dateText) return 0
  const value = new Date(dateText).getTime()
  return Number.isNaN(value) ? 0 : value
}

export function compareRecentActive(a: Profile, b: Profile) {
  return toTimestamp(b.lastActiveAt) - toTimestamp(a.lastActiveAt)
}

export function compareAgeAsc(a: Profile, b: Profile) {
  return a.age - b.age
}

export function compareAgeDesc(a: Profile, b: Profile) {
  return b.age - a.age
}

export function matchAgeRange(age: number, range: string) {
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

export function matchGender(gender: Profile['gender'], value: string) {
  if (!value) return true
  return gender === value
}

export function matchHeightRange(height: number, range: string) {
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

export function matchEducation(profile: Profile, education: string) {
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

export function matchVerified(isVerified: boolean, value: string) {
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

export function matchHasChildren(hasChildren: boolean, value: string) {
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

export function matchAcceptLongDistance(acceptLongDistance: boolean, value: string) {
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

export function matchFamilyMode(profile: Profile, value: string) {
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

export function getSelfPriorityRank(profile: Profile) {
  return profile.status === 'vip' ? 0 : 1
}

export function getFamilyPriorityRank(profile: Profile) {
  if (profile.familyPriority) return 0
  if (profile.allowFamilyContact) return 1
  return 2
}

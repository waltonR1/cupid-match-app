import { computed } from 'vue'
import type { Profile } from '@/api/modules/profiles'
import type { SelfDirectoryFilters, SelfSortKey, UseSelfDirectoryResult } from '@/types/self-directory'
import {
  compareAgeAsc,
  compareAgeDesc,
  compareRecentActive,
  getSelfPriorityRank,
  matchAcceptLongDistance,
  matchAgeRange,
  matchEducation,
  matchGender,
  matchHasChildren,
  matchHeightRange,
  matchVerified,
  useProfileDirectoryState,
} from './profile-directory'

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

const SELF_SORT_KEYS: SelfSortKey[] = ['recentActive', 'priorityFirst', 'ageAsc', 'ageDesc']

function filterSelfProfile(profile: Profile, filters: SelfDirectoryFilters) {
  return [
    matchGender(profile.gender, filters.gender),
    matchAgeRange(profile.age, filters.ageRange),
    !filters.city || profile.city.en === filters.city,
    matchHeightRange(profile.height, filters.heightRange),
    matchEducation(profile, filters.education),
    !filters.intentCode || profile.intentCode === filters.intentCode,
    !filters.industry || profile.industry.en === filters.industry,
    !filters.occupation || profile.occupation.en === filters.occupation,
    !filters.language || profile.languages.includes(filters.language),
    matchVerified(profile.isVerified, filters.verified),
    !filters.maritalStatus || profile.maritalStatus === filters.maritalStatus,
    matchHasChildren(profile.hasChildren, filters.hasChildren),
    matchAcceptLongDistance(profile.acceptLongDistance, filters.acceptLongDistance),
  ].every(Boolean)
}

function sortSelfProfiles(list: Profile[], sortKey: SelfSortKey) {
  switch (sortKey) {
    case 'recentActive':
      return list.sort(compareRecentActive)
    case 'priorityFirst':
      return list.sort((a, b) => {
        const rankDiff = getSelfPriorityRank(a) - getSelfPriorityRank(b)
        if (rankDiff !== 0) return rankDiff
        return compareRecentActive(a, b)
      })
    case 'ageAsc':
      return list.sort(compareAgeAsc)
    case 'ageDesc':
      return list.sort(compareAgeDesc)
    default:
      return list
  }
}

export function useSelfDirectory(): UseSelfDirectoryResult<Profile> {
  const directory = useProfileDirectoryState<SelfDirectoryFilters, SelfSortKey>({
    mode: 'self',
    defaultFilters: DEFAULT_FILTERS,
    defaultSortKey: 'recentActive',
    allowedSortKeys: SELF_SORT_KEYS,
    filterProfile: filterSelfProfile,
    sortProfiles: sortSelfProfiles,
    loadErrorMessage: 'Failed to load self profiles.',
  })

  const featuredProfiles = computed(() => directory.sortedItems.value.slice(0, 3))

  return {
    ...directory,
    featuredProfiles,
  }
}

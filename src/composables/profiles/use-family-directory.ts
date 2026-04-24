import type { Profile } from '@/api/modules/profiles'
import type { FamilyDirectoryFilters, FamilySortKey, UseFamilyDirectoryResult } from '@/types/profiles/directory'
import {
  compareAgeAsc,
  compareAgeDesc,
  compareRecentActive,
  getFamilyPriorityRank,
  matchAcceptLongDistance,
  matchAgeRange,
  matchEducation,
  matchFamilyMode,
  matchGender,
  matchHasChildren,
  useProfileDirectoryState,
} from './profile-directory'

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

const FAMILY_SORT_KEYS: FamilySortKey[] = ['priorityFirst', 'recentActive', 'ageAsc', 'ageDesc']

function filterFamilyProfile(profile: Profile, filters: FamilyDirectoryFilters) {
  return [
    matchGender(profile.gender, filters.gender),
    matchAgeRange(profile.age, filters.ageRange),
    !filters.city || profile.city.en === filters.city,
    matchEducation(profile, filters.education),
    !filters.intentCode || profile.intentCode === filters.intentCode,
    matchFamilyMode(profile, filters.familyMode),
    !filters.occupation || profile.occupation.en === filters.occupation,
    !filters.industry || profile.industry.en === filters.industry,
    !filters.maritalStatus || profile.maritalStatus === filters.maritalStatus,
    matchHasChildren(profile.hasChildren, filters.hasChildren),
    matchAcceptLongDistance(profile.acceptLongDistance, filters.acceptLongDistance),
  ].every(Boolean)
}

function sortFamilyProfiles(list: Profile[], sortKey: FamilySortKey) {
  switch (sortKey) {
    case 'priorityFirst':
      return list.sort((a, b) => {
        const rankDiff = getFamilyPriorityRank(a) - getFamilyPriorityRank(b)
        if (rankDiff !== 0) return rankDiff
        return compareRecentActive(a, b)
      })
    case 'recentActive':
      return list.sort(compareRecentActive)
    case 'ageAsc':
      return list.sort(compareAgeAsc)
    case 'ageDesc':
      return list.sort(compareAgeDesc)
    default:
      return list
  }
}

export function useFamilyDirectory(): UseFamilyDirectoryResult<Profile> {
  return useProfileDirectoryState<FamilyDirectoryFilters, FamilySortKey>({
    mode: 'family',
    defaultFilters: DEFAULT_FILTERS,
    defaultSortKey: 'priorityFirst',
    allowedSortKeys: FAMILY_SORT_KEYS,
    filterProfile: filterFamilyProfile,
    sortProfiles: sortFamilyProfiles,
    loadErrorMessage: 'Failed to load family profiles.',
  })
}

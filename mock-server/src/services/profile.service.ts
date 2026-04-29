import type { QueryRecord } from '../types/common.js'
import type { DirectoryFacets, DirectorySort, NormalizedProfileQuery, ProfileRecord, ProfileWithDisplayName } from '../types/profile.js'
import { buildPagination, paginate } from '../utils/pagination.js'
import { withDisplayName } from '../utils/localized.js'
import { clamp, getString, toInt } from '../utils/string.js'

export function normalizeProfileQuery(query: QueryRecord): NormalizedProfileQuery {
  return {
    page: toInt(query.page, 1),
    pageSize: toInt(query.pageSize, 6),
    sort: normalizeSort(getString(query.sort)),
    gender: getString(query.gender),
    ageRange: getString(query.ageRange),
    city: getString(query.city),
    heightRange: getString(query.heightRange),
    education: getString(query.education),
    intentCode: getString(query.intentCode),
    industry: getString(query.industry),
    occupation: getString(query.occupation),
    language: getString(query.language),
    verified: getString(query.verified),
    maritalStatus: getString(query.maritalStatus),
    hasChildren: getString(query.hasChildren),
    acceptLongDistance: getString(query.acceptLongDistance),
    familyMode: getString(query.familyMode),
  }
}

export function buildSelfDirectoryFacets(items: ProfileWithDisplayName[]): DirectoryFacets {
  return {
    cities: uniqueLocalized(items.map((item) => item.city)),
    intents: uniqueIntents(items),
    industries: uniqueLocalized(items.map((item) => item.industry)),
    occupations: uniqueLocalized(items.map((item) => item.occupation)),
    languages: Array.from(new Set(items.flatMap((item) => item.languages))).sort((left, right) => left.localeCompare(right)),
  }
}

export function buildFamilyDirectoryFacets(items: ProfileWithDisplayName[]): DirectoryFacets {
  return {
    cities: uniqueLocalized(items.map((item) => item.city)),
    intents: uniqueIntents(items),
    industries: uniqueLocalized(items.map((item) => item.industry)),
    occupations: uniqueLocalized(items.map((item) => item.occupation)),
  }
}

export function matchesSelfDirectory(profile: ProfileWithDisplayName, query: NormalizedProfileQuery): boolean {
  return [
    !query.gender || profile.gender === query.gender,
    matchAgeRange(profile.age, query.ageRange),
    !query.city || profile.city.en === query.city,
    matchHeightRange(profile.height, query.heightRange),
    !query.education || profile.degreeLevel === query.education,
    !query.intentCode || profile.intentCode === query.intentCode,
    !query.industry || profile.industry.en === query.industry,
    !query.occupation || profile.occupation.en === query.occupation,
    !query.language || profile.languages.includes(query.language),
    matchVerified(profile.isVerified, query.verified),
    !query.maritalStatus || profile.maritalStatus === query.maritalStatus,
    matchBooleanFlag(profile.hasChildren, query.hasChildren),
    matchBooleanFlag(profile.acceptLongDistance, query.acceptLongDistance),
  ].every(Boolean)
}

export function matchesFamilyDirectory(profile: ProfileWithDisplayName, query: NormalizedProfileQuery): boolean {
  return [
    !query.gender || profile.gender === query.gender,
    matchAgeRange(profile.age, query.ageRange),
    !query.city || profile.city.en === query.city,
    !query.education || profile.degreeLevel === query.education,
    !query.intentCode || profile.intentCode === query.intentCode,
    matchFamilyMode(profile, query.familyMode),
    !query.occupation || profile.occupation.en === query.occupation,
    !query.industry || profile.industry.en === query.industry,
    !query.maritalStatus || profile.maritalStatus === query.maritalStatus,
    matchBooleanFlag(profile.hasChildren, query.hasChildren),
    matchBooleanFlag(profile.acceptLongDistance, query.acceptLongDistance),
  ].every(Boolean)
}

export function sortSelfProfiles(items: ProfileWithDisplayName[], sort: DirectorySort): ProfileWithDisplayName[] {
  const next = [...items]
  switch (sort) {
    case 'priorityFirst':
      return next.sort((left, right) => {
        const rankDiff = getSelfPriorityRank(left) - getSelfPriorityRank(right)
        if (rankDiff !== 0) {
          return rankDiff
        }
        return compareRecentActive(left, right)
      })
    case 'ageAsc':
      return next.sort((left, right) => left.age - right.age)
    case 'ageDesc':
      return next.sort((left, right) => right.age - left.age)
    case 'recentActive':
    default:
      return next.sort(compareRecentActive)
  }
}

export function sortFamilyProfiles(items: ProfileWithDisplayName[], sort: DirectorySort): ProfileWithDisplayName[] {
  const next = [...items]
  switch (sort) {
    case 'recentActive':
      return next.sort(compareRecentActive)
    case 'ageAsc':
      return next.sort((left, right) => left.age - right.age)
    case 'ageDesc':
      return next.sort((left, right) => right.age - left.age)
    case 'priorityFirst':
    default:
      return next.sort((left, right) => {
        const rankDiff = getFamilyPriorityRank(left) - getFamilyPriorityRank(right)
        if (rankDiff !== 0) {
          return rankDiff
        }
        return compareRecentActive(left, right)
      })
  }
}

export function featuredProfiles(profiles: ProfileRecord[], rawPageSize: unknown): { items: ProfileWithDisplayName[]; pagination: ReturnType<typeof buildPagination> } {
  const pageSize = clamp(Number.parseInt(getString(rawPageSize) || '3', 10) || 3, 1, 12)
  const source = profiles.map(withDisplayName)
  const sorted = sortSelfProfiles(source, 'recentActive')

  return {
    items: paginate(sorted, 1, pageSize),
    pagination: buildPagination(sorted.length, 1, pageSize),
  }
}

export function listSelfProfiles(profiles: ProfileRecord[], query: QueryRecord): {
  items: ProfileWithDisplayName[]
  pagination: ReturnType<typeof buildPagination>
  facets: DirectoryFacets
} {
  const normalizedQuery = normalizeProfileQuery(query)
  const source = profiles.map(withDisplayName)
  const filtered = source.filter((profile) => matchesSelfDirectory(profile, normalizedQuery))
  const sorted = sortSelfProfiles(filtered, normalizedQuery.sort)

  return {
    items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize),
    pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
    facets: buildSelfDirectoryFacets(source),
  }
}

export function listFamilyProfiles(profiles: ProfileRecord[], query: QueryRecord): {
  items: ProfileWithDisplayName[]
  pagination: ReturnType<typeof buildPagination>
  facets: DirectoryFacets
} {
  const normalizedQuery = normalizeProfileQuery(query)
  const source = profiles.filter((profile) => profile.familyVisible).map(withDisplayName)
  const filtered = source.filter((profile) => matchesFamilyDirectory(profile, normalizedQuery))
  const sorted = sortFamilyProfiles(filtered, normalizedQuery.sort)

  return {
    items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize),
    pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
    facets: buildFamilyDirectoryFacets(source),
  }
}

export function profileDetail(profiles: ProfileRecord[], id: string): ProfileWithDisplayName | null {
  const profile = profiles.find((item) => item.id === id)
  return profile ? withDisplayName(profile) : null
}

function normalizeSort(value: string): DirectorySort {
  if (value === 'priorityFirst' || value === 'ageAsc' || value === 'ageDesc' || value === 'recentActive') {
    return value
  }

  return 'recentActive'
}

function uniqueLocalized(items: ProfileRecord['city'][]): ProfileRecord['city'][] {
  const seen = new Set<string>()
  return items
    .filter((item) => {
      if (seen.has(item.en)) {
        return false
      }
      seen.add(item.en)
      return true
    })
    .sort((left, right) => left.en.localeCompare(right.en))
}

function uniqueIntents(items: ProfileWithDisplayName[]): Array<{ code: string; label: ProfileWithDisplayName['intent'] }> {
  const seen = new Set<string>()
  return items
    .map((item) => ({ code: item.intentCode, label: item.intent }))
    .filter((item) => {
      if (seen.has(item.code)) {
        return false
      }
      seen.add(item.code)
      return true
    })
}

function compareRecentActive(left: ProfileWithDisplayName, right: ProfileWithDisplayName): number {
  return toTimestamp(right.lastActiveAt) - toTimestamp(left.lastActiveAt)
}

function toTimestamp(value: string): number {
  const next = new Date(value).getTime()
  return Number.isNaN(next) ? 0 : next
}

function getSelfPriorityRank(profile: ProfileWithDisplayName): number {
  return profile.status === 'vip' ? 0 : 1
}

function getFamilyPriorityRank(profile: ProfileWithDisplayName): number {
  if (profile.familyPriority) {
    return 0
  }
  if (profile.allowFamilyContact) {
    return 1
  }
  return 2
}

function matchAgeRange(age: number, range: string): boolean {
  if (!range) {
    return true
  }

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

function matchHeightRange(height: number, range: string): boolean {
  if (!range) {
    return true
  }

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

function matchVerified(isVerified: boolean, value: string): boolean {
  if (!value) {
    return true
  }
  if (value === 'verified') {
    return isVerified
  }
  if (value === 'unverified') {
    return !isVerified
  }
  return true
}

function matchBooleanFlag(source: boolean, value: string): boolean {
  if (!value) {
    return true
  }
  if (value === 'yes') {
    return source
  }
  if (value === 'no') {
    return !source
  }
  return true
}

function matchFamilyMode(profile: ProfileWithDisplayName, value: string): boolean {
  if (!value) {
    return true
  }

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

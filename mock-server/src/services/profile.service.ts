import type { ApiLocale, QueryRecord } from '../types/common.js'
import type {
  DirectoryFacetOptionDTO,
  DirectorySort,
  FamilyProfileDetailDTO,
  FamilyProfileDirectoryFacetsDTO,
  IntentFacetDTO,
  NormalizedProfileQuery,
  ProfileCardListItemDTO,
  ProfileRecord,
  ProfileWithDisplayName,
  SelfProfileDetailDTO,
  SelfProfileDirectoryFacetsDTO,
} from '../types/profile.js'
import { buildPagination, paginate } from '../utils/pagination.js'
import { resolveLocalizedText, resolveLocalizedTexts, withDisplayName } from '../utils/localized.js'
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

export function buildSelfDirectoryFacets(locale: ApiLocale, items: ProfileWithDisplayName[]): SelfProfileDirectoryFacetsDTO {
  return {
    cities: uniqueLocalizedFacetOptions(locale, items.map((item) => item.city)),
    intents: uniqueIntentFacetOptions(locale, items),
    industries: uniqueLocalizedFacetOptions(locale, items.map((item) => item.industry)),
    occupations: uniqueLocalizedFacetOptions(locale, items.map((item) => item.occupation)),
    languages: Array.from(new Set(items.flatMap((item) => item.languages))).sort((left, right) => left.localeCompare(right)),
  }
}

export function buildFamilyDirectoryFacets(locale: ApiLocale, items: ProfileWithDisplayName[]): FamilyProfileDirectoryFacetsDTO {
  return {
    cities: uniqueLocalizedFacetOptions(locale, items.map((item) => item.city)),
    intents: uniqueIntentFacetOptions(locale, items),
    industries: uniqueLocalizedFacetOptions(locale, items.map((item) => item.industry)),
    occupations: uniqueLocalizedFacetOptions(locale, items.map((item) => item.occupation)),
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

export function featuredProfiles(locale: ApiLocale, profiles: ProfileRecord[], rawPageSize: unknown): { items: ProfileCardListItemDTO[] } {
  const pageSize = clamp(Number.parseInt(getString(rawPageSize) || '3', 10) || 3, 1, 12)
  const source = profiles.map(withDisplayName)
  const sorted = sortSelfProfiles(source, 'recentActive')

  return {
    items: paginate(sorted, 1, pageSize).map((profile) => buildSelfProfileCardItem(locale, profile)),
  }
}

export function listSelfProfiles(locale: ApiLocale, profiles: ProfileRecord[], query: QueryRecord): {
  items: ProfileCardListItemDTO[]
  pagination: ReturnType<typeof buildPagination>
  facets: SelfProfileDirectoryFacetsDTO
} {
  const normalizedQuery = normalizeProfileQuery(query)
  const source = profiles.map(withDisplayName)
  const filtered = source.filter((profile) => matchesSelfDirectory(profile, normalizedQuery))
  const sorted = sortSelfProfiles(filtered, normalizedQuery.sort)

  return {
    items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize).map((profile) => buildSelfProfileCardItem(locale, profile)),
    pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
    facets: buildSelfDirectoryFacets(locale, source),
  }
}

export function listFamilyProfiles(locale: ApiLocale, profiles: ProfileRecord[], query: QueryRecord): {
  items: ProfileCardListItemDTO[]
  pagination: ReturnType<typeof buildPagination>
  facets: FamilyProfileDirectoryFacetsDTO
} {
  const normalizedQuery = normalizeProfileQuery(query)
  const source = profiles.filter((profile) => profile.familyVisible).map(withDisplayName)
  const filtered = source.filter((profile) => matchesFamilyDirectory(profile, normalizedQuery))
  const sorted = sortFamilyProfiles(filtered, normalizedQuery.sort)

  return {
    items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize).map((profile) => buildFamilyProfileCardItem(locale, profile)),
    pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
    facets: buildFamilyDirectoryFacets(locale, source),
  }
}

export function selfProfileDetail(locale: ApiLocale, profiles: ProfileRecord[], id: string): SelfProfileDetailDTO | null {
  const profile = profiles.find((item) => item.id === id)
  return profile ? toSelfProfileDetail(locale, withDisplayName(profile)) : null
}

export function familyProfileDetail(locale: ApiLocale, profiles: ProfileRecord[], id: string): FamilyProfileDetailDTO | null {
  const profile = profiles.find((item) => item.id === id && item.familyVisible)
  return profile ? toFamilyProfileDetail(locale, withDisplayName(profile)) : null
}

export function buildSelfProfileCardItem(locale: ApiLocale, profile: ProfileWithDisplayName): ProfileCardListItemDTO {
  return {
    id: profile.id,
    card: {
      avatarUrl: profile.avatarUrl,
      displayName: profile.displayName,
      gender: profile.gender,
      meta: `${formatLocalizedAge(locale, profile.age)} / ${resolveLocalizedText(locale, profile.occupation)}`,
      badgeCode: profile.intentCode,
      summary: resolveLocalizedText(locale, profile.summary),
      facts: [
        { code: 'city', value: resolveLocalizedText(locale, profile.city) },
        { code: 'education', value: resolveLocalizedText(locale, profile.education) },
        { code: 'languages', value: formatProfileLanguages(locale, profile.languages) },
      ],
      tags: resolveLocalizedTexts(locale, profile.tags).slice(0, 3),
      tagCodes: [],
      footerCode: profile.status,
    },
  }
}

export function buildFamilyProfileCardItem(locale: ApiLocale, profile: ProfileWithDisplayName): ProfileCardListItemDTO {
  const familyMode = resolveFamilyMode(profile)
  const tagCodes = [
    maritalStatusTagCode(profile.maritalStatus),
    profile.acceptLongDistance ? 'accept_long_distance' : '',
    profile.hasChildren ? 'has_children' : 'no_children',
  ].filter(Boolean)

  return {
    id: profile.id,
    card: {
      avatarUrl: profile.avatarUrl,
      displayName: profile.displayName,
      gender: profile.gender,
      meta: `${formatLocalizedAge(locale, profile.age)} / ${resolveLocalizedText(locale, profile.occupation)}`,
      badgeCode: familyMode,
      summary: resolveLocalizedText(locale, profile.maritalPlan),
      facts: [
        { code: 'city', value: resolveLocalizedText(locale, profile.city) },
        { code: 'education', value: resolveLocalizedText(locale, profile.education) },
        { code: 'residencePlan', value: resolveLocalizedText(locale, profile.residencePlan) },
      ],
      tags: resolveLocalizedTexts(locale, profile.tags).slice(0, 3),
      tagCodes,
      footerCode: resolveFamilyFooterCode(profile, familyMode),
    },
  }
}

export function toSelfProfileDetail(locale: ApiLocale, profile: ProfileWithDisplayName): SelfProfileDetailDTO {
  return {
    id: profile.id,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    gender: profile.gender,
    age: profile.age,
    height: profile.height,
    city: resolveLocalizedText(locale, profile.city),
    country: resolveLocalizedText(locale, profile.country),
    nationality: resolveLocalizedText(locale, profile.nationality),
    status: profile.status,
    isVerified: profile.isVerified,
    lastActiveAt: profile.lastActiveAt,
    joinedAt: profile.joinedAt,
    familyVisible: profile.familyVisible,
    allowFamilyContact: profile.allowFamilyContact,
    familyPriority: profile.familyPriority,
    education: resolveLocalizedText(locale, profile.education),
    occupation: resolveLocalizedText(locale, profile.occupation),
    industry: resolveLocalizedText(locale, profile.industry),
    employer: resolveLocalizedText(locale, profile.employer),
    incomeRange: resolveLocalizedText(locale, profile.incomeRange),
    maritalStatus: profile.maritalStatus,
    hasChildren: profile.hasChildren,
    wantChildren: profile.wantChildren,
    acceptLongDistance: profile.acceptLongDistance,
    intent: resolveLocalizedText(locale, profile.intent),
    maritalPlan: resolveLocalizedText(locale, profile.maritalPlan),
    languages: profile.languages,
    smoke: profile.smoke,
    drink: profile.drink,
    exercise: resolveLocalizedText(locale, profile.exercise),
    residencePlan: resolveLocalizedText(locale, profile.residencePlan),
    summary: resolveLocalizedText(locale, profile.summary),
    highlights: resolveLocalizedTexts(locale, profile.highlights),
    tags: resolveLocalizedTexts(locale, profile.tags),
  }
}

export function toFamilyProfileDetail(locale: ApiLocale, profile: ProfileWithDisplayName): FamilyProfileDetailDTO {
  return {
    id: profile.id,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    gender: profile.gender,
    age: profile.age,
    city: resolveLocalizedText(locale, profile.city),
    country: resolveLocalizedText(locale, profile.country),
    nationality: resolveLocalizedText(locale, profile.nationality),
    isVerified: profile.isVerified,
    lastActiveAt: profile.lastActiveAt,
    joinedAt: profile.joinedAt,
    familyVisible: profile.familyVisible,
    allowFamilyContact: profile.allowFamilyContact,
    familyPriority: profile.familyPriority,
    education: resolveLocalizedText(locale, profile.education),
    occupation: resolveLocalizedText(locale, profile.occupation),
    industry: resolveLocalizedText(locale, profile.industry),
    incomeRange: resolveLocalizedText(locale, profile.incomeRange),
    maritalStatus: profile.maritalStatus,
    hasChildren: profile.hasChildren,
    wantChildren: profile.wantChildren,
    acceptLongDistance: profile.acceptLongDistance,
    intent: resolveLocalizedText(locale, profile.intent),
    maritalPlan: resolveLocalizedText(locale, profile.maritalPlan),
    languages: profile.languages,
    smoke: profile.smoke,
    drink: profile.drink,
    exercise: resolveLocalizedText(locale, profile.exercise),
    residencePlan: resolveLocalizedText(locale, profile.residencePlan),
    summary: resolveLocalizedText(locale, profile.summary),
    tags: resolveLocalizedTexts(locale, profile.tags),
  }
}

function normalizeSort(value: string): DirectorySort {
  if (value === 'priorityFirst' || value === 'ageAsc' || value === 'ageDesc' || value === 'recentActive') {
    return value
  }

  return 'recentActive'
}

function uniqueLocalizedFacetOptions(locale: ApiLocale, items: ProfileRecord['city'][]): DirectoryFacetOptionDTO[] {
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
    .map((item) => ({
      value: item.en,
      label: resolveLocalizedText(locale, item),
    }))
}

function uniqueIntentFacetOptions(locale: ApiLocale, items: ProfileWithDisplayName[]): IntentFacetDTO[] {
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
    .map((item) => ({
      code: item.code,
      label: resolveLocalizedText(locale, item.label),
    }))
}

function formatLocalizedAge(locale: ApiLocale, age: number): string {
  if (locale === 'zh') return `${age}岁`
  if (locale === 'fr') return `${age} ans`
  return String(age)
}

function formatProfileLanguages(locale: ApiLocale, languages: string[]): string {
  return languages
    .map((language) => getProfileLanguageLabel(locale, language))
    .join(' / ')
}

function getProfileLanguageLabel(locale: ApiLocale, language: string): string {
  const labels: Record<string, Record<ApiLocale, string>> = {
    FR: { zh: '法语', fr: 'Francais', en: 'French' },
    EN: { zh: '英语', fr: 'Anglais', en: 'English' },
    ZH: { zh: '中文', fr: 'Chinois', en: 'Chinese' },
    NL: { zh: '荷兰语', fr: 'Neerlandais', en: 'Dutch' },
    IT: { zh: '意大利语', fr: 'Italien', en: 'Italian' },
    DE: { zh: '德语', fr: 'Allemand', en: 'German' },
  }
  const key = String(language || '').trim()
  return labels[key]?.[locale] ?? key
}

function resolveFamilyMode(profile: ProfileWithDisplayName): 'priority' | 'contact_ready' | 'context_only' {
  if (profile.familyPriority) return 'priority'
  if (profile.allowFamilyContact) return 'contact_ready'
  return 'context_only'
}

function resolveFamilyFooterCode(profile: ProfileWithDisplayName, mode: ReturnType<typeof resolveFamilyMode>): string {
  if (profile.status === 'review') return 'review'

  switch (mode) {
    case 'priority':
      return 'priority'
    case 'contact_ready':
      return 'contact_ready'
    case 'context_only':
    default:
      return 'observe'
  }
}

function maritalStatusTagCode(value: string): string {
  switch (value) {
    case 'divorced':
      return 'marital_divorced'
    case 'widowed':
      return 'marital_widowed'
    case 'single':
    default:
      return 'marital_single'
  }
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

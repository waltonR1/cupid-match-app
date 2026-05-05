export type FormatLocale = 'zh' | 'fr' | 'en'

export type GenderCode = 'male' | 'female'
export type ProfileStatusCode = 'open' | 'review' | 'vip'
export type MaritalStatusCode = 'single' | 'divorced' | 'widowed'
export type IntentCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
export type HabitCode = 'never' | 'social' | 'often'
export type SelfProfileSortKey = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'
export type FamilyProfileSortKey = 'priorityFirst' | 'recentActive' | 'ageAsc' | 'ageDesc'
export type ProfileFactCode = 'city' | 'education' | 'languages' | 'residencePlan'
export type FamilyModeCode = 'priority' | 'contact_ready' | 'context_only'
export type ProfileBadgeCode = IntentCode | FamilyModeCode
export type ProfileFooterCode = ProfileStatusCode | 'priority' | 'contact_ready' | 'observe'
export type ProfileTagCode =
  | 'marital_single'
  | 'marital_divorced'
  | 'marital_widowed'
  | 'accept_long_distance'
  | 'has_children'
  | 'no_children'

export interface ProfileCardFactResponse {
  code: ProfileFactCode
  value: string
}

export interface ProfileCardResponse {
  avatarUrl: string
  displayName: string
  gender: GenderCode
  meta: string
  badgeCode: ProfileBadgeCode
  summary: string
  facts: ProfileCardFactResponse[]
  tags: string[]
  tagCodes: ProfileTagCode[]
  footerCode: ProfileFooterCode
}

export interface ProfileCardResponseItem {
  id: string
  card: ProfileCardResponse
}

export interface SelfProfileDetail {
  id: string
  displayName: string
  avatarUrl: string
  gender: GenderCode
  age: number
  height: number
  city: string
  country: string
  nationality: string
  status: ProfileStatusCode
  isVerified: boolean
  lastActiveAt: string
  joinedAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  education: string
  occupation: string
  industry: string
  employer: string
  incomeRange: string
  maritalStatus: MaritalStatusCode
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean
  intent: string
  maritalPlan: string
  languages: string[]
  smoke: HabitCode
  drink: HabitCode
  exercise: string
  residencePlan: string
  summary: string
  highlights: string[]
  tags: string[]
}

export interface FamilyProfileDetail {
  id: string
  displayName: string
  avatarUrl: string
  gender: GenderCode
  age: number
  city: string
  country: string
  nationality: string
  isVerified: boolean
  lastActiveAt: string
  joinedAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  education: string
  occupation: string
  industry: string
  incomeRange: string
  maritalStatus: MaritalStatusCode
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean
  intent: string
  maritalPlan: string
  languages: string[]
  smoke: HabitCode
  drink: HabitCode
  exercise: string
  residencePlan: string
  summary: string
  tags: string[]
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface DirectoryFacetOption {
  value: string
  label: string
}

export interface IntentFacet {
  code: IntentCode
  label: string
}

export interface SelfProfileDirectoryFacets {
  cities: DirectoryFacetOption[]
  intents: IntentFacet[]
  industries: DirectoryFacetOption[]
  occupations: DirectoryFacetOption[]
  languages: string[]
}

export interface FamilyProfileDirectoryFacets {
  cities: DirectoryFacetOption[]
  intents: IntentFacet[]
  industries: DirectoryFacetOption[]
  occupations: DirectoryFacetOption[]
}

export interface SelfProfileDirectoryQuery {
  page: number
  pageSize: number
  sort: SelfProfileSortKey
  gender?: string
  ageRange?: string
  city?: string
  heightRange?: string
  education?: string
  intentCode?: string
  industry?: string
  occupation?: string
  language?: string
  verified?: string
  maritalStatus?: string
  hasChildren?: string
  acceptLongDistance?: string
}

export interface FamilyProfileDirectoryQuery {
  page: number
  pageSize: number
  sort: FamilyProfileSortKey
  gender?: string
  ageRange?: string
  city?: string
  education?: string
  intentCode?: string
  familyMode?: string
  occupation?: string
  industry?: string
  maritalStatus?: string
  hasChildren?: string
  acceptLongDistance?: string
}

export interface FeaturedSelfProfilesResponse {
  items: ProfileCardResponseItem[]
}

export interface SelfProfileDirectoryResponse {
  items: ProfileCardResponseItem[]
  pagination: Pagination
  facets: SelfProfileDirectoryFacets
}

export interface FamilyProfileDirectoryResponse {
  items: ProfileCardResponseItem[]
  pagination: Pagination
  facets: FamilyProfileDirectoryFacets
}

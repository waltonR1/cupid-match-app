export type FormatLocale = 'zh' | 'fr' | 'en'

export interface LocalizedTextDTO {
  zh: string
  fr: string
  en: string
}

export type GenderCode = 'male' | 'female'
export type ProfileStatusCode = 'open' | 'review' | 'vip'
export type MaritalStatusCode = 'single' | 'divorced' | 'widowed'
export type IntentCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
export type DegreeLevelCode = 'bachelor' | 'master' | 'phd'
export type HabitCode = 'never' | 'social' | 'often'
export type SelfProfileSortKey = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'
export type FamilyProfileSortKey = 'priorityFirst' | 'recentActive' | 'ageAsc' | 'ageDesc'

export interface ProfileDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: GenderCode
  age: number
  height: number
  city: LocalizedTextDTO
  country: LocalizedTextDTO
  nationality: LocalizedTextDTO
  status: ProfileStatusCode
  isVerified: boolean
  lastActiveAt: string
  joinedAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  degreeLevel: DegreeLevelCode
  education: LocalizedTextDTO
  occupation: LocalizedTextDTO
  industry: LocalizedTextDTO
  employer: LocalizedTextDTO
  incomeRange: LocalizedTextDTO
  maritalStatus: MaritalStatusCode
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean
  intentCode: IntentCode
  intent: LocalizedTextDTO
  maritalPlan: LocalizedTextDTO
  languages: string[]
  smoke: HabitCode
  drink: HabitCode
  exercise: LocalizedTextDTO
  residencePlan: LocalizedTextDTO
  summary: LocalizedTextDTO
  highlights: LocalizedTextDTO[]
  tags: LocalizedTextDTO[]
}

export interface PaginationDTO {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface IntentFacetDTO {
  code: IntentCode
  label: LocalizedTextDTO
}

export interface SelfProfileDirectoryFacetsDTO {
  cities: LocalizedTextDTO[]
  intents: IntentFacetDTO[]
  industries: LocalizedTextDTO[]
  occupations: LocalizedTextDTO[]
  languages: string[]
}

export interface FamilyProfileDirectoryFacetsDTO {
  cities: LocalizedTextDTO[]
  intents: IntentFacetDTO[]
  industries: LocalizedTextDTO[]
  occupations: LocalizedTextDTO[]
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

export interface SelfProfileDirectoryResponse {
  items: ProfileDTO[]
  pagination: PaginationDTO
  facets: SelfProfileDirectoryFacetsDTO
}

export interface FamilyProfileDirectoryResponse {
  items: ProfileDTO[]
  pagination: PaginationDTO
  facets: FamilyProfileDirectoryFacetsDTO
}

import type { LocalizedText } from './common.js'

export type ProfileStatus = 'open' | 'vip' | 'review'
export type DegreeLevel = 'bachelor' | 'master' | 'phd'
export type MaritalStatus = 'single' | 'divorced'
export type DirectorySort = 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'
export type RegisterRole = 'self' | 'parent'

export interface ProfileRecord {
  id: string
  realName: string
  nickName: string
  avatarUrl: string
  gender: string
  age: number
  height: number
  city: LocalizedText
  country: LocalizedText
  nationality: LocalizedText
  status: ProfileStatus
  isVerified: boolean
  lastActiveAt: string
  joinedAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  degreeLevel: DegreeLevel
  education: LocalizedText
  occupation: LocalizedText
  industry: LocalizedText
  employer: LocalizedText
  incomeRange: LocalizedText
  maritalStatus: MaritalStatus
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean
  intentCode: string
  intent: LocalizedText
  maritalPlan: LocalizedText
  languages: string[]
  smoke: string
  drink: string
  exercise: LocalizedText
  residencePlan: LocalizedText
  summary: LocalizedText
  highlights: LocalizedText[]
  tags: LocalizedText[]
}

export interface ProfileWithDisplayName extends ProfileRecord {
  displayName: string
}

export interface SelfProfileCardDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: string
  age: number
  city: string
  status: ProfileStatus
  education: string
  occupation: string
  intentCode: string
  summary: string
  languages: string[]
  tags: string[]
}

export interface FamilyProfileCardDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: string
  age: number
  city: string
  status: ProfileStatus
  education: string
  occupation: string
  maritalStatus: MaritalStatus
  hasChildren: boolean
  acceptLongDistance: boolean
  maritalPlan: string
  residencePlan: string
  tags: string[]
  allowFamilyContact: boolean
  familyPriority: boolean
}

export interface SelfProfileDetailDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: string
  age: number
  height: number
  city: string
  country: string
  nationality: string
  status: ProfileStatus
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
  maritalStatus: MaritalStatus
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean
  intent: string
  maritalPlan: string
  languages: string[]
  smoke: string
  drink: string
  exercise: string
  residencePlan: string
  summary: string
  highlights: string[]
  tags: string[]
}

export interface FamilyProfileDetailDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: string
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
  maritalStatus: MaritalStatus
  hasChildren: boolean
  wantChildren: boolean
  acceptLongDistance: boolean
  intent: string
  maritalPlan: string
  languages: string[]
  smoke: string
  drink: string
  exercise: string
  residencePlan: string
  summary: string
  tags: string[]
}

export interface AccountProfileSummaryDTO {
  id: string
  displayName: string
  city: string
  education: string
  occupation: string
  maritalStatus: MaritalStatus
  languages: string[]
  familyVisible: boolean
  summary: string
  highlights: string[]
  tags: string[]
}

export interface AccountFavoriteProfileCardDTO {
  id: string
  displayName: string
  age: number
  city: string
  familyVisible: boolean
  tags: string[]
}

export interface AccountThreadProfileCardDTO {
  id: string
  displayName: string
  age: number
  city: string
  familyVisible: boolean
}

export interface DirectoryFacetOptionDTO {
  value: string
  label: string
}

export interface IntentFacetDTO {
  code: string
  label: string
}

export interface SelfProfileDirectoryFacetsDTO {
  cities: DirectoryFacetOptionDTO[]
  intents: IntentFacetDTO[]
  industries: DirectoryFacetOptionDTO[]
  occupations: DirectoryFacetOptionDTO[]
  languages: string[]
}

export interface FamilyProfileDirectoryFacetsDTO {
  cities: DirectoryFacetOptionDTO[]
  intents: IntentFacetDTO[]
  industries: DirectoryFacetOptionDTO[]
  occupations: DirectoryFacetOptionDTO[]
}

export interface NormalizedProfileQuery {
  page: number
  pageSize: number
  sort: DirectorySort
  gender: string
  ageRange: string
  city: string
  heightRange: string
  education: string
  intentCode: string
  industry: string
  occupation: string
  language: string
  verified: string
  maritalStatus: string
  hasChildren: string
  acceptLongDistance: string
  familyMode: string
}

export interface DirectoryFacets {
  cities: LocalizedText[]
  intents: Array<{ code: string; label: LocalizedText }>
  industries: LocalizedText[]
  occupations: LocalizedText[]
  languages?: string[]
}

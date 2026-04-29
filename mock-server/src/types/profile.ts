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

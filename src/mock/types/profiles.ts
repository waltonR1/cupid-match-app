import type { LocalizedText } from '@/mock/shared'

export type Gender = 'male' | 'female'
export type ProfileStatus = 'open' | 'review' | 'vip'
export type MaritalStatus = 'single' | 'divorced' | 'widowed'
export type IntentionCode = 'serious' | 'marriage' | 'exclusive' | 'cross_border'
export type DegreeLevel = 'bachelor' | 'master' | 'phd'
export type SmokeLevel = 'never' | 'social' | 'often'
export type DrinkLevel = 'never' | 'social' | 'often'

export interface MockProfile {
  id: string
  realName: string
  nickName: string
  avatarUrl: string
  gender: Gender
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
  intentCode: IntentionCode
  intent: LocalizedText
  maritalPlan: LocalizedText
  languages: string[]
  smoke: SmokeLevel
  drink: DrinkLevel
  exercise: LocalizedText
  residencePlan: LocalizedText
  summary: LocalizedText
  highlights: LocalizedText[]
  tags: LocalizedText[]
}

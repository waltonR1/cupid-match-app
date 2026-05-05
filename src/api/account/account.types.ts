import type { Event } from '@/api/events'
import type { FormatLocale } from '@/utils/locale-format'

export type { FormatLocale }
export type AccountMembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type AccountRegistrationStatus = 'confirmed' | 'waitlist' | 'completed'

export interface Account {
  id: string
  realName: string
  nickName: string
  avatarUrl: string
  displayName: string
  city: string
  joinedAt: string
  profileId: string
  completion: number
  membership: AccountMembershipLevel
  bio: string
}

export interface AccountProfileSummary {
  id: string
  displayName: string
  city: string
  education: string
  occupation: string
  maritalStatus: 'single' | 'divorced' | 'widowed'
  languages: string[]
  familyVisible: boolean
  summary: string
  highlights: string[]
  tags: string[]
}

export interface AccountFavoriteProfileCard {
  id: string
  displayName: string
  age: number
  city: string
  familyVisible: boolean
  tags: string[]
}

export interface AccountThreadProfileCard {
  id: string
  displayName: string
  age: number
  city: string
  familyVisible: boolean
}

export interface AccountFavorite {
  profileId: string
  savedAt: string
  note: string
}

export interface AccountFavoriteRecord {
  favorite: AccountFavorite
  profile: AccountFavoriteProfileCard
}

export interface AccountMessageThread {
  profileId: string
  updatedAt: string
  unread: number
  lastMessage: string
}

export interface AccountThreadRecord {
  thread: AccountMessageThread
  profile: AccountThreadProfileCard
}

export interface AccountPrivacySetting {
  id: string
  enabled: boolean
  title: string
  desc: string
}

export interface AccountUserRegistration {
  eventId: string
  status: AccountRegistrationStatus
  note: string
}

export interface AccountUserEventRecord {
  registration: AccountUserRegistration
  event: Event
}

export interface AccountOverviewResponse {
  account: Account
  profile: AccountProfileSummary | null
  userEvents: AccountUserEventRecord[]
  favorites: AccountFavoriteRecord[]
  threads: AccountThreadRecord[]
  privacySettings: AccountPrivacySetting[]
}

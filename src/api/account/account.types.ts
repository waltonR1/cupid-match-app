import type { EventDTO } from '@/api/events/events.types'
import type { FormatLocale } from '@/utils/locale-format'

export type { FormatLocale }
export type AccountMembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type AccountRegistrationStatus = 'confirmed' | 'waitlist' | 'completed'

export interface AccountDTO {
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

export interface AccountFavoriteDTO {
  profileId: string
  savedAt: string
  note: string
}

export interface AccountFavoriteRecordDTO {
  favorite: AccountFavoriteDTO
  profile: AccountFavoriteProfileCard
}

export interface AccountMessageThreadDTO {
  profileId: string
  updatedAt: string
  unread: number
  lastMessage: string
}

export interface AccountThreadRecordDTO {
  thread: AccountMessageThreadDTO
  profile: AccountThreadProfileCard
}

export interface AccountPrivacySettingDTO {
  id: string
  enabled: boolean
  title: string
  desc: string
}

export interface AccountUserRegistrationDTO {
  eventId: string
  status: AccountRegistrationStatus
  note: string
}

export interface AccountUserEventRecordDTO {
  registration: AccountUserRegistrationDTO
  event: EventDTO
}

export interface AccountOverviewDTO {
  account: AccountDTO
  profile: AccountProfileSummary | null
  userEvents: AccountUserEventRecordDTO[]
  favorites: AccountFavoriteRecordDTO[]
  threads: AccountThreadRecordDTO[]
  privacySettings: AccountPrivacySettingDTO[]
}

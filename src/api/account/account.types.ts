import type { EventDTO } from '@/api/events/events.types'
import type { ProfileDTO } from '@/api/profiles/profiles.types'
import type { FormatLocale } from '@/utils/locale-format'

export type { FormatLocale }
export type AccountMembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type AccountRegistrationStatus = 'confirmed' | 'waitlist' | 'completed'

export interface LocalizedTextDTO {
  zh: string
  fr: string
  en: string
}

export interface AccountDTO {
  id: string
  realName: string
  nickName: string
  avatarUrl: string
  displayName: string
  city: LocalizedTextDTO
  joinedAt: string
  profileId: string
  completion: number
  membership: AccountMembershipLevel
  bio: LocalizedTextDTO
}

export type AccountProfileDTO = ProfileDTO

export interface AccountFavoriteDTO {
  profileId: string
  savedAt: string
  note: LocalizedTextDTO
}

export interface AccountFavoriteRecordDTO {
  favorite: AccountFavoriteDTO
  profile: AccountProfileDTO
}

export interface AccountMessageThreadDTO {
  id: string
  profileId: string
  updatedAt: string
  unread: number
  lastMessage: LocalizedTextDTO
}

export interface AccountThreadRecordDTO {
  thread: AccountMessageThreadDTO
  profile: AccountProfileDTO
}

export interface AccountPrivacySettingDTO {
  id: string
  enabled: boolean
  title: LocalizedTextDTO
  desc: LocalizedTextDTO
}

export interface AccountUserRegistrationDTO {
  id: string
  eventId: string
  status: AccountRegistrationStatus
  note: LocalizedTextDTO
}

export interface AccountUserEventRecordDTO {
  registration: AccountUserRegistrationDTO
  event: EventDTO
}

export interface AccountOverviewDTO {
  account: AccountDTO
  profile: AccountProfileDTO | null
  userEvents: AccountUserEventRecordDTO[]
  favorites: AccountFavoriteRecordDTO[]
  threads: AccountThreadRecordDTO[]
  privacySettings: AccountPrivacySettingDTO[]
}

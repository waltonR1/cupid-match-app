import type { LocalizedText } from '@/mock/shared'
import type { MockEvent } from '@/mock/types/events'
import type { MockProfile } from '@/mock/types/profiles'

export type MembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type RegistrationStatus = 'confirmed' | 'waitlist' | 'completed'

export interface MockUserAccount {
  id: string
  realName: string
  nickName: string
  avatarUrl: string
  city: LocalizedText
  joinedAt: string
  profileId: string
  completion: number
  membership: MembershipLevel
  bio: LocalizedText
}

export interface MockUserRegistration {
  id: string
  eventId: string
  status: RegistrationStatus
  note: LocalizedText
}

export interface MockUserEventRecord {
  registration: MockUserRegistration
  event: MockEvent
}

export interface MockFavoriteProfile {
  profileId: string
  savedAt: string
  note: LocalizedText
}

export interface MockMessageThread {
  id: string
  profileId: string
  updatedAt: string
  unread: number
  lastMessage: LocalizedText
}

export interface MockPrivacySetting {
  id: string
  enabled: boolean
  title: LocalizedText
  desc: LocalizedText
}

export interface MockFavoriteRecord {
  favorite: MockFavoriteProfile
  profile: MockProfile
}

export interface MockThreadRecord {
  thread: MockMessageThread
  profile: MockProfile
}

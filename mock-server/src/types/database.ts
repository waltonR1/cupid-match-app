import type { LocalizedText } from './common.js'
import type { ProfileRecord, RegisterRole } from './profile.js'

export interface EventAgendaItem {
  time: string
  title: LocalizedText
  desc: LocalizedText
}

export interface EventRecord {
  id: string
  date: string
  city: LocalizedText
  venue: LocalizedText
  status: string
  title: LocalizedText
  format: LocalizedText
  audience: LocalizedText
  summary: LocalizedText
  seats: number
  registered: number
  agenda: EventAgendaItem[]
}

export interface AccountRecord {
  id: string
  role: RegisterRole
  realName: string
  nickName: string
  avatarUrl: string
  city: LocalizedText
  joinedAt: string
  profileId: string
  completion: number
  membership: string
  bio: LocalizedText
}

export interface UserRegistrationRecord {
  id: string
  accountId: string
  eventId: string
  status: string
  note: LocalizedText
}

export interface FavoriteProfileRecord {
  id: string
  accountId: string
  profileId: string
  savedAt: string
  note: LocalizedText
}

export interface MessageThreadRecord {
  id: string
  accountId: string
  profileId: string
  updatedAt: string
  unread: number
  lastMessage: LocalizedText
}

export interface PrivacySettingRecord {
  id: string
  accountId: string
  enabled: boolean
  title: LocalizedText
  desc: LocalizedText
}

export interface AuthUserRecord {
  id: string
  accountId: string
  role: RegisterRole
  identity: string
  email: string
  password: string
  displayName: string
  avatarUrl: string
}

export interface Database {
  profiles: ProfileRecord[]
  events: EventRecord[]
  accounts: AccountRecord[]
  user_registrations: UserRegistrationRecord[]
  favorite_profiles: FavoriteProfileRecord[]
  message_threads: MessageThreadRecord[]
  privacy_settings: PrivacySettingRecord[]
  auth_users: AuthUserRecord[]
}

import type {
  AccountRecord,
  Database,
  FavoriteProfileRecord,
  MessageThreadRecord,
  PrivacySettingRecord,
  UserRegistrationRecord,
} from '../types/database.js'
import type { ProfileRecord } from '../types/profile.js'
import { withDisplayName } from '../utils/localized.js'

type AccountWithDisplayName = AccountRecord & { displayName: string }
type ProfileWithDisplayName = ProfileRecord & { displayName: string }

interface FavoriteOverview {
  favorite: Omit<FavoriteProfileRecord, 'id' | 'accountId'>
  profile: ProfileWithDisplayName
}

interface ThreadOverview {
  thread: Omit<MessageThreadRecord, 'id' | 'accountId'>
  profile: ProfileWithDisplayName
}

interface UserEventOverview {
  registration: Omit<UserRegistrationRecord, 'id' | 'accountId'>
  event: Database['events'][number]
}

export function getAccountOverview(data: Database, accountId: string): {
  account: AccountWithDisplayName
  profile: ProfileWithDisplayName | null
  userEvents: UserEventOverview[]
  favorites: FavoriteOverview[]
  threads: ThreadOverview[]
  privacySettings: Array<Omit<PrivacySettingRecord, 'accountId'>>
} | null {
  const account = data.accounts.find((item) => item.id === accountId)
  if (!account) {
    return null
  }

  const profile = data.profiles.find((item) => item.id === account.profileId)

  const favorites = data.favorite_profiles
    .filter((favorite) => favorite.accountId === accountId)
    .map((favorite) => {
      const favoriteProfile = data.profiles.find((profileItem) => profileItem.id === favorite.profileId)
      return favoriteProfile ? { favorite: omitId(favorite), profile: withDisplayName(favoriteProfile) } : null
    })
    .filter(isPresent)

  const threads = data.message_threads
    .filter((thread) => thread.accountId === accountId)
    .map((thread) => {
      const threadProfile = data.profiles.find((profileItem) => profileItem.id === thread.profileId)
      return threadProfile ? { thread: omitId(thread), profile: withDisplayName(threadProfile) } : null
    })
    .filter(isPresent)

  const userEvents = data.user_registrations
    .filter((registration) => registration.accountId === accountId)
    .map((registration) => {
      const event = data.events.find((item) => item.id === registration.eventId)
      return event ? { registration: omitId(registration), event } : null
    })
    .filter(isPresent)

  const privacySettings = data.privacy_settings.filter((item) => item.accountId === accountId).map(omitAccountId)

  return {
    account: withDisplayName(account),
    profile: profile ? withDisplayName(profile) : null,
    userEvents,
    favorites,
    threads,
    privacySettings,
  }
}

function omitId<T extends { id: string; accountId: string }>(record: T): Omit<T, 'id' | 'accountId'> {
  const { id: _id, accountId: _accountId, ...rest } = record
  return rest
}

function omitAccountId<T extends { accountId: string }>(record: T): Omit<T, 'accountId'> {
  const { accountId: _accountId, ...rest } = record
  return rest
}

function isPresent<T>(value: T | null): value is T {
  return value !== null
}

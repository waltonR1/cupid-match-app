import type { ApiLocale } from '../types/common.js'
import type {
  AccountRecord,
  Database,
  FavoriteProfileRecord,
  MessageThreadRecord,
  PrivacySettingRecord,
  UserRegistrationRecord,
} from '../types/database.js'
import type {
  AccountFavoriteProfileCardDTO,
  AccountProfileSummaryDTO,
  AccountThreadProfileCardDTO,
  ProfileRecord,
} from '../types/profile.js'
import { resolveLocalizedText, resolveLocalizedTexts, withDisplayName } from '../utils/localized.js'

type AccountWithDisplayName = AccountRecord & { displayName: string }
type ProfileWithDisplayName = ProfileRecord & { displayName: string }

interface FavoriteOverview {
  favorite: ReturnType<typeof toFavoriteOverview>
  profile: AccountFavoriteProfileCardDTO
}

interface ThreadOverview {
  thread: ReturnType<typeof toThreadOverview>
  profile: AccountThreadProfileCardDTO
}

interface UserEventOverview {
  registration: ReturnType<typeof toUserRegistrationOverview>
  event: ReturnType<typeof toEventDTO>
}

export function getAccountOverview(locale: ApiLocale, data: Database, accountId: string): {
  account: ReturnType<typeof toAccountOverview>
  profile: AccountProfileSummaryDTO | null
  userEvents: UserEventOverview[]
  favorites: FavoriteOverview[]
  threads: ThreadOverview[]
  privacySettings: Array<ReturnType<typeof toPrivacySettingOverview>>
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
      return favoriteProfile
        ? { favorite: toFavoriteOverview(locale, omitId(favorite)), profile: toAccountFavoriteProfileCard(locale, withDisplayName(favoriteProfile)) }
        : null
    })
    .filter(isPresent)

  const threads = data.message_threads
    .filter((thread) => thread.accountId === accountId)
    .map((thread) => {
      const threadProfile = data.profiles.find((profileItem) => profileItem.id === thread.profileId)
      return threadProfile
        ? { thread: toThreadOverview(locale, omitId(thread)), profile: toAccountThreadProfileCard(locale, withDisplayName(threadProfile)) }
        : null
    })
    .filter(isPresent)

  const userEvents = data.user_registrations
    .filter((registration) => registration.accountId === accountId)
    .map((registration) => {
      const event = data.events.find((item) => item.id === registration.eventId)
      return event ? { registration: toUserRegistrationOverview(locale, omitId(registration)), event: toEventDTO(locale, event) } : null
    })
    .filter(isPresent)

  const privacySettings = data.privacy_settings
    .filter((item) => item.accountId === accountId)
    .map((item) => toPrivacySettingOverview(locale, omitAccountId(item)))

  return {
    account: toAccountOverview(locale, withDisplayName(account)),
    profile: profile ? toAccountProfileSummary(locale, withDisplayName(profile)) : null,
    userEvents,
    favorites,
    threads,
    privacySettings,
  }
}

function toAccountOverview(locale: ApiLocale, account: AccountWithDisplayName) {
  return {
    ...account,
    city: resolveLocalizedText(locale, account.city),
    bio: resolveLocalizedText(locale, account.bio),
  }
}

function toAccountProfileSummary(locale: ApiLocale, profile: ProfileWithDisplayName): AccountProfileSummaryDTO {
  return {
    id: profile.id,
    displayName: profile.displayName,
    city: resolveLocalizedText(locale, profile.city),
    education: resolveLocalizedText(locale, profile.education),
    occupation: resolveLocalizedText(locale, profile.occupation),
    maritalStatus: profile.maritalStatus,
    languages: profile.languages,
    familyVisible: profile.familyVisible,
    summary: resolveLocalizedText(locale, profile.summary),
    highlights: resolveLocalizedTexts(locale, profile.highlights),
    tags: resolveLocalizedTexts(locale, profile.tags),
  }
}

function toAccountFavoriteProfileCard(locale: ApiLocale, profile: ProfileWithDisplayName): AccountFavoriteProfileCardDTO {
  return {
    id: profile.id,
    displayName: profile.displayName,
    age: profile.age,
    city: resolveLocalizedText(locale, profile.city),
    familyVisible: profile.familyVisible,
    tags: resolveLocalizedTexts(locale, profile.tags),
  }
}

function toAccountThreadProfileCard(locale: ApiLocale, profile: ProfileWithDisplayName): AccountThreadProfileCardDTO {
  return {
    id: profile.id,
    displayName: profile.displayName,
    age: profile.age,
    city: resolveLocalizedText(locale, profile.city),
    familyVisible: profile.familyVisible,
  }
}

function toFavoriteOverview(locale: ApiLocale, favorite: Omit<FavoriteProfileRecord, 'id' | 'accountId'>) {
  return {
    ...favorite,
    note: resolveLocalizedText(locale, favorite.note),
  }
}

function toThreadOverview(locale: ApiLocale, thread: Omit<MessageThreadRecord, 'id' | 'accountId'>) {
  return {
    ...thread,
    lastMessage: resolveLocalizedText(locale, thread.lastMessage),
  }
}

function toUserRegistrationOverview(locale: ApiLocale, registration: Omit<UserRegistrationRecord, 'id' | 'accountId'>) {
  return {
    ...registration,
    note: resolveLocalizedText(locale, registration.note),
  }
}

function toPrivacySettingOverview(locale: ApiLocale, setting: Omit<PrivacySettingRecord, 'accountId'>) {
  return {
    ...setting,
    title: resolveLocalizedText(locale, setting.title),
    desc: resolveLocalizedText(locale, setting.desc),
  }
}

function toEventDTO(locale: ApiLocale, event: Database['events'][number]) {
  return {
    id: event.id,
    date: event.date,
    city: resolveLocalizedText(locale, event.city),
    venue: resolveLocalizedText(locale, event.venue),
    status: event.status,
    title: resolveLocalizedText(locale, event.title),
    format: resolveLocalizedText(locale, event.format),
    audience: resolveLocalizedText(locale, event.audience),
    summary: resolveLocalizedText(locale, event.summary),
    seats: event.seats,
    registered: event.registered,
    agenda: event.agenda.map((item) => ({
      time: item.time,
      title: resolveLocalizedText(locale, item.title),
      desc: resolveLocalizedText(locale, item.desc),
    })),
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

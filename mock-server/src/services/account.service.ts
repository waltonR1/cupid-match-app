import type { ApiLocale } from '../types/common.js'
import type {
  Database,
  FavoriteProfileRecord,
  MembershipLevel,
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

type ProfileWithDisplayName = ProfileRecord & { displayName: string }

interface AccountOverviewDTO {
  id: string
  realName: string
  nickName: string
  avatarUrl: string
  displayName: string
  city: string
  joinedAt: string
  profileId: string
  completion: number
  membership: MembershipLevel
  role: string
}

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

export function getAccountOverview(locale: ApiLocale, data: Database, userId: string): {
  user: AccountOverviewDTO
  profile: AccountProfileSummaryDTO | null
  userEvents: UserEventOverview[]
  favorites: FavoriteOverview[]
  threads: ThreadOverview[]
  privacySettings: Array<ReturnType<typeof toPrivacySettingOverview>>
} | null {
  const user = data.users.find((item) => item.id === userId)
  if (!user) {
    return null
  }

  const membership = data.memberships.find((item) => item.userId === userId)
  const primaryOwnership = data.profile_ownerships.find((item) => item.userId === userId && item.isPrimary)
  const profileId = primaryOwnership?.profileId ?? ''

  const profile = profileId ? data.profiles.find((item) => item.id === profileId) : undefined

  const favorites = data.favorite_profiles
    .filter((favorite) => favorite.userId === userId)
    .map((favorite) => {
      const favoriteProfile = data.profiles.find((profileItem) => profileItem.id === favorite.profileId)
      return favoriteProfile
        ? { favorite: toFavoriteOverview(locale, omitId(favorite)), profile: toAccountFavoriteProfileCard(locale, withDisplayName(favoriteProfile)) }
        : null
    })
    .filter(isPresent)

  const threads = data.message_threads
    .filter((thread) => thread.userId === userId)
    .map((thread) => {
      const threadProfile = data.profiles.find((profileItem) => profileItem.id === thread.profileId)
      return threadProfile
        ? { thread: toThreadOverview(locale, omitId(thread)), profile: toAccountThreadProfileCard(locale, withDisplayName(threadProfile)) }
        : null
    })
    .filter(isPresent)

  const userEvents = data.user_registrations
    .filter((registration) => registration.userId === userId)
    .map((registration) => {
      const event = data.events.find((item) => item.id === registration.eventId)
      return event ? { registration: toUserRegistrationOverview(locale, omitId(registration)), event: toEventDTO(locale, event) } : null
    })
    .filter(isPresent)

  const privacySettings = data.privacy_settings
    .filter((item) => item.userId === userId)
    .map((item) => toPrivacySettingOverview(locale, omitUserId(item)))

  return {
    user: toAccountOverview(locale, user, membership?.tier ?? 'free', profileId),
    profile: profile ? toAccountProfileSummary(locale, withDisplayName(profile)) : null,
    userEvents,
    favorites,
    threads,
    privacySettings,
  }
}

function toAccountOverview(
  locale: ApiLocale,
  user: Database['users'][number],
  tier: MembershipLevel,
  profileId: string,
): AccountOverviewDTO {
  return {
    id: user.id,
    realName: user.accountName,
    nickName: user.accountName,
    avatarUrl: user.avatarUrl,
    displayName: user.accountName,
    city: resolveLocalizedText(locale, user.city),
    joinedAt: user.createdAt,
    profileId,
    completion: 0,
    membership: tier,
    role: user.onboardingPath,
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

function toFavoriteOverview(locale: ApiLocale, favorite: Omit<FavoriteProfileRecord, 'id' | 'userId'>) {
  return {
    ...favorite,
    note: resolveLocalizedText(locale, favorite.note),
  }
}

function toThreadOverview(locale: ApiLocale, thread: Omit<MessageThreadRecord, 'id' | 'userId'>) {
  return {
    ...thread,
    lastMessage: resolveLocalizedText(locale, thread.lastMessage),
  }
}

function toUserRegistrationOverview(locale: ApiLocale, registration: Omit<UserRegistrationRecord, 'id' | 'userId'>) {
  return {
    ...registration,
    note: resolveLocalizedText(locale, registration.note),
  }
}

function toPrivacySettingOverview(locale: ApiLocale, setting: Omit<PrivacySettingRecord, 'userId'>) {
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

function omitId<T extends { id: string; userId: string }>(record: T): Omit<T, 'id' | 'userId'> {
  const { id: _id, userId: _userId, ...rest } = record
  return rest
}

function omitUserId<T extends { userId: string }>(record: T): Omit<T, 'userId'> {
  const { userId: _userId, ...rest } = record
  return rest
}

function isPresent<T>(value: T | null): value is T {
  return value !== null
}

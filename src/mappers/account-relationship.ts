import type {
  AccountIntroductionSummaryDTO,
  AccountPrivateIntroductionRoomDTO,
  FavoriteProfileSummaryDTO,
} from '@/api/account'
import type { Translate } from '@/i18n/types'
import { formatLocalizedDate, type FormatLocale } from '@/utils/locale-format'

export function toAccountRelationshipPageData(params: {
  favorites: FavoriteProfileSummaryDTO[]
  introductions: AccountIntroductionSummaryDTO[]
  rooms: AccountPrivateIntroductionRoomDTO[]
  t: Translate
  locale: FormatLocale
}) {
  const { favorites, introductions, rooms, t, locale } = params

  return {
    favorites: favorites.map((item) => ({
      favoriteId: item.favoriteId,
      profileId: item.profileId,
      displayName: item.displayName,
      avatarUrl: item.avatarUrl,
      age: String(item.age),
      city: item.city,
      savedAtText: formatLocalizedDate(locale, item.createdAt),
    })),
    introductions: introductions.map((item) => ({
      requestId: item.requestId,
      targetProfileId: item.targetProfileId,
      targetDisplayName: item.targetDisplayName,
      targetAvatarUrl: item.targetAvatarUrl,
      status: item.status,
      statusText: t(`introduction.status.${item.status}`),
      requestedAtText: formatLocalizedDate(locale, item.requestedAt),
      expiresAtText: item.expiresAt ? formatLocalizedDate(locale, item.expiresAt) : undefined,
      respondedAtText: item.respondedAt ? formatLocalizedDate(locale, item.respondedAt) : undefined,
      cooldownUntilText: item.cooldownUntil ? formatLocalizedDate(locale, item.cooldownUntil) : undefined,
    })),
    rooms: rooms.map((item) => ({
      roomId: item.roomId,
      requestId: item.requestId,
      targetProfileId: item.targetProfileId,
      targetDisplayName: item.targetDisplayName,
      targetAvatarUrl: item.targetAvatarUrl,
      status: item.status,
      openedAtText: formatLocalizedDate(locale, item.openedAt),
      closedAtText: item.closedAt ? formatLocalizedDate(locale, item.closedAt) : undefined,
      lastMessageText: item.lastMessage,
    })),
    tabs: [
      { key: 'favorites' as const, label: t('relationship.tabs.favorites'), count: favorites.length },
      { key: 'introductions' as const, label: t('relationship.tabs.introductions'), count: introductions.length },
      { key: 'messages' as const, label: t('relationship.tabs.messages'), count: rooms.length },
    ],
    overview: [
      {
        key: 'favorites' as const,
        label: t('relationship.overview.favorites'),
        description: t('relationship.stageDescription.favorites'),
        value: favorites.length,
      },
      {
        key: 'introductions' as const,
        label: t('relationship.overview.introductions'),
        description: t('relationship.stageDescription.introductions'),
        value: introductions.length,
      },
      {
        key: 'messages' as const,
        label: t('relationship.overview.messages'),
        description: t('relationship.stageDescription.messages'),
        value: rooms.length,
      },
    ],
  }
}

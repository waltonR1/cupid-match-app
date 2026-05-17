import type {
  AccountIntroductionSummaryDTO,
  FavoriteProfileSummaryDTO,
} from '@/api/account'
import type { Translate } from '@/i18n/types'
import { formatLocalizedDate, type FormatLocale } from '@/utils/locale-format'

export function toAccountRelationshipPageData(params: {
  favorites: FavoriteProfileSummaryDTO[]
  introductions: AccountIntroductionSummaryDTO[]
  t: Translate
  locale: FormatLocale
}) {
  const { favorites, introductions, t, locale } = params
  const introductionItems = introductions.map((item) => ({
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
  }))
  const attentionIntroductions = introductionItems.filter((item) => item.status === 'requested')
  const historyIntroductions = introductionItems.filter((item) => item.status !== 'requested')

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
    introductions: introductionItems,
    attentionIntroductions,
    historyIntroductions,
    tabs: [
      { key: 'favorites' as const, label: t('relationship.tabs.favorites'), count: favorites.length },
      { key: 'introductions' as const, label: t('relationship.tabs.introductions'), count: introductions.length },
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
        value: attentionIntroductions.length,
      },
    ],
  }
}

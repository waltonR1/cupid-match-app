import type { AccountDashboardDTO } from '@/api/account'
import type { Translate } from '@/i18n/types'
import type { PageActionViewModel } from '@/types/account/common'

export interface AccountHomeViewModel {
  accountItems: { key: string; label: string; value: string }[]
  summaryItems: { key: string; label: string; value: string | number }[]
  quotaSummary: { label: string; value: string; description: string } | null
  attentionItems: { key: string; label: string; value: string; description: string }[]
  upcomingItems: { key: string; title: string; meta: string; status: string }[]
  profileItems: { key: string; title: string; meta: string; status: string }[]
  primaryAction?: PageActionViewModel
}

export function toAccountHomePageData(params: { payload: AccountDashboardDTO | null; t: Translate }): AccountHomeViewModel | null {
  const { payload, t } = params
  if (!payload) return null

  const primaryAction = resolvePrimaryAction(payload, t)
  const accountItems = [
    { key: 'account-name', label: t('home.accountFields.accountName'), value: payload.user.accountName },
    { key: 'status', label: t('home.accountFields.status'), value: t(`home.accountStatus.${payload.user.status}`) },
    { key: 'locale', label: t('home.accountFields.preferredLocale'), value: t(`home.locale.${payload.user.preferredLocale}`) },
    { key: 'membership', label: t('home.accountFields.membership'), value: payload.membership?.name ?? t('home.functional.noMembership') },
  ]
  const summaryItems = [
    { key: 'profiles', label: t('home.overview.profiles'), value: payload.profiles.length },
    { key: 'favorites', label: t('home.overview.favorites'), value: payload.favoriteCount },
    { key: 'introductions', label: t('home.overview.introductions'), value: payload.recentIntroductions.length },
    { key: 'events', label: t('home.overview.events'), value: payload.upcomingEvents.length },
  ]
  const privateIntroductionBalance = payload.entitlements.find((item) => item.code === 'private_introduction')
  const quotaSummary = privateIntroductionBalance
    ? {
        label: t('home.quota.title'),
        value: `${privateIntroductionBalance.quotaRemaining} / ${privateIntroductionBalance.quotaTotal}`,
        description: t('home.quota.description'),
      }
    : null
  const requestedIntroductions = payload.recentIntroductions.filter((item) => item.status === 'requested')
  const attentionItems = [
    {
      key: 'introductions',
      label: t('home.attention.introductions'),
      value: String(requestedIntroductions.length),
      description: requestedIntroductions.length > 0
        ? t('home.attention.introductionsActive')
        : t('home.attention.introductionsEmpty'),
    },
  ]
  const upcomingItems = payload.upcomingEvents.map((item) => ({
    key: item.registrationId,
    title: item.title,
    meta: `${item.city} · ${item.date}`,
    status: t(`events.registrationStatus.${item.status}`),
  }))
  const profileItems = payload.profiles.map((item) => ({
    key: item.profileId,
    title: item.displayName,
    meta: item.city,
    status: t(`profiles.status.${item.profileStatus}`),
  }))

  return {
    accountItems,
    summaryItems,
    quotaSummary,
    attentionItems,
    upcomingItems,
    profileItems,
    primaryAction,
  }
}

function resolvePrimaryAction(payload: AccountDashboardDTO, t: Translate): PageActionViewModel | undefined {
  if (payload.profiles.length === 0) {
    return { key: 'create-profile', label: t('home.actions.createProfile'), disabled: false }
  }

  if (payload.recentIntroductions.length === 0 && payload.favoriteCount === 0) {
    return { key: 'browse-profiles', label: t('home.actions.browseProfiles'), disabled: false }
  }

  return undefined
}

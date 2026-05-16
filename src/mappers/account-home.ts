import type { AccountDashboardDTO } from '@/api/account'
import type { Translate } from '@/i18n/types'
import type { PageActionViewModel } from '@/types/account/common'

export interface AccountHomeViewModel {
  user: { id: string; accountName: string; avatarUrl: string }
  onboarding: { path: string; step: string; title: string; description: string; action?: PageActionViewModel } | null
  accountItems: { key: string; label: string; value: string }[]
  summaryItems: { key: string; label: string; value: string | number }[]
  primaryAction?: PageActionViewModel
  emptyState?: { title: string; description: string }
}

export function toAccountHomePageData(params: { payload: AccountDashboardDTO | null; t: Translate }): AccountHomeViewModel | null {
  const { payload, t } = params
  if (!payload) return null

  const rawOnboarding = payload.onboarding
  const onboarding = rawOnboarding
    ? {
        path: rawOnboarding.path,
        step: rawOnboarding.step,
        title: t(`home.onboarding.${rawOnboarding.step}.title`),
        description: t(`home.onboarding.${rawOnboarding.step}.desc`),
        action: rawOnboarding.step !== 'browse'
          ? { key: 'create-profile', label: t('home.actions.createProfile'), disabled: false }
          : undefined,
      }
    : null

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

  return {
    user: payload.user,
    onboarding,
    accountItems,
    summaryItems,
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

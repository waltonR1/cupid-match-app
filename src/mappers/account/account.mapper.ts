import { formatAccountLanguages, localizeAccountText } from '@/utils/account-format'
import { formatLocalizedDate, formatLocalizedDateTime, type FormatLocale } from '@/utils/locale-format'
import { formatProfileAge } from '@/utils/profile-format'
import type { AccountOverviewContext } from '@/hooks/account'
import type { AccountMembershipLevel } from '@/api/account/account.client'
import type {
  AccountActivityPageVM,
  AccountConnectionsPageVM,
  AccountMembershipPageVM,
  AccountMessagesPageVM,
  AccountProfilePageVM,
  AccountSafetyPageVM,
  AccountVerificationPageVM,
} from '@/types/vm/account'

type Translate = (key: string) => string

export function buildAccountProfilePageViewModel(
  accountData: AccountOverviewContext,
  locale: FormatLocale,
  t: Translate,
  globalT: Translate,
): AccountProfilePageVM {
  const { account, profile, familyAssistSetting, visibleFieldsSetting } = accountData
  const membership = membershipLabel(globalT, account.membership)

  return {
    bio: localizeAccountText(locale, account.bio),
    membershipLabel: membership,
    summaryItems: [
      { label: t('topSummary.metrics.completion'), value: `${account.completion}%` },
      { label: t('common.currentTier'), value: membership },
      { label: t('common.visibility'), value: profile?.familyVisible ? t('common.familyVisible') : t('common.privateOnly') },
    ],
    baseRows: profile ? [
      { label: t('profile.rows.city'), value: localizeAccountText(locale, profile.city) },
      { label: t('profile.rows.education'), value: localizeAccountText(locale, profile.education) },
      { label: t('profile.rows.occupation'), value: localizeAccountText(locale, profile.occupation) },
      { label: t('profile.rows.languages'), value: formatAccountLanguages(locale, profile.languages) },
      { label: t('common.currentTier'), value: membership },
    ] : [],
    visibilityRows: [
      { label: t('common.familyVisible'), value: profile?.familyVisible ? t('common.enabled') : t('common.disabled') },
      { label: t('common.familyAssist'), value: familyAssistSetting.value?.enabled ? t('common.enabled') : t('common.disabled') },
      { label: t('common.visibleFields'), value: visibleFieldsSetting.value?.enabled ? t('common.enabled') : t('common.disabled') },
    ],
    mediaPoints: [
      t('profile.media.photos'),
      t('profile.media.video'),
      t('profile.media.order'),
    ],
    taskPoints: [
      t('profile.tasks.photos'),
      t('profile.tasks.introduction'),
      t('profile.tasks.verification'),
    ],
    summaryText: profile ? localizeAccountText(locale, profile.summary) : '',
    highlightTexts: profile?.highlights.map(item => localizeAccountText(locale, item)) ?? [],
    tagTexts: profile?.tags.map(item => localizeAccountText(locale, item)) ?? [],
  }
}

export function buildAccountConnectionsPageViewModel(
  accountData: AccountOverviewContext,
  locale: FormatLocale,
  t: Translate,
): AccountConnectionsPageVM {
  const { favorites, familyVisibleFavorites, privateFavorites } = accountData

  return {
    filterItems: [
      { label: t('connections.filters.likedMe'), value: String(familyVisibleFavorites.value.length) },
      { label: t('connections.filters.liked'), value: String(favorites.length) },
      { label: t('connections.filters.mutual'), value: String(Math.min(privateFavorites.value.length, familyVisibleFavorites.value.length)) },
      { label: t('connections.filters.family'), value: String(familyVisibleFavorites.value.length) },
    ],
    summaryItems: [
      { label: t('common.privateOnly'), value: String(privateFavorites.value.length) },
      { label: t('common.familyVisible'), value: String(familyVisibleFavorites.value.length) },
    ],
    reasonPoints: [
      t('connections.reasons.complete'),
      t('connections.reasons.family'),
      t('connections.reasons.active'),
    ],
    items: favorites.map(item => ({
      id: item.profile.id,
      familyVisible: item.profile.familyVisible,
      displayName: item.profile.displayName,
      city: localizeAccountText(locale, item.profile.city),
      ageText: formatProfileAge(locale, item.profile.age),
      note: localizeAccountText(locale, item.favorite.note),
      tags: item.profile.tags.slice(0, 3).map(tag => localizeAccountText(locale, tag)),
    })),
  }
}

export function buildAccountActivityPageViewModel(
  accountData: AccountOverviewContext,
  locale: FormatLocale,
  t: Translate,
): AccountActivityPageVM {
  const { userEvents } = accountData

  return {
    filterItems: [
      { label: t('activity.filters.confirmed'), value: String(userEvents.filter(item => item.registration.status === 'confirmed').length) },
      { label: t('activity.filters.waitlist'), value: String(userEvents.filter(item => item.registration.status === 'waitlist').length) },
      { label: t('activity.filters.completed'), value: String(userEvents.filter(item => item.registration.status === 'completed').length) },
    ],
    supportPoints: [
      t('activity.support.point1'),
      t('activity.support.point2'),
      t('activity.support.point3'),
    ],
    familyPoints: [
      t('activity.family.point1'),
      t('activity.family.point2'),
      t('activity.family.point3'),
    ],
    items: userEvents.map(item => {
      const tone = activityTone(item.registration.status)
      return {
        id: item.event.id,
        date: formatLocalizedDate(locale, item.event.date),
        city: localizeAccountText(locale, item.event.city),
        title: localizeAccountText(locale, item.event.title),
        note: localizeAccountText(locale, item.registration.note),
        venue: localizeAccountText(locale, item.event.venue),
        statusLabel: activityStatusLabel(item.registration.status, t),
        cardClass: tone.card,
        badgeClass: tone.badge,
      }
    }),
  }
}

export function buildAccountMessagesPageViewModel(
  accountData: AccountOverviewContext,
  locale: FormatLocale,
  t: Translate,
): AccountMessagesPageVM {
  const { threads, unreadCount, familyVisibleThreads } = accountData

  return {
    filterItems: [
      { label: t('messages.filters.all'), value: String(threads.length) },
      { label: t('messages.filters.unread'), value: String(unreadCount.value) },
      { label: t('messages.filters.family'), value: String(familyVisibleThreads.value.length) },
    ],
    supportPoints: [
      t('messages.support.point1'),
      t('messages.support.point2'),
      t('messages.support.point3'),
    ],
    boundaryPoints: [
      t('messages.boundary.point1'),
      t('messages.boundary.point2'),
      t('messages.boundary.point3'),
    ],
    items: threads.map(item => ({
      id: item.thread.id,
      profileId: item.profile.id,
      displayName: item.profile.displayName,
      city: localizeAccountText(locale, item.profile.city),
      ageText: formatProfileAge(locale, item.profile.age),
      familyVisible: item.profile.familyVisible,
      unread: item.thread.unread,
      lastMessage: localizeAccountText(locale, item.thread.lastMessage),
      updatedAt: formatLocalizedDateTime(locale, item.thread.updatedAt),
    })),
  }
}

export function buildAccountSafetyPageViewModel(
  accountData: AccountOverviewContext,
  locale: FormatLocale,
  t: Translate,
): AccountSafetyPageVM {
  const { profile, privacySettings, familyAssistSetting, advisorContactSetting, visibleFieldsSetting } = accountData

  return {
    visibilityRows: [
      { label: t('common.familyVisible'), value: profile?.familyVisible ? t('common.enabled') : t('common.disabled') },
      { label: t('common.familyAssist'), value: familyAssistSetting.value?.enabled ? t('common.enabled') : t('common.disabled') },
      { label: t('common.visibleFields'), value: visibleFieldsSetting.value?.enabled ? t('common.enabled') : t('common.disabled') },
      {
        label: localizeAccountText(locale, advisorContactSetting.value?.title ?? { zh: '', fr: '', en: '' }),
        value: advisorContactSetting.value?.enabled ? t('common.enabled') : t('common.disabled'),
      },
    ],
    privacyCards: privacySettings.map(item => ({
      id: item.id,
      title: localizeAccountText(locale, item.title),
      desc: localizeAccountText(locale, item.desc),
      enabled: item.enabled,
    })),
    familyDescription: familyAssistSetting.value ? localizeAccountText(locale, familyAssistSetting.value.desc) : '',
    familyPoints: [
      t('safety.family.point1'),
      t('safety.family.point2'),
      t('safety.family.point3'),
    ],
    notePoints: [
      t('safety.notes.point1'),
      t('safety.notes.point2'),
      t('safety.notes.point3'),
    ],
  }
}

export function buildAccountVerificationPageViewModel(
  accountData: AccountOverviewContext,
  locale: FormatLocale,
  t: Translate,
  globalT: Translate,
): AccountVerificationPageVM {
  const { account, profile, familyAssistSetting, visibleFieldsSetting } = accountData
  const items = [
    { label: t('verification.items.realName'), done: true },
    { label: t('verification.items.education'), done: Boolean(profile?.education) },
    { label: t('verification.items.marital'), done: Boolean(profile?.maritalStatus) },
    { label: t('verification.items.career'), done: Boolean(profile?.occupation) },
    { label: t('verification.items.video'), done: false },
    { label: t('verification.items.assets'), done: account.membership !== 'free' },
  ]
  const verifiedCount = items.filter(item => item.done).length

  return {
    verificationItems: items,
    overviewItems: [
      { label: t('verification.summary.progress'), value: `${verifiedCount}/${items.length}` },
      { label: t('common.currentTier'), value: membershipLabel(globalT, account.membership) },
      { label: t('common.familyVisible'), value: profile?.familyVisible ? t('common.enabled') : t('common.disabled') },
    ],
    controlRows: [
      { label: t('common.familyVisible'), value: profile?.familyVisible ? t('common.enabled') : t('common.disabled') },
      { label: t('common.familyAssist'), value: familyAssistSetting.value?.enabled ? t('common.enabled') : t('common.disabled') },
      { label: t('common.visibleFields'), value: visibleFieldsSetting.value?.enabled ? t('common.enabled') : t('common.disabled') },
    ],
    inviteDescription: profile ? localizeAccountText(locale, profile.summary) : '',
  }
}

export function buildAccountMembershipPageViewModel(
  accountData: AccountOverviewContext,
  locale: FormatLocale,
  t: Translate,
  membershipT: Translate,
  globalT: Translate,
): AccountMembershipPageVM {
  const { account } = accountData

  return {
    membershipLabel: membershipLabel(globalT, account.membership),
    currentItems: [
      { label: t('common.currentTier'), value: membershipLabel(globalT, account.membership) },
      { label: t('topSummary.metrics.completion'), value: `${account.completion}%` },
      { label: t('common.joinedAt'), value: formatLocalizedDate(locale, account.joinedAt) },
    ],
    planCards: [
      {
        key: 'free',
        badge: membershipT('free.badge'),
        title: membershipLabel(globalT, 'free'),
        period: membershipT('free.priceNote'),
        features: [membershipT('free.f1'), membershipT('free.f2'), membershipT('free.f3')],
        cardClass: 'border border-component-membership-tier-free-card-border bg-component-membership-tier-free-card-background shadow-panel',
        eyebrowClass: 'text-semantic-text-secondary',
        titleClass: 'text-semantic-text-primary',
        metaClass: 'text-semantic-text-secondary',
        featureClass: 'border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background text-semantic-text-secondary',
      },
      {
        key: 'silver',
        badge: membershipT('silver.badge'),
        title: membershipLabel(globalT, 'silver'),
        period: membershipT('silver.period'),
        features: [membershipT('silver.f1'), membershipT('silver.f2'), membershipT('silver.f3')],
        cardClass: 'border border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card text-semantic-text-primary shadow-panel',
        eyebrowClass: 'text-semantic-text-secondary',
        titleClass: 'text-semantic-text-primary',
        metaClass: 'text-semantic-text-secondary',
        featureClass: 'border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background text-semantic-text-secondary',
      },
      {
        key: 'gold',
        badge: membershipT('gold.badge'),
        title: membershipLabel(globalT, 'gold'),
        period: membershipT('gold.period'),
        features: [membershipT('gold.f1'), membershipT('gold.f2'), membershipT('gold.f3')],
        cardClass: 'border border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card text-semantic-text-inverse shadow-emphasis',
        eyebrowClass: 'text-semantic-text-inverse-muted',
        titleClass: 'text-semantic-text-inverse',
        metaClass: 'text-semantic-text-inverse-muted',
        featureClass: 'border-component-membership-tier-gold-feature-border bg-component-membership-tier-gold-feature-background text-semantic-text-inverse-muted',
      },
      {
        key: 'diamond',
        badge: membershipT('diamond.badge'),
        title: membershipLabel(globalT, 'diamond'),
        period: membershipT('diamond.period'),
        features: [membershipT('diamond.f1'), membershipT('diamond.f2'), membershipT('diamond.f3')],
        cardClass: 'border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card text-semantic-text-inverse shadow-luxe ring-1 ring-component-membership-tier-diamond-ring',
        eyebrowClass: 'text-semantic-text-inverse-muted',
        titleClass: 'text-semantic-text-inverse',
        metaClass: 'text-semantic-text-inverse-muted',
        featureClass: 'border-component-membership-tier-diamond-feature-border bg-component-membership-tier-diamond-feature-background text-semantic-text-inverse-muted',
      },
    ],
  }
}

function membershipLabel(globalT: Translate, membership: AccountMembershipLevel) {
  return globalT(`membership.${membership}.title`)
}

function activityStatusLabel(status: 'confirmed' | 'waitlist' | 'completed', t: Translate) {
  if (status === 'confirmed') return t('activity.filters.confirmed')
  if (status === 'waitlist') return t('activity.filters.waitlist')
  return t('activity.filters.completed')
}

function activityTone(status: 'confirmed' | 'waitlist' | 'completed') {
  if (status === 'confirmed') {
    return {
      card: 'border-component-account-registration-confirmed-card-border bg-component-account-registration-confirmed-card-background',
      badge: 'border-component-account-registration-confirmed-badge-border bg-component-account-registration-confirmed-badge-background text-component-account-registration-confirmed-badge-text',
    }
  }

  if (status === 'waitlist') {
    return {
      card: 'border-component-account-registration-waitlist-card-border bg-component-account-registration-waitlist-card-background',
      badge: 'border-component-account-registration-waitlist-badge-border bg-component-account-registration-waitlist-badge-background text-component-account-registration-waitlist-badge-text',
    }
  }

  return {
    card: 'border-component-account-registration-completed-card-border bg-component-account-registration-completed-card-background',
    badge: 'border-component-account-registration-completed-badge-border bg-component-account-registration-completed-badge-background text-component-account-registration-completed-badge-text',
  }
}

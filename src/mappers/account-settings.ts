import type { AccountPreferencesDTO, AccountSettingsDTO } from '@/api/account'
import type { Translate } from '@/i18n/types'
import type { AccountPreferenceCode } from '@/types/account/settings'
import { formatLocalizedDateTime, type FormatLocale } from '@/utils/locale-format'

type PreferenceMap = Partial<Record<AccountPreferenceCode, string | boolean | number | string[]>>

const PREFERENCE_CODE_TO_KEY = {
  preferred_city: 'preferredCity',
  preferred_contact_channel: 'preferredContactChannel',
  advisor_contact_enabled: 'advisorContactEnabled',
  family_assist_enabled: 'familyAssistEnabled',
  introduction_updates_enabled: 'introductionUpdatesEnabled',
  event_reminders_enabled: 'eventRemindersEnabled',
  service_announcements_enabled: 'serviceAnnouncementsEnabled',
  marketing_emails_enabled: 'marketingEmailsEnabled',
  analytics_consent_enabled: 'analyticsConsentEnabled',
} satisfies Record<AccountPreferenceCode, keyof AccountPreferencesDTO>

export function toAccountSettingsPageData(params: {
  settings: AccountSettingsDTO | null
  t: Translate
  locale: FormatLocale
}) {
  const { settings, t, locale } = params
  const preferences = toPreferenceMap(settings)

  return {
    account: settings
      ? {
          avatarUrl: settings.account.avatarUrl,
          status: settings.account.status,
          items: [
            item('accountName', t('settings.accountFields.accountName'), settings.account.accountName),
            item('accountId', t('settings.accountFields.accountId'), settings.account.id),
            item('status', t('settings.accountFields.status'), t(`settings.accountStatus.${settings.account.status}`)),
            item('preferredLocale', t('settings.accountFields.preferredLocale'), t(`settings.locale.${settings.account.preferredLocale}`)),
          ],
        }
      : null,
    security: (settings?.identities ?? []).map((identity) => ({
      id: identity.id,
      providerLabel: t(`settings.provider.${identity.provider}`),
      identifier: maskIdentifier(identity.identifier, identity.provider),
      verifiedText: identity.verifiedAt ? t('settings.security.verified') : t('settings.security.unverified'),
    })),
    password: settings
      ? {
          isSetText: settings.password.isSet ? t('settings.security.passwordSet') : t('settings.security.passwordUnset'),
          lastChangedText: settings.password.lastChangedAt
            ? formatLocalizedDateTime(locale, settings.password.lastChangedAt)
            : t('settings.security.neverChanged'),
          canResetText: settings.password.canReset ? t('common.yes') : t('common.no'),
          requiresMfaText: settings.password.requiresMfa ? t('common.yes') : t('common.no'),
        }
      : null,
    notificationPreferences: preferenceItems(
      ['introduction_updates_enabled', 'event_reminders_enabled', 'service_announcements_enabled', 'marketing_emails_enabled'],
      preferences,
      t,
    ),
    servicePreferences: preferenceItems(
      ['preferred_city', 'preferred_contact_channel', 'advisor_contact_enabled', 'family_assist_enabled'],
      preferences,
      t,
    ),
    privacyPreferences: preferenceItems(['analytics_consent_enabled'], preferences, t),
    legalDocuments: [
      { type: 'terms' as const, label: t('settings.actions.viewTerms') },
      { type: 'privacy' as const, label: t('settings.actions.viewPrivacy') },
    ],
    accountActions: [
      { key: 'exportData', label: t('settings.actions.exportData'), hint: t('settings.actionHints.exportData') },
      { key: 'deactivateAccount', label: t('settings.actions.deactivateAccount'), hint: t('settings.actionHints.deactivateAccount') },
    ],
  }
}

function item(key: string, label: string, value: string) {
  return { key, label, value }
}

function toPreferenceMap(settings: AccountSettingsDTO | null): PreferenceMap {
  if (!settings) return {}
  return Object.fromEntries(
    Object.entries(PREFERENCE_CODE_TO_KEY).map(([code, key]) => [code, settings.preferences[key]]),
  ) as PreferenceMap
}

function preferenceItems(codes: AccountPreferenceCode[], values: PreferenceMap, t: Translate) {
  return codes
    .filter((code) => values[code] !== undefined)
    .map((code) => ({
      code,
      label: t(`settings.preference.${code}`),
      displayValue: formatPreferenceValue(code, values[code]!, t),
    }))
}

function formatPreferenceValue(
  code: AccountPreferenceCode,
  value: string | boolean | number | string[],
  t: Translate,
) {
  if (code === 'preferred_contact_channel' && typeof value === 'string') {
    return t(`settings.contactChannel.${value}`)
  }
  if (typeof value === 'boolean') return value ? t('common.yes') : t('common.no')
  if (Array.isArray(value)) return value.join(' / ')
  return String(value)
}

function maskIdentifier(identifier: string, provider: 'email' | 'phone' | 'wechat' | 'google') {
  if (provider === 'email' || provider === 'google') {
    const [name, domain] = identifier.split('@')
    if (!domain) return identifier
    const visible = name.length <= 2 ? name[0] ?? '' : name.slice(0, 2)
    return `${visible}${'*'.repeat(Math.max(name.length - visible.length, 2))}@${domain}`
  }

  if (provider === 'phone') {
    if (identifier.length <= 4) return identifier
    return `${identifier.slice(0, 3)}****${identifier.slice(-2)}`
  }

  return identifier
}

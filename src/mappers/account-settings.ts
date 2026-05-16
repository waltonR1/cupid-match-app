import type {
  AccountSettingsDTO,
} from '@/api/account'
import type { Translate } from '@/i18n/types'

export function toAccountSettingsPageData(params: {
  settings: AccountSettingsDTO | null
  t: Translate
}) {
  const { settings, t } = params

  return {
    preferences: (settings?.preferences ?? []).map((item) => ({
      ...item,
      label: t(`settings.preference.${item.code}`),
      displayValue: formatPreferenceValue(item.value, t),
    })),
    legalDocuments: [
      { type: 'terms' as const, label: t('settings.actions.viewTerms') },
      { type: 'privacy' as const, label: t('settings.actions.viewPrivacy') },
    ],
  }
}

function formatPreferenceValue(value: string | boolean | number | string[], t: Translate) {
  if (typeof value === 'boolean') return value ? t('common.yes') : t('common.no')
  if (Array.isArray(value)) return value.join(' / ')
  return String(value)
}

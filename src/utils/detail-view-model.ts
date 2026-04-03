import { computed, type Ref } from 'vue'
import type { AppLocale } from '@/i18n/types'
import {
  getLocalizedLanguageLabel,
  getMockProfileById,
  pickLocalized,
  type LocalizedText,
} from '@/mock/business'

export type DetailTranslator = (key: string) => string
type MaritalStatusValue = 'single' | 'divorced' | 'widowed'
type HabitValue = 'never' | 'social' | 'often'

export function createDetailProfileState(
  profileId: Ref<string>,
  locale: Ref<AppLocale>,
  t: DetailTranslator,
) {
  const profile = computed(() => getMockProfileById(profileId.value))

  const recordId = computed(() => {
    return profile.value ? profile.value.id.toUpperCase() : ''
  })

  const statusText = computed(() => {
    if (!profile.value) return ''
    return t(`status.${profile.value.status}`)
  })

  const verificationText = computed(() => {
    if (!profile.value) return ''
    return profile.value.isVerified ? t('badges.verified') : t('badges.unverified')
  })

  const visibilityText = computed(() => {
    if (!profile.value) return ''
    return profile.value.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')
  })

  const familyModeText = computed(() => {
    if (!profile.value) return ''
    if (profile.value.familyPriority) return t('familySupport.priority')
    if (profile.value.allowFamilyContact) return t('familySupport.contactReady')
    return t('familySupport.contextOnly')
  })

  function localizeText(text: LocalizedText) {
    return pickLocalized(locale.value, text)
  }

  function formatAgeText(age: number) {
    if (locale.value === 'zh') return `${age}\u5c81`
    if (locale.value === 'fr') return `${age} ans`
    return `${age}`
  }

  function formatHeightText(height: number) {
    return `${height} cm`
  }

  function formatLanguagesText(languages: string[]) {
    return languages
      .map(language => getLocalizedLanguageLabel(locale.value, language))
      .join(' / ')
  }

  function formatDateText(date: string) {
    const localeMap = {
      zh: 'zh-CN',
      fr: 'fr-FR',
      en: 'en-US',
    } as const

    return new Date(date).toLocaleDateString(localeMap[locale.value], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  function booleanText(value: boolean) {
    return value ? t('values.yes') : t('values.no')
  }

  function maritalStatusText(status: MaritalStatusValue) {
    return t(`maritalStatus.${status}`)
  }

  function habitText(value: HabitValue) {
    return t(`habits.${value}`)
  }

  return {
    profile,
    recordId,
    statusText,
    verificationText,
    visibilityText,
    familyModeText,
    localizeText,
    formatAgeText,
    formatHeightText,
    formatLanguagesText,
    formatDateText,
    booleanText,
    maritalStatusText,
    habitText,
  }
}

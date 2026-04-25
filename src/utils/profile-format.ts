import { formatLocalizedDate, type FormatLocale } from './locale-format'
import type { ProfileCardViewModel } from '@/types/profiles/card'
import type { ProfileCard } from '@/api/modules/profiles'

export type LocalizedTextValue = Record<FormatLocale, string>

const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedTextValue> = {
  FR: { zh: '\u6cd5\u8bed', fr: 'Francais', en: 'French' },
  EN: { zh: '\u82f1\u8bed', fr: 'Anglais', en: 'English' },
  ZH: { zh: '\u4e2d\u6587', fr: 'Chinois', en: 'Chinese' },
  NL: { zh: '\u8377\u5170\u8bed', fr: 'Neerlandais', en: 'Dutch' },
  IT: { zh: '\u610f\u5927\u5229\u8bed', fr: 'Italien', en: 'Italian' },
  DE: { zh: '\u5fb7\u8bed', fr: 'Allemand', en: 'German' },
}

/**
 * 将业务资源 ProfileCard 转换为视图模型 ProfileCardViewModel
 * 职责：实现语义 Code 到 i18n Key 的映射，处理视角特有的 UI 逻辑
 */
export function buildProfileCardViewModel(
  data: ProfileCard,
  t: (key: string) => string,
  locale: FormatLocale
): ProfileCardViewModel {
  const isFamily = !!data.familyMode

  // 1. Meta 信息：统一格式化
  const ageText = formatProfileAge(locale, data.age)
  const meta = `${ageText} / ${data.occupation}`

  // 2. Badge 映射 (语义 Code -> i18n Key)
  let badge = ''
  if (isFamily) {
    const familyModeMap: Record<string, string> = {
      PRIORITY: 'modes.priority',
      CONTACT_READY: 'modes.contactReady',
      CONTEXT_ONLY: 'modes.contextOnly'
    }
    badge = t(familyModeMap[data.familyMode!] || '')
  } else {
    const intentMap: Record<string, string> = {
      marriage: 'card.goalMarriage',
      exclusive: 'card.goalExclusive',
      cross_border: 'card.goalCrossBorder',
      serious: 'card.goalSerious'
    }
    badge = t(intentMap[data.intentCode] || 'card.goalSerious')
  }

  // 3. Footer 映射 (语义 Code -> i18n Key)
  let footer = ''
  if (isFamily) {
    if (data.statusCode === 'review') {
      footer = t('card.labelReview')
    } else {
      const familyFooterMap: Record<string, string> = {
        PRIORITY: 'card.labelPriority',
        CONTACT_READY: 'card.labelContactReady',
        CONTEXT_ONLY: 'card.labelObserve'
      }
      footer = t(familyFooterMap[data.familyMode!] || '')
    }
  } else {
    const statusFooterMap: Record<string, string> = {
      review: 'card.labelReview',
      vip: 'card.labelPriority'
    }
    footer = t(statusFooterMap[data.statusCode] || 'card.labelSelected')
  }

  // 4. Facts 映射 (标准 Schema -> UI List)
  const facts = [
    { label: t('fields.city'), value: data.city },
    { label: t('fields.education'), value: data.education }
  ]

  if (isFamily) {
    facts.push({ label: t('fields.residencePlan'), value: data.residencePlan || '' })
  } else {
    facts.push({ label: t('fields.languages'), value: data.languages || '' })
  }

  // 5. Tags 映射 (混合映射)
  let tags = [...data.tags]
  if (isFamily) {
    // 家庭视角额外增加语义化标签
    const maritalMap: Record<string, string> = {
      divorced: 'tags.maritalDivorced',
      widowed: 'tags.maritalWidowed',
      single: 'tags.maritalSingle'
    }
    const longDistanceKey = data.acceptLongDistance ? 'tags.longDistanceYes' : ''
    const childrenKey = data.hasChildren ? 'tags.childrenYes' : 'tags.childrenNo'

    const additionalTags = [
      t(maritalMap[data.maritalStatus!] || 'tags.maritalSingle'),
      longDistanceKey ? t(longDistanceKey) : '',
      t(childrenKey)
    ].filter(Boolean)

    tags = [...tags, ...additionalTags].slice(0, 3)
  }

  return {
    avatarUrl: data.avatarUrl,
    avatarFallback: data.displayName,
    displayName: data.displayName,
    gender: data.gender,
    meta,
    badge,
    summary: data.summary,
    facts,
    tags,
    footer
  }
}

export function localizeProfileText(locale: FormatLocale, text: LocalizedTextValue) {
  return text[locale] || text.en || ''
}

export function formatProfileAge(locale: FormatLocale, age: number) {
  if (locale === 'zh') return `${age}\u5c81`
  if (locale === 'fr') return `${age} ans`
  return String(age)
}

export function formatProfileHeight(height: number) {
  return `${height} cm`
}

export function formatProfileLanguages(locale: FormatLocale, languages: string[]) {
  return languages
    .map(language => getProfileLanguageLabel(locale, language))
    .join(' / ')
}

export function formatProfileDate(locale: FormatLocale, date: string) {
  return formatLocalizedDate(locale, date)
}

function getProfileLanguageLabel(locale: FormatLocale, language: string) {
  const key = String(language || '').trim()
  const label = PROFILE_LANGUAGE_LABELS[key]
  if (!label) return key
  return localizeProfileText(locale, label)
}

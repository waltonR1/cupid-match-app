import type { AccountProfileDetailDTO } from '@/api/account'
import type { Translate } from '@/i18n/types'
import { formatLocalizedDateTime, type FormatLocale } from '@/utils/locale-format'

export function toAccountProfileDetailPageData(params: {
  payload: AccountProfileDetailDTO | null
  t: Translate
  locale: FormatLocale
}) {
  const { payload, t, locale } = params
  if (!payload) return null

  return {
    ...payload,
    archived: Boolean(payload.archivedAt),
    ownershipBadges: [
      payload.archivedAt ? t('profiles.badges.archived') : null,
      t(`profiles.role.${payload.ownership.role}`),
      t(`profiles.permission.${payload.ownership.permission}`),
      payload.ownership.isPrimary ? t('profiles.badges.primary') : null,
    ].filter((item): item is string => Boolean(item)),
    sections: [
      {
        key: 'basics',
        title: t('profiles.detail.sections.basics'),
        items: [
          translatedItem(t('profiles.detail.fields.gender'), 'profiles.detail.values.gender', payload.gender, t),
          item(t('profiles.detail.fields.birthYear'), payload.birthYear, t),
          item(t('profiles.detail.fields.height'), payload.height, t),
          item(t('profiles.detail.fields.city'), payload.city, t),
          item(t('profiles.detail.fields.country'), payload.country, t),
          item(t('profiles.detail.fields.nationality'), payload.nationality, t),
          item(t('profiles.detail.fields.languages'), formatLanguages(payload.languages, t), t),
          translatedItem(t('profiles.detail.fields.degreeLevel'), 'profiles.detail.values.degreeLevel', payload.degreeLevel, t),
          item(t('profiles.detail.fields.education'), payload.education, t),
          item(t('profiles.detail.fields.industry'), payload.industry, t),
          item(t('profiles.detail.fields.careerDirection'), payload.careerDirection, t),
        ],
      },
      {
        key: 'relationship',
        title: t('profiles.detail.sections.relationship'),
        items: [
          translatedItem(t('profiles.detail.fields.maritalStatus'), 'profiles.detail.values.maritalStatus', payload.maritalStatus, t),
          item(t('profiles.detail.fields.hasChildren'), payload.hasChildren, t),
          translatedItem(t('profiles.detail.fields.childrenPlan'), 'profiles.detail.values.childrenPlan', payload.childrenPlan, t),
          item(t('profiles.detail.fields.acceptsLongDistance'), payload.acceptsLongDistance, t),
          translatedItem(t('profiles.detail.fields.datingIntentionCode'), 'profiles.detail.values.datingIntentionCode', payload.datingIntentionCode, t),
          item(t('profiles.detail.fields.relationshipPlan'), payload.relationshipPlan, t),
          item(t('profiles.detail.fields.residencePlan'), payload.residencePlan, t),
          item(t('profiles.detail.fields.relocationWillingness'), payload.relocationWillingness, t),
          item(t('profiles.detail.fields.values'), payload.values, t),
        ],
      },
      {
        key: 'preferences',
        title: t('profiles.detail.sections.preferences'),
        items: [
          item(t('profiles.detail.fields.preferredAgeRange'), `${payload.preferredAgeMin} - ${payload.preferredAgeMax}`, t),
          item(t('profiles.detail.fields.locationScope'), payload.locationScope, t),
          item(t('profiles.detail.fields.preferredEducation'), payload.preferredEducation, t),
          item(t('profiles.detail.fields.familyPlan'), payload.familyPlan, t),
          item(t('profiles.detail.fields.dealBreakers'), payload.dealBreakers, t),
        ],
      },
      {
        key: 'lifestyle',
        title: t('profiles.detail.sections.lifestyle'),
        items: [
          translatedItem(t('profiles.detail.fields.smoking'), 'profiles.detail.values.habit', payload.smoking, t),
          translatedItem(t('profiles.detail.fields.drinking'), 'profiles.detail.values.habit', payload.drinking, t),
          item(t('profiles.detail.fields.exercise'), payload.exercise, t),
          item(t('profiles.detail.fields.activityLevel'), payload.activityLevel, t),
          item(t('profiles.detail.fields.weekendStyle'), payload.weekendStyle, t),
          item(t('profiles.detail.fields.pets'), payload.pets, t),
        ],
      },
      {
        key: 'expression',
        title: t('profiles.detail.sections.expression'),
        items: [
          item(t('profiles.detail.fields.personalityTraits'), payload.personalityTraits, t),
          item(t('profiles.detail.fields.interests'), payload.interests, t),
          item(t('profiles.detail.fields.communicationStyle'), payload.communicationStyle, t),
          item(t('profiles.detail.fields.summary'), payload.summary, t),
          item(t('profiles.detail.fields.tags'), payload.tags, t),
        ],
      },
      {
        key: 'family',
        title: t('profiles.detail.sections.family'),
        items: [
          item(t('profiles.detail.fields.familyVisible'), payload.familyVisible, t),
          item(t('profiles.detail.fields.allowFamilyContact'), payload.allowFamilyContact, t),
          item(t('profiles.detail.fields.familyPriority'), payload.familyPriority, t),
          item(t('profiles.detail.fields.isPriorityProfile'), payload.isPriorityProfile, t),
        ],
      },
      {
        key: 'contact',
        title: t('profiles.detail.sections.contact'),
        items: [
          item(t('profiles.detail.fields.phone'), findContactValue(payload.contactMethods, 'phone'), t),
          item(t('profiles.detail.fields.email'), findContactValue(payload.contactMethods, 'email'), t),
          item(t('profiles.detail.fields.wechat'), findContactValue(payload.contactMethods, 'wechat'), t),
        ],
      },
    ],
    statusItems: [
      item(t('profiles.detail.fields.lifecycle'), payload.archivedAt ? t('profiles.lifecycle.archived') : t('profiles.lifecycle.active'), t),
      translatedItem(t('profiles.detail.fields.profileStatus'), 'profiles.status', payload.profileStatus, t),
      item(t('profiles.detail.fields.lastActiveAt'), formatLocalizedDateTime(locale, payload.lastActiveAt), t),
      item(t('profiles.verificationSummary'), buildVerificationRatio(payload.verification), t),
      item(t('profiles.visibility'), buildVisibilitySummary(payload.visibility, t), t),
    ],
    visibilityGroups: buildVisibilityGroups(payload.visibility, t),
    visibilityItems: payload.visibility.map((entry) => ({
      ...entry,
      label: t(`profiles.visibilityField.${entry.fieldCode}`),
      visibilityText: t(`profiles.visibilityLevel.${entry.visibility}`),
    })),
  }
}

function item(label: string, value: unknown, t: Translate) {
  return {
    label,
    value: formatValue(value, t),
  }
}

function translatedItem(label: string, keyPrefix: string, value: string, t: Translate) {
  return {
    label,
    value: t(`${keyPrefix}.${value}`),
  }
}

function formatValue(value: unknown, t: Translate) {
  if (value === undefined || value === null || value === '') return '-'
  if (Array.isArray(value)) return value.length > 0 ? value.join(' / ') : '-'
  if (typeof value === 'boolean') return value ? t('common.yes') : t('common.no')
  return String(value)
}

function buildVerificationRatio(verification: AccountProfileDetailDTO['verification']) {
  const statuses = [
    verification.identityStatus,
    verification.educationStatus,
    verification.incomeStatus,
    verification.maritalStatus,
  ]

  return `${statuses.filter((status) => status === 'verified').length}/${statuses.length}`
}

function buildVisibilitySummary(
  visibility: AccountProfileDetailDTO['visibility'],
  t: Translate,
) {
  const mostRestricted = visibility.reduce<AccountProfileDetailDTO['visibility'][number]['visibility'] | null>(
    (current, item) => {
      if (!current) return item.visibility
      return visibilityRank(item.visibility) > visibilityRank(current) ? item.visibility : current
    },
    null,
  )

  return mostRestricted ? t(`profiles.visibilityLevel.${mostRestricted}`) : t('profiles.visibilityCustom.emptyValue')
}

function buildVisibilityGroups(
  visibility: AccountProfileDetailDTO['visibility'],
  t: Translate,
) {
  return (['public', 'member', 'introduced', 'owner_only', 'hidden'] as const)
    .map((level) => ({
      key: level,
      title: t(`profiles.visibilityLevel.${level}`),
      items: visibility
        .filter((entry) => entry.visibility === level)
        .map((entry) => ({
          ...entry,
          label: t(`profiles.visibilityField.${entry.fieldCode}`),
          visibilityText: t(`profiles.visibilityLevel.${entry.visibility}`),
        })),
    }))
    .filter((group) => group.items.length > 0)
}

function visibilityRank(level: AccountProfileDetailDTO['visibility'][number]['visibility']) {
  return {
    public: 0,
    member: 1,
    introduced: 2,
    owner_only: 3,
    hidden: 4,
  }[level]
}

function formatLanguages(languages: string[], t: Translate) {
  return languages.map((language) => t(`profiles.detail.values.language.${language.toLowerCase()}`))
}

function findContactValue(
  contactMethods: AccountProfileDetailDTO['contactMethods'],
  type: AccountProfileDetailDTO['contactMethods'][number]['type'],
) {
  return contactMethods.find((item) => item.type === type)?.value
}

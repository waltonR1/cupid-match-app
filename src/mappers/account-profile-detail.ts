import type { AccountProfileDetailDTO } from '@/api/account'

interface SectionItem {
  fieldKey: string
  labelKey: string
  rawValue: unknown
  editor: 'text' | 'number' | 'boolean' | 'enum' | 'list' | 'ageRange'
  valueKey?: string
}

interface Section {
  key: string
  titleKey: string
  items: SectionItem[]
}

export interface ProfileDetailPageData {
  profileTitle: string | null
  profileTitleKey: string | undefined
  profileTitleRelation: string | undefined
  avatarUrl: string
  city: string
  ownershipBadgeKeys: string[]
  statusItems: Array<{ labelKey: string; rawValue: unknown }>
  sections: Section[]
  photos: AccountProfileDetailDTO['photos']
  verificationItems: Array<{ key: string; labelKey: string; valueKey: string; valueRaw?: string; tone: string }>
  privacyPreferenceItems: Array<{ key: string; labelKey: string; statusKey: string; hidden: boolean }>
}

export function toAccountProfileDetailPageData(params: { payload: AccountProfileDetailDTO | null }): ProfileDetailPageData | null {
  const { payload } = params
  if (!payload) return null

  const profileTitle = payload.profileName || null
  let profileTitleKey: string | undefined
  let profileTitleRelation: string | undefined
  if (!payload.profileName) {
    if (!payload.profileId) {
      profileTitleKey = 'profiles.detail.createTitle'
    } else if (payload.profileType === 'self') {
      profileTitleKey = 'profiles.profileType.self'
    } else {
      profileTitleKey = 'profiles.profileType.family'
      profileTitleRelation = `profiles.relationship.${payload.ownership.relationshipToProfile}`
    }
  }

  return {
    profileTitle,
    profileTitleKey,
    profileTitleRelation,
    avatarUrl: payload.avatarUrl,
    city: payload.city,
    ownershipBadgeKeys: [
      `profiles.profileType.${payload.profileType}`,
      `profiles.relationship.${payload.ownership.relationshipToProfile}`,
      `profiles.permission.${payload.ownership.permission}`,
      ...(payload.ownership.isPrimary ? ['profiles.badges.primary' as const] : []),
    ],
    statusItems: [
      { labelKey: 'profiles.detail.fields.lifecycle', rawValue: 'profiles.lifecycle.active' },
      { labelKey: 'profiles.detail.fields.profileStatus', rawValue: `profiles.status.${payload.profileStatus}` },
      { labelKey: 'profiles.detail.fields.lastActiveAt', rawValue: payload.lastActiveAt },
      { labelKey: 'profiles.verificationSummary', rawValue: buildVerificationRatio(payload.verification) },
      { labelKey: 'profiles.privacyPreferences.title', rawValue: buildPrivacyPreferenceSummaryKey(payload.privacyPreferences) },
    ],
    sections: buildSections(payload),
    photos: payload.photos,
    verificationItems: buildVerificationItems(payload.verification),
    privacyPreferenceItems: buildPrivacyPreferenceItems(payload.privacyPreferences),
  }
}

function buildSections(payload: AccountProfileDetailDTO): Section[] {
  const blank = payload.isBlankDraft
  return [
    {
      key: 'basics',
      titleKey: 'profiles.detail.sections.basics',
      items: [
        { fieldKey: 'profileName', labelKey: 'profiles.detail.fields.profileName', rawValue: payload.profileName, editor: 'text' },
        { fieldKey: 'gender', labelKey: 'profiles.detail.fields.gender', rawValue: blank ? null : payload.gender, editor: 'enum', valueKey: `profiles.detail.values.gender.${payload.gender}` },
        { fieldKey: 'birthYear', labelKey: 'profiles.detail.fields.birthYear', rawValue: payload.birthYear, editor: 'number' },
        { fieldKey: 'height', labelKey: 'profiles.detail.fields.height', rawValue: payload.height, editor: 'number' },
        { fieldKey: 'city', labelKey: 'profiles.detail.fields.city', rawValue: payload.city, editor: 'text' },
        { fieldKey: 'country', labelKey: 'profiles.detail.fields.country', rawValue: payload.country, editor: 'text' },
        { fieldKey: 'nationality', labelKey: 'profiles.detail.fields.nationality', rawValue: payload.nationality, editor: 'text' },
        { fieldKey: 'languages', labelKey: 'profiles.detail.fields.languages', rawValue: payload.languages, editor: 'list' },
        { fieldKey: 'degreeLevel', labelKey: 'profiles.detail.fields.degreeLevel', rawValue: blank ? null : payload.degreeLevel, editor: 'enum', valueKey: `profiles.detail.values.degreeLevel.${payload.degreeLevel}` },
        { fieldKey: 'education', labelKey: 'profiles.detail.fields.education', rawValue: payload.education, editor: 'text' },
        { fieldKey: 'industry', labelKey: 'profiles.detail.fields.industry', rawValue: payload.industry, editor: 'text' },
        { fieldKey: 'careerDirection', labelKey: 'profiles.detail.fields.careerDirection', rawValue: payload.careerDirection, editor: 'text' },
      ],
    },
    {
      key: 'relationship',
      titleKey: 'profiles.detail.sections.relationship',
      items: [
        { fieldKey: 'maritalStatus', labelKey: 'profiles.detail.fields.maritalStatus', rawValue: blank ? null : payload.maritalStatus, editor: 'enum', valueKey: `profiles.detail.values.maritalStatus.${payload.maritalStatus}` },
        { fieldKey: 'hasChildren', labelKey: 'profiles.detail.fields.hasChildren', rawValue: blank ? null : payload.hasChildren, editor: 'boolean' },
        { fieldKey: 'childrenPlan', labelKey: 'profiles.detail.fields.childrenPlan', rawValue: blank ? null : payload.childrenPlan, editor: 'enum', valueKey: `profiles.detail.values.childrenPlan.${payload.childrenPlan}` },
        { fieldKey: 'acceptsLongDistance', labelKey: 'profiles.detail.fields.acceptsLongDistance', rawValue: blank ? null : payload.acceptsLongDistance, editor: 'boolean' },
        { fieldKey: 'datingIntentionCode', labelKey: 'profiles.detail.fields.datingIntentionCode', rawValue: blank ? null : payload.datingIntentionCode, editor: 'enum', valueKey: `profiles.detail.values.datingIntentionCode.${payload.datingIntentionCode}` },
        { fieldKey: 'relationshipPlan', labelKey: 'profiles.detail.fields.relationshipPlan', rawValue: payload.relationshipPlan, editor: 'text' },
        { fieldKey: 'residencePlan', labelKey: 'profiles.detail.fields.residencePlan', rawValue: payload.residencePlan, editor: 'text' },
        { fieldKey: 'relocationWillingness', labelKey: 'profiles.detail.fields.relocationWillingness', rawValue: payload.relocationWillingness, editor: 'text' },
        { fieldKey: 'values', labelKey: 'profiles.detail.fields.values', rawValue: payload.values, editor: 'list' },
      ],
    },
    {
      key: 'preferences',
      titleKey: 'profiles.detail.sections.preferences',
      items: [
        { fieldKey: 'preferredAgeMin', labelKey: 'profiles.detail.fields.preferredAgeRange', rawValue: payload.preferredAgeMin || payload.preferredAgeMax ? `${payload.preferredAgeMin} - ${payload.preferredAgeMax}` : null, editor: 'ageRange' },
        { fieldKey: 'locationScope', labelKey: 'profiles.detail.fields.locationScope', rawValue: payload.locationScope, editor: 'text' },
        { fieldKey: 'preferredEducation', labelKey: 'profiles.detail.fields.preferredEducation', rawValue: payload.preferredEducation, editor: 'text' },
        { fieldKey: 'familyPlan', labelKey: 'profiles.detail.fields.familyPlan', rawValue: payload.familyPlan, editor: 'text' },
        { fieldKey: 'dealBreakers', labelKey: 'profiles.detail.fields.dealBreakers', rawValue: payload.dealBreakers, editor: 'list' },
      ],
    },
    {
      key: 'lifestyle',
      titleKey: 'profiles.detail.sections.lifestyle',
      items: [
        { fieldKey: 'smoking', labelKey: 'profiles.detail.fields.smoking', rawValue: blank ? null : payload.smoking, editor: 'enum', valueKey: `profiles.detail.values.habit.${payload.smoking}` },
        { fieldKey: 'drinking', labelKey: 'profiles.detail.fields.drinking', rawValue: blank ? null : payload.drinking, editor: 'enum', valueKey: `profiles.detail.values.habit.${payload.drinking}` },
        { fieldKey: 'exercise', labelKey: 'profiles.detail.fields.exercise', rawValue: payload.exercise, editor: 'text' },
        { fieldKey: 'activityLevel', labelKey: 'profiles.detail.fields.activityLevel', rawValue: payload.activityLevel, editor: 'text' },
        { fieldKey: 'weekendStyle', labelKey: 'profiles.detail.fields.weekendStyle', rawValue: payload.weekendStyle, editor: 'text' },
        { fieldKey: 'pets', labelKey: 'profiles.detail.fields.pets', rawValue: payload.pets, editor: 'text' },
      ],
    },
    {
      key: 'expression',
      titleKey: 'profiles.detail.sections.expression',
      items: [
        { fieldKey: 'personalityTraits', labelKey: 'profiles.detail.fields.personalityTraits', rawValue: payload.personalityTraits, editor: 'list' },
        { fieldKey: 'interests', labelKey: 'profiles.detail.fields.interests', rawValue: payload.interests, editor: 'list' },
        { fieldKey: 'communicationStyle', labelKey: 'profiles.detail.fields.communicationStyle', rawValue: payload.communicationStyle, editor: 'text' },
        { fieldKey: 'summary', labelKey: 'profiles.detail.fields.summary', rawValue: payload.summary, editor: 'text' },
        { fieldKey: 'tags', labelKey: 'profiles.detail.fields.tags', rawValue: payload.tags, editor: 'list' },
      ],
    },
    {
      key: 'family',
      titleKey: 'profiles.detail.sections.family',
      items: [
        { fieldKey: 'familyVisible', labelKey: 'profiles.detail.fields.familyVisible', rawValue: blank ? null : payload.familyVisible, editor: 'boolean' },
        { fieldKey: 'allowFamilyContact', labelKey: 'profiles.detail.fields.allowFamilyContact', rawValue: blank ? null : payload.allowFamilyContact, editor: 'boolean' },
        { fieldKey: 'familyPriority', labelKey: 'profiles.detail.fields.familyPriority', rawValue: blank ? null : payload.familyPriority, editor: 'boolean' },
        { fieldKey: 'isPriorityProfile', labelKey: 'profiles.detail.fields.isPriorityProfile', rawValue: blank ? null : payload.isPriorityProfile, editor: 'boolean' },
      ],
    },
    {
      key: 'contact',
      titleKey: 'profiles.detail.sections.contact',
      items: [
        { fieldKey: 'phone', labelKey: 'profiles.detail.fields.phone', rawValue: payload.contact.phone, editor: 'text' },
        { fieldKey: 'email', labelKey: 'profiles.detail.fields.email', rawValue: payload.contact.email, editor: 'text' },
        { fieldKey: 'wechat', labelKey: 'profiles.detail.fields.wechat', rawValue: payload.contact.wechat, editor: 'text' },
        { fieldKey: 'preferredChannel', labelKey: 'profiles.detail.fields.preferredChannel', rawValue: payload.contact.preferredChannel ?? 'email', editor: 'enum', valueKey: `profiles.detail.values.contactChannel.${payload.contact.preferredChannel ?? 'email'}` },
        { fieldKey: 'contactVisibility', labelKey: 'profiles.detail.fields.contactVisibility', rawValue: payload.contact.visibility, editor: 'enum', valueKey: `profiles.detail.values.contactVisibility.${payload.contact.visibility}` },
      ],
    },
  ]
}

function buildVerificationRatio(verification: AccountProfileDetailDTO['verification']) {
  const statuses = [
    verification.identityStatus,
    verification.educationStatus,
    verification.incomeStatus,
    verification.maritalStatus,
    verification.reviewStatus,
  ]
  return `${statuses.filter((s) => s === 'verified' || s === 'approved').length}/${statuses.length}`
}

function buildPrivacyPreferenceSummaryKey(preferences: AccountProfileDetailDTO['privacyPreferences']) {
  const fields = ['hideMaritalStatus', 'hideHasChildren', 'hideChildrenPlan', 'hideAcceptsLongDistance', 'hideSmoking', 'hideDrinking'] as const
  const hiddenCount = fields.filter((key) => preferences[key]).length
  return hiddenCount > 0 ? 'profiles.privacyPreferences.hiddenSummary' : 'profiles.privacyPreferences.defaultSummary'
}

function buildVerificationItems(verification: AccountProfileDetailDTO['verification']) {
  return [
    { key: 'identity', labelKey: 'profiles.verification.identity', valueKey: `profiles.verificationStatus.${verification.identityStatus}`, tone: resolveTone(verification.identityStatus) },
    { key: 'education', labelKey: 'profiles.verification.education', valueKey: `profiles.verificationStatus.${verification.educationStatus}`, tone: resolveTone(verification.educationStatus) },
    { key: 'income', labelKey: 'profiles.verification.income', valueKey: `profiles.verificationStatus.${verification.incomeStatus}`, tone: resolveTone(verification.incomeStatus) },
    { key: 'marital', labelKey: 'profiles.verification.marital', valueKey: `profiles.verificationStatus.${verification.maritalStatus}`, tone: resolveTone(verification.maritalStatus) },
    { key: 'review', labelKey: 'profiles.verification.platformReview', valueKey: `profiles.reviewStatus.${verification.reviewStatus}`, tone: resolveTone(verification.reviewStatus) },
    { key: 'verifiedAt', labelKey: 'profiles.verification.verifiedAt', valueKey: '', valueRaw: verification.verifiedAt, tone: verification.verifiedAt ? 'complete' : 'unverified' },
  ]
}

function resolveTone(status: string) {
  if (status === 'verified' || status === 'approved') return 'complete'
  if (status === 'rejected') return 'rejected'
  return 'pending'
}

function buildPrivacyPreferenceItems(preferences: AccountProfileDetailDTO['privacyPreferences']) {
  const fields = ['hideMaritalStatus', 'hideHasChildren', 'hideChildrenPlan', 'hideAcceptsLongDistance', 'hideSmoking', 'hideDrinking'] as const
  return fields.map((key) => ({
    key,
    labelKey: `profiles.privacyPreferenceField.${key}`,
    statusKey: preferences[key] ? 'profiles.privacyPreferences.hidden' : 'profiles.privacyPreferences.default',
    hidden: preferences[key],
  }))
}

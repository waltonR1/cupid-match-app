import type { AccountProfileDetailDTO } from '@/api/account'
import type {
  AccountProfileDetailPageData,
  AccountProfileDetailPrivacyPreferenceItem,
  AccountProfileDetailSection,
  AccountProfileDetailVerificationItem,
} from '@/types/account/profile-detail'

export function toAccountProfileDetailPageData(params: { payload: AccountProfileDetailDTO | null }): AccountProfileDetailPageData | null {
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
    ],
    statusItems: [
      { labelKey: 'profiles.detail.fields.profileStatus', rawValue: `profiles.status.${payload.profileStatus}` },
      { labelKey: 'profiles.detail.fields.lastActiveAt', rawValue: payload.lastActiveAt },
    ],
    profileSections: buildProfileSections(payload),
    contactSection: buildContactSection(payload),
    photos: payload.photos,
    verification: payload.verification,
    verificationItems: buildVerificationItems(payload.verification),
    privacyPreferenceItems: buildPrivacyPreferenceItems(payload.privacyPreferences),
  }
}

function buildProfileSections(payload: AccountProfileDetailDTO): AccountProfileDetailSection[] {
  const blank = payload.isBlankDraft
  return [
    {
      key: 'basics',
      titleKey: 'profiles.detail.sections.basics',
      items: [
        { fieldKey: 'profileName', labelKey: 'profiles.detail.fields.profileName', rawValue: payload.profileName, editor: 'text', required: true },
        { fieldKey: 'gender', labelKey: 'profiles.detail.fields.gender', rawValue: blank ? null : payload.gender, editor: 'enum', valueKey: `profiles.detail.values.gender.${payload.gender}`, required: true },
        { fieldKey: 'birthYear', labelKey: 'profiles.detail.fields.birthYear', rawValue: payload.birthYear, editor: 'number', required: true },
        { fieldKey: 'height', labelKey: 'profiles.detail.fields.height', rawValue: payload.height, editor: 'number', required: true },
        { fieldKey: 'city', labelKey: 'profiles.detail.fields.city', rawValue: payload.city, editor: 'text', required: true },
        { fieldKey: 'country', labelKey: 'profiles.detail.fields.country', rawValue: payload.country, editor: 'text', required: true },
        { fieldKey: 'nationality', labelKey: 'profiles.detail.fields.nationality', rawValue: payload.nationality, editor: 'text' },
        { fieldKey: 'languages', labelKey: 'profiles.detail.fields.languages', rawValue: payload.languages, editor: 'list' },
        { fieldKey: 'degreeLevel', labelKey: 'profiles.detail.fields.degreeLevel', rawValue: blank ? null : payload.degreeLevel, editor: 'enum', valueKey: `profiles.detail.values.degreeLevel.${payload.degreeLevel}`, required: true },
        { fieldKey: 'education', labelKey: 'profiles.detail.fields.education', rawValue: payload.education, editor: 'text', required: true },
        { fieldKey: 'industry', labelKey: 'profiles.detail.fields.industry', rawValue: payload.industry, editor: 'text', required: true },
        { fieldKey: 'careerDirection', labelKey: 'profiles.detail.fields.careerDirection', rawValue: payload.careerDirection, editor: 'text' },
      ],
    },
    {
      key: 'relationship',
      titleKey: 'profiles.detail.sections.relationship',
      items: [
        { fieldKey: 'maritalStatus', labelKey: 'profiles.detail.fields.maritalStatus', rawValue: blank ? null : payload.maritalStatus, editor: 'enum', valueKey: `profiles.detail.values.maritalStatus.${payload.maritalStatus}`, required: true },
        { fieldKey: 'hasChildren', labelKey: 'profiles.detail.fields.hasChildren', rawValue: blank ? null : payload.hasChildren, editor: 'boolean' },
        { fieldKey: 'childrenPlan', labelKey: 'profiles.detail.fields.childrenPlan', rawValue: blank ? null : payload.childrenPlan, editor: 'enum', valueKey: `profiles.detail.values.childrenPlan.${payload.childrenPlan}` },
        { fieldKey: 'acceptsLongDistance', labelKey: 'profiles.detail.fields.acceptsLongDistance', rawValue: blank ? null : payload.acceptsLongDistance, editor: 'boolean' },
        { fieldKey: 'datingIntentionCode', labelKey: 'profiles.detail.fields.datingIntentionCode', rawValue: blank ? null : payload.datingIntentionCode, editor: 'enum', valueKey: `profiles.detail.values.datingIntentionCode.${payload.datingIntentionCode}`, required: true },
        { fieldKey: 'relationshipGoal', labelKey: 'profiles.detail.fields.relationshipGoal', rawValue: payload.relationshipGoal, editor: 'text', required: true },
        { fieldKey: 'residencePlan', labelKey: 'profiles.detail.fields.residencePlan', rawValue: payload.residencePlan, editor: 'text' },
        { fieldKey: 'relocation', labelKey: 'profiles.detail.fields.relocation', rawValue: payload.relocation, editor: 'enum', valueKey: `profiles.detail.values.relocation.${payload.relocation}` },
        { fieldKey: 'relationshipValues', labelKey: 'profiles.detail.fields.relationshipValues', rawValue: payload.relationshipValues, editor: 'list' },
      ],
    },
    {
      key: 'preferences',
      titleKey: 'profiles.detail.sections.preferences',
      items: [
        { fieldKey: 'preferredAgeMin', labelKey: 'profiles.detail.fields.preferredAgeRange', rawValue: payload.preferredAgeMin || payload.preferredAgeMax ? `${payload.preferredAgeMin} - ${payload.preferredAgeMax}` : null, editor: 'ageRange' },
        { fieldKey: 'preferredLocation', labelKey: 'profiles.detail.fields.preferredLocation', rawValue: payload.preferredLocation, editor: 'enum', valueKey: `profiles.detail.values.preferredLocation.${payload.preferredLocation}` },
        { fieldKey: 'preferredEducation', labelKey: 'profiles.detail.fields.preferredEducation', rawValue: payload.preferredEducation, editor: 'text' },
        { fieldKey: 'familyLife', labelKey: 'profiles.detail.fields.familyLife', rawValue: payload.familyLife, editor: 'text' },
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
        { fieldKey: 'activityLevel', labelKey: 'profiles.detail.fields.activityLevel', rawValue: payload.activityLevel, editor: 'enum', valueKey: `profiles.detail.values.activityLevel.${payload.activityLevel}` },
        { fieldKey: 'weekendStyle', labelKey: 'profiles.detail.fields.weekendStyle', rawValue: payload.weekendStyle, editor: 'enum', valueKey: `profiles.detail.values.weekendStyle.${payload.weekendStyle}` },
        { fieldKey: 'pets', labelKey: 'profiles.detail.fields.pets', rawValue: payload.pets, editor: 'enum', valueKey: `profiles.detail.values.pets.${payload.pets}` },
      ],
    },
    {
      key: 'expression',
      titleKey: 'profiles.detail.sections.expression',
      items: [
        { fieldKey: 'personalityTraits', labelKey: 'profiles.detail.fields.personalityTraits', rawValue: payload.personalityTraits, editor: 'list' },
        { fieldKey: 'interests', labelKey: 'profiles.detail.fields.interests', rawValue: payload.interests, editor: 'list' },
        { fieldKey: 'communicationStyle', labelKey: 'profiles.detail.fields.communicationStyle', rawValue: payload.communicationStyle, editor: 'enum', valueKey: `profiles.detail.values.communicationStyle.${payload.communicationStyle}` },
        { fieldKey: 'summary', labelKey: 'profiles.detail.fields.summary', rawValue: payload.summary, editor: 'text', required: true },
        { fieldKey: 'tags', labelKey: 'profiles.detail.fields.tags', rawValue: payload.tags, editor: 'list' },
      ],
    },
    {
      key: 'family',
      titleKey: 'profiles.detail.sections.family',
      items: [
        { fieldKey: 'familyVisible', labelKey: 'profiles.detail.fields.familyVisible', rawValue: blank ? null : payload.familyVisible, editor: 'boolean' },
      ],
    },
  ]
}

function buildContactSection(payload: AccountProfileDetailDTO): AccountProfileDetailSection {
  return {
    key: 'contact',
    titleKey: 'profiles.detail.sections.contact',
    items: [
      { fieldKey: 'phone', labelKey: 'profiles.detail.fields.phone', rawValue: payload.contact.phone, editor: 'text' },
      { fieldKey: 'email', labelKey: 'profiles.detail.fields.email', rawValue: payload.contact.email, editor: 'text' },
      { fieldKey: 'wechat', labelKey: 'profiles.detail.fields.wechat', rawValue: payload.contact.wechat, editor: 'text' },
      { fieldKey: 'preferredChannel', labelKey: 'profiles.detail.fields.preferredChannel', rawValue: payload.contact.preferredChannel ?? 'email', editor: 'enum', valueKey: `profiles.detail.values.contactChannel.${payload.contact.preferredChannel ?? 'email'}` },
      { fieldKey: 'contactVisibility', labelKey: 'profiles.detail.fields.contactVisibility', rawValue: payload.contact.visibility, editor: 'enum', valueKey: `profiles.detail.values.contactVisibility.${payload.contact.visibility}` },
    ],
  }
}

function buildVerificationItems(verification: AccountProfileDetailDTO['verification']): AccountProfileDetailVerificationItem[] {
  return [
    { key: 'identity', labelKey: 'profiles.verification.identity', valueKey: `profiles.verificationStatus.${verification.identityStatus}`, tone: resolveTone(verification.identityStatus) },
    { key: 'education', labelKey: 'profiles.verification.education', valueKey: `profiles.verificationStatus.${verification.educationStatus}`, tone: resolveTone(verification.educationStatus) },
    { key: 'income', labelKey: 'profiles.verification.income', valueKey: `profiles.verificationStatus.${verification.incomeStatus}`, tone: resolveTone(verification.incomeStatus) },
    { key: 'marital', labelKey: 'profiles.verification.marital', valueKey: `profiles.verificationStatus.${verification.maritalStatus}`, tone: resolveTone(verification.maritalStatus) },
    { key: 'review', labelKey: 'profiles.verification.platformReview', valueKey: `profiles.reviewStatus.${verification.reviewStatus}`, tone: resolveTone(verification.reviewStatus) },
  ]
}

function resolveTone(status: string) {
  if (status === 'verified' || status === 'approved') return 'complete'
  if (status === 'rejected') return 'rejected'
  return 'pending'
}

function buildPrivacyPreferenceItems(preferences: AccountProfileDetailDTO['privacyPreferences']): AccountProfileDetailPrivacyPreferenceItem[] {
  const fields = ['hideMaritalStatus', 'hideHasChildren', 'hideChildrenPlan', 'hideAcceptsLongDistance', 'hideSmoking', 'hideDrinking'] as const
  return fields.map((key) => ({
    key,
    labelKey: `profiles.privacyPreferenceField.${key}`,
    statusKey: preferences[key] ? 'profiles.privacyPreferences.hidden' : 'profiles.privacyPreferences.default',
    hidden: preferences[key],
  }))
}

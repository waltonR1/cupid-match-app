import type { AccountProfilesDTO } from '@/api/account'
import type { Translate } from '@/i18n/types'

export function toAccountProfilesPageData(params: { payload: AccountProfilesDTO | null; t: Translate }) {
  const { payload, t } = params
  if (!payload) return null

  return {
    profiles: payload.profiles.map((profile) => ({
      ...profile,
      profileStatusText: t(`profiles.status.${profile.profileStatus}`),
      verificationSummary: buildVerificationSummary(profile.verification, t),
      presentationBadges: buildPresentationBadges(profile, t),
      verificationItems: [
        { key: 'identity', label: t('profiles.verification.identity'), value: t(`profiles.verificationStatus.${profile.verification.identityStatus}`) },
        { key: 'education', label: t('profiles.verification.education'), value: t(`profiles.verificationStatus.${profile.verification.educationStatus}`) },
        { key: 'income', label: t('profiles.verification.income'), value: t(`profiles.verificationStatus.${profile.verification.incomeStatus}`) },
        { key: 'marital', label: t('profiles.verification.marital'), value: t(`profiles.verificationStatus.${profile.verification.maritalStatus}`) },
      ],
    })),
  }
}

function buildVerificationSummary(
  verification: AccountProfilesDTO['profiles'][number]['verification'],
  t: Translate,
) {
  const statuses = [
    verification.identityStatus,
    verification.educationStatus,
    verification.incomeStatus,
    verification.maritalStatus,
  ]
  const verifiedCount = statuses.filter((status) => status === 'verified').length

  return {
    value: `${verifiedCount}/${statuses.length}`,
    label: t('profiles.verificationSummary'),
    description: resolveVerificationDescription(verifiedCount, statuses.length, t),
  }
}

function buildPresentationBadges(
  profile: AccountProfilesDTO['profiles'][number],
  t: Translate,
) {
  return [
    profile.isPrimary ? t('profiles.badges.primary') : null,
    profile.isPriorityProfile ? t('profiles.badges.priority') : null,
    t(`profiles.role.${profile.role}`),
    t(`profiles.permission.${profile.permission}`),
  ].filter((item): item is string => Boolean(item))
}

function resolveVerificationDescription(verifiedCount: number, totalCount: number, t: Translate) {
  if (verifiedCount === totalCount) return t('profiles.verificationDescription.complete')
  if (verifiedCount === 0) return t('profiles.verificationDescription.empty')
  return t('profiles.verificationDescription.partial')
}

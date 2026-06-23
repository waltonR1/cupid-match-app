import type { AccountProfileVerificationDTO, ManagedProfileSummaryDTO } from '@/api/account'

/** 统计五项认证中已通过的数量与总数 */
export function computeVerificationRatio(
  verification: AccountProfileVerificationDTO,
  profileStatus?: ManagedProfileSummaryDTO['profileStatus'],
) {
  const statuses = [
    verification.identityStatus,
    verification.educationStatus,
    verification.incomeStatus,
    verification.maritalStatus,
    resolvePlatformReviewStatus(profileStatus, verification.reviewStatus),
  ]
  return {
    verified: statuses.filter((s) => s === 'verified' || s === 'approved').length,
    total: statuses.length,
  }
}

function resolvePlatformReviewStatus(
  profileStatus: ManagedProfileSummaryDTO['profileStatus'] | undefined,
  fallback: AccountProfileVerificationDTO['reviewStatus'],
) {
  if (profileStatus === 'review') return 'pending'
  if (profileStatus === 'open' || profileStatus === 'paused') return 'approved'
  if (profileStatus === 'hidden') return 'rejected'
  if (profileStatus === 'draft') return 'unreviewed'
  return fallback
}

/** 根据认证通过比例返回描述文案的 i18n key 后缀 */
export function resolveVerificationDescriptionKey(verified: number, total: number) {
  if (verified === total) return 'complete' as const
  if (verified === 0) return 'empty' as const
  return 'partial' as const
}

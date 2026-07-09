import { apiRequest } from '@/api/shared/http'
import type {
  AccountDashboardDTO,
  AccountEventRegistrationDTO,
  AccountExportResultDTO,
  FavoriteActionResult,
  IntroductionContactDTO,
  IntroductionContactUnavailableDTO,
  AccountIntroductionSummaryDTO,
  AccountMembershipDTO,
  AccountMembershipOrderDTO,
  MembershipPlanDTO,
  AccountPasswordChangePayload,
  AccountPasswordChangeResultDTO,
  AccountProfileDetailDTO,
  AccountProfileArchiveResultDTO,
  AccountProfileDetailSavePayload,
  AccountProfileVerificationMaterialPayload,
  AccountProfilePrivacyPreferencesDTO,
  AccountProfilePrivacyPreferencesUpdatePayload,
  AccountMeUpdatePayload,
  AccountPreferenceUpdatePayload,
  AccountMembershipUpgradePayload,
  AccountMembershipUpgradeResultDTO,
  AccountMembershipCancelRenewalResultDTO,
  AccountDeactivateResultDTO,
  AccountIdentityActionResultDTO,
  AccountMfaStatusDTO,
  AccountMfaEnablePayload,
  AccountMfaDisablePayload,
  AccountMfaVerificationCodePayload,
  AccountSecurityChallengeCodeResultDTO,
  AccountSecurityChallengeCodePayload,
  AccountSecurityChallengeVerifyPayload,
  AccountSecurityChallengeResultDTO,
  AccountSensitiveActionPayload,
  AccountIdentityCreatePayload,
  AccountIdentityDeleteResultDTO,
  VerificationCodeRequestPayload,
  VerificationCodeRequestResultDTO,
  AccountEntitlementBalanceDTO,
  AccountMeDTO,
  AccountProfilesDTO,
  AccountSettingsDTO,
  FavoriteProfileSummaryDTO,
} from './account.types'

export function getAccountDashboard(): Promise<AccountDashboardDTO> {
  return apiRequest<AccountDashboardDTO>('/account/dashboard')
}

export function getAccountMe(): Promise<AccountMeDTO> {
  return apiRequest<AccountMeDTO>('/account/me')
}

export function getAccountProfiles(): Promise<AccountProfilesDTO> {
  return apiRequest<AccountProfilesDTO>('/account/profiles')
}

export function getAccountProfileDetail(profileId: string, lang?: 'zh' | 'fr' | 'en'): Promise<AccountProfileDetailDTO> {
  return apiRequest<AccountProfileDetailDTO>(`/account/profiles/${profileId}`, { query: { lang } })
}

export function saveAccountProfileDetail(
  payload: AccountProfileDetailSavePayload,
  lang?: 'zh' | 'fr' | 'en',
): Promise<AccountProfileDetailDTO> {
  return apiRequest<AccountProfileDetailDTO>('/account/profiles/save', { method: 'POST', query: { lang }, data: payload })
}

export function archiveAccountProfile(profileId: string): Promise<AccountProfileArchiveResultDTO> {
  return apiRequest<AccountProfileArchiveResultDTO>(`/account/profiles/${profileId}/archive`, {
    method: 'POST',
    data: {},
  })
}

export function submitAccountProfileReview(
  profileId: string,
  lang?: 'zh' | 'fr' | 'en',
): Promise<AccountProfileDetailDTO> {
  return apiRequest<AccountProfileDetailDTO>(`/account/profiles/${profileId}/submit-review`, {
    method: 'POST',
    query: {lang},
    data: {},
  })
}

export function updateAccountProfilePrivacyPreferences(
  profileId: string,
  payload: AccountProfilePrivacyPreferencesUpdatePayload,
): Promise<AccountProfilePrivacyPreferencesDTO> {
  return apiRequest<AccountProfilePrivacyPreferencesDTO>(`/account/profiles/${profileId}/privacy-preferences`, { method: 'POST', data: payload })
}

export function submitAccountProfileVerificationMaterial(
  profileId: string,
  payload: AccountProfileVerificationMaterialPayload,
): Promise<{ profileId: string; verification: AccountProfileDetailDTO['verification']; materials: AccountProfileDetailDTO['verificationMaterials'] }> {
  return apiRequest(`/account/profiles/${profileId}/verification/materials`, { method: 'POST', data: payload })
}

export function getAccountMembership(): Promise<{
  membership: AccountMembershipDTO | null
  entitlements: AccountEntitlementBalanceDTO[]
  availablePlans: MembershipPlanDTO[]
}> {
  return apiRequest('/account/membership')
}

export function getAccountEvents(): Promise<AccountEventRegistrationDTO[]> {
  return apiRequest<AccountEventRegistrationDTO[]>('/account/events')
}

export function getAccountFavorites(): Promise<FavoriteProfileSummaryDTO[]> {
  return apiRequest<FavoriteProfileSummaryDTO[]>('/account/favorites')
}

export function addFavorite(profileId: string): Promise<FavoriteActionResult> {
  return apiRequest<FavoriteActionResult>(`/favorites/${profileId}`, { method: 'POST', data: {} })
}

export function removeFavorite(profileId: string): Promise<{ removed: boolean }> {
  return apiRequest<{ removed: boolean }>(`/favorites/${profileId}`, { method: 'DELETE', data: {} })
}

export function requestAccountExport(payload: AccountSensitiveActionPayload = {}): Promise<AccountExportResultDTO> {
  return apiRequest<AccountExportResultDTO>('/account/export', { method: 'POST', data: payload })
}

export function requestAccountExportDownload(downloadUrl: string): Promise<unknown> {
  return apiRequest<unknown>(downloadUrl)
}

export function deactivateAccount(payload: AccountSensitiveActionPayload = {}): Promise<AccountDeactivateResultDTO> {
  return apiRequest<AccountDeactivateResultDTO>('/account/deactivate', { method: 'POST', data: payload })
}

export function requestVerificationCode(payload: VerificationCodeRequestPayload): Promise<VerificationCodeRequestResultDTO> {
  return apiRequest<VerificationCodeRequestResultDTO>('/account/identities/verification-code', { method: 'POST', data: payload })
}

export function bindIdentity(payload: AccountIdentityCreatePayload): Promise<AccountIdentityActionResultDTO> {
  return apiRequest<AccountIdentityActionResultDTO>('/account/identities', { method: 'POST', data: payload })
}

export function unbindIdentity(identityId: string, payload: AccountSensitiveActionPayload = {}): Promise<AccountIdentityDeleteResultDTO> {
  return apiRequest<AccountIdentityDeleteResultDTO>(`/account/identities/${identityId}`, { method: 'DELETE', data: payload })
}

export function getAccountMfaStatus(): Promise<AccountMfaStatusDTO> {
  return apiRequest<AccountMfaStatusDTO>('/account/mfa/status')
}

export function enableAccountMfa(payload: AccountMfaEnablePayload): Promise<AccountMfaStatusDTO> {
  return apiRequest<AccountMfaStatusDTO>('/account/mfa/enable', { method: 'POST', data: payload })
}

export function requestAccountMfaVerificationCode(payload: AccountMfaVerificationCodePayload): Promise<VerificationCodeRequestResultDTO> {
  return apiRequest<VerificationCodeRequestResultDTO>('/account/mfa/verification-code', { method: 'POST', data: payload })
}

export function disableAccountMfa(payload: AccountMfaDisablePayload): Promise<AccountMfaStatusDTO> {
  return apiRequest<AccountMfaStatusDTO>('/account/mfa/disable', { method: 'POST', data: payload })
}

export function requestSecurityChallengeCode(payload: AccountSecurityChallengeCodePayload): Promise<AccountSecurityChallengeCodeResultDTO> {
  return apiRequest<AccountSecurityChallengeCodeResultDTO>('/account/security/challenge-code', { method: 'POST', data: payload })
}

export function verifySecurityChallenge(payload: AccountSecurityChallengeVerifyPayload): Promise<AccountSecurityChallengeResultDTO> {
  return apiRequest<AccountSecurityChallengeResultDTO>('/account/security/challenge', { method: 'POST', data: payload })
}

export function getAccountIntroductions(): Promise<AccountIntroductionSummaryDTO[]> {
  return apiRequest<AccountIntroductionSummaryDTO[]>('/account/private-introductions')
}

export function getIntroductionContact(requestId: string): Promise<IntroductionContactDTO | IntroductionContactUnavailableDTO> {
  return apiRequest<IntroductionContactDTO | IntroductionContactUnavailableDTO>(`/account/private-introductions/${requestId}/contact`)
}


export function getAccountSettings(): Promise<AccountSettingsDTO> {
  return apiRequest<AccountSettingsDTO>('/account/settings')
}

export function updateAccountMe(payload: AccountMeUpdatePayload): Promise<AccountMeDTO> {
  return apiRequest<AccountMeDTO>('/account/me', { method: 'POST', data: payload })
}

export function updateAccountPreferences(payload: AccountPreferenceUpdatePayload): Promise<AccountSettingsDTO> {
  return apiRequest<AccountSettingsDTO>('/account/settings/preferences', { method: 'POST', data: payload })
}

export function requestAccountMembershipUpgrade(payload: AccountMembershipUpgradePayload): Promise<AccountMembershipUpgradeResultDTO> {
  return apiRequest<AccountMembershipUpgradeResultDTO>('/account/membership/upgrade', { method: 'POST', data: payload })
}

export function cancelAccountMembershipRenewal(): Promise<AccountMembershipCancelRenewalResultDTO> {
  return apiRequest<AccountMembershipCancelRenewalResultDTO>('/account/membership/cancel-renewal', { method: 'POST', data: {} })
}

export function getAccountMembershipOrder(orderId: string): Promise<AccountMembershipOrderDTO> {
  return apiRequest<AccountMembershipOrderDTO>(`/account/membership/orders/${encodeURIComponent(orderId)}`)
}

export function changeAccountPassword(payload: AccountPasswordChangePayload): Promise<AccountPasswordChangeResultDTO> {
  return apiRequest<AccountPasswordChangeResultDTO>('/account/password/change', { method: 'POST', data: payload })
}

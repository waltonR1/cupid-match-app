import { requestJson } from '@/api/shared/http'
import type {
  AccountDashboardDTO,
  AccountEventRegistrationDTO,
  IntroductionContactDTO,
  IntroductionContactUnavailableDTO,
  AccountIntroductionSummaryDTO,
  AccountMembershipDTO,
  MembershipPlanDTO,
  AccountPasswordChangePayload,
  AccountPasswordChangeResultDTO,
  AccountProfileDetailDTO,
  AccountProfileArchiveResultDTO,
  AccountProfileDetailSavePayload,
  AccountProfilePrivacyPreferencesDTO,
  AccountProfilePrivacyPreferencesUpdatePayload,
  AccountMeUpdatePayload,
  AccountPreferenceUpdatePayload,
  AccountMembershipUpgradePayload,
  AccountMembershipUpgradeResultDTO,
  AccountEntitlementBalanceDTO,
  AccountMeDTO,
  AccountProfilesDTO,
  AccountSettingsDTO,
  FavoriteProfileSummaryDTO,
} from './account.types'

export function getAccountDashboard(): Promise<AccountDashboardDTO> {
  return requestJson<AccountDashboardDTO>('/account/dashboard')
}

export function getAccountMe(): Promise<AccountMeDTO> {
  return requestJson<AccountMeDTO>('/account/me')
}

export function getAccountProfiles(): Promise<AccountProfilesDTO> {
  return requestJson<AccountProfilesDTO>('/account/profiles')
}

export function getAccountProfileDetail(profileId: string, lang?: 'zh' | 'fr' | 'en'): Promise<AccountProfileDetailDTO> {
  return requestJson<AccountProfileDetailDTO>(`/account/profiles/${profileId}`, { query: { lang } })
}

export function saveAccountProfileDetail(
  payload: AccountProfileDetailSavePayload,
  lang?: 'zh' | 'fr' | 'en',
): Promise<AccountProfileDetailDTO> {
  return requestJson<AccountProfileDetailDTO>('/account/profiles/save', { method: 'POST', query: { lang }, data: payload })
}

export function archiveAccountProfile(profileId: string): Promise<AccountProfileArchiveResultDTO> {
  return requestJson<AccountProfileArchiveResultDTO>(`/account/profiles/${profileId}/archive`, {
    method: 'POST',
    data: {},
  })
}

export function updateAccountProfilePrivacyPreferences(
  profileId: string,
  payload: AccountProfilePrivacyPreferencesUpdatePayload,
): Promise<AccountProfilePrivacyPreferencesDTO> {
  return requestJson<AccountProfilePrivacyPreferencesDTO>(`/account/profiles/${profileId}/privacy-preferences`, { method: 'POST', data: payload })
}

export function getAccountMembership(): Promise<{
  membership: AccountMembershipDTO | null
  entitlements: AccountEntitlementBalanceDTO[]
  availablePlans: MembershipPlanDTO[]
}> {
  return requestJson('/account/membership')
}

export function getAccountEvents(): Promise<AccountEventRegistrationDTO[]> {
  return requestJson<AccountEventRegistrationDTO[]>('/account/events')
}

export function getAccountFavorites(): Promise<FavoriteProfileSummaryDTO[]> {
  return requestJson<FavoriteProfileSummaryDTO[]>('/account/favorites')
}

export function getAccountIntroductions(): Promise<AccountIntroductionSummaryDTO[]> {
  return requestJson<AccountIntroductionSummaryDTO[]>('/account/private-introductions')
}

export function getIntroductionContact(requestId: string): Promise<IntroductionContactDTO | IntroductionContactUnavailableDTO> {
  return requestJson<IntroductionContactDTO | IntroductionContactUnavailableDTO>(`/account/private-introductions/${requestId}/contact`)
}


export function getAccountSettings(): Promise<AccountSettingsDTO> {
  return requestJson<AccountSettingsDTO>('/account/settings')
}

export function updateAccountMe(payload: AccountMeUpdatePayload): Promise<AccountMeDTO> {
  return requestJson<AccountMeDTO>('/account/me', { method: 'POST', data: payload })
}

export function updateAccountPreferences(payload: AccountPreferenceUpdatePayload): Promise<AccountSettingsDTO> {
  return requestJson<AccountSettingsDTO>('/account/settings/preferences', { method: 'POST', data: payload })
}

export function requestAccountMembershipUpgrade(payload: AccountMembershipUpgradePayload): Promise<AccountMembershipUpgradeResultDTO> {
  return requestJson<AccountMembershipUpgradeResultDTO>('/account/membership/upgrade', { method: 'POST', data: payload })
}

export function changeAccountPassword(payload: AccountPasswordChangePayload): Promise<AccountPasswordChangeResultDTO> {
  return requestJson<AccountPasswordChangeResultDTO>('/account/password/change', { method: 'POST', data: payload })
}

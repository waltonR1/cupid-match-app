import { requestJson } from '@/api/shared/http'
import type {
  AccountDashboardDTO,
  AccountEventRegistrationDTO,
  AccountIntroductionSummaryDTO,
  AccountMembershipDTO,
  MembershipPlanDTO,
  AccountProfileDetailDTO,
  AccountEntitlementBalanceDTO,
  AccountMeDTO,
  AccountPrivateIntroductionRoomDTO,
  AccountProfilesDTO,
  AccountSettingsDTO,
  FavoriteProfileSummaryDTO,
} from './account.types'

export interface AccountShellUser {
  id: string
  accountName: string
  avatarUrl: string
  joinedAt: string
  membership: string
}

export interface AccountOverviewResponse {
  user: AccountShellUser
}

export function getAccountOverview(): Promise<AccountOverviewResponse> {
  return Promise.all([
    requestJson<AccountMeDTO>('/account/me'),
    getAccountMembership(),
  ]).then(([account, membership]) => ({
    user: {
      id: account.user.id,
      accountName: account.user.accountName,
      avatarUrl: account.user.avatarUrl,
      joinedAt: '',
      membership: membership.membership?.tier ?? 'free',
    },
  }))
}

export function getAccountDashboard(): Promise<AccountDashboardDTO> {
  return requestJson<AccountDashboardDTO>('/account/dashboard')
}

export function getAccountMe(): Promise<AccountMeDTO> {
  return requestJson<AccountMeDTO>('/account/me')
}

export function getAccountProfiles(): Promise<AccountProfilesDTO> {
  return requestJson<AccountProfilesDTO>('/account/profiles')
}

export function getAccountProfileDetail(profileId: string): Promise<AccountProfileDetailDTO> {
  return requestJson<AccountProfileDetailDTO>(`/account/profiles/${profileId}`)
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

export function getAccountRooms(): Promise<AccountPrivateIntroductionRoomDTO[]> {
  return requestJson<AccountPrivateIntroductionRoomDTO[]>('/account/private-introduction-rooms')
}

export function getAccountSettings(): Promise<AccountSettingsDTO> {
  return requestJson<AccountSettingsDTO>('/account/settings')
}
